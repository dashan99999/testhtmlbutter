import {
  getRateList,
  getDefaultRateCurrency,
  getPublicInfo,
  getLanguageList,
  getWithdrawLimit,
  getTradeSort,
  getFiatList,
} from '@bitunix/shared/api/app';
import { getFutureMarketSymbols, getFutureMarketCoinSymbol } from '@bitunix/shared/api/contractTrad';
import { getAccountBalance, commonCoinPairList } from '@bitunix/shared/api/assets';
export default cachedEventHandler(
  async () => {
    try {
      const [
        rate,
        rateCurrency,
        publicInfo,
        language,
        withdraw,
        coinSymbolList,
        coinSymbolSort,
        fiatList,
        futureCoinSymbolList,
        futureSymbolList,
        coinPairList,
      ] = await Promise.allSettled([
        getRateList(),
        getDefaultRateCurrency(),
        getPublicInfo(),
        getLanguageList(),
        getWithdrawLimit({ userKycTypeCode: 'lv2' }),
        getAccountBalance(),
        getTradeSort(),
        getFiatList(),
        getFutureMarketSymbols(),
        getFutureMarketCoinSymbol(),
        commonCoinPairList(),
      ]);
      return {
        code: '0',
        data: {
          rateList: rate.status === 'fulfilled' ? rate.value : [],
          rateCurrency: rateCurrency.status === 'fulfilled' ? rateCurrency.value?.data : [],
          publicInfo: publicInfo.status === 'fulfilled' ? publicInfo.value.data : {},
          languageList: language.status === 'fulfilled' ? language.value.data : [],
          withDrawLimit: withdraw.status === 'fulfilled' ? withdraw.value.data : '0',
          coinSymbolList: coinSymbolList.status === 'fulfilled' ? coinSymbolList.value : [],
          coinSymbolSort: coinSymbolSort.status === 'fulfilled' ? coinSymbolSort.value : [],
          fiatList: fiatList.status === 'fulfilled' ? fiatList.value : [],
          futureCoinSymbolList: futureCoinSymbolList.status === 'fulfilled' ? futureCoinSymbolList.value : [],
          futureSymbolList: futureSymbolList.status === 'fulfilled' ? futureSymbolList.value : [],
          coinPairList: coinPairList.status === 'fulfilled' ? coinPairList.value : [],
        },
        msg: null,
      };
    } catch (e: any) {
      return {
        code: e.code,
        data: null,
        msg: e.message,
      };
    }
  },
  { maxAge: 300, staleMaxAge: 300 },
);
