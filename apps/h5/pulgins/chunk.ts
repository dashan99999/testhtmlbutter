import type { UserConfig } from 'vite';
import { walk } from 'estree-walker';
export function ViteChunkSplitPlugin() {
  return {
    name: 'vite-chunk-split-plugin',
    enforce: 'post',
    apply: 'build',
    transform(code: string, id: string, opts: any) {
      if (id.includes('.nuxt/routes.mjs') && !opts?.ssr) {
        const ast = (this as any).parse(code);
        const arr: { name: any; path: any; component: any; variable: any; i18nRoute: boolean }[] = [];
        const locales: any[] = [];
        walk(ast, {
          enter(node: any) {
            if (node.type === 'ArrayExpression' && node.elements) {
              node.elements.forEach((it: any) => {
                if (it && it.type === 'ObjectExpression' && it.properties) {
                  const target: any = it.properties.find((p: any) => p.key.name === 'name');
                  const isDefault = target?.value.right.value.endsWith('___en-us');
                  const locale = target.value.right.value.split('___')[1];
                  locale && locales.push(locale);
                  const obj: any = {
                    name: target.value.right.value.replace(/___.*$/gm, ''),
                    path: it.properties.find((p: any) => p.key.name === 'path')?.value.right.value,
                    component: it.properties.find((p: any) => p.key.name === 'component')?.value.body.callee.object.source.value,
                    variable: target.value.left.expression.object.name,
                  };
                  if (isDefault) {
                    obj.i18nRoute = true;
                    arr.push(obj);
                  } else if (!target?.value.right.value.includes('___')) {
                    obj.i18nRoute = false;
                    arr.push(obj);
                  }
                }
              });
              this.skip();
            }
          },
        });
        let codeStr = `
          const locales = ${JSON.stringify(Array.from(new Set(locales)))};
          const routes = [
        `;
        arr.forEach((route) => {
          codeStr += `
            {
              name: "${route.name}",
              path: "${route.path}",
              component: () => import("${route.component}").then(m => m.default || m),
              i18nRoute: ${route.i18nRoute},
              context: ${route.variable},
            },
          `;
        });
        codeStr += `
          ];
          const getLocaleRoutes = () => {
            let arr = [];
            for(let locale of locales) {
              const prefix = locale === 'en-us' ? '' : '/'+locale;
              for(let route of routes) {
                if (locale !== 'en-us' && !route.i18nRoute) {
                  continue;
                }
                arr.push({
                  name: (route.context?.name ?? route.name) + '___' + locale,
                  path: prefix + (route.context?.path ?? route.path),
                  meta: route.context?.meta || route.context || {},
                  redirect: route.context?.redirect || undefined,
                  alias: route.context?.alias || [],
                  component: route.component,
                });
              }
            }
            return arr;
          }
          const _routes = getLocaleRoutes();
          export default _routes;
        `;
        const codeText = code.replace(/export\s+default\s+\[(.|\n|\r)*\]/gm, codeStr);
        return {
          code: codeText,
          ast: (this as any).parse(codeText),
          map: null,
        };
      }
    },
    config(config: UserConfig) {
      if (!config.build) {
        config.build = {};
      }
      if (!config.build.rollupOptions) {
        config.build.rollupOptions = {};
      }
      if (!config.build.rollupOptions.output) {
        config.build.rollupOptions.output = {};
      }
      if (!Array.isArray(config.build.rollupOptions.output)) {
        config.build.rollupOptions.output.manualChunks = (id, context) => {
          const info = context.getModuleInfo(id);
          if (id.includes('src/pages/index') && id.includes('lang.less')) {
            return 'home';
          }
          if (/src\/assets\/locale\/en\-us\//.test(id)) {
            return 'locale-fallback';
          }
          if (/src\/assets\/locale\/[\w\d_\-]+\/common\.json/.test(id)) {
            return 'locale-common';
          }
          if (id.includes('src/assets/locale')) {
            const result = /([\w\d_\-]+)\/([\w\d_\-]+)\.json/gm.exec(id);
            if (result && result[1] && result[2]) {
              return `${result[1]}-${result[2]}`;
            }
          }
          if (
            info?.isEntry ||
            id.includes('/nuxt-link/') ||
            id.includes('/client-only/') ||
            id.includes('src/layouts/default.vue') ||
            id.includes('src/components/SvgIcon') ||
            id.includes('/vant/es/field/style') ||
            id.includes('src/components/Footer') ||
            (id.includes('src/components/HeaderMobile') && id.includes('lang.less'))
          ) {
            return 'entry';
          }
        };
      }
    },
  };
}
