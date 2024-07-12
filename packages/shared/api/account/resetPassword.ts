import { post } from '#shared/utils/http/axios';
import { PrefixEnum } from '#shared/utils/http/axios/prefix';
export const checkAccountExist = (params: any) => {
  return post(
    {
      url: '/api/v1/userCenter/check_account_exist',
      data: params,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};
export const verifyCode = (params: any) => {
  return post(
    {
      url: '/api/v1/userCenter/reset_pass_check_code',
      data: params,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};
export const resetPass = (params: any) => {
  return post(
    {
      url: '/api/v1/userCenter/reset_pass_confirm',
      data: params,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};
// 获取用户账户信息
export const authVerify = (params: any) => {
  return post(
    {
      url: '/api/v1/userCenter/auth_verify',
      data: params,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};
