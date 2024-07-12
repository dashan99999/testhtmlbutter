<template>
  <Teleport to="body">
    <div
      class="tv-order-bar"
      :class="themeClass"
      id="tvOrderBar"
      ref="orderBar"
      :style="{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0px)` }"
    >
      <div class="tv-order-tools">
        <div class="tv-order-drag">
          <svg width="6" height="14" viewBox="0 0 6 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="2" height="2" rx="1" fill="currentColor"></rect>
            <rect y="6" width="2" height="2" rx="1" fill="currentColor"></rect>
            <rect y="12" width="2" height="2" rx="1" fill="currentColor"></rect>
            <rect x="4" width="2" height="2" rx="1" fill="currentColor"></rect>
            <rect x="4" y="6" width="2" height="2" rx="1" fill="currentColor"></rect>
            <rect x="4" y="12" width="2" height="2" rx="1" fill="currentColor"></rect>
          </svg>
        </div>
        <div class="tv-order-center">
          <div class="tv-order-buy" :title="sellPrice" @click="() => onOrder(ORDER_TYPE.BUY, data.order.sellOne)">
            <span class="order-buy-title">{{ props.lang?.buy }}</span>
            <span class="order-buy-value">{{ sellPrice }}</span>
          </div>
          <label class="tv-order-input">
            <span class="order-input-title">{{ getPriceLang(props.lang, data.order.unit) }} ({{ getUnit() }}) </span>
            <input type="text" v-model="inputValue" ref="input" :placeholder="props.lang?.numberPlaceholder" @focus="() => setVisible(true)" />
            <i class="order-input-mini-tipsy" ref="miniTipsy">{{ props.lang?.tipsy.mini }} {{ data.order.minNum }} {{ getUnit() }}</i>
          </label>
          <div class="tv-order-sell" :title="buyPrice" @click="() => onOrder(ORDER_TYPE.SELL, data.order.buyOne)">
            <span class="order-sell-title">{{ props.lang?.sell }}</span>
            <span class="order-sell-value">{{ buyPrice }}</span>
          </div>
        </div>
        <div class="tv-order-close" @click="() => props.close && props.close()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="none"></rect>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.9877 10.5983L6.69471 5.30531C6.30233 4.92634 5.67863 4.93176 5.29289 5.31749C4.90716 5.70323 4.90174 6.32693 5.28071 6.71931L10.5737 12.0123L5.28071 17.3053C4.90174 17.6977 4.90716 18.3214 5.29289 18.7071C5.67863 19.0929 6.30233 19.0983 6.69471 18.7193L11.9877 13.4263L17.2807 18.7193C17.6731 19.0983 18.2968 19.0929 18.6825 18.7071C19.0683 18.3214 19.0737 17.6977 18.6947 17.3053L13.4017 12.0123L18.6947 6.71931C18.9547 6.46824 19.0589 6.09644 18.9674 5.74681C18.8759 5.39718 18.6028 5.12413 18.2532 5.03262C17.9036 4.9411 17.5318 5.04536 17.2807 5.30531L11.9877 10.5983Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div class="tv-order-bar-footer" ref="footer">
        <div class="tv-order-rise" :title="maxBuy">
          <span v-show="showMax">≈{{ maxBuy }} {{ getUnit() }}</span>
        </div>
        <ul class="tv-order-scale">
          <li @click="() => setMaxBuySell('10%')">10%</li>
          <li @click="() => setMaxBuySell('20%')">20%</li>
          <li @click="() => setMaxBuySell('50%')">50%</li>
          <li @click="() => setMaxBuySell('100%')">100%</li>
        </ul>
        <div class="tv-order-fall" :title="maxSell">
          <span v-show="showMax">≈{{ maxSell }} {{ getUnit() }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts" name="OrderBar" setup>
import { MaybeRef, Order, OrderEmit } from '../interfaces';
import { onMounted, reactive, ref, inject, computed, watch, onUnmounted } from 'vue';
import {
  toThousands,
  fillZero,
  formatPriceKMB,
  parseInputVolume,
  getPriceLang,
  throttledClick,
  setOrderBarCache,
  getThemeClassName
} from '../utils/index';
import { EVENTS, ORDER_TYPE, TV_DEFAULT_ID, WS_PRICES_CACHE_KEY, ENTRUST_TYPE, Unit } from '../constants';

const props = defineProps({
  lang: Object,
  theme: String,
  tvWidget: Object,
  close: Function,
  x: Number,
  y: Number
});

// 输入框
const inputValue = ref('');
// 百分比框
const footer = ref<HTMLDivElement>();
// 提示
const miniTipsy = ref<HTMLDivElement>();
// 最大可卖买状态显示隐藏控制
const showMax = ref(false);
// ws推送的价格
const data: MaybeRef<any> = inject(WS_PRICES_CACHE_KEY);

// 页面组件偏移
const offset = reactive({
  x: props.x,
  y: props.y,
  offsetX: 0,
  offsetY: 0,
  move: false
});

const input = ref<HTMLDivElement>();

// 控件
const orderBar = ref();
const emitOrder = inject<OrderEmit>(EVENTS.ORDER);
// 市价
const buyPrice = computed(() => toThousands(fillZero(data.value.order.buyOne, data.value.quotePrecision)));
const sellPrice = computed(() => toThousands(fillZero(data.value.order.sellOne, data.value.quotePrecision)));
// 最大可买卖
const maxBuy = ref('0');
const maxSell = ref('0');

// 控件本身的宽高
const tvOrderBarWH = reactive({
  width: 350,
  height: 80
});

// 主题class
const themeClass = computed(() => getThemeClassName(props.theme));

watch(
  () => inputValue.value,
  () => {
    if (!miniTipsy.value) return;

    if (!inputValue.value) {
      miniTipsy.value.style.display = 'block';
      // 如果没有输入则直接隐藏最大可买卖
      maxBuy.value = '0';
      maxSell.value = '0';
      showMax.value = false;
    } else if (inputValue.value >= data.value.order.minNum) {
      miniTipsy.value.style.display = 'none';
    } else {
      miniTipsy.value.style.display = 'block';
    }

    // 如果是用户输入则直接隐藏最大可买卖
    if (inputValue.value.indexOf('%') === -1) {
      maxBuy.value = '0';
      maxSell.value = '0';
      showMax.value = false;
    }
  }
);

watch(
  () => [props.x, props.y],
  () => {
    offset.x = props.x;
    offset.y = props.y;
  }
);

// 获取价格类型
const getUnit = () => ([Unit.quote, Unit.cost].includes(data.value.order.unit) ? data.value.quote : data.value.base);

// 设置footer和tipsy组件显示
const setVisible = (visible: boolean) => {
  if (!footer.value || !miniTipsy.value) return;

  if (visible) {
    footer.value.style.display = 'flex';
    if (inputValue.value.indexOf('%') === -1) miniTipsy.value.style.display = 'block';
  } else {
    footer.value.style.display = 'none';
    miniTipsy.value.style.display = 'none';
  }
};

// 计算金额
const calculatedAmount = (parmas: string, val: string) => {
  const result = parseFloat(parmas) * parseInputVolume(val);
  const newResult = fillZero(result.toString(), data.value.basePrecision);

  if (result >= 1000) {
    return toThousands(formatPriceKMB(newResult));
  } else {
    return toThousands(newResult);
  }
};

const setMaxBuySell = (val: string) => {
  inputValue.value = val;
  maxBuy.value = calculatedAmount(data.value.order.maxBuy, val);
  maxSell.value = calculatedAmount(data.value.order.maxSell, val);
  input.value?.focus();
  showMax.value = true;
};

// 点击买入卖出后事件回调
const onOrder = (type: string, price: string) =>
  throttledClick(() => {
    if (!inputValue.value) return;

    emitOrder?.({
      type: ENTRUST_TYPE.MARKET,
      side: type,
      numVal: inputValue.value,
      base: data.value.base,
      quote: data.value.quote,
      price
    } as Order);
    // 下单后清空输入
    setTimeout(() => (inputValue.value = ''), 500);
  });

// 鼠标按下
const mousedownFn = (e: any) => {
  if ([e.target.className, e.target.parentNode.className].includes('tv-order-drag')) {
    offset.move = true;
    offset.offsetX = e.offsetX;
    offset.offsetY = e.offsetY;
    document.body.style.pointerEvents = 'none';

    const tvOrderBar = document.getElementById('tvOrderBar');
    if (tvOrderBar) {
      tvOrderBarWH.width = tvOrderBar.offsetWidth;
      tvOrderBarWH.height = tvOrderBar.offsetHeight;
    }
  }
};
// 鼠标弹起
const mouseupFn = (e: any) => {
  if (offset.move) {
    offset.move = false;
    offset.offsetX = 0;
    offset.offsetY = 0;
    document.body.style.pointerEvents = 'initial';
    e.stopPropagation();
    e.preventDefault();
  }
};

// 鼠标移动
const mousemoveFn = (e: any) => {
  if (offset.move) {
    const offsetX = e.x - offset.offsetX;
    const offsetY = e.y - offset.offsetY;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const maxX = screenWidth - tvOrderBarWH.width;
    const maxY = screenHeight - tvOrderBarWH.height;

    // 确保拖动元素不超出屏幕边界
    offset.x = Math.min(Math.max(offsetX, 0), maxX);
    offset.y = Math.min(Math.max(offsetY, 0), maxY);

    setOrderBarCache({ x: offset.x, y: offset.y });

    e.stopPropagation();
    e.preventDefault();
  }
};

// 窗口大小变化
const resizeFn = (e: any) => {
  const target = document.getElementById('tvOrderBar');
  if (target && offset.x && offset.y) {
    const rect = target.getBoundingClientRect();
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const maxX = screenWidth - rect.width;
    const maxY = screenHeight - rect.height;

    // 修正元素位置
    if (offset.x > maxX) offset.x = maxX;
    if (offset.y > maxY) offset.y = maxY;

    setOrderBarCache({ x: offset.x, y: offset.y });
  }
};

onMounted(() => {
  document.addEventListener('mousedown', mousedownFn);
  document.addEventListener('mouseup', mouseupFn);
  document.addEventListener('mousemove', mousemoveFn);
  window.addEventListener('resize', resizeFn);

  // 处理用户点击K线本身时隐藏操作
  props.tvWidget &&
    props.tvWidget.onChartReady(() => {
      if (!props.tvWidget) return;

      const contentWindow = props.tvWidget._iFrame.contentWindow;
      const iframeDocument = contentWindow.document;

      // 点击操作隐藏快捷下单框
      iframeDocument.addEventListener('click', () => setVisible(false));
    });

  document.querySelector('.tv-order-drag')?.addEventListener('contextmenu', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  orderBar.value.addEventListener('click', (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  });

  // 挂载样式变量
  ['--tv-buy-color', '--tv-sell-color'].forEach((key) => {
    const value = document.getElementById(TV_DEFAULT_ID)?.style.getPropertyValue(key);
    orderBar.value.style.setProperty(key, value);
  });
});

onUnmounted(() => {
  document.removeEventListener('mousedown', mousedownFn);
  document.removeEventListener('mouseup', mouseupFn);
  document.removeEventListener('mousemove', mousemoveFn);
  window.removeEventListener('resize', resizeFn);
});
</script>

<style lang="scss">
.tv-order-bar {
  transform: translate3d(158px, 271px, 0px);
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-border-1);
  border-radius: 4px;
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: unset;
  z-index: 1000;
  user-select: none;

  .tv-order-tools {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .tv-order-drag,
    .tv-order-close {
      color: var(--color-text-2);
      cursor: pointer;
      height: 54px;
      display: flex;
      align-items: center;
      min-width: 15px;

      &:hover {
        color: white;
      }
    }

    .tv-order-drag {
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    }

    .tv-order-center {
      display: flex;

      .tv-order-buy {
        overflow: hidden;
        background-color: var(--tv-buy-color);
      }

      .tv-order-sell {
        overflow: hidden;
        background-color: var(--tv-sell-color);
      }

      .tv-order-buy,
      .tv-order-sell,
      .tv-order-input {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        min-width: 90px;
        height: 54px;
        font-size: 12px;
        line-height: 14px;
        cursor: pointer;
        padding-left: 5px;
        padding-right: 5px;

        & > span {
          margin: 2px 0;
        }
      }

      .tv-order-input {
        min-width: 120px;
        padding: 0 5px;
        color: var(--color-text-1);
        border: 1px solid var(--color-bg-2);
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;
        position: relative;

        &:focus,
        &:active,
        &:has(input:focus) {
          border-color: var(--color-text-1);
        }

        & input {
          outline: none;
          border: none;
          width: 100px;
          height: 20px;
          background-color: var(--color-bg-2);
          text-align: center;
          color: var(--color-text-1);
        }

        .order-input-mini-tipsy {
          display: none;
          position: absolute;
          top: -50px;
          background-color: var(--color-bg-5);
          color: var(--color-text-1);
          padding: 12px;
          border-radius: 4px;
          font-size: 12px;
          text-align: center;
          width: auto;
          font-style: initial;
          white-space: nowrap;

          &::after {
            content: '';
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid var(--color-bg-5);
            position: absolute;
            bottom: -8px;
            left: 45%;
            right: 50%;
            margin-left: auto;
            margin-right: auto;
          }
        }
      }
    }
  }

  .tv-order-bar-footer {
    display: none;
    border-top: 1px solid var(--color-border-1);
    padding: 5px 10px;
    font-size: 12px;
    line-height: 14px;
    align-items: center;
    justify-content: space-between;
    color: var(--color-text-2);
    transition: all 0.3s ease-in-out;
    overflow: hidden;

    .tv-order-rise {
      color: var(--color-text-1);
    }
    .tv-order-scale {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;

      & li {
        text-align: center;
        min-width: 30px;
        background-color: var(--color-bg-5);
        padding: 2px 5px;
        margin: 0 2px;
        border-radius: 2px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover,
        &.active {
          background-color: var(--color-bg-6);
          color: var(--color-text-1);
        }
      }
    }
    .tv-order-fall {
      color: var(--color-text-1);
    }
  }
}
</style>
