import { ResolutionsKey } from './interfaces';

// TradingView 默认 ID
export const TV_DEFAULT_ID = 'bitunix_trading_view';

// TradingView localStorage 存储key - 合约
export const CONTRACT_TV_CACHE_KEY = 'Bitunix_Contract_TradingView_Cache';

// TradingView localStorage 存储key - 现货
export const SPOT_TV_CACHE_KEY = 'Bitunix_Spot_TradingView_Cache';

// 分辨率缓存
export const RESOLUTIONS_CACHE_KEY = 'Bitunix_Resolution_Cache';

// 用户自己收藏的分辨率缓存
export const USER_RESOLUTIONS_CACHE_KEY = 'Bitunix_User.Resolution_Cache';

// 价格类型缓存
export const PRICE_CACHE_KEY = 'Bitunix_Price_Cache';

// 图表类型缓存
export const SERIES_CACHE_KEY = 'Bitunix_Series_Cache';

// 显示设置缓存
export const DISPLAY_CACHE_KEY = 'Bitunix_Display_Setting_Cache_V3';

// 合约快速下单显示位置缓存
export const CONTRACT_ORDER_BAR_XY_CACHE_KEY = 'Bitunix_Contract_OrderBarXY_Cache';

// 现货快速下单显示位置缓存
export const SPOT_ORDER_BAR_XY_CACHE_KEY = 'Bitunix_Spot_OrderBarXY_Cache';

// ws响应时间差值
export const WS_TIME_KEY = 'Bitunix_wsTime_Cache';

// 合约现货类型缓存
export const EX_TYPE_KEY = 'Bitunix_ExType_Cache';

// 历史数据无数据状态标识
export const HISTORY_STATE_KEY = 'Bitunix_HistoryBarNoData_Cache';

// 历史数据截止ID缓存
export const HISTORY_ENDID_KEY = 'Bitunix_HistoryEndId_Cache';

// 最新价格bar
export const NEW_BAR_CACHE_KEY = 'Bitunix_NewBar_Cache';

// 默认分辨率
export const DEFAULT_RESOLUTIONS = '15';

// 默认价格类型，最新价格
export const DEFAULT_PRICE = 'new';

// 不同价格类型前缀映射关系
export const PRICE_TYPE = {
  new: '',
  mark: '~',
  index: '.',
};

// 限价买入卖出控件大小
export const BUYANDSELL = {
  width: 212,
  height: 56,
};

// 对外事件暴露
export const EVENTS = {
  // 重新渲染
  RE_RENDER: 'reRender',
  // tv 组件初始化完毕
  CHART_READY: 'chartReady',
  // 订单类操作
  ORDER: 'order',
  // 点击买入卖出标记
  MARK: 'mark',
  // 更新限价委托
  UPDATE_LIMIT: 'updateLimit',
  // 更改限价委托
  EDIT_LIMIT: 'editLimit',
  // 取消限价委托
  CANCEL_LIMIT: 'cancelLimit',
} as const;

// 价格单位映射
export const Unit = {
  base: 'base',
  quote: 'quote',
  cost: 'cost',
};

// 订单类型
export const ORDER_TYPE = {
  BUY: '2',
  SELL: '1',
} as const;

// 委托类型
export const ENTRUST_TYPE = {
  LIMIT: '1', // 限价
  MARKET: '2', // 市价
} as const;

// 外层WS价格实时缓存
export const WS_PRICES_CACHE_KEY = 'ws_prices_cache';

// 请求最大重试次数
export const MAX_SEND = 5;

// 现货历史数据请求接口地址
export const SPOT_API = 'kline/history/spot';

// 合约历史数据请求接口地址
export const CONTRACT_API = 'kline/history/futures';

// 重新请求次数缓存KEY
export const SEND_CACHE_KEY = {
  NETWORK_TEST: 'bitunix.network.test',
  REQ_TEST: 'bitunix.req.test',
};

// 0 系统断线 | 1 系统链接稳定 | 2 系统重新链接中 | 3 系统链接不稳定
export const NETWORK_TYPE = {
  FAILED: 0,
  OK: 1,
  RETRY: 2,
  UNSTABLE: 3,
};

// 显示设置默认菜单配置项
export const DISPLAY_MENUS = {
  // 快速下单 - 市价
  orderQuickMarket: true,
  // 快速下单 - 限价
  orderQuickLimit: true,
  // 成交记录
  transactionRecords: true,
  // 持仓成本线
  positionCostLine: true,
  // 快捷平仓按钮
  quickCloseButton: true,
  // 快捷止盈止损
  quickTakeProfitStopLoss: true,
  // 限价委托线
  limitOrderLine: true,
  // 限价委托线 - 快捷改价
  quickPriceAdjustmentLimit: true,
  // 限价委托线 - 快捷撤单
  quickOrderCancellationLimit: true,
  // 止盈止损线
  takeProfitStopLossLine: true,
  // 止盈止损线 - 快捷改价
  quickPriceAdjustmentTake: true,
  // 止盈止损线 - 快捷撤单
  quickOrderCancellationTake: true,
  // 其他设置 - 高低价标签
  highLowPriceLabels: false,
  // 其他设置 - 倒计时
  countdown: true,
};

// 默认显示的图表类型
export const DEFAULT_SERIES = '1';

// 默认 Symbol
export const DEFAULT_SYMBOL = 'btcusdt';

export const DEFAULT_BASE = 'btc';

export const DEFAULT_QUOTE = 'usdt';

export const CLIENT_ID = 'www.bitunix.com';

export const VOLUME_HEIGHT = 60;

// 限价委托下单线边框颜色
export const ORDER_LINE_BORDER_COLOR = '#3E3E3E';

export const MAIN_COLOR = '#000000';

export const TEXT_MAIN_COLOR = '#999999';

export const HOVER_COLOR = '#ea4b64';

export const CO_WS_API_KEY = 'wss://api.bitunix.com/ws-futures/';

export const EX_WS_API_KEY = 'wss://api.bitunix.com/ws/';

export const PC_RESOLUTION_BREAK = 10;

export const PAGE_SIZE = 300;

export const SUBSCRIPT_NUMBER_MAP: {
  [index: number]: string;
} = {
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
  10: '₁₀',
  11: '₁₁',
  12: '₁₂',
  13: '₁₃',
  14: '₁₄',
  15: '₁₅',
};

export const RESOLUTION_MAPPING: {
  [index in ResolutionsKey]: string;
} = {
  '1': '1min',
  '3': '3min',
  '5': '5min',
  '15': '15min',
  '30': '30min',
  '60': '60min',
  '120': '2h',
  '240': '4h',
  '360': '6h',
  '480': '8h',
  '720': '12h',
  '1D': '1day',
  '3D': '3day',
  '1W': '1week',
  '1M': '1month',
};

export const resolutionsKey = [
  //   1 = 1分钟 D=天 W=周 M=月
  '1',
  '3',
  '5',
  '15',
  '30',
  '60',
  '120',
  '240',
  '360',
  '480',
  '720',
  '1D',
  '3D',
  '1W',
  '1M',
];

export const favoritesIntervals: ResolutionsKey[] = ['1', '15', '30', '240', '1D', '1W'];

// 禁用工具集配置
export const disabled_features_arr = [
  // 币对搜索
  'header_symbol_search',
  // 图表比较
  'header_compare',
  // 图表部分配置缓存，这个配置不能开，本地存储会有很多垃圾数据 -> https://github.com/tradingview/charting_library/issues/7935
  // 'save_chart_properties_to_local_storage',
  //显示允许跳转到特定栏的“转到”选项
  'go_to_date',
  // 用户管理
  'trading_account_manager',
  // 对象树面板
  'show_object_tree',
  'object_tree_legend_mode',
  // 下方账户管理
  'open_account_manager',
  // 右侧订单面板
  'order_panel',
  // 顶部bar
  'header_widget',
  // 右侧 + 号十字准线
  // 'chart_crosshair_menu',
  // 图表右键菜单
  // 'pane_context_menu',

  'symbol_info',

  // 图表底部的放大缩小移动
  // 'control_bar'
  //在图表设置中显示日期格式选择器
  // 'scales_date_format',
  //图表底部“时间范围”工具栏
  // 'timeframes_toolbar',
  // 将音量指示器与主系列放在同一窗格中
  // 'volume_force_overlay'
];

// 启用工具配置
export const enabled_features_arr = [
  'move_logo_to_main_pane',
  // 调整图表大小时锁定可见时间区域
  'lock_visible_time_range_on_resize',
  //隐藏图表图例和数据窗口中的区间（D、2D、W、M 等）
  'hide_resolution_in_legend',
  // 在触摸设备上，在图表底部显示缩放和移动按钮
  'show_zoom_and_move_buttons_on_touch',

  'disableDrawHorizLineMenuAction',
  'disableTradingMenuActions',
  'study_templates',
  // 设置十字线的默认行为按菜单显示
  'show_context_menu_in_crosshair_if_only_one_item',

  'support_multicharts',
];

export const overrides = (riseDownColor: string[]) => ({
  // 图类型（蜡烛图）
  'mainSeriesProperties.style': 1,
  'paneProperties.backgroundType': 'solid',
  // 蜡烛图样式
  'mainSeriesProperties.candleStyle.upColor': riseDownColor[0],
  'mainSeriesProperties.candleStyle.downColor': riseDownColor[1],
  'mainSeriesProperties.candleStyle.drawBorder': true,
  'mainSeriesProperties.candleStyle.borderUpColor': riseDownColor[0],
  'mainSeriesProperties.candleStyle.borderDownColor': riseDownColor[1],
  //网格线颜色
  //  "paneProperties.vertGridProperties.color": "#ebfded",
  // 区域字体颜色
  'scalesProperties.fontSize': 12,
});

export const studies_overrides = (riseDownColor: string[]) => ({
  'volume.volume.color.0': riseDownColor[1],
  'volume.volume.color.1': riseDownColor[0],
});
