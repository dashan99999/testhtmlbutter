import { toNumber, Op, divDec, handlePrecision, fillZero } from './maths';

type DoubtfulSymbol = string | undefined | null;

/**
 * @description 判断两个String是否相等，如果其中一个不是string都为不相等，必须同时为STRING且toLocaleLowerCase之后相等
 * @param symbol1
 * @param symbol2
 * @returns {boolean}
 */
export function equalString(symbol1: DoubtfulSymbol, symbol2: DoubtfulSymbol) {
  if (typeof symbol1 !== 'string' || typeof symbol2 !== 'string') {
    return false;
  }
  return symbol1.toLocaleLowerCase() === symbol2.toLocaleLowerCase();
}

/**
 * @description 转小写
 * @param str
 */
export function toLowerString(str: string) {
  if (typeof str !== 'string') {
    const msg = `${str} not string`;
    if (import.meta.env.DEV) {
      throw new Error(msg);
    } else {
      console.warn(msg);
      return '';
    }
  }
  return str.toLocaleLowerCase();
}

/**
 * @description 转大写
 * @param str
 */
export function toUpString(str: string) {
  if (typeof str !== 'string') {
    const msg = `${str} not string`;
    if (import.meta.env.DEV) {
      throw new Error(msg);
    } else {
      console.warn(msg);
      return '';
    }
  }
  return str.toLocaleUpperCase();
}

/**
 * @description 判断值是否为0，null、undefined、''、NaN都为0
 * @param val
 * @returns
 */
export function isZero(val: string | number | null | undefined) {
  const _val = Number(val);
  if (isNaN(_val)) {
    return true;
  }
  return _val === 0;
}

/**
 * @description 根据随机数和时间戳生成一id
 * @returns
 */
export function createUniqId() {
  return (
    (Math.ceil(Math.random() * 100000000) + 100000000 + new Date().getTime()).toString(32).toUpperCase().substring(3) +
    '-' +
    (Math.ceil(Math.random() * 100000000) + 100000000).toString(32).toUpperCase() +
    '-' +
    (Math.ceil(Math.random() * 100000000) + 100000000).toString(32).toUpperCase() +
    '-' +
    (Math.ceil(Math.random() * 100000000) + 100000000).toString(32).toUpperCase()
  );
}

export function convertToString(val: string | number | undefined | null) {
  if (val === undefined || val === null) {
    return '';
  }
  return String(val);
}

/**
 * @description 部分方法兼容产生无用参数，编译无法通过，用这个空方法回避报错
 * @param _args any[]
 */
export function funcUseLessParam(..._args: any[]) {}

/**
 * @description 按照数据下标逐个替换
 * @param str
 * @param values
 * @param template 替换的关键字
 * @returns {String}
 */
export function replaceText(str: string, values: (string | number | undefined | null)[], template = '%c') {
  if (typeof str !== 'string') {
    console.warn('not string');
    return '';
  }
  let idx = 0;
  while (str.indexOf(template) !== -1) {
    let value = values[idx];
    if (typeof value !== 'string' && typeof value !== 'number') {
      value = '';
    }
    str = str.replace('%c', String(value));
    idx++;
  }
  return str;
}

/*
 * @description 判断值是否为空， null、undefined、''都为空
 * @param value {any}
 * @returns {Boolean}
 */
export function isEmpty(value: any) {
  return value === null || value === undefined || value === '';
}

/**
 * @description 模糊匹配
 * @param strR
 * @param keyY
 * @author Chen Peng
 * @returns
 */
export function fuzzyMatch(strR: string, keyY: string): boolean {
  try {
    let index = -1;
    let flag = false;
    // 不区分大小写查询
    const str = strR.toLocaleUpperCase();
    const key = keyY.toLocaleUpperCase();
    for (let i = 0, arr = key.split(''); i < arr.length; i++) {
      // 有一个关键字都没匹配到，则没有匹配到数据
      if (str.indexOf(arr[i]) < 0) {
        break;
      } else {
        const e = new RegExp(arr[i], 'g');
        const match = str.matchAll(e);
        // const match = str.matchAll(arr[i] as string);
        let next = match.next();
        while (!next.done) {
          if ((next.value.index as number) > index) {
            index = next.value.index as number;
            if (i === arr.length - 1) {
              flag = true;
            }
            break;
          }
          next = match.next();
        }
      }
    }
    return flag;
  } catch (error) {
    console.log('error-', error);
    return false;
  }
}

/**
 * 将币对归类
 * @param { Array } symbolList 目标数组----所有币对
 * @param { Boolean } open 是否需要全部币对(isShow判断) true 是  false 否
 * @return { Array }
 */
export const symbolTurnsMap = (symbolList, open) => {
  const list = symbolList.reduce((obj, item) => {
    if (item.tradeArea && item.tradeArea.indexOf(',') > -1) {
      item.tradeArea.split(',').forEach((child) => {
        if (!obj[child]) {
          obj[child] = [];
        }
        if (open || item.isShow === 1) {
          obj[child].push(item);
        }
      });
    } else {
      if (!obj[item.tradeArea] && (item.isShow === 1 || open) && item.tradeArea) {
        obj[item.tradeArea] = [];
      }
      if (open || item.isShow === 1) {
        obj[item.tradeArea].push(item);
      }
    }

    return obj;
  }, {});
  return list;
};

/**
 * @description 数组对象排序  默认升序
 * @function 数组对象排序
 * @param prop 按哪个属性排序
 */
// use  arr.sort(compare("age")) 默认从小到大 升序
export const compare = (prop, begin = -1, end = 1, NaN = -Infinity) => {
  return function (obj1, obj2) {
    let val1 = toNumber(obj1[prop], NaN);
    let val2 = toNumber(obj2[prop], NaN);
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return begin;
    } else if (val1 > val2) {
      return end;
    } else {
      return 0;
    }
  };
};

/**
 * @description 数组对象排序  默认升序
 * @function 数组对象排序
 * @param prop 按哪个属性排序
 */
// use  arr.sort(attributeSorting("age")) 默认从小到大 升序
export const attributeSorting = (prop, direction?: 'ascend' | 'descend', NaN = -Infinity) => {
  direction = direction || 'ascend';
  const begin = direction === 'ascend' ? -1 : 1;
  const end = direction === 'ascend' ? 1 : -1;
  return function (obj1, obj2) {
    if (!prop) {
      return 0;
    }
    let val1 = toNumber(obj1[prop], NaN);
    let val2 = toNumber(obj2[prop], NaN);
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return begin;
    } else if (val1 > val2) {
      return end;
    } else {
      return 0;
    }
  };
};

/**
 * @description 排序，当值为非数字或者Number(val)为NaN 时当成无限小
 * @param arr
 * @param by
 * @param orderType
 */
export function sort(arr: any, by: string, orderType: 'ascend' | 'descend', NaN = -Infinity) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      const pre = toNumber(arr[i][by], NaN);
      const current = toNumber(arr[j][by], NaN);
      if (orderType === 'ascend') {
        if (pre < current) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      } else {
        if (pre > current) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
}

/**
 * @description 将数字转为更易读数字，添加上单位
 * @param val 必须为数字或者字符型数字
 * @param fix 处理精度 默认为2
 * @returns
 */
export function easyNumber(val: string | number, fix = 2) {
  const result = {
    value: val,
    unit: '',
    full: val,
  };
  Object.defineProperty(result, 'full', {
    get() {
      return this.value + this.unit;
    },
  });
  let _val = divDec(val, '10000000000');
  if (Op.gte(_val, '1')) {
    result.value = fillZero(handlePrecision(_val, fix), fix);
    result.unit = 'B';
    return result;
  }
  _val = divDec(val, '1000000');
  if (Op.gte(_val, '1')) {
    result.value = fillZero(handlePrecision(_val, fix), fix);
    result.unit = 'M';
    return result;
  }
  _val = divDec(val, '1000');
  if (Op.gte(_val, '1')) {
    result.value = fillZero(handlePrecision(_val, fix), fix);
    result.unit = 'K';
    return result;
  }
  return result;
}

/**
 * @description 将币对按指定规则进行排序  未开放就不管推荐了
 * @example array.sort(coinPairCompare)
 */
// 是否开放,是否推荐,sort,base名称,quote名称
export function coinPairCompare(a, b) {
  if (a.isOpen === 0 && b.isOpen === 0) {
    if (a.sort !== b.sort) {
      return a.sort - b.sort;
    } else if (a.base.toUpperCase() !== b.base.toUpperCase()) {
      return a.base.localeCompare(b.base, 'zh-Hans-CN', { sensitivity: 'variant' }); // variant
    } else {
      a.quote.localeCompare(b.quote, 'zh-Hans-CN', { sensitivity: 'variant' });
    }
  }
  if (a.isOpen !== b.isOpen) {
    return b.isOpen - a.isOpen;
  } else if (a.isRecommend !== b.isRecommend) {
    return b.isRecommend - a.isRecommend;
  } else if (a.sort !== b.sort) {
    return a.sort - b.sort;
  } else if (a.base.toUpperCase() !== b.base.toUpperCase()) {
    return a.base.localeCompare(b.base, 'zh-Hans-CN', { sensitivity: 'variant' }); // variant
  } else {
    a.quote.localeCompare(b.quote, 'zh-Hans-CN', { sensitivity: 'variant' });
  }
}

export const clipboard = {
  copy: (value: string) => {
    const input = document.createElement('input');
    // 将input的值设置为需要复制的内容
    input.value = value;
    // 添加input标签
    document.body.appendChild(input);
    // 选中input标签
    input.select();
    // 执行复制
    document.execCommand('copy');
    // 成功提示信息
    // 移除input标签
    document.body.removeChild(input);
    return Promise.resolve(true);
    // Message.success(t('account.apiManagement.viewKey.copy'));
  },
};

export function setRootFontSize() {
  console.log('页面视口改变==>');

  if (window.innerWidth <= 768) {
    document.documentElement.style.fontSize = '16px'; // Mobile root font size
  } else {
    document.documentElement.style.fontSize = '16px'; // PC root font size
  }
}

export function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // List of mobile user agents
  const mobileAgents = [/android/i, /iPad|iPhone|iPod/i, /windows phone/i, /blackberry/i, /webOS/i, /Opera Mini/i, /IEMobile/i];

  // Check if the user agent matches any of the mobile user agents
  return mobileAgents.some((mobileAgent) => mobileAgent.test(userAgent));
}
