// 权限问题后期增加
import { get, post } from '#shared/utils/http/axios';
import { get as $get, post as $post } from '#shared/utils/http/axios/request';
import { UserInfo } from '#shared/store/modules/user/types';
import { PrefixEnum } from '../../utils/http/axios/prefix';
import { getLoginHistory } from '../../utils/auth';
import type {
  GenerateRes,
  UnreadCountType,
  UnreadCountResType,
  userMessagePageType,
  userMessagePageResType,
  UserTradeInfoType,
  VipRateRuleType,
  InvitationInfoType,
} from './types';
// import axios from 'axios';
export interface LoginRes {
  token?: string;
  emailAuth?: number | string;
  googleAuth?: number | string;
  mobileAuth?: number | string;
  emailVerifySuc?: number;
  googleVerifySuc?: number;
  mobileVerifySuc?: number;
  flag?: boolean;
}
export interface LoginData {
  mobileNumber: {
    countryCode?: string;
    mobileNumber?: string;
  };
  loginPassword: string;
  email?: string;
}

export interface LoginParams {
  countryCode?: string;
  mobileNumber?: string;
  loginPassword: string;
  email?: string;
}

export interface ConfirmLoginData {
  emailCode?: string;
  mobileCode?: string;
  googleCode?: string;
  token?: string;
}

export interface ConfirmLoginErrorData {
  emailVerifySuc?: number;
  googleVerifySuc?: number;
  mobileVerifySuc?: number;
}

export interface GetIdentifyParams {
  /** 国家区号 */
  countryCode?: string;
  /** 手机号码 */
  mobileNumber?: string;
  /** 手机邮箱 */
  email?: string;
  /** 是否三方登录  true-是   false-不是，默认false */
  tripartite?: string;
  /** 三方登录ID */
  tripartiteId?: string;
  /** 三方登录token */
  tripartiteToken?: string;
  /** 三方登录类型 1:Apple,2:Google,3:Facebook,4:twitter */
  type?: 1 | 2 | 3 | 4;
}

export const getUserProfile = async () => get<UserInfo>({ url: '/api/v1/userCenter/getUserInfo' });
export const generate = async () => get<GenerateRes>({ url: '/api/v1/generate' }, { tips: true, hostType: PrefixEnum.FE_WS_API });

// 开通合约服务
export const openContract = async () => post({ url: '/futures/user/open' }, { loading: true, hostType: PrefixEnum.FE_COV_API });

/**
 * 获取用户站内信未读总条数
 */
export const getUnreadCount = async (data?: UnreadCountType) =>
  get<UnreadCountResType>({ url: '/user/message/unread_count', params: data });

/**
 * 分页获取站内信消息列表
 */
export const getUserMessagePage = async (data?: userMessagePageType) =>
  get<userMessagePageResType>({ url: '/user/message/page', params: data });

/**
 * 用户交易量信息
 */
export const getUserTradeInfo = async () => get<UserTradeInfoType>({ url: '/user/vip/user_trade_info' });

/**
 * 获取vip费率规则
 */
export const getVipRateRule = async () => get<VipRateRuleType[]>({ url: '/user/vip/rule/vip_rate_rule' });

/**
 * 当前用户费率信息
 */
export const getVipUserRate = async () => get({ url: '/user/vip/user_rate' });

/**
 * 获取账号标识
 */
export function getIdentify(params: GetIdentifyParams) {
  return $get<string, GetIdentifyParams>({ url: '/api/user/login/get_identify', prefix: PrefixEnum.FE_AUTH_API, params });
}

/**
 * @description 获取用户邀请码及邀请链接(新出接口)
 */
export function getInvitationInfo() {
  return $get<InvitationInfoType>({ url: '/api/v1/common/invitation_info', prefix: PrefixEnum.FE_EX_API });
}

export type LoginCheckParams = {
  /**区号必须 */
  countryCode?: string;
  /**手机号必须 */
  mobileNumber?: string;
  /**密码必须 */
  loginPassword: string;
  /**邮箱必须 */
  email?: string;
  /**验证流水号（极验图形验证码参数）必须 */
  lotNumber: string;
  /** 必须,验证输出信息（极验图形验证码参数）*/
  captchaOutput: string;
  /**验证通过标识（极验图形验证码参数）必须 */
  passToken: string;
  /**验证通过时间戳（极验图形验证码参数） */
  genTime: string;
};

export type LoginCheckData = {
  /** 手机开启状态	非必须 */
  mobileAuth?: number;
  /** 谷歌开启状态	非必须 */
  googleAuth?: number;
  /** 邮箱开启状态	非必须 */
  emailAuth?: number;
  /** 验证成功标识token	非必须 */
  token?: string;
  /** 是否常用设备  true-是   false-不是  必须 */
  frequentDevice: boolean;
};

export function loginCheck(data: LoginCheckParams, uidKey: string) {
  const UUID_CU = getLoginHistory(uidKey || 'none');
  console.log(UUID_CU);
  return $post<LoginCheckData, LoginCheckParams>({
    url: '/api/user/login/login_check',
    prefix: PrefixEnum.FE_AUTH_API,
    data,
    reject: false,
    headers: {
      'UUID-CU': UUID_CU,
    },
  });
}

export function loginOut() {
  return $post<any, void>({ url: '/api/v2/web/user/logout', prefix: PrefixEnum.FE_AUTH_API });
}

export function confirmLogin(data: ConfirmLoginData, uuid?: string) {
  const UUID_CU = getLoginHistory(uuid || 'none');
  return $post<Record<string, any>, ConfirmLoginData>({
    url: '/api/user/login/confirm_login',
    prefix: PrefixEnum.FE_AUTH_API,
    data,
    reject: false,
    headers: {
      'UUID-CU': UUID_CU,
    },
  });
}
export const scanLoginConfirm = async (uuid: string, identity: string) => {
  return post(
    {
      url: '/api/user/login/scan_login_confirm/' + uuid,
      headers: {
        'UUID-CU': identity,
      },
    },

    {
      hostType: PrefixEnum.FE_AUTH_API,
    },
  );
};
