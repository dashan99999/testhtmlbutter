// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from 'vite';
import * as path from 'path';
import * as fs from 'fs';
import { defineNuxtConfig } from 'nuxt/config';
import { createVitePlugins } from './pulgins';
import postcss from './postcss.config';
import type { NuxtPage } from 'nuxt/schema';
import { PrefixEnum as API_PREFIX_ENUMS } from '@bitunix/shared/utils/http/axios/prefix';
import { APP_ROUTES } from '@bitunix/shared/constants';

const getLocales = () => {
  const localePath = path.resolve(__dirname, 'src/assets/locale');
  if (fs.existsSync(localePath)) {
    const result = fs.readdirSync(localePath);
    return result as string[];
  }
  return [];
};

const LOCALE_OPTIONS = getLocales();
const locales = LOCALE_OPTIONS.map((it) => {
  return {
    code: it.toLocaleLowerCase(),
    iso: it,
  };
});
const APP_TYPE = process.env.APP_TYPE ?? 'development';
const env = loadEnv(APP_TYPE, path.resolve(__dirname, '../../'));

const basePagePath = path.resolve(__dirname, 'src/pages');
const getRoutes = (dir: string) => {
  const dirs = fs.readdirSync(dir);
  const list: string[] = [];
  for (const item of dirs) {
    const tp = path.join(dir, item);
    if (fs.statSync(tp).isDirectory() && !/components|future-components|sub-components|\.ts$/.test(tp)) {
      list.push(...getRoutes(tp));
    } else if (/\.vue$/.test(tp)) {
      list.push(tp);
    }
  }
  return list;
};

const getCacheRouteRules = () => {
  const rules: Record<string, any> = {};
  if (!env.VITE_LOCAL) {
    const routes = getRoutes(basePagePath);
    for (const item of routes) {
      const key = item
        .replace(/(index)?(\/index\.vue)|(\.vue)$/g, '')
        .replace(basePagePath, '')
        .replace(/\/\[.+$/g, '/**');
      LOCALE_OPTIONS.forEach((prefix) => {
        const rkey = `${prefix === 'en-us' ? '' : `/${prefix}`}${key === '/' ? '' : key}`;
        rules[rkey || '/'] = {
          swr: 300,
        };
      });
    }
  }
  return rules;
};
type EnumKey = keyof typeof API_PREFIX_ENUMS;
export function getNuxtClientProxy(baseURL: string) {
  const proxyUrls: any = {};
  for (const key in API_PREFIX_ENUMS) {
    if (Object.prototype.hasOwnProperty.call(API_PREFIX_ENUMS, key)) {
      proxyUrls[API_PREFIX_ENUMS[key as EnumKey]] = {
        target: `${baseURL + API_PREFIX_ENUMS[key as EnumKey]}`,
        changeOrigin: true,
      };
    }
  }
  console.log('proxyUrls==>', proxyUrls);
  return proxyUrls;
}
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    vscode: { enabled: true },
    timeline: {
      enabled: true,
    },
  },
  sourcemap: { server: false, client: process.env.NODE_ENV !== 'development' },
  app: {
    pageTransition: {
      appear: true,
      name: 'fade',
      mode: 'out-in',
    },
    layoutTransition: false,
    rootId: '__bitunix_h5',
    buildAssetsDir: 'h5-assets',
  },
  srcDir: 'src/',
  runtimeConfig: {
    public: {
      ...env,
      VITE_LOCALE_OPTIONS: LOCALE_OPTIONS,
      VITE_APP_TYPE: APP_TYPE,
    },
  },
  build: {
    transpile: ['vant', '@vant/use', ...(process.env.NODE_ENV === 'development' ? [] : ['@arco-design/web-vue'])],
  },
  debug: APP_TYPE === 'development',
  typescript: {
    shim: false,
    strict: true,
    includeWorkspace: true,
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        verbatimModuleSyntax: false,
      },
    },
  },
  css: [
    '@arco-themes/vue-h5-bitunix/theme.css',
    path.resolve(__dirname, './src/assets/styles/index.less'),
    path.resolve(__dirname, './src/assets/iconfont/iconfont.css'),
  ],
  vite: {
    mode: APP_TYPE,
    envDir: path.resolve(__dirname, '../../'),
    vue: {},
    vueJsx: {
      mergeProps: true,
    },
    css: {
      devSourcemap: false,
      postcss: postcss as any,
    },
    esbuild: {
      drop: APP_TYPE === 'production' ? ['console', 'debugger'] : [],
      tsconfigRaw: {
        compilerOptions: {
          target: 'esnext',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /#shared/,
          replacement: path.resolve(__dirname, '../../packages/shared'),
        },
      ],
    },
    plugins: createVitePlugins(env),
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: true,
      'process.env': {
        ...env,
        NODE_ENV: process.env.NODE_ENV,
      },
    },
    build: {
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        treeshake: {
          manualPureFunctions: ['console.log', 'console.error', 'console.warn', 'console.table'],
        },
        output: {
          experimentalMinChunkSize: 1,
        },
      },
    },
  },
  modules: ['@unocss/nuxt', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image', '@nuxt/devtools', 'nuxt-simple-sitemap', '@vite-pwa/nuxt'],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
  image: {
    format: ['webp'],
    quality: 80,
  },
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
    },
    disable: false,
    workbox: {
      globPatterns: [],
      navigateFallback: null,
      runtimeCaching: [
        {
          urlPattern: /\/h5-assets\/.*\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'bitunix-sw-images',
            expiration: {
              maxEntries: 50,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\/(h5-static|_ipx|h5-assets)\/.*\.(?:woff2)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'bitunix-sw-font',
            expiration: {
              maxEntries: 50,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\/(h5-static|_ipx)\/.*\.(?:png|jpg|jpeg|svg|webp)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'bitunix-sw-static',
            expiration: {
              maxEntries: 50,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\/h5-assets\/.*\.js.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'bitunix-sw-js',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\/h5-assets\/.*\.css.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'bitunix-sw-css',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    manifest: {
      name: 'Ubit',
      short_name: 'Ubit',
      background_color: '#121212',
      theme_color: '#121212',
      display: 'standalone',
      description: 'games',
      icons: [
        {
          src: `${env.VITE_HOST}/h5-static/icon-192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: `${env.VITE_HOST}/h5-static/icon.png`,
          sizes: '512x512',
          type: 'image/png',
        },
        {
          purpose: 'maskable',
          src: `${env.VITE_HOST}/h5-static/icon-192.png`,
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      screenshots: [
        {
          src: `${env.VITE_HOST}/h5-static/startup.png`,
          sizes: '586x1043',
          type: 'image/png',
        },
      ],
      scope: '/',
      prefer_related_applications: true,
      related_applications: [
        {
          id: 'com.bitunix.android',
          platform: 'chromeos_play',
          url: 'https://play.google.com/store/apps/details?id=com.bitunix.android',
        },
      ],
      launch_handler: {
        client_mode: 'navigate-existing',
      },
    },
  },
  i18n: {
    defaultLocale: 'en-us',
    types: 'composition',
    lazy: false,
    locales,
    compilation: {
      strictMessage: false,
    },
    //langDir: './assets/locale/',
    dynamicRouteParams: true,
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: false,
    baseUrl: env.VITE_HOST,
  },
  imports: {
    // presets: [
    //   {
    //     from: 'vue-i18n',
    //     imports: ['useI18n'],
    //   },
    // ],
  },
  alias: {
    '#shared': path.resolve(__dirname, '../../packages/shared'),
    'nuxt/schema': '@nuxt/schema',
  },
  components: [{ path: '~/components', pathPrefix: false, extensions: ['vue'] }],
  spaLoadingTemplate: false,
  routeRules: env.VITE_LOCAL
    ? {}
    : {
        ...getCacheRouteRules(),
        '/h5-assets/**': { headers: { 'cache-control': 'max-age=31536000,public,s-maxage=31536000' } },
        '/h5-static/**': { headers: { 'cache-control': 'max-age=0' } },
        '/externals/**': { headers: { 'cache-control': 'max-age=0' } },
        '/charting_library/**': { headers: { 'cache-control': 'max-age=0' } },
        '/sw.js': { headers: { 'cache-control': 'no-cache' } },
        '/_ipx/**': { headers: { 'cache-control': 'max-age=0' } },
      },
  nitro: {
    devProxy: {
      ...getNuxtClientProxy(env.VITE_BASE_URL),
    },
    plugins: ['./plugins/nitro.ts'],
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt', '/apple-app-site-association'],
    },
    esbuild: {
      options: {
        target: 'esnext',
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
            verbatimModuleSyntax: false,
          },
        },
      },
    },
  },
  site: {
    url: env.VITE_HOST,
  },
  sitemap: {
    sources: ['/api/sitemap'],
  },
  hooks: {
    'pages:extend'(pages: NuxtPage[]) {
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = [];
        const appPages: NuxtPage[] = [];
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page);
          } else {
            if (APP_ROUTES.some((it) => page.path.includes(it))) {
              appPages.push({
                ...page,
                name: `browser-${page.name}`,
                path: `/browser${page.path}`,
              });
            }
            removePagesMatching(pattern, page.children);
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1);
        }
        pages.splice(pages.length - 1, 0, ...appPages);
      }
      removePagesMatching(/components|future-components|sub-components|\.ts$/, pages);
    },
    'build:manifest'(manifest) {
      for (const key in manifest) {
        const target = manifest[key];
        target.dynamicImports = [];
        if (target.mimeType === 'image/svg+xml') {
          target.prefetch = false;
        }
      }
    },
  },
  experimental: {
    writeEarlyHints: false,
    watcher: 'parcel',
    inlineSSRStyles: false,
    treeshakeClientOnly: true,
  },
});
