import { post } from '#shared/utils/http/axios';
import type {
  Result,
  HandleStarType,
  EntrustHistoryType,
  ListByOrderType,
  CreateOrderType,
  HistoryDataListType,
  OrderCancelDataType,
} from './type';

// 取消/收藏
export const setHandleStar = async (data: HandleStarType) =>
  post<Result>({ url: '/optional/update_optional_symbol', data }, { tips: true });

// 获取历史委托
// export const getEntrustHistory = async (data: EntrustHistoryType) =>
//   post<Result<HistoryDataListType[]>>({ url: '/api/v1/order/history/page', data });
// 新的历史委托接口
export const getEntrustHistory = async (data: EntrustHistoryType) =>
  post<Result<HistoryDataListType[]>>({ url: '/api/v1/order/entrust/page', data });

// 根据订单号分页查询成交记录
export const getListByOrder = async (data: ListByOrderType) => post<any>({ url: '/api/v1/order/deal/list', data });

// 单笔撤单
export const setOrderCancel = async (data: OrderCancelDataType) => post<any>({ url: '/api/v1/order/cancel', data }, { tips: true });

// 全部撤单
// export const setOrderCancelAll = async (data: OrderCancelAllType) => post<any>({ url: '/order/cancelAll, data }, { tips: true });

// 下单
export const createSpotOrder = async (data: CreateOrderType) => post<any>({ url: '/api/v1/order/place_order', data }, { tips: true });
