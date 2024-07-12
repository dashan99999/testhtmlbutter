import { post } from '#shared/utils/http/axios';
import { PrefixEnum } from '#shared/utils/http/axios/prefix';
import type { ErrorResult } from './types';
import type { IResponse } from '#shared/utils/http/axios/type';
//1.获取googleKey
export const createGoogleKey = (params: any) => {
  return post(
    {
      url: '/api/v1/userCenter/create_google_key',
      data: params,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};
// 2. 谷歌验证码校验
export const googleBind = (params: any) => {
  return post(
    {
      url: '/api/v1/userCenter/google_bind',
      data: params,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};
// 3.绑定谷歌验证器确认
export const googleBindConfirm = (params: any) => {
  return post<IResponse<ErrorResult | null>>(
    {
      url: '/api/v1/userCenter/google_bind_confirm',
      data: params,
      isLogout: false,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};
