import { get, post } from '#shared/utils/http/axios';
import type {
  IHistroyQueryParam,
  IHistoryOrder,
  IResponList,
  IOrderPendingQueryParam,
  IOrderPending,
  IFuturePositionPending,
  IRespon,
  ICoinSymbol,
  IMarketSymbol,
  ICoinSymbolInfo,
  IUserSelected,
  ISymbolAcountInfo,
  IFuturePositionCloseLimitPostParam,
  IFuturePositionCloseMarketPostParam,
  IFutureOrderMarketPostParam,
  IFutureOrderLimitPostParam,
  IFutureStopLimitClose,
  IFutureStopMarketClose,
  IFutureStopLimit,
  IFutureStopMarket,
  IFutureStopCancel,
  IFutureStopCancelAll,
  IFuturesStopProfitLossCreate,
  IFutureStopProfitLossCancel,
  IFutureStopProfitLossCancelAll,
  IFutureStopProfitLossEdit,
  IFuturesStopProfitLossHistory,
  IFutureStopProfitLossPendingParam,
  IFutureStopPendingParams,
  IFuturePositionMaxSubMarginParam,
  IFuturePositionAdjustMargin,
  IFutureMarketConfigUpdateParams,
} from './types';
import { PrefixEnum } from '#shared/utils/http/axios/prefix';

/**
 * @description 历史委托列表 '/futures'
 * @yAPI http://192.168.1.181:3000/project/30/interface/api/639
 * @param params
 * @returns
 */
export function getFutureOrderHistory(params: IHistroyQueryParam) {
  return get<IResponList<IHistoryOrder>>({ url: '/futures/order/history', params }, { hostType: PrefixEnum.FE_COV_API });
}
/**
 * @description 当前委托(首次调用)
 * @yAPI http://192.168.1.181:3000/project/30/interface/api/970
 * @default params {page: 1, pageSize: 20 }
 * @param params
 */
export function getFutureOrderPending(params: Partial<IOrderPendingQueryParam> = {}) {
  const query = Object.assign({ page: 1, pageSize: 20, side: 0 }, params || {}) as IOrderPendingQueryParam;
  return get<IResponList<IOrderPending>>({ url: '/futures/order/pending', params: query }, { hostType: PrefixEnum.FE_COV_API });
}
/**
 * @description 撤销(开仓/平仓)委托
 * @param orderId 订单号
 * @param symbol 币对
 * @returns
 */
export function futureOrderCancel(orderId: number, symbol: string) {
  const params = {
    orderId,
    symbol,
  };
  return post({ url: '/futures/order/cancel', data: params }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 当前仓位(首次调用)
 * @param symbol 币对
 */
export function getFuturePositionList(symbol?: string) {
  const getOption = {
    url: '/futures/position/pending',
    params: { symbol },
  };
  return get<IResponList<IFuturePositionPending>>(getOption, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 币种列表
 * @returns
 */
export function getFutureMarketCoinSymbol() {
  return get<ICoinSymbol[]>({ url: '/futures/market/coinSymbols' }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 查询所有开放币对信息
 * @returns
 */
export function getFutureMarketSymbols() {
  return get<IMarketSymbol[]>({ url: '/futures/market/symbols' }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 查询币对基础配置
 */
export function getFutureMarketCoinSymbolInfo(symbol: string) {
  return get<IRespon<ICoinSymbolInfo>>({ url: '/futures/market/symbol', params: { symbol } }, { hostType: PrefixEnum.FE_COV_API });
}

export async function getFutureMarketCoinSymbolInfos() {
  const symbols = await getFutureMarketSymbols();
  const result: ICoinSymbolInfo[] = [];
  for (const symbol of symbols) {
    const res = await getFutureMarketCoinSymbolInfo(symbol.symbol);
    // @ts-ignore
    result.push(res);
  }
  return result;
}

/**
 * @description 自选-查询/推荐自选
 */
export async function getFutureUserSelection() {
  return await get<IUserSelected>({ url: '/futures/user/collection/query' }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @param symbol 保证金币种
 * @param quote 计价法币
 */
export async function getFutureCoinSymbolCount(symbol: string, quote?: string): Promise<ISymbolAcountInfo> {
  return get({ url: '/futures/assets/query', params: { coinSymbol: symbol, quoteSymbol: quote } }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 开通合约
 * @returns
 */
export function futureOpen() {
  return post({ url: '/futures/user/open', data: {} }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 限价平仓
 * @param param
 * @returns
 */
export function futurePositionCloseLimit(param: IFuturePositionCloseLimitPostParam) {
  return post({ url: '/futures/position/close/limit', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 市价平仓
 * @param param
 * @returns
 */
export function futurePositionCloseMarket(param: IFuturePositionCloseMarketPostParam) {
  return post({ url: '/futures/position/close/market', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 市价开仓
 * @param param
 * @returns
 */
export function futureOrderMarket(param: IFutureOrderMarketPostParam) {
  return post({ url: '/futures/order/market', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 限价开仓
 * @param param
 * @returns
 */
export function futureOrderLimit(param: IFutureOrderLimitPostParam) {
  return post({ url: '/futures/order/limit', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

export function futureAssetQuery(symbol: string) {
  return get({ url: '/futures/assets/query', params: { coinSymbol: symbol } }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 计划委托列表
 * @param param
 * @returns
 */
export function futureStopPending(param: IFutureStopPendingParams) {
  return get({ url: '/futures/stop/pending', params: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 计划委托限价平仓
 * @param param
 * @returns
 */
export function futureStopLimitClose(param: IFutureStopLimitClose) {
  return post({ url: '/futures/stop/limit/close', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 计划委托市价平仓
 * @param param
 * @returns
 */
export function futureStopMarketClose(param: IFutureStopMarketClose) {
  return post({ url: '/futures/stop/market/close', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 计划委托限价开仓
 * @param param
 * @returns
 */
export function futureStopLimit(param: IFutureStopLimit) {
  return post({ url: '/futures/stop/limit', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 计划委托市价开仓
 * @param param
 * @returns
 */
export function futureStopMarket(param: IFutureStopMarket) {
  return post({ url: '/futures/stop/market', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 撤销计划委托
 * @param param
 * @returns
 */
export function futureStopCancel(param: IFutureStopCancel) {
  return post({ url: '/futures/stop/cancel', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 批量撤销计划委托
 * @param param
 * @returns
 */
export function futureStopCancelAll(param: IFutureStopCancelAll) {
  return post({ url: '/futures/stop/cancelAll', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 创建止盈止损单
 * @param param
 * @returns
 */
export function futureStopProfitLossCreate(param: IFuturesStopProfitLossCreate) {
  return post({ url: '/futures/stopProfitLoss/create', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 撤销止盈止损
 * @param param
 * @returns
 */
export function futureStopProfitLossCancel(param: IFutureStopProfitLossCancel) {
  return post({ url: '/futures/stopProfitLoss/cancel', data: param }, { hostType: PrefixEnum.FE_COV_API });
}
/**
 * @description 批量撤销止盈止损
 * @param param
 * @returns
 */
export function futureStopProfitLossCancelAll(param: IFutureStopProfitLossCancelAll) {
  return post({ url: '/futures/stopProfitLoss/cancelAll', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 编辑止盈止损
 * @param param
 * @returns
 */
export function futureStopProfitLossEdit(param: IFutureStopProfitLossEdit) {
  return post({ url: '/futures/stopProfitLoss/edit', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 止盈止损列表
 * @param param
 * @returns
 */
export function futureStopProfitLossPending(param: IFutureStopProfitLossPendingParam) {
  return get({ url: '/futures/stopProfitLoss/pending', params: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 止盈止损历史列表
 * @param param
 * @returns
 */
export function futureStopProfitLossHistory(param: IFuturesStopProfitLossHistory) {
  return get({ url: '/futures/stopProfitLoss/history', params: param }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 逐仓查询可减少最大保证金数
 * @param
 * @returns
 */
export function futurePositionMaxSubMargin(param: IFuturePositionMaxSubMarginParam) {
  return get({ url: '/futures/position/maxSubMargin', params: param }, { hostType: PrefixEnum.FE_COV_API });
}

export function futurePositionAdjustMargin(param: IFuturePositionAdjustMargin) {
  return post({ url: '/futures/position/adjustMargin', data: param }, { hostType: PrefixEnum.FE_COV_API });
}

export function futureAssetsPosition(symbol: string) {
  return get({ url: '/futures/assets/position', params: { symbol } }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 查询杠杆倍率和仓位模式
 * @param symbol
 * @returns
 */
export function futureMarketConfig(symbol: string) {
  return get({ url: '/futures/market/config', params: { symbol } }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 更新杠杆倍率和仓位模式
 * @param param
 * @returns
 */
export function futureMarketUpdate(param: IFutureMarketConfigUpdateParams, tips = true) {
  return post({ url: '/futures/market/config/update', data: param }, { hostType: PrefixEnum.FE_COV_API, tips: tips });
}

/**
 * @description 自选-添加
 * @param symbols ['BTC', 'ETH']
 * @returns
 */
export function addFutureUserSelection(symbols: string[]) {
  return post({ url: '/futures/user/collection/add', data: symbols }, { hostType: PrefixEnum.FE_COV_API });
}

/**
 * @description 自选-删除
 * @param symbols 币种
 */
export async function deleteFutureUserSelection(symbols: string[]) {
  return await post<any>({ url: '/futures/user/collection/remove', data: symbols }, { hostType: PrefixEnum.FE_COV_API });
}
