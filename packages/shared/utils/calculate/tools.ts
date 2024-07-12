import { IFormulaItem, IValue, IValueNumber, TAllTypes, ISpecial } from './types';
/**
 * @description func 返回true终止循环
 * @param func
 * @param max 1000
 */
export const safeWhile = (func: (idx: number) => boolean | undefined, max = 1000) => {
  let idx = 0;
  while (true) {
    const manualBreak = func(idx);
    if (idx++ === max || manualBreak) {
      break;
    }
  }
};
export function isValueNumber(val: IFormulaItem) {
  const _val = val as IValueNumber;
  if (_val.type === 'value' && _val.dataType === 'number') {
    return true;
  }
  return false;
}
export function isAllValueNumber(vals: IFormulaItem[]) {
  for (const item of vals) {
    if (!isValueNumber(item)) {
      return false;
    }
  }
  return true;
}
export function isValue(val: IValue) {
  return val.type === 'value';
}
export function isAllValue(vals: IFormulaItem[]) {
  for (const item of vals) {
    if (!isValue(item as IValue)) {
      return false;
    }
  }
  return true;
}
export function isValueString(val: IValue) {
  return val.value === 'value' && val.dataType === 'string';
}

export function isAllValueString(vals: IValue[]) {
  for (const item of vals) {
    if (!isValueString(item)) return false;
  }
  return true;
}
/**
 * @description 实时打印数据,并返回数据
 * @param values
 */
// @ts-ignore
export function logLiveValue(...values: any) {
  const result: any[] = [];
  for (const item of values) {
    if (typeof item === 'object') {
      result.push(JSON.parse(JSON.stringify(item)));
    } else {
      result.push(item);
    }
  }
  console.log(...result);
  return result;
}
function parseStringToNumber(val: string | number | null | undefined) {
  if (typeof val === 'number') {
    return val;
  }
  if (val === null || val === undefined) {
    return 0;
  }
  if (typeof val !== 'string') {
    console.log(val, typeof val);
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

export function formatCalcStr(str: string, valueObj: { [key: string]: any }) {
  for (const key in valueObj) {
    str = str.replace(new RegExp(`{${key}}`, 'g'), parseStringToNumber(valueObj[key]).toString());
  }
  return str;
}

export function countFunctionParam(arr: TAllTypes[], funcIdx: number) {
  let count = 0;
  while (funcIdx !== -1) {
    funcIdx -= 1;
    const current = arr[funcIdx] as ISpecial;
    if (current.type !== 'special' || current.value !== ',') {
      break;
    }
    count++;
  }
  return count + 1;
}

export function getFunctionParam(arr: TAllTypes[], funcIdx: number, update?: (param, func) => any) {
  const count = countFunctionParam(arr, funcIdx);
  const start = funcIdx - (count * 2 - 1);
  const totalParam = count * 2 - 1;
  const values = arr.splice(start, totalParam + 1);
  const params = values.splice(0, count);
  const newIdx = start;
  const func = values.pop();
  if (update) {
    const result = update(params, func);
    arr.splice(newIdx, 0, result);
  }
  return {
    params,
    func: func,
    idx: newIdx,
  };
}

/**
 * @description 判断数据类型
 * @param value
 * @returns
 */
export function getValueType(value: IValue): 'string' | 'number' | 'boolean' | 'other' {
  if (value.type === 'value') {
    return value.dataType;
  }
  return 'other';
}

export function isOccupyValue(value: IValue) {
  // @ts-ignore
  return value && value.formType === 'occupy';
}
