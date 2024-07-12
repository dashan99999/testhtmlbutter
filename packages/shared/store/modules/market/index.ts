/**
 * @store marketStore
 * @description 储存并共享和“用户无关”的系统币对信息，币种信息等，系统初始化时储存
 * @example 见./types 下数据示例
 */

import { defineStore } from 'pinia';
import clonedeep from 'lodash.clonedeep';
import { Market, ReactivePickSymbolObjType } from './types';
import { getFiatList, getUserSelectedSymbol, getTradeSort } from '#shared/api/app';
import { commonCoinPairList, getAccountBalance } from '#shared/api/assets';
import { symbolTurnsMap, coinPairCompare } from '#shared/utils/tools';
import { isLogin } from '#shared/utils/auth';
import {
  getFutureMarketSymbols,
  // getFutureMarketCoinSymbolInfos,
  getFutureMarketCoinSymbol,
  getFutureUserSelection,
} from '#shared/api/contractTrad/index';
import { IUserSelected } from '#shared/api/contractTrad/types';
// import { IMarketSymbol, ICoinSymbolInfo, IUserSelected } from '#shared/api/contractTrad/types';
import { CoinPairType } from '#shared/api/assets';
import { setHandleStar } from '#shared/api/spot-trade';

export const useMarketStore = defineStore('market', {
  state: (): Market => ({
    defaultCoin: { base: '', quote: '', name: '' }, // 当前展示币对
    coinSymbolList: [], // 现货币种信息列表
    symbolList: [], // 现货币对信息列表--原始数据
    fiatList: undefined, // 所有法币数据列表
    symbolClass: {}, //  经过分类的现货币对信息
    userSelectedSymbol: [], // 现货自选列表
    symbolName: [], // 扁平化币对名称
    coinSymbolSort: [], // 币种排序
    preferences: { coin: 'USDT', rate: 0 }, // 计价偏好

    futureSymbolList: [], // 合约币种信息列表
    futureCoinSymbolList: [], // 合约币对列表
    // futureList: undefined, // 所有合约数据列表
    // futureSybolClass: {}, // 经过分类的合约币种信息
    userSelectedFutureSymbol: { type: 0, symbolList: [], symbolVOS: [], symbolInfoList: [] }, // 合约自选列表
    _currentFutureOperateCoinSymbol: 'BTCUSDT',
    /*
      临时ignore
    */
    // @ts-ignore
    currentFutureOperateCoinLivePrice: null,
    currentFutureSignPrice: null,
    futureUserAcount: {
      available: '0.00000000',
      balanceTotal: '0.00000000',
      coinSymbol: 'USDT',
      frozen: '0.00000000',
      margin: '0.00000000',
      profitUnreal: '0.00000000',
      profitUnrealQuote: '0.00',
      total: '0.00000000',
      totalQuote: '0.00',
      transfer: '0.00000000',
    },
    selectedSpotSymbol: [],
    preparationSpotData: false,
  }),
  getters: {
    currentFutureOperateCoinSymbol: (state) => {
      return state.futureCoinSymbolList.find((item) => item.symbol === state._currentFutureOperateCoinSymbol);
    },
    allFutureSymbolNames: (state) => {
      const list = state.futureCoinSymbolList.map((item) => item.symbol).filter((item) => typeof item === 'string');
      return list;
    },
    currentCoinSymbolPrecision: (state) => {
      const find = state.futureCoinSymbolList.find((item) => item.symbol === state._currentFutureOperateCoinSymbol);
      if (find) {
        return {
          amountPrecision: find.amountPrecision,
          pricePrecision: find.pricePrecision as number,
          basePrecision: find.basePrecision,
          quotePrecision: find.quotePrecision,
          feePrecision: find.feePrecision,
        };
      }
      return {
        /**
         * 数量精度
         */
        amountPrecision: 0,
        /**
         * @description 价格精度
         */
        pricePrecision: 0,
        /**
         * @description 基础币数量精度(单独)
         */
        basePrecision: 0,
        /**
         * @description 计价币数量精度
         */
        quotePrecision: 0,
        /**
         * @description 手续费精度
         */
        feePrecision: 0,
      };
    },
    // 合约币对集合，方便取值
    futureCoinSymbolListSet(state) {
      const ret = Object.create(null);
      state.futureCoinSymbolList.forEach((i) => {
        ret[i.symbol.toLowerCase()] = clonedeep(i);
      });
      return ret;
    },
    // 现货币对集合，方便取值
    symbolListSet(state) {
      const ret = Object.create(null);
      state.symbolList.forEach((i) => {
        ret[i.symbol.toLowerCase()] = clonedeep(i);
      });
      return ret;
    },
    /**
     * @description 现货当前币对数据管理
     * basePrecision 基准币精度
     * quotePrecision 计价币精度
     */
    spotCoinMessage: (state) => {
      const pickSymbolObj: ReactivePickSymbolObjType = {
        basePrecision: 2,
        quotePrecision: 2,
        symbol: 'BTCUSDT',
        base: 'BTC',
        quote: 'USDT',
        precisions: [],
        isOpen: 1,
        openTime: null,
        minPrice: '',
        minVolume: '',
      };
      const defaultSymbol = state.defaultCoin.name?.toUpperCase();
      const coinSymbolObj = state.coinSymbolList.find((item) => item.name.toUpperCase() === state.defaultCoin.quote.toUpperCase());
      const coinSymbolBase = state.coinSymbolList.find((item) => item.name.toUpperCase() === state.defaultCoin.base.toUpperCase());
      const symbolObj: CoinPairType | undefined = state.symbolList.find((item) => (item.base + item.quote).toUpperCase() === defaultSymbol);
      const showPrecision = coinSymbolObj?.precision || 2; // 币种精度
      const baseShowPrecision = coinSymbolBase?.precision || 2; // 币对对应的币种精度
      if (symbolObj && Object.keys(symbolObj).length) {
        symbolObj.precisions = symbolObj?.precisions ?? [];
        Object.assign(pickSymbolObj, symbolObj);
      }
      const { symbol, basePrecision, quotePrecision, minPrice, minVolume, openTime } = pickSymbolObj;
      if (minPrice) {
        console.log(
          `%c 🚀 pair information %c${JSON.stringify({ symbol, basePrecision, quotePrecision, minPrice, minVolume, openTime })}`,
          'color:#f5f5f5;background-color:#ea4b64; border-radius: 2px;',
          'background-color:#fff;color:#ea4b64',
        );
      }
      return {
        ...pickSymbolObj,
        showPrecision,
        baseShowPrecision,
      };
    },
  },
  actions: {
    /**
     * 更新现货自选列表
     */
    updateSelectedSpotSymbol(v: any[]) {
      // localStorage.setItem('spotTradeRecommendList', JSON.stringify(v));
      if (!isLogin()) {
        const symbolStrList = v.map((i) => {
          return i.replace('/', '');
        });
        if (!process.server) {
          localStorage.setItem('spotTradeRecommendList', JSON.stringify(symbolStrList));
        }
        this.selectedSpotSymbol = v;
      } else {
        // 传递到后端接口
        const pArr: Promise<any>[] = [];
        v.forEach((i) => {
          pArr.push(
            setHandleStar({
              symbol: (i.shortName || i).toUpperCase(),
              operationType: 1,
              type: 0,
            }),
          );
        });
        Promise.all(pArr).then(() => {
          this.selectedSpotSymbol = v;
          this.getUserSelectedSymbol();
        });
      }
    },
    setInfo(partial: Partial<Market>) {
      this.$patch(partial);
    },
    async getCoinSymbolList() {
      const result = await getAccountBalance();
      this.coinSymbolList = result;
      return result;
    },
    async getTradeSort() {
      const result = await getTradeSort();
      if (result) {
        this.coinSymbolSort = result;
      }
      await this.getSymbolListFun();
      return result;
    },
    // 获取币对api
    async getSymbolListFun() {
      const res = await commonCoinPairList();
      res.forEach((item) => {
        item.symbol = (item.base + item.quote).toUpperCase();
      });
      this.separateSetSymbolListFun(res);
      return res;
    },
    separateSetSymbolListFun(res) {
      // 作展示isShow === 1
      this.symbolList = res.filter((v) => v.isShow === 1).sort(coinPairCompare);
      // 1.币对归类，筛选，排序
      this.symbolClass = symbolTurnsMap(this.symbolList, false);

      // 2.收集所有可见币且开放币名称用于发布订阅 isShow === 1  isOpen=1
      this.symbolName = res.reduce((arr: string[], item) => {
        if (item.isShow === 1 && item.isOpen === 1) {
          arr.push(item.symbol);
        }
        return arr;
      }, []);
    },

    async getFiatList() {
      const result = await getFiatList();
      this.fiatList = result;
      // console.log('this.fiatList', toRaw(this.fiatList));
      return result;
    },
    // 获取自选币api,都走pinia
    async getUserSelectedSymbol() {
      const result = await getUserSelectedSymbol({ type: 0 }); //0现货  1合约
      this.userSelectedSymbol = result;
    },
    /**
     * @description 获取所有的币对信息
     */
    async getAllCoinSymbol() {
      const resultCoinSymbolBase = await getFutureMarketSymbols();
      // const resultDetail = await getFutureMarketCoinSymbolInfos();
      // const result: (IMarketSymbol & ICoinSymbolInfo)[] = [];
      // for (const detail of resultDetail) {
      //   const find = resultCoinSymbolBase.find((_val) => _val.symbol === detail.symbol);
      //   if (find) {
      //     const obj = Object.assign({}, detail, find);
      //     if (obj.symbol.indexOf(obj.base) === -1) {
      //       debugger;
      //     }
      //     result.push(obj);
      //   } else {
      //     console.warn(`cant match`, detail, resultCoinSymbolBase, resultDetail);
      //   }
      // }
      // @ts-ignore
      this.futureCoinSymbolList = resultCoinSymbolBase;
      return resultCoinSymbolBase;
    },
    /**
     * @description 获取币种信息列表
     */
    async getFutureMarketCoinSymbolList() {
      const res = await getFutureMarketCoinSymbol();
      this.futureSymbolList = res;
      return res;
    },
    /**
     * @description 获取用户自选的合约
     */
    async getUserFutureSelected() {
      const userSelection = (await getFutureUserSelection()) as IUserSelected & { symbolInfoList: any[] };
      userSelection.symbolInfoList = [];
      for (const coinSymbol of userSelection.symbolList ?? []) {
        const coinSymbolInfo = this.futureCoinSymbolList.find((_val) => _val.symbol === coinSymbol);
        if (!coinSymbolInfo) continue;
        const symbolInfo = this.futureSymbolList.find((_val) => _val.coinSymbol === coinSymbolInfo.base);
        if (!symbolInfo) continue;
        symbolInfo.symbol = coinSymbolInfo.symbol;
        userSelection.symbolInfoList.push(toRaw(symbolInfo));
      }
      this.userSelectedFutureSymbol = userSelection;
      return userSelection;
    },
    getCoinSymbol(coinSymbol: string) {
      return this.futureCoinSymbolList.find((item) => item.symbol.toLocaleUpperCase() === coinSymbol.toLocaleUpperCase());
    },
    setEmptyAccount() {
      this.futureUserAcount = {
        available: '0.00000000',
        balanceTotal: '0.00000000',
        coinSymbol: 'USDT',
        frozen: '0.00000000',
        margin: '0.00000000',
        profitUnreal: '0.00000000',
        profitUnrealQuote: '0.00',
        total: '0.00000000',
        totalQuote: '0.00',
        transfer: '0.00000000',
      };
    },
    getFuturePrecision(coinSymbol: string, name: string) {
      const precisionMap = {
        pricePrecision: 'pricePrecision',
        signPrice: 'pricePrecision',
        indexPrice: 'pricePrecision',
        close: 'pricePrecision',
        fundingRatePredict: 2,
        fundingRateNext: 2,
        vol: 'amountPrecision',
        rose24h: 2,
      };
      const coinSymbolObj = this.getCoinSymbol(coinSymbol);
      if (!coinSymbolObj) {
        console.warn('未找到对应精度！', coinSymbol);
        return 2;
      }
      if (typeof precisionMap[name] === 'number') {
        return precisionMap[name];
      }
      return coinSymbolObj[precisionMap[name]];
    },
    updateCurrentFutureOperateSymbol(coinSymbol: string) {
      this._currentFutureOperateCoinSymbol = coinSymbol;
    },
    // 设置计价偏好
    setPreferences(v: { coin?: string; rate?: number }) {
      this.preferences = { ...this.preferences, ...v };
    },
  },
  // 开启数据缓存
  persist: [
    {
      key: 'preferences',
      storage: process.server ? undefined : localStorage,
      paths: ['preferences'],
    },
  ],
  // 开启数据缓存
  // persist: {
  //   key: 'symbolList',
  //   storage: process.server ? undefined : localStorage,
  //   paths: ['symbolList'],
  // },
});
