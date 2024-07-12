import { fixD, isNumber } from './maths';
import { useAppStore } from '#shared/store/index';
import useBridge from '#shared/utils/dsbridge';
import cookies from 'js-cookie';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { showToast } from 'vant';
dayjs.extend(duration);

// 计算时间 2012:12:12 12:12:12
export function timeHandling(dataObj: Date, data?: string): string {
  let format: string = data || 'yyyy-MM-dd hh:mm:ss';
  const timeVal = {
    'M+': dataObj.getMonth() + 1, // 月份
    'd+': dataObj.getDate(), // 日
    'h+': dataObj.getHours(), // 小时
    'm+': dataObj.getMinutes(), // 分
    's+': dataObj.getSeconds(), // 秒
    'q+': Math.floor((dataObj.getMonth() + 3) / 3), // 季度
    S: dataObj.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${dataObj.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  Object.keys(timeVal).forEach((k) => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? timeVal[k] : `00${timeVal[k]}`.substr(`${timeVal[k]}`.length));
    }
  });
  return format;
}

// 复制文本
export function copyDetail(value: string, tips: string) {
  if (value.length === 0) return;
  const textArea = document.createElement('textarea');
  textArea.value = value;
  // 使text area不在viewport，同时设置不可见
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  textArea.style.left = '-110vw';
  textArea.style.top = '110vh';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select(); // 选中文本
  const successful = document.execCommand('copy'); // 执行 copy 操作
  const locale = cookies.get(import.meta.env.VITE_CACHE_LANG) || 'en-us';
  const msg = {
    'zh-cn': {
      success: '复制成功！',
      error: '复制失败，请手动复制！',
    },
    'en-us': {
      success: 'Successful copy!',
      error: 'Copy failed, please copy manually!',
    },
  };
  if (successful && tips) {
    showToast({ message: tips, className: 'util-axios-toast' });
  } else {
    showToast({ message: msg[locale].success, className: 'util-axios-toast' });
  }
  textArea.remove();
}

export function queryURLParams(URL) {
  // const url = location.search; // 项目中可直接通过search方法获取url中"?"符后的字串
  if (URL.split('?').length > 1) {
    const url = URL.split('?')[1];
    const obj = {}; // 声明参数对象
    const arr = url.split('&'); // 以&符号分割为数组
    for (let i = 0; i < arr.length; i++) {
      const arrNew = arr[i].split('='); // 以"="分割为数组
      obj[arrNew[0]] = arrNew[1];
    }
    return obj;
  }
  return {};
}

// 科学计数法转普通数字形式
export const transferToNumber = (inputNumber) => {
  if (isNaN(inputNumber)) {
    return inputNumber;
  }
  inputNumber = '' + inputNumber;
  inputNumber = parseFloat(inputNumber);
  const eformat = inputNumber.toExponential(); // 转换为标准的科学计数法形式（字符串）
  const tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/); // 分离出小数值和指数值
  const number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]));
  return number;
};

/* 对数字之后的0进行去除 */
export const handleZero = (number) => {
  const numberStr = String(number);
  if (String(numberStr).includes('.')) {
    for (let i = numberStr.length - 1; i >= 0; i--) {
      if (numberStr[i] === '.') {
        return numberStr.substring(0, i);
      }
      if (numberStr[i] !== '0') {
        return numberStr.substring(0, i + 1);
      }
    }
    return numberStr;
  } else {
    // 无小数部分
    return numberStr;
  }
};
/* 对大数字进行单位换算 */
export const _transformNumber = (v: string) => {
  if (isNaN(parseFloat(v))) {
    return v;
  }
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;
  const temp = parseFloat(v);
  if (temp > billion) {
    const num = Math.floor((temp / billion) * Math.pow(10, 2)) / Math.pow(10, 2);
    return handleZero(num) + 'B';
  }
  if (temp > million) {
    const num = Math.floor((temp / million) * Math.pow(10, 2)) / Math.pow(10, 2);
    return handleZero(num) + 'M';
  }
  if (temp > thousand) {
    const num = Math.floor((temp / thousand) * Math.pow(10, 2)) / Math.pow(10, 2);
    return handleZero(num) + 'K';
  }
  return handleZero(Math.floor(temp * Math.pow(10, 2)) / Math.pow(10, 2));
};

// 获取日期初始状态 返回当前时间前N天
export function getStartDate(num = 7) {
  return new Date(new Date(new Date().getTime() - 3600 * 1000 * 24 * (num - 1)));
}
// 处理日期选择器开始时间
export const getStartTime = (t: Date) => {
  return new Date(t.setHours(0, 0, 0, 0) + 3600 * 1000 * (new Date().getTimezoneOffset() / -60));
};
// 处理日期选择器结束时间
export const getEndTime = (t: Date) => {
  return new Date(t.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1 + 3600 * 1000 * (new Date().getTimezoneOffset() / -60));
};

/**
 * 无感知修改/新增路径参数
 * @param obj 需要传递的参数对象
 */
export const addAddressBarParameters = (obj: Record<string, string>) => {
  const urlObj = window.location;
  const queryObj = queryURLParams(urlObj.href);
  const objKeysArray = Object.keys(obj);
  let queryStr = '';
  objKeysArray.forEach((item) => {
    if (queryObj[item]) {
      queryObj[item] = obj[item];
      Reflect.deleteProperty(obj, item);
    }
  });
  if (Object.keys(obj).length) {
    for (const key in obj) {
      queryObj[key] = obj[key];
    }
  }
  for (const key in queryObj) {
    queryStr += `${key}=${queryObj[key]}&`;
  }
  queryStr = queryStr.substring(0, queryStr.length - 1);
  const newUrl = urlObj.origin + urlObj.pathname + '?' + queryStr;
  window.history.replaceState(window.history.state, '', newUrl);
};

/**
 * 千分位分隔符
 * 除法+求模 方法 （性能最优）
 * @param number
 * @example format_separator(1234567893.99);
 * @__NO_SIDE_EFFECTS__
 */
export function format_separator(number: string | number, precision = 2) {
  let n = Number(number);
  let r = '';
  let temp: number;
  do {
    // 求模的值， 用于获取高三位，这里可能有小数
    const mod = n % 1000;
    // 值是不是大于1，是继续的条件
    n = n / 1000;
    // 高三位
    temp = ~~mod;
    // 1.填充: n > 1 循环未结束， 就要填充为比如 1 => 001
    // 不然temp = ~~mod的时候, 1 001， 就会变成 "11"
    // 2.拼接“,”
    r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '');
  } while (n >= 1);
  const strNumber = fixD(number, precision);
  const index = strNumber.indexOf('.');
  // 拼接小数部分
  if (index >= 0) {
    r += strNumber.substring(index);
  }
  return r;
}

// 根据小数点返回精度
export const calcAccuracy = (v: string) => {
  return v.indexOf('.') > -1 ? v.length - v.indexOf('.') - 1 : 0;
};

/**
 * @description style中数值转rem
 * @param 数值
 * @example  :style="{width: px2rem('23px')}"
 */
export function px2rem(px: string): string {
  if (/%/gi.test(px) || /vw/gi.test(px)) {
    return px;
  } else {
    return parseFloat(px) * (100 / 750) + 'vw';
  }
}

/**
 * @description 内嵌/自用通用跳转  具体定义参考 https://bo326r679x.larksuite.com/docx/Q9cVdaP6joJBhrx8CHruPycXsyh
 */
export const mixedJump = (pathName: string, params?: any) => {
  const appStore = useAppStore();
  console.log(appStore.embedded ? '内嵌' : 'h5' + `跳转${mixedJumpType[pathName]}`);
  if (appStore.embedded) {
    const data = Object.assign({ name: pathName, ...params }, pathName === 'deposit' ? { currency: 'USDT' } : null);
    useBridge.callMethod('jumpNativePage', JSON.stringify(data), () => {
      console.log('跳转' + data.name);
    });
  } else {
    if (params?.redirect && pathName === 'login') {
      navigateToLocale({ path: mixedJumpType[pathName], query: { redirect: params.redirect } });
      return;
    }
    // 自用参数params暂未处理
    navigateToLocale(mixedJumpType[pathName]);
  }
};

enum mixedJumpType {
  futures = '/contract-trade',
  spot = '/spot-trade',
  'futures-k-line' = '/contract-trade',
  'spot-k-line' = '/spot-trade',
  login = '/login',
  register = '/register',
  deposit = '/assets/recharge',
  card = '/assets/voucher-package',
  home = '/',
}

/**
 * @function countdownFn 倒计时转换天时分秒函数
 * @param unixVal iso时间
 * @param countdownTime 定时器返回值
 * @returns 返回 天 时 分 秒
 * @example 具体使用可以搜索相关组件，或直接开干
 */
export function countdownFn(unixVal, countdownTime) {
  const timePanel = {
    day: '0',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };
  try {
    if ((unixVal < 0 || !isNumber(unixVal)) && countdownTime.value) {
      clearTimeout(countdownTime.value);
      return timePanel;
    }

    const diffTime = dayjs.duration(unixVal);
    timePanel.day = diffTime.days().toString(); //天
    timePanel.hours = diffTime.hours().toString().padStart(2, '0'); //小时
    timePanel.minutes = diffTime.minutes().toString().padStart(2, '0'); //分钟
    timePanel.seconds = diffTime.seconds().toString().padStart(2, '0'); //秒
  } catch (error) {
    console.log(error);
    countdownTime.value && clearTimeout(countdownTime.value);
  }
  return timePanel;
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value) || typeof value === 'string' || value instanceof Set || value instanceof Map) {
    return (value as any).length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

export const format_separator_p = (value: string | number, precision = 2) => {
  value = value.toString();
  let symbol = '';
  if (value.includes('-')) {
    symbol = '-';
    value = value.slice(1);
  }
  return symbol + format_separator(value, precision).replace('-', '');
};

export const isIOS = () => {
  return /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent);
};

export const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
};

// 大数字转化单位精度处理
export const bigNumberDecimal = (v: string, p: number) => {
  if (isNaN(parseFloat(v))) {
    return '--';
  }
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;
  const temp = parseFloat(v);
  if (temp > billion) {
    const num = Math.floor((temp / billion) * Math.pow(10, 2)) / Math.pow(10, 2);
    return format_separator(num, p) + 'B';
  }
  if (temp > million) {
    const num = Math.floor((temp / million) * Math.pow(10, 2)) / Math.pow(10, 2);
    return format_separator(num, p) + 'M';
  }
  if (temp > thousand) {
    const num = Math.floor((temp / thousand) * Math.pow(10, 2)) / Math.pow(10, 2);
    return format_separator(num, p) + 'K';
  }
  return format_separator(v, p);
};

// 计价币列数值精度处理
export const closeDecimal = (v: string, p: number) => {
  if (isNaN(parseFloat(v))) {
    return '--';
  } else {
    return format_separator(v, p);
  }
};

export const legalDecimal = (v: string, p: number) => {
  let symbol = '';
  const isMinus = v.includes('-');
  if (isMinus) {
    symbol = v[1];
  } else {
    symbol = v[0];
  }
  const value = v.replace(symbol, '');
  if (isNaN(parseFloat(value))) {
    return '--';
  } else {
    return (isMinus ? '-' : '') + symbol + format_separator(Math.abs(Number(value)), p);
  }
};

// 涨跌幅列精度处理
export const rangeDecimal = (v: string, p: number) => {
  if (isNaN(parseFloat(v))) {
    return '--';
  } else {
    const value = format_separator(v, p).replace('-', '');
    let symbol = '';

    if (parseFloat(v) > 0) {
      symbol = '+';
    }
    if (parseFloat(v) < 0) {
      symbol = '-';
    }
    // const num = Math.floor(parseFloat(v) * Math.pow(10, p)) / Math.pow(10, p);
    return symbol + value + '%';
  }
};

export function openTargetWindow(href: string) {
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', href);
  a.setAttribute('rel', 'opener');
  const event = new MouseEvent('click');
  a.dispatchEvent(event);
}
