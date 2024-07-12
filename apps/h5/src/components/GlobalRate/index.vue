<script lang="ts" setup name="global-rate">
  import { Decimal } from 'decimal.js';
  import { useRateStore, useMarketStore } from '@bitunix/shared/store';
  // import { homeMarketErrorMessage } from '@bitunix/shared/utils/MessageUtil';
  interface IProps {
    value: number | string; // 待转换的值
    precision?: number | string; // 默认值为-1, 精度 -1时不做精度控制
    completePrecision?: boolean; // 是否根据传入得精度数值补全末尾
    showSymbol?: boolean; // 是否显示对应的法币符号
    quote?: string; // 计价货币
    base?: string; // 币种
    def?: string; // 当传入的value为NaN，undefined等时，指定返回的值,默认为'--'
  }
  const props = withDefaults(defineProps<IProps>(), {
    precision: -1,
    completePrecision: false,
    showSymbol: true,
    quote: 'USDT',
    def: '--',
    base: 'BTC',
  });
  const rateStore = useRateStore();
  const marketStore = useMarketStore();
  /* 补全小数精度 */
  // eslint-disable-next-line vue/no-dupe-keys
  const completePrecision = (params: { v: number; completePrecision: boolean; precision: number }) => {
    if (!params.completePrecision || params.precision < 0) {
      return params.v;
    }
    const str = params.v.toString();
    if (str.includes('.')) {
      // 有小数位
      const [integer, decimals] = str.split('.');
      const decimalsStr = decimals.padEnd(params.precision, '0');
      return integer + '.' + decimalsStr;
    } else {
      // 没有小数位
      return (str + '.').padEnd(str.length + 1 + params.precision, '0');
    }
  };
  const _transformPrecision = (v: number, p: number) => {
    return Math.floor(v * Math.pow(10, p)) / Math.pow(10, p);
  };
  // 货币法币对应的精度
  const legalPrecision = computed(() => {
    const symbolMap = {
      $: 'USD',
      '¥': 'CNY',
    };
    const result = marketStore.fiatList?.find((item) => {
      return item.countryCoin.toLowerCase() === symbolMap[rateStore.rateSymbol]?.toLowerCase();
    });
    let precision = -1;
    // 如果没有找到对应的法币汇率，直接返回缺省值
    if (!result) {
      // homeMarketErrorMessage('fiat');
      return '--';
    }
    if (!(result as any).currencyPrecisions) {
      precision = (result as any)?.precision;
    } else {
      const idx = (result as any).currencyPrecisions.findIndex((item) => {
        return props.base.toLowerCase() === item.coinSymbol.toLowerCase();
      });
      if (idx < 0) {
        precision = (result as any)?.precision;
      } else {
        precision = (result as any).currencyPrecisions[idx].precision;
      }
    }
    return precision;
  });
  // console.log(rateStore);
  const legalValue = computed(() => {
    if (!rateStore.rateObj[props.quote]) {
      // homeMarketErrorMessage('rate');
      return props.def;
    }

    if (!isNaN(parseFloat(props.value as string)) && !isNaN(parseFloat(legalPrecision.value as unknown as string))) {
      /* 法币符号 */
      const coinSymbol = props.showSymbol ? rateStore.rateSymbol : '';
      /* 计算数值 */
      const decimal = Decimal.mul(props.value, rateStore.rateObj[props.quote]);
      if (legalPrecision.value === '--') {
        return props.def;
      }
      const num =
        parseFloat(legalPrecision.value as unknown as string) > 0
          ? _transformPrecision(decimal.toNumber(), legalPrecision.value as unknown as number)
          : decimal.toNumber();
      return (
        (num < 0 ? '-' : '') +
        coinSymbol +
        new Decimal(
          completePrecision({
            v: Math.abs(num as number),
            completePrecision: props.completePrecision,
            precision: parseFloat(legalPrecision.value as unknown as string),
          }),
        ).toFixed()
      );
    } else {
      return props.def;
    }
  });
</script>
<template>
  <slot :value="legalValue" :precision="legalPrecision" :symbol="rateStore.rateSymbol || ''">
    <span>{{ legalValue }}</span>
  </slot>
</template>
