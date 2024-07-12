import type { UploaderFileListItem } from 'vant';
export interface Result<T = any> {
  code: string;
  data: T;
  msg: string;
}
export interface ErrorResult {
  googleVerifySuc?: number;
  newEmailVerify?: number;
  newMobileVerify?: number;
  oldEmailVerify?: number;
  oldMobileVerify?: number;
  emailOldVerifySuc?: number;
  emailVerifySuc?: number;
  mobileOldVerifySuc?: number;
  mobileVerifySuc?: number;
  verifySuc?: boolean;
}

export interface GoogleVerifyParams {
  googleCode: string;
}
export interface EmailVerifyParams {
  emailCode: string;
}
export interface MobileVerifyParams {
  smsValidCode?: string;
  mobileCode?: string;
}

export interface GoogleInfoResult {
  googleImg: string;
  googleKey: string;
  googleUser: string;
}

export interface UnBundleGoogleVerifyParams {
  mobileCode?: string;
  emailCode?: string;
  googleCode?: string;
}

export interface BundleGoogleVerifyParams {
  googleKey?: string;
  googleCode?: string;
}

export interface BindEmailParams {
  email: string;
  emailValidCode?: string;
  smsValidCode?: string;
  googleCode?: string;
}
export interface ModifyEmailParams {
  email: string;
  emailNewValidCode: string;
  emailOldValidCode: string;
  googleCode?: string;
  smsValidCode?: string;
}

export interface BindMobileParams {
  countryCode: string;
  mobileNumber: string;
  smsAuthCode?: string;
  googleCode?: string;
  emailCode?: string;
}

export interface ModifyMobileParams {
  countryCode: string;
  mobileNumber: string;
  smsAuthCode: string;
  authenticationCode: string;
  googleCode?: string;
  emailCode?: string;
}

export interface SetFundPasswordParams {
  moneyPassword?: string;
  confirmMoneyPassword?: string;
  mobileCode?: string;
  emailCode?: string;
  googleCode?: string;
}
export interface ModifyFundPasswordParams {
  oldMoneyPassword?: string;
  newMoneyPassword?: string;
  confirmNewMoneyPassword?: string;
  mobileCode?: string;
  emailCode?: string;
  googleCode?: string;
}

export interface ResetFundCodeCheckParams {
  bindingMobileOrEmail: string;
  countryCode?: string;
}

export interface ResetPasswordCheckParams {
  mobileOrEmail: string;
  password: string;
  confirmPassword: string;
  countryCode?: string;
}

export interface ResetPasswordParams {
  mobile: string;
  email: string;
  google: string;
  token_test: string;
}

export interface ResetPasswordCheckResult {
  emailAuth: string;
  googleAuth: string;
  mobileAuth: string;
  token_test: string;
}
export interface SetPasswordParams {
  password?: string;
  confirmPassword?: string;
  smsValidCode?: string;
  emailCode?: string;
  googleCode?: string;
}
export interface ModifyPasswordParams {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  smsAuthCode?: string;
  smsValidCode?: string;
  emailCode?: string;
  googleCode?: string;
}
export interface SetFishCodeParams {
  antiPhishingCode?: string;
  smsAuthCode?: string;
  emailCode?: string;
  googleCode?: string;
  mobileCode?: string;
}
export interface ModifyFishCodeParams {
  oldAntiPhishingCode?: string;
  newAntiPhishingCode?: string;
  smsAuthCode?: string;
  smsValidCode?: string;
  emailCode?: string;
  googleCode?: string;
}
export interface ModifyNickNameParams {
  type: 1 | 2;
  nickName: string;
}

export interface LoginExpireParams {
  hour: number;
}

export interface LoginExpireResult {
  checked: number;
  content: string;
  hour: number;
}

export interface UploadAvatarParams {
  type: 0 | 1;
  url: string;
}

export interface WithdrawLimit {
  userKycTypeCode: 'lv1' | 'lv2';
}

export type KycStatus = 'no_auth' | 'authing' | 'approved' | 'reject';

export interface KycStatusResult {
  lv1: KycStatus;
  lv2: KycStatus;
}
export interface KycApplyLv1Params {
  countryCode: string;
  idCardType: 'id_card' | 'drive_license' | 'passport' | 'other';
  idCardNumber: string;
  name: string;
  surname: string;
  birthday?: string;
  files: File[];
  _birthday: string;
  _front?: UploaderFileListItem[];
  _back?: UploaderFileListItem[];
  _other?: UploaderFileListItem[];
}

export type FileType =
  | 'id_card_front'
  | 'id_card_back'
  | 'id_card_holding'
  | 'drive_license'
  | 'drive_license_holding'
  | 'passport'
  | 'passport_holding'
  | 'other'
  | 'other_holding';

export interface File {
  fileUrl: string;
  fileType: FileType;
}

export interface KycApplyLv2Params {
  countryCode: string;
  city: string;
  liveAddress: string;
  postCode: string;
  fileUrl: string;
  fileType: string;
  _file: UploaderFileListItem[];
}

export interface KycDetailResult {
  id: number;
  countryCode: string;
  idCardType: string;
  idCardNumber: string;
  userId: number;
  name: string;
  surname: string;
  birthday: string;
  checkType: string;
  kycType: string;
  checkStatus: string;
  checkReason: string | null;
  firstCheckTime: string | null;
  lastCheckTime: string | null;
  lastSubmitTime: string;
  city: string | null;
  liveAddress: string | null;
  postCode: string | null;
  ctime: string;
  mtime: string;
}
export interface WithdrawDepositResult {
  auth_lv2: AuthLv;
  auth_lv1: AuthLv;
}

export interface AuthLv {
  withdraw: 0 | 1;
  deposit: number;
  withdrawLimit: number;
}

export interface KycExitParams {
  idCardType: string;
  idCardNumber: string;
}

export interface KycExitResult {
  new: boolean;
  approved: boolean;
}

export interface KycAddressTypesResult {
  code: string;
  msg: string;
}
export interface ApiListParams {
  page: number;
  pageSize: number;
}
export interface ApiListResult {
  apiList: ApiListInfo[];
  count: number;
  pageSize: number;
}
export interface ApiListInfo {
  believeIps: string;
  id: number;
  label: string;
  token: string;
}

export interface CreateApiParams {
  believeIps: string;
  emailCode: string;
  googleCode: string;
  label: string;
  smsValidCode: string;
}

export interface UpdateApiParams {
  believeIps: string;
  emailCode: string;
  googleCode: string;
  label: string;
  smsValidCode: string;
  token: string;
}

export interface DeleteApiParams {
  token: string;
}

export interface OpenApiParams {
  emailCode: string;
  googleCode: string;
  smsValidCode: string;
  token: string;
}
export interface AuthenticatorInfoResult {
  userGoogleAuth: 0 | 1; // 用户谷歌验证码状态（0-未开启,1-开启）
  applyStatus: 0 | 1 | 2 | 3; // 申请注销状态  0-待审核 1-审核通过 2-审核拒绝 3-撤销
  platformGoogleAuth: 0 | 1; // 平台谷歌验证状态（0-未开启,1-开启）
  loginStatus: 0 | 1 | 2 | 3 | 4; // 用户登录冻结状态：0冻结，1：正常，2：注销 ，  3：申请注销    4：禁用
  accountName: string; // 用户手机或者邮箱
}
export interface UserDisableParams {
  googleCode: string;
  mobileCode: string;
  emailCode: string;
  type: number;
}
