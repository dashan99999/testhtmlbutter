import { useToken } from '@bitunix/shared/utils/auth';
import { axiosInstance as axiosInstanceBackup } from '@bitunix/shared/utils/http/axios';
import { axiosInstance } from '@bitunix/shared/utils/http/axios/request';
import { getMD5 } from '@bitunix/shared/utils/crypto';
import type { InternalAxiosRequestConfig } from 'axios';
// import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

// const getMD5 = (data: string) => CryptoJS.MD5(data).toString(CryptoJS.enc.Hex);

const initHeader = (lang: string, token: string, headers: any, method?: any, url?: any) => {
  const locale = lang
    .split('-')
    .map((it, index) => (index === 1 ? it.toLocaleUpperCase() : it))
    .join('_');
  const timestamp = Math.floor(Date.now() / 1000);
  const salt = '1F7A4DF7000C045C636B9123B11E5tg7';
  const signString = timestamp + url?.replace(/^\/+/, '') + method?.toUpperCase() + salt;
  // if (url) {
  //   console.log('method==>', method);
  //   console.log('url==>', url);
  // }

  headers['exchange-client'] = 'h5';
  headers['client-Type'] = 'h5';
  headers['clientType'] = 'h5';
  headers['Platform-CU'] = 'h5';
  headers['exchange-language'] = locale;
  headers['language'] = locale;
  headers['accept-Language'] = locale;
  headers['token'] = token;
  headers['exchange-token'] = token;
  headers['timestamp'] = timestamp;
  headers['sign'] = getMD5(signString);
};
export default defineNuxtRouteMiddleware(() => {
  const { $i18n } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const token = useToken().value ?? '';
  const baseUrl = process.server ? runtimeConfig.public.VITE_BASE_URL : import.meta.env.DEV ? '' : runtimeConfig.public.VITE_BASE_URL;
  axiosInstance.defaults.baseURL = baseUrl;
  axiosInstanceBackup.defaults.baseURL = baseUrl;
  initHeader(toValue($i18n.locale), token, axiosInstance.defaults.headers);
  initHeader(toValue($i18n.locale), token, axiosInstanceBackup.defaults.headers);
  if (process.client) {
    [axiosInstance, axiosInstanceBackup].forEach((instance) => {
      instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig<any>) => {
          const { headers, method, url } = config;
          const locale = $i18n.locale;
          const token = Cookies.get(runtimeConfig.public.VITE_TOKEN) ?? '';
          initHeader(toValue(locale), token, headers, method, url);
          return config;
        },
        (error: any) => {
          return Promise.reject(error);
        },
      );
    });
  }
});
