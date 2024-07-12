<template>
  <div class="registerCode">
    <div class="left-wrapper">
      <div class="title-wrapper"> {{ $t('login.form.hello') }}, {{ account.split('@')[0] }} </div>
      <div class="tip-wrapper">
        <p class="top">
          <span>{{ t('register.form.registerCode.tip1') }}：</span>
          <br />
          <span class="account">{{ account }}</span>
        </p>
        <p v-if="!router_query.country">{{ t('register.form.registerCode.tip2') }}</p>
      </div>
      <div class="code-wrapper" :class="{ error: !!error }">
        <div
          v-for="(item, index) in codeArr"
          :key="index"
          :tabindex="index"
          class="item codeInput"
          :class="{ current: index <= inputValue.length }"
          ref="codeInput"
          >{{ item }}</div
        >
        <input
          @blur="handleBlur"
          @paste="pasteCode"
          @input="handleInputValue"
          type="number"
          class="opacityInput"
          :style="{ opacity: 0 }"
          ref="inputRef"
        />
      </div>
      <div class="tips-custom-wrapper m-t24">
        <div class="error-wrapper">{{ error }}</div>
        <div tabindex="6" class="send-btn-wrapper codeInput" :class="{ disabled: !!interval || disabled || successCode }" @click="sendMsg">
          <van-loading :size="px2rem('32px')" v-show="sendLoading" />
          <span class="span-btn">{{ t('common.registerCode.reSend') }}{{ btnTimeText }}</span>
        </div>
      </div>

      <div class="btn-wrapper">
        <van-button type="primary" class="submit w-full" block :loading="loading" :disabled="submitDisabled" @click="submit">
          {{ $t('register.form.registerCode.btnText') }}
        </van-button>
      </div>

      <!-- <div class="ad-wrapper" @click="openWin('https://t.me/bitunixglobal')">
        <img src="../../../assets/images/flyicon.png" class="icon" />
        <div class="info">
          <div class="title">{{ t('register.form.registerCode.tip3') }}</div>
          <div class="text">{{ t('register.form.registerCode.tip4') }}</div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<!-- 注册获取验证码页面 -->
<script lang="ts" setup>
  import { sendCode } from '@bitunix/shared/api/app';
  import { graphicVerification } from '@bitunix/shared/utils/auth';
  import { SendCodeParams } from '@bitunix/shared/api/app/types';
  import { emailRegisterConfirm, mobileRegisterConfirm } from '@bitunix/shared/api/register';
  import { RegisterConfirmParams, RegisterConfirmRes } from '@bitunix/shared/api/register/types';
  import { useToken } from '@bitunix/shared/utils/auth';
  import { RQuery } from './types';
  import { useUserStore } from '@bitunix/shared/store';
  import { showToast } from '@bitunix/shared/utils/vant';
  import { px2rem } from '@bitunix/shared/utils/methods';
  import { useIntersectionObserver } from '@vueuse/core';
  definePageMeta({
    pageLayouts: {
      footer: false,
      setting: false,
    },
    namespace: ['register', 'login'],
  });
  const { t } = useI18n();
  const route = useRoute();
  const token = useToken();
  const router_query: RQuery = route.query;
  const account = ref<string>(router_query.account || '');
  const codeInput = ref(null);

  // DOM渲染之后操作
  watch(
    codeInput,
    (val: any) => {
      nextTick(() => {
        domList.value = val;
        domList.value && (domList.value[0] as HTMLElement).focus();
        if (!token.value) {
          btnText.value = t('common.registerCode.reSend');
          sendMsg();
        }
      });
    },
    {
      deep: true,
    },
  );
  // const appStore = useAppStore();
  const userStore = useUserStore();
  const code = ref('');
  const error = ref('');
  const successCode = ref('');
  let codeArr = reactive(['', '', '', '', '', '']);
  const checkIndex = ref(0);
  const countDown = ref();
  const interval = ref();
  const btnText = ref('');
  const btnTimeText = ref('');
  const loading = ref(false);
  const disabled = ref(false);
  const flg = ref(false);
  const timer = ref();
  const submitDisabled = computed(() => code.value.length !== 6 || disabled.value || !!error.value);
  const domList = ref<NodeListOf<HTMLElement> | null>(null);

  const inputRef = ref<HTMLInputElement | null>(null);
  const inputValue = ref('');
  const { stop } = useIntersectionObserver(inputRef, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      inputRef.value?.focus();
    }
  });
  const handleBlur = () => {
    nextTick(() => {
      inputRef.value?.focus();
    });
  };
  onUnmounted(() => {
    stop();
    if (countDown.value) {
      clearInterval(countDown.value);
    }
    if (interval.value) {
      clearInterval(interval.value);
    }
  });

  const handleInputValue = (e: Event) => {
    if (loading.value || successCode.value) {
      return;
    }
    if (e.target && e.target instanceof HTMLInputElement && e.target.value && e.target.value.length <= 6) {
      inputValue.value = e.target.value;
    } else {
      inputRef.value!.value = '';
      inputValue.value = '';
      codeArr = new Array(6).fill('');
    }
  };
  watch(inputValue, (v, oldV) => {
    const vStr = v.toString();
    const oldVStr = oldV.toString();
    const e: any = {
      key: vStr[vStr.length - 1],
    };
    if (vStr.length < oldVStr.length) {
      e.keyCode = 8;
      inputCode(e, vStr.length);
    } else {
      inputCode(e, vStr.length - 1);
    }
  });

  const inputCode = (e: any, index: number) => {
    if (successCode.value) {
      return;
    }

    if (e.keyCode === 46 || e.keyCode === 8) {
      // Delete/Backspace
      codeArr[index] = '';
      if (index > 0) {
        flg.value = true;
        checkIndex.value = index - 1;
        // if (domList.value) (domList.value[index - 1] as HTMLElement).focus();
      }
      code.value = codeArr.join('');
      codeArr = Object.assign([], codeArr);
      error.value = '';
    } else {
      const reg = /[^0-9]/g;
      const value = e.key;
      if (!reg.test(value)) {
        flg.value = true;
        code.value = '';
        if (index < 6) {
          codeArr[index] = value;
          checkIndex.value = index + 1;
          // if (domList.value) (domList.value[index + 1] as HTMLElement).focus();
          code.value = codeArr.join('');
          codeArr = Object.assign([], codeArr);
          error.value = '';
        }
        if (index === 5 && code.value.length === 6) {
          submit();
        }
      }
      setTimeout(() => {
        flg.value = false;
      }, 200);
    }
  };
  /* paste粘贴操作 */
  const pasteCode = (e: any) => {
    inputRef.value!.value = '';
    let paste = (e.clipboardData || window.Clipboard).getData('text');
    const temp = paste.split('');
    temp.forEach((i: any, index: number) => {
      inputCode({ key: i }, index);
    });
  };

  const msgCountDown = () => {
    let time = 59;
    btnText.value = `${t('common.registerCode.reSend')}`;
    btnTimeText.value = `(${time}s)`;
    interval.value = setInterval(() => {
      if (time > 1) {
        time--;
        btnText.value = `${t('common.registerCode.reSend')}`;
        btnTimeText.value = `(${time}s)`;
      } else {
        if (interval.value) {
          clearInterval(interval.value);
        }
        interval.value = null;
        btnText.value = t('common.registerCode.reSend');
        btnTimeText.value = ``;
      }
    }, 1000);
  };
  const sendLoading = ref(false);
  const validateResult = ref<any>({});
  const sendMsg = async () => {
    if (disabled.value || interval.value || successCode.value || sendLoading.value) {
      return;
    }
    const params: SendCodeParams = {
      account: account.value,
      type: '16',
      isEmail: router_query.country ? '0' : '1',
    };
    if (router_query.country) {
      params.country = router_query.country;
    }
    sendLoading.value = true;
    const data = await sendCode({ ...params, ...validateResult.value });
    validateResult.value = {};
    sendLoading.value = false;
    if (data.code === '0') {
      showToast(t('common.security.verification.sendSuccess.tip'));
      msgCountDown();
    } else if (data.code === '11000') {
      const result: any = await graphicVerification({
        captchaId: '212fdaf3ba981f19c050e5a1c524397a',
      });
      if (result !== 'close') {
        validateResult.value = {
          lotNumber: result.lot_number,
          captchaOutput: result.captcha_output,
          passToken: result.pass_token,
          genTime: result.gen_time,
        };
        sendMsg();
      }
    } else {
      showToast(data.msg);
    }
  };

  const submit = async () => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
      return navigateToLocale({
        path: '/register/registerSuccess',
      });
    }
    if (successCode.value || loading.value) {
      return;
    }
    const account = router_query.country ? router_query.country + router_query.account : router_query.account;
    const params: RegisterConfirmParams = {
      account: account || '',
      token: router_query.token || '',
      verificationCode: code.value,
    };
    disabled.value = true;
    loading.value = true;
    let data: RegisterConfirmRes = reactive({ msg: '', code: '', data: '' });
    if (router_query.country) {
      data = await mobileRegisterConfirm(params);
    } else {
      data = await emailRegisterConfirm(params);
    }
    disabled.value = false;
    loading.value = false;
    if (data.code === '0') {
      fbq('track', 'CompleteRegistration');
      localStorage.removeItem('register_code');
      token.value = data.data.token;
      userStore.info();
      timer.value = setTimeout(() => {
        const redirectUrl = localStorage.getItem('activityFlag');
        if (!!redirectUrl) {
          navigateToLocale({
            path: redirectUrl,
          });
        } else {
          navigateToLocale({
            path: '/register/registerSuccess',
          });
        }
      }, 1000);
    } else {
      error.value = data.msg;
    }
  };
</script>

<style lang="less" scoped>
  .registerCode {
    min-height: calc(100vh - 128px);
    width: 750px;
    background: var(--color-bg-popup);
    display: flex;
    justify-content: center;
    padding: 40px 30px;
    .left-wrapper {
      .title-wrapper {
        font-weight: 700;
        font-size: 36px;
        color: var(--color-text-1);
        margin-bottom: 24px;
      }

      .tip-wrapper {
        color: var(--color-text-2);
        font-size: 28px;
        line-height: 150%;
        position: relative;
        .account {
          display: inline-block;
          color: #ea4b64;
          margin-top: 14px;
        }
        .top {
          word-break: break-all;
          margin-bottom: 14px;
        }
      }

      .code-wrapper {
        margin-top: 64px;
        display: flex;
        position: relative;

        .item {
          width: 100px;
          height: 100px;
          border-radius: var(--border-radius-medium);
          border: 1px solid var(--color-border-base);
          margin-right: 15px;
          cursor: pointer;
          outline: none;
          color: var(--color-text-1);
          font-size: 28px;
          font-weight: bold;
          text-align: center;
          line-height: 100px;
          // background-color: #6d6d6d;
          background: var(--color-bg-1);
          &:last-child {
            margin-right: 0;
          }

          // &:hover {
          //   border-color: rgb(var(--primary-6)) !important;
          // }

          &.current {
            border-color: #ea4b64;
          }
        }

        &.error {
          .item {
            border-color: rgb(var(--danger-6));
          }
        }
      }
      .tips-custom-wrapper {
        height: auto;
        justify-content: space-between;
        display: flex;
        .error-wrapper {
          width: 65%;
          font-size: 28px;
        }
      }
      .error-wrapper {
        color: rgb(var(--danger-6));
      }

      .send-btn-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        color: #ea4b64;
        outline: none;
        &.disabled {
          cursor: no-drop;
          color: #a6a6a7;
          cursor: initial;
        }
        .span-btn {
          font-size: 28px;
        }
      }

      .btn-wrapper {
        margin-top: 90px;

        .submit {
          font-weight: var(--van-font-medium);
        }
      }

      .ad-wrapper {
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 10px;
        border: 1px solid var(--color-bg-6);
        padding-left: 18px;
        margin-top: 24px;
        height: 64px;
        box-sizing: border-box;

        .icon {
          width: 34px;
          height: 34px;
          background: #ffffff;
          border-radius: 50%;
        }

        .info {
          margin-left: 14px;
          color: var(--color-text-1);
          .text {
            margin-top: 7px;
          }
        }
      }
    }
    .opacityInput {
      height: 100px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      pointer-events: auto;
      cursor: pointer;
    }
  }
</style>
