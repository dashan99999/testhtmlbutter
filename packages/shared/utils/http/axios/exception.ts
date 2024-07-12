import type { IResponse } from '#/shared/utils/http/axios/type';
export class AxiosException<T = any> extends Error {
  public code: string | number;
  public data: T;
  public msg: string;
  constructor(data: IResponse<T>) {
    super(data.msg);
    this.data = data.data;
    this.msg = data.msg;
    this.code = data.code;
  }
}
