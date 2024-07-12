export interface SpotTradeInt {
  spotSpread: boolean;
  clickHandicap: string | number;
  symbolName: string[];
  isOpenMarketWs: Boolean;
  wsMarketData: FullVolumeDataType[];
  symbolBalanceObj: {
    baseBalance: string; //币对余额
    tradeTagBalance: string; //币种余额
  };
}
export interface Market {
  marketSort: string[];
  market: object;
}

export interface IwsResData {
  channel?: string;
  data?: object;
  ts?: string;
  ping?: string;
  value?: object;
}

export interface FullVolumeDataType {
  amount: string;
  base: string;
  close: string;
  high: string;
  lastDealId: number;
  low: string;
  open: string;
  quote: string;
  rose: string;
  rose7d: string;
  symbol: string;
  timestamp: number;
  utime: string;
  vol: string;
  rose24h: string;
  tradeTag: string;
  newClass?: string;
  beforePrice: string;
  priceClass: string;
  sort?: number;
}
