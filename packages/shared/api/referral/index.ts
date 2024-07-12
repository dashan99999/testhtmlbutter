import { get, post } from '#shared/utils/http/axios';
import { InviteCodeDataType } from '#shared/store/modules/user/types';
import type { OverViewType, GenerateLinkCodeDataType, DefaultCodeType, ShareListType } from './type';

/**
 * 获取默认邀请码信息
 */
export const getDefaultInvite = async () => get<InviteCodeDataType>({ url: '/api/welfare/rebate/get_default_invite' });

/**
 * 获取返佣总览
 */
export const getRebateOverView = async () => get<OverViewType>({ url: '/api/welfare/rebate/over_view' });

/**
 * 邀请链接列表
 */
export const getRebateLinkList = async () => get<any>({ url: '/api/welfare/rebate/link_list' });

/**
 * 设置为默认邀请码
 */
export const setDefaultCode = async (data: DefaultCodeType) =>
  get<any>({ url: '/api/welfare/rebate/set_default', params: data }, { tips: true });

/**
 * 创建邀请码
 */
export const getGenerateLinkCode = async (data: GenerateLinkCodeDataType) =>
  post<any>({ url: '/api/welfare/rebate/generate_link_code', data }, { tips: true });

/**
 * 推荐记录列表
 */
export const getShareList = async (data: ShareListType) => get<any>({ url: '/api/welfare/rebate/share_list', params: data });

/**
 * 用户所有邀请码
 */
export const getUserAllCodeList = async () => get<any>({ url: '/api/welfare/rebate/code_list' });

/**
 * 返佣记录列表
 */
export const getRebateList = async (data: ShareListType) => get<any>({ url: '/api/welfare/rebate/rebate_list', params: data });

/**
 * 返佣记录列表
 */
export const getInviteRank = async () => get<any>({ url: '/api/welfare/rebate/invite_rank' });

/**
 * 获取用户剩余可创建邀请数量
 */
export const getRebateCount = async () => get<any>({ url: '/api/welfare/rebate/get_count' });

/**
 * 获取海报列表
 */
export const getInvitePoster = async () => get<any>({ url: '/api/welfare/rebate/get_invite_poster' });
