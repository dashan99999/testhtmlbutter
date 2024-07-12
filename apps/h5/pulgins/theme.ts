export function ViteThemeTransformPlugin() {
  return {
    name: 'vite-theme-transform-plugin',
    async transform(code: string, id: string) {
      if (id.includes('@arco-themes/vue-h5-bitunix/theme.css')) {
        return {
          code: code
            .replace(/body\s*\{/gm, ':root:root{')
            .replace(/body\[arco-theme=(\'|\")?dark(\'|\")?\]\s*\{/gm, `:root:root[bx-theme=dark],:root:root[bx-theme=dark] body {`)
            .replace(/font\-family:.*?(;)?\}/, '}'),
          map: null,
        };
      }
      if (id.includes('/iconfont/iconfont.css')) {
        return {
          code: code
            .replace(/font-size:.*?;/gm, ``)
            .replace(/format\(('|")?truetype('|")?\)(;)?/, `format('truetype');font-display: swap;`),
          map: null,
        };
      }
    },
  };
}
