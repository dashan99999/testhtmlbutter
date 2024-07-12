import { useAppStore } from '#shared/store';
import useBridge from '@bitunix/shared/utils/dsbridge';

export default defineNuxtRouteMiddleware(async (to) => {
  const appStore = useAppStore();
  const locale = useCookie(import.meta.env.VITE_CACHE_LANG);
  if (process.client) {
    const infoMsg = useBridge.syncMethod('getAppInfo', ''); // 获取AppInfo
    const infoObj = eval('(' + infoMsg + ')');
    if (appStore.embedded) {
      let language = infoObj.data.language.toLowerCase().replace('_', '-');
      if (language === 'en-us') {
        language = '';
      } else {
        language = `/${language}`;
      }
      if (!to.path.includes(language)) {
        locale.value = language || 'en-us';
        return navigateTo(
          {
            path: `${language}${to.path}`,
          },
          { external: true },
        );
      }
    }
  }
});
