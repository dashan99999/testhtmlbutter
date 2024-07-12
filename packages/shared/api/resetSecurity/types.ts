export interface Result<T = any> {
  code: string;
  data: T;
  msg: string;
}
export interface ErrorResult {
  googleVerifySuc?: number; // 验证码状态 0：未通过，1：通过
  emailOldVerifySuc?: number;
  emailVerifySuc?: number;
  mobileOldVerifySuc?: number;
  mobileVerifySuc?: number;
}
export interface ResetSecurityParams {
  countryCode?: string;
  mobileNumber?: string;
  loginPword?: string;
  email?: string;
  uid?: string | undefined;
}
export interface ResetSecurityResult<T = ResetHistory> {
  resetHistory?: T; // 当前重置记录
  resetOptions?: ResetOptions; // 用户绑定过的安全项
  titleList?: TitleList; // 题目相关
  resettableTimes: number; // 剩余答题次数
}

export interface ResetHistory {
  answerLeftTime: number; // 重置记录剩余答题时间
  resetId?: number; // 重置记录id
  resetStatus?: number; //0：答题中，1：答题失败，2：答题成功，3：人工审核中
}

export interface ResetOptions {
  country?: string;
  email?: string;
  google?: string;
  mobile?: string;
}
interface TitleList {
  key: string;
  options: Options[];
}
export interface Options {
  id: number | string;
  name?: string;
  option?: string[];
  type?: number;
}
export interface CheckOldCodeParams {
  mobileCode?: string;
  emailCode?: string;
  googleCode?: string;
  uid: string;
}
export interface CheckNewItemsParams {
  uid: string;
  google: string | number;
  country?: string;
  mobile?: string;
  email?: string;
  mobileCode?: string;
  emailCode?: string;
  resetId?: number;
}
export interface ReAnswerQuestionParams {
  id?: number | string;
}
export interface CheckQuestionsParams<T = any> {
  answer: T;
  uid: string;
  id?: string | number;
}
