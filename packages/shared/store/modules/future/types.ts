import { IPositionChangeMsg } from '#shared/api/contractTrad/types';
import { Observable } from '#shared/utils/Observable';
interface baseSymbolStruct {
  coinSymbol: string;
  icon: string;
  showPrecision: number;
}
export interface FutureStoreState {
  isInitComplete: boolean;
  baseSymbols: baseSymbolStruct[];
  symbols: FutureSymbolStruct[];
  accountSummary: {
    available: string;
    balanceTotal: string;
    coinSymbol: string;
    frozen: string;
    margin: string;
    profitUnreal: string;
    profitUnrealQuote: string;
    total: string;
    totalQuote: string;
    transfer: string;
  };
  currentSymbol: string;
  symbolSignPrice: {
    [key: string]: SignPriceStruct;
  };
  liveQuotation: {
    [key: string]: Quotation;
  };
  symbolDetailMap: {
    [key: string]: ICoinSymbolInfo;
  };
  /**
   * @description 是否存在hooks更新账户信息
   */
  hasAccountSummary: boolean;
  positionChange$: Observable<any>;
  orderChange$: Observable<any>;
  stopOrderChange$: Observable<any>;
  stopProfitLossChange$: Observable<any>;
  quotationHistory: Map<string, Quotation[]>;
  tradeOperate: {
    leverage: number;
    type: 1 | 2;
    positionType: 1 | 2;
    position: IPositionChangeMsg[];
  };
}

export interface SignPriceStruct {
  signPrice: string | null;
  indexPrice: string | null;
  fundingRateLast: string | null;
  fundingRateNext: string | null;
  fundingRatePredict: string | null;
  fundingTime: string | null;
  insurance: string | null;
  positionAmount: string | null;
}
export interface Quotation {
  close: string | null; // 当前最新价
  amount: string | null; // 24h成交额
  vol: string | null; // 24h成交量
  high: string | null; // 24h最高价
  low: string | null; // 24h最低价
  rose: string | null; // 今日涨跌幅
  rose24h: string | null; // 24h涨跌幅
  base: string | null;
  quote: string | null;
  utime: string | null; // 更新时间
}
export interface FutureSymbolStruct {
  base: string;
  baseIcon: string;
  basePrecision: number;
  collect: number;
  feePrecision: number;
  makerFeeRate: string;
  pieceAmount: string;
  pricePrecision: number;
  priceSize: string;
  quote: string;
  quoteIcon: string;
  quotePrecision: number;
  symbol: string;
  takerFeeRate: string;
  tradingVolume: string;
}

export interface ILimit {
  /**
   * @description 倍数
   */
  leverage: number;
  /**
   * @description 维持保证金率
   */
  keepMarginRate: number;
  /**
   * @description 最大持仓数量
   */
  maxAmount: number;
}
export function createDefaultSignPrice() {
  return {
    signPrice: null,
    indexPrice: null,
    fundingRateLast: null,
    fundingRateNext: null,
    fundingRatePredict: null,
    fundingTime: null,
    insurance: null,
    positionAmount: null,
  };
}

export function createDefaultLiveQuotation() {
  return {
    close: null,
    amount: null,
    vol: null,
    high: null,
    low: null,
    rose: null,
    rose24h: null,
    base: null,
    quote: null,
    utime: null,
  };
}

export function createDefaultAccount() {
  return {
    available: '0.00000000',
    balanceTotal: '0.00000000',
    coinSymbol: 'USDT',
    frozen: '0.00000000',
    margin: '0.00000000',
    profitUnreal: '0.00000000',
    profitUnrealQuote: '0.00',
    total: '0.00000000',
    totalQuote: '0.00',
    transfer: '0.00000000',
  };
}

/**
 * @description 币种基础信息
 */
export interface ICoinSymbolInfo {
  /**
   * @description 币对名称
   */
  symbol: string;
  /**
   * @description 基准币种
   */
  base: string;
  /**
   * @description 计价币种
   */
  quote: string;
  /**
   * @description 默认杠杆
   */
  defaultLeverage: string;
  /**
   * @description 币数量最小单位
   */
  minAmount: number;
  /**
   * @description 币数量精度
   */
  amountPrecision: number;
  /**
   * @description 价格精度
   */
  pricePrecision: number;
  /**
   * @description 价格最小变化值
   */
  priceSize: number;
  /**
   * @description 一张数量
   */
  pieceAmount: number;
  /**
   * @description 杠杆梯度配置
   */
  limits: ILimit[];
  /**
   * @description 杠杆默认梯度
   */
  leverages: number[];
  /**
   * @description 最大杠杆倍数
   */
  maxLeverage: number;
  /**
   * @description 默认持仓模式1.逐仓2.全仓
   */
  defaultPositionType: number;
  /**
   * @description 市价下单最大数量
   */
  maxMarketBaseAmount: number;
  /**
   * @description 限价下单最大数量
   */
  maxLimitBaseAmount: number;
  /**
   * @description 市价下单最大金额
   */
  maxMarketQuoteAmount: number;
  /**
   * @description 限价下单最大金额
   */
  maxLimitQuoteAmount: number;
  /**
   * @description 最小交易量
   */
  minBaseAmount: number;
  /**
   * @description 最小交易额
   */
  minQuoteAmount: number;
  /**
   * @description 最大价差(当前价100，那么price范围为 100/10 - 100*10)
   */
  maxPriceOffsetRate: number;
  /**
   * @description 可开数量计算偏移量
   */
  openOffsetRate: number;
  /**
   * @description 成本计算偏移比例
   */
  costOffsetRate: number;
  /**
   * @description taker手续费率
   */
  takerFeeRate: number;
  /**
   * @description maker手续费率
   */
  makerFeeRate: number;
  /**
   * @description 标记价格
   */
  signPrice: number;
  /**
   * @description 最新价格
   */
  lastPrice: number;
  /**
   * @description 最新资金费率
   */
  fundingRateLast: number;
  /**
   * @description 预计下期资金费率
   */
  fundingRateNext: number;
  /**
   * @description 到下期资金费率改变还有多少分钟
   */
  fundingTime: number;
  /**
   * @description 深度值
   */
  depth0Prec?: number;
  depth1Prec?: number;
  depth2Prec?: number;
  updateTime: number;
}
// 1.更新,2.平仓,3.系统平仓,4.自动减仓,5.强平,6.告警
export enum PositionChangeType {
  update = 1,
  close = 2,
  systemClose = 3,
  decrease = 4,
  forceClose = 5,
  warn = 6,
}
export type FutureStoreGetter = {
  currentSignPrice: (state: FutureStoreState) => SignPriceStruct;
  currentLiveQuotation: (state: FutureStoreState) => Quotation;
  currentSymbolInfo: (state: FutureStoreState) => FutureSymbolStruct;
  currentPosition: (state: FutureStoreState) => any;
};
export interface FutureStoreActions {
  updateLeverage: (value: number) => void;
  updatePositionType: (type: 1 | 2) => void;
  updateCompleteStatus: () => void;
  getSymbol: (symbol: string) => FutureSymbolStruct | never;
  setEmptyAccountSummary: () => void;
  pushQuotationHistory: (symbol: string, data: Quotation) => void;
  getQuotationHistory: (symbol: string) => Quotation[];
  updateCurrentSymbol: (symbol: string) => void;
}
