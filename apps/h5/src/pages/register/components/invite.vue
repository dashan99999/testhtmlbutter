<template>
  <div class="wrap" ref="wrap">
    <div ref="inner">
      <section>
        <div class="p30">
          <div class="relative w-full h-143">
            <div
              class="absolute left-0 top-0 flex justify-between bd-bg-interactive p-t26 p-b26 p-l30 p-r60 relative infowrap"
              :class="{ show: showInfo }"
            >
              <van-image
                v-if="data?.avatar"
                :show-loading="false"
                round
                :width="px2rem('96px')"
                :height="px2rem('96px')"
                :src="`${data?.avatar}?x-image-process=image/format,webp/quality,q_80/resize,w_200,h_200`"
                alt="UbitEx"
              />
              <div class="b-r100 flex items-center justify-center w-96 h-96" v-else>
                <!-- <SvgIcon name="bx-icon:logo_invite" w="48" h="48" /> -->
                <img class="h-78 w-auto" :src="Logo" alt="UbitEx earn" />
              </div>
              <div class="flex-1 flex flex-col items-start m-l-16 m-t-10">
                <div class="color-text-1 fs-30">
                  <i18n-t keypath="register.invite_from" scope="global">
                    <template #user>
                      <span class="color-text-brand-base">{{ data?.nickName ?? 'UbitEx' }}</span>
                    </template>
                  </i18n-t>
                </div>
                <div class="color-text-2 fs-26 p-t-12 info ellipsis w-full" ref="textwrap"
                  >{{ data?.content ?? $t('register.invite_text_1') }}
                </div>
              </div>
              <IconFont
                v-show="isElipsis"
                name="slidedown"
                class="color-text-2 icon absolute fs-32 color-text-1"
                @click="showInfo = !showInfo"
              />
            </div>
          </div>
          <div class="flex flex-col items-center justify-around p-t70 p-b64">
            <van-image :show-loading="false" :width="px2rem('286px')" :height="px2rem('223px')" :src="banner" alt="" />
            <div class="tag fs-24">{{ $t('register.invite_new') }}</div>
            <div class="text-center fs-40 fw-700 leh-50">
              <i18n-t keypath="register.invite_value" scope="global">
                <template #num>
                  <div class="sub"><span class="sub-clip">5500 USDT</span></div>
                </template>
              </i18n-t>
            </div>
          </div>
        </div>
      </section>
      <section class="b-r-10 bottom-popup" @tap="handleFocus" ref="popup">
        <div class="fs-40 fm-bold m-b36">{{ $t('register.invite_register') }}</div>
        <div style="display: none">
          <AreaSelect
            :popupTitle="$t('account.idAuth.individual.base.step1.value1')"
            v-model:value="model.nation"
            no-bg
            region
            style="color: #ffffff"
            @on-change="handleAreaChange"
          />
        </div>
        <div>
          <van-form ref="form" :validate-trigger="['onChange']" @submit="execute">
            <div class="tabs">
              <div
                class="tab"
                :class="{ active: registerType === 'email' }"
                @tap="
                  () => {
                    registerType = 'email';
                  }
                "
              >
                {{ $t('login.form.email') }}
              </div>
              <div
                class="tab"
                :class="{ active: registerType === 'mobile' }"
                @tap="
                  () => {
                    registerType = 'mobile';
                  }
                "
              >
                {{ $t('login.form.phone') }}
              </div>
            </div>
            <van-field
              @focus="handleFocus"
              :placeholder="$t('login.form.email.placeholder')"
              :rules="[{ validator: validEmailRepeat }]"
              class="bx-input m-t-40 email"
              @end-validate="(errors) => handleEndValidate('email', errors)"
              :error-message="errorState.email"
              :error="!!errorState.email"
              v-model="model.account"
              v-if="registerType === 'email'"
            />
            <van-field
              @focus="handleFocus"
              name="mobileNumber"
              :rules="[{ validator: validMobile }]"
              :placeholder="$t('login.form.phone.placeholder')"
              class="bx-input no-padding m-t-40 no-error mobile"
              @end-validate="(errors) => handleEndValidate('mobile', errors)"
              :error="!!errorState.mobile"
              v-if="registerType === 'mobile'"
            >
              <template #input>
                <MobileNumber no-bg v-model="model.mobileNumber" class="error-container" />
              </template>
              <template #error-message>
                {{ errorState.mobile }}
              </template>
            </van-field>
            <div class="m-t-32 password">
              <van-field
                @focus="handleFocus"
                :rules="[{ validator: validPassword }]"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                v-model="model.password"
                :placeholder="$t('login.form.password.placeholder')"
                class="bx-input"
                @end-validate="(errors) => handleEndValidate('password', errors)"
                :error-message="errorState.password"
                :error="!!errorState.password"
              >
                <template #right-icon>
                  <SvgIcon
                    @tap="showPassword = !showPassword"
                    :name="showPassword ? 'bx-icon:assets_homesee' : 'bx-icon:assets_homesee_off'"
                    w="32"
                    h="32"
                  />
                </template>
              </van-field>
            </div>
            <div class="flex items-center flex-start fs-28 p-t32 p-b32">
              <span class="color-text-2 m-r16">{{ $t('register.form.invite') }}</span>
              <!-- <IconFont name="slidedown" class="color-text-2 fs-32" :class="{ show: showInvitation }" /> -->
            </div>
            <div v-show="showInvitation">
              <div class="p-b32" v-if="!showVipCode">
                <van-field
                  maxlength="20"
                  v-model="model.invitationCode"
                  :disabled="inviteDisable"
                  :placeholder="$t('register.form.invite.placeholder')"
                  class="bx-input"
                />
              </div>
              <div class="p-b32" v-else>
                <van-field
                  maxlength="20"
                  :disabled="true"
                  v-model="model.partnerCode"
                  :placeholder="$t('register.form.invite.placeholder')"
                  class="bx-input"
                />
              </div>
            </div>
            <div class="fs-24 color-text-2 m-b60" v-if="!!ratio">
              <i18n-t keypath="register.invite_qy" scope="global">
                <template #percent>
                  <span class="bx-color-white-text-color">{{ ratio }}%</span>
                </template>
              </i18n-t>
              <IconFont name="choose_single" class="bx-color-white-text-color fs-24 m-l12" />
            </div>
            <div class="m-t60">
              <van-field class="agreement" name="agreement">
                <template #input>
                  <div class="flex items-center">
                    <div class="flex items-center m-r12">
                      <SvgIcon
                        @tap="model.agreement = !model.agreement"
                        :name="model.agreement ? 'bx-icon:choose' : 'bx-icon:unchoose'"
                        w="33"
                        h="33"
                      />
                    </div>
                    <div class="">
                      <span class="color-text-2">{{ $t('register.form.agreement') }}</span>
                      <NuxtLink :to="localePath('/cms/agreement')" target="_blank" class="color-text-brand-base p-[0,6]">{{
                        $t('register.form.userAgreement')
                      }}</NuxtLink>
                      <span class="color-text-2">、</span>
                      <NuxtLink :to="localePath('/cms/privacy')" target="_blank" class="color-text-brand-base p-[0,6]">{{
                        $t('register.form.privacyPolicy')
                      }}</NuxtLink>
                    </div>
                  </div>
                </template>
              </van-field>
              <div class="m-t24">
                <van-button native-type="submit" :disabled="disabledSubmit" :loading="isLoading" type="primary" block>{{
                  $t('register.invite_get')
                }}</van-button>
              </div>
            </div>
          </van-form>
          <div class="h-1 bx-bg-bg-interactive-active w-full m-t80 m-b80 fm-bold"></div>
          <div class="fm-bold fs-36 color-text-1 leh-50">{{ $t('register.invite_text_1') }}</div>
          <section class="flex p-t64 p-b64">
            <div>
              <div class="color-text-brand-base fs-40 fm-bold">&gt;&nbsp;1.3M</div>
              <div class="fs-28 color-text-2 m-t8">{{ $t('register.invite_text_2') }}</div>
            </div>
            <div class="m-l52">
              <div class="color-text-brand-base fs-40 fm-bold">&gt;&nbsp;80M</div>
              <div class="fs-28 color-text-2 m-t8">{{ $t('register.invite_text_3') }}</div>
            </div>
            <div class="m-l52">
              <div class="color-text-brand-base fs-40 fm-bold">&gt;&nbsp;200M</div>
              <div class="fs-28 color-text-2 m-t8">{{ $t('register.invite_text_4') }}</div>
            </div>
          </section>
          <section>
            <div class="fs-28 bx-color-white-text-color fm-medium">{{ $t('register.invite_text_5') }}</div>
            <div class="color-text-2 fs-24 m-t12 lh-150%">{{ $t('register.invite_text_6') }}</div>
          </section>
          <div class="h-1 bx-bg-bg-interactive-active w-full m-t32 m-b32"></div>
          <section>
            <div class="fs-28 bx-color-white-text-color fm-medium">{{ $t('register.invite_text_7') }}</div>
            <div class="color-text-2 fs-24 m-t12 lh-150%">{{ $t('register.invite_text_8') }}</div>
          </section>
          <div class="h-1 bx-bg-bg-interactive-active w-full m-t32 m-b32"></div>
          <section>
            <div class="fs-28 bx-color-white-text-color fm-medium">{{ $t('register.invite_text_9') }}</div>
            <div class="color-text-2 fs-24 m-t12 lh-150%">{{ $t('register.invite_text_10') }}</div>
          </section>
          <div class="h-1 bx-bg-bg-interactive-active w-full m-t32 m-b32"></div>
          <section>
            <div class="fs-28 bx-color-white-text-color fm-medium">{{ $t('register.invite_text_11') }}</div>
            <div class="color-text-2 fs-24 m-t12 lh-150%">{{ $t('register.invite_text_12') }}</div>
          </section>
          <section class="m-t80 b-r16 bx-bg-primary-color w-full h-296 relative p-l30 p-r30 p-t48 p-b30 flex flex-col">
            <!-- <img class="w-40 h-auto" :src="Logo4" alt="UbitEx" /> -->
            <!-- <NuxtImg class="w-100 h-auto" format="webp" src="/images/ic_dark_logo.png" /> -->
            <div class="text-40 fm-bold mw-text bx-color-bg">UbitEx</div>
            <div class="bx-color-bg fm-bold m-t32 mw-text lh-120%" :class="{ 'fs-40': isZh, 'fs-32': !isZh }">{{
              $t('register.invite_text_13')
            }}</div>
            <div style="color: #ea4b64" class="fs-24 m-t16 lh-24 mw-text">{{ $t('register.invite_text_14') }}</div>
            <NuxtImg class="person" format="webp" src="/images/invite-person.svg" />
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { px2rem } from '@bitunix/shared/utils/methods';
  import banner from '~/assets/images/invite-banner.svg';
  import Logo from '~/assets/images/logo3.svg';
  import Logo4 from '~/assets/images/logo4.svg';
  // import logo from '~/assets/images/invite-logo.svg';
  import type { FormInstance } from 'vant';
  import { getInvitePartner } from '@bitunix/shared/api/register';
  import { graphicVerification } from '@bitunix/shared/utils/auth';
  import { Md5 } from 'ts-md5/dist/esm/md5';
  import { useAsyncState } from '@vueuse/core';
  import { emailRegisterCheck, mobileRegisterCheck } from '@bitunix/shared/api/register';
  import { RegisterCheckParams } from '@bitunix/shared/api/register/types';
  import { showToast } from '#shared/utils/vant';
  import { mobile_reg, reg_email, reg_password, validCheckAcceptFn } from '@bitunix/shared/utils/regexp';
  import { useDebounceFn } from '@vueuse/core';

  type ErrorState = Record<'email' | 'mobile' | 'password', string>;
  type ValidateMsgType = { message: string; status: 'failed' | 'passed' };
  const registerType = ref<'email' | 'mobile'>('email');
  const textwrap = ref<HTMLDivElement>();
  const showInfo = ref(false);
  const route = useRoute();
  const showVipCode = ref(false);
  const inviteDisable = ref(false);
  const showInvitation = ref(true);
  const isValidating = ref(false);
  const isElipsis = ref(false);
  const popup = ref<HTMLDivElement>();
  const wrap = ref<HTMLDivElement>();
  const form = ref<FormInstance>();
  const localePath = useLocalePath();
  const errorState = reactive<ErrorState>({
    email: '',
    mobile: '',
    password: '',
  });
  const showPassword = ref(false);
  const { t, locale } = useI18n();
  const isZh = computed(() => locale.value === 'zh-cn');
  const model = reactive<RegisterCheckParams>({
    agreement: true,
    areaCode: '',
    mobileNumber: { mobileNumber: '', countryCode: '' },
    password: '',
    invitationCode: '',
    partnerCode: '',
    nation: '',
    account: '',
  });

  // 表单验证 手机号验证
  const validMobile = async (value: { mobileNumber: string; countryCode: string }) => {
    if (value.mobileNumber) {
      if (!mobile_reg.test(value.mobileNumber)) {
        return t('common.regexp.phone');
      }
      try {
        isValidating.value = true;
        const msg: string = await validCheckAcceptFn(value.mobileNumber, value.countryCode);
        if (msg) {
          return msg;
        }
      } catch (e) {
      } finally {
        isValidating.value = false;
      }
    }
    return true;
  };
  const handleEndValidate = (name: keyof ErrorState, results: ValidateMsgType | ValidateMsgType[]) => {
    let msg = '';
    const errors = Array.isArray(results) ? results : [results];
    if (errors.length) {
      const error = errors[0];
      msg = error.message;
    }
    errorState[name] = msg;
  };
  // 校验格式以及是否重复
  const validEmailRepeat = async (value?: string) => {
    if (value) {
      if (!reg_email.test(value)) {
        return t('common.regexp.email');
      }
      const msg: string = await validCheckAcceptFn(value);
      if (msg) {
        return msg;
      }
    }
    return true;
  };
  // 校验密码必须输入8-20位大小写必须经过MD5加密
  const validPassword = async (value: string) => {
    if (value && !reg_password.test(value)) {
      return t('common.regexp.password');
    }
    return true;
  };
  const initElipsis = () => {
    isElipsis.value = (textwrap.value?.clientWidth ?? 0) < (textwrap.value?.scrollWidth ?? 0);
  };
  const { data } = useLazyAsyncData(
    async () => {
      if (route.query.inviteCode || route.query.invitecode) {
        return {
          futureRatio: 0,
          exchangeRatio: 0,
        };
      }
      const res = await getInvitePartner({
        partnerCode: (route.query.vipCode || route.query.vipcode) as string,
      });
      return res.data;
    },
    {
      server: false,
      watch: [locale],
    },
  );
  // 监听手机输入框
  watch(
    () => model.mobileNumber,
    (val: { mobileNumber: string; countryCode: string }) => {
      model.areaCode = val.countryCode;
      model.account = val.mobileNumber;
    },
    {
      deep: true,
    },
  );
  const disabledSubmit = computed(() => {
    let flag = true;
    if (registerType.value === 'email') {
      flag = !!errorState.email;
    } else {
      flag = !!errorState.mobile;
    }
    if (!flag) {
      flag = !!errorState.password;
    }
    return flag || !model.account || !model.agreement || !model.password || !model.invitationCode;
  });
  watchWithTransitionEnd(
    () => data.value?.content,
    () => {
      initElipsis();
    },
    { immediate: true },
  );
  const { execute, isLoading } = useAsyncState(
    async () => {
      try {
        let params: any = { ...toRaw(model) };
        params.password = Md5.hashStr(model.password);
        let result: any = { token: '' };

        const validateResult = await graphicVerification({
          captchaId: '212fdaf3ba981f19c050e5a1c524397a',
        });
        if (validateResult === 'close') {
          return;
        }
        params = {
          ...params,
          lotNumber: (validateResult as any).lot_number,
          captchaOutput: (validateResult as any).captcha_output,
          passToken: (validateResult as any).pass_token,
          genTime: (validateResult as any).gen_time,
        };
        if (registerType.value === 'email') {
          result = await emailRegisterCheck(params);
        } else {
          result = await mobileRegisterCheck(params);
        }
        if (result.code !== '0') {
          showToast(result.msg);
          return;
        }
        const query: any = {
          token: result.data.token,
          account: model.account,
        };
        if (registerType.value === 'mobile') {
          query.country = model.areaCode;
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
    },
    undefined,
    { immediate: false },
  );
  const handleAreaChange = (item: any) => {
    model.mobileNumber.countryCode = item.code;
  };
  const ratio = computed(() => {
    if (data.value) {
      const { futureRatio, exchangeRatio } = data.value;
      const v1 = Number(futureRatio);
      const v2 = Number(exchangeRatio);
      if (v1 === 0 && v2 === 0) {
        return 0;
      }
      const v = v1 > v2 ? v1 : v2;
      return v;
    }
    return 0;
  });
  watch(
    () => registerType.value,
    () => {
      model.account = '';
      model.password = '';
      model.mobileNumber.mobileNumber = '';
      errorState.email = '';
      errorState.password = '';
      errorState.mobile = '';
      form.value?.resetValidation();
    },
  );
  const handleResize = useDebounceFn(() => {
    scroll.value?.refresh();
    setTimeout(() => {
      scroll.value?.scrollToElement(popup.value!, 500, 0, 0);
    }, 100);
  }, 100);
  const handleFocus = () => {
    scroll.value?.scrollToElement(popup.value!, 500, 0, 0);
  };
  const inner = ref();
  const { instance: scroll } = useBetterScroll(wrap, {
    scrollY: true,
    click: true,
    tap: 'tap',
  });
  watch(
    () => showInvitation.value,
    () => {
      nextTick(() => {
        scroll.value?.refresh();
      });
    },
  );
  onMounted(() => {
    window.addEventListener('resize', handleResize);
    initElipsis();
    if (route.query.inviteCode || route.query.invitecode) {
      model.invitationCode = (route.query.inviteCode as string) || (route.query.invitecode as string);
      inviteDisable.value = true;
    }
    if (route.query.vipCode || route.query.vipcode) {
      model.partnerCode = (route.query.vipcode as string) || (route.query.vipCode as string);
      showVipCode.value = true;
    }
  });
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    stop();
  });
</script>

<style lang="less" scoped>
  .bx-input {
    border-radius: 10px;
    border: 1px solid var(--color-bg-interactive-strong);
    :deep(.van-field__control) {
      background-color: var(--bx-bg-fg) !important;
    }
  }

  .tag {
    position: relative;
    min-width: 277px;
    width: auto;
    height: 56px;
    text-align: center;
    line-height: 56px;
    margin: 24px 0;
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }
    &::before,
    &::after {
      content: '';
      left: 0;
      display: block;
      width: 100%;
      height: 1px;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 51.04%, rgba(255, 255, 255, 0) 100%);
    }
  }
  .sub {
    text-transform: capitalize;
    background: linear-gradient(92deg, #ea4b64 10.48%, var(--color-text-3) 91.39%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  .sub-clip {
    font-family: HarmonyOS Sans SC;
  }
  .bottom-popup {
    position: relative;
    padding: 72px 30px 30px;
    box-sizing: border-box;
    background-color: var(--bx-bg-fg);
    transition: transform 0.2s linear;
    border-radius: 32px;
    &::before {
      content: '';
      display: block;
      width: 78px;
      height: 8px;
      border-radius: 4px;
      background: var(--color-border-input);
      position: absolute;
      left: 0;
      right: 0;
      top: 16px;
      margin: auto;
    }
  }
  .agreement {
    padding: 0;
  }
  .person {
    position: absolute;
    bottom: 0;
    right: 20px;
    width: 222px;
  }
  .mw-text {
    max-width: 448px;
    white-space: wrap;
  }
  .wrap {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }
  .icon {
    right: 30px;
    top: 50px;
    width: 32px;
    height: 32px;
    transition: transform 0.2s linear;
  }
  .info {
    height: auto;
    width: 450px;
    box-sizing: border-box;
    line-height: 39px;
    animation: hide 0.5s linear forwards;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .infowrap {
    border-radius: 16px;
    z-index: 2;
    background: var(--bx-bg);
    &.show {
      .icon {
        transform: rotate(180deg);
      }
      .info {
        white-space: normal !important;
        text-overflow: initial !important;
        overflow: initial !important;
      }
    }
  }
  .password {
    :deep(.van-field__body) {
      position: relative;
      .van-field__right-icon {
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .van-field__control {
        padding-right: 100px;
      }

      .van-field__clear {
        position: absolute;
        right: 0;
        width: 130px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
  .email {
    :deep(.van-field__body) {
      position: relative;
      .van-field__clear {
        position: absolute;
        right: 20px;
        width: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .tabs {
    display: flex;
    justify-content: flex-start;
    .tab {
      font-size: 32px;
      margin-top: 28px;
      color: var(--color-text-2);
      padding-bottom: 16px;
      &.active {
        color: var(--color-text-3);
        position: relative;
        &::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          position: absolute;
          bottom: 0;
          margin: auto;
          left: 0;
          right: 0;
          border-radius: 10px;
          background: #ea4b64;
        }
      }
    }
    .tab + .tab {
      margin-left: 48px;
    }
  }
</style>
