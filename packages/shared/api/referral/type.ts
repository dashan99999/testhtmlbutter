export interface Result<T = any> {
  code: string;
  data: T;
  msg: string;
}

export interface OverViewType {
  totalShareNum: number;
  competeTransNum: number;
  totalCommissionsAmount: number | string;
  totalShareBackAmount: number | string;
}

export interface GenerateLinkCodeDataType {
  shareRatio: number;
  myRatio: number;
  defaultSelect: number;
  remark?: string;
}

export interface DefaultCodeType {
  linkId: string | number;
}

export interface ShareListType {
  startDate?: string;
  endDate?: string;
  pageSize: string | number;
  pageNo: string | number;
  code?: string;
}
