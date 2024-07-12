/**
 * 账户活动相关
 */
import { get, post } from '../../utils/http/axios/request';

export type HistoryItem = {
  id: number; //用户id	必须
  uid: number; //客户端类型	必须
  clientType: string; //设备ID	必须
  deviceId: string; //设备名称	必须
  deviceName: string; //登录IP	必须
  ip: string; //登录所在地	必须
  address: string; //	登录日期必须
  loginTime: string;
};

// 获取用户登陆历史
export const getHistoryList = (data: { pageSize: number; pageNo: number }) => {
  return get<{ total: number; records: HistoryItem[] }>({
    url: '/user/login/history/list_page',
    params: data,
  });
};
export type OperateItem = {
  /** 必须 ID	*/
  id: number;
  /** 必须 用户id	*/
  uid: number;
  /** 必须 客户端类型	*/
  clientType: string;
  /** 必须 登录IP	*/
  ip: string;
  /** 必须 登录所在地	*/
  address: string;
  /** 必须 操作内容	*/
  content: string;
  /** 必须 操作日期 UTC  */
  ctime: string;
};
// 获取安全操作历史
export const getOperateList = (data: { pageSize: number; pageNo: number }) => {
  return get<{ total: number; records: OperateItem[] }>({
    url: '/user/security/operate/log/list_page',
    params: data,
  });
};
export type DeviceItem = {
  /** 非必须 ID	*/
  id: number;
  /** 非必须 用户id	*/
  uid: number;
  /** 非必须 客户端类型 ios、android、web、h5	*/
  clientType: string;
  /** 非必须 设备ID	*/
  deviceId: string;
  /** 非必须 设备名称	*/
  deviceName: string;
  /** 非必须 设备最后登录ip	*/
  ip: string;
  /** 非必须 设备最后登录所在地	*/
  address: string;
  /** 非必须 设备最后登录时间  UTC  */
  loginTime: string;
  currentDevice?: boolean;
};
// 用户设备列表接口
export const getDeviceList = () => {
  return get<DeviceItem[]>({
    url: '/user/device/list',
  });
};
// 用户设备详情接口
export const getDeviceDetail = (data: { deviceId: number; pageSize: number; pageNo: number }) => {
  return get<{ total: number; records: DeviceItem[] }>({
    url: '/user/device/detail_page',
    params: data,
  });
};
export const deleteDevice = (id: number) => {
  return post({
    url: `/user/device/delete/${id}`,
  });
};
