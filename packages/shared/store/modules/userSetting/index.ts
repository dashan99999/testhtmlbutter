/**
 * @store UserSettingStore
 * @description UserSettingStore 储存需要和其它组件共享的用户相关的业务信息，
 * @example
 * 当前用户最大转账数量？
 * 合约账户限额？
 * 现货账户限额？
 * 资产模块相关用户数据
 * 。。。
 */

import { defineStore } from 'pinia';
import { userSetting } from './types';

export const useUserSettingStore = defineStore<string, userSetting>('userSetting', {
  state: () => ({}),
  getters: {},
  actions: {},
});
