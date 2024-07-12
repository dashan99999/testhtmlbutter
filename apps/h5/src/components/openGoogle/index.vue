<script lang="ts" setup name="open-google">
  import { showToast } from '@bitunix/shared/utils/vant';
  import { useUserStore } from '@bitunix/shared/store';
  import { processVerify } from '@bitunix/shared/api/account/account';
  import { useToken } from '@bitunix/shared/utils/auth';
  const { t } = useI18n();
  const visible = ref(false);
  const handleClose = () => {
    console.log('close');
  };
  const userStore = useUserStore();
  // 用户token
  const token = useToken();
  const verifySucMsg = ref('');
  //前往重置安全项
  // const goResetSecurity = () => {
  //   navigateToLocale({
  //     path: '/resetSecurity',
  //   });
  // };
  const loading = ref(false);
  const setLoading = (v: boolean) => {
    loading.value = v;
  };
  const hasSend = ref(false);
  const verifyCode = reactive({
    emailCode: '',
    mobileCode: '',
    googleCode: '',
    type: 1,
    source: '3',
  });
  const confirmBind = async (): Promise<void> => {
    let data = reactive({ code: '', msg: '', data: '' });
    verifySucMsg.value = '';
    setLoading(true);
    let flag = ref(false);
    //开启
    verifyCode.type = 1;
    verifyCode.source = '3';
    data = await processVerify(verifyCode);
    setLoading(false);
    if (data.code !== '0') {
      verifySucMsg.value = data.msg;
    } else {
      userStore.setInfo({ googleAuthenticatorStatus: flag ? 1 : 0 });
      visible.value = false;
      showToast(flag ? t('account.accountSecurity.enabled') : t('account.accountSecurity.closed'));
    }
  };
  /**
   * 显示底部弹框
   */
  const showBottomPopup = () => {
    visible.value = true;
  };
  defineExpose({
    showBottomPopup,
  });
</script>

<template>
  <bottom-popup :title="$t('common.security.verification.title')" v-model:show="visible" @update:show="handleClose">
    <div class="content">
      <div class="login-form-input flex-1">
        <VerificationCodeInput
          v-if="userStore.emailAuthenticatorStatus === 1"
          v-model:value="verifyCode.emailCode"
          :input-label="$t('common.security.verification.email')"
          input-type="1"
          send-type="6"
          @input="verifySucMsg = ''"
          :error-msg="verifySucMsg"
          :token="token!"
        />
      </div>
      <div class="login-form-input flex-1 m-t48">
        <VerificationCodeInput
          v-if="userStore.mobileAuthenticatorStatus === 1"
          v-model:value="verifyCode.mobileCode"
          :input-label="$t('common.security.verification.phone')"
          input-type="0"
          send-type="6"
          @input="verifySucMsg = ''"
          :error-msg="verifySucMsg"
          :token="token!"
        />
      </div>
      <div class="login-form-input flex-1 m-t48">
        <VerificationCodeInput
          v-if="userStore.googleAuthenticatorStatus === 1"
          v-model:value="verifyCode.googleCode"
          :input-label="$t('common.security.verification.google')"
          input-type="2"
          send-type="1"
          un-show-btn
          @input="verifySucMsg = ''"
          :error-msg="verifySucMsg"
          :token="token!"
        />
      </div>
      <div class="footer m-t80" style="text-align: center">
        <!--        <p-->
        <!--          @click="goResetSecurity"-->
        <!--          style="display: inline-block; color: var(&#45;&#45;color-fill-bitgreen); cursor: pointer; margin-bottom: 10px; text-align: center"-->
        <!--          >{{ $t('common.security.verification.resetSecurity') }}</p-->
        <!--        >-->
        <van-button
          size="large"
          type="primary"
          long
          :loading="loading"
          :disabled="
            hasSend ||
            (userStore.emailAuthenticatorStatus === 1 && !verifyCode.emailCode) ||
            (userStore.mobileAuthenticatorStatus === 1 && !verifyCode.mobileCode) ||
            !!verifySucMsg
          "
          @click="confirmBind"
          class="confirm-btn"
        >
          {{ $t('account.accountSecurity.windowTip3') }}
        </van-button>
      </div>
    </div>
  </bottom-popup>
</template>
<style lang="less" scoped></style>
