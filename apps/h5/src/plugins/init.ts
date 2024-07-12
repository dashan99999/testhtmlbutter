import numDireactive from '../components/num-direactive';
import SignUpDirective from '../directive/defaultImg';
import persistedstate from 'pinia-plugin-persistedstate';
import { install as initAxiosBackup } from '@bitunix/shared/utils/http/axios';
import { init as initAxios } from '@bitunix/shared/utils/http/axios/request';
import { Lazyload } from 'vant';
import useBridge from '@bitunix/shared/utils/dsbridge';
import debounce from 'lodash.debounce';
import errorImage from '@/assets/images/default-icon.png';
import * as Sentry from '@sentry/vue';
export default defineNuxtPlugin({
  name: 'nuxt-init',
  enforce: 'post',
  setup({ vueApp }) {
    const config = useRuntimeConfig();
    if (process.client) {
      if (config.public.VITE_SENTRY_DSN) {
        Sentry.init({
          app: vueApp,
          dsn: config.public.VITE_SENTRY_DSN as string,
          tracesSampleRate: 1.0,
          environment: config.public.VITE_APP_TYPE as string,
          integrations: [
            new Sentry.Breadcrumbs({
              console: false,
            }),
            new Sentry.BrowserTracing(),
            new Sentry.Replay(),
          ],
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
        });
      }
      vueApp.$nuxt.$pinia.use(persistedstate);
      const token = useCookie(import.meta.env.VITE_TOKEN);
      const logout = debounce((path: string) => {
        const localeVlaue = 'en-us' || vueApp.$nuxt.$i18n.locale.value;
        const locale = localeVlaue === 'en-us' ? '' : `/${localeVlaue}`;
        token.value = '';
        const infoMsg = useBridge.syncMethod('getAppInfo', '');
        const infoObj = eval('(' + infoMsg + ')');
        if (!infoObj) {
          navigateTo(
            {
              path: `${locale}${path}`,
              query: {
                redirect: vueApp.$nuxt.$router.currentRoute.value.path.replace(locale, ''),
              },
            },
            { external: true },
          );
        }
      });
      initAxios(logout);
      initAxiosBackup(logout);
    }
    vueApp.use(Lazyload, {
      listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
      error: errorImage,
      lazyComponent: true,
    });
    numDireactive(vueApp);
    SignUpDirective(vueApp);
    vueApp.$nuxt.hook('app:error', (error) => {
      console.error(error);
      if (config.public.VITE_SENTRY_DSN) {
        Sentry.captureException(error);
      }
    });

    vueApp.$nuxt.hook('vue:error', (error: any) => {
      const localePath = useLocalePath();
      Sentry.captureException(error);
      if (error?.statusCode === 404) {
        clearError({ redirect: localePath('/') });
      } else if (error?.data?.code == '503') {
        if (!vueApp.$nuxt.$router.currentRoute.value?.path.includes('/tips')) {
          navigateTo(
            {
              path: '/tips',
              query: {
                time: btoa(error?.data?.data),
              },
            },
            { external: true },
          );
        }
      } else {
        clearError();
      }
    });
    vueApp.$nuxt.hook('app:created', () => {
      const { resolving } = useTransState();
      resolving.value = true;
    });
    // vueApp.$nuxt.hook('page:transition:finish', () => {
    //   const trans = useTransState();
    //   trans.value = false;
    // });
    // vueApp.$nuxt.hook('page:start', () => {
    //   const trans = useTransState();
    //   trans.value = true;
    // });
    vueApp.$nuxt.hook('app:suspense:resolve', () => {
      const { resolving } = useTransState();
      resolving.value = false;
    });
  },
});
