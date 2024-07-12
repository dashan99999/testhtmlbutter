import { axiosInstance as instance1 } from '@bitunix/shared/utils/http/axios';
import { axiosInstance as instance2 } from '@bitunix/shared/utils/http/axios/request';
import * as Sentry from '@sentry/node';
export default defineNitroPlugin((nitro) => {
  const runtimeConfig = useRuntimeConfig();
  instance1.defaults.baseURL = runtimeConfig.public.VITE_BASE_URL;
  instance2.defaults.baseURL = runtimeConfig.public.VITE_BASE_URL;
  Sentry.init({
    dsn: runtimeConfig.public.VITE_SENTRY_DSN,
    environment: runtimeConfig.public.VITE_APP_TYPE,
  });
  Sentry.addBreadcrumb({
    message: 'nitro events',
  });
  Sentry.configureScope((scope) => {
    scope.setExtra('battery', 0.7);
    scope.setTag('user_mode', 'admin');
  });
  nitro.hooks.hook('error', async (err, { event }) => {
    console.error(event?.path, err);
    Sentry.captureException(err);
  });
});
