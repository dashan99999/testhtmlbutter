import { PrefixEnum } from './prefix';
export interface RequestOptions {
  // Whether to process the request result
  isTransformResponse?: boolean;
}

// 返回res.data
export interface IResponse<T = any> {
  code: number | string;
  result: T;
  data: T;
  message: string;
  msg: string;
  status: string | number;
}

/**用户登录 */
export interface ILogin {
  /** 账户名称 */
  username: string;
  /** 账户密码 */
  password: string;
}

export interface IAxiosConfig<T = PrefixEnum> {
  loading?: boolean;
  tips?: boolean; // 为 true 时 不拦截错误信息
  hostType?: T;
}
