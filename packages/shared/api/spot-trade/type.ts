export interface Result<T = any> {
  code: string;
  data: T;
  msg: string;
  total?: number;
}
export interface HandleStarType {
  symbol: string;
  operationType: number;
  type: number;
}

export interface EntrustHistoryType {
  page: number | null;
  pageSize: number | null;
  startTime: string | null;
  endTime: string | null;
  status: number | null;
  side: number | null;
  type: number | null;
  base: string | null;
  quote: string | null;
  isShowCanceled?: number;
}
export interface ListByOrderType {
  orderId: string;
  base: string;
  quote: string;
}

export interface OrderCancelAllType {
  symbol?: string;
  type?: string;
  side?: string;
}
export interface CreateOrderType {
  side: string;
  price?: string;
  volume: string;
  type: string;
  base: string;
  quote: string;
}

export interface HistoryDataListType {
  orderId: string;
  userId: string;
  orderType: number;
  amount: string;
  dealAmount: string;
  leftAmount: string;
  volume: string;
  dealVolume: string;
  leftVolume: string;
  status: number;
  type: number;
  side: number;
  price: string;
  avgPrice: string;
  progress: string;
  ctime: string;
  utime: string;
  base: string;
  quote: string;
  symbol: string;
  fee: string;
  feeCoin: string;
  coinPairPrecisionBase?: number;
  coinPairPrecisionQuote?: number;
  isShowMore: boolean;
}

export type OrderCancelType = {
  orderId: string;
  base: string;
  quote: string;
};

export interface OrderCancelDataType {
  orderIdList: OrderCancelType[];
}
