import { get, post } from '#shared/utils/http/axios';
import { PrefixEnum } from '#shared/utils/http/axios/prefix';

export const getEarnConfig = () => {
  return get({ url: '/v1/product/and/config/get' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const getEarnCoins = (params: any) => {
  return post({ url: '/v1/coin/fetch', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const getAccountBalance = (params: { coin: String; type: Number }) => {
  return post({ url: '/v1/account/trans/balance', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const getEarnTokenBalance = (params: { coin: String }) => {
  return post({ url: '/v1/account/coinList', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const getFinanceUserStaking = () => {
  return get({ url: '/v1/finance/user-staking' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const getEarnUserInfo = () => {
  return get({ url: '/v1/user/userInfo' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const getYesterdayEarning = () => {
  return get({ url: '/v1/finance/yesterday/earning' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const getTotalEarning = () => {
  return get({ url: '/v1/finance/total/earning' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const accountTrans = (params) => {
  return post({ url: '/v1/account/trans', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const accountSwap = (params) => {
  return post({ url: '/v1/account/swap', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const accountSwapBalance = () => {
  return get({ url: '/v1/account/swap/balance' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const accountSwapHistory = (params) => {
  return post({ url: '/v1/account/swap/history', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const orderBuy = (params) => {
  return post({ url: '/v1/order/buy', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const orderSummary = (params) => {
  return post({ url: '/v1/order/summary', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

export const earnAccountCheck = () => {
  return get({ url: '/v1/earn/ieo/earnAccount/check' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const earnAccountOpen = () => {
  return post({ url: '/v1/earn/ieo/earnAccount/open' }, { hostType: PrefixEnum.FE_EARN_API });
};

export const orderPage = (params) => {
  return post({ url: '/v1/order/queryPage', data: params }, { hostType: PrefixEnum.FE_EARN_API, loading: true });
};

export const financeIncomeSta = () => {
  return get({ url: '/v1/finance/incomeSta' }, { hostType: PrefixEnum.FE_EARN_API });
};

// 资金赎回
export const orderRecycle = (params) => {
  return post({ url: '/v1/order/recycle', data: params }, { hostType: PrefixEnum.FE_EARN_API });
};

// 订单详情
export const orderDetail = (id) => {
  return get({ url: `/v1/order/detail/${id}` }, { hostType: PrefixEnum.FE_EARN_API });
};

// 订单收益明细
export const orderIncome = (id) => {
  return get({ url: `/v1/order/detail/income/${id}` }, { hostType: PrefixEnum.FE_EARN_API });
};

// 团队概述
export const teamOverview = () => {
  return get({ url: `/v1/team/overview` }, { hostType: PrefixEnum.FE_EARN_API });
};

// 昨日数据
export const teamStatisticsYesterday = () => {
  return get({ url: `/v1/team/statistics/yesterday` }, { hostType: PrefixEnum.FE_EARN_API });
};

// 质押排行
export const teamStakingTop = (params) => {
  return get({ url: `/v1/team/staking/top`, params }, { hostType: PrefixEnum.FE_EARN_API });
};

// 下级贡献
export const teamContributionTop = (params) => {
  return get({ url: `/v1/team/contribution/top`, params }, { hostType: PrefixEnum.FE_EARN_API });
};

// 团队质押订单
export const teamStakingOrder = (params) => {
  return get({ url: `/v1/team/staking/order`, params }, { hostType: PrefixEnum.FE_EARN_API });
};

// 资金流水
export const accountFlowPage = (params) => {
  return get({ url: `/v1/accountFlow/page`, params }, { hostType: PrefixEnum.FE_EARN_API });
};

// 资金流水详情
export const accountFlowPageDetail = (id) => {
  return get({ url: `/v1/accountFlow/detail/${id}` }, { hostType: PrefixEnum.FE_EARN_API });
};

// 直推/间推收益贡献
export const teamReferral = (params) => {
  return get({ url: `/v1/team/referral`, params }, { hostType: PrefixEnum.FE_EARN_API });
};

// 直推/间推详情
export const teamReferralSearch = (params) => {
  return get({ url: `/v1/team/referral/search`, params }, { hostType: PrefixEnum.FE_EARN_API });
};
