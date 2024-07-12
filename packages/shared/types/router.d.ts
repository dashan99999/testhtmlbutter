import 'axios';
import 'vue-router';
declare module 'axios' {
  interface AxiosRequestConfig<D = any> {
    /** 是否全局错误提示 */
    tips?: false;
    /** 业务状态码错误是否抛出 */
    reject?: false;
    /** api前缀 */
    prefix?: string;
    params?: D;
    data?: D;
    /** 是否需要缓存，get请求有效 default false */
    cache?: boolean;
    /** 缓存key是否区分header */
    cacheIncludeHeadersKey?: string[];
    forceUpdate?: boolean;
    isLogout?: false;
  }
}

interface CustomMeta {
  /** 国际化命名空间 */
  namespace?: string | string[];
  auth?: true;
  isChild?: boolean;
  script?: {
    /** 是否加载在线客服脚本  */
    zendesk?: boolean | 'home';
    /** 是否加载图形验证码脚本 */
    gt4?: boolean;
  };
  pageLayouts?: {
    /** default true,是否显示底部 */
    footer?: false;
    /** default true，是否显示头部注册按钮 */
    register?: false;
    /** default false,是否显示头部设置按钮 */
    settings?: true;
    /** 是否显示头部 */
    header?: false;
  };
  /** 是否连接合约websocket */
  fws?: boolean;
  /** 是否连接现货websocket */
  sws?: boolean;
  /** 是否落地页 */
  landing?: boolean;
  fullscreen?: boolean;
}
declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends CustomMeta {}
}

declare module '#app' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PageMeta extends CustomMeta {}
}

export {};
