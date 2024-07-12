import type {
  Result,
  GoogleVerifyParams,
  MobileVerifyParams,
  EmailVerifyParams,
  UnBundleGoogleVerifyParams,
  BundleGoogleVerifyParams,
  GoogleInfoResult,
  BindEmailParams,
  ModifyEmailParams,
  BindMobileParams,
  ModifyMobileParams,
  SetFundPasswordParams,
  ModifyFundPasswordParams,
  ResetPasswordCheckParams,
  ResetPasswordParams,
  SetPasswordParams,
  ModifyPasswordParams,
  ResetFundCodeCheckParams,
  SetFishCodeParams,
  ModifyFishCodeParams,
  ModifyNickNameParams,
  LoginExpireParams,
  LoginExpireResult,
  UploadAvatarParams,
  WithdrawLimit,
  KycStatusResult,
  KycApplyLv1Params,
  KycApplyLv2Params,
  KycDetailResult,
  WithdrawDepositResult,
  KycExitResult,
  KycExitParams,
  KycAddressTypesResult,
  ApiListParams,
  ApiListResult,
  CreateApiParams,
  UpdateApiParams,
  DeleteApiParams,
  OpenApiParams,
  AuthenticatorInfoResult,
  UserDisableParams,
  ErrorResult,
} from './types';
import { post, get } from '#shared/utils/http/axios';
import { get as $get, post as $post } from '#shared/utils/http/axios/request';

export const openGoogleVerify = async (data: GoogleVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/google_verify', data }, { tips: true });
export const closeGoogleVerify = async (data: GoogleVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/close_google_verify', data }, { tips: true });
export const openMobileVerify = async (data: MobileVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/open_mobile_verify', data }, { tips: true });
export const closeMobileVerify = async (data: MobileVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/close_mobile_verify', data }, { tips: true });
export const openEmailVerify = async (data: EmailVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/open_email_verify', data }, { tips: true });
export const closeEmailVerify = async (data: EmailVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/close_email_verify', data }, { tips: true });
export const getGoogleQr = async () => post<GoogleInfoResult>({ url: '/api/v1/userCenter/toopen_google_authenticator' });
export const bundleGoogleVerify = async (data: BundleGoogleVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/checkBindingGoogleCode', data }, { tips: true });
export const unBundleGoogleVerify = async (data: UnBundleGoogleVerifyParams) =>
  post<Result>({ url: '/api/v1/userCenter/unBundleGoogleVerify', data }, { tips: true });
export const bindEmail = async (data: BindEmailParams) =>
  post<Result>({ url: '/api/v1/userCenter/email_bind_save_v2', data }, { tips: true });
export const bindSaveEmail = async (data: BindEmailParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/email_bind_save', data }, { tips: true });
export const modifyEmail = async (data: ModifyEmailParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/email_update', data, isLogout: false }, { tips: true });
export const bindMobile = async (data: BindMobileParams) =>
  post<Result>({ url: '/api/v1/userCenter/checkMobileCode', data }, { tips: true });
export const bindSaveMobile = async (data: BindMobileParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/mobile_bind_save', data }, { tips: true });
export const modifyMobile = async (data: ModifyMobileParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/mobile_update', data, isLogout: false }, { tips: true });
export const setFundPassword = async (data: SetFundPasswordParams) =>
  post<Result>({ url: '/api/v1/userCenter/setUpMoneyPassword', data }, { tips: true });
export const modifyFundPassword = async (data: ModifyFundPasswordParams) =>
  post<Result<ErrorResult | null>>({ url: '/api/v1/userCenter/modifyMoneyPassword', data }, { tips: true });
export const setPassword = async (data: SetPasswordParams) =>
  post<Result<ErrorResult | null>>({ url: '/api/v1/userCenter/set_password', data, isLogout: false }, { tips: true });
export const modifyPassword = async (data: ModifyPasswordParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/password_update', data, isLogout: false }, { tips: true });
export const resetPassword = async (data: ResetPasswordParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/confirmResetPassword', data }, { tips: true });
export const resetPasswordCheck = async (data: ResetPasswordCheckParams) =>
  post<Result>({ url: '/api/v1/userCenter/resetPassword', data }, { tips: true });
export const resetFundPasswordCheck = async (data: ResetFundCodeCheckParams) =>
  post<Result>({ url: '/api/v1/userCenter/resetFundingCode_check', data }, { tips: true });
export const resetFundPassword = async (data: ModifyFundPasswordParams) =>
  post<Result>({ url: '/api/v1/userCenter/resetFundingCode_update', data }, { tips: true });
export const setFishCode = async (data: SetFishCodeParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/setAntiPhishingCode', data }, { tips: true });
export const modifyFishCode = async (data: ModifyFishCodeParams) =>
  post<Result<ErrorResult>>({ url: '/api/v1/userCenter/modifyAntiPhishingCode', data, isLogout: false }, { tips: true });
export const modifyNickName = async (data: ModifyNickNameParams) =>
  post<Result>({ url: '/api/v1/userCenter/modifyNickName', data }, { tips: true });
export const loginExpire = async (data: LoginExpireParams) =>
  post<Result>({ url: '/api/v1/userCenter/login_expire', data }, { tips: true });
export const loginExpireList = async () => get<LoginExpireResult[]>({ url: '/api/v1/userCenter/login_expire' });
export const getAllAvatar = async () => get<Result>({ url: '/api/v1/userCenter/getAllAvatar' }, { tips: true });
export const uploadAvatar = async (data: UploadAvatarParams) =>
  post<Result>({ url: '/api/v1/userCenter/uploadAvatar', data }, { tips: true });
export const withdrawLimit = async (data: WithdrawLimit) => get<Result>({ url: '/user/kyc/withdraw_limit', params: data }, { tips: true });
export const getKycStatus = async () => $get<KycStatusResult>({ url: '/user/kyc/status' });
export const lv1Apply = async (data: KycApplyLv1Params) => $post<Result>({ url: '/user/kyc/lv1/apply', data, tips: false });
export const lv2Apply = async (data: KycApplyLv2Params) => $post<Result>({ url: '/user/kyc/lv2/apply', data, tips: false });
export const getKycDetail = async (params: WithdrawLimit) => $get<KycDetailResult>({ url: '/user/kyc/detail', params });
export const getKycRejectReason = async (data: WithdrawLimit) =>
  get<Result>({ url: '/user/kyc/reject_reason', params: data }, { tips: true });
export const getWithdrawDeposit = async () => $get<WithdrawDepositResult>({ url: '/user/kyc/withdraw_deposit/auth/list' });
export const getKycIdCardExist = async (data: KycExitParams) =>
  $get<KycExitResult>({ url: '/user/kyc/id_card/exist', params: data, reject: false });
export const getKycAddressTypes = async () => $get<KycAddressTypesResult[]>({ url: '/user/kyc/address/types' });
export const getMyApiList = async (data: ApiListParams) => post<ApiListResult>({ url: '/openapi/my_api_list', data });
export const createOpenApi = async (data: CreateApiParams) => post<Result>({ url: '/openapi/create_open_api', data }, { tips: true });
export const updateOpenApi = async (data: UpdateApiParams) => post<Result>({ url: '/openapi/update_open_api', data }, { tips: true });
export const deleteOpenApi = async (data: DeleteApiParams) => post<Result>({ url: '/openapi/delete_open_api', data }, { tips: true });
export const openApiOne = async (data: OpenApiParams) => post<Result>({ url: '/openapi/open_api_one', data }, { tips: true });
export const getAuthenticatorInfo = async () => get<AuthenticatorInfoResult>({ url: '/user/get_authenticator_info' });
export const userDisable = async (data: UserDisableParams) => post<Result>({ url: '/user/user_disable', data }, { tips: true });
export const authInfo = async (data: any) => {
  return post<Result>({ url: '/api/v1/userCenter/auth_verify', data }, { tips: true });
};
