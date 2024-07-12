import {
  IMarketSymbol,
  ICoinSymbolInfo,
  IUserSelected,
  ICoinSymbolSignPriceInfoStruct,
  ISymbolAcountInfo,
  ICoinSymbolLivePriceInfoStruct,
} from '#shared/api/contractTrad/types';
import { CoinPairType, SymbolByTypeRes } from '#shared/api/assets';

export interface Market {
  coinSymbolList: SymbolByTypeRes[];
  symbolList: UseCoinPairType[];
  fiatList?: Fiat[];
  userSelectedSymbol: OwnSymbolType[];
  symbolClass: ObjectOf<SymbolItem[]>;
  symbolName: string[];
  coinSymbolSort: string[];
  defaultCoin: DefaultCoinType;
  preferences: {
    coin: string;
    rate: number;
  };
  /**
   * @description 合约币种信息列表
   */
  futureSymbolList: FutureSymbol[];
  /**
   * @description 合约币对列表
   */
  futureCoinSymbolList: (IMarketSymbol & ICoinSymbolInfo)[];
  // futureList: undefined; // 所有合约数据列表
  // futureSybolClass: {}; // 经过分类的合约币中信息
  userSelectedFutureSymbol: IUserSelected; // 合约自选列表
  _currentFutureOperateCoinSymbol: string; // 当前操作的合约币对名称
  /**
   * @description 当前币种的标记价格等信息
   */
  currentFutureSignPrice: ICoinSymbolSignPriceInfoStruct | null;
  currentFutureOperateCoinLivePrice?: ICoinSymbolLivePriceInfoStruct;
  futureUserAcount: ISymbolAcountInfo; // 用户账户合约账户信息
  selectedSpotSymbol: string[]; // 现货选中的列表
  preparationSpotData: boolean;
}
export interface DefaultCoinType {
  base: string;
  quote: string;
  name?: string;
}

export interface FutureSymbol {
  coinSymbol: string;
  symbol?: string;
  icon: string;
}

export interface CoinSymbol {
  id: number;
  coinSymbol: string;
  name: string;
  fullName: string;
  contractAddress: string;
  showPrecision: number;
  requireMemo: number;
  tokenBase: string;
  depositConfirm: number;
  withdrawMax: number;
  withdrawMin: number;
  icon: string;
  depositMin: number;
  regular: string;
  mainChainType: number;
  mainChainSymbol: string;
  mainChainName: string;
  track: string;
  publishAmount: string;
}
export interface Symbol {
  symbol: string;
  base: string;
  quote: string;
  tradeTag?: string;
  basePrecision: number;
  quotePrecision: number;
  limitPriceMin: number;
  limitVolumeMin: number;
  marketBuyMin: number;
  marketSellMin: number;
  isOpen: number;
  sort?: number;
  rose24h?: string;
  close?: string;
  priceClass?: string;
  newClass?: string;
  precisions: string[];
}
export interface UseCoinPairType extends CoinPairType {
  rose24h?: string;
  close?: string;
  priceClass?: string;
  newClass?: string;
  tradeTag?: string;
  roseStyle?: { color: string };
}

export interface Fiat {
  precision: number;
  moneySymbol: string;
  countryCoin: string;
  currencyPrecisions?: {
    coinSymbol: string;
    precision: number;
  }[]; // 法币对特殊币种的精度
}
export interface OwnSymbolType {
  id: number;
  userId: number;
  type: number;
  sort: number;
  ctime: string;
  dtime: string;
  symbol: string;
}

export interface SymbolItem {
  base: string;
  basePrecision: number;
  id?: number;
  isOpen: number;
  limitPriceMin: number;
  limitVolumeMin: number;
  marketBuyMin: number;
  marketSellMin: number;
  pricePrecision: number;
  quote: string;
  quotePrecision: number;
  sort?: number;
  symbol: string;
}
export interface ObjectOf<V> {
  [_: string]: V;
}
export interface ReactivePickSymbolObjType {
  basePrecision: number;
  quotePrecision: number;
  symbol: string;
  base: string;
  quote: string;
  precisions: string[];
  isOpen: 0 | 1;
  openTime: null | string;
  minPrice: string;
  minVolume: string;
}
//老系统数据结构示例

// 币对信息
// market: {
//   USDT: {
//     'BTC/USDT': {
//       limitVolumeMin: '0.0000010000000000',
//       symbol: 'btcusdt',
//       showName: 'BTC/USDT',
//       marketBuyMin: '0.0100000000000000',
//       multiple: 3,
//       isOnlyHoldShow: 0,
//       IsST: 0,
//       marketSellMin: '0.0000010000000000',
//       sort: 1,
//       etfOpen: 0,
//       quoteFeeRate: 0.0006,
//       newcoinFlag: 0,
//       isShow: 1,
//       volume: 6,
//       depth: '0.01,0.1,1',
//       price: 2,
//       IsMine: '0',
//       name: 'BTC/USDT',
//       limitPriceMin: '0.0100000000000000',
//       IsLimitPlat: '0',
//       is_open_lever: 0,
//       openQuoteFee: 0,
//     },
//     'ETH/USDT': {
//       limitVolumeMin: '0.0020000000000000',
//       symbol: 'ethusdt',
//       showName: 'ETH/USDT',
//       marketBuyMin: '0.0100000000000000',
//       multiple: 3,
//       isOnlyHoldShow: 0,
//       IsST: 0,
//       marketSellMin: '0.0020000000000000',
//       sort: 2,
//       etfOpen: 0,
//       quoteFeeRate: 0.0006,
//       newcoinFlag: 0,
//       isShow: 1,
//       volume: 4,
//       depth: '0.01,0.1,1',
//       price: 2,
//       IsMine: '0',
//       name: 'ETH/USDT',
//       limitPriceMin: '0.0100000000000000',
//       IsLimitPlat: '0',
//       is_open_lever: 1,
//       openQuoteFee: 0,
//     }
//   },
// },

// 币种信息

// coinList: {
//   EUSDT: {
//     isFiat: 0,
//     fiatPrecision: {
//       krw: '2',
//       jpy: 2,
//       usd: '2',
//       cny: '2',
//     },
//     showName: 'EUSDT',
//     coinTag: '3',
//     symbolPrecision: {
//       krw: '0',
//       jpy: 2,
//       usd: '2',
//       cny: '2',
//     },
//     mainChainName: 'ERC20',
//     icon: '',
//     sort: 1,
//     tokenBase: 'ETH',
//     mainChainSymbol: 'USDT',
//     isOvercharge: 0,
//     otcOpen: 1,
//     name: 'EUSDT',
//     tagType: 0,
//     mainChainType: 2,
//     showPrecision: 6,
//     isOverchargeMsg: {},
//   },
//   USDT: {
//     isFiat: 0,
//     fiatPrecision: {
//       krw: '2',
//       jpy: 2,
//       usd: '2',
//       cny: '2',
//     },
//     showName: 'USDT',
//     coinTag: '',
//     symbolPrecision: {
//       krw: '0',
//       jpy: 2,
//       usd: '2',
//       cny: '2',
//     },
//     mainChainName: 'OMNI',
//     icon: 'https://ucc-local.oss-ap-southeast-1.aliyuncs.com/%E5%B8%81%E7%A7%8Dlogo/%E5%B8%81%E7%A7%8Dlogo/USDT.png',
//     sort: 1,
//     tokenBase: 'BTC',
//     mainChainSymbol: 'USDT',
//     isOvercharge: 0,
//     otcOpen: 1,
//     name: 'USDT',
//     tagType: 0,
//     mainChainType: 1,
//     showPrecision: 2,
//     isOverchargeMsg: {},
//   }
// },
