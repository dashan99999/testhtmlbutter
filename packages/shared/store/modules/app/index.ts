/**
 * @store AppStore
 * @description appStore 储存非登录状态下和“用户无关”的项目基础信息,用于初始化(大多数应来源于后台管理系统配置)
 * @example
 * title  浏览器title
 * iconUrl  浏览器icon
 * logoUrl  项目logo
 * 第三方下载的 Url 地址集合
 * lan 当前语言环境
 * 。。。
 */

import { defineStore } from 'pinia';
import type { Pinia } from 'pinia';
import { AppState, AppActions } from './types';
import { getAreaCode, getAreaCodeByIp, getDefaultC2cNickFreeze, getAccountSecurityFreezeTime } from '#shared/api/app';
const storage = process.server ? undefined : localStorage;
export const useAppStore = defineStore<string, AppState, any, AppActions>(
  // 唯一ID元素
  'app',
  {
    state: () => ({
      title: 'Ubit',
      h1: 'Ubit',
      theme: 'dark',
      loading: false, // 全局loading 遮罩慎用，影响用户体验
      areaList: [],
      areaCodeByIp: undefined,
      default_c2c_nick_freeze: undefined, //默认C2C过期时长
      freezeExpiryDate: undefined, //默认冻结时长
      publicInfo: {}, // 后台配置的全部信息
      publicMsg: undefined, // 后台配置的基础信息
      indexHeaderTitle: undefined, // 网站title信息
      switch: undefined, // 网站的一些开关配置
      urls: undefined, //平台站点URL
      limitCountryList: undefined, // 国家访问限制
      HIT: undefined, // 平台分红币种设置
      klineColor: undefined, // K线涨跌颜色
      lan: undefined, // 平台多语言
      coinsymbol_introduce_names: undefined, // 获取所有存在简介的币种列表
      update_safe_withdraw: undefined, // 修改密码冻结提现
      seo: undefined, // SEO 配置信息
      user_day_withdraw_value_limit_no_auth: undefined, // 未认证用户每日最大提币(USDT)价值上限
      user_day_withdraw_value_limit_lv1: undefined, // 认证用户lv1每日最大提币(USDT)价值上限
      user_day_withdraw_value_limit_lv2: undefined, // 认证用户lv2每日最大提币(USDT)价值上限
      assets_showInfo: true, // 资产模块-资产金额显隐状态
      pageSize: 20, // 资产模块-表格分页数量
      scrollDistance: 0, // 页面滚动距离
      embedded: false, // 是否内嵌原生
      lockTime: {
        loginPasswordWithdrawLockTime: 0, // 用户修改登录密码后的提币锁定时间(秒)
        capitalPasswordWithdrawLockTime: 0, // 用户修改资金密码后的提币锁定时间(秒)
        safeSetWithdrawLockTime: 0, // 用户修改安全项后的提币锁定时间(秒)
      },
      languages: [],
    }),
    getters: {},
    actions: {
      toggleTheme(theme) {
        this.theme = theme;
      },
      toggleLoading(open) {
        this.loading = open;
      },
      async getAreaCode() {
        const result = await getAreaCode();
        this.areaList = result;
        return result;
      },
      async getAreaCodeByIp() {
        const result = await getAreaCodeByIp();
        this.areaCodeByIp = result;
        return result;
      },
      async getDefaultC2CNickFreeze() {
        const result = await getDefaultC2cNickFreeze();
        this.default_c2c_nick_freeze = result.date;
      },
      async getFreezeExpiryDate() {
        const result = await getAccountSecurityFreezeTime();
        this.lockTime = result;
      },
      async setPublicInfo(result, limit) {
        this.$patch(result);
        this.user_day_withdraw_value_limit_lv2 = limit;
      },
      changeAssetsShow(type) {
        this.assets_showInfo = type;
      },
      changePageSize(num) {
        this.pageSize = num;
      },
    },
    persist: [
      {
        key: 'h5-theme',
        storage,
        paths: ['theme'],
      },
      {
        key: 'assets_showInfo',
        storage,
        paths: ['assets_showInfo'],
      },
      {
        key: 'pageSize',
        storage,
        paths: ['pageSize'],
      },
    ],
  },
);

// 数据自动持久化 https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
export function useAppOutsideStore(store: Pinia) {
  return useAppStore(store);
}
