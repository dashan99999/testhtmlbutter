import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import axios from 'axios';
import { ServiceMap } from './prefix';
export function cacheAdapter(instance: AxiosInstance) {
  return async (defaultConfig: InternalAxiosRequestConfig) => {
    const config = { ...defaultConfig };
    if (!process.env.VITE_LOCAL && process.server && (import.meta.env.PROD || process.env.NODE_ENV !== 'development')) {
      let url = config.url || '';
      Object.keys(ServiceMap).forEach((key) => {
        if (url.startsWith(key)) {
          url = url.replace(key, ServiceMap[key]);
        }
      });
      config.url = url;
      config.baseURL = '';
    }
    try {
      return instance({ ...config, adapter: axios.defaults.adapter });
    } catch (e) {
      throw e;
    }
  };
}
