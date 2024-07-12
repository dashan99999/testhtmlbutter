/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Bar, ResolutionsKey } from './interfaces.js';
import { IBasicDataFeed } from './public/charting_library/charting_library.js';
import { subscribeOnStream, unsubscribeFromStream } from './streaming';
import { HISTORY_ENDID_KEY, HISTORY_STATE_KEY, RESOLUTIONS_CACHE_KEY } from './constants.js';
import { getHistoryBars, parseResolution, parseSymbol } from './utils/index';
import { getSymbolInfo, configurationData } from './utils/tradingview';
import {
  HistoryCallback,
  IDatafeedChartApi,
  IDatafeedQuotesApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback
} from './public/charting_library/datafeed-api.js';

export default <IBasicDataFeed | (IDatafeedChartApi & IExternalDatafeed & IDatafeedQuotesApi)>{
  onReady: (callback: OnReadyCallback) => setTimeout(() => callback(configurationData)),

  searchSymbols: async (_userInput: any, _exchange: any, _symbolType: any, _onResultReadyCallback: unknown) => null,

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: LibrarySymbolInfo) => void,
    onResolveErrorCallback: (error: string) => void,
    _extension: any
  ) => {
    setTimeout(() => {
      if (!symbolName) {
        onResolveErrorCallback('symbol parse error, please check symbolName ,like: btcusdt ');
        return;
      }
      onSymbolResolvedCallback(getSymbolInfo(symbolName));
    }, 0);
  },

  getBars: async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: (error: string) => void
  ) => {
    const load = () => {
      const { firstDataRequest, countBack, to } = periodParams;
      // 该状态会在切换币对、分辨率、价格类型时清除
      const state = !!sessionStorage.getItem(HISTORY_STATE_KEY);
      const endId = sessionStorage.getItem(HISTORY_ENDID_KEY);
      // 如果一个币对存在历史数据则可以执行下方代码，反之则不能进行后续逻辑处理，防止tv无限狂刷历史数据请求接口
      // https://www.tradingview.com/charting-library-docs/latest/connecting_data/Datafeed-Issues/#getbars-is-called-multiple-times
      if (state) {
        onResult([], { noData: false });
        return;
      }

      getHistoryBars(
        firstDataRequest,
        parseSymbol(symbolInfo.name),
        firstDataRequest ? 0 : Number(endId) || to,
        parseResolution((localStorage.getItem(RESOLUTIONS_CACHE_KEY) || resolution) as ResolutionsKey),
        firstDataRequest ? 300 : countBack
      )
        .then((result: { [key in string]: any }) => {
          let data: any = [];
          if (result.data.length) {
            sessionStorage.setItem(HISTORY_ENDID_KEY, result.data[0].time.toString());
            data = result.data.map((bar: Bar) => ({
              time: bar.time * 1000,
              low: Number(bar.low),
              high: Number(bar.high),
              open: Number(bar.open),
              close: Number(bar.close),
              volume: Number(bar.volume)
            }));
          } else {
            // 如果历史数据请求到了尽头，则标记请求完毕不再执行历史数据请求操作
            !result.data.length && sessionStorage.setItem(HISTORY_STATE_KEY, 'true');
          }
          // Fix RangeError: Maximum call stack size exceeded
          // https://www.tradingview.com/charting-library-docs/latest/connecting_data/Datafeed-API?_highlight=maximum&_highlight=call&_highlight=stack&_highlight=size&_highlight=exceeded#asynchronous-callbacks
          setTimeout(() => onResult(data, { noData: false }), 0);
        })
        .catch(() => setTimeout(() => load(), 5000)); // TODO: 极端情况容易出现死轮询
    };

    // 如果用户自己配置了转换器就走用户自己配置的转换器
    if (window && window.bitunixTv.transform.historyBars) {
      symbolInfo.name = parseSymbol(symbolInfo.name);
      window.bitunixTv.transform.historyBars(symbolInfo, resolution, periodParams, onResult, onError);
    } else {
      load();
    }
  },

  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ) => {
    // 如果用户自己配置了转换器就走用户自己配置的转换器
    if (window && window.bitunixTv.transform.subscribeBars) {
      symbolInfo.name = parseSymbol(symbolInfo.name);
      window.bitunixTv.transform.subscribeBars(symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback);
    } else {
      subscribeOnStream(symbolInfo, resolution as ResolutionsKey, onTick, listenerGuid, onResetCacheNeededCallback);
    }
  },

  unsubscribeBars: (listenerGuid) => {
    if (window && window.bitunixTv.transform.unsubscribeBars) {
      window.bitunixTv.transform.unsubscribeBars(listenerGuid);
    } else {
      unsubscribeFromStream(listenerGuid);
    }
  }
};
