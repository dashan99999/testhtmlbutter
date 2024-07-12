/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import { PluginOption } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { VueUseComponentsResolver, VantResolver, ArcoResolver } from 'unplugin-vue-components/dist/resolvers.mjs';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { ViteChunkSplitPlugin } from './chunk';
import { ViteThemeTransformPlugin } from './theme';

export function createVitePlugins(env: Record<string, any>) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    AutoImport({ resolvers: [ArcoResolver()], dts: path.resolve(__dirname, '../src/types/autoimport.d.ts') }),
    Components({
      dirs: [], // 指定公共组件模块。自动引入声明类型
      extensions: ['vue'],
      deep: true,
      dts: path.resolve(__dirname, '../src/types/vant.d.ts'),
      directoryAsNamespace: false,
      globalNamespaces: [],
      directives: true,
      importPathTransform: (v) => v,
      allowOverrides: false,
      resolvers: [
        VueUseComponentsResolver(),
        VantResolver({
          importStyle: 'css',
        }),
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    ViteChunkSplitPlugin(),
    ViteThemeTransformPlugin(),
  ];
  if (env.VITE_SENTRY_DSN) {
    vitePlugins.push(
      sentryVitePlugin({
        org: 'sentry',
        project: env.VITE_SENTRY_PROJECT,
        authToken: env.VITE_SENTRY_TOKEN,
        release: {},
        url: env.VITE_SENTRY_URL,
      }),
    );
  }

  return vitePlugins;
}
