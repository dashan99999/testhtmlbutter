import { post } from '#shared/utils/http/axios';
import { get } from '#shared/utils/http/axios/request';
import { PrefixEnum } from '#shared/utils/http/axios/prefix';
import type { IResponse } from '#shared/utils/http/axios/type';
import type { ErrorResult } from './types';

export type ProcessVerifyParams = {
  googleCode?: string;
  mobileCode?: string;
  emailCode?: string;
  /** 0: 关闭, 1: 开启 */
  type: 0 | 1;
  /** 1: 手机, 2: 邮箱 3: google */
  source: 1 | 2 | 3;
};

export const processVerify = (params: ProcessVerifyParams) => {
  return post<IResponse<ErrorResult | null>>(
    {
      url: '/api/v1/userCenter/process_verify',
      data: params,
    },
    {
      hostType: PrefixEnum.FE_EX_API,
      tips: true,
    },
  );
};

export type LandingConfig = {
  nickName: string;
  webBanner: string;
  h5Banner: string;
  startTime: string;
  endTime: string;
  content: string;
  partnerCode: string;
  deleted: boolean;
};

export const getLandingPage = (params: { landingPageCode: string }) => {
  return get<LandingConfig>({
    url: '/api/v1/web/partner/landingPage',
    params: params,
  });
};
