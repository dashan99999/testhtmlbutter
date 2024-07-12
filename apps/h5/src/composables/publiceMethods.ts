/**
 * @description style中数值转rem
 * @param 数值
 * @example  :style="{width: px2rem('23px')}"
 */
export function px2rem(px: string): string {
  if (/%/gi.test(px) || /vw/gi.test(px)) {
    return px;
  } else {
    return parseFloat(px) * (100 / 750) + 'vw';
  }
}
