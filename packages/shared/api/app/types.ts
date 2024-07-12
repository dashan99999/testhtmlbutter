import type { RateInfo } from '#shared/store/modules/rate/types';
import type { SymbolByTypeRes, CoinPairType } from '#shared/api/assets';
import type { Fiat } from '#shared/store/modules/market/types';
import type { IMarketSymbol, ICoinSymbol, ICoinSymbolInfo } from '#shared/api/contractTrad/types';
export interface SendCodeParams {
  account?: string;
  country?: string;
  type: string;
  isEmail: string;
  token?: string;
}

export interface ResResultData<t = any> {
  code?: number | string;
  data?: t;
  msg: string;
  status: string;
}

export interface CoinSymbolResult {
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
export interface SymbolResult {
  symbol: string;
  base: string;
  quote: string;
  tradeTag: string;
  pricePrecision: number;
  basePrecision: number;
  quotePrecision: number;
  limitPriceMin: number;
  limitVolumeMin: number;
  marketBuyMin: number;
  marketSellMin: number;
  isOpen: number;
  isFiat: number;
  depth0Pre: number;
  depth1Pre: number;
  depth2Pre: number;
}

export interface Rate {
  baseSymbol: string;
  quoteSymbol: string;
  rate: number;
}

export interface DefaultC2cNickFreeze {
  date: string;
}

export interface FreezeExpiryDate {
  hour: string;
}
export interface SpotType {
  type: number;
}

export interface NoticeItem {
  id: number;
  title: string;
  detailUrl: string;
  publishTime: string;
}

export interface LanguageItem {
  languageKey: string;
  languageName: string;
  currencyName: string;
}

export interface BannerItem {
  id: number;
  title: string;
  imageUrl: string;
  detailUrl: string;
  nativeUrl: string | null;
  clientType: string;
  sort: number;
}

export interface FriendLinkItem {
  id: number;
  parentId: number;
  name: string;
  sort: number;
  url: null | string;
  clientType: null | string;
  children?: FriendLinkItem[];
}

export interface MediaItem {
  sort: number;
  type: string;
  blackIcon: string;
  whiteIcon: string;
  list: { sort: number; notes: string; address: string }[];
}

export interface ListSocialMedia {
  blackIcon: string;
  whiteIcon: string;
  type: string;
  notes: string;
  address: string;
}

export type PublicInfoData = {
  user_day_withdraw_value_limit_lv1: string;
  user_day_withdraw_value_limit_no_auth: string;
  [key: string]: any;
};
export interface BaseConfig {
  rateList: RateInfo[];
  languageList: LanguageItem[];
  rateCurrency: { avatar: string; content: string }[];
  publicInfo: PublicInfoData;
  withDrawLimit: string;
  coinSymbolList: SymbolByTypeRes[];
  coinSymbolSort: string[];
  fiatList: Fiat[];
  futureCoinSymbolList: (IMarketSymbol & ICoinSymbolInfo)[];
  futureSymbolList: ICoinSymbol[];
  coinPairList: CoinPairType[];
}
