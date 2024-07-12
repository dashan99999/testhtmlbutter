import { post, get, put } from '#shared/utils/http/axios';
import { get as $get, post as $post } from '#shared/utils/http/axios/request';
import { PrefixEnum } from '../../utils/http/axios/prefix';

interface ResponseData<t = unknown> {
  code: number | string;
  data: t;
  msg: string;
  status: string;
  message?: string;
}
export enum typeCode {
  deposit = 'assets.recharge', // 充值
  withdraw = 'assets.withdraw', // 提现
  transfer = 'assets.transfer', // 划转
  transfer_in = 'assets.transfer', // 合约划转到现货账户
  transfer_out = 'assets.transfer', // 现货划转到合约账户
  transfer_inner_in = 'assets.transfer', // "内部转入"
  transfer_inner_out = 'assets.transfer', // "内部转出"
  rebate_commission = 'assets.Rebate', // 返佣
  partner_rebate_commission = 'assets.partner_rebate_commission', // 其他-返佣
  rebate_cash = 'assets.Cashback', // 返现
  system_present = 'assets.SystemCurrency', // 系统赠币
  order_buy_in = 'assets.buy', // 买单收入
  order_buy_out = 'assets.buy', // 买单支出
  order_sell_in = 'assets.sell', // 卖单收入
  order_sell_out = 'assets.sell', // 卖单支出
  coupon_trade = 'assets.coupon_trade', // 交易额赠金
  otc_deposit = 'assets.otc_deposit', // 三方买币
  inside_transfer_out = 'assets.internalTransfer.tip19', // 站内转账提币
  inside_transfer_in = 'assets.internalTransfer.tip20', // 站内转账充币
}

export const spotTradeType = ['order_buy_in', 'order_buy_out', 'order_sell_in', 'order_sell_out'];
/*
  "deposit", "充值"
  "withdraw", "提现"
  "transfer_out", "现货划转到合约账户"
  "transfer_in", "合约划转到现货账户"
  "transfer_inner_out", "内部转出"
  "transfer_inner_in", "内部转入"
  "transfer", "划转"
  "rebate_commission", "返佣"
  "rebate_cash", "返现"
  "system_present", "系统赠币"
  "order_buy_in", "买单收入"
  "order_buy_out", "买单支出"
  "order_sell_in", "卖单收入"
  "order_sell_out", "卖单支出"
*/
// 新币种选择网络
interface NewWorksListType {
  addressRegular: string; // 地址正则
  chain: string; // 币种所在链
  contractAddress: string; // 币种合约地址
  contractPrecision: number; // 合约精度
  requireMemo: 0 | 1 | 2; // 是否需要memo.0:不必填,1:选填,2:必填
  depositConfirm: number; // 充币确认数
  network: string; // 网络名称
  isOpen: 0 | 1; // 是否开启；0关闭，1开启
  depositOpen: 0 | 1; // 是否开放充值，0关闭充值，1开放充值；
  withdrawOpen: 0 | 1; // 是否开启提现，0关闭提现，1开启提现；
  withdrawMax: string; // 单笔提币最大值
  withdrawMin: string; // 单笔提币最小值
  depositMin: string; // 单笔充币最小值
  [propName: string]: unknown;
}
interface SymbolByTypeRes {
  name: string; // 币种简称
  fullName: string; // 币种全称
  track: string; // 赛道
  publishAmount: string; // 发行数量
  sort: number; // 币种排序
  isHot: 0 | 1; // 是否热门币种：0：非热门，1：热门
  isOpen: 0 | 1; // 是否开启；0关闭，1开启
  isShow: 0 | 1;
  depositOpen: 0 | 1; // 是否开放充值，0关闭充值，1开放充值；
  withdrawOpen: 0 | 1; // 是否开启提现，0关闭提现，1开启提现
  introduction: string; // 币种介绍
  id: string; // 币种id
  logo: string; // 币种图标
  precision: number; // 币种精度，仅做展示用
  // networks: NewWorksListType[]; // 币种的网络相关数据
  balance?: string; // 前端计算数值
}

// 用户提现相关金额查询
interface WithdrawConfig {
  coinSymbol: string; // 币种
  network?: string; // 币种网络
}
interface WithdrawConfigRes {
  canWithdraw: string; // 可提现余额
  coin: string; // 币种
  defaultFee: string; // 默认手续费
  maxFee: string; // 最大手续费
  minFee: string; // 最小手续费
  todayWithdrawValue: string; // 今日已提现价值
  todayWithdrawValueLimit: string; // 今日提现价值上限
  todayWithdrawVolume: string; // 今日已提现币种数量
  todayWithdrawVolumeLimit: string; // 今日提币数量上限
}

// 【PC端】分币种查询用户余额
interface SymbolBalanceConfig {
  coinSymbol?: string;
  pageSize?: number; // 每页条数
  pageNum?: number; //第几页
  hideSmallAccount?: boolean; // 隐藏小额
  sort?: 'coinSymbol' | 'usdtBalance'; //排序 coinSymbol 按币种首字母排序； usdtBalance 按估值排序
  sortRule?: 'desc' | 'asc'; //  desc 降序    asc 升序
}
interface BalanceType {
  coin: string; //币种
  fullName: string; // 币种全称
  normalBalance: number | string; //现货余额
  lockBalance: number | string; //现货冻结余额
  usdtBalance: number | string; //现货余额和冻结余额的和再转换成usdt
  logo: string; //币种图标
  withdrawingBalance: string; //提现中的金额
  depositOpen: 0 | 1; //是否开放充值，0关闭充值，1开放充值；
  withdrawOpen: 0 | 1; //是否开启提现，0关闭提现，1开启提现；
  name: string; //币种名称
  total?: string | number; // 币种现货总额-接口不返回该字段，前端计算normalBalance+lockBalance
  transactionList?: CommonSymbolListRes[];
  isOpen: number;
  coinPairs?: {
    base: string; // 基准币
    quote: string; // 计价币
  }[];
}

// 获取币对信息列表
interface CommonSymbolListRes {
  symbol: string; // 币对
  base: string; // 基准币
  quote: string; // 计价币
  basePrecision: number; // 基准币精度
  quotePrecision: number; // 计价币精度
  sort?: number; // 排序
  isOpen: number; // 是否开放：1：开放0：不开放
  id?: number | string;
  precisions: string[]; // 深度
  tradeArea: string; // tradeTag
}

// 主链币币种配置信息
interface SymbolConfigConfig {
  coinSymbol: string;
}

// 最近充值、提现记录
export interface RecentDataConfig {
  types?: string[]; // 交易类型（deposit：充值，withdraw：提现，transfer_out：现货划转到合约账户，transfer_in：合约划转到现货账户，transfer：划转）
  coin?: string; // 资产币
  pageNum: number | string; // 当前页数
  pageSize: number; // 每页条数
  startDate: string | string[];
  endDate: string | string[];
  range?: number;
}
interface RecentDataType {
  amount: string; // 金额
  mainSymbol?: string; // 资产
  ctime?: string; // 时间
  type?: string; // 类型
  addressFrom?: string; // 来源地址
  addressTo?: string; // 目标地址
  transactionHash?: string; // 交易hash
  status?: string; //	交易状态（pending(交易中)、success(成功)、fail(失败)）TransactionStatusEnum
  id: number;
  showPrecision?: number; // 显示精度
  symbol: string;
  fee: string; // 手续费
  uid: number;
  coinName: string;
}
interface RecentDataRes {
  count?: string;
  pageSize?: number;
  result: RecentDataType[];
}

// 发起提币邮箱、手机验证码
interface SendVerificationCodeConfig {
  type: number; // 26 -提币操作
  isEmail: 0 | 1; // 1-邮箱，0-手机号码
  token: string;
  time?: string; // 发起时间/交易时间
  arrivedAssets: number; // 到账资产
  withdrawalAddress: string; // 提币地址
}

// 获取订单是否符合快捷提币要求
interface FastWithdrawConfig {
  coinSymbol: string; // 币种
  network: string; // 网络
  address: string; // 提币地址
  amount: string; // 提币金额
  fee: string; // 手续费
  memo?: string;
}

// 发起提币
interface DoWithdrawConfig {
  coinSymbol: string; // 币种
  network?: string; // 网络
  address: string; // 提币地址
  amount: string; // 提现金额（不包含手续费
  fee: string; // 手续费
  googleCode: string; // 谷歌验证码
  smsCode: string; // 手机验证码
  emailCode: string; // 邮箱验证码
  memo?: string; // memo
  trustType: 0 | 1; // 是否加入快捷提币列表(0、不加入 1、加入)
}

// 币种资金流水详情接口
interface TransactionDetailConfig {
  id: number;
}
export type SpotTradeType =
  /*充币*/
  | 'deposit'
  /*提币*/
  | 'withdraw'
  /*现货划转到合约账户*/
  | 'transfer_out'
  /*合约划转到现货账户*/
  | 'transfer_in'
  /*返佣*/
  | 'rebate_commission'
  /*返现*/
  | 'rebate_cash'
  /*系统赠币*/
  | 'system_present'
  /*买单收入*/
  | 'order_buy_in'
  /*买单支出*/
  | 'order_buy_out'
  /*卖单收入*/
  | 'order_sell_in'
  /*卖单支出*/
  | 'order_sell_out'
  /** 三方买币 */
  | 'otc_deposit'
  /*//其他返佣 代理商账户*/
  | 'partner_rebate_commission'
  /* 交易赠金*/
  | 'coupon_trade'
  /*合约体验金划转到合约账户*/
  | 'exp_grant'
  /*合约体验金划转回收*/
  | 'exp_recycle'
  /*站内转账*/
  | 'inside_transfer'
  /*站内转账转入*/
  | 'inside_transfer_in'
  /*站内转账转出;*/
  | 'inside_transfer_out';
interface TransactionDetailRes {
  id?: number; //
  afterAmount?: string; // 交易后的资金余额
  amount?: string; // 转账金额
  status?: 'new' | 'pending' | 'success' | 'reject' | 'fail' | 'cancelled'; // 交易状态  NEW("new", "待审核"),  PENDING("pending", "交易中"),  SUCCESS("success", "成功"), REJECT("reject", "拒绝")需要退手续费, FAIL("fail", "失败")不退手续费, CANCELLED("cancelled", "已撤销"),
  mainChainNet?: string; // 主网
  type?: SpotTradeType;
  addressTo?: string; // 目标地址
  addressFrom?: string; // 来源地址
  transactionHash?: string; // 交易hash
  symbol?: string; // 币种代号
  mainSymbol?: string; // 主链币种代号
  time?: string; // 时间
  blockConfirmations?: number; // 区块确认数
  confirm?: number; // 有效确认数
  fee?: string; // 手续费
  refuseMsg?: string; // 拒绝原因
  transferFrom?: 'exchange' | 'futures'; // 划转源 ( "exchange", "现货账户"),  ("futures", "合约账户")
  transferTo?: 'exchange' | 'futures'; // 划转目标   ( "exchange", "现货账户"),  ("futures", "合约账户")
  showPrecision?: number; // 精度
  accountName?: string; // 账户名称-合约
  coinName?: string; // 币种
  networkName?: string; // 网络
  transactionChain?: string;
  payWay?: string;
  fiatCurrencyAmount?: number;
  fiatCurrency?: string;
  memo?: string;
}

// 获取充值地址
interface ChargeAddressConfig {
  coinSymbol: string;
  network: string;
}
interface ChargeAddressRes {
  address: string; // 充值地址
  addressQRCode: string; // 充值地址二维码
  memo: string; // 充值memo
}

// 资金总览-echarts
interface BalanceTotalConfig {
  coinSymbol: string; // 币种名称
}
interface BalanceTotalRes {
  total?: string; // 当前资产总额
  spotTotal: string; // 现货资产总额
  futuresTotal: string; // 合约资产总额
  coin?: string; // 币种
  toUSDTRate?: string; // 转usdt汇率

  // todayIncome?: string; // 今日累计盈亏
  // todayIncomeRate?: string; // 今日累计盈亏率
  // weekIncome?: string; // 7日累计盈亏
  // weekIncomeRate?: string; // 7日累计盈亏率
  // monthIncome?: string; // 30日累计盈亏
  // monthIncomeRate?: string; // 30日累计盈亏率
}
interface CommonCoinPairListConfig {
  base?: string;
  quote?: string;
}
export interface CoinPairType {
  id: string;
  symbol: string;
  base: string;
  quote: string;
  tradeArea: string;
  basePrecision: number;
  quotePrecision: number;
  sort: number;
  isOpen: number;
  precisions: string[];
  isShow: 0 | 1;
}

// 币种详情 持仓-24小时涨幅
interface SymbolNormalres {
  balance: string;
  coinName: string;
  coinSymbolIcon: string;
  profit: string;
  profitPercent: string;
  profitStatus: string;
  quoteBalance: string;
  quoteSymbol: string;
}

// 获取合约账户余额
interface FuturesBalanceConfig {
  coinSymbol: string; // 保证金币种
  quoteSymbol?: string; // 计价法币
}
interface FuturesBalanceRes {
  available: string; // 可用余额
  frozen: string; // 冻结金额
  transfer: string; // 可划转余额
  margin: string; // 保证金
  balanceTotal: string; // 总资产
  profitUnreal: string; // 未实现盈亏
  total: string; // 总权益
  totalQuote: string; // 总权益折合法币
  profitUnrealQuote: string; // 未实现盈亏折合法币
  coinSymbol: string; // 币种
  expMoney: string; // 体验金
}

// 资产划转
interface FutureTransferConfig {
  symbol: string; // 币种名称
  amount: number; // 划转金额
}

// 查询合约开通状态
interface FutureStateRes {
  opened: 0 | 1; // 0没开通，1开通
  policyUrl: string; // 开通协议地址
  uid: number;
}

// 用户盈亏统计
interface UserStatisticsConfig {
  coinSymbol: string; // 展示币种
  startTime: Date; // 开始日期时间
  endTime: Date; // 结束日期时间
}
interface UserStatisticsRes {
  day: number; // 日期yyyyMMdd格式
  dayBalance: number; // 资产总值
  dayIncome: number; // 每日盈亏
  addUpIncome: number; // 累计盈亏
  addUpIncomeRate: number; // 累计盈亏率
}

// 用户盈亏资产分布
interface SummaryDistributeRes {
  coinSymbol: string; // 币种
  normalBalance: number; // 普通金额
  usdtBalance: number; // 转换为usdt金额
  lockBalance: number; // 锁定金额
  showPrecision?: number; // 精度
  [propName: string]: unknown;
}

// 资产-查询合约总资产统计数据
interface FuturesSummaryConfig {
  quoteSymbol: string;
}
interface FuturesSummaryRes {
  coinSymbol: string; // 当前折合币
  profitUnreal: string; // 未结算盈亏
  profitUnrealQuote: string; // 未结算盈亏(折合法币)
  total: string; // 总资产
  totalQuote: string; // 总资产(折合法币)
}

// 资产-币种列表
interface FuturesCoinListRes {
  coinSymbol: string; // 币种名称
  total: string; // 资产估值
  totalQuote: string; // 资产估值(折算当前法币)
  icon: string; // 图标
  profitUnreal: string; // 未实现盈亏
  profitUnrealQuote: string; // 未实现盈亏折算当前法币
  frozen: string; // 冻结
  margin: string; // 保证金
  available: string; // 可用
  totalFrozen: string;
  openAvailable: string;
  expMoney: string;
}

/** 1.划转 2.开多 3.开空 4.平多 5.平空 6.资金费用 7.逐级减仓 8.爆仓平多 9爆仓平空 10自动减仓 */
export type BussinessType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// 资金流水类型列表
interface AssetsBusinessTypesRes {
  businessType: BussinessType;
  businessName: string;
}

export interface ContractTransactionConfig {
  page: number;
  pageSize: number;
  businessType?: BussinessType; // 流水类型
  startTime?: string | string[];
  endTime?: string | string[];
  coinSymbol?: string;
  range?: number;
}
// ResponseData
interface ContractTransactionResponse<t = unknown> {
  total: string;
  records: t[];
}
// 资金流水-合约-流水详情
interface ContractTransactionDetail {
  account?: string;
  amount: string;
  closeProfit?: string;
  fee?: string;
  feeCoinSymbol?: string;
  from: number;
  fromName: string;
  fundingFee?: string;
  to: number;
  toName: string;
  accountName?: string;
}
// 资金流水-合约-流水列表
interface ContractTransactionRes {
  businessName: string;
  businessType: BussinessType;
  change: string;
  coinSymbol: string;
  ctime: string;
  detail: ContractTransactionDetail;
  status: 'new' | 'pending' | 'success' | 'reject' | 'fail' | 'cancelled';
  symbol?: string;
}

interface FuturesCoinSymbolsListRes {
  coinSymbol: string;
  icon: string;
}

interface WithdrawRaiseValueRes {
  levelAValue?: string;
  levelBValue?: string;
  levelCValue?: string;
}

interface WithdrawRateConfig {
  baseSymbol: string;
  quoteSymbol: string;
}
interface WithdrawRateRes {
  baseSymbol: string;
  quoteSymbol: string;
  rate: string;
}

interface PositionPendingRes {
  positionId?: number; // 仓位Id
  ctime?: string; // 仓位形成时间(ISO8601)
  symbol?: string; // 币对
  type?: 1 | 2; // 1?:逐仓, 2?:全仓
  side?: 1 | 2; // 1?:空仓, 2?:多仓
  amount?: string; // 仓位数量
  closeLeft?: string; // 剩余可平
  openPrice?: string; // 开仓均价
  marginAmount?: string; // 保证⾦
  openMargin?: string; // 开仓保证⾦率
  openMarginImply?: string; // 开仓保证⾦
  maintenMargin?: string; // 维持保证⾦率
  maintenMarginAmount?: string; // 维持保证⾦数
  profitReal?: string; // 已实现盈亏
  profitClearing?: string; // 待结算盈亏
  feeAsset?: string; // 抵扣⼿续费币种
  dealAssetFee?: string; // 抵扣⼿续费
  leverage?: number; // 当前杠杆倍数
  liqPrice?: string; // 强平价格
  profitUnreal?: string; // 未实现盈亏
  unrealRate?: string; // 回报率
  piece?: number; // 总张数
  closeLeftPiece?: number; // 可平张数
  signPrice?: string; // 标记价格
  quoteAmount?: string; // 仓位价值
  leftQuoteAmount?: string; // 可平仓位价值
  amountMax?: string; //
  base?: string; //
  marginRate?: string; //
  quote?: string; //
}

interface CoinNetworkConfig {
  coin: string;
}
interface CoinNetworkRes {
  name: string; // 币种简称
  fullName: string; // 币种全称
  logo: string; // 币种图标
  track: string; // 赛道
  sort: number; // 币种排序
  isHot: 0 | 1; // 是否热门币种：0：非热门，1：热门
  isOpen: 0 | 1; // 是否开启；0关闭，1开启
  isShow: 0 | 1; // * 是否可见      * 0:不可见      * 1:可见
  depositOpen: 0 | 1; // 是否开放充值，0关闭充值，1开放充值；
  withdrawOpen: 0 | 1; // 是否开启提现，0关闭提现，1开启提现；
  networks: NewWorksListType[]; // 币种的网络相关数据
}

interface AddressListConfig {
  coinSymbol?: string; // 币种简称
  trustType?: 0 | 1 | ''; // 是否已加入快捷提现列表(0、不加入1、加入  传空为全部)
}
interface AddressListRes {
  id: number;
  coinSymbol: string; // 币种简称
  icon: string; // 币种图标
  network: string; // 转账网络
  address: string; // 转账地址
  memo: string; // 转账网络memo
  remarks: string; // 备注
  trustType: 0 | 1; // 是否已加入快捷提现列表(0、不加入1、加入  传空为全部)
  ctime: string; // 创建时间 ISO8601格式
  validStatus: 0 | 1; // 是否有效(0、无效  1、有效)
}

interface AddAddressConfig {
  coinSymbol: string; // 币种简称
  network: string; // 转账网络
  address: string; // 转账地址
  memo: string; // 转账网络memo
  remarks: string; // 备注
  trustType: 0 | 1; // 是否加入快捷提现列表(0、不加入1、加入)
  googleCode?: string; // 谷歌验证码
  smsCode?: string; // 短信验证码
  emailCode?: string; // 邮箱验证码
}

interface ValidListRes {
  addressList: AddressListRes[];
  fastWithdrawSwitch: number;
}

export interface FastWithdrawInfoRes {
  fastWithdrawSwitch: 0 | 1; // 快速提币开关（0、关闭 1、开启）
  withdrawValuationPerDayLimit: string; // 24小时免密额度
  withdrawValuationPerTimeLimit: string; // 单笔快捷提币限额
  withdrawValuationPerTimeLimitArray: string[]; // 单笔快捷提币限额可选列表
}

export interface EditFastWithdrawConfig {
  fastWithdrawSwitch: 0 | 1; // 快速提币开关（0、关闭 1、开启）
  withdrawValuationPerTimeLimit: string; // 单笔快捷提币限额
  googleCode?: string; // 谷歌
  smsCode?: string; // 手机
  emailCode?: string; // 邮箱
}

interface StatisticsConfig {
  currency: string; // 法币币种类型,默认USD
  start: Date; // 2023-04-01T00:00:00Z  查询起始时间,间隔不超过90天
  end: Date; // 2023-04-01T00:00:00Z  查询结束时间
}

// 资产分布图表数据
interface StatisticsTotal {
  assets?: {
    amount: string; // 币种金额
    coin: string; // 币种名称
    proportion: string; // 资产占比: 1=100%, 0.1=10%
    scale: number; // 币种价值精度
    usdtAmount: string; // 币种当日usdt价值
    userId: number; // 用户id
  }[]; // 资产明细
  currencyRate?: string; // 法币对USDT汇率
  time: string | Date; // 统计时间
}
// 累计盈亏率 累计盈亏 每日盈亏 资产总值  图表数据
interface StatisticsTotal {
  currencyRate?: string; // 法币对USDT汇率
  time: string | Date; // 统计时间
  value?: string;
}
interface StatisticsRes {
  profit_rates: StatisticsTotal[]; // 累计盈亏率 value:收益率,小数值: 1=100%, 0.1=10%
  profits: StatisticsTotal[]; //      累计盈亏   value:USDT收益金额
  day_profits: StatisticsTotal[]; //  每日盈亏   value:USDT收益金额
  asset_total: StatisticsTotal[]; //  资产总值   value:总资产USDT价值
  asset_allocations: StatisticsTotal; // 资产分布
}

interface CoinListRes {
  coin: string;
  fullName: string;
  logo: string;
  normalBalance?: string;
  usdtBalance?: string;
  isShow: 0 | 1;
  isOpen: 0 | 1;
}

interface TodayStatisticsRes {
  currencyRate: string; // 法币对USDT汇率
  profit: string; // 今日收益
  profitRate: string; // 收益率: 1=100%, 0.1=10%
  sevenDayProfit: string; // 资产7日收益,USDT总价值
  sevenDayProfitRate: string; // 7日收益率: 1=100%, 0.1=10%
  totalAmount: string; // 资产USDT总价值
  updateTime: string; // 最后更新时间
}

// enum URL {
//   symbol_by_type = '/api/v1/common/coin/list', // 新币种选择网络 11111111111
//   withdraw_list = '/deposit_withdraw/withdraw/coin/list', // 获取提币的币种列表
//   deposit_list = '/deposit_withdraw/deposit/coin/list', // 获取充币的币种列表
//   withdraw_hot_list = '/deposit_withdraw/withdraw/hot_coin_symbol', // 提币的热门币种
//   deposit_hot_list = '/deposit_withdraw/deposit/hot_coin_symbol', // 充币的热门币种
//   coin_network = '/api/v1/common/coin/coin_network', // 根据单个币种获取网络数据 11111111111
//   withdraw_balance = '/deposit_withdraw/withdraw/all_amount', // 用户提现相关金额查询
//   symbol_balance = '/finance/coin/balance', // 【PC端】分币种查询用户余额
//   common_coin_pair_list = '/api/v1/common/coin_pair/list', // 获取币对信息列表 1111111111111
//   symbol_config = '/api/v1/common/coin_symbol/network_data', // 主链币币种配置信息
//   transaction_recent_page = '/transaction/page', // 最近充值、提现记录
//   send_verification_code = '/api/v1/sms/send_verification_code', // 发起提币邮箱、手机验证码
//   fast_withdraw = '/api/v1/withdraw/config/fast_withdraw/check',
//   withdraw_rate = '/api/v1/common/rate', // 汇率数据集合根据币种过滤
//   do_withdraw = '/deposit_withdraw/withdraw/apply', // 发起提币
//   transaction_detail = '/transaction/detail', // 币种资金流水详情接口
//   get_charge_address = '/deposit_withdraw/deposit/address', // 获取充值地址
//   balance_total = '/finance/coin/balance/total', // 资产总览查询接口
//   todayStatistics = '/analyse/v2/todayStatistics', // 今日统计
//   symbol_normal = '/finance/coin/symbol/normal', // 币种详情 持仓-24小时涨幅
//   can_withdraw_balance = '/finance/can_withdraw/total/balance', // 获取现货账户可提现余额
//   futures_balance = '/futures/assets/query', // 获取合约账户余额
//   transfer_out = '/future/transfer_out', // 资产划转 transfer_out 现货资产划转到合约   transfer_in 合约资产划转到现货
//   transfer_in = '/future/transfer_in', // 资产划转 transfer_out 现货资产划转到合约   transfer_in 合约资产划转到现货
//   future_state = '/futures/user/state', // 查询合约开通状态
//   balance_summary_statistics = '/finance/coin/symbol/balance/summary', // 用户盈亏统计
//   summary_distribute = '/finance/coin/symbol/distribute', // 用户盈亏资产分布
//   futures_summary = '/futures/assets/summary', // 资产-查询合约总资产统计数据
//   futures_coinList = '/futures/assets/coinList', // 资产-币种列表
//   assets_businessTypes = '/futures/assets/businessTypes', // 资金流水类型列表
//   contract_transaction = '/futures/assets/history', // 资金流水类型列表--合约类型
//   futures_coinSymbolsList = '/futures/market/coinSymbols', // 资金流水类型列表--合约币种
//   withdraw_raise_value = '/deposit_withdraw/withdraw/raise_value', // 提币提额页面的提额额度查询
//   withdraw_check_user = '/deposit_withdraw/withdraw/check_user', // 提币流程用户校验
//   deposit_check_user = '/deposit_withdraw/deposit/check_user', // 充币流程用户校验
//   position_pending = '/futures/position/pending', // 当前仓位
//   address_list = '/api/v1/withdraw/address/list', // 提币地址列表
//   add_address = '/api/v1/withdraw/address', // 添加提币地址
//   delete_address = '/api/v1/withdraw/address/delete', // 删除提币地址
//   edit_address = '/api/v1/withdraw/address/', // 修改提币地址
//   valid_list = '/api/v1/withdraw/address/valid/list', // 提币页获取提币地址列表
//   fast_withdraw_info = '/api/v1/withdraw/config/get_fast_withdraw', // 获取、修改快捷提币开关信息
//   statisticsByDayRange = '/analyse/v2/statisticsByDayRange', // 盈亏分析-现货
//   having_future_coupons = '/api/welfare/welfare_coupon/check_user_having_using_future_coupons', //判断用户是否有激活中的合约体验金券
//   deposit_save = '/deposit_withdraw/deposit/save_account', // 保存充币账户配置
//   deposit_account = '/deposit_withdraw/deposit/account', //充币账户查询
//   inside_transfer_apply_check_user = '/inside_transfer/apply_check_user', // 站内转账用户检查,
//   inside_transfer_apply = '/inside_transfer/apply', //发起站内转账申请
// }

export const checkUserApi = async (type: 'withdraw' | 'deposit') =>
  get<ResponseData>(
    { url: type === 'withdraw' ? '/deposit_withdraw/withdraw/check_user' : '/deposit_withdraw/deposit/check_user' },
    { tips: true, loading: true },
  );

// 新币种选择网络
export const getAccountBalance = async () => get<SymbolByTypeRes[]>({ url: '/api/v1/common/coin/list', cache: true });

// 根据单个币种获取网络数据
export const getCoinNetwork = async (params: CoinNetworkConfig) => get<CoinNetworkRes>({ url: '/api/v1/common/coin/coin_network', params });

// 用户提现相关金额查询
export const withdrawConfigAll = async (params: WithdrawConfig) =>
  get<ResponseData<WithdrawConfigRes>>({ url: '/deposit_withdraw/withdraw/all_amount', params }, { tips: true, loading: true });

// 【PC端】分币种查询用户余额
export const symbolBalance = async (params?: SymbolBalanceConfig) =>
  get<ResponseData<BalanceType[]>>({ url: '/finance/coin/balance', params }, { tips: true });

// 获取币对信息列表
export const commonCoinPairList = async (params?: CommonCoinPairListConfig) =>
  get<CoinPairType[]>({ url: '/api/v1/common/coin_pair/list', params });

// 主链币币种配置信息
export const getSymbolConfig = async (params: SymbolConfigConfig) =>
  get<SymbolByTypeRes>({ url: '/api/v1/common/coin_symbol/network_data', params }, { loading: true });

// 最近充值、提现记录
export const getRecentData = async (data: RecentDataConfig) =>
  post<ResponseData<RecentDataRes>>({ url: '/transaction/page', data }, { tips: true });

// 发起提币邮箱、手机验证码
export const sendVerificationCode = async (data: SendVerificationCodeConfig) =>
  post<ResponseData>({ url: '/api/v1/sms/send_verification_code', data }, { tips: true });

// 获取订单是否符合快捷提币要求   data = true 为符合  data = false 为不符合
export const fastWithdraw = async (data: FastWithdrawConfig) =>
  post<boolean>({ url: '/api/v1/withdraw/config/fast_withdraw/check', data }, { loading: true });

export const withdrawRate = async (params: WithdrawRateConfig) => get<WithdrawRateRes[]>({ url: '/api/v1/common/rate', params });

// 发起提币
export const doWithdraw = async (data: DoWithdrawConfig) =>
  post<ResponseData>({ url: '/deposit_withdraw/withdraw/apply', data }, { tips: true, loading: true });

// 币种资金流水详情接口
export const transactionDetail = async (params: TransactionDetailConfig) =>
  get<TransactionDetailRes>({ url: '/transaction/detail', params }, { loading: true });

// 获取充值地址
export const chargeAddress = async (params: ChargeAddressConfig) =>
  get<ResponseData<ChargeAddressRes>>({ url: '/deposit_withdraw/deposit/address', params }, { tips: true, loading: true });

// 资产总览查询接口
export const balanceTotal = async (params: { coin: string }) => get<BalanceTotalRes>({ url: '/finance/coin/balance/total', params });

// 今日统计
export const todayStatistics = async (params?: { currency?: string }) =>
  get<TodayStatisticsRes>({ url: '/analyse/v2/todayStatistics', params });

// 币种详情 持仓-24小时涨幅
export const symbolNormal = async (data: BalanceTotalConfig) => post<SymbolNormalres>({ url: '/finance/coin/symbol/normal', data });

//获取现货账户可提现余额
export const withdrawBalance = async (params: WithdrawConfig) =>
  get<number>({ url: '/finance/can_withdraw/total/balance', params }, { loading: true });

// 获取合约账户余额
export const futuresBalance = async (params: FuturesBalanceConfig) =>
  get<FuturesBalanceRes>({ url: '/futures/assets/query', params }, { hostType: PrefixEnum.FE_COV_API, loading: true });

// 资产划转 transfer_out 现货资产划转到合约   transfer_in 合约资产划转到现货
export const futureTransfer = async (data: FutureTransferConfig, type: 'transfer_out' | 'transfer_in') =>
  post({ url: type === 'transfer_out' ? '/future/transfer_out' : '/future/transfer_in', data }, { tips: true, loading: true });

// 保存充币账户配置
export const saveDepositAccount = async (data: { coin: string; accountType: string }) => {
  return post({
    url: '/deposit_withdraw/deposit/save_account',
    data,
  });
};

// 查询合约开通状态
export const futureState = async () => get<FutureStateRes>({ url: '/futures/user/state' }, { hostType: PrefixEnum.FE_COV_API });

// 用户盈亏统计
export const userStatistics = async (params: UserStatisticsConfig) =>
  get<UserStatisticsRes[]>({ url: '/finance/coin/symbol/balance/summary', params });

// 用户盈亏资产分布
export const summaryDistribute = async () => get<SummaryDistributeRes[]>({ url: '/finance/coin/symbol/distribute' });

// 资产-查询合约总资产统计数据
export const futuresSummary = async (params: FuturesSummaryConfig) =>
  get<FuturesSummaryRes>({ url: '/futures/assets/summary', params }, { hostType: PrefixEnum.FE_COV_API });

// 资产-币种列表
export const futuresCoinList = async (params: FuturesSummaryConfig) =>
  get<FuturesCoinListRes[]>({ url: '/futures/assets/coinList', params }, { hostType: PrefixEnum.FE_COV_API });

// 资金流水类型列表
export const assetsBusinessTypes = async () =>
  get<AssetsBusinessTypesRes[]>({ url: '/futures/assets/businessTypes' }, { hostType: PrefixEnum.FE_COV_API });

export const contractTransaction = async (params: ContractTransactionConfig) =>
  get<ContractTransactionResponse<ContractTransactionRes>>({ url: '/futures/assets/history', params }, { hostType: PrefixEnum.FE_COV_API });

export const futuresCoinSymbolsList = async () =>
  get<FuturesCoinSymbolsListRes[]>({ url: '/futures/market/coinSymbols' }, { hostType: PrefixEnum.FE_COV_API });

export const withdrawRaiseValue = async () => get<WithdrawRaiseValueRes>({ url: '/deposit_withdraw/withdraw/raise_value' });

// 获取当前合约仓位列表
export const positionPending = async () =>
  get<PositionPendingRes[]>({ url: '/futures/position/pending' }, { hostType: PrefixEnum.FE_COV_API });

// 提币地址列表
export const getAddressList = async (params: AddressListConfig) => get<AddressListRes[]>({ url: '/api/v1/withdraw/address/list', params });

// 添加提币地址
export const addAddress = async (data: AddAddressConfig) => post({ url: '/api/v1/withdraw/address', data }, { tips: true, loading: true });

// 删除提币地址
export const deleteAddress = async (data: string[]) => post<ResponseData<boolean>>({ url: '/api/v1/withdraw/address/delete', data });

// 修改提币地址
export const editAddress = async (data: AddAddressConfig, id: number) =>
  put<ResponseData<boolean>>({ url: '/api/v1/withdraw/address/' + id, data }, { tips: true, loading: true });

// 提币页获取提币地址列表
export const validList = async (params: SymbolConfigConfig) => get<ValidListRes>({ url: '/api/v1/withdraw/address/valid/list', params });

// 获取快捷提币开关信息
export const fastWithdrawInfo = async () =>
  get<ResponseData<FastWithdrawInfoRes>>({ url: '/api/v1/withdraw/config/get_fast_withdraw' }, { tips: true, loading: true });

// 用户校验
export const insideTransferApplyCheckUser = (data: any) => post({ data, url: '/inside_transfer/apply_check_user' }, { tips: true });

// 站内转账
export const insideTransferApply = (data: any) => post({ data, url: '/inside_transfer/apply' }, { tips: true });
// 修改快捷提币开关信息
export const editFastWithdraw = async (data: EditFastWithdrawConfig) =>
  put<ResponseData<boolean>>({ url: '/api/v1/withdraw/config/get_fast_withdraw', data }, { tips: true, loading: true });

// 盈亏分析-现货
export const statisticsByDayRange = async (params: StatisticsConfig) =>
  get<StatisticsRes>({ url: '/analyse/v2/statisticsByDayRange', params });

// 获取提币的币种列表
export const withdrawList = async () => get<CoinListRes[]>({ url: '/deposit_withdraw/withdraw/coin/list' });

// 提币的热门币种
export const withdrawHotList = async () => get<string[]>({ url: '/deposit_withdraw/withdraw/hot_coin_symbol' });

// 充币的热门币种
export const depositHotList = async () => get<string[]>({ url: '/deposit_withdraw/deposit/hot_coin_symbol' });

export const depositList = async () => get<CoinListRes[]>({ url: '/deposit_withdraw/deposit/coin/list' });

// 充币账户查询
export const getDepositAccounts = async (params: { coin: string }) =>
  get<{
    accountTypes: string[];
    currentAccountType: string;
  }>({ url: '/deposit_withdraw/deposit/account', params });

export const havingFutureCoupons = () => {
  return get<any>(
    {
      url: '/api/welfare/welfare_coupon/check_user_having_using_future_coupons',
    },
    {
      tips: true,
    },
  );
};

export type DeductHistoryParams = {
  couponId: string | number;
  page: number;
  pageSize: number;
  startTime: string;
  endTime: string;
};

export type DeductHistoryItem = {
  /**必须,id**/
  id: number;
  /**必须,币对**/
  symbol: string;
  /**必须,抵扣类型 **/
  type: string;
  /**必须,资金流水ID;*/
  fundingHistoryId: string;
  /**必须,流水金额;*/
  amount: string;
  /**必须,抵扣金额;*/
  deductAmount: string;
  /**必须,剩余体验金;*/
  afterDeductAmount: string;
  /**必须,创建时间;*/
  ctime: string;
};
/** 优惠劵使用历史记录 */
export function getDeductHistory(params: DeductHistoryParams) {
  return $get<{ total: number; records: DeductHistoryItem[] }, DeductHistoryParams>({
    url: '/futures/assets/deduct_history',
    params,
    prefix: PrefixEnum.FE_COV_API,
  });
}
export type CouponDetail = {
  /** 必须,优惠券ID	*/
  id: number;
  /** 必须,卡券类型(trade:交易额赠金券 experience:合约体验金券)	*/
  type: 'trade' | 'experience';
  /** 必须,业务维度(spot：现货  futures：合约)	*/
  transactionType: 'spot' | 'futures';
  /** 必须,优惠券面值	*/
  amount: string;
  /** 必须,币种	*/
  coin: string;
  /** 必须,来源	*/
  source: string;
  /** 必须,卡券状态（inactive：未激活  using：使用中  used：已使用 expired：已过期  recycled：已回收）	*/
  status: 'inactive' | 'using' | 'used' | 'expired' | 'recycled';
  /** 必须,激活时间,用户激活优惠券的时间戳*/
  activeTime: string;
  /** 必须,激活天数	*/
  activeDay: number;
  /** 必须,有效期天数	*/
  effectiveDay: number;
  /** 必须,过期时间,  未激活状态为过期时间激活时会更新为激活时间+有效期天数	*/
  expireTime: string;
  ctime: string;
  mtime: string;
  /** 必须,交易额统计(交易额赠金券)	*/
  tradeAmount: number;
  /** 必须,交易额目标(交易额赠金券)	*/
  tradeAmountTarget: number;
  /** 必须,开仓比例(合约体验金券)	*/
  openPositionRate: number;
  /** 必须,回收金额(合约体验金券)	*/
  recycleAmount: number;
  /** 必须,使用类型(合约体验金券   all:全部  part:部分币对)	*/
  useType: 'all' | 'part';
  /** 必须,已抵扣金额（合约体验金券）	*/
  deductedAmount: string;
  /** 必须,发放备注  */
  msg: string;
  remark: string;
};
/** 优惠券详情 */
export function getCouponDetail(params: { couponId: string | number }) {
  return $get<CouponDetail>({ url: '/welfare_coupon/detail', params, prefix: PrefixEnum.FE_WELFARE_API });
}

/** 落地页 */
export function getCouponDownDetail(params: { id: string | number }) {
  return $get({ url: '/welfare/h5/grant_page/coupon_list', params, prefix: PrefixEnum.FE_WELFARE_API, reject: false });
}

/** 优惠卷状态 */
export function getCouponDownState(params: { id: string | number }) {
  return $get({ url: '/welfare/h5/grant_page/coupon_state', params, prefix: PrefixEnum.FE_WELFARE_API, reject: false });
}

/** 领取优惠卷 */
export function getCouponDownCouponGrant(data: { id: number | string; itemIdList: Array<number> }) {
  return $post({ url: '/welfare/h5/grant_page/coupon_grant', data, prefix: PrefixEnum.FE_WELFARE_API, reject: false });
}

/** 访问数量 */
export function grantPageViews(data: { id: number | string; views: number }) {
  return $post({ url: '/welfare/h5/grant_page/views', data, prefix: PrefixEnum.FE_WELFARE_API, reject: false });
}

/** 领取数量 */
export function grantNumGrant(data: { id: number | string; grantNum: number }) {
  return $post({ url: '/welfare/h5/grant_page/num_grant', data, prefix: PrefixEnum.FE_WELFARE_API, reject: false });
}

export type WithdrawParams = {
  coin?: string;
  startTime?: string;
  endTime?: string;
  current: number;
  size: number;
  type?: 'withdraw' | 'inside_transfer_out';
};
export type WithdrawType = {
  id: string;
  coin: string;
  time: string;
  type: 'withdraw' | 'inside_transfer_out';
  amount: string;
  /**
   * 状态 "new", "待审核" "pending", "交易中" "wallet_checking", "钱包审核中" "success", "成功" "reject", "拒绝" "fail", "失败" "cancelled", "已撤销"
   */
  status: 'new' | 'pending' | 'wallet_checking' | 'success' | 'reject' | 'fail' | 'cancelled';
  network: string;
  msg: string;
};

export const getWithDrawPage = (params: WithdrawParams) => {
  return $get<{ records: WithdrawType[]; total: number }>({
    url: '/deposit_withdraw/withdraw/page',
    params,
  });
};
export type DepositParams = {
  coin?: string;
  startTime?: string;
  endTime?: string;
  current: number;
  size: number;
  type?: 'deposit' | 'inside_transfer_in';
};
export type DepositType = {
  id: string;
  coin: string;
  time: string;
  type: 'deposit' | 'inside_transfer_in';
  amount: string;
  /**
   * 状态 "new", "待审核" "pending", "交易中" "wallet_checking", "钱包审核中" "success", "成功" "reject", "拒绝" "fail", "失败" "cancelled", "已撤销"
   */
  status: 'new' | 'pending' | 'wallet_checking' | 'success' | 'reject' | 'fail' | 'cancelled';
  network: string;
  msg: string;
};
export const getDepositPage = (params: DepositParams) => {
  return $get<{ records: DepositType[]; total: number }>({
    url: '/deposit_withdraw/deposit/page',
    params,
  });
};

export type TransitionDetail = {
  id: number;
  /** 非必须 金额 */
  amount: string;
  /** 非必须 状态
   * "new", "待审核"
   * "pending", "交易中"
   * "wallet_checking", "钱包审核中"
   * "success", "成功"
   * "reject", "拒绝"
   * "fail", "失败"
   * "cancelled", "已撤销"
   */
  status: string;
  /** 非必须 链 */
  mainChainNet: string;
  /** 非必须 类型 */
  type: string;
  addressFrom: string;
  addressTo: string;
  transactionHash: string;
  networkName: string;
  coinName: string;
  time: string;
  blockConfirmations: string;
  confirm: string;
  fee: string;
  refuseMsg: string;
  walletMsg: string;
  transferFrom: string;
  transferTo: string;
  afterAmount: string;
  transactionChain: string;
  payWay: string;
  fiatCurrencyAmount: string;
  fiatCurrency: string;
  memo: string;
};

export const getTransactionTypeDetail = (params: { id: string; type: string }) => {
  return $get<TransitionDetail>({
    url: '/transaction/type/detail',
    params,
  });
};

export const insideTransferApplyCancel = (data: any) => $post({ data, url: '/inside_transfer/cancel' });
export const cancelWithDraw = (data: any) => {
  return $post({
    url: '/deposit_withdraw/withdraw/cancel',
    data,
  });
};
export type {
  ResponseData,
  SymbolByTypeRes,
  NewWorksListType,
  WithdrawConfigRes,
  BalanceType,
  RecentDataType,
  DoWithdrawConfig,
  TransactionDetailRes,
  ChargeAddressRes,
  TodayStatisticsRes,
  BalanceTotalRes,
  SymbolNormalres,
  FuturesBalanceRes,
  UserStatisticsRes,
  SummaryDistributeRes,
  FuturesSummaryRes,
  FuturesCoinListRes,
  AssetsBusinessTypesRes,
  ContractTransactionRes,
  ContractTransactionDetail,
  FuturesCoinSymbolsListRes,
  AddressListRes,
  PositionPendingRes,
  WithdrawRaiseValueRes,
  CommonSymbolListRes,
  StatisticsRes,
  StatisticsTotal,
  AddAddressConfig,
  CoinListRes,
};
