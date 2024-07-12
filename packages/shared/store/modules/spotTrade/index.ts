/**
 * @store spotTrade
 * @description spotTrade “现货交易模块”，内部组件需要存储或共享的信息
 * @example
 * spotSpread  行情组件展开状态
 * clickHandicap  盘口档位点击值
 */
import { defineStore } from 'pinia';
import { SpotTradeInt } from './type';
import { useMarketStore } from '../market';
import { useUserStore } from '../user';
import clonedeep from 'lodash.clonedeep';
import { initialSocketItem } from './config';
import { symbolBalance } from '#shared/api/assets/index';
import { toNumber, Op } from '#shared/utils/maths';
import { isLogin } from '#shared/utils/auth';

export const useSpotTradeStore = defineStore('spotTrade', {
  state: (): SpotTradeInt => {
    return {
      spotSpread: false, // 是否展开
      clickHandicap: '', //  盘口档位点击值
      symbolName: [], // 所有币对名称
      isOpenMarketWs: false, // 是否开启了ws
      wsMarketData: [], // ws最新的全量数组
      symbolBalanceObj: {
        baseBalance: '0', //币对余额
        tradeTagBalance: '0', //币种余额
      },
    };
  },
  actions: {
    // 行情数据ws管理
    getMarketWsData(wsObj) {
      if (wsObj.hasOwnProperty('ask')) {
        return;
      }
      const flag = this.wsMarketData.some((item) => item.symbol.toUpperCase() === wsObj.symbol.toUpperCase());
      if (!flag) {
        this.wsMarketData.push(wsObj);
        return;
      }
      this.wsMarketData.forEach((item, index) => {
        if (item.symbol.toUpperCase() === wsObj.symbol.toUpperCase()) {
          wsObj.beforePrice = item.close;
          this.wsMarketData[index] = wsObj;
        }
      });
    },
    // 获取现货用户余额
    getSymbolBalance() {
      const marketStore = useMarketStore();
      if (!isLogin()) {
        return;
      }
      const obj = {};
      symbolBalance().then((res) => {
        if (res.code === '0' && res.data) {
          //@ts-ignore
          res.data.forEach((item) => {
            obj[item.coin] = item;
          });
        }
        this.symbolBalanceObj.baseBalance = obj[marketStore.defaultCoin.base]?.normalBalance || 0;
        this.symbolBalanceObj.tradeTagBalance = obj[marketStore.defaultCoin.quote]?.normalBalance || 0;
      });
    },
    // 左侧行情展开
    handleSpotSpread(isSpotSpread: boolean) {
      this.spotSpread = isSpotSpread;
    },
    // 传递盘口档位点击值
    setClickHandicap(num: string | number) {
      this.clickHandicap = num;
    },
  },

  getters: {
    // 当前币对ws信息
    marketLatestPriceList(state) {
      const userStore = useUserStore();
      const marketStore = useMarketStore();
      const coinData = state.wsMarketData.find((v) => v.symbol.toUpperCase() === marketStore.defaultCoin.name?.toUpperCase());
      const beforePrice = coinData?.beforePrice || 0;
      const latestPrice = coinData?.close || 0;
      let closeRangeColor = '';
      if (beforePrice && Op.lt(toNumber(latestPrice, 0), toNumber(beforePrice, 0))) {
        // closeRangeColor = `common-${userStore.userColorConfig.down}`;
        closeRangeColor = `c-#F65353`;
      } else if (beforePrice && Op.gt(toNumber(latestPrice, 0), toNumber(beforePrice, 0))) {
        closeRangeColor = `common-${userStore.userColorConfig.up}`;
        // closeRangeColor = `c-#00C383`;
      }
      return {
        closeRangeColor,
        ...coinData,
      };
    },
    // 行情页面表格，币币行情推送数据
    marketTableWsData(state) {
      const marketStore = useMarketStore();
      const openedSymbolList = marketStore.symbolList?.filter((i: any) => {
        return i.isShow === 1;
      });
      const res: any[] = [];
      const wsMarketData = clonedeep(state.wsMarketData);

      openedSymbolList?.forEach((i) => {
        const temp = wsMarketData.find((j) => {
          return i.symbol.toLowerCase() === j.symbol.toLowerCase();
        });
        // 从币种列表信息中找到对应币种的发行量
        const tempCoinSymbol = marketStore.coinSymbolList.find((j) => {
          return j.name.toLowerCase() === i.base.toLowerCase();
        });
        if (temp && tempCoinSymbol) {
          res.push({
            ...temp,
            otherInfo: i,
            publishAmount: parseFloat(tempCoinSymbol.publishAmount),
          });
        } else {
          res.push({
            ...initialSocketItem,
            quote: i.quote,
            base: i.base,
            symbol: i.symbol,
            otherInfo: i,
            publishAmount: '--',
          });
        }
      });
      return res;
    },
  },
  // 开启数据缓存
  // persist: {
  //   key: 'isOpenMarketWs',
  //   storage: localStorage,
  //   paths: ['isOpenMarketWs'],
  // },
});
