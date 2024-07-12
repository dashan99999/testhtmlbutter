import { defineStore } from 'pinia';
import { FutureStoreState, createDefaultAccount, Quotation, FutureSymbolStruct, FutureStoreGetter, FutureStoreActions } from './types';
import { equalString, toUpString } from '#shared/utils/tools';
import { Observable } from '#shared/utils/Observable';
import { futureMarketConfig, futureMarketUpdate, getFuturePositionList } from '#shared/api/contractTrad';
import { showToast } from 'vant';
import { FutureWebSocketSubscribe } from '#shared/hooks/websocket';
import { toLowerString } from '#shared/utils/tools';
const MaxQuotationHistory = 1;
const tradePositionSubCloseRef = (() => {
  let val = () => {};
  const obj = { value: () => {} };
  Object.defineProperty(obj, 'value', {
    set(v) {
      val();
      val = v;
    },
  });
  return obj;
})();
export const useFutureStore = defineStore<string, FutureStoreState, FutureStoreGetter, FutureStoreActions>('future', {
  state: () => ({
    isInitComplete: false,
    /**
     * @description 币种列表
     */
    baseSymbols: [],
    /**
     * @description 币对列表
     */
    symbols: [],
    /**
     * @description 账户信息
     */
    accountSummary: createDefaultAccount(),
    /**
     * @description 当前操作币对
     */
    currentSymbol: 'BTCUSDT',
    /**
     * @description 币对标记价格
     */
    symbolSignPrice: {},
    /**
     * @description 行情
     */
    liveQuotation: {},
    symbolDetailMap: {},
    hasAccountSummary: false,
    positionChange$: new Observable(),
    orderChange$: new Observable(),
    stopOrderChange$: new Observable(),
    stopProfitLossChange$: new Observable(),
    quotationHistory: new Map(),
    /**
     * @description 交易区数据
     */
    tradeOperate: {
      leverage: 0,
      type: 1,
      positionType: 1,
      position: [],
    },
  }),
  getters: {
    currentSignPrice(state) {
      return state.symbolSignPrice[state.currentSymbol];
    },
    currentLiveQuotation(state) {
      return state.liveQuotation[state.currentSymbol];
    },
    currentSymbolInfo(state) {
      return state.symbols.find((item) => equalString(item.symbol, state.currentSymbol)) as FutureSymbolStruct;
    },
    currentPosition(state) {
      const find = state.tradeOperate.position.find((item) => equalString(String(item.type), String(state.tradeOperate.type)));
      return find || null;
    },
  },
  actions: {
    /**
     * @description 更新杠杆
     * @param value 杠杆率
     */
    updateLeverage(value: number) {
      futureMarketUpdate({
        symbol: this.currentSymbol,
        positionType: this.tradeOperate.positionType,
        leverage: value,
      }).then((res: any) => {
        if (res.code === 0) {
          this.tradeOperate.leverage = res.data.leverage;
          this.tradeOperate.positionType = res.data.positionType;
        } else {
          showToast(res.msg);
        }
      });
    },
    /**
     * @description 更新交易区仓位模式
     * @param value 1：逐仓 2：全仓
     */
    updatePositionType(value: 1 | 2) {
      futureMarketUpdate({
        symbol: this.currentSymbol,
        positionType: value,
        leverage: this.tradeOperate.leverage,
      }).then((res) => {
        if (res.code === 0) {
          this.tradeOperate.leverage = res.data.leverage;
          this.tradeOperate.positionType = res.data.positionType;
        } else {
          showToast(res.msg);
        }
      });
    },
    updateCompleteStatus() {
      this.isInitComplete = true;
    },
    getSymbol(symbol) {
      const find = this.symbols.find((item) => equalString(symbol, item.symbol));
      if (!find) {
        if (import.meta.env.DEV) {
          throw new Error(`can't find the symbol(${symbol})`);
        } else {
          return this.symbols[0];
        }
      }
      return find;
    },
    setEmptyAccountSummary() {
      this.accountSummary = createDefaultAccount();
    },
    pushQuotationHistory(symbol, data) {
      const _symbol = toUpString(symbol);
      if (!this.quotationHistory.has(_symbol)) {
        this.quotationHistory.set(_symbol, []);
      }
      this.quotationHistory.get(_symbol)!.push(data);
      if (this.quotationHistory.get(_symbol)!.length > MaxQuotationHistory) {
        this.quotationHistory.get(_symbol)!.shift();
      }
    },
    getQuotationHistory(symbol) {
      const _symbol = toUpString(symbol);
      if (!this.quotationHistory.has(_symbol)) {
        return [];
      }
      return this.quotationHistory.get(_symbol) as Quotation[];
    },
    updateCurrentSymbol(symbol) {
      const legalSymbolName = toUpString(symbol);
      this.currentSymbol = legalSymbolName;
      // @ts-ignore
      this.currentSymbolRef = legalSymbolName;
      // 切换币对后的操作
      futureMarketConfig(this.currentSymbol).then((res) => {
        this.tradeOperate.leverage = res.leverage;
        this.tradeOperate.positionType = res.positionType;
      });

      // 仓位
      const getPositionList = () => {
        getFuturePositionList(this.currentSymbol).then((res) => {
          // @ts-ignore
          this.tradeOperate.position = Array.isArray(res) ? res : [];
        });
      };
      getPositionList();
      let timer: any = null;
      tradePositionSubCloseRef.value = FutureWebSocketSubscribe.value!.subscribe(`position_${toLowerString(this.currentSymbol)}`, () => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          getPositionList();
        }, 300);
      });
    },
  },
});
