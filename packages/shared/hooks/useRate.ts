import clonedeep from 'lodash.clonedeep';
import { Ref } from 'vue';
import { useRateStore } from '../store';
import { Decimal } from 'decimal.js';

interface IParams {
  value: Ref<number | number[] | Object[]>; // 待转换的值
  precision?: number; // 默认值为-1, 精度 -1时不做精度控制
  showSymbol?: boolean; // 是否显示对应的法币符号
  key?: string | string[]; // 对象数组需要设置转换的列,value为Ref<Object[]>时生效
  coinColumn?: string; // 币对名称的key名称，value为Ref<Object[]>时生效
  newColumn?: boolean; // 是否将转换的法币置为新的一列
  // baseSymbol?: string; // 币对的计价货币
}

const DEFAULTBASESYMBOL = 'USDT'; // 默认基础货币
const DEFAULTPRECISION = -1; // 默认精度
const DEFAULTKEY = 'none'; // 默认对象数组待转换的列
const DEFAULTCOINCOLUMN = '-'; // 默认币对列名

/* 默认参数 */
const defaultParams: Required<IParams> = {
  value: ref(0),
  coinColumn: DEFAULTCOINCOLUMN,
  // baseSymbol: DEFAULTBASESYMBOL,
  precision: DEFAULTPRECISION,
  key: DEFAULTKEY,
  showSymbol: true,
  newColumn: false,
};
export const useRate = (v: IParams) => {
  const params = Object.assign({}, defaultParams, v);

  const rateStore = useRateStore();

  const _transformNumber = (o, v = DEFAULTBASESYMBOL) => {
    if (!isNaN(parseFloat(o as string))) {
      /* 法币符号 */
      const coinSymbol = params.showSymbol ? rateStore.rateSymbol : '';
      /* 计算数值 */
      const decimal = Decimal.mul(o, rateStore.rateObj[v] || rateStore.rateObj[DEFAULTBASESYMBOL]); // 当指定了币对列时，取出的货币在汇率对象中找不到对应的汇率，则默认使用USDT的汇率
      const num = params.precision > 0 ? parseFloat(decimal.toFixed(params.precision)) : decimal.toNumber();
      return (num < 0 ? '-' : '') + coinSymbol + Math.abs(num as number);
    } else {
      return o;
    }
  };

  /* 
    @description: 对入参的多种情况做判断，各自处理参数
    统一由_transformNumber做转换处理
  */
  const legalRef = computed(() => {
    /* 单个数字 */
    if (!Array.isArray(params.value.value)) {
      return _transformNumber(params.value.value);
    }
    /* 空数组 */
    if (params.value.value.length <= 0) {
      return [];
    }
    /* 数字数组 */
    if (typeof params.value.value[0] === 'number') {
      return params.value.value.map((i) => {
        return _transformNumber(i);
      });
    }
    /* 对象数组 */
    if (typeof params.value.value[0] === 'object') {
      // 如果没有指定转换列的名称，则直接返回
      if (params.key === DEFAULTKEY) {
        return params.value.value;
      }
      return params.value.value.map((i) => {
        const temp = clonedeep(i);
        if (typeof params.key === 'string') {
          params.key = new Array(params.key);
        }
        params.key.forEach((v) => {
          if (params.newColumn) {
            temp[v + '_legal'] = i[params.coinColumn]
              ? _transformNumber(temp[v], i[params.coinColumn].toUpperCase())
              : _transformNumber(temp[v]);
          } else {
            temp[v] = i[params.coinColumn] ? _transformNumber(temp[v], i[params.coinColumn].toUpperCase()) : _transformNumber(temp[v]);
          }
        });
        return temp;
      });
    }
    return -1;
  });
  return { legalRef };
};
