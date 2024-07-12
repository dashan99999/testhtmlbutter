import _Rise from './rise.vue';
import _Precision from './precision.vue';
import _DefaultDisplay from './default-display.vue';
import Input from './input.vue';
import { divDec } from '@bitunix/shared/utils/maths';
import perfectPrecision from './perfectPrecision.vue';
export const Rise = _Rise;
/**
 * @description 精度显示
 */
export const Precision = _Precision;
export const DefaultDisplay = _DefaultDisplay;
export const InputNumber = Input;
export const PerfectPrecision = perfectPrecision;
/**
 * @description 当val为null、undefined时原样返回，其余返回string
 * @param val
 * @returns
 */
export function fixNum<T extends string | number | undefined>(val: T): any {
  if (val === undefined || val === null) {
    return val;
  }
  const _val = String(val);
  if (_val.length === 1 && (_val === '+' || _val === '-' || _val === '.')) {
    return '0';
  }
  if (/^\d+\.&/.test(_val)) {
    return _val + '0';
  }
  return _val;
}

/**
 * @description 任何值转成数
 * @param val
 * @returns {number}
 */
export function parseStringToNumber(val: string | number | null | undefined) {
  if (typeof val === 'number') {
    return val;
  }
  if (val === null || val === undefined) {
    return 0;
  }
  let _val = val.trim();
  if (_val === '' || _val === '+' || _val === '-') {
    return 0;
  }
  if (/^\d+\.&/.test(_val)) {
    _val = _val + '0';
  }
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}

/**
 * @description 自动补充小数位数不足的0，不处理精度，超出直接截取
 * @param value 值
 * @param len 保留小数位数，自动填充0
 * @returns String
 */
export function replenishZero(value: string | number, len: number | string) {
  const _len = Number(len);
  let valueStr = String(value);
  const suffix = new Array(_len).fill('0').join('');
  if (isNaN(Number(value))) {
    valueStr = '0' + '.' + suffix;
  }
  if (valueStr.indexOf('.') === -1) {
    valueStr = valueStr + '.' + suffix;
  }
  const split = valueStr.split('.');
  if (_len === 0) {
    return split[0];
  }
  return split[0] + '.' + (split[1] + suffix).substring(0, _len);
}

/**
 * @description 判断是否为数字
 * @param val 任意值
 * @returns {Boolean}
 */
export function isNumber(val: any): boolean {
  try {
    divDec(val, '1');
    return true;
  } catch {
    return false;
  }
}
