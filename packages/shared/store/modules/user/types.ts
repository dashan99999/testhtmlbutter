import type { UserInfo as UserInfoResult } from '#shared/store/modules/user/types';
export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  user_id?: string;
  user_name?: string;
  real_name?: string;
  avatar?: string;
  desc?: string;
  password?: string;
  token?: string;
  location?: string;
  email?: string;
  auths?: string[];
  is_admin?: number;
  role?: RoleType;
}

export interface UserInfo {
  id?: number;
  avatar?: string; // 头像
  nickName?: string; // 昵称
  c2cNick?: string; //C2C昵称
  userAccount?: string; // 用户账号
  mobileAuthenticatorStatus?: number | string; // 手机号开启验证状态 0：未开启 1：开启
  mobileNumber?: string; // 绑定的手机号
  email?: string; // 绑定的邮箱号
  emailAuthenticatorStatus?: number | string; // 邮箱开启验证状态 0：未开启 1：开启
  googleAuthenticatorKey?: string; // 是否绑定了谷歌 '1'：已绑定 '0'：未绑定  注意：此状态为字符串
  googleAuthenticatorStatus?: number | string; // 谷歌开启验证状态 0：未开启 1：开启
  googleStatus?: number | string;
  bindEmailStatus?: number | string;
  bindPhoneStatus?: number | string;
  antiPhishingCode?: number | string; //是否设置了防钓鱼码  '1'：已设置
  antiPhishingCodeContent?: string; //防钓鱼码
  capitalPword?: number | string; // 是否设置了资金密码 '1'：已设置
  loginPword?: number | string; // 是否设置了登陆密码 '1'：已设置
  authLevel?: number; // 认证状态 0：认证中 1：KYC Lv1 2：KYC Lv2 3：未认证
  authLevelText?: string;
  tokenExpireHour?: number; // 账号登录有效期 72小时|24小时|5小时
  styleSetting: 0 | 1; // 风格设置 为色觉障碍人群提供风格配置  0：默认 1：色觉障碍
  colorSetting: 0 | 1; // 颜色配置 更换交易所涨跌对应颜色 0：红涨绿跌  1：绿涨红跌
  contractOpened?: 0 | 1; // 是否开通合约账户
  policyUrl: string; // 开通合约协议地址
  inviteCodeData: InviteCodeDataType; //默认邀请码信息
  rateInformation: UserRateType; // 当前用户费率信息
  regTime: string; // 用户注册时间
  countryCode?: string;
  isPartnerUser: boolean;
}

interface UserRateType {
  vipLevel: number;
  spotMakerRate: string;
  spotTakerRate: string;
  futureMakerRate: string;
  futureTakerRate: string;
}
export interface ColorSettingType {
  up: string;
  down: string;
  upColor: string;
  downColor: string;
}
export interface InviteCodeDataType {
  inviteCode: string;
  link: string;
  shareRatio: number;
  myRatio: number;
}
export type SecurityLevel = 'low' | 'medium' | 'high';

export type UserInfoGetter = {
  userProfile: (state: UserInfo) => UserInfo;
  userColorConfig: (state: UserInfo) => ColorSettingType;
  userSecurityLevel: (state: UserInfo) => SecurityLevel;
  googleBindShow: (state: UserInfo) => boolean;
};
export type UserInfoActions = {
  setInfo: (partial: Partial<UserInfo>) => void;
  resetInfo: () => void;
  info: () => Promise<UserInfoResult>;
  logout: () => Promise<void>;
  openContract: () => void;
  getDefaultInviteFn: () => Promise<void>;
  getVipUserRateFn: () => Promise<void>;
};
