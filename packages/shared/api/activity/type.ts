export interface Result<T = any> {
  code: string;
  data: T;
  msg: string;
}
export interface TipsRecords<T> {
  records: T;
  total?: number;
}

export interface WelfareCouponType {
  current: number;
  size: number;
  couponType?: 'trade' | 'experience';
  status?: 'inactive' | 'using' | 'used' | 'expired';
}

export interface WelfareCouponDataType {
  id: number;
  type: string;
  transactionType: string;
  amount: number;
  coin: string;
  source: string;
  status: string;
  activeTime: string;
  activeDay: number;
  effectiveDay: number;
  expireTime: string;
  tradeAmount?: number | null;
  tradeAmountTarget?: number | null;
  deductRate: number;
  openPositionRate: number;
  recycleAmount: number;
  useType: string;
}

export interface RewardRecordType {
  current: string;
  size: string;
}

export interface RewardRecordList {
  amount: string;
  coin: string;
  couponType: string;
  time: string;
  transactionType: string;
}

export interface OpenLotteryType {
  couponConfigId: number;
  tradeAmountTarget: string;
  couponAmount: string;
  couponType: string;
  couponTransactionType: string;
  expireTime: string;
  effectiveDay: string;
  openPositionRate: string;
}

export interface NewTaskQuery {
  type: 'register' | 'real_name' | 'first_deposit' | 'first_trade';
  status: number;
}

export interface TaskQueryType {
  taskType: 'newer' | 'daily';
  current: number;
  size: number;
}

export interface TaskQueryDataType {
  taskConfigId: number;
  type: string;
  taskTransactionType: string;
  conditionType: string;
  targetAmount: string;
  finishedAmount: string;
  endTime: string;
  couponConfigId: number;
  amount?: number;
  couponType: string;
  coin?: string;
  transactionType?: string;
  couponTransactionType: string;
  couponAmount: string;
  couponCoin: string;
  status: string;
}

export interface DailyTaskCycleQueryType {
  startTime: string;
  endTime: string;
}

export type LimitTimeDepositStatus = 'not_participation' | 'participating' | 'settled' | 'received';

export interface ClaimTaskRewardsType {
  couponAmount: string;
  couponConfigId: number;
  couponTransactionType: string;
  couponType: string;
  expireTime: string;
  effectiveDay: string;
  tradeAmountTarget: string;
  openPositionRate: string;
}
export interface RewardConfigurationType {
  amount: string;
  couponConfigId: number;
  couponType: string;
  couponTransactionType: string;
  couponAmount: string;
  couponCoin: string;
}

export interface KolTradeDetailType {
  id: number;
  actTitle: string;
  endTime: string;
  startTime: string;
  enrollEndTime: string;
  enrollStartTime: string;
  actDetail: string;
  enrollStatus: number;
  enrollCount: number;
  actStatus: number;
  actType: number[];
  futureMinBalance: string;
  vipCode: string;
  h5Banner: string;
  webBanner: string;
}

export interface KolTradeStatisticsType {
  profit: string;
  profitRank: string;
  tradeAmt: string;
  tradeAmtRank: string;
}

export interface KolTradeRankListParamsType {
  actId: number;
  rankType: number;
  pageNo: number;
  pageSize: number;
}

export interface KolTradeRankListType {
  total: number;
  displayVolume: number;
  records: KolTradeRankListItemType[];
}

export type KolTradeRankListItemType = {
  uid: number;
  nickname: string;
  rank: number;
  quotasValue: number;
};

export interface CompetitionConfigurationType {
  id: number;
  activityName: string;
  applyStartTime: string;
  applyEndTime: string;
  activityStartTime: string;
  activityEndTime: string;
  applyStatus: boolean;
  shareDesc: string;
}

export interface CompetitionSummaryDataType {
  todayTradeAmount: string;
  todayTradeRank: string;
  totalProfit: string;
  profitRank: string;
  totalTradeAmount: string;
}

export interface CompetitionRewardRecordsParams {
  prizeType: 'DRAW' | 'LEVEL' | 'TRADE_RANK' | 'PROFIT_RANK';
}

export interface CompetitionRewardRecordsType {
  prizeType: string;
  prizeName: string;
  prizeValue: string;
  rank: string;
  prizeTime: string;
}

export interface CompetitionPrizeParticipantsType {
  activity1Amount: string;
  otherAmount: string;
  unLockAmount: string;
  userCount: number;
}

export interface CompetitionEvent1PrizePoolType {
  todayTradeAmount: string;
  todayPrizeAmount: string;
  todayRemainAmount: string;
  drawCount: number;
}

export interface CompetitionTurntableType {
  id: number;
  prizeValue: string;
  percent: string;
  prizeName: string;
}

export interface CompetitionEvent2PrizePoolType {
  todayTradeAmount: string;
  todayPrizeAmount: string;
  todayRemainAmount: string;
  receivePrizeList: string[];
}

export interface CompetitionEvent3RankingType {
  todayPrizeAmount: string;
  updateTime: string;
  tradeRankList: CompetitionEvent3RankItemType[];
}

interface CompetitionEvent3RankItemType {
  rank: string;
  uid: string;
  dailyTradeAmount: string;
  predictPrizeAmount: string;
  totalTradeAmount: string;
  totalProfitAmount: string;
}
