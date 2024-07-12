import { IValue, IValueNumber, IValueBoolean, IValueString } from '../types';
import { FormulaError } from '../FormulaError';
import { isAllValueNumber, isAllValue, isAllValueString } from '../tools';
import { addDec, subDec, divDec, mulDec, Op, pow } from '../..//maths';
// const BASE_OPERATE: OperateSymbol[] = ['+', '-', '*', '/', '==', '!=', '!', '>', '>=', '<', '<=', '**', '&', '%'];
export const normalBaseCalc = {
  '+': (...vals: IValueNumber[]): IValueNumber => {
    if (vals.length !== 2) {
      throw new FormulaError('加法计算错误', { id: '642592036cc4' });
    }
    if (!isAllValueNumber(vals)) {
      throw new FormulaError('加法计算错误', { id: '5efb988fb2c0' });
    }
    return {
      type: 'value',
      dataType: 'number',
      value: addDec(vals[0].value, vals[1].value),
    };
  },
  '-': (...vals: IValueNumber[]): IValueNumber => {
    if (vals.length !== 2) {
      throw new FormulaError('减法计算错误', { id: 'fd819eebf028' });
    }
    if (!isAllValueNumber(vals)) {
      throw new FormulaError('减法计算错误', { id: 'f4a34d0a29c0' });
    }
    return {
      type: 'value',
      dataType: 'number',
      value: subDec(vals[0].value, vals[1].value),
    };
  },
  '*': (...vals: IValueNumber[]): IValueNumber => {
    if (vals.length !== 2) {
      throw new FormulaError('乘法计算错误', { id: '5b35e70237a5' });
    }
    if (!isAllValueNumber(vals)) {
      console.log(vals);
      throw new FormulaError('乘法计算错误', { id: '11f16d0b2c31' });
    }
    return {
      type: 'value',
      dataType: 'number',
      value: mulDec(vals[0].value, vals[1].value),
    };
  },
  '/': (...vals: IValueNumber[]): IValueNumber => {
    if (vals.length !== 2) {
      throw new FormulaError('乘法计算错误', { id: '5b35e70237a5' });
    }
    if (!isAllValueNumber(vals)) {
      throw new FormulaError('乘法计算错误', { id: '11f16d0b2c33' });
    }
    return {
      type: 'value',
      dataType: 'number',
      value: divDec(vals[0].value, vals[1].value),
    };
  },
  '==': (...vals: IValue[]): IValueBoolean => {
    if (!isAllValue(vals) || vals.length != 2) {
      console.log(vals);
      throw new FormulaError('等于计算错误', { id: '519ee0fc7b00' });
    }
    if ((vals[0] as IValue).dataType !== (vals[1] as IValue).dataType) {
      return {
        type: 'value',
        dataType: 'boolean',
        value: false,
      };
    }
    if ((vals[0] as IValueNumber).dataType === 'number') {
      return {
        type: 'value',
        dataType: 'boolean',
        value: Op.eq((vals[0] as IValueNumber).value, (vals[1] as IValueNumber).value),
      };
    }
    return {
      type: 'value',
      dataType: 'boolean',
      value: vals[0].value == vals[1].value,
    };
  },
  '!=': (...vals: IValue[]): IValueBoolean => {
    if (!isAllValue(vals) || vals.length != 2) {
      throw new FormulaError('不等于等于计算错误', { id: '519ee0fc7b00' });
    }
    if ((vals[0] as IValue).dataType !== (vals[1] as IValue).dataType) {
      return {
        type: 'value',
        dataType: 'boolean',
        value: true,
      };
    }
    if ((vals[0] as IValueNumber).dataType === 'number') {
      return {
        type: 'value',
        dataType: 'boolean',
        value: Op.ne((vals[0] as IValueNumber).value, (vals[1] as IValueNumber).value),
      };
    }
    return {
      type: 'value',
      dataType: 'boolean',
      value: vals[0].value != vals[1].value,
    };
  },
  '>': (...vals: IValue[]): IValueBoolean => {
    if (!isAllValueNumber(vals) || vals.length !== 2) {
      throw new FormulaError('大于计算错误', { id: '11f16d0b2c32' });
    }
    return {
      type: 'value',
      dataType: 'boolean',
      value: Op.gt(vals[0].value as string, vals[1].value as string),
    };
  },
  '>=': (...vals: IValue[]): IValueBoolean => {
    if (!isAllValueNumber(vals) || vals.length !== 2) {
      throw new FormulaError('大于计算错误', { id: '11f16d0b2c11' });
    }
    return {
      type: 'value',
      dataType: 'boolean',
      value: Op.gte(vals[0].value as string, vals[1].value as string),
    };
  },
  '<': (...vals: IValue[]): IValueBoolean => {
    if (!isAllValueNumber(vals) || vals.length !== 2) {
      throw new FormulaError('大于计算错误', { id: '11f16d0b2c22' });
    }
    return {
      type: 'value',
      dataType: 'boolean',
      value: Op.lt(vals[0].value as string, vals[1].value as string),
    };
  },
  '<=': (...vals: IValue[]): IValueBoolean => {
    if (!isAllValueNumber(vals) || vals.length !== 2) {
      throw new FormulaError('大于计算错误', { id: '11f16d0b2c55' });
    }
    return {
      type: 'value',
      dataType: 'boolean',
      value: Op.lte(vals[0].value as string, vals[1].value as string),
    };
  },
  '**': (...vals: IValue[]): IValueNumber => {
    if (!isAllValueNumber(vals) || vals.length !== 2) {
      throw new FormulaError('大于计算错误', { id: '11f16d0b2c66' });
    }
    return { type: 'value', dataType: 'number', value: pow(vals[0].value as string, vals[1].value as string) };
  },
  '&&': (...vals: IValue[]): IValueString => {
    if (!isAllValueString(vals)) {
      throw new FormulaError('大于计算错误', { id: '11f16d0b2c66' });
    }
    return {
      type: 'value',
      dataType: 'string',
      value: ((vals[0].value as string) + vals[1].value) as string,
    };
  },
};
