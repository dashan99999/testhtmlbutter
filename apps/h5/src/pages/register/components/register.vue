<!-- 注册页面 -->
<template>
  <div class="register-wrapper">
    <div class="title"> {{ $t('register.form.register') }} </div>
    <!-- <div class="region-wrapper">
      <span class="label">{{ $t('register.form.country') }}:</span>
      <AreaSelect
        :popupTitle="$t('account.idAuth.individual.base.step1.value1')"
        v-model:value="registerInfo.nation"
        no-bg
        region
        style="color: #ffffff"
        @on-change="handleAreaChange"
      />
    </div> -->
    <div class="form-wrapper">
      <van-form
        class="login-form"
        label-align="top"
        layout="vertical"
        @submit="handleSubmit"
        :validate-trigger="['onChange']"
        ref="registerForm"
      >
        <van-field
          v-model="registerInfo.account"
          v-if="!tabIndex"
          class="common-input form-item"
          :label="$t('login.form.email')"
          :placeholder="$t('login.form.email.placeholder')"
          :rules="[{ validator: validEmailRepeat }]"
        >
          <!-- <template #extra>
            <div class="tabs-wrapper">
              <div class="right">
                <span @click="changeTab(1)" v-if="!tabIndex" class="tab-item">{{ $t('login.form.phone2') }}</span>
                <span @click="changeTab(0)" v-if="tabIndex" class="tab-item">{{ $t('login.form.email2') }}</span>
              </div>
            </div>
          </template> -->
        </van-field>
        <van-field
          v-else
          class="custom-field form-item bx-input mobile no-padding"
          name="mobileNumber"
          :rules="[{ validator: validMobile }]"
          :label="$t('login.form.phone')"
          :placeholder="$t('login.form.phone.placeholder')"
        >
          <template #input>
            <MobileNumber no-bg v-model="registerInfo.mobileNumber" />
          </template>
          <!-- <template #extra>
            <div class="tabs-wrapper">
              <div class="right">
                <span @click="changeTab(1)" v-if="!tabIndex" class="tab-item">{{ $t('login.form.phone2') }}</span>
                <span @click="changeTab(0)" v-if="tabIndex" class="tab-item">{{ $t('login.form.email2') }}</span>
              </div>
            </div>
          </template> -->
        </van-field>
        <van-field
          :label="$t('login.form.password')"
          :rules="[{ validator: validPassword }]"
          :type="showPassword ? 'text' : 'password'"
          name="loginPassword"
          class="common-input password form-item"
          v-model="registerInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          style="margin-bottom: 0"
        >
          <template #right-icon>
            <SvgIcon
              @click="showPassword = !showPassword"
              :name="showPassword ? 'bx-icon:assets_homesee' : 'bx-icon:assets_homesee_off'"
              w="32"
              h="32"
            />
          </template>
        </van-field>
        <van-field
          :label="$t('login.form.confirmPassword')"
          :rules="[{ validator: validPassword }]"
          :type="showPassword ? 'text' : 'password'"
          name="loginPassword"
          class="common-input password form-item"
          v-model="registerInfo.confirm_password"
          :placeholder="$t('login.form.password.placeholder')"
          style="margin-bottom: 0"
        >
          <template #right-icon>
            <SvgIcon
              @click="showPassword = !showPassword"
              :name="showPassword ? 'bx-icon:assets_homesee' : 'bx-icon:assets_homesee_off'"
              w="32"
              h="32"
            />
          </template>
        </van-field>
        <!-- <van-field class="noPadding" v-if="!showVipCode" style="padding-bottom: 0">
          <template #input>
            <div class="register-form-input">
              <label class="label flex items-center cursor-pointer">
                <span class="invite-label m-r16 color-text-1">{{ $t('register.form.invite') }}</span>
              </label>
              <div v-show="showInvitation">
                <van-field
                  maxlength="20"
                  class="common-input form-item"
                  v-model="registerInfo.invitationCode"
                  :placeholder="$t('register.form.invite.placeholder')"
                  clearable
                  :disabled="inviteDisable"
                />
              </div>
            </div>
          </template>
        </van-field> -->
        <!-- <van-field class="noPadding" style="padding-bottom: 0" v-else>
          <template #input>
            <div class="register-form-input">
              <label class="label flex items-center cursor-pointer" @click="showInvitation = !showInvitation">
                <span class="invite-label colo-text-1">{{ $t('register.form.invite') }}</span>
                <IconFont class="fs-36 color-text-1" name="slidedown" :class="{ show: showInvitation }" style="display: inline-block" />
              </label>
              <div v-show="showInvitation">
                <van-field
                  maxlength="20"
                  v-model="registerInfo.partnerCode"
                  :placeholder="$t('register.form.invite.placeholder')"
                  clearable
                  :disabled="true"
                />
              </div>
            </div>
          </template>
        </van-field> -->
        <!-- <van-field
          class="agreement-out-wrapper noPadding"
          name="agreement"
          :style="{ 'margin-top': showInvitation ? px2rem('48px') : '0' }"
        >
          <template #input>
            <div class="agreement">
              <div class="agreement-icon">
                <IconFont
                  @click="registerInfo.agreement = !registerInfo.agreement"
                  :name="registerInfo.agreement ? 'choose' : 'unchoose'"
                  class="fs-32"
                  :class="registerInfo.agreement ? 'color-text-brand-base' : 'color-text-2'"
                />
              </div>
              <div class="leh-15 agreement-font">
                <span class="color-text-2">{{ $t('register.form.agreement') }}</span>
                <NuxtLink noPrefetch :to="localePath('/cms/agreement')" target="_blank" class="link">{{
                  $t('register.form.userAgreement')
                }}</NuxtLink>
                <span class="color-text-2">、</span>
                <NuxtLink noPrefetch :to="localePath('/cms/privacy')" target="_blank" class="link">{{
                  $t('register.form.privacyPolicy')
                }}</NuxtLink>
              </div>
            </div>
          </template>
        </van-field> -->
        <span v-show="!registerInfo.agreement" class="errorMsg">{{ $t('register.form.agreement.tip') }}</span>
        <van-button
          @click="() => registerForm.submit()"
          type="primary"
          size="large"
          class="submit"
          block
          :loading="loading"
          :disabled="disabled"
        >
          {{ $t('register.form.register') }}
        </van-button>
        <div class="login-wrapper">
          <span class="label color-text-2">{{ $t('register.form.account') }} </span>
          <span class="link" @click="goLogin">{{ $t('register.form.login') }}</span>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { emailRegisterCheck, mobileRegisterCheck } from '@bitunix/shared/api/register';
  // import PlatformLogin from '@/components/Modules/PlatformLogin/index.vue';
  import useLoading from '@bitunix/shared/hooks/loading';
  import { Md5 } from 'ts-md5/dist/esm/md5';
  import {
    mobile_reg,
    reg_email,
    reg_password,
    validCheckAcceptFn,
    validEmailStatus,
    validPasswordStatus,
  } from '@bitunix/shared/utils/regexp';
  import { RQuery } from '../registerCode/types';
  import { RegisterCheckParams, RegisterCheckRes, RegisterConfirmParams } from '@bitunix/shared/api/register/types';
  import { useToken, graphicVerification } from '@bitunix/shared/utils/auth';
  import { px2rem } from '@bitunix/shared/utils/methods';
  import { showToast } from '#shared/utils/vant';
  import { registers } from '@bitunix/shared/api/homeindex';
  const token = useToken();
  const route = useRoute();
  const { loading, setLoading } = useLoading();
  const { t } = useI18n();

  // 显示隐藏密码
  const showPassword = ref(false);

  // 切换邮箱/手机
  const tabIndex = ref(0);
  const registerForm: any = ref(null);
  validPasswordStatus.value = undefined;
  validEmailStatus.value = undefined;
  const changeTab = (index: number) => {
    tabIndex.value = index;
    registerInfo.account = '';
    registerInfo.password = '';
    registerInfo.mobileNumber.mobileNumber = '';
    validPasswordStatus.value = undefined;
    validEmailStatus.value = undefined;
  };
  onMounted(() => {
    if (token.value) {
      navigateToLocale('/', { replace: true });
    }
    if (route.query && route.query.account) {
      tabIndex.value = route.query.account.indexOf('@') > -1 || route.query.type ? 0 : 1;
      registerInfo.account = route.query.account as string;
      tabIndex.value && (registerInfo.mobileNumber.mobileNumber = route.query.account as string);
      registerForm.value.validate();
    }
  });

  const registerInfo: RegisterCheckParams = reactive({
    account: '',
    areaCode: '',
    nation: '',
    invitationCode: '',
    partnerCode: '',
    password: '',
    agreement: true,
    mobileNumber: { mobileNumber: '', countryCode: '' },
    confirm_password: '',
  });

  // 监听手机输入框
  watch(
    () => registerInfo.mobileNumber,
    (val: { mobileNumber: string; countryCode: string }) => {
      registerInfo.areaCode = val.countryCode;
      registerInfo.account = val.mobileNumber || (route.query.account as string);
    },
    {
      deep: true,
    },
  );
  const handleAreaChange = (item: any) => {
    registerInfo.mobileNumber.countryCode = item.code;
  };

  const registerConfirmInfo: RegisterConfirmParams = reactive({
    token: '',
    account: '',
    verificationCode: '',
  });
  const showInvitation = ref(true);

  const validPhoneStatus = ref();
  // 表单验证 手机号验证
  const validMobile = async (value: { mobileNumber: string }) => {
    validPhoneStatus.value = undefined;
    if (value.mobileNumber) {
      if (!mobile_reg.test(value.mobileNumber)) {
        validPhoneStatus.value = 'error';
        return t('common.regexp.phone');
      }
      const msg: string = await validCheckAcceptFn(value.mobileNumber, registerInfo.areaCode);
      if (msg) {
        validPhoneStatus.value = 'error';
        return msg;
      }
    }
    return true;
  };

  // 校验格式以及是否重复
  const validEmailRepeat = async (value?: string) => {
    validEmailStatus.value = undefined;
    if (value) {
      if (!reg_email.test(value)) {
        validEmailStatus.value = 'error';
        return t('common.regexp.email');
      }
      // const msg: string = await validCheckAcceptFn(value);
      // if (msg) {
      //   return msg;
      // }
    }
    return true;
  };
  // 校验密码必须输入8-20位大小写必须经过MD5加密

  const validPassword = async (value: string) => {
    validPasswordStatus.value = undefined;
    if (value && !reg_password.test(value)) {
      validPasswordStatus.value = 'error';
      return t('common.regexp.password');
    }
    return true;
  };

  const disabled = computed(
    () =>
      !registerInfo.account ||
      !registerInfo.password ||
      !registerInfo.confirm_password ||
      validPasswordStatus.value === 'error' ||
      validEmailStatus.value === 'error',
  );

  const handleSubmit = async ({ errors }: { errors: Record<string, any> | undefined; values: Record<string, any> }) => {
    if (loading.value) return;
    if (errors) return;
    setLoading(true);
    registers({
      email: registerInfo.account,
      password: registerInfo.password,
      confirm_password: registerInfo.confirm_password,
    })
      .then((res) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  // 注册第一步
  const handleSubmit2 = async ({ errors }: { errors: Record<string, any> | undefined; values: Record<string, any> }) => {
    if (loading.value) return;
    if (errors) return;
    setLoading(true);
    let data: RegisterCheckRes = reactive({ token: '' });
    try {
      let params: any = { ...registerInfo };
      params.password = Md5.hashStr(registerInfo.password);
      let result: any = { token: '' };

      const validateResult = await graphicVerification({
        captchaId: '212fdaf3ba981f19c050e5a1c524397a',
      });
      if (validateResult === 'close') {
        setLoading(false);
        return;
      }
      params = {
        ...params,
        lotNumber: (validateResult as any).lot_number,
        captchaOutput: (validateResult as any).captcha_output,
        passToken: (validateResult as any).pass_token,
        genTime: (validateResult as any).gen_time,
      };
      if (tabIndex.value === 0) {
        result = await emailRegisterCheck(params);
      } else {
        result = await mobileRegisterCheck(params);
      }
      setLoading(false);
      if (result.code !== '0') {
        showToast(result.msg);
        return;
      }
      data.token = result.data.token;
      registerConfirmInfo.token = data.token;
      registerConfirmInfo.account = (registerInfo.areaCode || '') + registerInfo.account;
      // visible.value = true;
      const query: RQuery = reactive({
        token: data.token,
        account: registerInfo.account,
      });
      if (tabIndex.value === 1) {
        query.country = registerInfo.areaCode;
      }
      navigateToLocale({
        path: '/register/registerCode',
        query: {
          ...query,
        },
      });
    } catch (err) {
      //errorMessage.value = (err as Error).message;
    }
  };

  // 跳转至登录
  const goLogin = () => {
    navigateToLocale({ path: '/login' });
  };
  /* 邀请码回填逻辑 */
  const inviteDisable = ref(false);
  /**
   * 合作伙伴码
   */
  const showVipCode = ref(false);
  onMounted(() => {
    if (route.query.inviteCode || route.query.invitecode) {
      registerInfo.invitationCode = (route.query.inviteCode as string) || (route.query.invitecode as string);
      // showInvitation.value = true;
      inviteDisable.value = true;
    }
    if (route.query.vipCode || route.query.vipcode) {
      registerInfo.partnerCode = (route.query.vipcode as string) || (route.query.vipCode as string);
      // showInvitation.value = true;
      showVipCode.value = true;
    }
  });
  const localePath = useLocalePath();
</script>

<style lang="less" scoped>
  .register-wrapper {
    background-color: var(--color-bg-fg);
    min-height: inherit;
    padding: 40px 30px;
    min-height: calc(100vh - 128px);
    .title {
      color: var(--color-text-1);
      font-size: 50px;
      margin-bottom: 20px;
    }
    .region-wrapper {
      display: flex;
      align-items: center;
      font-size: 28px;
      .label {
        color: var(--color-text-2);
      }
    }
    .tabs-wrapper {
      display: flex;
      justify-content: flex-end;
      font-size: 28px;
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
    .form-wrapper {
      :deep(.arco-input) {
        font-size: 28px;
      }
      :deep(.arco-feedback-icon.arco-feedback-icon-status-error) {
        display: none !important;
      }
      :deep(.arco-icon-hover.arco-input-icon-hover.arco-input-clear-btn) {
        .arco-icon {
          width: 40px;
          height: 40px;
        }
      }

      .form-item {
        margin-bottom: 40px;
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
    }
    .register-form-input {
      width: 100%;
      color: var(--color-text-1);
      margin-top: 22px;
      .label {
        margin-bottom: 24px;
      }
      .invite-label {
        font-size: 28px;
      }
      .icon {
        font-size: 32px;
      }
      i:before {
        vertical-align: middle;
      }
    }
    .agreement {
      width: 100%;
      font-size: 24px;
      display: flex;
      align-items: center;
      min-height: 48px;
      :deep(.arco-icon-hover.arco-checkbox-icon-hover::before) {
        width: 32px;
        height: 32px;
      }
      :deep(.van-checkbox) {
        width: 50px;
      }
      .link {
        color: #ea4b64;
        line-height: 30px;
      }
    }
    .agreement-out-wrapper {
      padding-bottom: 0 !important;
      :deep(.arco-form-item-message) {
        font-size: 26px;
      }
    }
    .submit {
      margin-top: 16px;
    }
    .login-wrapper {
      font-size: 28px;
      color: var(--color-text-1);
      margin-top: 20px;
      .link {
        color: #ea4b64;
        margin-left: 12px;
      }
    }
    .noPadding {
      padding-left: 0;
      padding-right: 0;
    }
    .show {
      transform: rotate(180deg);
    }
    .agreement-icon {
      width: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .color-text-brand-base {
        color: #ea4b64;
      }
    }
    .agreement-font {
      margin-left: 10px;
    }
  }
  :deep(.van-field__control) {
    caret-color: var(--color-text-static-white) !important;
  }
  :deep(.van-field__control)::placeholder {
    color: var(--color-text-3);
  }
  .errorMsg {
    color: var(--van-field-error-message-color);
    font-size: var(--van-field-error-message-font-size);
    text-align: left;
  }
</style>
