import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// import { Message } from '@arco-design/web-vue';
import { showMessage } from './status';
import { IResponse } from './type';
import { showToast } from '#shared/utils/vant';
import { PrefixEnum } from './prefix';
import { cacheAdapter } from './cache';
import { aesDecrypt } from '#shared/utils/crypto';
import { AxiosException } from './exception';
import qs from 'qs';
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*';
axios.defaults.withCredentials = true;
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.server ? import.meta.env.VITE_BASE_URL : import.meta.env.DEV ? '' : import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.DEV ? 6000 : 60000,
});

// axiosInstance.defaults.adapter = cacheAdapter(axiosInstance);

const request = <Response = any, Params = any>(defaultConfig: AxiosRequestConfig<Params>) => {
  const config = { ...defaultConfig };
  config.url = `${config.prefix ?? PrefixEnum.FE_EX_API}${config.url}`;
  return new Promise<IResponse<Response>>((resolve, reject) => {
    return axiosInstance
      .request<IResponse<Response>>(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: IResponse<Response>) => {
        reject(new AxiosException<Response>(err));
      });
  });
};

export function init(logout: (path: string) => void) {
  // 响应拦截
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<IResponse<Response>>) => {
      // 未登录或登录失效
      if (['10021', '10002', '100006'].includes(String(response.data.code)) && response.config.isLogout === undefined) {
        logout('/login');
      } else if (response.data.code == '50048') {
        logout('/');
      }
      if (response.config.reject === undefined && !['200', '0'].includes(String(response.data.code))) {
        if (response.config.tips === undefined && process.client && response.config.isLogout === undefined) {
          console.log('探出警告');
          showToast(response.data.msg);
        }
        console.log('return Promise.reject');
        return Promise.reject({ response, status: response.status, config: response.config });
      }
      console.log('成功状态200 =>', !['200', '0'].includes(String(response.data.code)));

      // if (!['200', '0'].includes(String(response.data.code))) {
      //   showToast(response.data.msg);
      //   return Promise.reject({ response, status: response.status, config: response.config });
      // }
      const resultData = JSON.parse(aesDecrypt(response.data.data?.data, response.data.data?.suffix));
      console.log('response==data==>', resultData);

      return {
        ...response,
        data: {
          ...response.data,
          data: resultData,
        },
      };
    },
    // 请求失败
    (error: AxiosError<any>) => {
      const { response, config, status } = error;
      let message = 'network error';
      if (response && config && status) {
        const isTip = config.tips === undefined;
        const msg = response.data?.msg || response.data?.message;
        if (msg) {
          message = msg;
        } else {
          message = showMessage(status);
        }
        isTip && showToast(message);
      }
      return Promise.reject(
        new AxiosException({
          code: response!.status,
          msg: message,
          data: null,
          result: null,
          message: message,
          status: response!.status,
        }),
      );
    },
  );
  // 请求拦截
}

export function get<T = any, P = any>(config: AxiosRequestConfig<P>) {
  return request<T, P>({ ...config, method: 'GET' });
}

export function post<T = any, P = any>(config: AxiosRequestConfig<P>) {
  return request<T, P>({ ...config, method: 'POST' });
}

export function put<T = any, P = any>(config: AxiosRequestConfig<P>) {
  return request<T, P>({ ...config, method: 'put' });
}

export default request;
export type { AxiosInstance, AxiosResponse };
