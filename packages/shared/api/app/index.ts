import { post, get } from '#shared/utils/http/axios';
import { get as $get, post as $post } from '#shared/utils/http/axios/request';
import Cookies from 'js-cookie';
import type {
  DefaultC2cNickFreeze,
  ResResultData,
  SendCodeParams,
  FreezeExpiryDate,
  SpotType,
  NoticeItem,
  LanguageItem,
  BannerItem,
  FriendLinkItem,
  MediaItem,
  ListSocialMedia,
  BaseConfig,
  PublicInfoData,
} from './types';
// import { PrefixEnum } from '../../utils/http/axios/prefix';
import { AreaCode, AreaCodeByIp } from '#shared/store/modules/app/types';
import { RateInfo } from '#shared/store/modules/rate/types';
import { Fiat, OwnSymbolType } from '#shared/store/modules/market/types';
import { getLoginHistory } from '../../utils/auth';

export const sendCode = async (data: SendCodeParams) => {
  const headers = {};
  if (data.type.toString() === '1') {
    const key = Cookies.get(import.meta.env.VITE_UNIQUE_KEY);
    headers['UUID-CU'] = key ? getLoginHistory(key) : '';
  }
  return post<ResResultData>({ url: '/api/v1/sms/send', data, headers }, { tips: true });
};
export const getAreaCode = async () => get<Array<AreaCode>>({ url: '/api/v1/areaCode/getAreaCode' });
export const getAreaCodeByIp = async () => get<AreaCodeByIp>({ url: '/api/v1/areaCode/getAreaCodeByIp' });
export const getPublicInfo = async () => $post<PublicInfoData>({ url: '/common/public_info_v4' });
export const getWithdrawLimit = async (params: { userKycTypeCode: 'lv1' | 'lv2' }) =>
  get<ResResultData<number>>({ url: '/user/kyc/withdraw_limit', params }, { tips: true });
export const getRateList = async () => get<Array<RateInfo>>({ url: '/api/v1/common/rate/list' });
export const getFiatList = async () => get<Array<Fiat>>({ url: '/api/v1/common/fiat_currency/list' });
export const getDefaultC2cNickFreeze = async () => get<DefaultC2cNickFreeze>({ url: '/api/v1/userCenter/default_c2c_nick_freeze' });
export const getFreezeExpiryDate = async () => get<FreezeExpiryDate>({ url: '/api/v1/userCenter/getFreezeExpiryDate' });
export const getUserSelectedSymbol = async (data: SpotType) => get<OwnSymbolType[]>({ url: '/optional/api/v1/user/own', data });
export const getTradeSort = async () => get<string[]>({ url: '/api/v1/common/trade_tag/list' });
export const getAccountSecurityFreezeTime = async () => get({ url: '/api/v1/userCenter/user/account_security_freeze_time' });
export const getLanguageList = async () => {
  return $get<LanguageItem[]>({ url: '/api/v1/common/language/list', cache: true });
};
export const getBannerList = () => {
  return $get<BannerItem[]>({ url: '/cms/banner/v1/list', cache: true, cacheIncludeHeadersKey: ['language'] });
};
export const getNoticeList = () => {
  return $get<NoticeItem[]>({ url: '/cms/notice/info/list' });
};
export const getFooterList = async () => {
  return $get<FriendLinkItem[]>({ url: '/cms/footer/list_tree', cache: true, cacheIncludeHeadersKey: ['language'] });
};
export const getMediaList = async () => {
  return $get<MediaItem[]>({ url: '/cms/official/info/list_group_social_media', cache: true, cacheIncludeHeadersKey: ['language'] });
};
export const getListSocialMedia = () => {
  return get<ListSocialMedia[]>({ url: '/cms/official/info/list_social_media' });
};
export const getDefaultRateCurrency = () => {
  return $get<{ avatar: string; content: string }[]>({ url: '/api/v1/userCenter/currency' });
};
export const getBaseConfig = () => {
  return $get<BaseConfig>({ url: '/api/config', prefix: '', baseURL: '' });
};
