import { IPlusMinus, IValue } from './types';
import { FormulaError } from './FormulaError';
/**
 * @description 校验方法
 */
export const assert = {
  number: (value: IValue | IValue[]) => {
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (!((item && item.type !== 'value') || item.dataType === 'number')) {
        throw new FormulaError('expect value is number', { value });
      }
    }
  },
  string: (value: IValue | IValue[]) => {
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (!((item && item.type !== 'value') || item.dataType === 'string')) {
        throw new FormulaError('expect value is string', { value });
      }
    }
  },
  boolean: (value: IValue | IValue[]) => {
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (!(item && item.type !== 'value' && item.dataType === 'boolean')) {
        throw new FormulaError('expect value is boolean', { value });
      }
    }
  },
  value: (value: IValue | IValue[]) => {
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (!(item && item.type !== 'value')) {
        throw new FormulaError('expect data is value', { value });
      }
    }
  },
  plusMinus: (value: IPlusMinus) => {
    if (!value || value.type !== 'plusMinus') {
      throw new FormulaError('expect plus minus', { value });
    }
  },
};
