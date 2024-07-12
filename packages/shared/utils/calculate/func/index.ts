import { FormulaError } from '../FormulaError';
import { max, min, sqrt, Op, handlePrecision, fillZero } from '../../maths';
import { TAllTypes } from '../types';
export * from './calcFunc';
// 'floor' | 'ceil' | 'round'
const PRECISION_TYPE_MAP = {
  '0': 'round',
  '1': 'ceil',
  '2': 'floor',
};
export const funcs = {
  MAX: (vals: any[], _: any) => {
    return max(...(<any>vals));
  },
  MIN: (vals: any[], _: any) => {
    return min(...(<any>vals));
  },
  SQRT: (vals: any[], _: any) => {
    return sqrt(vals[0]);
  },
  IF: (_: any[], vals: any) => {
    // console.log(vals);
    if (vals[0].type !== 'value') {
      throw new FormulaError(`IF error! judge ${vals[0].type}`);
    }
    const judge = (() => {
      if (vals[0].dataType === 'boolean') {
        return vals[0].value;
      }
      if (vals[0].dataType === 'number') {
        return !Op.eq(vals[0].value, '0');
      }
      if (vals[0].dataType === 'string') {
        return vals[0].value !== '';
      }
      throw new FormulaError(`judge is out of boundary! ${JSON.stringify(vals[0])}`);
    })();
    return judge ? vals[1] : vals[2];
  },
  /**
   * @description 解析器中的精度函数，PRECISION(值,小数位数,处理方式)，处理方式默认0：四舍五入，1： 向上取整，2向下取整
   * @param _
   * @param vals
   */
  PRECISION: (_: any[], vals: any[]) => {
    let value = '';
    let precision = '';
    let type = '0';
    if (vals[0].type !== 'value' && vals[0].dataType !== 'number' && vals[1].type !== 'value' && vals[1].dataType !== 'number') {
      throw new FormulaError('FUNCTION(PRECISION) value 1 value 2 not expect!', { vals });
    }
    value = vals[0].value as string;
    precision = vals[1].value as string;
    if (vals.length === 4) {
      type = vals[2].value;
      if (type !== '0' && type !== '1' && type !== '2') {
        throw new FormulaError('FUNCTION(PRECISION) handle type not expect!', { type });
      }
    }
    const result = handlePrecision(value, precision, PRECISION_TYPE_MAP[type]);
    return result;
    // throw new FormulaError('FUNCTION(PRECISION) VALS not expect!', { vals });
  },
  FILL: (_: any, vals: TAllTypes[]) => {
    if (vals[0].type !== 'value' || vals[0].dataType !== 'number' || vals[1].type !== 'value' || vals[1].dataType !== 'number') {
      throw new FormulaError(`FILL params error! value1: ${vals[0].value} ,value2: ${vals[1].value}`);
    }
    const val1 = vals[0].value as string;
    const val2 = vals[1].value as string;
    return {
      type: 'value',
      dataType: 'string',
      value: fillZero(val1, val2),
    };
  },
  /**
   * @description 生成重复字符(excel中相同)，REPT(字符, 次数)
   */
  REPT: (_: any, vals: TAllTypes[]) => {
    const chart = vals[0].value as string;
    const times = vals[1].value as string;
    const result = new Array(Number(times)).fill(chart).join('');
    return {
      type: 'value',
      dataType: 'string',
      value: result,
    };
  },
  /**
   * @description 将字符类型转换为数字类型
   * @param _
   * @param vals
   * @returns
   */
  VALUE: (_: any, vals: TAllTypes[]) => {
    return {
      type: 'value',
      dataType: 'string',
      value: vals[0].value,
    };
  },
  /**
   * @description 仅仅支持0.000这种类似格式
   * @param _
   * @param vals
   * @returns
   */
  TEXT: (_: any, vals: TAllTypes[]) => {
    const value = vals[0].value as string;
    const len = (vals[1].value as string).replace('0.', '').length;
    return {
      type: 'value',
      dataType: 'string',
      value: fillZero(value, len),
    };
  },
  ROUND: (_: any, vals: TAllTypes[]) => {
    // @ts-ignore
    if (vals[0].type !== 'value' && vals[0].dataType !== 'number' && vals[1].type !== 'value' && vals[1].dataType !== 'number') {
      throw new FormulaError('FUNCTION(ROUND) value 1 value 2 not expect!', { vals });
    }
    const result = handlePrecision(vals[0].value as string, vals[1].value as string, 'round');
    return result;
  },
  ROUNDUP: (_: any, vals: TAllTypes[]) => {
    // @ts-ignore
    if (vals[0].type !== 'value' && vals[0].dataType !== 'number' && vals[1].type !== 'value' && vals[1].dataType !== 'number') {
      throw new FormulaError('FUNCTION(ROUNDUP) value 1 value 2 not expect!', { vals });
    }
    const result = handlePrecision(vals[0].value as string, vals[1].value as string, 'ceil');
    return result;
  },
  ROUNDDOWN: (_: any, vals: TAllTypes[]) => {
    // @ts-ignore
    if (vals[0].type !== 'value' && vals[0].dataType !== 'number' && vals[1].type !== 'value' && vals[1].dataType !== 'number') {
      throw new FormulaError('FUNCTION(ROUNDDOWN) value 1 value 2 not expect!', { vals });
    }
    const result = handlePrecision(vals[0].value as string, vals[1].value as string, 'floor');
    return result;
  },
};
