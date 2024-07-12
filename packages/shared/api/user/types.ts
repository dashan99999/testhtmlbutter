export interface ReqParams {
  username: string;
  password: string;
}

export interface ReqAuth {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
}

export interface ResResult {
  data?: ResResultData;
  status: string | '';
  headers: object;
}
export interface ResResultData {
  code?: number;
  result?: any;
  message: string;
  status: string;
}

export interface GenerateRes {
  code: string;
  data?: string;
  msg?: string;
  flag: boolean;
}

export interface UnreadCountType {
  messageType?: string;
}
export interface UnreadCountResType {
  count: number;
}

export interface userMessagePageType {
  page: number;
  pageSize: number;
  messageType: string;
}
export type userMessagePageResArray = {
  content: string;
  ctime: string;
  detailUrl: string;
  id: string;
  messageType: string;
  readStatus: number;
  title: string;
  fold: boolean;
};
export interface userMessagePageResType {
  items: userMessagePageResArray[];
  total: string;
}

export interface UserTradeInfoType {
  assetsBalance: string;
  assetsLevel: number;
  futureLevel: number;
  futureVolume: string;
  nextAssetsBalanceDifference: string;
  nextFutureVolumeDifference: string;
  nextSpotVolumeDifference: string;
  spotLevel: number;
  spotVolume: string;
  vipLevel: number;
  nextVipLevel: number;
}

export interface VipRateRuleType {
  assetsBalance: string;
  futureMakerRate: string;
  futureTakerRate: string;
  futureVolume: string;
  id: number;
  side: string;
  spotMakerRate: string;
  spotTakerRate: string;
  spotVolume: string;
  vipLevel: number;
}

export interface InvitationInfoType {
  rebateCode: string;
  vipCode: string;
  welfareInvitationLink: string;
  partnerInvitationLink: string;
}
