// unocss 便捷样式维护工具库，推荐搭配vscode 同名插件使用
// https://uno.antfu.me/ 预设样式查询地址
import { defineConfig, presetAttributify, presetUno } from 'unocss';
import * as fs from 'fs';
import * as path from 'path';

function loadIcons() {
  const basePath = path.resolve(__dirname, './src/assets/icons/svg');
  const names = fs.readdirSync(basePath);
  const obj: Record<string, any> = {};
  names.forEach((name) => {
    const con = fs.readFileSync(path.join(basePath, name));
    const isSingle = con.includes('currentColor');
    obj[name.replace('.svg', '')] = isSingle ? 1 : 2;
  });
  return obj;
}
const icons = loadIcons();
export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', '.git', '.github', '.husky', '.vscode', 'build', 'dist', 'mock', 'public', './stats.html'],
    },
  },
  presets: [presetUno(), presetAttributify()],
  shortcuts: [],
  rules: [
    [/^fs-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ 'font-size': `${d}px` })],
    [/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ 'line-height': `${d}px` })],
    [/^h-calc100-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `calc(100% - ${d}px)` })],
    [
      /^bx-bg-/,
      (cls) => {
        const value = cls.input!.replace('bx-bg-', '');
        return { 'background-color': `var(--bx-${value})` };
      },
    ],
    [
      /^bg-color-/,
      (cls) => {
        const value = cls.input!.replace('bg-color-', '');
        return { 'background-color': `var(--${value})` };
      },
    ],
    [
      /^bx-color-/,
      (cls) => {
        const value = cls.input!.replace('bx-color-', '');
        return { color: `var(--bx-${value})` };
      },
    ],
    [
      /^color-text-/,
      (cls) => {
        const value = cls.input!.replace('color-text-', '');
        return { color: `var(--color-text-${value})` };
      },
    ],
    [
      /^text-color-/,
      (cls) => {
        const value = cls.input!.replace('text-color-', '');
        return { color: `var(--${value})` };
      },
    ],
    [
      /^color-bg-/,
      (cls) => {
        const value = cls.input!.replace('color-bg-', '');
        if (!value) {
          return {
            'background-color': `var(--color-bg)`,
          };
        }
        return {
          'background-color': `var(--color-bg-${value})`,
        };
      },
    ],
    [
      /^color-fill-/,
      (cls) => {
        const value = cls.input!.replace('color-fill-', '');
        if (!isNaN(Number(value))) {
          return { 'background-color': `var(--color-fill-${value})` };
        }
        return {
          'background-color': `rgb(var(--${value}))`,
        };
      },
    ],
    [
      /^b-r/,
      (cls) => {
        const value = cls.input!.replace('b-r', '');
        return {
          'border-radius': value + 'px',
        };
      },
    ],
    [
      /^flex-(row|col)-(start|end|between|around|center|evenly)-(start|end|center|baseline|stretch)/,
      (cls) => {
        const value = cls.input!.replace('flex-', '').split('-');
        const style: any = {
          display: 'flex',
        };
        if (value[0] === 'row') {
          style['flex-direction'] = 'row';
        } else {
          style['flex-direction'] = 'column';
        }
        if (value[1] === 'start') {
          style['justify-content'] = 'flex-start';
        }
        if (value[1] === 'end') {
          style['justify-content'] = 'flex-end';
        }
        if (value[1] === 'center') {
          style['justify-content'] = 'center';
        }
        if (value[1] === 'between' || value[1] === 'around' || value[1] === 'evenly') {
          style['justify-content'] = 'space-' + value[1];
        }
        if (value[2] === 'end' || value[2] === 'start') {
          style['align-items'] = 'flex-' + value[2];
        } else {
          style['align-items'] = value[2];
        }
        return style;
      },
    ],
    [
      /^fvn-(number|text|en)$/,
      (cls) => {
        const value = cls.input!.replace('fvn-', '');
        if (value === 'number') {
          return {
            'font-variant-numeric': 'tabular-nums',
          };
        }
      },
    ],
    [
      /fm-(normal|medium|bold)$/,
      ([, val]) => {
        const family: any = {
          normal: {
            fw: 400,
            fm: 'HarmonyOS_Sans_Regular',
          },
          medium: {
            fw: 500,
            fm: 'HarmonyOS_Sans_Medium',
          },
          bold: {
            fw: 700,
            fm: 'HarmonyOS_Sans_Bold',
          },
        };
        return {
          'font-weight': family[val].fw,
          'font-family': family[val].fm,
        };
      },
    ],
    [
      /^text-(nowrap)$/,
      () => {
        return {
          'white-space': 'nowrap',
        };
      },
    ],
    [
      /^bd-/,
      (cls) => {
        const value = cls.input!.replace('bd-', '');
        return {
          border: `solid 1px var(--bx-${value})`,
        };
      },
    ],
    [
      /^brd-(all|top|right|bottom|left)-/,
      (cls) => {
        const pattern = /^.*?(?=-)/;
        const pattern2 = /-(.*)/;
        const value = cls.input!.replace('brd-', '');
        const firstVal = pattern.exec(value);
        const lastVal = pattern2.exec(value);
        const resetLastVal = lastVal![1].indexOf('#') > -1 ? lastVal![1] : `var(--${lastVal![1]})`;
        if (firstVal && resetLastVal && firstVal[0] === 'all') {
          return {
            border: `solid 1px ${resetLastVal}`,
          };
        }
        if (firstVal && resetLastVal) {
          return { [`border-${firstVal[0]}`]: `solid 1px ${resetLastVal}` };
        }
      },
    ],
    [
      /bx-icon:.+/,
      (cls) => {
        const name = cls.input!.replace('bx-icon:', '');
        const attr = {
          'background-repeat': 'no-repeat',
          'background-size': '100% 100%',
          width: '32px',
          height: '32px',
        };
        if (icons[name]) {
          if (icons[name] === 1) {
            Object.assign(attr, {
              'background-color': 'currentColor',
              '--bi-icon': `url(~/assets/icons/svg/${name}.svg)`,
              mask: 'var(--bi-icon) no-repeat',
              'mask-size': '100% 100%',
              '-webkit-mask-size': '100% 100%',
            });
          } else {
            Object.assign(attr, {
              'background-image': `url(~/assets/icons/svg/${name}.svg)`,
            });
          }
        }
        return attr;
      },
    ],
  ],
  postprocess(util) {
    util.entries.forEach((i) => {
      const value = i[1] as string;
      if (/^\d+(px)?,\d+(px)?/.test(value)) {
        i[1] = value
          .split(',')
          .map((it) => {
            const v = Number(it.replace('px', ''));
            return (v * (100 / 750)).toFixed(5) + 'vw';
          })
          .join(' ');
        return;
      }
      if (value && typeof value === 'string') {
        const num = Number(value.replace(/(px|rem)/, ''));
        if (value.endsWith('rem')) {
          i[1] = `${(num * 4 * (100 / 750)).toFixed(5)}vw`;
        } else if (value.endsWith('px')) {
          i[1] = `${(num * (100 / 750)).toFixed(5)}vw`;
        }
      }
    });
  },
});
