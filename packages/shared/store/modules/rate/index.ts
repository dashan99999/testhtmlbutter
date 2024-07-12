/**
 * @store RateStore
 * @description 储存并共享和“用户无关”的系统汇率信息，用于前端计算
 * @example rate
 */

import { defineStore } from 'pinia';
import { Rate, RateGetter, RateActions } from './types';
import { getRateList, getDefaultRateCurrency } from '#shared/api/app';

export const useRateStore = defineStore<string, Rate, RateGetter, RateActions>('rate', {
  state: () => ({
    rateList: [], // 汇率数据集合
    quoteSymbol: '', // 平台当前汇率
    symbolMap: {
      USD: '$',
      CNY: '¥',
    },
    currencyRateList: [],
  }),
  getters: {
    rateObj(state) {
      const rateObj = Object.create(null);
      state.rateList.forEach((i) => {
        if (i.quoteSymbol === state.quoteSymbol) {
          rateObj[i.baseSymbol] = i.rate;
        }
      });
      return rateObj;
    },
    rateSymbol(state) {
      return state.symbolMap[state.quoteSymbol];
    },
  },
  actions: {
    setQuoteSymbol(v) {
      this.quoteSymbol = v;
    },
    setInfo(partial: Partial<Rate>) {
      this.$patch(partial);
    },
    async getRateList() {
      const result = await getRateList();
      this.rateList = result;
      return result;
    },
    async getDefaultRateCurrency() {
      const result = await getDefaultRateCurrency();
      this.currencyRateList = result.data;
    },
  },
  persist: {
    key: 'quoteSymbol',
    storage: process.server ? undefined : localStorage,
    paths: ['quoteSymbol'],
  },
});
