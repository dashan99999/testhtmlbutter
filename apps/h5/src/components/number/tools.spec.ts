import { fixInputValue } from './tools';
describe('tools test', () => {
  test('fix has .', () => {
    const result = fixInputValue('123.4511111', 2, 123.45);
    expect(result).toEqual('123.45');
  });
  test('fix no max min', () => {
    const result = fixInputValue('123.4511111', 2);
    expect(result).toEqual('123.45');
  });
  test('1 remove pre zero', () => {
    const result = fixInputValue('0000123.4511111', 2);
    expect(result).toEqual('123.45');
    expect(fixInputValue('00000.4511111', 2)).toEqual('0.45');
  });
  test('test', () => {
    const result = fixInputValue('123.4', 2, Infinity, 123.45);
    expect(result).toEqual('123.45');
  });
  test.only('test 0', () => {
    const result = fixInputValue('0', 2);
    console.log('result', result);
  });
});
