/**
 * @example 2022-12-24T00:00:00Z
 */
type TimeString = string;
/**
 * @description 币对
 * @example BTCUSDT
 */
type TSymbol = string;
/**
 * @description 币种
 * @example BTC
 */
type TBase = string;
/**
 * @description 标的币
 * @example USDT
 */
type Tquote = string;
export interface IHistroyQueryParam {
  /**
   * @example BTCUSDT
   * @description 币对，不传查全部
   * @required true
   */
  // symbol: string;
  /**
   * @example 0
   * @description 0.全部 1.卖出 2.买入
   * @required true
   */
  side: SideType | 0;
  /**
   * @example 0
   * @description 0全部 1.限价 2.市价
   * @required true
   */
  type: 0 | 1 | 2;
  /**
   * @example 1
   * @description 页数
   * @required true
   */
  page: number;
  /**
   * @example 10
   * @description 条数
   * @required true
   */
  pageSize: number;
  /**
   * @description 起始时间  IOS 8601格式
   * @required true
   */
  startTime: TimeString;
  /**
   * @description 结束时间  IOS 8601格式
   * @required true
   */
  endTime: TimeString;
}

export interface IRespon<DATA> {
  code: number;
  msg: string;
  data: DATA;
}

export interface ListData<DATA> {
  records: DATA[];
  total: number;
}

export type IResponList<DATA> = IRespon<ListData<DATA>>;
/**
 * @description 仓位类型
 */
export enum WarehouseType {
  /**
   * @description 逐仓
   */
  pursue = 1,
  /**
   * @description 全仓
   */
  all = 2,
}

/**
 * @description 多仓 空仓
 */
export enum SideType {
  /**
   * @description 空仓
   */
  fail = 1,
  /**
   * @description 多仓
   */
  rise = 2,
}

export enum PositionType {
  /**
   * @description 逐仓
   */
  isolated = 1,
  /**
   * @description 全仓
   */
  cross = 2,
}
export enum EOriderStatus {
  /**
   * @description 进行中
   */
  inProgress = 1,
  /**
   * @description 已完成
   */
  complete = 2,
  /**
   * @description 部分成交
   */
  partDeal = 3,
  /**
   * @deprecated 已撤销
   */
  rescind = 4,
  /**
   * @description 异常订单
   */
  abnormal = 5,
  /**
   * @description 部分已成交撤销
   */
  partDealedRescind = 6,
}

export enum ExchangeType {
  /**
   * @description 限价单
   */
  limitPrice = 1,
  /**
   * @description 市价单
   */
  marketPrice = 2,
}
export interface IHistoryOrder {
  /**
   * @example
   * @description 订单id
   * @requires true
   */
  orderId: number;
  /**
   * @example
   * @description 仓位id
   * @requires true
   */
  positionId: number;
  /**
   * @example
   * @description 1:空仓, 2:多仓
   * @requires true
   */
  side: SideType;
  /**
   * @example
   * @description 委托总量
   * @requires true
   */
  amount: number;
  /**
   * @example
   * @description 委托价格
   * @requires true
   */
  price: number;
  /**
   * @example
   * @description 币对
   * @requires true
   */
  symbol: string;
  /**
   * @example
   * @description 1: 限价单, 2:市价单
   * @requires true
   */
  type: ExchangeType;
  /**
   * @example
   * @description 杠杆倍率
   * @requires true
   */
  leverage: number;
  /**
   * @example
   * @description 未成交量
   * @requires true
   */
  left: number;
  /**
   * @example
   * @description 成交平均价格
   * @requires true
   */
  averagePrice: number;
  /**
   * @example
   * @description 订单创建时间(ISO8601)
   * @requires true
   */
  ctime: string;
  /**
   * @example
   * @description 1:逐仓, 2:全仓
   * @requires true
   */
  positionType: PositionType;
  /**
   * @example
   * @description 抵扣手续费币种
   * @requires true
   */
  feeAsset: string;
  /**
   * @example 抵扣手续费
   * @description 抵扣手续费币种
   * @requires true
   */
  feeDiscount: number;
  /**
   * @example
   * @description 成交量
   * @requires true
   */
  dealAssetFee: number;
  /**
   * @example
   * @description 订单状态
   * @requires true
   */
  orderStatus: EOriderStatus;
}

export interface IOrderPendingQueryParam {
  page: number;
  pageSize: number;
  /**
   * @description 币对,不传为所有币对
   */
  symbol?: string;
}
/**
 * @description 当前委托(首次调用)
 */
export interface IOrderPending {
  /**
   * @description 订单id
   * @example
   */
  orderId: string;
  /**
   * @description 1:空仓, 2:多仓
   */
  side: SideType;
  /**
   * @description 委托量
   * @example
   */
  amount: string;
  /**
   * @description 委托价格
   * @example
   */
  price: string;
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 1: 限价单, 2:市价单
   * @example
   */
  type: ExchangeType;
  /**
   * @description 杠杆倍率
   * @example
   */
  leverage: number;
  /**
   * @description 剩余可成交量
   * @example
   */
  left: string;
  /**
   * @description 成交平均价格
   * @example
   */
  averagePrice?: number;
  /**
   * @description 订单创建时间(ISO8601)
   * @example
   */
  ctime: TimeString;
  /**
   * @description 1:逐仓, 2:全仓
   * @example
   */
  positionType: PositionType;
  /**
   * @description 抵扣手续费币种
   * @example
   */
  feeAsset: string;
  /**
   * @description 抵扣手续费
   * @example
   */
  feeDiscount: string;
  /**
   * @description 手续费数量
   * @example
   */
  dealAssetFee: string;
  /**
   * @description 订单状态1.进行中 2.已完成 3.部分成交 4.已撤销 6.异常订单 7.部分成交已撤销
   * @example
   */
  orderStatus?: EOriderStatus;
  /**
   * @description 基础币数量精度
   * @example
   */
  amountPrecision: number;
  /**
   * @description 价格精度
   * @example
   */
  pricePrecision: number;
  /**
   * @description 已成交价值
   * @example
   */
  dealMoney: string;
  /**
   * @description 已成交量
   * @example
   */
  dealVolume: string;
  /**
   * @description 委托来源
   * @example
   */
  source: string;
  /**
   * @description
   * @example
   */
  uid?: number;
  /**
   * @description 进度
   * @example
   */
  progress: string;
}

export interface IFuturePositionPending {
  /**
   * @description 仓位Id
   */
  positionId: number;
  /**
   * @description 位形成时间(ISO8601)
   */
  ctime: TimeString;
  /**
   * @description 币对
   */
  symbol: string;
  base: string;
  /**
   * @description 1:逐仓, 2:全仓
   */
  type: PositionType;
  /**
   * @description 1:空仓, 2:多仓
   */
  side: SideType;
  /**
   * @description 仓位数量 BTC
   */
  amount: number;
  /**
   * @description 剩余可平
   */
  closeLeft: number;
  /**
   * @description 开仓均价
   */
  openPrice: number;
  /**
   * @description 保证⾦（当前）
   */
  marginAmount: number;
  /**
   * @description 标记价格 默认不存在这个属性
   */
  signPrice?: string;
  /**
   * @description 开仓保证⾦率
   */
  openMargin: number;
  /**
   * @description 开仓保证⾦
   */
  openMarginImply: number;
  /**
   * @description 维持保证⾦率
   */
  maintenMargin: number;
  /**
   * @description 维持保证⾦数
   */
  maintenMarginAmount: number;
  /**
   * @description 已实现盈亏
   */
  profitReal: number;
  /**
   * @description 待结算盈亏
   */
  profitClearing: number;
  /**
   * @description 抵扣⼿续费币种
   */
  feeAsset: string;
  /**
   * @description 抵扣⼿续费
   */
  dealAssetFee: number;
  /**
   * @description 当前杠杆倍数
   */
  leverage: number;
  /**
   * @description 强平价格
   */
  liqPrice: number;
  /**
   * @description profitUnreal
   */
  profitUnreal: string;
  /**
   * @description 回报率
   */
  unrealRate: string;
  /**
   * @description 可平张数
   */
  closeLeftPiece: string;
}

/**
 * @description 币对信息
 */
export interface IMarketSymbol {
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description
   */
  base: string;
  /**
   * @description
   */
  quote: string;
  /**
   * @description 是否自选
   */
  collect: number;
  /**
   * @description 基础币数量精度(交易对中)
   */
  amountPrecision: number;
  /**
   * @description 价格精度
   */
  pricePrecision: string;
  /**
   * @description 基础币数量精度(单独)
   */
  basePrecision: number;
  /**
   * @description 计价币数量精度
   */
  quotePrecision: number;
  /**
   * @description 手续费精度
   */
  feePrecision: number;
}

/**
 * @description 币种
 */
export interface ICoinSymbol {
  coinSymbol: string;
  symbol?: string;
  icon: string;
}

/**
 * @description 杠杆梯度配置
 */
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
}

export interface ISymbolVOS {
  symbol: string;
  base: string;
  quote: string;
}

export interface ICoinSymbol {
  coinSymbol: string;
  icon: string;
}
export interface IUserSelected {
  /**
   * @description 返回数据类型1.有自选  0.推荐自选
   */
  type: 0 | 1;
  symbolList: string[];
  symbolVOS: ISymbolVOS[];
  symbolInfoList: ICoinSymbol[];
}

/**
 * @description 合约websocket订阅币对价格变化的数据结构
 */
export interface ICoinSymbolLivePriceInfoStruct {
  /**
   * @description 币对
   */
  symbol: TSymbol;
  /**
   * @description 当前最新价
   */
  close: string;
  /**
   * @description 24h成交额
   */
  amount: string;
  /**
   * @description 24h成交量
   */
  vol: string;
  /**
   * @description 24h最高价
   */
  high: string;
  /**
   * @description 24h最低价
   */
  low: string;
  /**
   * @description 今日涨跌幅
   */
  rose: string;
  /**
   * @description 24h涨跌幅
   */
  rose24h: string;
  base: TBase;
  quote: Tquote;
  /**
   * @description 消息发出时间
   */
  utime: string;
}

/**
 * @description 标记价格socket 推送结构
 */
export interface ICoinSymbolSignPriceInfoStruct {
  /**
   * @description 标记价格
   */
  signPrice: string;
  /**
   * @description 币对
   */
  symbol: TSymbol;
  /**
   * @description 最新资金费率
   */
  fundingRateLast: string;
  /**
   * @description 下轮资金费率
   */
  fundingRateNext: string;
  /**
   * @description 实时资金费率
   */
  fundingRatePredict: string;
  /**
   * @description 剧资金费结算还剩多少时间
   */
  fundingTime: string;
  /**
   * @description 指数价格
   */
  indexPrice: string;
  /**
   * @description 保证基金
   */
  insurance: string;
  /**
   * @description
   */
  positionAmount: string;
  /**
   * @description 更新时间
   */
  utime: string;
}

/**
 * @description 查询单币种合约账户资产
 */
export interface ISymbolAcountInfo {
  /**
   * @description 可用余额
   */
  available: string;
  /**
   * @description 冻结金额
   */
  frozen: string;
  /**
   * @description 可划转余额
   */
  transfer: string;
  /**
   * @description 保证金
   */
  margin: string;
  /**
   * @description 总资产
   */
  balanceTotal: string;
  /**
   * @description 未实现盈亏
   */
  profitUnreal: string;
  /**
   * @description
   */
  coinSymbol: string;
  /**
   * @description 总权益
   */
  total: string;
  /**
   * @description 总权益折合法币
   */
  totalQuote: string;
  /**
   * @description 未实现盈亏折合法币
   */
  profitUnrealQuote: string;
}

/**
 * @description 限价平仓
 */
export interface IFuturePositionCloseLimitPostParam {
  /**
   * @description 币对
   */
  symbol?: string;
  /**
   * @description 金额
   */
  amount?: string;
  /**
   * @description 1.卖出 2.买入
   */
  side?: string;
  /**
   * @description 单价
   */
  price?: string;
  /**
   * @description 创建时间
   */
  time?: string;
  /**
   * @description
   */
  sign?: string;
}

/**
 * @description 市价平仓
 */
export interface IFuturePositionCloseMarketPostParam {
  /**
   * @description 金额
   */
  amount: string;
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 仓位ID
   */
  positionId?: string | number;
}

/**
 * @description 市价开仓
 */
export interface IFutureOrderMarketPostParam {
  /**
   * @description 币对
   */
  symbol?: string;
  /**
   * @description 金额
   */
  amount?: string;
  /**
   * @description 1.卖出 2.买入
   */
  side: string;
  /**
   * @description 止盈价
   */
  stopProfitPrice?: string;
  /**
   * @description 止损价
   */
  stopLossPrice?: string;
}

/**
 * @description 限价开仓
 */
export interface IFutureOrderLimitPostParam {
  /**
   * @description 金额
   */
  amount?: string;
  /**
   * @description 创建时间
   */
  time?: string;
  /**
   * @description 1.卖出 2.买入
   */
  side?: string;
  /**
   * @description 单价
   */
  price?: string;
  /**
   * @description 币对
   */
  symbol?: string;
  /**
   * @description
   */
  sign?: string;
  /**
   * @description 止盈价
   */
  stopProfitPrice?: string;
  /**
   * @description 止损价
   */
  stopLossPrice?: string;
}

// 1.更新,2.平仓,3.系统平仓,4.自动减仓,5.强平,6.告警 (2023-01-17新增)
export enum PositionChangeMsgEvent {
  /**
   * @description 更新
   */
  update = 1,
  /**
   * @description 平仓
   */
  closePosition = 2,
  /**
   * @description 系统平仓
   */
  sysClosePosition = 3,
  /**
   * @description 自动减仓
   */
  autoReducePosition = 4,
  /**
   * @description 强平
   */
  forceClosePosition = 5,
  /**
   * @description 告警
   */
  warn = 6,
}
export interface IPositionChangeMsg {
  /**
   * @description // 事件. 1.更新,2.平仓,3.系统平仓,4.自动减仓,5.强平,6.告警 (2023-01-17新增)
   */
  event: PositionChangeMsgEvent;
  /**
   * @description 保证金
   */
  marginAmount: string;
  /**
   * @description 保证金率
   */
  openMargin: string;
  /**
   * @description 开仓价格
   */
  openPrice: string;
  /**
   * @description // 1.逐仓，2.全仓
   */
  type: string;
  /**
   * @description 建仓时间
   */
  ctime: string;
  /**
   * @description 仓位ID
   */
  positionId: string;
  /**
   * @description 指数价格
   */
  indexPrice: string;
  /**
   * @description 强平价格
   */
  liqPrice: string;
  /**
   * @description 杠杆
   */
  leverage: string;
  /**
   * @description 仓位数量
   */
  amount: string;
  /**
   * @description 待结算盈亏
   */
  profitClearing: string;
  /**
   * @description 已实现盈亏
   */
  profitReal: string;
  /**
   * @description 未实现盈亏
   */
  profitUnreal: string;
  /**
   * @description 回报率
   */
  unrealRate: string;
  /**
   * @description 1.空仓，2.多仓
   */
  side: SideType;
  /**
   * @description 标记价格
   */
  signPrice: string;
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 更新时间
   */
  utime: string;
  /**
   * @description
   */
  openMarginImply: string;
  /**
   * @description 维持保证金率
   */
  maintenMargin: string;
  /**
   * @description
   */
  maintenMarginAmount: string;
  /**
   * @description
   */
  feeAsset: string;
  /**
   * @description
   */
  dealAssetFee: string;
  /**
   * @description  可用数量
   */
  closeLeft: string;
  /**
   * @description 计量单位
   */
  base: string;
  /**
   * @description  计价单位
   */
  quote: string;
  /**
   * @description 计量精度
   */
  amountPrecision: string;
  /**
   * @description 计价精度
   */
  pricePrecision: string;
}

export interface IOrderExchangeMsg {
  /**
   * @description 订单创建时间
   */
  ctime: string;
  /**
   * @description 订单更新时间
   */
  utime: string;
  /**
   * @description 已成交价值
   */
  dealMoney: string;
  /**
   * @description 已成交数量
   */
  dealVolume: string;
  /**
   * @description  事件：1.挂单，2.更新，3.结束
   */
  event: string;
  /**
   * @description 订单ID
   */
  orderId: string;
  /**
   * @description 1.限价，2.市价
   */
  type: number;
  /**
   * @description 价格
   */
  price: string;
  /**
   * @description 剩余数量
   */
  left: string;
  /**
   * @description 1.卖出，2.买入
   */
  side: number;
  /**
   * @description 订单来源
   */
  source: string;
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 用户ID
   */
  userId: string;
  /**
   * @description 数量
   */
  amount: string;
  /**
   * @description 进度
   */
  progress: string;
  /**
   * @description 杠杆
   */
  leverage: number;
  /**
   * @description
   */
  positionType: number;
  /**
   * @description
   */
  dealAssetFee: string;
  /**
   * @description
   */
  feeAsset: string;
  /**
   * @description
   */
  feeDiscount: string;
  /**
   * @description 计量单位
   */
  base: string;
  /**
   * @description 计价单位
   */
  quote: string;
  /**
   * @description 计量精度
   */
  amountPrecision: number;
  /**
   * @description 计价精度
   */
  pricePrecision: number;
}

export interface IFutureStopPendingParams {
  symbol?: string;
  page: number;
  pageSize: number;
  side: 0 | 1 | 2;
}
/**
 * @description 计划委托列表
 */
export interface IFuturesStopPendingList {
  orderId: string;
  symbol: string;
  base: string;
  quote: string;
  uid?: string;
  /**
   * @description 1-限价单，2-市价单
   */
  type: number;
  side: SideType;
  ctime: string;
  mtime?: string;
  /**
   * @description 委托价
   */
  price: string;
  /**
   * @description 触发价
   */
  stopPrice: string;
  amount: string;
  /**
   * @description 开仓价值
   */
  dealMoney: string;
  /**
   * @description 0-未激活,1-激活,2-失败,3-撤单
   */
  orderStatus: number;
}

/**
 * @description 计划委托订单推送
 */
export interface IFutureStopPendingMsg {
  /**
   * @description 触发事件 1-挂单，2-激活，3-撤单
   */
  event: number;
  orderId: string; // 计划委托订单ID
  /**
   * @description 0-未激活,1-激活,2-失败,3-撤单
   */
  orderStatus: number;
  /**
   * @description 1-限价单，2-市价单
   */
  type: number;
  /**
   * @description 1-卖出，2-买入
   */
  side: SideType;
  /**
   * @description 数量
   */
  amount: string;
  /**
   * @description
   */
  price: string; // 价格
  /**
   * @description
   */
  stopPrice: string; // 计划价格
  /**
   * @description
   */
  dealMoney: string; // 开仓价值
  /**
   * @description
   */
  symbol: string; // 币对
  /**
   * @description
   */
  base: string;
  quote: string;
  ctime: string; // 创建时间
  utime: string; // 更新时间
}
/**
 * @description 计划委托限价平仓
 */
export interface IFutureStopLimitClose {
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 仓位id
   */
  positionId?: string;
  /**
   * @description 基础币数量
   */
  amount: string;
  /**
   * @description 触发价
   */
  stopPrice: string;
  /**
   * @description 委托价
   */
  price: string;
}

/**
 * @description 计划委托市价平仓
 */
export interface IFutureStopMarketClose {
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 仓位id
   */
  positionId?: string;
  /**
   * @description 基础币数量
   */
  amount: string;
  /**
   * @description 触发价
   */
  stopPrice: string;
}

/**
 * @description 计划委托限价开仓
 */
export interface IFutureStopLimit {
  /**
   * @description 挂单价
   */
  price: string;
  /**
   * @description 基础币数量
   */
  amount: string;
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 方向 1.卖出 2.买入
   */
  side: SideType;
  /**
   * @description 触发价
   */
  stopPrice: string;
}

/**
 * @description 计划委托市价开仓
 */
export interface IFutureStopMarket {
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 基础币数量
   */
  amount: string;
  /**
   * @description 方向 1.卖出 2.买入
   */
  side: SideType;
  /**
   * @description 触发价
   */
  stopPrice: string;
}

/**
 * @description 撤销计划委托
 */
export interface IFutureStopCancel {
  /**
   * @description 计划委托id
   */
  orderId: number;
  /**
   * @description 币对
   */
  symbol: string;
}

/**
 * @description 批量撤销计划委托
 */
export interface IFutureStopCancelAll {
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 方向 1.卖出 2.买入
   */
  side: SideType;
}
/**
 * @description 创建止盈止损单
 */
export interface IFuturesStopProfitLossCreate {
  /**
   * @description 币对
   */
  symbol: string;
  /**
   * @description 基础币数量
   */
  amount: string;
  /**
   * @description 止盈价格
   */
  stopProfitPrice: string;
  /**
   * @description 止盈类型 1.最新价 2.标记价
   */
  stopProfitType: number;
  /**
   * @description 止损价格
   */
  stopLossPrice: string;
  /**
   * @description 止损类型 1.最新价 2.标记价
   */
  stopLossType: number;
  /**
   * @description 仓位id
   */
  positionId?: string;
}

/**
 * @description 撤销止盈止损
 */
export interface IFutureStopProfitLossCancel {
  /**
   * @description 订单id
   */
  orderId: number;
  /**
   * @description 币对
   */
  symbol: string;
}

/**
 * @description 批量撤销止盈止损
 */
export interface IFutureStopProfitLossCancelAll {
  /**
   * @description 币对
   */
  symbol: string;
}

/**
 * @description 编辑止盈止损
 */
export interface IFutureStopProfitLossEdit {
  /**
   * @description 订单id
   */
  orderId: number;
  /**
   * @description 止盈价格
   */
  stopProfitPrice: string;
  /**
   * @description 止盈类型 1.最新价 2.标记价
   */
  stopProfitType: number;
  /**
   * @description 止损价格
   */
  stopLossPrice: string;
  /**
   * @description 止损类型 1.最新价 2.标记价
   */
  stopLossType: number;
}

/**
 * @description 止盈止损列表 参数
 */
export interface IFutureStopProfitLossPendingParam {
  page?: number;
  pageSize?: number;
  symbol?: string;
  positionId?: number;
}
/**
 * @description 止盈止损列表
 */
export interface IFutureStopProfitLossPending {
  /**
   * @description 订单id
   */
  id: number;
  /**
   * @description 仓位id
   */
  positionId: number;
  /**
   * @description 开仓均价
   */
  openPrice: string;
  /**
   * @description 预估强平价
   */
  liqPrice: string;
  /**
   * @description 张数
   */
  piece: number;
  /**
   * @description 数量
   */
  amount: string;
  /**
   * @description 止盈价
   */
  stopProfitPrice: string;
  /**
   * @description 止损价
   */
  stopLossPrice: string;
  /**
   * @description 止损价
   */
  lastPrice: string;
  /**
   * @description 止损价
   */
  symbol: string;
  /**
   * @description
   */
  base: string;
  /**
   * @description
   */
  quote: string;
  /**
   * @description 用户ID
   */
  uid: number;
  /**
   * @description 止盈类型 1.最新价 2.标记价
   */
  stopProfitType: number;
  /**
   * @description 止损类型 1.最新价 2.标记价格
   */
  stopLossType: number;
  /**
   * @description 杠杆倍数
   */
  leverage: number;
  /**
   * @description 仓位类型1.逐仓2.全仓
   */
  positionType: number;
  /**
   * @description 仓位可用张数
   */
  positionPiece: number;
  /**
   * @description 仓位可用张数
   */
  positionAmount: string;
  /**
   * @description 委托方向
   */
  side: string;
  /**
   * @description 仓位方向
   */
  positionSide: string;
  /**
   * @description 创建时间
   */
  ctime: string;
  /**
   * @description 占用保证金数
   */
  marginAmount: string;
  /**
   * @description 标记价格
   */
  signPrice: string;
  /**
   * @description 每张面值
   */
  pieceAmount: string;
}

/**
 * @description 止盈止损订单推送
 */
export interface IFutureStopProfitLossMsg {
  event: number; // 事件 1.创建 2.更新 3.结束
  id: number; // 止盈止损单ID
  amount: string; // 止盈止损单基础币数量
  lastPrice: string; // 最新价
  leverage: number; // 杠杆倍数
  liqPrice: string; // 预估强平价
  openPrice: string; // 开仓均价
  piece: number; // 张数
  positionAmount: string; // 仓位基础币数量
  positionId: number; // 仓位id
  positionPiece: number; // 仓位张数
  positionType: number; // 持仓模式 1.逐仓 2.全仓
  stopLossPrice: string; // 止损价
  stopLossType: number; // 止损触发类型 1.最新价 2.标记价
  stopProfitPrice: string; // 止盈价
  stopProfitType: number; // 止盈触发类型 1.最新价 2.标记价
  symbol: string; // 币对
  base: string; // 基础币种
  quote: string; // 计价币种
  side: number; // 仓位方向, 1.卖出,2.买入
  ctime: string; // 创建时间
  marginAmount: string; // 保证金金额
  signPrice: string; // 标记价格 (动态更新需要单独订阅sign_price_SYMBOL)
  pieceAmount: string; // 每张面值
  userId: number; // 用户ID
}
/**
 * @description 止盈止损历史列表
 */
export interface IFuturesStopProfitLossHistory {
  /**
   * @description 止盈止损id
   */
  id: number;
  /**
   * @description 止盈止损id
   */
  symbol: string;
  /**
   * @description
   */
  base: string;
  /**
   * @description
   */
  quote: string;
  /**
   * @description 止盈止损id
   */
  side: SideType;
  /**
   * @description 仓位id
   */
  positionId: number;
  /**
   * @description 仓位类型 1.逐仓2.全仓
   */
  positionType: number;
  /**
   * @description 杠杆倍数
   */
  leverage: number;
  /**
   * @description 止盈价
   */
  stopProfitPrice: string;
  /**
   * @description 止损价
   */
  stopLossPrice: string;
  /**
   * @description 订单状态 2.已触发 3.系统撤销 4.用户撤销
   */
  status: number;
  /**
   * @description 基础币数量
   */
  amount: string;
  /**
   * @description 张数
   */
  piece: string;
  /**
   * @description 已成交数量
   */
  transactionAmount: string;
  /**
   * @description 已成交张数
   */
  transactionPiece: string;
  /**
   * @description 止盈止损创建时间
   */
  ctime: string;
  /**
   * @description 触发时间
   */
  triggerTime: string;
  /**
   * @description 触发类型1.止盈 2.止损
   */
  triggerType: number;
  /**
   * @description 触发价
   */
  triggerPrice: string;
  /**
   * @description 触发委托id
   */
  triggerOrderId: string;
  /**
   * @description 触发委托方向
   */
  orderSide: string;
}

/**
 * @description 逐仓查询可减少最大保证金数参数
 */
export interface IFuturePositionMaxSubMarginParam {
  symbol: string;
}

/**
 * @description 逐仓查询可减少最大保证金数
 */
export interface IFuturePositionSubMargin {
  /**
   * @description 最大可扣减(客户端使用此值即可)
   */
  maxSubMargin: string;
  /**
   * @description 产品需求算出来的最大可扣减
   */
  maxSubMarginClient: string;
  /**
   * @description 底层算出来的
   */
  maxSubMarginC: string;
}

export interface IFuturePositionAdjustMargin {
  symbol: string;
  /**
   * @description 保证金变动数量(USDT)(减少传负数，增加传正数)
   */
  amount: string;
}

export interface IFutureMarketConfigParams {
  symbol: string;
}
export interface IFutureMarketConfigData {
  leverage: number;
  /**
   * @description 1.逐仓 2.全仓
   */
  positionType: number;
  symbol: string;
}

export interface IFutureMarketConfigUpdateParams {
  leverage: number;
  /**
   * @description 1.逐仓 2.全仓
   */
  positionType: number;
  symbol: string;
}

export interface IFutureMarketConfigUpdateData {
  leverage: number;
  /**
   * @description 1.逐仓 2.全仓
   */
  positionType: number;
  symbol: string;
}
