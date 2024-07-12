import { ResolutionsString, symbolInfo } from '../interfaces';
import { parseSymbol, getExChangeName, getTvCssAttr, getTradingViewLocalCache } from './index';
import { CONTRACT_TV_CACHE_KEY, DEFAULT_RESOLUTIONS, RESOLUTIONS_CACHE_KEY, SPOT_TV_CACHE_KEY, TV_DEFAULT_ID, resolutionsKey } from '../constants';
import { DatafeedConfiguration, IChartingLibraryWidget, ResolutionString } from '../public/charting_library/charting_library';

let pricescale = 4; // 价格等级
export const setPricescale = (p: number) => (pricescale = 10 ** p);

export const intraday_multipliers = resolutionsKey;

export const getSymbolInfo: symbolInfo = (symbolName) => {
  return {
    name: symbolName,
    ticker: symbolName,
    description: symbolName,
    symbol: parseSymbol(symbolName),
    full_name: symbolName,
    exchange: getExChangeName(symbolName),
    listed_exchange: 'bitunix',
    type: 'bitcoin',
    session: '24x7',
    timezone: 'Etc/UTC',
    minmov: 1,
    minmove2: 0,
    pricescale,
    format: 'volume',
    has_intraday: true,
    has_weekly_and_monthly: true,
    weekly_multipliers: ['1'],
    monthly_multipliers: ['1'],
    has_empty_bars: true, // 空bar 用横线替代
    supported_resolutions: configurationData.supported_resolutions as ResolutionString[],
    intraday_multipliers,
    data_status: 'streaming'
  };
};

export const configurationData: DatafeedConfiguration = {
  //  图表&币对支持的分辨率
  supported_resolutions: resolutionsKey as ResolutionsString[],
  exchanges: []
};

// 创建MA指标 | 成交量
export const creatMA = (widgetInstance: IChartingLibraryWidget) => {
  if (!widgetInstance) return;
  const activeChart = widgetInstance.activeChart();

  activeChart.createStudy('Volume');
  activeChart.createStudy('Moving Average', false, false, {}, { 'plot.color': '#F5CB89' });
};

// 获取本地保存数据
export function getSavedData(symbolName: string, riseDownColor: string[], exType: string) {
  let chartData: any = getTradingViewLocalCache(exType);

  if (!chartData || !document.getElementById(TV_DEFAULT_ID)) return null;

  chartData = JSON.parse(chartData);

  chartData.charts.forEach((item: any) => {
    // 处理 symbol 恢复
    const sources_state = item.panes[0].sources[0].state;
    sources_state.symbol = symbolName;
    sources_state.shortName = symbolName;

    // 每次切换主题都重置背景颜色
    const targetEle = getTvCssAttr();
    if (targetEle) {
      const bg_color = targetEle.getPropertyValue('--color-bg-0');
      if (bg_color) {
        const paneProperties = item.chartProperties.paneProperties;
        paneProperties.backgroundType = 'solid';
        paneProperties.background = bg_color;
        paneProperties.backgroundGradientEndColor = bg_color;
        paneProperties.backgroundGradientStartColor = bg_color;
      }
    }

    // 强制恢复自动缩放模式
    item.panes[0].sources[0].state.priceAxisProperties.autoScale = true;

    item.panes[0].rightAxisesState[0].state.m_isAutoScale = true;

    // 强制修复缩放比例，防止在极端情况下缩放到很小分辨率后出现请求几千条数据的情况
    item.timeScale.m_barSpacing = navigator.vendor.includes('Apple') ? 1 : 5;

    // 强制修复分辨率问题
    item.panes[0].sources[0].state.interval = localStorage.getItem(RESOLUTIONS_CACHE_KEY) || DEFAULT_RESOLUTIONS;

    // 修复K线颜色问题
    sources_state.candleStyle.upColor = riseDownColor[0];
    sources_state.candleStyle.downColor = riseDownColor[1];
    sources_state.candleStyle.borderUpColor = riseDownColor[0];
    sources_state.candleStyle.borderDownColor = riseDownColor[1];
    sources_state.candleStyle.wickUpColor = riseDownColor[0];
    sources_state.candleStyle.wickDownColor = riseDownColor[1];

    // "paneProperties.vertGridProperties.color": "rgba(0,0,0,0)", 面板垂直网格颜色
    // "paneProperties.horzGridProperties.color": "rgba(0,0,0,0)", 面板水平网格颜色
    // "scalesProperties.lineColor": R,
    // "mainSeriesProperties.lineStyle.color": Y,
    // "scalesProperties.textColor": U
  });

  return chartData;
}

// 修复tv样式异常
export function fixTradingViewStyle() {
  const key = 'tradingview.chartproperties';
  const target = localStorage.getItem(key);

  if (!target || !document.getElementById(TV_DEFAULT_ID)) return;
  const result = JSON.parse(target);
  const bgColor = getTvCssAttr().getPropertyValue('--color-bg-0');

  result.paneProperties.backgroundType = 'solid';
  result.paneProperties.background = bgColor;
  result.paneProperties.backgroundGradientStartColor = bgColor;
  result.paneProperties.backgroundGradientEndColor = bgColor;

  localStorage.setItem(key, JSON.stringify(result));
}

// 保存缓存
export function tradingViewCacheSave(tvWidget: any, exType: string) {
  tvWidget.save((obj: any) => {
    localStorage.setItem(exType === 'contract' ? CONTRACT_TV_CACHE_KEY : SPOT_TV_CACHE_KEY, JSON.stringify(obj));
  });
}
