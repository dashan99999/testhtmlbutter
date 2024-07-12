import Cookies from 'js-cookie';
const TokenKey = import.meta.env.VITE_TOKEN;
const TokenPrefix = 'Bearer ';
const isLogin = () => {
  return !!Cookies.get(TokenKey);
};
/**
 * 极验语言map
 */
const jiyanlangMap = {
  'zh-cn': 'zho',
  'en-us': 'eng',
  'zh-tw': 'zho-tw',
};
export const useToken = () => {
  const token = useCookie(TokenKey);
  return token;
};

export const getToken = () => {
  return Cookies.get(TokenKey);
};

export type GraphicVerificationType =
  | 'close'
  | {
      lot_number: string;
      captcha_output: string;
      pass_token: string;
      gen_time: string;
    };

const graphicVerification = (
  params: { captchaId: string; hideBar?: string[] } = { captchaId: '', hideBar: ['close'] },
): Promise<GraphicVerificationType> => {
  const { $i18n }: any = useNuxtApp();
  return new Promise((resolve) => {
    initGeetest4(
      {
        captchaId: params.captchaId,
        product: 'bind',
        rem: 1,
        hideBar: params.hideBar,
        language: jiyanlangMap[$i18n.locale._value] || 'eng',
        mask: {
          outside: false,
        },
      },
      function (captchaObj) {
        captchaObj
          .onReady(function () {
            //验证码ready之后才能调用showCaptcha方法显示验证码
            captchaObj.showCaptcha();
          })
          .onSuccess(function () {
            // 验证完毕之后，获取二次验证信息返回
            resolve(captchaObj.getValidate());
            captchaObj.reset();
          })
          .onError(function () {
            console.log('error');
          })
          .onClose(() => {
            resolve('close');
          });
      },
    );
  });
};

// 常用设备登录部分
export const getLoginHistory = (key: string) => {
  const loginHistoryStr = localStorage.getItem('loginHistory');
  let loginHistory = {};
  if (typeof loginHistoryStr === 'string') {
    try {
      loginHistory = JSON.parse(loginHistoryStr as string);
    } catch (e) {
      console.error(e);
      return '';
    }
    return loginHistory[key] || '';
  } else {
    return '';
  }
};
export const setLoginHistory = (key: string, token: string) => {
  const loginHistoryStr: string | null = localStorage.getItem('loginHistory');
  let loginHistory = {};
  if (loginHistoryStr !== null) {
    try {
      loginHistory = JSON.parse(loginHistoryStr as string);
    } catch (e) {
      console.error(e);
    }
  }
  loginHistory[key] = token;
  localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
};

export { TokenPrefix, isLogin, graphicVerification };
