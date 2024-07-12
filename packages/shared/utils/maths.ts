import { Decimal } from 'decimal.js';

/**
 * @description 项目中数的类型
 */
type BitNumber = number | string;
/* 模糊匹配
str = 目标字符串
key = 搜索值
*/
export const fuzzyMatch = (strr: string, keyy: string) => {
  try {
    let index = -1;
    let flag = false;
    // 不区分大小写查询
    const str = strr.toLocaleUpperCase();
    const key = keyy.toLocaleUpperCase();
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
};

/**
 * @function 汇率转换方法
 * @description 通过传入对应的price得到系统中对应汇率法币的值,由于该方法需要兼容系统中以前的调用逻辑，所以在调用时视具体场景的调用情况入参。
 * 新旧代码以及前后端在对汇率转换逻辑这块统一之后，会对该方法的入参以及调用形式做调整和精简
 * @param  { Number } price 需要转换的数值
 * @param  { Object } exrate 包含所有币种的汇率的汇率对象
 * @param  { String } coinSymbol 当前的币种，例如需要将BTC转换为对应的法币，这里就传入'BTC'
 * @param  { Boolean } isNew=true  这个参数为兼容系统中以前代码存量中汇率转换调用，如果是新调用该方法，也可不传，默认为true，默认为新场景
 * @param  { Boolean } isUsdtPrice=true 对price参数的补充。如果传入的price是以USDT为单位的数值，那么这里就传入true，如果传入的price是以BTC或者ETH等类似货币
 * 为单位的数值，那么这里就需要传入false。
 * @return { String } 转换之后系统中对应法币的数值，其中已经包含了千分位格式化和对应的法币符号 '￥' '$'等
 */
export const fixRate = (
  price: string | number,
  exrate: { symbol: { [x: string]: number }; USDT: { [x: string]: number }; [x: string]: { [x: string]: number | string } },
  coinSymbol: string,
  isNew = true,
  isUsdtPrice = true,
): string => {
  const coinMap = {
    USD: 'USD_$',
    CNY: 'CNY_¥',
  };
  // 当前系统中的法币币种
  // const currentCoin = getCookie('coin') || coinMap.USD;
  const currentCoin = coinMap.USD;
  // 当前系统中的语言
  let langKey = '';
  // 对应的法币
  let coinKey = '';
  if (currentCoin === coinMap.CNY) {
    langKey = 'zh-cn';
    coinKey = 'CNY';
  }
  if (currentCoin === coinMap.USD) {
    langKey = 'en-us';
    coinKey = 'USD';
  }
  if (!langKey || !coinKey) {
    console.error('当前没有改法币币种的转换，请添加');
    return '--';
  }
  if (!exrate) {
    console.error('未正确获取汇率集合，请检查前端存储或者通知后端检查');
    return '--';
  }
  /*
    通过langKey查询老的汇率对象的中的对应的法币单位符号
  */
  const priceLogo = exrate[langKey].lang_logo;
  /*
    通过langKey和coinKey取出对应的待计算的汇率值
  */
  // 计算后的价格
  let resultPrice = 0;
  // 汇率对象
  let larateObj: { [x: string]: number | string } = {};
  // 汇率key
  let larateKey = '';
  if (!isNew) {
    // 老接口汇率转换
    larateObj = exrate[langKey] || exrate.en_US;
    larateKey = coinSymbol;
    resultPrice = Number(larateObj[larateKey]) * Number(price);
  } else {
    if (!isUsdtPrice) {
      // 未转成usdt计价货币值
      const toUsdtRate = exrate.symbol[coinSymbol];
      larateObj = exrate['USDT'];
      larateKey = coinKey;
      resultPrice = Number(larateObj[larateKey]) * toUsdtRate * Number(price);
    } else {
      // 已转成usdt计价货币值
      larateObj = exrate['USDT'];
      larateKey = coinKey;
      resultPrice = Number(larateObj[larateKey]) * Number(price);
    }
  }
  if (`${parseFloat(String(resultPrice))}` === 'NaN') {
    return '--';
  }
  return priceLogo + resultPrice.toLocaleString();
};

// 精度计算
export const fixD = (parameterNum: string | number, precision: string | number) => {
  const num = String(parameterNum);
  // num初始化
  if (`${num}` === '0') {
    if (!window.parseFloat(String(precision))) {
      return '0';
    }
    return '0.'.padEnd(Number(precision) + 2, '0');
  }
  if (!num) {
    return '--';
  }
  let flag = false;
  if (parseFloat(num) < 0) {
    flag = true;
  }

  const newnum = `${Math.abs(parseFloat(num))}`;
  if (newnum === 'NaN') {
    return '--';
  }
  let fixNum = newnum;
  // 科学计数法计算
  if (newnum.toLowerCase().indexOf('e') > -1) {
    if (newnum.toLowerCase().indexOf('+') > -1) {
      return fixDEAdd(newnum, precision);
    }
    const a = newnum.toLowerCase().split('e');
    let b = a[0];
    const c = Math.abs(parseFloat(a[1]));
    let d = '';
    let h = b.length;
    let i: number;
    if (a[0].split('.')[1]) {
      b = a[0].split('.')[0] + a[0].split('.')[1];
      h = a[0].split('.')[0].length;
    }
    for (i = 0; i < c - h; i += 1) {
      d += '0';
    }
    fixNum = `0.${d}${b}`;
  }
  // 精度格式化
  // precision初始化
  if (`${precision}` !== '0' && !precision) {
    return (flag ? '-' : '') + fixNum;
  }
  if (`${parseFloat(num)}` === 'NaN') {
    return (flag ? '-' : '') + fixNum;
  }
  const fNum = fixNum.split('.');
  if (Number(precision) === 0) {
    fixNum = String(parseInt(fixNum, 10));
  } else if (Number(precision) > 0 && fNum[1]) {
    if (fNum[1].length > Number(precision)) {
      if (fNum[1].indexOf('999999999') > -1) {
        const s = parseFloat(fixNum).toFixed(Number(precision) + 1);
        fixNum = s.slice(0, s.length - 1);
      } else {
        fixNum = `${fNum[0]}.${fNum[1].slice(0, Number(precision))}`;
      }
    } else {
      fixNum = parseFloat(fixNum).toFixed(Number(precision));
    }
  } else {
    fixNum = parseFloat(fixNum).toFixed(Number(precision));
  }
  if (fixNum.length >= 14 && fixNum.indexOf('.') > -1) {
    const arry = fixNum.split('.');
    if (arry[0].length > 17) {
      fixNum = `${arry[0].slice(0, 17)}+`;
    } else {
      fixNum = fixNum.slice(0, 16);
      if (fixNum.indexOf('.') === 15) {
        fixNum = fixNum.slice(0, 15);
      }
    }
  }
  return (flag ? '-' : '') + fixNum;
};

// 精度计算E+处理方法
const fixDEAdd = (num: string, precision: string | number, autoFix = true) => {
  if (`${num}` === '0') {
    if (!window.parseFloat(String(precision)) || !autoFix) return '0';
    return '0.'.padEnd(Number(precision) + 2, '0');
  }
  if (!num) return '--';

  const number = parseFloat(num);
  const strN = num.toString();
  const flag = number < 0;
  let result = strN;

  if (strN.toLowerCase().indexOf('e') > -1) {
    const n = strN.match(/(\d+?)(?:\.(\d*))?e([+-])(\d+)/) as RegExpMatchArray;
    const nl = n[1]; // 小数点左边
    const nr = n[2]; // 小数点右边
    const type = n[3]; //  + / -
    const floatN = Number(n[4]); // 科学计数法的位数

    let params = '';
    let pr = nr ? nr.substr(floatN) : '';

    if (pr) pr = `.${pr}`;
    if (type !== '-') {
      for (let i = 0; i < floatN; i += 1) {
        const p = nr[i] || '0';
        params += p;
      }
      result = nl + params + pr;
    } else {
      let strl = '0';
      for (let i = 0; i < floatN; i += 1) {
        const p = nl[nl.length - i - 1] || '0';
        params = p + params;
      }
      if (nl.length > floatN) strl = nl.substr(0, nl.length - floatN);
      result = `${strl}.${params}${nr}`;
    }
  }

  if (precision && autoFix) {
    let pal = `${result.split('.')[0]}.`;
    const par = result.split('.')[1] || '';

    for (let i = 0; i < Number(precision); i += 1) {
      pal += par[i] || '0';
    }
    result = pal;
  }

  if (result.length > 14) {
    const arry = result.split('.');
    if (arry[0].length > 14) {
      result = `${arry[0].slice(0, 14)}+`;
    } else {
      result = result.slice(0, 13);
      if (result.indexOf('.') === 12) {
        result = result.slice(0, 12);
      }
    }
  }

  return `${flag ? '-' : ''}${result}`;
};

// 删除小数点最后面的0
export const lastD = (num: string | number): string => {
  if (!num) return String(num);
  const newNum = `${num}`;
  const str = newNum.split('.')[1];
  if (!str) return newNum;

  function substring(stri: string) {
    const arr = stri.split('');
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (!arr[i]) return newNum.split('.')[0];
      if (arr[i] === '0') {
        arr.splice(i);
      } else {
        break;
      }
    }
    if (!arr.length) return newNum.split('.')[0];
    return `${newNum.split('.')[0]}.${arr.join('')}`;
  }

  return substring(str);
};

// 减法函数，用来得到精确的减法结果
// 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
// 调用：accSubtr(arg1,arg2)
// 返回值：arg1减去arg2的精确结果
export const accSubtr = (arg1: number, arg2: number) => {
  let r1: number;
  let r2: number;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2));
  // 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

// 乘法
export const nul = (arg1, arg2) => {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    // console.log(e);
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    // console.log(e);
  }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m;
};

/**
 *
 * @param val
 * @param fixs
 * @param clearPrefixZero 是否清除数字前面的0
 * @returns
 */
export const fixInput = (val: string, fixs: string | number, clearPrefixZero = false) => {
  if (typeof val === 'string' && val.length > 1 && clearPrefixZero && /\b(0+)/gi.test(val)) {
    val = val.replace(/\b(0+)/gi, '');
  }
  const fix = Number(fixs) || 10;

  let v = `${fixDEAdd(val, fixs, false)}`;
  // 增加 第一位 第二位都是0 置换成0
  if (v.charAt(0) === '0' && v.charAt(1) === '0') {
    v = '0';
  }
  // 操作1
  // 用户行为 直接上来打个.
  // 解决方案 置换成0.
  if (v.charAt(0) === '.') {
    v = '0.';
  }
  // 操作2
  // 用户行为 打多个点.
  // 解决方案 保留第二个点以前的数值
  const strArr = [...v].reduce((res, c) => {
    if (res[c]) {
      res[c] += 1;
    } else {
      res[c] = 1;
    }
    return res;
  }, {});
  if (strArr['.'] === 2) {
    const arr = v.split('.');
    v = `${arr[0]}.${arr[1]}`;
  }
  // 操作3
  // 用户行为 小数点后输入超过该币种精度限制
  // 解决方案 保留该精度之前的数值
  if (v.indexOf('.') !== -1) {
    const integer = v.split('.')[0]; // 整数
    let decimal = String(v.split('.')[1]); // 小数
    if (decimal.length > fix) {
      decimal = decimal.substring(0, fix);
      v = `${integer}.${decimal}`;
    }
  }
  // 操作4
  // 用户行为 转成汉语拼音后可输入汉字字母等字符
  // 解决方案 干掉写入的文字
  const strKey = Object.keys(strArr);
  strKey.forEach((c) => {
    let str = '01234567890.';
    if (fix === 0) {
      str = '01234567890';
    }
    if (str.indexOf(c) === -1) {
      v = v.split(c)[0] + (v.split(c)[1] || '');
    }
  });
  // 操作5
  // 用户行为 输入总长度超过14位 包括.
  // 解决方案 截取前14位
  if (v.length > 13) {
    v = v.substring(0, 13);
  }
  return v;
};

/**
 * 将币对归类
 * @param { Array } symbolList 目标数组----所有币对
 * @param { Boolean } open 是否需要全部币对(isOpen判断) true 是  false 否
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
 * @function 数组对象排序
 * @param prop 按哪个属性排序
 */
// use  arr.sort(compare("age")) 默认从小到大 升序
export const compare = (prop, begin = -1, end = 1) => {
  return function (obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
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

// Decimal专区
type NumVal = string | number;
/**
 * @description 加
 */
export const addDec = (a: NumVal = 0, b: NumVal = 0): string => {
  return new Decimal(a).add(new Decimal(b)).toString();
};
/**
 * @description 减
 */
export const subDec = (a: NumVal = 0, b: NumVal = 0): string => {
  return new Decimal(a).sub(new Decimal(b)).toString();
};
/**
 * @description 乘
 */
export const mulDec = (a: NumVal = 0, b: NumVal = 0): string => {
  return new Decimal(a).mul(new Decimal(b)).toString();
};

/**
 * @description 除
 */
export function divDec(a: NumVal = 0, b: NumVal = 0): string {
  return new Decimal(a).div(new Decimal(b)).toString();
}

/**
 * @description 相反数
 */
export const opposite = (a: NumVal): string => {
  return mulDec(a, '-1');
};

/**
 *  @description 值的比较
 */
export const Op = {
  /**
   * @description val1 === val2
   */
  eq: (val1: NumVal, val2: NumVal) => {
    return subDec(val1, val2) === '0';
  },
  /**
   * @description val1 !== val2
   */
  ne: (val1: NumVal, val2: NumVal) => {
    return subDec(val1, val2) !== '0';
  },
  /**
   * @description val1 > val2
   */
  gt: (val1: NumVal, val2: NumVal) => {
    return new Decimal(val1).gt(val2);
  },
  /**
   * @description val1 >= val2
   */
  gte: (val1: NumVal, val2: NumVal) => {
    return new Decimal(val1).gte(val2);
  },
  /**
   * @description val1 < val2
   */
  lt: (val1: NumVal, val2: NumVal) => {
    return new Decimal(val1).lt(val2);
  },
  /**
   * @description val1 <= val2
   */
  lte: (val1: NumVal, val2: NumVal) => {
    return new Decimal(val1).lte(val2);
  },
};

/**
 * @description 最大值
 */
export const max = (...vals: NumVal[]) => {
  return Decimal.max(...vals).toString();
};
/**
 * @description 最小值
 */
export const min = (...vals: NumVal[]) => {
  return Decimal.min(...vals).toString();
};

export const pow = (val1: NumVal, val2: NumVal) => {
  return Decimal.pow(val1, val2).toString();
};
export const negated = (val: NumVal) => {
  return new Decimal(val).negated().toString();
};

export const sqrt = (val: NumVal) => {
  return new Decimal(val).sqrt().toString();
};

/**
 * @description 校验是否为 undefined null  ''
 */
export const digitalAddVerification = (val: any) => {
  switch (val) {
    case '':
    case null:
    case false:
    case undefined:
    case Infinity:
    case '--':
      return true;
    default:
      return false;
  }
};

/**
 * @description to Number
 * @param val 任意被转换值
 * @param handNaN 需要转换的数值
 * @returns Number
 */
export function toNumber(val: any, handNaN = -Infinity) {
  if (typeof val === 'number') {
    return val;
  } else {
    const num = Number(val);
    return isNaN(num) ? handNaN : num;
  }
}
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
 * @description 精度处理类型
 * @example
 * floor 向下取整 如 1.1236 精度取3位 则=>1.123
 * ceil 向上取整 如 1.1231 精度取3位 则=>1.124
 * round 四舍五入 如 1.1231 精度取3位 则=>1.123，1.1235 精度取3位 则=>1.124
 */
export type PrecisionType = 'floor' | 'ceil' | 'round';

/**
 * @description 精度处理,采用科学计数也可以处理,只保留有效位数（如：12.00 => 12)
 * @param num 必须为数字或者字符数字，其余抛出异常
 * @param len 精度长度度，即小数点保留位数
 * @param type PrecisionType
 * @returns {String}
 * @author Zeng Wei
 */
export function handlePrecision(num: BitNumber, len: BitNumber, type: PrecisionType = 'floor') {
  divDec(num, 1);
  const _len = Number(len);
  if (isNaN(_len)) {
    throw new Error('精度必须为数字或字符类数字！');
  }
  const toString = (val: string) => {
    const _val = new Decimal(val).toFixed(_len);
    const dotIdx = _val.indexOf('.');
    if (dotIdx === -1) {
      return _val;
    } else {
      const temp = _val.replace(/(0*$)/g, '');
      if (temp[temp.length - 1] === '.') {
        return temp.replace('.', '');
      }
      return temp;
    }
  };
  const valDec = new Decimal(num);
  const value = (() => {
    const _val = valDec.toFixed(20);
    const dotIdx = _val.indexOf('.');
    if (_len === 0) {
      return _val.substring(0, dotIdx);
    } else {
      return _val.substring(0, dotIdx + _len + 1);
    }
  })();
  const minVal = Math.pow(10, -_len);
  if (type === 'floor') {
    return toString(value);
  }
  if (type === 'ceil') {
    if (Op.gt(num, value)) {
      return toString(addDec(value, minVal));
    } else {
      return toString(value);
    }
  }
  const lastNum = (() => {
    const value = valDec.toFixed(_len + 1);
    return Number(value[value.length - 1]);
  })();
  if (lastNum >= 5) {
    return toString(addDec(value, minVal));
  } else {
    return toString(value);
  }
}

/**
 * @description 判断是否为数字(包含科学表示法的数字)
 * @param val 任意值
 * @returns {Boolean}
 */
export function isNumber(val: any): boolean {
  try {
    if (val === undefined) throw new Error();
    divDec(val, '1');
    return true;
  } catch {
    return false;
  }
}

/**
 * @description 将数字三位一个，
 * @example
 * ```typescript
 * toThousands(1232132); // 1,232,132
 * ```
 * @param num {string|number}
 * @returns
 */
export function toThousands(num: BitNumber) {
  if (!isNumber(num)) {
    console.error(`toThousands param num error, expect >= 0, but get ${num}`);
    num = '0';
  }
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  });
}

/**
 * @description 去除数字中的，
 * @param val
 * @returns
 */
export function transformThousandsToNumber(val: string) {
  const afterValue = (typeof val === 'string' || typeof val === 'number' ? val : '').replace(/\,+/g, '');
  return afterValue;
}

/**
 * @description 不足长度数字补充0,大于补充长度时截取掉多余
 * @param num
 * @param len
 */
export function fillZero(num: BitNumber, len: BitNumber) {
  let _len = Number(len);
  let _num = String(num);
  if (isNaN(_len) || _len < 0) {
    console.error(`fillZero param len error, expect >= 0, but get ${len}`);
    _len = 0;
  }
  if (!isNumber(_num)) {
    console.error(`fillZero param num error, expect >= 0, but get ${num}`);
    _num = '0';
  }
  const values = String(num).split('.');
  const firstNum = values[0] || '0';
  const secondeNum = (values[1] || '0') + new Array(len).fill('0').join('');
  if (_len === 0) {
    return firstNum;
  }
  return firstNum + '.' + secondeNum.substring(0, _len);
}
