import { useUserStore } from '@bitunix/shared/store';
import { useToken } from '@bitunix/shared/utils/auth';
export default defineNuxtRouteMiddleware(async (to) => {
  const { $pinia, $i18n } = useNuxtApp();
  const userStore = useUserStore($pinia);
  const token = useToken();
  const locale = $i18n.locale.value;
  const lpath = locale === 'en-us' ? '' : `/${locale}`;
  if (process.client) {
    if (
      token.value &&
      (to.path.startsWith(`${lpath}/login`) || (to.path.startsWith(`${lpath}/register`) && !to.path.includes('registerSuccess')))
    ) {
      return navigateTo(lpath);
    } else if (!token.value && to.meta.auth) {
      token.value = '';
      await userStore.logout();
      return navigateTo(
        {
          path: `${lpath}/login`,
          query: { redirect: to.path.replace(`${lpath}`, ''), ...to.query },
        },
        { external: true },
      );
    }
  }
});
