// 拦截去增加前嘴，配合nginx 反向代理规则转发调用不同服务
export enum PrefixEnum {
  FE_WS_API = '/ws-old',
  FE_EX_API = '/api', // 现货基础服务
  FE_AUTH_API = '/auth',
  FE_EARN_API = '/earn',
  FE_COV_API = '/futures', // 合约新服务
  FE_WELFARE_API = '/welfare', // 活动相关服务
}
export const ServiceMap = {
  '/ws-old': 'http://extension-websocket:8800',
  '/web': 'http://exchange-web-api:8208',
  '/auth': 'http://exchange-auth-api:9000',
  '/futures': 'http://futures-api-service:8080',
  '/welfare': 'http://welfare-web:8080',
};
