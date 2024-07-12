<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.login') }}</div>
    <div class="px-1/4">
      <van-form
        ref="loginForm"
        class="custom-login-form form"
        layout="vertical"
        @submit="handleSubmit"
        label-align="top"
        :validate-trigger="['onChange']"
      >
        <div class="form-item" v-if="tabIndex === 0">
          <van-field
            name="email"
            :rules="[{ validator: validEmail }]"
            :label="$t('login.form.email')"
            :placeholder="$t('login.form.email.placeholder')"
            v-model="userInfo.email"
            class="common-input"
            @end-validate="(errors) => handleEndValidate('email', errors)"
            :error-message="errorState.email"
            :error="!!errorState.email"
          />
        </div>
        <div class="form-item" v-else>
          <van-field
            :label="$t('login.form.phone')"
            name="mobileNumber"
            :rules="[{ validator: validMobile }]"
            class="bx-input no-padding mobile"
            @end-validate="(errors) => handleEndValidate('mobile', errors)"
            :error-message="errorState.mobile"
            :error="!!errorState.mobile"
          >
            <template #input>
              <MobileNumber no-bg v-model="userInfo.mobileNumber" />
            </template>
            <template #extra>
              <div class="tabs-wrapper">
                <div class="right">
                  <span @click="changeTab(1)" v-if="tabIndex === 0" class="tab-item">{{ $t('login.form.phone1') }}</span>
                  <span @click="changeTab(0)" v-else class="tab-item">{{ $t('login.form.email1') }}</span>
                </div>
              </div>
            </template>
          </van-field>
        </div>
        <div class="form-item">
          <van-field
            :label="$t('login.form.password')"
            :rules="[{ validator: validPassword }]"
            :type="showPassword ? 'text' : 'password'"
            autocomplete=""
            name="loginPassword"
            class="common-input password"
            v-model="userInfo.loginPassword"
            :placeholder="$t('login.form.password.placeholder')"
            @end-validate="(errors) => handleEndValidate('password', errors)"
            :error-message="errorState.password"
            :error="!!errorState.password"
          >
            <template #right-icon>
              <IconFont class="color-text-2 fs-18" :name="showPassword ? 'see' : 'unsee'" @click="showPassword = !showPassword" />
            </template>
          </van-field>
        </div>
        <div class="form-item mgt-90">
          <!-- <div class="link m-b-30 fs-24" @click="goForgetPassword">{{ $t('login.form.forgetPassword') }}</div> -->
          <van-button
            type="primary"
            native-type="submit"
            block
            :loading="loading"
            :disabled="submitDisabled"
            :style="{ height: '60px', fontSize: '18px' }"
          >
            {{ $t('login.form.login') }}
          </van-button>
          <div class="register-wrapper m-t-30 fs-12">
            <span class="label">{{ $t('login.form.no.account') }}</span>
            <span class="link" @click="goRegister">{{ $t('login.form.register1') }}</span>
            <span class="line"></span>
          </div>
        </div>
      </van-form>
    </div>
    <bottom-popup :title="$t('account.disable.tip12')" v-model:show="visible" @update:show="handleClosePopup">
      <div v-if="frequentShow" class="content frequent-content">
        <IconFont @click="toggleFrequentItem" name="cutover" class="fs-36 toggle-icon color-text-brand-base" />
        <div v-show="frequentItem === 'email'" class="login-form-input flex-1">
          <VerificationCodeInput
            v-if="loginRes.emailAuth === 1"
            v-model:value="confirmForm.emailCode"
            :input-label="$t('common.security.verification.email')"
            input-type="1"
            send-type="1"
            @input="loginError = {}"
            :error-msg="loginError.emailVerifySuc === 0 ? $t('common.security.verification.error') : ''"
            :token="confirmForm.token"
            :isLogin="false"
            :emailText="verifyText.emailText"
          />
        </div>
        <div v-show="frequentItem === 'mobile'" class="login-form-input flex-1 m-t48">
          <VerificationCodeInput
            v-if="loginRes.mobileAuth === 1"
            v-model:value="confirmForm.mobileCode"
            :input-label="$t('common.security.verification.phone')"
            input-type="0"
            send-type="1"
            @input="loginError = {}"
            :error-msg="loginError.mobileVerifySuc === 0 ? $t('common.security.verification.error') : ''"
            :token="confirmForm.token"
            :isLogin="false"
            :phoneText="verifyText.mobileText"
            :countryCodeText="verifyText.countryCodeText"
          />
        </div>
        <div class="footer m-t80" style="text-align: center">
          <van-button
            size="large"
            type="primary"
            block
            :loading="confirmLoading"
            :disabled="
              frequentConfirmDisabled ||
              loginError.emailVerifySuc === 0 ||
              loginError.googleVerifySuc === 0 ||
              loginError.mobileVerifySuc === 0
            "
            @click="confirm"
          >
            {{ $t('register.form.registerCode.submit') }}
          </van-button>
        </div>
      </div>
      <div class="content" v-else>
        <div class="login-form-input flex-1">
          <VerificationCodeInput
            v-if="loginRes.emailAuth === 1"
            v-model:value="confirmForm.emailCode"
            :input-label="$t('common.security.verification.email')"
            input-type="1"
            send-type="1"
            @input="loginError = {}"
            :error-msg="loginError.emailVerifySuc === 0 ? $t('common.security.verification.error') : ''"
            :token="confirmForm.token"
            :isLogin="false"
            :emailText="verifyText.emailText"
          />
        </div>
        <div class="login-form-input flex-1 m-t48">
          <VerificationCodeInput
            v-if="loginRes.mobileAuth === 1"
            v-model:value="confirmForm.mobileCode"
            :input-label="$t('common.security.verification.phone')"
            input-type="0"
            send-type="1"
            @input="loginError = {}"
            :error-msg="loginError.mobileVerifySuc === 0 ? $t('common.security.verification.error') : ''"
            :token="confirmForm.token"
            :isLogin="false"
            :phoneText="verifyText.mobileText"
            :countryCodeText="verifyText.countryCodeText"
          />
        </div>
        <div class="login-form-input flex-1 m-t48">
          <VerificationCodeInput
            v-if="loginRes.googleAuth === 1"
            v-model:value="confirmForm.googleCode"
            :input-label="$t('common.security.verification.google')"
            input-type="2"
            send-type="1"
            un-show-btn
            @input="loginError = {}"
            :error-msg="loginError.googleVerifySuc === 0 ? $t('common.security.verification.error') : ''"
            :token="confirmForm.token"
          />
        </div>
        <div class="footer m-t80" style="text-align: center">
          <van-button type="primary" size="large" block :loading="confirmLoading" :disabled="confirmDisabled" @click="confirm">
            {{ $t('register.form.registerCode.submit') }}
          </van-button>
          <!-- <p @click="goResetSecurity" class="content">{{ $t('common.security.verification.resetSecurity') }}</p> -->
        </div>
      </div>
    </bottom-popup>
    <download-popup closeable v-model:show="tipsShow" className="no-download" />

    <van-dialog v-model:show="tipsMsgVisible" body-class="tips-dialog">
      <div class="text-center">
        <van-image round :src="warningIcon" width="21.32vw" height="21.32vw" />
        <div class="fs-28 m-t-40 m-b-40" style="color: var(--color-text-1)"> {{ tipsMsg }} </div>
      </div>
      <template #footer>
        <van-button type="primary" siz e="large" block @click="tipsMsgVisible = false">
          {{ $t('common.security.verification.GotIt') }}
        </van-button>
      </template>
      <template #title>
        <div class="popup-close" @click="tipsMsgVisible = false">
          <SvgIcon name="bx-icon:popup-close" w="30" h="30" />
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { logins } from '@bitunix/shared/api/homeindex';
  import useLoading from '@bitunix/shared/hooks/loading';
  import { generate, confirmLogin, loginCheck, getIdentify, scanLoginConfirm } from '@bitunix/shared/api/user';
  import type { ConfirmLoginData, LoginRes, LoginData, LoginCheckParams } from '@bitunix/shared/api/user';
  import { authInfo } from '@bitunix/shared/api/account';
  import QRCode from 'qrcode';
  import { mobile_reg, reg_email, reg_password } from '@bitunix/shared/utils/regexp';
  import { Md5 } from 'ts-md5/dist/esm/md5';
  import { useToken } from '@bitunix/shared/utils/auth';
  import { useWebSocket } from '@vueuse/core';
  import { useUserStore } from '@bitunix/shared/store';
  import { graphicVerification, setLoginHistory, getLoginHistory } from '@bitunix/shared/utils/auth';
  import { showToast } from '@bitunix/shared/utils/vant';
  import warningIcon from '~/assets/images/warningIcon.png';
  import LogoICO from '~/assets/images/logo.ico';
  type ErrorState = Record<'email' | 'mobile' | 'password', string>;
  type ValidateMsgType = { message: string; status: 'failed' | 'passed' };
  const userStore = useUserStore();
  const route = useRoute();
  const showPassword = ref(false);
  const { t } = useI18n();
  const token = useToken();
  const tabIndex = ref(0);
  const uniqueId = useCookie(import.meta.env.VITE_UNIQUE_KEY);
  const loginForm = ref<any>(null);
  const changeTab = (index: number): void => {
    tabIndex.value = index;
    userInfo.email = '';
    userInfo.mobileNumber = { countryCode: '', mobileNumber: '' };
    userInfo.loginPassword = '';
    apiErrorMsg.value = '';
    errorState.email = '';
    errorState.mobile = '';
    errorState.password = '';
  };
  const errorState = reactive<ErrorState>({
    email: '',
    password: '',
    mobile: '',
  });

  const { loading, setLoading } = useLoading();
  const visible = ref(false);
  const frequentDevice = ref(false);
  const frequentShow = computed(() => {
    const tempArr = [loginRes.value.emailAuth, loginRes.value.googleAuth, loginRes.value.mobileAuth];
    const count = tempArr.reduce((currency, item) => {
      if (item === 1) {
        return (currency as number) + 1;
      } else {
        return currency as number;
      }
    }, 0);
    return frequentDevice.value && (count as number) > 1;
  });
  const frequentList = computed(() => {
    const res: any[] = [];
    if (loginRes.value.googleAuth === 1) {
      res.push('google');
    }
    if (loginRes.value.emailAuth === 1) {
      res.push('email');
    }
    if (loginRes.value.mobileAuth === 1) {
      res.push('mobile');
    }
    return res;
  });
  const frequentIndex = ref(0);
  const frequentItem = computed(() => {
    return frequentList.value[frequentIndex.value];
  });
  const toggleFrequentItem = () => {
    if (frequentIndex.value === frequentList.value.length - 1) {
      frequentIndex.value = 0;
    } else {
      frequentIndex.value++;
    }
    confirmForm.emailCode = '';
    confirmForm.mobileCode = '';
    confirmForm.googleCode = '';
  };
  // 常用设备逻辑的禁用按钮状态
  const frequentConfirmDisabled = computed(() => {
    switch (frequentItem.value) {
      case 'email':
        return loginRes.value.emailAuth == 1 && !confirmForm.emailCode;
      case 'mobile':
        return loginRes.value.mobileAuth == 1 && !confirmForm.mobileCode;
      default:
        return loginRes.value.googleAuth == 1 && !confirmForm.googleCode;
    }
  });
  //扫码登录相关
  const codeType = ref(0);
  const qrCodeUrl = ref('');
  const qrCodeData = ref('');
  //获取登录二维码
  const getCode = async () => {
    let result = await generate();
    wsData.value = {};
    const data = result.data;
    qrCodeData.value = data || '';
    codeType.value = 0;
    QRCode.toDataURL(
      data!,
      {
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
      } as any,
      (error, url) => {
        if (error) console.log(error);
        qrCodeUrl.value = url;
      },
    );
    connectWebsocket();
  };
  onMounted(() => {
    if (token.value) {
      navigateToLocale({ path: '/' }, { replace: true });
    }
    // getCode();
  });

  interface WsData {
    data?: {
      status: string;
    };
    flag?: boolean;
    msg?: string;
    code?: number;
  }
  const wsData = ref<WsData>({});
  const timer = ref<NodeJS.Timer | null>(null);
  const connectWebsocket = () => {
    const host = import.meta.env.VITE_BASE_URL.replace('https:', 'wss:').replace('http:', 'ws:');
    const url = `${host}/ws-old/qrcodeWebsocket/${qrCodeData.value}`;
    const { data, send } = useWebSocket(url, {
      heartbeat: false,
      autoReconnect: true,
      onMessage: async () => {
        if (data.value.indexOf('data') > -1) {
          wsData.value = JSON.parse(data.value);
        } else {
          const [uuid, identify] = data.value.split('_');
          let cacheToken = '';
          if (identify) {
            cacheToken = getLoginHistory(identify);
          }
          const confirmData = await scanLoginConfirm(uuid, cacheToken);
          setLoginHistory(confirmData.identify, confirmData.token);
          token.value = data.value;
          loginSuccess();
        }
      },
    });
    timer.value = setInterval(() => {
      send('ping');
    }, 30000);
  };
  onUnmounted(() => {
    if (timer.value) clearInterval(timer.value);
  });
  // 手机号校验
  const validMobile = async (value?: LoginData['mobileNumber']) => {
    if (value?.mobileNumber) {
      if (!mobile_reg.test(value.mobileNumber)) {
        return t('common.regexp.phone');
      }
    }
    return true;
  };

  const validPassword = async (value?: string) => {
    if (value && !reg_password.test(value)) {
      return t('common.regexp.password');
    }
    return true;
  };

  // 校验邮箱格式
  const validEmail = async (value?: string) => {
    if (value) {
      if (!reg_email.test(value)) {
        return t('common.regexp.email');
      }
    }
    return true;
  };
  const formValidateResult = computed(() => {
    let status = true;
    Object.keys(errorState).forEach((key) => {
      if (!!errorState[key as keyof ErrorState]) {
        status = false;
      }
    });
    return status;
  });
  const submitDisabled = computed(() => {
    let flag = false;
    if (tabIndex.value === 0) {
      flag = !userInfo.email;
    } else {
      flag = !(userInfo.mobileNumber.countryCode || userInfo.mobileNumber.mobileNumber);
    }
    flag = flag || !userInfo.loginPassword || !formValidateResult.value;
    return flag;
  });

  const handleEndValidate = (name: keyof ErrorState, results: ValidateMsgType | ValidateMsgType[]) => {
    let msg = '';
    const errors = Array.isArray(results) ? results : [results];
    if (errors.length) {
      const error = errors[0];
      msg = error.message;
    }
    errorState[name] = msg;
  };

  //登录第一步相关
  const userInfo = reactive<LoginData>({
    loginPassword: '',
    email: '',
    mobileNumber: { mobileNumber: '', countryCode: '' },
  });
  /**
   * 安全验证展示
   */
  const verifyText = reactive({
    emailText: '',
    mobileText: '',
    countryCodeText: '',
  });

  let loginRes = ref<LoginRes>({
    token: '',
    emailAuth: 0,
    googleAuth: 0,
    mobileAuth: 0,
  });
  const tipsMsg = ref('');
  const apiErrorMsg = ref(''); // 登录接口返回信息错误
  const tipsMsgVisible = ref(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const validateResult = await graphicVerification({
      //   captchaId: '8715d0f89c509a74d12ff249ae2b01b7',
      // });
      // if (validateResult === 'close') {
      //   setLoading(false);
      //   return;
      // }
      tipsMsg.value = '';
      const { email, loginPassword } = toValue(userInfo);
      const params = {
        email: email || undefined,
        password: loginPassword,
      };
      // params.loginPassword = Md5.hashStr(params.loginPassword);
      const data = await logins(params);
      console.log('登陆成功==>', data);

      if (data.code != 200) {
        console.log('不等于200');
        tipsMsg.value = data.msg;
        tipsMsgVisible.value = true;
        return;
      }
      if (data.data) {
        console.log('data.data==>', data.data);

        loginRes.value = data.data;
        // frequentDevice.value = data.data.frequentDevice as boolean;
        confirmForm.token = data.data.token;
        visible.value = true;
        token.value = data.data.token;
        setLoginHistory(uniqueId.value!, confirmForm.token || '');
        await loginSuccess();
        /**
         * 获取用户信息
         */
        // const authInfoResult = await authInfo({
        //   accept: userInfo.email,
        // });
        // verifyText.emailText = authInfoResult.data.email;
        // verifyText.mobileText = authInfoResult.data.mobileNumber;
        // // verifyText.countryCodeText = authInfoResult.data.countryCode;
      }
    } catch (err: any) {
      tipsMsg.value = err?.message;
      tipsMsgVisible.value = true;
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // 登录第二步相关
  const confirmForm: ConfirmLoginData = reactive<ConfirmLoginData>({
    token: '',
    emailCode: '',
    googleCode: '',
    mobileCode: '',
  });

  /**
   * 关闭安全验证弹框
   */
  const handleClosePopup = (show: boolean) => {
    if (!show) {
      confirmForm.emailCode = '';
      confirmForm.mobileCode = '';
      confirmForm.googleCode = '';
    }
  };

  // 验证码不正确返回值
  let loginError: LoginRes = reactive<LoginRes>({});

  const confirmDisabled = computed(() => {
    const flag =
      (loginRes.value.emailAuth === 1 && !confirmForm.emailCode) ||
      (loginRes.value.mobileAuth === 1 && !confirmForm.mobileCode) ||
      (loginRes.value.googleAuth === 1 && !confirmForm.googleCode);
    return flag;
  });
  const confirmLoading = ref(false);
  const confirm = async () => {
    loginError = {};
    confirmLoading.value = true;
    const data = await confirmLogin(confirmForm, uniqueId.value!);
    if (data.code !== '0' && data.data) {
      confirmLoading.value = false;
      loginError = data.data;
      return;
    }
    if (data.code !== '0' && !data.data) {
      confirmLoading.value = false;
      showToast(data.msg);
      return;
    }
    token.value = confirmForm.token || '';
    setLoginHistory(uniqueId.value!, confirmForm.token || '');
    twq?.('event', 'tw-ofys2-ofytd', {
      email_address: userInfo.email,
      phone_number: userInfo.mobileNumber?.mobileNumber,
    });
    await loginSuccess();
    confirmLoading.value = false;
    visible.value = false;
  };

  // 登录成功后处理
  const loginSuccess = async (token: string) => {
    await userStore.info(token);
    showToast('欢迎游玩');
    navigateToLocale((route.query.redirect as string) || '/');
    return;
  };
  //前往注册
  const goRegister = () => {
    navigateToLocale({
      path: '/registerPC',
    });
  };

  //前往忘记密码
  const goForgetPassword = () => {
    navigateToLocale({
      path: '/account/resetPassword',
    });
  };
  const tipsShow = ref(false);
  //前往重置安全项
  // const goResetSecurity = () => {
  //   const query: any = reactive({});
  //   if (tabIndex.value === 0) {
  //     query.p = Md5.hashStr(userInfo.loginPassword);
  //     query.n = userInfo.email;
  //   } else if (tabIndex.value === 1) {
  //     query.p = Md5.hashStr(userInfo.loginPassword);
  //     query.n = userInfo.mobileNumber;
  //     query.c = userInfo.countryCode;
  //   }
  //   router.push({
  //     path: '/resetSecurity',
  //     query: query,
  //   });
  //   // 弹出下载框
  //   tipsShow.value = true;
  // };
</script>

<!-- <style>
  .no-download {
    background: var(--bx-bg-popup);
    border: 1px solid var(--color-bg-interactive-strong);

    .tips-text {
      color: var(--color-text-1);
      font-size: 28px;
      margin: 40px 0;
    }

    .van-dialog__content {
      margin-top: 10px;
      padding: 0 40px 60px;
    }

    .confirm-btn {
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: var(--bx-font-size-btn);
      color: var(--bx-btn-text-color);
      border-radius: 10px;
      font-weight: 500;
      background: #ea4b64;
    }
  }
</style> -->

<style lang="less" scoped>
  .form-item {
    :deep(.van-field__control) {
      height: 50px !important;
      font-size: 12px;
    }
    :deep(.van-field__control::placeholder) {
      font-size: 12px !important;
    }
    :deep(.van-cell) {
      font-size: 15px;
    }
    :deep(.van-field__error-message) {
      margin-top: 0;
      font-size: 10px;
    }
    .common-input {
      :deep(.van-field__label--top) {
        margin-bottom: 0;
      }
      :deep(.van-field__control) {
        padding: 0 14px 0 14px !important;
        font-size: 10px !important;
      }
    }
  }
  .login-form-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 40px var(--bx-page-space);
    .login-form-title {
      font-size: 20px;
      color: var(--color-text-1);
      // line-height: 75px;
      margin-bottom: 50px;
    }

    .tabs-wrapper {
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      color: var(--color-text-1);
      position: absolute;
      right: 0;
      top: 0;
      .tab-item.active {
        color: #ea4b64;
      }
      .right {
        color: #ea4b64;
      }
    }
    .text-center {
      font-size: 28px;
      .text {
        font-size: 28px;
      }
    }
    .wrapper {
      :deep(.arco-input) {
        color: var(--color-text-error);
      }
    }
  }
  .footer {
    text-align: center;
    .content {
      display: inline-block;
      color: #ea4b64;
      cursor: pointer;
      margin-top: 20px;
      text-align: center;
      font-size: 26px;
    }
    :deep(.van-button) {
      background: #ea4b64;
    }
    // :deep(.van-button__content) {
    //   height: 50px;
    // }
  }
  .text-center {
    .text {
      font-size: 28px;
    }
  }
  .link {
    color: #ea4b64;
  }
  .label {
    color: var(--color-text-2);
  }
  .password {
    position: relative;
    :deep(.van-field__right-icon) {
      position: absolute;
      right: 20px;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    :deep(.van-field__control) {
      padding-right: 100px;
    }
  }
  .mgt-90 {
    margin-top: 20px;
  }
  .frequent-content {
    position: relative;
    .toggle-icon {
      position: absolute;
      right: 5px;
      top: 0;
      cursor: pointer;
      z-index: 2023;
      font-size: 24px;
    }
  }
  :deep(.errorMsg-wrapper.show) {
    margin-top: 16px !important;
    margin-bottom: 40px !important;
  }
</style>
