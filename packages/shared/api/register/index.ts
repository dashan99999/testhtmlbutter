import type {
  RegisterCheckParams,
  RegisterConfirmParams,
  RegisterConfirmRes,
  CheckAcceptParams,
  PlatFormCheckParams,
  PlatFormCheckRes,
  PlatFormLoginParams,
  PlatFormBindAccountParams,
  PlatFormBindNewAccountParams,
} from './types';
import { post } from '#shared/utils/http/axios';
import { get as $get } from '#shared/utils/http/axios/request';
import { PrefixEnum } from '../../utils/http/axios/prefix';

export const checkAccept = async (data: CheckAcceptParams) =>
  post<RegisterConfirmRes>({ url: '/api/v1/user/check_accept', data }, { tips: true });
export const emailRegisterCheck = async (data: RegisterCheckParams) =>
  post<RegisterConfirmRes>({ url: '/api/v2/web/user/email_register_check', data }, { tips: true, hostType: PrefixEnum.FE_AUTH_API });
export const emailRegisterConfirm = async (data: RegisterConfirmParams) =>
  post<RegisterConfirmRes>({ url: '/api/v2/web/user/email_register_confirm', data }, { tips: true, hostType: PrefixEnum.FE_AUTH_API });
export const mobileRegisterCheck = async (data: RegisterCheckParams) =>
  post<RegisterConfirmRes>({ url: '/api/v2/web/user/mobile_register_check', data }, { tips: true, hostType: PrefixEnum.FE_AUTH_API });
export const mobileRegisterConfirm = async (data: RegisterConfirmParams) =>
  post<RegisterConfirmRes>({ url: '/api/v2/web/user/mobile_register_confirm', data }, { tips: true, hostType: PrefixEnum.FE_AUTH_API });
export const checkPlatform = async (data: PlatFormCheckParams) =>
  post<PlatFormCheckRes>({ url: '/api/v2/web/user/platform_check', data }, { loading: true, hostType: PrefixEnum.FE_AUTH_API });
export const platFormLogin = async (data: PlatFormLoginParams) =>
  post<RegisterConfirmRes>({ url: '/api/v2/web/platform_login', data }, { tips: true, hostType: PrefixEnum.FE_AUTH_API });
export const bindAccount = async (data: PlatFormBindAccountParams) =>
  post<RegisterConfirmRes>({ url: '/api/v2/web/user/bing_now', data }, { tips: true, hostType: PrefixEnum.FE_AUTH_API });
export const bindNewAccount = async (data: PlatFormBindNewAccountParams) =>
  post<RegisterConfirmRes>({ url: '/api/v2/web/user/bind_create', data }, { tips: true, hostType: PrefixEnum.FE_AUTH_API });

export type PartnerInfo = {
  avatar?: string;
  nickName?: string;
  /** 是否展示 如果为false则展示默认邀请文案 */
  showOnPage?: boolean;
  /** 个人简介内容,如果内容为空则展示默认文案 */
  content?: string;
  /** 现货返佣比例 */
  exchangeRatio?: number;
  /** 合约返佣比例 */
  futureRatio?: number;
};
export function getInvitePartner(params: { partnerCode: string | number }) {
  return $get<PartnerInfo>({ url: '/api/v1/web/partner/registrationPageConfig', params });
}
