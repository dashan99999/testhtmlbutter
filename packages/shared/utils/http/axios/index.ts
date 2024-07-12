import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { Message } from '@arco-design/web-vue';
import { showMessage } from './status';
import { IResponse, IAxiosConfig } from './type';
import { PrefixEnum } from './prefix';
import { showToast } from '#shared/utils/vant';
import { cacheAdapter } from './cache';
import { aesDecrypt } from '#shared/utils/crypto';
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*';
axios.defaults.withCredentials = true;
export const axiosInstance: AxiosInstance = axios.create({
  timeout: import.meta.env.DEV ? 6000 : 60000,
  baseURL: process.server ? import.meta.env.VITE_BASE_URL : import.meta.env.DEV ? '' : import.meta.env.VITE_BASE_URL,
  // transformRequest: [
  //   function (data) {
  //      格式化data
  //     return data
  //   },
  // ],
});
// axiosInstance.defaults.adapter = cacheAdapter(axiosInstance);
const request = <T = any>(config: AxiosRequestConfig, otherConfig: IAxiosConfig): Promise<T> => {
  const conf = { ...config };
  console.log('conf==>', conf);

  const axiosConf = otherConfig;
  const hostType = axiosConf.hostType || PrefixEnum.FE_EX_API;
  conf.url = `${hostType + config.url}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        // 不拦截错误信息
        if ((axiosConf.tips && String(res.data?.code) !== '503') || res.config.isLogout !== undefined) {
          resolve(res.data as T);
          return;
        }
        const {
          data: { result, code, message, msg, data },
        } = res;
        if (String(code) !== '0') {
          !process.server && showToast(msg || message);
          reject(res);
        } else {
          resolve((data || result) as T);
        }
      })
      .catch((e: any) => {
        reject(e);
      });
  });
};
export function install(logout: (path: string) => void) {
  // 响应拦截
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      let message = '';
      if (response.status !== 200) {
        message = response?.data?.msg || showMessage(response.status);
      }
      // 未登录或登录失效
      if (['10021', '10002', '100006'].includes(String(response.data.code)) && response.config.isLogout === undefined) {
        logout('/login');
      }
      if (response.data.code == '50048') {
        logout('/');
      }
      if (message && response.config.isLogout === undefined) {
        showToast(message);
      }
      const resultData = JSON.parse(aesDecrypt(response.data.data?.data, response.data.data?.suffix));
      console.log('response==>', response);

      return {
        ...response,
        data: {
          ...response.data,
          data: resultData,
        },
      };
    },
    // 请求失败
    (error: any) => {
      const { response } = error || {};
      if (response) {
        // 请求已发出，但是不在2xx的范围
        showToast(response?.data?.msg || showMessage(response.status));
      } else {
        showToast('network error');
      }
      return Promise.reject(response?.data);
    },
  );
  // 请求拦截
}

export function get<T = any>(config: AxiosRequestConfig, otherConfig?: IAxiosConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, { ...otherConfig });
}

export function post<T = any>(config: AxiosRequestConfig, otherConfig?: IAxiosConfig): Promise<T> {
  return request({ ...config, method: 'POST' }, { ...otherConfig });
}

export function put<T = any>(config: AxiosRequestConfig, otherConfig?: IAxiosConfig): Promise<T> {
  return request({ ...config, method: 'put' }, { ...otherConfig });
}

export default request;
export type { AxiosInstance, AxiosResponse };
