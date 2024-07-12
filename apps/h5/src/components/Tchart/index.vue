<template>
  <div :id="TV_DEFAULT_ID" :class="getThemeClassName(props.baseConfig.theme)" style="width: 100%; height: 100%; position: relative">
    <HeaderWidget
      :lang="props.baseConfig.lang"
      :style="props.baseConfig.chartStyle"
      :exType="props.baseConfig.exType"
      :theme="props.baseConfig.theme"
      :wsUrl="props.baseConfig.wsUrl"
      :tvWidget="Widget"
      :render="renderTradingView"
      :emit="emit"
      :key="headerWidgetKey"
      :displayMenus="menusConfig"
    />
    <div :id="props.baseConfig.id" style="width: 100%; height: calc(100% - 40px)"></div>
    <OrderBar
      v-if="menusConfig.orderQuickMarket && orderBar.x && orderBar.y && !mobile"
      :tvWidget="Widget"
      :theme="props.baseConfig.theme"
      :lang="t?.order"
      :close="() => (menusConfig.orderQuickMarket = false)"
      :x="orderBar.x"
      :y="orderBar.y"
      :key="orderBarKey"
    />
    <BuyAndSell
      v-if="buyAndSell.price && buyAndSell.targetPrice && menusConfig.orderQuickLimit && !mobile"
      :tvWidget="Widget"
      :theme="props.baseConfig.theme"
      :lang="t?.order"
      :price="buyAndSell.price"
      :target-price="buyAndSell.targetPrice"
      :x="buyAndSell.x"
      :y="buyAndSell.y"
    />
  </div>
</template>

<script lang="ts" setup name="Tchart">
  import * as config from './constants';
  import i18n from './locale/index';
  import Datafeed from './datafeed.js';
  import MyWebSocket from './websocket/webSocket';
  import HeaderWidget from './components/HeaderWidget.vue';
  import OrderBar from './components/OrderBar.vue';
  import BuyAndSell from './components/BuyAndSell.vue';
  import { Languages } from './utils/language';
  import { widget } from './public/charting_library/charting_library.esm.js';
  import { initSocket } from './streaming';
  import { createLimitOrderLine } from './utils/order';
  import { onMounted, onUnmounted, watch, computed, ref, provide, reactive } from 'vue';
  import { BaseConfig, KLineOrderConfig, OrderConfig, TransformConfig, Unit } from './interfaces';
  import {
    EVENTS,
    EX_WS_API_KEY,
    TV_DEFAULT_ID,
    WS_PRICES_CACHE_KEY,
    DISPLAY_CACHE_KEY,
    DISPLAY_MENUS,
    BUYANDSELL,
    NEW_BAR_CACHE_KEY,
  } from './constants';
  import type {
    ChartingLibraryFeatureset,
    Timezone,
    LanguageCode,
    ResolutionString,
    ThemeName,
    ISymbolValueFormatter,
  } from './public/charting_library';
  import {
    formatPrice,
    query,
    isMobile,
    addSymbolPrefix,
    clearHistoryState,
    getUserSettingConfig,
    clearLocalStorage,
    patchOrderBarClassName,
    eventBus,
    getOrderBarCache,
    isDescendant,
    getThemeClassName,
    fixTradingViewSourceTitleStyle,
    getPanePropertiesBackground,
    findChangedKeys,
  } from './utils/index';

  import { fixTradingViewStyle, getSavedData, setPricescale, creatMA, tradingViewCacheSave } from './utils/tradingview';
  import { createHistoryMarks } from './utils/order';

  // TradingView 组件配置项
  interface TchartProps {
    // 公共基础配置（配置变更组件会重新渲染）
    baseConfig: BaseConfig;
    // 订单实时价格
    orderWs: KLineOrderConfig;
    // 高级版下单功能配置
    orderConfig: OrderConfig;
    // 转换器
    transform?: TransformConfig;
    // 重新渲染TV组件
    reRender?: (cb: () => void) => void;
    // 组件初始化渲染成功回调
    chartReady?: () => void;
    // 市价限价下单回调
    order?: () => void;
    // 历史成交点击回调
    mark?: () => void;
    // 限价委托订单编辑回调
    editLimit?: () => void;
    // 限价委托订单更新回调
    updateLimit?: () => void;
    // 限价委托订单撤回回调
    cancelLimit?: () => void;
  }

  // defineOptions({ name: 'Tchart' });

  const emit = defineEmits(Object.values(EVENTS));
  const props = withDefaults(defineProps<TchartProps>(), {
    baseConfig: () => ({
      id: 'tv_chart_container',
      lang: (query('lang') as LanguageCode) || 'en',
      theme: query('theme') == 'light' ? 'Light' : 'Dark',
      symbol: query('symbol') || config.DEFAULT_SYMBOL,
      base: query('base') || config.DEFAULT_BASE,
      quote: query('quote') || config.DEFAULT_QUOTE,
      wsUrl: EX_WS_API_KEY,
      exType: 'contract',
      quotePrecision: 3,
      basePrecision: 2,
      chartStyle: {
        riseDownColor: ['#089981', '#F23645'],
      },
    }),
    orderConfig: () => ({
      limitOrder: [],
    }),
    orderWs: () => ({
      buyOne: '0',
      sellOne: '0',
      maxBuy: '0',
      maxSell: '0',
      unit: Unit.base,
      minNum: '0',
    }),
    transform: () => ({}),
  });

  const headerWidgetKey = ref(1);
  const Widget = ref();
  const socket = ref<MyWebSocket | null>();
  const orderBarKey = ref(1);
  const tvChartReady = ref(false);
  const isPlusClick = ref(false);
  const crossPrice = ref(0);
  const mobile = ref(false);
  const menusConfig = ref<typeof DISPLAY_MENUS>(DISPLAY_MENUS);
  const t = computed(() => (props.baseConfig.lang ? i18n[props.baseConfig.lang] : i18n.en_US));

  // 快捷下单
  const buyAndSell = reactive({
    x: 0,
    y: 0,
    price: 0,
    targetPrice: 0,
  });

  // 市价下单
  const orderBar = reactive({
    x: 0,
    y: 0,
  });

  // 注入外层传入的实时价格，在快速下单控件中消费
  provide(
    WS_PRICES_CACHE_KEY,
    computed(() => ({
      order: props.orderWs,
      symbol: props.baseConfig.base.toString().toUpperCase(),
      base: props.baseConfig.base.toString().toUpperCase(),
      quote: props.baseConfig.quote.toString().toUpperCase(),
      quotePrecision: props.baseConfig.quotePrecision,
      basePrecision: props.baseConfig.basePrecision,
    })),
  );

  // 注入事件，对上层组件暴露
  provide(EVENTS.ORDER, (params: any) => emit(EVENTS.ORDER, { ...params }));
  provide(EVENTS.MARK, (params: any) => emit(EVENTS.MARK, { ...params }));

  // 基础配置监控
  watch(
    () => props.baseConfig,
    (newValue, oldValue) => {
      const changedKeys = findChangedKeys(newValue, oldValue);

      // 除主题、涨跌颜色外执行重新渲染
      if (!changedKeys.every((key) => ['theme', 'riseDownColor'].includes(key))) {
        renderTradingView();
        orderBarKey.value = Date.now();
      } else {
        Widget.value.changeTheme(props.baseConfig.theme);
        // 防止切换主题后TradingView默认主题影响系统主题
        setTimeout(() => {
          Widget.value.applyOverrides({
            ...config.overrides(props.baseConfig.chartStyle.riseDownColor),
            'paneProperties.background': getPanePropertiesBackground(Widget.value._iFrame.contentWindow.document.body),
          });
          Widget.value.applyStudiesOverrides(config.studies_overrides(props.baseConfig.chartStyle.riseDownColor));
        }, 0);
      }
    },
    {
      deep: true,
    },
  );

  // 订单状态监控
  watch(
    () => [props.orderConfig],
    () => {
      createLimitOrderLine(emit, props.baseConfig, Widget.value, props.orderConfig.limitOrder, getUserSettingConfig());
    },
    {
      deep: true,
      immediate: true,
    },
  );

  // 监控菜单配置项变化
  watch(
    () => menusConfig.value,
    () => {
      localStorage.setItem(DISPLAY_CACHE_KEY, JSON.stringify(menusConfig.value));
    },
    {
      deep: true,
    },
  );

  const renderTradingView = (updateHeaderBar = true) => {
    // 清理历史数据缓存状态
    clearHistoryState();
    setPricescale(Number(props.baseConfig.quotePrecision));

    if (Widget.value) Widget.value = null;

    // H5端默认隐藏左侧工具栏
    const enabled_features = config.enabled_features_arr as ChartingLibraryFeatureset[];
    isMobile() && enabled_features.push('hide_left_toolbar_by_default');

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone;
    const interval = (localStorage.getItem(config.RESOLUTIONS_CACHE_KEY) || config.DEFAULT_RESOLUTIONS) as ResolutionString;
    const disabled_features = config.disabled_features_arr as ChartingLibraryFeatureset[];
    const symbol = addSymbolPrefix(props.baseConfig.symbol.toString().toLowerCase(), props.baseConfig.exType);
    const saved_data = getSavedData(symbol, props.baseConfig.chartStyle.riseDownColor, props.baseConfig.exType);
    const locale = Languages[(props.baseConfig.lang as keyof typeof Languages) || 'en_US'] as any;

    // 强制修复tv样式，防止渲染出现异常
    fixTradingViewStyle();

    try {
      window.bitunixTv.tvWidget = Widget.value = new widget({
        user_id: props.baseConfig.id,
        client_id: config.CLIENT_ID,
        autosize: true,
        interval,
        container: props.baseConfig.id,
        library_path: '/charting_library/',
        timezone,
        disabled_features,
        enabled_features,
        saved_data,
        symbol,
        locale,
        theme: props.baseConfig.theme as ThemeName,
        custom_css_url: './style/chart.css',
        datafeed: Datafeed,
        favorites: {
          intervals: config.favoritesIntervals as ResolutionString[],
          chartTypes: [],
        },
        // 基础样式覆盖
        overrides: config.overrides(props.baseConfig.chartStyle.riseDownColor),
        // 指标样式覆盖
        studies_overrides: config.studies_overrides(props.baseConfig.chartStyle.riseDownColor),
        // @ts-ignore
        custom_formatters: {
          priceFormatterFactory: () =>
            ({
              format: (price: number) => formatPrice(price, Number(props.baseConfig.quotePrecision)),
            } as ISymbolValueFormatter),
        },
        // 储存图表库
        load_last_chart: true,
        // 自动保存时间
        auto_save_delay: 3,
        // 右键菜单配置内容
        context_menu: {
          items_processor: (items) => {
            if (menusConfig.value.orderQuickLimit) {
              // 处理十字线 + 号菜单问题
              let isCrossHair = false;

              items.forEach((item: any) => {
                if (item._options && item._options.actionId === 'Chart.Crosshair.PlusButton.DrawHorizontalLine') {
                  isCrossHair = true;
                }
              });

              // 图表区域的右键和十字线的右键都屏蔽
              return Promise.resolve(isCrossHair || items.length <= 13 ? [] : items);
            }

            return Promise.resolve(items);
          },
        },
      });
    } catch (error) {
      localStorage.clear();
      location.reload();
    }

    if (updateHeaderBar) {
      // 通过更新Key强制更新子组件
      headerWidgetKey.value = Date.now();
    }

    if (!Widget.value) return;

    // 挂载图表事件
    Widget.value.onChartReady(() => {
      if (!Widget.value) return;

      // 发送图表载入成功事件
      emit(EVENTS.CHART_READY, { ...props });
      // 标记初始化成功
      tvChartReady.value = true;

      // 如果有本地缓存则不执行创建成交量操作
      saved_data || creatMA(Widget.value);

      // 修复成交量高度
      setTimeout(() => {
        Widget.value?.chart().getPanes().length > 1 && Widget.value?.chart().getPanes()[1].setHeight(config.VOLUME_HEIGHT);
      }, 0);

      // 订阅自动保存事件，执行持久化操作
      Widget.value.subscribe('onAutoSaveNeeded', () => {
        tradingViewCacheSave(Widget.value, props.baseConfig.exType);
      });

      // 动态覆盖样式，避免saved_data中的样式影响
      Widget.value.applyOverrides({
        theme: props.baseConfig.theme,
        'paneProperties.background': getPanePropertiesBackground(Widget.value._iFrame.contentWindow.document.body), // 画布背景色
        'mainSeriesProperties.candleStyle.upColor': props.baseConfig.chartStyle.riseDownColor[0],
        'mainSeriesProperties.candleStyle.downColor': props.baseConfig.chartStyle.riseDownColor[1],
        'mainSeriesProperties.candleStyle.borderUpColor': props.baseConfig.chartStyle.riseDownColor[0],
        'mainSeriesProperties.candleStyle.borderDownColor': props.baseConfig.chartStyle.riseDownColor[1],
        'scalesProperties.showStudyLastValue': true, // 显示Study指标最后的值
        // 'scalesProperties.showSymbolLabels': true, // 显示Symbol标签
        'mainSeriesProperties.showCountdown': menusConfig.value.countdown, // 显示倒计时
        'mainSeriesProperties.highLowAvgPrice.highLowPriceLabelsVisible': menusConfig.value.highLowPriceLabels, // 显示最高价和最低价标签
      });

      fixTradingViewSourceTitleStyle(Widget.value._iFrame.contentWindow.document);

      // 创建限价单
      createLimitOrderLine(emit, props.baseConfig, Widget.value, props.orderConfig.limitOrder, getUserSettingConfig());
    });

    // 挂载下单高级功能事件
    initOrderEvent();

    // 挂载样式变量
    patchOrderBarClassName(props.baseConfig.chartStyle.riseDownColor);
  };

  // 初始化下单高级功能
  const initOrderEvent = () => {
    Widget.value &&
      Widget.value.onChartReady(() => {
        if (!Widget.value) return;

        const contentWindow = Widget.value._iFrame.contentWindow;
        const iframeDocument = contentWindow.document;
        const buyAndSellWidth = BUYANDSELL.width;
        const buyAndSellHeight = BUYANDSELL.height;

        // 业务方在vue中默认是v-show="false"，组件已经执行了渲染，但是获取不到 getBoundingClientRect
        const element = document.getElementById(TV_DEFAULT_ID);
        if (orderBar.x === 0 && orderBar.y === 0) {
          // eslint-disable-next-line no-undef
          let setIn: any;

          if (!element) return;

          // TODO: 判断是否存在缓存的情况
          if (['none', ''].includes(element?.style.display)) {
            setIn = setInterval(() => {
              if (element?.style.display === 'none') return;
              clearInterval(setIn);

              // 初始化位置
              const { left, top } = element.getBoundingClientRect();
              orderBar.x = (left > 0 ? left : 0) + 50;
              orderBar.y = (top > 0 ? top : 0) + 50;
            }, 1000);
          }
        }

        // 点击操作隐藏快捷下单框
        iframeDocument.addEventListener('click', () => {
          if (isPlusClick.value) return;

          buyAndSell.targetPrice = 0;
        });

        // 点击操作隐藏快捷下单框
        ['click', 'contextmenu'].forEach((event) => {
          document.addEventListener(event, (e) => {
            const parentElement = document.querySelector('.tv-buy-sell-bar') as HTMLElement;

            if (!parentElement || !isDescendant(parentElement, e.target as HTMLElement)) {
              buyAndSell.targetPrice = 0;
            }
          });
        });

        // 十字线价格
        Widget.value
          .activeChart()
          .crossHairMoved()
          .subscribe(null, (e: any) => {
            crossPrice.value = e.price;
          });

        // 控制菜单的显示位置
        iframeDocument.addEventListener('contextmenu', (e: any) => {
          if (!Widget.value || !element) return;

          const { top, right, bottom, left } = element.getBoundingClientRect();
          let x = e.clientX;
          let y = e.clientY;

          if (e.clientX + left + buyAndSellWidth > right) {
            // x = K线右边的距离 - K线左边的距离 - K线下单组件本身宽度 - 80额外偏移量
            x = right - left - buyAndSellWidth - 80;
          }

          if (e.clientY + top + (buyAndSellHeight + 15) > bottom) {
            // x = K线下边的距离 - K线上边的距离 - K线下单组件本身高度 - 20额外偏移量
            y = bottom - top - buyAndSellHeight - 20;
          }

          buyAndSell.x = x;
          buyAndSell.y = y;

          // 把十字线获取到的实时价格赋值给下单价格
          buyAndSell.targetPrice = crossPrice.value;
        });

        // 十字线的加号点击的时候
        Widget.value.subscribe('onPlusClick', (res: any) => {
          if (!Widget.value) return;

          isPlusClick.value = true;
          buyAndSell.targetPrice = res.price;

          buyAndSell.x = res.clientX - buyAndSellWidth;
          buyAndSell.y = res.clientY + buyAndSellHeight;

          // 订阅事件没有阻止事件冒泡机制，会导致上面的click误触
          setTimeout(() => {
            isPlusClick.value = false;
          }, 500);
        });
      });
  };

  // 高级下单价格处理回调
  const priceCallback = (res: string) => {
    if (!res.length) return;

    const result = JSON.parse(res);

    if (Array.isArray(result)) return;

    buyAndSell.price = result.close;
  };

  onMounted(() => {
    // 全局注册转换器
    Object.assign(window, {
      bitunixTv: {
        transform: props.transform,
      },
    });

    // 如果没有配置转换器则走默认socket
    if (!props.transform?.subscribeBars) {
      const wsUrl = props.baseConfig.wsUrl as string;

      socket.value = initSocket(wsUrl);
      sessionStorage.setItem('wsUrl', wsUrl);
    }

    // 缓存合约模式和现货模式类型
    sessionStorage.setItem(config.EX_TYPE_KEY, props.baseConfig.exType as string);

    // 当用户网络恢复时强制重新渲染
    window.addEventListener('online', () => renderTradingView());

    renderTradingView();

    // ------------------- 高级下单 -------------------

    mobile.value = isMobile();

    const { x, y } = getOrderBarCache();
    if (x && y) {
      orderBar.x = x;
      orderBar.y = y;
    }

    eventBus.subscribe(NEW_BAR_CACHE_KEY, priceCallback);

    // 恢复本地保存的配置项
    menusConfig.value = getUserSettingConfig();
  });

  onUnmounted(() => {
    if (Widget.value) {
      Widget.value.remove();
      Widget.value = null;
    }
    socket.value && socket.value.clear();
    socket.value = null;

    eventBus.unsubscribe(NEW_BAR_CACHE_KEY, priceCallback);
  });
</script>
<style>
  /* 主题系统 */
  .trading_view_drak {
    --color-bg-kline-tool: #121212;
    --color-text-1: #f5f5f5;
    --color-text-2: #999999;
    --color-text-3: #666666;
    --color-text-4: #1f1f1f;
    --color-text-5: #3eb6ef;
    --color-white: #ffffff;
    --color-text-mainbutton: #131f00;
    --color-text-button: #ea4b64;
    --color-text-error: #f65353;
    --color-text-success: #00c383;
    --color-text-warning: #e39d35;
    --color-text-on-tag: #f0f0f4;
    --color-text-icon-check: #121212;
    --color-text-red: #f1493f;
    --color-text-green: #15c95d;
    --color-bg-0: #000000;
    --color-bg-1: #000000;
    --color-bg-2: #121212;
    --color-bg-3: #121212;
    --color-bg-4: #1a1c1e;
    --color-bg-5: #2f3133;
    --color-bg-6: #45474e;
    --color-bg-tag: #2f3133;
    --color-bg-yellow: #2d240e;
    --color-bg-bitgreen: #292b1f;
    --color-bg-white: #ffffff;
    --color-color-bg-green: #15c95d;
    --color-bg-green-hover: #0bac4c;
    --color-bg-green-pressed: #087c37;
    --color-bg-red: #f1493f;
    --color-bg-red-hover: #c8382f;
    --color-bg-red-pressed: #9d2c25;
    --color-fill-1: #243600;
    --color-fill-2: #291012;
    --color-fill-3: #002112;
    --color-fill-4: #2a1800;
    --color-fill-bitgreen: #ea4b64;
    --color-fill-blue: #001e2d;
    --color-fill-green: #042813;
    --color-fill-red: #371512;
    --color-fill-input: #1e2027;
    --color-border-1: #2a2f33;
    --color-border-2: #ea4b64;
    --color-border-3: #f65353;
    --color-border-4: #1a1c1e;
  }
  .trading_view_light {
    --color-bg-kline-tool: #ffffff;
    --color-text-1: #111111;
    --color-text-2: #808080;
    --color-text-3: #c2c2c2;
    --color-text-4: #999999;
    --color-text-5: #3eb6ef;
    --color-white: #ffffff;
    --color-text-mainbutton: #131f00;
    --color-text-button: #ea4b64;
    --color-text-error: #f75c5c;
    --color-text-success: #00bd77;
    --color-text-warning: #e39d35;
    --color-text-on-tag: #1a1c1e;
    --color-text-icon-check: #ffffff;
    --color-text-red: #f1493f;
    --color-text-green: #15c95d;
    --color-bg-0: #ffffff;
    --color-bg-1: #fafafa;
    --color-bg-2: #ffffff;
    --color-bg-3: #ffffff;
    --color-bg-4: #f6f6f9;
    --color-bg-5: #e2e2e5;
    --color-bg-6: #e2e2e5;
    --color-bg-tag: #e2e2e5;
    --color-bg-yellow: #faf2e0;
    --color-bg-bitgreen: #edf2df;
    --color-bg-white: #ffffff;
    --color-bg-green: #15c95d;
    --color-bg-hover: #0bac4c;
    --color-bg-green-pressed: #087c37;
    --color-bg-red: #f1493f;
    --color-bg-red-hover: #c8382f;
    --color-bg-red-pressed: #9d2c25;
    --color-fill-1: #f9ffe6;
    --color-fill-2: #ffedeb;
    --color-fill-3: #f4fff5;
    --color-fill-4: #ffeedd;
    --color-fill-bitgreen: #ea4b64;
    --color-fill-blue: #e3f3ff;
    --color-fill-green: #c4f1d6;
    --color-fill-red: #fbd1cf;
    --color-fill-input: #e8eaed;
    --color-border-1: #e2e2e5;
    --color-border-2: #ea4b64;
    --color-border-3: #f75c5c;
    --color-border-4: #f6f6f9;
  }

  /* 全屏模式 */
  .trading_view_fullscreen {
    position: fixed !important;
    z-index: 999;
    left: 0;
    top: 0;
  }
</style>
