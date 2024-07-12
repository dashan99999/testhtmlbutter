// dsbridge 与 App通讯交互,已引入到app.vue,将需要在app端展示页面的path填进去
import { useUserStore, useAppStore } from '#shared/store/index';
import useBridge from '@bitunix/shared/utils/dsbridge';
import { APP_ROUTES } from '@bitunix/shared/constants';
import { useToken } from '@bitunix/shared/utils/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $i18n } = useNuxtApp();
  if (APP_ROUTES.some((it) => to.path.includes(it))) {
    const appStore = useAppStore();
    const token = useToken();
    if (!to.path.includes('/browser')) {
      setPageLayout(false as any);
    }
    if (process.client) {
      // 同步获取AppInfo
      const infoMsg = useBridge.syncMethod('getAppInfo', ''); // 获取AppInfo
      // 同步获AppToken
      const tokenMsg = useBridge.syncMethod('getAppToken', ''); // 获AppToken
      const infoObj = eval('(' + infoMsg + ')');
      const tokenObj = eval('(' + tokenMsg + ')');
      if (!to.meta.script) {
        to.meta.script = {};
      }
      to.meta.script.gt4 = !!infoObj ? false : undefined;
      appStore.embedded = !!infoObj;
      if (infoObj?.theme) {
        appStore.theme = infoObj.theme;
      }
      // 获取token后修改全局登陆状态
      if (tokenObj && tokenObj.data && tokenObj.data.token) {
        token.value = tokenObj.data.token;
        useUserStore().info();
      } else if (appStore.embedded) {
        token.value = '';
      }

      // 注册方法供App获取信息
      useBridge.registerMethod('getWebInfo', () => {
        const params = {
          title: to.meta.title,
        };
        return JSON.stringify(params);
      });

      if (to.path.includes('/browser') && appStore.embedded) {
        return navigateTo({ path: to.path.replace('/browser', ''), query: to.query, params: to.params }, { external: true });
      }
      if (!to.path.includes('/browser') && !appStore.embedded) {
        const localePrefix = $i18n.locale.value === 'en-us' ? '' : `/${$i18n.locale.value}`;
        let npath = to.path;
        if (localePrefix) {
          npath = npath.replace(localePrefix, `${localePrefix}/browser`);
        } else {
          npath = `/browser${npath}`;
        }
        return navigateTo({ path: npath, query: to.query, params: to.params }, { external: true });
      }
    }
  }
});
