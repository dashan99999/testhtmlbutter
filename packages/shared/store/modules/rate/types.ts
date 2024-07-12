export interface Rate {
  rateList: RateInfo[];
  quoteSymbol: string;
  symbolMap: Record<string, string>;
  currencyRateList: { content: string; avatar: string }[];
}
export interface RateInfo {
  baseSymbol: string;
  quoteSymbol: string;
  rate: number;
}
export type RateGetter = {
  rateObj: (state: Rate) => Record<RateInfo['baseSymbol'], number>;
  rateSymbol: (state: Rate) => string;
};
export type RateActions = {
  setQuoteSymbol: (symbol: string) => void;
  setInfo: (partial: Partial<Rate>) => void;
  getRateList: () => Promise<RateInfo[]>;
  getDefaultRateCurrency: () => Promise<void>;
};
//老系统数据结构示例

// 汇率信息
// market: {
//  rate: {
//   symbol: {
//     MATIC: 1.3079,
//     HOOK: 3.1026,
//     APT: 14.297,
//     SHIB: 0.00001329,
//     HT: 14.2302,
//     NEAR: 2.529,
//     FLOW: 1.094,
//     COMP: 54.665,
//     SLP: 0.0032,
//     HFT: 0.5388,
//     DENT: 0.001013,
//     MBOX: 0.561,
//     ZRX: 0.9294,
//     BSV: 182.0581,
//     BCH: 603.99,
//     CAKE: 4.624,
//     BSW: 0.2197,

//   },
//   USDT: {
//     HKD: 7.83649932,
//     TWD: 30.10244336,
//     CHF: 0.91994572,
//     EUR: 0.93385345,
//     DKK: 6.92075983,
//     MYR: 4.29789689,
//     USD: 0.9999,
//     CAD: 1.33989145,
//     ZAR: 17.58480365,
//     INR: 82.73948539,
//     THB: 33.57801934,
//     CNY: 6.78426051,
//     AUD: 1.41112618,
//     SGD: 1.32157394,
//     KRW: 1260.71267484,
//     JPY: 131.11942213,
//     PLN: 4.44443691,
//     GBP: 0.83147896,
//     IDR: 15120.15090597,
//     PHP: 55.11194435,
//     TRY: 8.86830644,
//     BRL: 5.18392132,
//     RUB: 71.3107237,
//   },
//   zh_CN: {
//     MATIC: 8.890773398355,
//     HOOK: 21.049525084377,
//     APT: 96.978968712297,
//   }
// },
// },
