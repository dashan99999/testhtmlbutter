export interface OrderColType {
  title: string;
  dataIndex: string;
  individualization?: boolean;
  accuracy?: 'basePrecision' | 'quotePrecision';
  suffix?: string;
}
export interface CurrentOrderDataType {
  amount: string;
  avgPrice: string;
  base: string;
  coinPair: string;
  ctime: string;
  dealAmount: string;
  dealVolume: string;
  event: string;
  leftAmount: string;
  leftVolume: string;
  orderId: string;
  price: string;
  progress: string;
  quote: string;
  side: number;
  status: number;
  symbol: string;
  type: number;
  userId: string;
  utime: string;
  volume: string;
  coinPairPrecisionBase?: number;
  coinPairPrecisionQuote?: number;
  isShowMore: boolean;
  fee?: string;
  feeCoin?: string;
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

export interface HistoryOrderDetailsType {
  id: string;
  price: string;
  volume: string;
  fee: string;
  feeCoin: string;
  role: string;
  ctime: string;
  amount: string;
}

export interface ExpandedTableType {
  id: string;
  price: string;
  volume: string;
  fee: string;
  feeCoin: string;
  role: number;
  ctime: string;
}

export interface ColumnsInt {
  title?: string;
  dataIndex?: string;
  slotName?: string;
  titleSlotName?: string;
  cellClass?: string;
  align?: 'left' | 'center' | 'right';
  width?: number;
}

// 暂时
export interface DataInt {
  data: any[];
  col: any[];
}
export interface ArrTransformObjData {
  label?: string;
  value?: number | string;
}
