export interface IFormulaItem {
  type: string;
}
export interface IFunction extends IFormulaItem {
  type: 'function';
  value: string;
}
export interface ISpecial extends IFormulaItem {
  type: 'special';
  value: ':' | ',';
}
export interface IValueBoolean extends IFormulaItem {
  type: 'value';
  dataType: 'boolean';
  value: boolean;
}
export interface IValueString extends IFormulaItem {
  type: 'value';
  dataType: 'string';
  value: string;
}
export const BASE_OPERATE: OperateSymbol[] = ['+', '-', '*', '/', '==', '!=', '!', '>', '>=', '<', '<=', '**', '&', '%'];
export const BASE_OPERATE_PRIORITY = {
  '+': 50,
  '-': 50,
  '*': 60,
  '/': 60,
  '%': 60,
  '**': 70,
  '&': 60,
  '!': 80,
  '==': 90,
  '!=': 90,
  '>': 90,
  '<': 90,
  '>=': 90,
  '<=': 90,
};
export type OperateSymbol = keyof typeof BASE_OPERATE_PRIORITY;
/**
 * @description 占位值
 */
export interface IOccupyNumberValue extends IFormulaItem {
  type: 'value';
  dataType: 'number';
  formType: 'occupy';
  name: string;
  value: string;
}
export type TAllTypes =
  | IOperate
  | IValueNumber
  | IBrackets
  | IFunction
  | IPlusMinus
  | ISpecial
  | IValueBoolean
  | IKeyword
  | IValueString
  | IOccupyNumberValue;
export type IValue = IValueNumber | IValueBoolean | IValueString;
export type SYSTEM_KEYWORD = 'null' | 'undefined';
export interface IKeyword extends IFormulaItem {
  type: 'keyword';
  value: SYSTEM_KEYWORD;
}
export interface IPlusMinus extends IFormulaItem {
  type: 'plusMinus';
  value: 'plus' | 'minus';
}
export interface IBrackets extends IFormulaItem {
  type: 'brackets';
  value: 'left' | 'right';
}
export interface IOperate extends IFormulaItem {
  type: 'operate';
  value: OperateSymbol;
}
export interface IValueNumber extends IFormulaItem {
  type: 'value';
  dataType: 'number';
  value: string;
}
export interface ICalcTreeStruct {
  type: string;
  operate: any;
  status: 'undid' | 'did';
  value: any;
  update: () => void;
  parent: null | ICalcTreeStruct;
  depValues: any[];
}
