<script lang="ts" setup>
  import { handlePrecision, isNumber, toThousands, fillZero as fillZeroFunc } from '@bitunix/shared/utils/maths';
  import { easyNumber } from '@bitunix/shared/utils/tools';
  interface IProps {
    value: string | number | undefined | null;
    /**
     * @description 是否三个数子添加逗号, 默认不添加
     * @default
     */
    thousand?: any;
    /**
     * @description 保留小数位数
     * @default 0
     */
    fixLen?: number;
    /**
     * @description 不足位数是否填充0 默认不填充,如果指定位数，则按指定位数填充，否则按精度填充
     */
    fillZero?: string | number | boolean;
    /**
     * @description 当为正数是否显示 + 默认不添加
     */
    showPlus?: any;
    /**
     * @description 异常值填充， 默认为空
     */
    fill?: string;
    /**
     * @description 转换显示数值 K、M、B 保留两位小数
     */
    hasUnit?: boolean;
    class?: string;
  }
  const props = withDefaults(defineProps<IProps>(), {
    fixLen: 0,
    fill: '',
  });
  const display = ref('');
  watch(
    () => [props],
    () => {
      if (isNaN(Number(props.value))) {
        display.value = props.fill;
        return;
      }
      let num: number | string = isNumber(props.value) ? handlePrecision(props.value as string, props.fixLen) : '0';
      let unit = '';
      if (props.hasUnit) {
        const _val = easyNumber(props.value || '0');
        if (_val.unit !== '') {
          num = _val.value;
          unit = _val.unit;
          if (props.fillZero !== undefined && props.fillZero !== false) {
            num = fillZeroFunc(num, 2);
          }
        } else {
          if (props.fillZero !== undefined && props.fillZero !== false) {
            num = fillZeroFunc(num, props.fixLen);
          }
        }
      } else {
        if (props.fillZero !== undefined && props.fillZero !== false) {
          if (!isNaN(Number(props.fillZero)) && typeof props.fillZero != 'boolean') num = fillZeroFunc(num, +props.fillZero);
          else num = fillZeroFunc(num, props.fixLen);
        }
      }
      if (props.thousand !== undefined) {
        num = toThousands(String(num));
      }
      if (props.showPlus && Number(num) > 0) {
        num = '+' + num;
      }
      display.value = String(num) + unit;
    },
    { immediate: true, deep: true },
  );
</script>
<template>
  <span :class="['fvn-number', props.class]">{{ display }}</span>
</template>
