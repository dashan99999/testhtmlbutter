import type { App } from 'vue';
import type { DirectiveBinding } from 'vue';
import { toThousands } from '@bitunix/shared/utils/maths';
const fillNumber = (val: number, len: number, side: 1 | -1): string => {
  const numval = Number(val);
  if (isNaN(numval)) return '0';
  const str = val.toString();
  if (str.indexOf('.') > -1) {
    const numArr = str.split('.');
    if (numArr[1].length > len) {
      const tempnum = numval * Math.pow(10, len);
      if (!side) {
        return Number(val).toFixed(len);
      } else if (side === 1) {
        if (tempnum < 1) return (1 / Math.pow(10, len)).toString();
        return (Math.ceil(tempnum) / Math.pow(10, len)).toFixed(len);
      } else if (side === -1) {
        return (Math.floor(tempnum) / Math.pow(10, len)).toFixed(len);
      } else {
        return val.toFixed(len);
      }
    } else {
      return Number(str).toFixed(len);
    }
  } else {
    return Number(val).toFixed(len);
  }
};
export default function numDireactive(app: App) {
  /**
   * @description 三个数字添加逗号
   * @author zengwei
   */
  app.directive('num', {
    mounted(el: HTMLElement, binding: DirectiveBinding<string | number>) {
      if (binding.value === undefined || binding.value === null) {
        el.innerText = '';
        return;
      }
      if (isNaN(Number(binding.value))) {
        el.innerText = String(binding.value);
      }
      const value = Number(binding.value);
      const subfix = el.getAttribute('subfix') || '';
      const pre = el.getAttribute('pre') || '';
      const len = !isNaN(Number(el.getAttribute('len'))) ? Number(el.getAttribute('len')) : 0;
      const fill = el.getAttribute('fill') || 'false';
      const rise = el.getAttribute('rise') || '';
      const _val = fill === 'true' ? fillNumber(Number(value), len, -1) : String(value);
      let innerText = pre + toThousands(_val) + subfix;
      if (rise) {
        if (value === 0) {
          el.classList.remove('color-text-success-6-48da5f67', 'color-text-danger-6-5fde9113');
          el.classList.add('color-text-2-b307717f');
        } else if (value > 0) {
          el.classList.remove('color-text-2-b307717f', 'color-text-danger-6-5fde9113');
          el.classList.add('color-text-success-6-48da5f67');
          innerText = '+' + innerText;
        } else {
          el.classList.remove('color-text-2-b307717f', 'color-text-success-6-48da5f67');
          el.classList.add('color-text-danger-6-5fde9113');
          innerText = innerText;
        }
      }
      el.innerText = innerText;
    },
  });
  return app;
}

// <style lang="less">
//   .color-text-2-b307717f {
//     color: var(--color-text-2);
//   }
//   .color-text-success-6-48da5f67 {
//     color: rgb(var(--success-6));
//   }
//   .color-text-danger-6-5fde9113 {
//     color: rgb(var(--danger-6));
//   }
// </style>
