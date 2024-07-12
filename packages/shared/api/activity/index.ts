import { get, post } from '#shared/utils/http/axios';
import { PrefixEnum } from '#shared/utils/http/axios/prefix';
import type {
  Result,
  TipsRecords,
  WelfareCouponType,
  WelfareCouponDataType,
  RewardRecordType,
  RewardRecordList,
  OpenLotteryType,
  NewTaskQuery,
  TaskQueryType,
  TaskQueryDataType,
  DailyTaskCycleQueryType,
  LimitTimeDepositStatus,
  ClaimTaskRewardsType,
  RewardConfigurationType,
  KolTradeDetailType,
  KolTradeStatisticsType,
  KolTradeRankListParamsType,
  KolTradeRankListType,
  CompetitionConfigurationType,
  CompetitionSummaryDataType,
  CompetitionRewardRecordsParams,
  CompetitionRewardRecordsType,
  CompetitionPrizeParticipantsType,
  CompetitionEvent1PrizePoolType,
  CompetitionTurntableType,
  CompetitionEvent2PrizePoolType,
  CompetitionEvent3RankingType,
} from './type';

/**
 * @description 优惠券分页查询
 */
export const getWelfareCouponPage = async (data: WelfareCouponType) => {
  return get<TipsRecords<WelfareCouponDataType[]>>({ url: '/welfare_coupon/page', params: data }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 激活优惠券
 */
export const getActivateCoupon = async (data: { couponId: number }) => {
  return post<Result>({ url: '/welfare_coupon/activate_coupon', data }, { hostType: PrefixEnum.FE_WELFARE_API, tips: true });
};

/**
 * @description 抽奖奖励历史查询
 */
export const getRewardRecord = async (data: RewardRecordType) => {
  return get<{ records: RewardRecordList[] }>(
    { url: '/welfare_lottery/record_page', params: data },
    { hostType: PrefixEnum.FE_WELFARE_API },
  );
};

/**
 * @description 用户可用抽奖次数查询
 */
export const getOpportunityCount = async () => {
  return get<{ data: number }>({ url: '/welfare_lottery/opportunity_count' }, { tips: true, hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 新人盲盒开启抽奖
 */
export const getOpenLottery = async () =>
  get<OpenLotteryType>({ url: '/welfare_lottery/execute_lottery' }, { hostType: PrefixEnum.FE_WELFARE_API });

/**
 * @description 新人任务查询
 */
export const getNewTaskQuery = async () => get<NewTaskQuery[]>({ url: '/welfare_lottery/status' }, { hostType: PrefixEnum.FE_WELFARE_API });

/**
 * @description 任务查询
 */
export const getTaskQuery = async (data: TaskQueryType) => {
  return get<TaskQueryDataType[]>({ url: '/welfare_task/page', params: data }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 日常任务周期查询
 */
export const getDailyTaskCycleQuery = async () => {
  return get<DailyTaskCycleQueryType>({ url: '/welfare_task/daily_task_cycle' }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 参加限时入金活动状态
 */
export const getIsLimitDeposit = async () => {
  return get<LimitTimeDepositStatus>({ url: '/welfare_task/limit_time_deposit_status' }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 领取限时入金活动奖励
 */
export const getLimitReward = async () => {
  return post<OpenLotteryType>({ url: '/welfare_task/grant_limit_time_deposit_reward' }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 参加限时入金活动
 */
export const getJoinLimitDeposit = async () => {
  return post<Result>({ url: '/welfare_task/join_limit_time_deposit' }, { hostType: PrefixEnum.FE_WELFARE_API, tips: true });
};

/**
 * @description 用户净充值总额统计
 */
export const getUserNetSum = async () => {
  return get<number>({ url: '/transaction/user/deposit/net_sum' });
};

/**
 * @description 领取任务奖励
 */
export const getTaskRewards = async (data: Record<'taskId', number>) => {
  return post<ClaimTaskRewardsType>({ url: '/welfare_task/grant_task_coupon', data }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 限时入金奖励配置查询
 */
export const getRewardConfiguration = async () => {
  return get<RewardConfigurationType[]>({ url: '/welfare_task/limit_time_deposit_reward' }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 查询限时入金结束时间
 */
export const getLimitEndTime = async () => {
  return get<string>({ url: '/welfare_task/limit_time_deposit_end_time' }, { hostType: PrefixEnum.FE_WELFARE_API });
};

/**
 * @description 查询KOL活动详情
 */
export const getKolTradeDetail = async (data: Record<'actCode', string>) => {
  return get<KolTradeDetailType>({ url: '/trade/match/detail', params: data }, { hostType: PrefixEnum.FE_EX_API });
};

/**
 * @description KOL活动报名
 */
export const getKolTradeApplication = async (data: Record<'actId', number>) => {
  return post<Result>({ url: '/trade/match/enroll', data }, { hostType: PrefixEnum.FE_EX_API, tips: true });
};

/**
 * @description KOL查询交易统计
 */
export const getKolTradeStatistics = async (data: Record<'actId', number>) => {
  return get<KolTradeStatisticsType>({ url: '/trade/match/stats', params: data }, { hostType: PrefixEnum.FE_EX_API });
};

/**
 * @description KOL查询排行榜
 */
export const getKolTradeRankList = async (data: KolTradeRankListParamsType) => {
  return get<KolTradeRankListType>({ url: '/trade/match/rank/page', params: data }, { hostType: PrefixEnum.FE_EX_API });
};

/**
 * @description 平台交易大赛活动报名
 */
export const getCompetitionRegistration = async () => {
  return post<Boolean>({ url: '/futures/match/activity/apply' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛查询活动配置信息
 */
export const getCompetitionConfiguration = async () => {
  return get<CompetitionConfigurationType>({ url: '/futures/match/activity/config' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛查询活动个人数据汇总
 */
export const getCompetitionSummaryData = async () => {
  return get<CompetitionSummaryDataType>({ url: '/futures/match/activity/personal/summary' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛查询奖励记录
 */
export const getCompetitionRewardRecords = async (data?: CompetitionRewardRecordsParams) => {
  return get<CompetitionRewardRecordsType[]>(
    { url: '/futures/match/activity/prize/list', params: data },
    { hostType: PrefixEnum.FE_COV_API },
  );
};

/**
 * @description 查询活动奖池、参赛人数
 */
export const getCompetitionPrizeParticipants = async () => {
  return get<CompetitionPrizeParticipantsType>({ url: '/futures/match/activity/dashboard' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛查询活动一奖池、剩余抽奖次数
 */
export const getCompetitionEvent1PrizePool = async () => {
  return get<CompetitionEvent1PrizePoolType>({ url: '/futures/match/activity/draw/query' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛查询转盘奖项列表
 */
export const getCompetitionTurntable = async () => {
  return get<CompetitionTurntableType[]>({ url: '/futures/match/activity/turnplate' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛活动一抽奖
 */
export const getCompetitionEventDrawing = async () => {
  return post<Record<'prizeName', string>>({ url: '/futures/match/activity/draw' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛查询转盘奖项列表
 */
export const getCompetitionEvent2PrizePool = async () => {
  return get<CompetitionEvent2PrizePoolType>({ url: '/futures/match/activity/level' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛活动二：领取体验金奖励
 */
export const getCompetitionEvent2ReceiveBonus = async (data: Record<'prizeAmount', string>) => {
  return post<Boolean>({ url: '/futures/match/activity/level/prize/get', data }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛活动三：查询交易额排行榜
 */
export const getCompetitionEvent3Ranking = async () => {
  return get<CompetitionEvent3RankingType>({ url: '/futures/match/activity/daily/trade/rank' }, { hostType: PrefixEnum.FE_COV_API });
};

/**
 * @description 平台交易大赛活动四：收益排行榜
 */
export const getCompetitionEvent4Ranking = async () => {
  return get<CompetitionEvent3RankingType>({ url: '/futures/match/activity/profit/rank' }, { hostType: PrefixEnum.FE_COV_API });
};

/** 通用赠金活动页面报名接口 */
export const commonBonusSignUp = async (actId: string) => {
  return post({ url: '/bonus/activity/register', data: { actId } }, { hostType: PrefixEnum.FE_EX_API, tips: true });
};

/** 通用赠金活动页面用户数据接口 */
export const commonBonusUserRecord = async (actId: string) => {
  return get({ url: '/bonus/activity/user/record', params: { actId } }, { hostType: PrefixEnum.FE_EX_API });
};

/** 通用赠金活动页面活动滚动播报 */
export const commonBonusRolling = async (actId: string) => {
  return get({ url: '/bonus/activity/rolling/notification', params: { actId } }, { hostType: PrefixEnum.FE_EX_API });
};

/** 通用赠金活动页面活动详情 */
export const commonBonusInfo = async (actCode: string) => {
  return get({ url: '/bonus/activity/info', params: { actCode } }, { hostType: PrefixEnum.FE_EX_API, tips: true });
};

/** 通用赠金活动页面充提流水记录 */
export const commonBonusTradeFlow = async (actId: string) => {
  return get({ url: '/bonus/activity/user/trans/flow', params: { actId } }, { hostType: PrefixEnum.FE_EX_API });
};

/** 通用赠金活动页面活动规则 */
export const commonBonusRules = async (actId: string) => {
  return get({ url: '/bonus/activity/rules', params: { actId } }, { hostType: PrefixEnum.FE_EX_API });
};
