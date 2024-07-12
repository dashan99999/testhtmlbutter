import { ComputedRef, Ref } from 'vue';
import useTheme from './themes';
import { useUserStore } from '#shared/store';
// import { rgb2hex } from '/@/utils/methods';
/**
 * @description 获取css3中的var属性
 * @example
 * ```typescript
 * const colorRef = useCssVar(ref('--color-text-2'));
 * console.log(colorRef.value); // #808899
 * ```
 * @param name
 * @returns
 */
export function useCssVar(name: Ref<string> | ComputedRef<string> | string) {
  const { isDark } = useTheme();
  const _name = computed(() => {
    return typeof name === 'string' ? name : name.value;
  });
  return computed(() => {
    const cssAttr = getComputedStyle(document.querySelector('body') as HTMLElement);
    if (isDark.value) {
      return cssAttr.getPropertyValue(_name.value);
    } else {
      return cssAttr.getPropertyValue(_name.value);
    }
  });
}

/**
 * @description hexToRgb颜色转换
 * @param hex
 * @returns
 */
function hexToRgb(hex: string) {
  if (!hex) hex = '#ededed';
  const rgb = parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7));
  return rgb;
}

/**
 * @description 获取涨跌的颜色
 * @returns rbg(--color)
 */
export function useRiseFallColor() {
  const riseVar = ref('--bx-success-color');
  const fallVar = ref('--bx-danger-color');
  const riseBgVar = ref('--color-bg-success-weak');
  const fallBgVar = ref('--color-bg-error-weak');
  const userStore = useUserStore();
  const fallColor1Var = ref('--bx-info-color');
  const riseColor1Var = ref('--bx-warning-color');
  const color = computed(() => {
    let upColor = '';
    let downColor = '';
    let upBgColor = '';
    let downBgColor = '';
    if (userStore.styleSetting == 0) {
      upColor = riseVar.value;
      downColor = fallVar.value;
      upBgColor = riseBgVar.value;
      downBgColor = fallBgVar.value;
    } else {
      upColor = riseColor1Var.value;
      downColor = fallColor1Var.value;
      upBgColor = riseBgVar.value; // 背景色色盲颜色暂定
      downBgColor = fallBgVar.value; // 背景色色盲颜色暂定
    }
    if (userStore.colorSetting != 0) {
      const temp = upColor;
      upColor = downColor;
      downColor = temp;
      const temp2 = upBgColor;
      upBgColor = downBgColor;
      downBgColor = temp2;
    }
    const cssAttr = getComputedStyle(document.querySelector('body') as HTMLElement);
    const _upColorHex = cssAttr.getPropertyValue(upColor);
    const _downColorHex = cssAttr.getPropertyValue(downColor);
    const _upColor = hexToRgb(_upColorHex);
    const _downColor = hexToRgb(_downColorHex);
    const _upBgColor = cssAttr.getPropertyValue(upBgColor);
    const _downBgColor = cssAttr.getPropertyValue(downBgColor);
    return {
      upHex: _upColorHex,
      upBgHex: _upBgColor,
      upRgb: _upColor,
      downHex: _downColorHex,
      downBgHex: _downBgColor,
      downRgb: _downColor,
    };
  });
  return computed(() => ({
    rise: `rgb(${color.value.upRgb})`,
    riseBg: color.value.upBgHex,
    riseHex: color.value.upHex,
    fall: `rgb(${color.value.downRgb})`,
    failBg: color.value.downBgHex,
    fallHex: color.value.downHex,
    equal: 'var(--color-text-1)',
  }));
  // return computed(() => {
  //   if (userStore.styleSetting == 0) {
  //     if (userStore.colorSetting == 0) {
  //       return {
  //         rise: `${riseColor.value}`,
  //         riseBg: `rgba(${riseColor.value}, 0.3)`,
  //         riseHex: riseColor.value,
  //         fall: fallColor.value,
  //         failBg: `rgba(${fallColor.value}, 0.3)`,
  //         fallHex: rgb2hex(`rgb(${fallColor.value})`),
  //         equal: 'var(--color-text-2)',
  //       };
  //     } else {
  //       return {
  //         rise: `rgb(${fallColor.value})`,
  //         riseBg: `rgba(${fallColor.value}, 0.3)`,
  //         riseHex: rgb2hex(`rgb(${fallColor.value})`),
  //         fall: `rgb(${riseColor.value})`,
  //         failBg: `rgba(${riseColor.value}, 0.3)`,
  //         fallHex: rgb2hex(`rgb(${riseColor.value})`),
  //         equal: 'var(--color-text-2)',
  //       };
  //     }
  //   } else {
  //     if (userStore.colorSetting == 0) {
  //       return {
  //         rise: `rgb(${riseColor1})`,
  //         riseBg: `rgba(${riseColor1}, 0.3)`,
  //         riseHex: rgb2hex(`rgb(${riseColor1})`),
  //         fall: `rgb(${fallColor1})`,
  //         failBg: `rgba(${fallColor1}, 0.3)`,
  //         fallHex: rgb2hex(`rgb(${fallColor1})`),
  //         equal: 'var(--color-text-2)',
  //       };
  //     } else {
  //       return {
  //         rise: `rgb(${fallColor1})`,
  //         riseBg: `rgba(${fallColor1}, 0.3)`,
  //         riseHex: rgb2hex(`rgb(${fallColor1})`),
  //         fall: `rgb(${riseColor1})`,
  //         failBg: `rgba(${riseColor1}, 0.3)`,
  //         fallHex: rgb2hex(`rgb(${riseColor1})`),
  //         equal: 'var(--color-text-2)',
  //       };
  //     }
  //   }
  // });
}

interface IRiseClassReturn {
  /**
   * @description 上涨按钮
   */
  upBtn: string;
  /**
   * @description 下跌按钮
   */
  downBtn: string;
  /**
   * @description 上涨文字颜色
   */
  upText: string;
  /**
   * @description 下跌文字颜色
   */
  downText: string;
}
/**
 * @description 涨跌色控制，基于class， 忽略具体颜色风格
 * @example views\contract-trade\components\exchange-info\base\place-order.vue
 * @returns
 */
export function useRiseClass(): Ref<IRiseClassReturn> {
  const userStore = useUserStore();
  return computed(() => {
    const type = userStore.colorSetting == 0 ? 'normal' : 'reverse';
    const isDaltonism = userStore.styleSetting == 0 ? '-undaltonism' : '-daltonism';
    return {
      upBtn: 'Ubit-btn' + '-' + type + '-up' + isDaltonism,
      downBtn: 'Ubit-btn' + '-' + type + '-down' + isDaltonism,
      upText: 'Ubit-text' + '-' + type + '-up' + isDaltonism,
      downText: 'Ubit-text' + '-' + type + '-down' + isDaltonism,
    };
  });
}
