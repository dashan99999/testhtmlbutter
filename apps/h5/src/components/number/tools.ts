import { handlePrecision } from '@bitunix/shared/utils/maths';
/**
 * @deprecated 废弃，新的实现在 import { toThousands } from '@bitunix/shared/utils/maths';
 * @param num
 * @returns
 */
export const toThousands = (num: string) => {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  });
};
/**
 * @deprecated 废弃，新的实现在 import { fillZero } from '@bitunix/shared/utils/maths';
 * @param val
 * @param len
 * @param side
 * @returns
 */
export const fillNumber = (val: number | string, len: number, side?: 1 | -1): string => {
  const numVal = Number(val);
  if (isNaN(numVal)) return '0';
  const str = val.toString();
  if (str.indexOf('.') > -1) {
    const numArr = str.split('.');
    if (numArr[1].length > len) {
      const tempNum = numVal * Math.pow(10, len);
      if (!side) {
        return handlePrecision(val, len);
      } else if (side === 1) {
        if (tempNum < 1) return (1 / Math.pow(10, len)).toString();
        return (Math.ceil(tempNum) / Math.pow(10, len)).toFixed(len);
      } else if (side === -1) {
        return (Math.floor(tempNum) / Math.pow(10, len)).toFixed(len);
      } else {
        return handlePrecision(val, len);
      }
    } else {
      return Number(str).toFixed(len);
    }
  } else {
    return Number(val).toFixed(len);
  }
};
export function inputValToNumber(num: string) {
  if (num === null || num === undefined || num === '' || num === '+' || num === '-') return 0;
  if (/^\d+\.$/g.test(num)) {
    return Number(num.replace('.', ''));
  }
  return isNaN(Number(num)) ? 0 : Number(num);
}
function fixPrefixZero(x: any) {
  if (x === '0' || x === 0) {
    return '0';
  }
  x = (x + '').replace(/^0+\./g, '0.');
  x.match(/^0+[1-9]+/) ? (x = x.replace(/^0+/g, '')) : x;
  return x;
}
export function fixInputValue(val: string | number, precision: number | string, max = Infinity, min = -Infinity) {
  const _val = String(val);
  const dotIdx = _val.indexOf('.');
  const start = _val.substring(0, dotIdx);
  let result = '0';
  if (precision === 0) {
    result = _val.substring(0, dotIdx === -1 ? _val.length : dotIdx);
  } else {
    if (dotIdx === -1) {
      result = _val;
    } else {
      const end = _val.substring(dotIdx + 1);
      if (end !== '') {
        result = _val.substring(0, dotIdx) + '.' + _val.substring(dotIdx + 1, dotIdx + 1 + Number(precision));
      } else {
        result = start + '.';
      }
    }
  }
  const realNum = inputValToNumber(_val);
  if (realNum > max) {
    return String(max);
  }
  if (realNum < min) {
    return String(min);
  }
  result = result.replace(/^\b(0+)$/g, '') || '0';
  return fixPrefixZero(result);
}
