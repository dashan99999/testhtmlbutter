import { FormulaError } from './FormulaError';
import {
  TAllTypes,
  IBrackets,
  IOperate,
  ISpecial,
  IPlusMinus,
  BASE_OPERATE,
  OperateSymbol,
  IValueNumber,
  IFunction,
  SYSTEM_KEYWORD,
  IOccupyNumberValue,
  IKeyword,
} from './types';
type ErrorInfo = null | FormulaError;
type ParseFunctionResult = [ErrorInfo, TAllTypes, number];
type ParseFunction = (str: string, startIdx: number, pastParse: TAllTypes[]) => ParseFunctionResult;
const paseOperate: ParseFunction = (str: string, start: number, result: TAllTypes[]) => {
  const pastParse = result[result.length - 1] as IBrackets | IOperate | ISpecial;
  if (
    start === 0 ||
    ((str[start] === '+' || str[start] === '-') && result.length > 0 && pastParse.type === 'brackets' && pastParse.value === 'left') ||
    pastParse.type === 'operate' ||
    pastParse.type === 'special'
  ) {
    const val: IPlusMinus = {
      type: 'plusMinus',
      value: str[start] === '+' ? 'plus' : 'minus',
    };
    return [null, val, start];
  }

  if (
    start < str.length - 1 &&
    ['>', '<', '*'].indexOf(str[start]) !== -1 &&
    (BASE_OPERATE.indexOf(str[start + 1] as OperateSymbol) !== -1 || str[start + 1] === '=') &&
    ['+', '-'].indexOf(str[start + 1]) === -1
  ) {
    const val: IOperate = {
      type: 'operate',
      value: str.substring(start, start + 2) as OperateSymbol,
    };
    return [null, val, start + 1];
  }
  if (str[start] === '!' || str[start] === '=') {
    if (str[start + 1] !== '=') {
      // throw error;
    }
    const val: IOperate = {
      type: 'operate',
      value: str.substring(start, start + 2) as OperateSymbol,
    };
    return [null, val, start + 1];
  }

  const val: IOperate = {
    type: 'operate',
    value: str[start] as OperateSymbol,
  };
  return [null, val, start];
};
const parseNumber: ParseFunction = (str: string, start: number) => {
  let endIdx = str.length - 1;
  for (let i = start; i < str.length; i++) {
    if (str[i] === 'e' || str[i] === 'E') {
      if (str[i + 1] === '+' || str[i + 1] === '-') {
        i++;
      }
      continue;
    }
    if (!/[0-9]/.test(str[i]) && str[i] && str[i] !== '.') {
      endIdx = i - 1;
      break;
    }
  }
  const _val = str.substring(start, endIdx + 1);
  const val: IValueNumber = {
    type: 'value',
    dataType: 'number',
    value: String(_val),
  };
  return [null, val, endIdx];
};
const parseStr: ParseFunction = (str: string, start: number) => {
  const stack: string[] = [str[start]];
  let endIdx = start;
  let result = '';
  for (let i = start + 1; i < str.length; i++) {
    const current = str[i] as string;
    if (current !== `'` && current !== `"`) {
      continue;
    }
    if (stack.indexOf(current) !== -1) {
      do {
        stack.pop();
      } while (stack.indexOf(current) !== -1);
      if (stack.length === 0) {
        result = str.substring(start + 1, i);
        endIdx = i;
        break;
      }
    } else {
      stack.push(current);
    }
  }
  if (stack.length !== 0) {
    throw new Error('not');
  }
  return [null, { type: 'value', dataType: 'string', value: result }, endIdx];
};
/**
 *
 * @param str st
 * @param start
 */
const parseFunc: ParseFunction = (str: string, start: number) => {
  let endIdx = str.length;
  for (let i = start; i < str.length; i++) {
    if (!/^[A-Z0-9\$]$/.test(str[i])) {
      endIdx = i;
      break;
    }
  }
  const subStr = str.substring(start, endIdx);
  const val: IFunction = {
    type: 'function',
    value: subStr,
  };
  return [null, val, endIdx - 1];
};
// const parseKeywords: ParseFunction(str: string, start: number) => {

// }
const parseString: ParseFunction = (str: string, start: number) => {
  let endIdx = str.length;
  for (let i = start; i < str.length; i++) {
    if (!/^[a-z\$]$/.test(str[i])) {
      endIdx = i;
      break;
    }
  }
  const subStr = str.substring(start, endIdx) as SYSTEM_KEYWORD;
  const val: IKeyword = {
    type: 'keyword',
    value: subStr,
  };
  return [null, val, endIdx - 1];
};
const parseOccupy: ParseFunction = (str: string, start: number) => {
  let endIdx = str.length;
  for (let i = start; i < str.length; i++) {
    if (str[i] === '}') {
      endIdx = i;
      break;
    }
  }
  const subStr = str.substring(start + 1, endIdx) as string;
  const val: IOccupyNumberValue = {
    type: 'value',
    dataType: 'number',
    formType: 'occupy',
    name: subStr,
    value: '0',
  };
  return [null, val, endIdx - 1];
};
export function parse(str: string) {
  const result: TAllTypes[] = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') continue;
    if (str[i] === '(') {
      result.push({ type: 'brackets', value: 'left' });
      continue;
    }
    if (str[i] === ')') {
      result.push({ type: 'brackets', value: 'right' });
      continue;
    }
    if (str[i] === ',') {
      result.push({
        type: 'special',
        value: ',',
      });
      continue;
    }
    if (BASE_OPERATE.indexOf(str[i] as OperateSymbol) !== -1 || str[i] == '=') {
      const [err, val, newStartIdx] = paseOperate(str, i, result);
      if (!err) {
        result.push(val);
        i = newStartIdx;
        continue;
      }
    }
    if (str[i] === '{') {
      const [err, val, newStartIdx] = parseOccupy(str, i, result);
      if (!err) {
        result.push(val);
        i = newStartIdx;
        continue;
      }
    }
    if (/[0-9]/.test(str[i])) {
      const [err, val, newStartIdx] = parseNumber(str, i, result);
      if (!err) {
        result.push(val);
        i = newStartIdx;
        continue;
      }
    }
    if (str[i] === `'` || str[i] === `"`) {
      const [err, val, newStartIdx] = parseStr(str, i, result);
      if (!err) {
        result.push(val);
        i = newStartIdx;
        continue;
      }
    }
    if (/[a-z]/.test(str[i])) {
      const [err, val, newStartIdx] = parseString(str, i, result);
      if (!err) {
        result.push(val);
        i = newStartIdx;
        // throw new FormulaError('val! error!', { val });
        continue;
      }
    }
    if (/[A-Z]/.test(str[i])) {
      const [err, val, newStartIdx] = parseFunc(str, i, result);
      if (!err) {
        if (str[newStartIdx + 1] === '(') {
          result.push(val);
          i = newStartIdx;
          continue;
        } else {
          if (val.value === 'TRUE') {
            result.push({
              type: 'value',
              dataType: 'boolean',
              value: true,
            });
            i = newStartIdx;
            continue;
          }
          if (val.value === 'FALSE') {
            result.push({
              type: 'value',
              dataType: 'boolean',
              value: false,
            });
            i = newStartIdx;
            continue;
          }
        }
      }
    }
  }
  return result;
}
