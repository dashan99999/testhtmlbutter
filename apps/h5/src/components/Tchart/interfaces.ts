import { Ref } from 'vue';
import type { LanguageCode } from './public/charting_library';
import type {
  HistoryCallback,
  LibrarySymbolInfo,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback
} from './public/charting_library/datafeed-api';

export interface Bar {
  time: number;
  low: number;
  high: number;
  open: number;
  close: number;
  volume: number;
}
export interface ISubscriptionItem {
  lastBar: Bar;
  resolution: ResolutionString;
  callback: SubscribeBarsCallback;
}

export type symbolInfo = (symbolName: string) => LibrarySymbolInfo;

export type ResolutionsKey = '1' | '3' | '5' | '15' | '30' | '60' | '120' | '240' | '360' | '480' | '720' | '1D' | '3D' | '1W' | '1M';

export declare type Nominal<T, Name extends string> = T & {
  [Symbol.species]: Name;
};

export type ResolutionsString = Nominal<string, 'ResolutionString'>;

export type MaybeRef<T> = T | Ref<T>;

export type OnResetCacheNeededCallback = () => void;

export type OrderEmit = (data: { type: string; side: string; numVal: string; base: string; quote: string; price: string }) => void;
export interface IBitunixTradingViewCache {
  wsUrl: string | URL;
  channelToSub: Map<any, any>;
  preTime: number;
  currTime: number;
  currChannel: string;
  onResetCacheNeededCallbackCache: OnResetCacheNeededCallback;
  newDataCache: object[];
  setTimeout: number;
}

export interface EventBus {
  [event: string]: any;
}

export interface UrlParameters {
  symbol: string;
  end: number;
  interval: string;
  limit: number;
  type: string;
}

export type ThemeName = 'Light' | 'Dark';

export interface ChartStyle {
  // 买卖颜色配置 - ["#089981" //up , "#F23645"// down]
  riseDownColor: string[];
  // 主题色
  // mainColor: string;
}

export interface BaseConfig {
  // TradingView 渲染容器
  id: string;
  // 币对名称 - BTCUSDT
  symbol: string;
  // 基准币 - BTC
  base: string;
  // 计价币 - USDT
  quote: string;
  // 业务类型 - 现货:'spot' | 合约:'contract'
  exType: 'spot' | 'contract';
  // WS链接地址 - wss://api.bitunix.com/ws/
  wsUrl: string | URL;
  // chart风格配置 - { riseDownColor: ["#089981" //up , "#F23645"// down] , mainColor: '#111111' }
  chartStyle: ChartStyle;
  // 语言类型 - en-US
  lang?: LanguageCode;
  // 主题类型 - Light | Dark
  theme: ThemeName;
  // 最新实时价格、纵坐标价格等展示精度 - 4
  quotePrecision?: MaybeRef<string | number>;
  // 数量展示精度 - 2
  basePrecision?: string | number;
}

export interface Order {
  // 价格类型 - 限价: '1' | 市价: '2'
  type: string;
  // 买卖方向 - BUY: '2' | SELL: '1'
  side: string;
  // 购买数量
  numVal: string;
  // 基准币
  base: string;
  // 计价币
  quote: string;
  // 购买金额
  price: string;
}

export enum Unit {
  // 基准币 | 单位数量
  base = 'base',
  // 计价币 | 名义价值
  quote = 'quote',
  // 计价币另外一种类型（合约） | 成本价值
  cost = 'cost'
}

export interface KLineOrderConfig {
  // 买一价格
  buyOne: string;
  // 卖一价格
  sellOne: string;
  // 最大可买
  maxBuy: string;
  // 最大可卖
  maxSell: string;
  // 价格类型
  unit: Unit;
  // 最小下单数量
  minNum: string;
}

export interface LimitOrder {
  // 订单ID
  id: string;
  // 委托价格
  price: string;
  // 买卖方向
  side: string;
  // 数量
  amount: string;
  // 计量单位
  base: string;
  // 计价单位
  quote: string;
  // 1.挂单，2.更新，3.结束
  event: '1' | '2' | '3';
}

// 高级版配置
export interface OrderConfig {
  // 限价委托
  limitOrder: LimitOrder[];
}

// 转换器
export interface TransformConfig {
  // 历史K线转换器
  historyBars?: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: (error: string) => void
  ) => void;
  // 实时K线转换器
  subscribeBars?: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ) => void;
  // 取消实时K线转换器
  unsubscribeBars?: (listenerGuid: string) => void;
}
