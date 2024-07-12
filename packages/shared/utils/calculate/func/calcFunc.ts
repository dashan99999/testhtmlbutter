import { FormulaError } from '../FormulaError';
import { max, min, Op, handlePrecision, fillZero } from '../../maths';
import { IValue, IValueNumber, IValueString } from '../types';
import { getValueType } from '../tools';
import { isNumber } from '../dependents';
import { assert } from '../assert';

export const calcFunc = {
  MAX: (...args: IValueNumber[]): IValueNumber => {
    assert.number(args);
    const values = args.map((item) => item.value) as string[];
    const result = max(...values);
    return {
      type: 'value',
      dataType: 'number',
      value: result,
    };
  },
  MIN: (...args: IValueNumber[]): IValueNumber => {
    assert.number(args);
    const values = args.map((item) => item.value) as string[];
    const result = min(...values);
    return {
      type: 'value',
      dataType: 'number',
      value: result,
    };
  },
  IF: (
    condition: IValue,
    trueValue: IValue = { type: 'value', dataType: 'boolean', value: true },
    falseValue: IValue = { type: 'value', dataType: 'boolean', value: false },
  ): IValue => {
    // console.log(vals);
    if (condition.type !== 'value') {
      throw new FormulaError(`IF error! judge ${condition.type}`);
    }
    const judge = (() => {
      if (condition.dataType === 'boolean') {
        return condition.value;
      }
      if (condition.dataType === 'number') {
        return !Op.eq(condition.value, '0');
      }
      if (condition.dataType === 'string') {
        return condition.value !== '';
      }
      throw new FormulaError(`judge is out of boundary! ${JSON.stringify(condition)}`);
    })();
    return judge ? trueValue : falseValue;
  },
  /**
   * @description 生成重复字符(excel中相同)，REPT(字符, 次数)
   */
  REPT: (chartValue: IValueString, timesValue: IValueNumber): IValueString => {
    const chart = chartValue.value as string;
    const times = timesValue.value as string;
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
  VALUE: (value: IValue): IValueNumber => {
    let result = '0';
    const dataType = getValueType(value);
    if (dataType === 'boolean') {
      result = value.value ? '1' : '0';
    } else if (dataType === 'number') {
      result = value.value as string;
    } else if (dataType === 'string') {
      result = isNumber(value.value) ? (value.value as string) : '0';
    } else {
      result = '0';
    }
    return {
      type: 'value',
      dataType: 'number',
      value: result,
    };
  },
  /**
   * @description 仅仅支持0.000这种类似格式
   * @param value
   * @param count
   * @returns
   */
  TEXT: (value: IValueString, count: IValueNumber): IValueString => {
    const str = value.value as string;
    const len = (count.value as string).replace('0.', '').length;
    return {
      type: 'value',
      dataType: 'string',
      value: fillZero(str, len),
    };
  },
  ROUND: (value: IValueNumber, precision: IValueNumber): IValueNumber => {
    assert.number([value, precision]);
    const result = handlePrecision(value.value, precision.value, 'round');
    return {
      type: 'value',
      dataType: 'number',
      value: result,
    };
  },
  ROUNDUP: (value: IValueNumber, precision: IValueNumber): IValueNumber => {
    assert.number([value, precision]);
    const result = handlePrecision(value.value, precision.value, 'ceil');
    return {
      type: 'value',
      dataType: 'number',
      value: result,
    };
  },
  ROUNDDOWN: (value: IValueNumber, precision: IValueNumber): IValueNumber => {
    assert.number([value, precision]);
    const result = handlePrecision(value.value, precision.value, 'floor');
    return {
      type: 'value',
      dataType: 'number',
      value: result,
    };
  },
};
