import BigNumber from '../public/bignumber/bignumber';
import { ResolutionsKey, MaybeRef, Unit, EventBus, UrlParameters } from '../interfaces';
import {
  CONTRACT_API,
  CONTRACT_TV_CACHE_KEY,
  DEFAULT_PRICE,
  DISPLAY_CACHE_KEY,
  DISPLAY_MENUS,
  EX_TYPE_KEY,
  HISTORY_ENDID_KEY,
  HISTORY_STATE_KEY,
  PAGE_SIZE,
  PRICE_CACHE_KEY,
  PRICE_TYPE,
  RESOLUTIONS_CACHE_KEY,
  RESOLUTION_MAPPING,
  SERIES_CACHE_KEY,
  SPOT_API,
  SPOT_TV_CACHE_KEY,
  SUBSCRIPT_NUMBER_MAP,
  TV_DEFAULT_ID,
} from '../constants';
import { CONTRACT_ORDER_BAR_XY_CACHE_KEY } from '../constants';
import { SPOT_ORDER_BAR_XY_CACHE_KEY } from '../constants';

export const calcPricePrecision = (num: number) => {
  if (!num) return 8;

  const absNum = Math.abs(+num);

  if (absNum < 0.00000000001) return 16;
  if (absNum < 0.000000001) return 14;
  if (absNum < 0.0000001) return 12;
  if (absNum < 0.00001) return 10;
  if (absNum < 0.05) return 6;
  if (absNum < 1) return 4;
  if (absNum < 20) return 3;

  return 2;
};

// 根据前缀获取exchange展示名称
export const getExChangeName = (symbolName: string) => {
  let result = 'Ubit Last Price';
  if (symbolName.indexOf(PRICE_TYPE.mark) > -1) result = 'Ubit Mark Price';
  if (symbolName.indexOf(PRICE_TYPE.index) > -1) result = 'Ubit Index Price';

  return result;
};

// 根据时间序列获取对应的分辨率请求名称
export function parseResolution(resolution: ResolutionsKey) {
  let result = RESOLUTION_MAPPING[resolution];

  result = !resolution || !RESOLUTION_MAPPING[resolution] ? RESOLUTION_MAPPING['1'] : result;

  return result;
}

export const formatPrice = (num: number, precision: number, gr0 = true) => {
  if (!num) return num;
  if (!precision) {
    precision = calcPricePrecision(+num);
  }

  let formated = new BigNumber(num).toFormat(precision);
  if (formated.match(/^0\.[0]+$/g)) {
    formated = formated.replace(/\.[0]+$/g, '');
  }

  if (gr0 && formated.match(/\.0{4,15}[1-9]+/g)) {
    const match = formated.match(/\.0{4,15}/g) as RegExpMatchArray;
    const matchString = match[0].slice(1);
    formated = formated.replace(/\.0{4,15}/g, `.0${SUBSCRIPT_NUMBER_MAP[matchString.length as never]}`);
  }

  return formated;
};

/**
 * @description url 链接支持的参数
 * @params theme : dark | light           default  dark
 * @params lang : en | zh | ...           default  en
 * @params symbol : AAPL | BTCUSDT | ...  default  BTCUSDT
 * @params type : spot | contract         default  contract
 * @params client : pc | h5               default  pc
 * @example  <iframe src="https://kline.bitunix.com/chart.html?lang=en&theme=dark" width="100%" height="100%" frameborder="0"></iframe>
 */
export function query(name: string) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ')).toLowerCase();
}

// 判断是否为手机版
export const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

// 获取channer地址
export const getChannelUrl = (name: string, resolution: string) => {
  const priceType = localStorage.getItem(PRICE_CACHE_KEY) || DEFAULT_PRICE;
  const symbolName = parseSymbol(name).split('/')[0].toLowerCase();
  let prefix = '';

  // new: 最新价格 | index: 指数价格 | mark: 标记价格
  if (priceType !== DEFAULT_PRICE && ['index', 'mark'].includes(priceType)) prefix = `_${priceType}`;

  return `market_${symbolName}${prefix}_klinetv_${resolution}`;
};

// 去掉价格切换的symbol前缀
export const parseSymbol = (name: string) => name.replace(/~|\./g, '');

// 添加symbol前缀
export const addSymbolPrefix = (symbolName: string, exType: MaybeRef<'spot' | 'contract'>) => {
  // 如果是现货模式则不处理
  if (exType === 'spot') return symbolName;

  const priceType = localStorage.getItem(PRICE_CACHE_KEY);
  if (priceType === 'mark') return `${PRICE_TYPE.mark}${symbolName}`;
  if (priceType === 'index') return `${PRICE_TYPE.index}${symbolName}`;

  return symbolName;
};

// 获取历史K线函数
export async function getHistoryBars(
  firstDataRequest: boolean,
  symbol: string,
  endId: number | undefined,
  interval: string,
  countBack: number,
) {
  const exType = sessionStorage.getItem(EX_TYPE_KEY);
  const priceType = localStorage.getItem(PRICE_CACHE_KEY) || '';
  const wsUrl = sessionStorage.getItem('wsUrl') || '';
  const host = wsUrl.toString().split('/')[2];
  // 合约 ? 合约地址 : 现货地址
  const url = exType === 'contract' ? CONTRACT_API : SPOT_API;
  const urlParameters: UrlParameters = {
    symbol,
    end: endId || 0,
    interval,
    limit: firstDataRequest ? PAGE_SIZE : countBack,
    type: '',
  };
  // 在合约模式下并且不是最新价格才添加类型
  if (Object.keys(PRICE_TYPE).includes(priceType) && priceType !== 'new' && exType === 'contract') urlParameters['type'] = priceType;

  const query = Object.keys(urlParameters)
    .map((name) => `${name}=${encodeURIComponent(urlParameters[name as keyof UrlParameters])}`)
    .join('&');
  const data = await fetch(`//${host}/${url}?${query}`);

  return await data.json();
}

// 对分辨率进行排序操作
export function ResolutionCustomCompare(a: string, b: string) {
  const parseTime = (str: string) => {
    if (str.endsWith('M')) {
      return parseInt(str) * 43200; // 1M = 30D
    } else if (str.endsWith('W')) {
      return parseInt(str) * 10080; // 1W = 7D
    } else if (str.endsWith('D')) {
      return parseInt(str) * 1440; // 1D = 1440M
    } else {
      return parseInt(str);
    }
  };

  const valueA = parseTime(a);
  const valueB = parseTime(b);

  return valueA - valueB;
}

// 判断是否有成交量
export const hasVolume = (data: any) =>
  data.panes.length === 2 && data.panes[1].sources.find((item: { [key in string]: string }) => item.type === 'study_Volume') ? true : false;

// 清理历史数据的状态
export function clearHistoryState() {
  sessionStorage.removeItem(HISTORY_STATE_KEY);
  sessionStorage.removeItem(HISTORY_ENDID_KEY);
}

// 获取tv上的css变量
export const getTvCssAttr = () => getComputedStyle(document.getElementById(TV_DEFAULT_ID) as HTMLElement);

// 创建ws数据共享事件总线
export const eventBus: EventBus = {
  events: {},
  subscribe(event: string, callback: () => void) {
    if (!this.events[event]) this.events[event] = [];

    this.events[event].push(callback);
  },
  publish(event: string, data: any) {
    if (this.events[event]) this.events[event].forEach((callback: (data: any) => void) => callback(data));
  },
  unsubscribe(event: string, callback: () => void) {
    if (this.events[event]) {
      const index = this.events[event].indexOf(callback);

      if (index !== -1) this.events[event].splice(index, 1);
    }
  },
};

// 判断是否登录
export const isLogin = () => localStorage.getItem('fast-token');

// 处理%符号
export function parseInputVolume(val: string): number {
  if (val.indexOf('%') > 1) {
    return parseFloat(val) / 100;
  }

  return parseFloat(val);
}

// 千分位转换
export const toThousands = (num: string) => num.toString().replace(/\d+/, (n: string) => n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));

// 不足长度数字补充0,大于补充长度时截取掉多余
export function fillZero(num: string, len: number) {
  const _len = Number(len);
  const _num = String(num);

  if (isNaN(_len) || _len < 0) {
    console.error(`fillZero param len error, expect >= 0, but get ${_len}`);
    return '0';
  }

  if (!isNumber(_num)) {
    console.error(`fillZero param num error, expect >= 0, but get ${num}`);
    return '0';
  }

  const [integerPart, decimalPart] = String(num).split('.');
  const firstNum = integerPart || '0';
  const secondNum = (decimalPart || '0') + '0'.repeat(_len);

  return _len === 0 ? firstNum : `${firstNum}.${secondNum.substring(0, _len)}`;
}

// 判断是否是一个数字
export const isNumber = (value: string) => !isNaN(parseFloat(value));

// 判断价格后缀单位
export const formatPriceKMB = (price: string) => {
  // 将价格字符串转换为数字
  const numericPrice = parseFloat(price);

  if (numericPrice >= 1000000000) {
    // 大于10亿，使用B单位显示，保留两位小数
    return (numericPrice / 1000000000).toFixed(2) + 'B';
  } else if (numericPrice >= 1000000) {
    // 大于1百万，使用M单位显示，保留两位小数
    return (numericPrice / 1000000).toFixed(2) + 'M';
  } else if (numericPrice >= 1000) {
    // 大于1千，使用K单位显示，保留两位小数
    return (numericPrice / 1000).toFixed(2) + 'K';
  } else {
    return numericPrice.toString();
  }
};

// 获取用户自定义配置
export const getUserSettingConfig = () => {
  const value = localStorage.getItem(DISPLAY_CACHE_KEY);
  let result = DISPLAY_MENUS;

  if (value) result = JSON.parse(value);
  return result as typeof DISPLAY_MENUS;
};

// 根据价格类型获取价格语言
export const getPriceLang = (lang: any, type: Unit) => {
  let key = 'number';

  if (type === 'quote') key = 'nominalValue';
  if (type === 'cost') key = 'costValue';

  return lang[key];
};

// 判断一个元素是否在另外一个元素内部
export const isDescendant = (parent: HTMLElement, child: HTMLElement | null) => {
  let node = child?.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node?.parentNode;
  }
  return false;
};

// 清空本地存储缓存
export const clearLocalStorage = () => {
  // 清空自己存储的缓存
  [
    CONTRACT_TV_CACHE_KEY,
    SPOT_TV_CACHE_KEY,
    RESOLUTIONS_CACHE_KEY,
    PRICE_CACHE_KEY,
    SERIES_CACHE_KEY,
    DISPLAY_CACHE_KEY,
    CONTRACT_ORDER_BAR_XY_CACHE_KEY,
    SPOT_ORDER_BAR_XY_CACHE_KEY,
    // 过去一些废弃的缓存ID
    'Bitunix_TradingView_Cache',
    'Bitunix_Display_Setting_Cache',
    'Bitunix_Display_Setting_Cache_V1',
    'Bitunix_Display_Setting_Cache_V2',
  ].forEach((key) => {
    localStorage.removeItem(key);
  });

  // 清空tradingview的缓存
  Object.keys(localStorage).forEach((key) => {
    key.indexOf('tradingview.') > -1 && localStorage.removeItem(key);
  });
};

// 点击节流
let isThrottled = false;
export const throttledClick = (fn: () => void) => {
  if (!isThrottled) {
    fn && fn();

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
    }, 1000);
  }
};

// 获取合约现货Key
export const getContractOrSpotKey = () => {
  const type = sessionStorage.getItem(EX_TYPE_KEY);
  return type === 'contract' ? CONTRACT_ORDER_BAR_XY_CACHE_KEY : SPOT_ORDER_BAR_XY_CACHE_KEY;
};

// 合约现货缓快捷下单位置缓存设置
export const setOrderBarCache = (offset: { x: number; y: number }) => {
  localStorage.setItem(getContractOrSpotKey(), JSON.stringify({ x: offset.x, y: offset.y }));
};

// 获取合约现货缓快捷下单位置缓存设置
export const getOrderBarCache = () => JSON.parse(localStorage.getItem(getContractOrSpotKey()) || '{}');

// 挂载样式变量
export function patchOrderBarClassName(riseDownColor: string[]) {
  ['--tv-buy-color', '--tv-sell-color'].forEach((key, index) =>
    document.getElementById(TV_DEFAULT_ID)?.style.setProperty(key, riseDownColor[index]),
  );
}

// 下载图片
export function saveDataURLToFile(dataURL: string) {
  // 创建一个虚拟的 a 元素
  const downloadLink = document.createElement('a');

  // 设置链接的 href 为传递的 dataURL
  downloadLink.href = dataURL;

  // 设置文件名
  downloadLink.download = 'download.png';

  // 模拟点击下载链接
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 移除下载链接
  document.body.removeChild(downloadLink);
}

// 获取与主题配套的class
export const getThemeClassName = (theme?: string) => `trading_view_${theme === 'Light' ? 'light' : 'drak'}`;

// 修复TradingView颜色异常情况
export function fixTradingViewSourceTitleStyle(iframeDocument: Document) {
  setTimeout(() => {
    iframeDocument.querySelectorAll("div[data-name='legend-source-title']").forEach((item) => item.removeAttribute('style'));
  }, 0);
}

// 获取平台背景色
export const getPanePropertiesBackground = (body: Element) => getComputedStyle(body).getPropertyValue('--tv-color-platform-background');

// 获取TradingView本地缓存
export function getTradingViewLocalCache(type?: string) {
  return localStorage.getItem((type || localStorage.getItem(EX_TYPE_KEY)) === 'contract' ? CONTRACT_TV_CACHE_KEY : SPOT_TV_CACHE_KEY);
}

// 比较两个对象的变化
export function findChangedKeys<T extends Record<string, any>>(newObj: T, oldObj: T): string[] {
  const changedKeys = [];

  for (const key in newObj) {
    // const currentKey = parentKey ? `${parentKey}.${key}` : key;
    const currentKey = key;

    if (typeof newObj[key] === 'object' && newObj[key] !== null && !Array.isArray(newObj[key])) {
      // 递归比较嵌套对象
      const nestedChanges = findChangedKeys(newObj[key], oldObj[key], currentKey);
      changedKeys.push(...nestedChanges);
    } else if (newObj[key] !== oldObj[key]) {
      changedKeys.push(currentKey);
    }
  }

  return changedKeys;
}

// 创建划线订单图标
export function createOrderLineIcon(iframeDocument: Document) {
  const icon = document.createElement('DIV');
  icon.className = 'tv-order-line';
  icon.setAttribute('style', 'width: 52px; height: 36px; display: flex; justify-content: center; align-items: center;');
  icon.innerHTML = `<svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.35397 21.854L13.354 16.854L12.647 16.147L7.64697 21.147L8.35397 21.854Z" fill="currentColor"></path><path d="M16.354 13.854L24.354 5.85397L23.647 5.14697L15.647 13.147L16.354 13.854Z" fill="currentColor"></path><path d="M14.5 16.5C15.328 16.5 16 15.828 16 15C16 14.172 15.328 13.5 14.5 13.5C13.672 13.5 13 14.172 13 15C13 15.828 13.672 16.5 14.5 16.5ZM14.5 17.5C13.119 17.5 12 16.381 12 15C12 13.619 13.119 12.5 14.5 12.5C15.881 12.5 17 13.619 17 15C17 16.381 15.881 17.5 14.5 17.5ZM6.5 24.5C7.328 24.5 8 23.828 8 23C8 22.172 7.328 21.5 6.5 21.5C5.672 21.5 5 22.172 5 23C5 23.828 5.672 24.5 6.5 24.5ZM6.5 25.5C5.119 25.5 4 24.381 4 23C4 21.619 5.119 20.5 6.5 20.5C7.881 20.5 9 21.619 9 23C9 24.381 7.881 25.5 6.5 25.5Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.797 19.6833C19.6012 19.3502 20.4631 19.1787 21.3336 19.1787C22.2041 19.1787 23.066 19.3502 23.8703 19.6833C24.6745 20.0164 25.4052 20.5047 26.0207 21.1202L25.3136 21.8273C24.791 21.3046 24.1705 20.89 23.4876 20.6072C22.8047 20.3243 22.0728 20.1787 21.3336 20.1787C20.5945 20.1787 19.8625 20.3243 19.1796 20.6072C18.4967 20.89 17.8763 21.3046 17.3536 21.8273L16.6465 21.1202C17.262 20.5047 17.9927 20.0164 18.797 19.6833Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.3335 22.6621C20.9205 22.6621 20.5115 22.7435 20.1299 22.9015C19.7483 23.0596 19.4015 23.2913 19.1095 23.5833L18.4023 22.8762C18.7873 22.4913 19.2442 22.186 19.7472 21.9777C20.2501 21.7693 20.7891 21.6621 21.3335 21.6621C21.8779 21.6621 22.4169 21.7693 22.9199 21.9777C23.4228 22.186 23.8798 22.4913 24.2647 22.8762L23.5576 23.5833C23.2655 23.2913 22.9188 23.0596 22.5372 22.9015C22.1556 22.7435 21.7466 22.6621 21.3335 22.6621Z" fill="currentColor"></path><path d="M22.3592 24.9441C22.3592 25.5105 21.9 25.9696 21.3336 25.9696C20.7672 25.9696 20.308 25.5105 20.308 24.9441C20.308 24.3776 20.7672 23.9185 21.3336 23.9185C21.9 23.9185 22.3592 24.3776 22.3592 24.9441Z" fill="currentColor"></path><rect width="25" height="10" rx="5" fill="url(#paint0_linear_5914_3575)"></rect><path d="M18.2046 2.07178L19.4206 6.00778L20.5406 2.07178H21.6606L19.8366 7.92778H18.9406L17.7086 4.10378L16.5166 7.92778H15.6286L13.7246 2.07178H14.9246L16.1246 6.00778L17.2766 2.07178H18.2046Z" fill="white"></path><path d="M12.9535 5.45578H10.5775V6.91178H13.3215V7.92778H9.41748V2.07178H13.2335V3.07978H10.5775V4.45578H12.9535V5.45578Z" fill="white"></path><path d="M4.27536 2.07178L7.11536 5.94378V2.07178H8.19536V7.92778H7.25136L4.40336 4.04778V7.92778H3.33936V2.07178H4.27536Z" fill="white"></path><defs><linearGradient id="paint0_linear_5914_3575" x1="23.4766" y1="5" x2="-1.22033e-06" y2="4.00934" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8B36"></stop><stop offset="1" stop-color="#FF6745"></stop></linearGradient></defs></svg>`;
  const target = iframeDocument.querySelector("#drawing-toolbar div[class*='inner-'] div[class*='group-']");
  target?.insertBefore(icon, target.firstChild);

  return icon;
}
