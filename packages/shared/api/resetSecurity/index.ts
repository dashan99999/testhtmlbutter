import { post } from '#shared/utils/http/axios';
import type {
  ResetSecurityParams,
  CheckOldCodeParams,
  CheckNewItemsParams,
  ReAnswerQuestionParams,
  CheckQuestionsParams,
  ResetSecurityResult,
  Result,
} from './types';

export const getResetSecurity = async (data: ResetSecurityParams) =>
  post<ResetSecurityResult>({ url: '/api/v1/user/get_reset_security', data });
export const checkOldCode = async (data: CheckOldCodeParams) => post<Result>({ url: '/api/v1/user/check_old_code', data }, { tips: true });
export const checkNewItems = async (data: CheckNewItemsParams) =>
  post<Result>({ url: '/api/v1/user/check_new_items', data }, { tips: true });
export const reAnswerQuestion = async (data: ReAnswerQuestionParams) =>
  post<Result>({ url: '/api/v1/user/reanswer_question', data }, { tips: true });
export const checkQuestions = async (data: CheckQuestionsParams) =>
  post<Result>({ url: '/api/v1/user/check_questions', data }, { tips: true });
