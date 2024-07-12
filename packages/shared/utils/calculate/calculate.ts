import { addDec, subDec, mulDec, divDec, pow, negated, handlePrecision, PrecisionType } from '../maths';
import { Decimal } from 'decimal.js';
import { rebuildCalculate } from './rebuildCalculate';
import { OperateSymbol, TAllTypes, IValueNumber, IValue } from './types';
import { parse } from './parse';
import { FormulaError } from './FormulaError';
import { funcs } from './func';
import { Op } from './dependents';
// export interface ISpecial extends IFormulaItem {
//   type: 'special';
//   value: ':' | ',';
// }
// export interface IValueBoolean extends IFormulaItem {
//   type: 'value';
//   dataType: 'boolean';
//   value: boolean;
// }
// export interface IValueString extends IFormulaItem {
//   type: 'value';
//   dataType: 'string';
//   value: string;
// }
// /**
//  * @description 占位值
//  */
// export interface IOccupyNumberValue extends IFormulaItem {
//   type: 'occupy';
//   dataType: 'number';
//   value: string;
// }
// export type TAllTypes =
//   | IOperate
//   | IValueNumber
//   | IBrackets
//   | IFunction
//   | IPlusMinus
//   | ISpecial
//   | IValueBoolean
//   | IKeyword
//   | IValueString
//   | IOccupyNumberValue;
// type IValue = IValueNumber | IValueBoolean;
// type SYSTEM_KEYWORD = 'null' | 'undefined';
// interface IKeyword extends IFormulaItem {
//   type: 'keyword';
//   value: SYSTEM_KEYWORD;
// }
// interface IPlusMinus extends IFormulaItem {
//   type: 'plusMinus';
//   value: 'plus' | 'minus';
// }
// interface IBrackets extends IFormulaItem {
//   type: 'brackets';
//   value: 'left' | 'right';
// }

// interface IValueNumber extends IFormulaItem {
//   type: 'value';
//   dataType: 'number';
//   value: number | string;
// }

// interface IFormulaItem {
//   type: string;
// }
// interface IFunction extends IFormulaItem {
//   type: 'function';
//   value: string;
// }

function calc(operate: OperateSymbol | keyof typeof funcs | 'plusMinus' | 'function', vals: TAllTypes[]): TAllTypes {
  for (const item of vals) {
    if (item.type !== 'value' && item.type !== 'special' && item.type !== 'plusMinus' && item.type !== 'function') {
      throw new FormulaError(`expect vals`, { vals: vals });
    }
  }
  if (operate === '!=') {
    return { type: 'value', dataType: 'boolean', value: String((vals[0] as IValue).value) != String((vals[1] as IValue).value) };
  }
  if (operate === '==') {
    return { type: 'value', dataType: 'boolean', value: String((vals[0] as IValue).value) == String((vals[1] as IValue).value) };
  }
  if (operate === 'plusMinus') {
    const _val = negated(vals[0].value as string);
    return { type: 'value', dataType: 'number', value: _val };
  }
  const val1 = (vals as IValueNumber[])[0]?.value;
  const val2 = (vals as IValueNumber[])[1]?.value;
  if (operate === '+') {
    return { type: 'value', value: addDec(val1, val2), dataType: 'number' };
  }
  if (operate === '-') {
    return { type: 'value', dataType: 'number', value: subDec(val1, val2) };
  }
  if (operate === '*') {
    return { type: 'value', dataType: 'number', value: mulDec(val1, val2) };
  }
  if (operate === '/') {
    if (Op.eq(val2, 0) || Op.eq(val2, 0)) {
      throw new FormulaError('#DIV/0!', { vals: vals });
    }
    return { type: 'value', dataType: 'number', value: divDec(val1, val2) };
  }
  if (operate === '**') {
    return { type: 'value', dataType: 'number', value: pow(val1, val2) };
  }
  if (operate === '&') {
    return { type: 'value', dataType: 'string', value: String(val1) + String(val2) };
  }
  if (operate === '%') {
    throw new FormulaError(`not support, operate %`, { vals: vals });
    // return { type: 'value', dataType: 'number', value: new Decimal(val1 % val2).toString() };
  }
  if (operate === '>') {
    return { type: 'value', dataType: 'boolean', value: vals[0] > vals[1] };
  }
  if (operate === '>=') {
    if (vals[0] === undefined || vals[1] === undefined) {
      throw new FormulaError('#N/A', { operate: '!=', info: vals });
    }
    return { type: 'value', dataType: 'boolean', value: vals[0] >= vals[1] };
  }
  if (operate === '<') {
    if (vals[0] === undefined || vals[1] === undefined) {
      throw new FormulaError('#N/A', { operate: '!=', info: vals });
    }
    return { type: 'value', dataType: 'boolean', value: vals[0] < vals[1] };
  }
  if (operate === '<=') {
    if (vals[0] === undefined || vals[1] === undefined) {
      throw new FormulaError('#N/A', { operate: '!=', info: vals });
    }
    return { type: 'value', dataType: 'boolean', value: vals[0] <= vals[1] };
  }
  if (Object.keys(funcs).indexOf(operate.toLocaleUpperCase()) !== -1) {
    const funcName = operate.toUpperCase() as keyof typeof funcs;
    for (const val of vals) {
      if (val.type !== 'value' && val.type !== 'special') {
        throw new FormulaError('#N/A', { operate: 'max', info: vals });
      }
    }
    const _vals = vals.filter((item) => item.type === 'value').map((item) => item.value);
    const result = funcs[funcName](_vals, vals);
    if (typeof result === 'string') {
      return {
        type: 'value',
        dataType: 'number',
        value: result,
      };
    }
    // if (result.type) {
    //   return result
    // }
    return result;
  }
  throw new FormulaError('#UNKOWN!', { msg: 'unkown operate', operate: operate, vals: vals });
}

function _calculateResult(vals: TAllTypes[], processCallback: (currentVals: TAllTypes[], calc: any, result: any) => void = () => {}): any {
  processCallback(vals, [], []);
  let _calc: any = [];
  for (let i = 0; i < vals.length; i++) {
    try {
      vals[i].value === 'minus';
    } catch (error) {
      console.log('error');
      console.log(vals);
    }
    if (vals[i].type === 'plusMinus') {
      if (vals[i].value === 'minus') {
        const res = calc('plusMinus', [vals[i - 1]]);
        _calc = vals.splice(i - 1, 2, res);
        processCallback(vals, _calc, res);
        i = i - 1;
      } else {
        _calc = vals.splice(i, 1);
        processCallback(vals, _calc, []);
        i--;
      }
      continue;
    }
    if (vals[i].type === 'operate') {
      const res = calc(vals[i].value as any, [vals[i - 2], vals[i - 1]]);
      _calc = vals.splice(i - 2, 3, res);
      i = i - 3;
      processCallback(vals, _calc, res);
      continue;
    }
    if (vals[i].type === 'function') {
      let j = i - 1;
      for (; j >= 0; j--) {
        if (vals[j].type !== 'special') {
          break;
        }
      }
      const start = i - ((i - j - 1) * 2 + 1);
      const count = i - start + 1;
      const _vals = vals.slice(start, i);
      const res = calc(vals[i].value as 'function', _vals);
      _calc = vals.splice(start, count, res);
      i = start - 1;
      processCallback(vals, _calc, res);
      continue;
    }
  }
  return vals;
}
type CalculateErrorHandleOption = ((err: any, info: { parse: any; rebuild: any; process: any }) => any) | string | number;
type CalculateOption = {
  errHandle?: CalculateErrorHandleOption;
  precision?: number;
  precisionType?: PrecisionType;
};
/**
 * @description 混合运算
 * @description 支持的函数：IF、VALUE、TEXT、ROUND、ROUNDUP、ROUNDDOWN、REPT、MAX、MIN
 * @param str 字符串
 * @param option 错误处理，精度处理等属性， 没有添加处理时错误被抛出
 * @example
 * ```typescript
 * import {calculate} from './calutate';
 * let result = calculate('1 + 2*3+MAX(4,5)');
 * console.log(result); // 11
 * ```
 * @returns
 */
export function calculate(str: string, option?: CalculateErrorHandleOption | CalculateOption, hasProcess = false): string {
  let parseResult: any[] = [];
  let rebuildResult: any[] = [];
  let logRebuild: any[] = [];
  const process: any[] = [];
  const _option: CalculateOption = (() => {
    if (typeof option === 'object') {
      return option;
    }
    return {
      errHandle: option,
      precision: undefined,
    };
  })();
  try {
    parseResult = parse(str);
    rebuildResult = rebuildCalculate(parseResult);
    // console.log(JSON.parse(JSON.stringify(rebuildResult)));
    if (hasProcess) {
      logRebuild = JSON.parse(JSON.stringify(rebuildResult));
    }
    const res = _calculateResult(rebuildResult, (_vals, calc, result) => {
      if (hasProcess === false) return;
      process.push({
        finally: JSON.parse(JSON.stringify(_vals)),
        calc: JSON.parse(JSON.stringify(calc)),
        result: JSON.parse(JSON.stringify(result)),
      });
    });
    if (res.length !== 1 || !res[0] || res[0].type !== 'value') {
      throw new FormulaError('capulet error!', { val: res });
    }
    if (hasProcess && typeof _option.errHandle === 'function') {
      _option.errHandle(null, { parse: parseResult, rebuild: logRebuild, process: process });
    }

    if (res[0].dataType === 'number') {
      const temp =
        _option.precision !== undefined && _option.precision !== null
          ? handlePrecision(res[0].value, _option.precision, _option.precisionType)
          : res[0].value;
      if (temp.indexOf('e-') !== -1) {
        return new Decimal(temp).toFixed(18);
      } else {
        return temp;
      }
    } else {
      return res[0].value;
    }
  } catch (error) {
    if (_option.errHandle !== undefined) {
      return typeof _option.errHandle === 'function'
        ? _option.errHandle(error, { parse: parseResult, rebuild: logRebuild, process: process })
        : _option.errHandle;
    } else {
      console.error(error);
      throw new Error('计算错误！');
    }
  }
}
