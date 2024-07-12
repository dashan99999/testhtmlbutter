<!-- 第三方登录组件 -->
<template>
  <div class="PlatformLogin">
    <div id="googleBtn" class="btn" @click="handleGoogleLogin"> <img src="@/assets/images/icon-google.png" /> </div>
    <div class="btn" @click="appleSign"> <SvgIcon name="bx-icon:icon-apple" color="var(--color-text-1)" style="width: 24px" /> </div>
    <div class="btn" @click="facebookSign"> <img src="@/assets/images/icon-fb.png" /> </div>
    <div class="btn" @click="twitterSign"> <img src="@/assets/images/icon-twitter.png" /> </div>

    <a-modal v-model:visible="visible" :mask-closable="false" :footer="false" @close="close">
      <template #title> {{ $t('common.security.verification.title') }} </template>
      <div class="content">
        <div class="login-form-input flex-1">
          <VerificationCodeInput
            v-if="loginRes.emailAuth === '1'"
            v-model:value="platformLoginParams.email"
            :input-label="$t('common.security.verification.email')"
            input-type="1"
            send-type="1"
            @input="loginError.emailVerifySuc = 1"
            :error-msg="loginError.emailVerifySuc === 0 ? $t('common.security.verification.error') : ''"
            :token="platformLoginParams.uid"
          />
        </div>
        <div class="login-form-input flex-1 m-t48">
          <VerificationCodeInput
            v-if="loginRes.mobileAuth === '1'"
            v-model:value="platformLoginParams.mobile"
            :input-label="$t('common.security.verification.phone')"
            input-type="0"
            send-type="1"
            @input="loginError.mobileVerifySuc = 1"
            :error-msg="loginError.mobileVerifySuc === 0 ? $t('common.security.verification.error') : ''"
            :token="platformLoginParams.uid"
          />
        </div>
        <div class="login-form-input flex-1 m-t48">
          <VerificationCodeInput
            v-if="loginRes.googleAuth === '1'"
            v-model:value="platformLoginParams.google"
            :input-label="$t('common.security.verification.google')"
            input-type="1"
            send-type="1"
            un-show-btn
            @input="loginError.googleVerifySuc = 1"
            :error-msg="loginError.googleVerifySuc === 0 ? $t('common.security.verification.error') : ''"
          />
        </div>
        <div class="footer m-t80" style="text-align: center">
          <!-- <p
            @click="goResetSecurity"
            style="display: inline-block; color: var(--color-fill-bitgreen); cursor: pointer; margin-bottom: 10px; text-align: center"
            >{{ $t('common.security.verification.resetSecurity') }}</p
          > -->
          <a-button
            type="primary"
            size="large"
            long
            :loading="confirmLoading"
            :disabled="
              confirmDisabled || loginError.googleVerifySuc === 0 || loginError.emailVerifySuc === 0 || loginError.mobileVerifySuc === 0
            "
            @click="platLogin"
            class="confirm-btn"
          >
            {{ $t('common.security.verification.enter') }}
          </a-button>
        </div>
      </div>
    </a-modal>

    <a-modal v-model:visible="tipsMsgVisible" body-class="tips-dialog" :footer="false">
      <template #title> </template>
      <div class="text-center" style="margin-top: -23px">
        <img src="@/assets/images/warningIcon.png" style="width: 140px; height: 140px" />
        <div style="margin-top: 10px"> {{ tipsMsg }} </div>
        <a-button type="primary" size="large" long @click="tipsMsgVisible = false" style="margin-top: 20px" class="confirm-btn">
          {{ $t('common.security.verification.GotIt') }}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
  import { googleClientId, facebookClientId } from './types';
  import { checkPlatform, platFormLogin } from '@bitunix/shared/api/register';
  import { useToken, graphicVerification } from '@bitunix/shared/utils/auth';
  import { useUserStore } from '@bitunix/shared/store';
  import { showSuccessToast } from '@bitunix/shared/utils/vant';
  const { t } = useI18n();
  const token = useToken();
  const props = defineProps({
    from: {
      type: String,
      default: '',
    },
  });

  const thirdPartyLogins = reactive({
    facebook: false,
    google: false,
    apple: false,
    twitter: false,
  });

  const redirectURI = ref('https://www.bitunix.com');
  //const emit = defineEmits(['callback']);

  let client = null;

  const googleInit = () => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      client = google.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        ux_mode: 'popup',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        callback: (response) => {
          if (response?.access_token) {
            platformLogin({
              type: 2,
              token: response?.access_token,
              id: googleClientId,
            });
          }
        },
      });
    };
    document.body.appendChild(script);
  };

  const handleGoogleLogin = async () => {
    await graphicVerification({
      captchaId: 'a66ca6079e639c860d322fbf96ebcccb',
    });
    client.requestAccessToken();
  };

  //初始化facebook
  const facebookInIt = () => {
    try {
      FB.init({
        appId: facebookClientId,
        cookie: true,
        xfbml: true,
        version: 'v6.0',
      });
    } catch (e) {
      setTimeout(() => {
        facebookInIt();
      }, 500);
    }
  };

  // 初始化apple
  const appleInIt = () => {
    const host = window.location.host;
    let state = 'UbitEx';
    let clientId = 'com.bitunix.www';
    if (host.indexOf('bitunix') > -1) {
      // bitunix 环境
      redirectURI.value = 'https://www.bitunix.com';
      state = 'UbitEx';
      clientId = 'com.bitunix.www';
    }
    AppleID.auth.init({
      clientId: clientId,
      scope: 'email',
      redirectURI: redirectURI.value,
      state: state,
      usePopup: true,
    });
  };

  onMounted(() => {
    googleInit();
    facebookInIt();
    appleInIt();
  });

  // facebook 执行登录
  const facebookSign = async () => {
    try {
      console.log(FB);
    } catch (e) {
      return;
    }
    if (thirdPartyLogins.facebook) {
      return;
    }
    try {
      await graphicVerification({
        captchaId: 'a66ca6079e639c860d322fbf96ebcccb',
      });
      thirdPartyLogins.facebook = true;
      FB.getLoginStatus(function (response) {
        if (response.authResponse && response.status === 'connected') {
          thirdPartyLogins.facebook = false;
          // emit('callback', {
          //   type: 3,
          //   token: response.authResponse.accessToken,
          //   id: response.authResponse.userID,
          // });
          platformLogin({
            type: 3,
            token: response.authResponse.accessToken,
            id: response.authResponse.userID,
          });
        } else {
          FB.login(function (response) {
            thirdPartyLogins.facebook = false;
            if (response.authResponse && response.status === 'connected') {
              // emit('callback', {
              //   type: 3,
              //   token: response.authResponse.accessToken,
              //   id: response.authResponse.userID,
              // });
              platformLogin({
                type: 3,
                token: response.authResponse.accessToken,
                id: response.authResponse.userID,
              });
            }
          });
        }
      });
    } catch (err) {
      thirdPartyLogins.facebook = false;
      facebookInIt();
    }
  };

  // apple登录
  const appleSign = async () => {
    if (thirdPartyLogins.apple) {
      return;
    }
    thirdPartyLogins.apple = true;
    setTimeout(() => {
      thirdPartyLogins.apple = false;
    }, 3000);
    try {
      await graphicVerification({
        captchaId: 'a66ca6079e639c860d322fbf96ebcccb',
      });
      const data = await AppleID.auth.signIn();
      if (data && data.authorization && data.authorization.id_token) {
        // emit('callback', {
        //   type: 1,
        //   token: data.authorization.id_token,
        //   id: 'apple',
        // });
        platformLogin({
          type: 1,
          token: data.authorization.id_token,
          id: 'apple',
        });
      }
    } catch (e) {}
  };

  //推特登录 暂未开发完
  const twitterSign = async () => {
    await graphicVerification({
      captchaId: 'a66ca6079e639c860d322fbf96ebcccb',
    });
    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YXZFUzJ6UTdUbUU0eXI0amNwLTY6MTpjaQ&redirect_uri=${redirectURI.value}/loginLoading&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.open(url);
    if (listener.value) {
      listener.value = true;
      listenerStorage();
    }
  };
  const listener = ref(false);
  const end = ref(false);
  const listenerStorage = () => {
    if (localStorage.twitterCode) {
      // emit('callback', {
      //   type: 4,
      //   token: localStorage.twitterCode,
      //   id: 'twitter',
      // });
      platformLogin({
        type: 4,
        token: localStorage.twitterCode,
        id: 'twitter',
      });
      listener.value = false;
      localStorage.removeItem('twitterCode');
    } else {
      setTimeout(() => {
        if (!end.value) {
          listenerStorage();
        }
      }, 1000);
    }
  };

  // 关闭弹窗
  const close = () => {
    platformLoginParams.email = '';
    platformLoginParams.google = '';
    platformLoginParams.mobile = '';
    loginError = {};
  };

  const visible = ref(false);
  // 第三方登录回调
  const platformLogin = async (params) => {
    params.id = params.id || '1022797173416-fobn4uclfi467v22bsmo5vnr0vs72tad.apps.googleusercontent.com';
    const result = await checkPlatform(params);

    if (result.type === 0 && result.emailIsBound && props.from === 'login') {
      // 未绑定 但是获取到的邮箱在系统已注册
      navigateToLocale({
        path: '/platform/bindAccount',
        query: {
          uid: result.uid,
          email: result.accept,
          type: params.type,
          e_bound: 1,
        },
      });
    } else if (result.type === 0 && !result.emailIsBound && props.from === 'login') {
      // 未绑定 但是获取到的邮箱在系统未注册
      navigateToLocale({
        path: '/platform/bindAccountMode',
        query: {
          uid: result.uid,
          accept: result.accept,
          type: params.type,
        },
      });
    } else if (result.type === 0 && result.emailIsBound && props.from !== 'login') {
      // 未绑定 但是获取到的邮箱在系统已注册
      navigateToLocale({
        path: '/platform/bindAccount',
        query: {
          uid: result.uid,
          email: result.accept,
          type: params.type,
          e_bound: 1,
        },
      });
    } else if (result.type === 0 && !result.emailIsBound && result.accept && props.from !== 'login') {
      // 未绑定 但是获取到的邮箱在系统未注册
      navigateToLocale({
        path: '/platform/bindNewAccount',
        query: {
          uid: result.uid,
          email: result.accept,
          type: params.type,
        },
      });
    } else if (result.type === 0 && !result.emailIsBound && !result.accept && props.from !== 'login') {
      // 未绑定 但是获取到的邮箱在系统未注册
      navigateToLocale({
        path: '/platform/bindAccountMode',
        query: {
          uid: result.uid,
          type: params.type,
        },
      });
    } else {
      // 已绑定 直接登录
      loginRes.value.emailAuth = result.auth.emailAuth.toString();
      loginRes.value.mobileAuth = result.auth.mobileAuth.toString();
      loginRes.value.googleAuth = result.auth.googleAuth.toString();
      platformLoginParams.uid = result.uid;
      visible.value = true;
    }
  };

  // 第三方登录执行登录相关
  const platformLoginParams = reactive({
    uid: '',
    email: '',
    google: '',
    mobile: '',
  });
  let loginRes = ref({
    token: '',
    emailAuth: '0',
    googleAuth: '0',
    mobileAuth: '0',
  });
  // 验证码不正确返回值
  let loginError = reactive({});
  const confirmDisabled = computed(() => {
    const flag =
      (loginRes.value.emailAuth === '1' && !platformLoginParams.email) ||
      (loginRes.value.mobileAuth === '1' && !platformLoginParams.mobile) ||
      (loginRes.value.googleAuth === '1' && !platformLoginParams.google);
    return flag;
  });
  const confirmLoading = ref(false);
  const tipsMsg = ref('');
  const tipsMsgVisible = ref(false);
  //第三方执行登录
  const platLogin = async () => {
    loginError = {};
    confirmLoading.value = true;
    const data = await platFormLogin(platformLoginParams);
    confirmLoading.value = false;
    if (data.code !== '0' && data.data) {
      loginError = data.data;
      return;
    }
    if (data.code !== '0' && !data.data) {
      tipsMsg.value = data.msg;
      tipsMsgVisible.value = true;
      return;
    }
    visible.value = false;
    token.value = data.data.token;
    loginSuccess();
  };

  // 登录成功后处理
  const loginSuccess = async () => {
    const userStore = useUserStore();
    await userStore.info();
    showSuccessToast(t('login.form.success'));
  };

  //前往重置安全项
  // const goResetSecurity = () => {
  //   const query = reactive({ uid: platformLoginParams.uid });
  //   navigateToLocale({
  //     path: '/resetSecurity',
  //     query: query,
  //   });
  // };
</script>

<style lang="less" scoped>
  .PlatformLogin {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 420px;
    flex-wrap: wrap;

    .btn {
      width: 200px;
      height: 44px;
      margin: 0px 20px 20px 0;
      border-radius: var(--border-radius-small);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: var(--color-bg-2);
      transition: 0.15s linear;

      &:hover {
        opacity: 0.6;
      }

      &:nth-child(2n) {
        margin-right: 0px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
