import { useMarketStore } from '#shared/store/modules/market';

/**
 * @description 合约检查是否为币种，在测试环境如果发现非币种就抛出错误，正式环境console.error
 * @param symbols 币种数组
 */
export function expectSymbols(symbols: string[]) {
  try {
    const allCoinSymbolInfos = toRaw(useMarketStore().futureCoinSymbolList);
    const allSymbols = new Set(allCoinSymbolInfos.map((item) => item.base).filter((item) => Boolean(item)));
    for (const symbol of symbols) {
      if (!allSymbols.has(symbol)) {
        console.error(symbol, symbols);
        throw new Error('这不是币种！');
      }
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      throw error;
    } else {
      console.error(error);
    }
  }
}

/**
 * @description 检查是否为币对数组，测试环境抛出错误，正式环境打印错误日志
 * @param coinSymbols 币对数组
 */
export function expectCoinSymbols(coinSymbols: string[]) {
  try {
    const allCoinSymbolInfos = toRaw(useMarketStore().futureCoinSymbolList);
    const allCoinSymbols = new Set(allCoinSymbolInfos.map((item) => item.symbol).filter((item) => Boolean(item)));
    for (const coinSymbol of coinSymbols) {
      if (!allCoinSymbols.has(coinSymbol)) {
        console.error(coinSymbol, coinSymbols);
        throw new Error('这不是币种！');
      }
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      throw error;
    } else {
      console.error(error);
    }
  }
}
