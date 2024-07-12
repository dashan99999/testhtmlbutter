// dsbridge 与 App通讯交互,已引入到app.vue,将需要在app端展示页面的path填进去
import { useUserStore, useAppStore } from '#shared/store/index';
import { useToken } from '#shared/utils/auth';
import useBridge from '#shared/utils/dsbridge';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { APP_ROUTES } from '../constants';

export const useCommunication = () => {
  const route = useRoute();
  const appStore = useAppStore();
  const isMobile = ref<boolean>(false);
  const appInfo = ref<AppIfoType>();
  const appToken = ref<string>();
  const token = useToken();
  if (process.client) {
    isMobile.value = getUserAgent();
    if (!APP_ROUTES.some((it) => route.path.endsWith(it))) {
      return;
    }
    // 同步获取AppInfo
    const infoMsg = useBridge.syncMethod('getAppInfo', ''); // 获取AppInfo
    // 同步获AppToken
    const tokenMsg = useBridge.syncMethod('getAppToken', ''); // 获AppToken
    const infoObj = eval('(' + infoMsg + ')');
    const tokenObj = eval('(' + tokenMsg + ')');
    console.warn(infoMsg, '同步获取info------');
    console.warn(tokenMsg, '同步获取token------');
    if (!isMobile.value || !infoMsg) {
      appStore.embedded = false;
      return;
    }
    appStore.embedded = true;
    console.log('App端操作');
    // 获取info后修改全局登陆状态
    if (infoObj && infoObj.data) {
      appInfo.value = infoObj.data as AppIfoType;
    }
    // 获取token后修改全局登陆状态
    if (tokenObj && tokenObj.data && tokenObj.data.token) {
      appToken.value = tokenObj.data.token;
      token.value = appToken.value as string;
      useUserStore().info();
    } else {
      token.value = '';
    }

    // 注册方法供App获取信息
    useBridge.registerMethod('getWebInfo', () => {
      const params = {
        title: useRoute().meta.title,
      };
      return JSON.stringify(params);
    });
  }
  return { appInfo };
};

interface AppIfoType {
  platform: string; //android || ios
  theme: string; // dark || light
  network: string; // wifi;
  isLogin: boolean;
  language: string;
}

function getUserAgent() {
  let isMobile = false;
  const sUserAgent: any = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
  const bIsMidp = sUserAgent.match(/midp/i) == 'midp';
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
  const bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
  const bIsAndroid = sUserAgent.match(/android/i) == 'android';
  const bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
  const bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    isMobile = true;
  }
  return isMobile;
}
