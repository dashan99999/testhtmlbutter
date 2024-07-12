<script setup lang="ts">
  /**
     * bitunix 获取验证码控件 createBy yangshuai 2023-01-28
     * @description 适用于本系统 用于获取各种短信验证码.
     * @property {String} inputLabel 验证码框名称
     * @property {String} inputType 验证码框类型 (0:手机，1:邮箱，2:谷歌)
     * @property {String} sendType 发送短信类型（具体根据接口来
     *  1.登陆验证
        2.绑定手机验证 场景拆分如下:
        2:向绑定的新手机发送验证码
        29:向已绑定的邮箱发送验证码（如果需要）
        3.修改绑定手机验证 场景已经拆分如下：
        3 ：给需要绑定的手机发验证码
  	    27 ：给用户已经绑定的手机发验证码
        28：给用户已经绑定的邮箱发验证码（如果需要）
        4.绑定Google验证器 （已废弃）
        5.解绑Google验证器
        6-两步验证的开关处理
        7-设置登录密码
        8-修改登录密码
        9-重置登录密码
        10-设置防钓鱼码
        11-修改防钓鱼码
        12-重置资金密码
        13-第三方注册（绑定旧帐号）
        14-设置资金密码
        15-修改资金密码
        16-注册验证
        17-注销账号
        18-绑定邮箱验证场景拆分如下：
        18:向绑定的新邮箱发送验证码
        30:向已绑定的手机发送验证码 （如果需要）
        19-修改邮箱验证 场景已经拆分如下：
        19 ：给新绑定的邮箱发验证码
        27：给用户已经绑定的手机发验证码（如果需要）
  		  28：给用户已经绑定的邮箱发验证码
        20-选择不可用安全项（已废弃）
        21-可用安全项验证
        22-新安全项验证
        23-提交人工审核成功（等待开发）
        24-人工审核完毕-未通过审核（等待开发）
        25-人工审核完毕-通过审核（等待开发）
        26 -提币操作
        33 -密码错误次数提醒
        34 - 账号冻结提醒
        35 - 异地登录风控提醒
        36 - 后台管理系统发送GoogleAuthKey
        53- 绑定谷歌验证器
        60-修改谷歌验证器
        101-创建API
        102-修改API
        103-查看Secret Key
     * @property {String} account 接收者
     * @property {String} country 区号
     * @property {String} errorMsg 错误提示
     * @property {Boolean} unShow 是否不显示account
     * @property {Boolean} unShowBtn 是否隐藏获取验证码按钮
     * @property {Boolean} disabled 获取验证码按钮禁用
     * @property {String} token Token
     * @property {Boolean} isLogin 是否是登录页面使用
     * @property {String} emailText 显示的邮箱
     * @property {String} phoneText 显示的电话
     * @property {String} countryCodeText 显示的电话
     * @event {Function} input 输入值发生变化回调
     * @example <VerificationCodeInput input-label="邮箱" input-type="1" @input="callback" />
     */

  //import { PropsTest } from './types';
  import { showToast } from '@bitunix/shared/utils/vant';

  import { sendVerificationCode } from '@bitunix/shared/api/assets';

  import { sendCode } from '@bitunix/shared/api/app/index';
  import { graphicVerification } from '@bitunix/shared/utils/auth';
  import type { SendCodeParams } from '@bitunix/shared/api/app/types';
  import { useUserStore } from '@bitunix/shared/store';
  import { px2rem } from '@bitunix/shared/utils/methods';
  import { useCustomFieldValue } from '@vant/use';
  interface Props {
    inputLabel?: string;
    inputType: string;
    sendType?: string;
    account?: string;
    country?: string;
    errorMsg?: string;
    unShow?: boolean;
    unShowBtn?: boolean;
    disabled?: boolean;
    token?: string;
    isLogin?: boolean;
    emailText?: string;
    phoneText?: string;
    countryCodeText?: string;
    value?: string;
    special?: boolean;
    codeDate?: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    inputLabel: '',
    inputType: '',
    sendType: '',
    account: '',
    country: '',
    errorMsg: '',
    unShow: false,
    unShowBtn: false,
    disabled: false,
    token: '',
    isLogin: true,
    emailText: '',
    phoneText: '',
    countryCodeText: '',
    special: false,
    codeDate: {},
  });

  const { t } = useI18n();
  const error = ref('');
  const emit = defineEmits(['input', 'update:value', 'sendCode']);
  const code = useControlableValue(props, emit);
  watch(
    (): string => props.errorMsg,
    (newValue): void => {
      error.value = newValue;
    },
  );
  const inputText = () => {
    emit('input', code);
    error.value = '';
  };

  const timer = ref<NodeJS.Timer | null>(null);
  const state = reactive({
    time: 60,
    btnText: t('common.security.verification.send'),
    loading: false,
  });
  const params: SendCodeParams = reactive({
    account: computed((): string => props.account),
    country: computed((): string => props.country),
    isEmail: computed((): string => props.inputType),
    type: computed((): string => props.sendType),
    token: computed((): string => props.token),
  });
  //发送验证码
  const SendCode = async (): Promise<void> => {
    if (state.loading || state.time < 60 || props.disabled) {
      return;
    }
    state.loading = true;
    let data;
    if (!props.special) {
      data = await sendCode(params);
    } else {
      data = await sendVerificationCode(props.codeDate);
    }
    if (data.code === '0') {
      showToast(t('common.security.verification.sendSuccess.tip'));
      timer.value = setInterval(() => {
        if (state.time > 1) {
          state.time--;
          state.btnText = `${t('common.registerCode.reSend')} (${state.time.toString()})`;
          state.loading = false;
        } else {
          state.time = 60;
          if (timer.value) {
            clearInterval(timer.value);
          }
          timer.value = null;
          state.btnText = t('common.security.verification.send');
        }
      }, 1000);
    } else if (data.code === '11000') {
      // 弹出图形验证码
      const result = await graphicVerification({
        captchaId: '58382417a08f1fdc6a37894385e971ce',
      });
      if (result !== 'close') {
        const validateResult: any = {
          lotNumber: (result as any).lot_number,
          captchaOutput: (result as any).captcha_output,
          passToken: (result as any).pass_token,
          genTime: (result as any).gen_time,
        };
        let verifyData;
        if (!props.special) {
          verifyData = await sendCode(Object.assign({}, params, validateResult));
        } else {
          verifyData = await sendVerificationCode(Object.assign({}, props.codeDate, validateResult));
        }
        if (verifyData.code === '0') {
          showToast(t('common.security.verification.sendSuccess.tip'));
          timer.value = setInterval(() => {
            if (state.time > 1) {
              state.time--;
              state.btnText = `${t('common.registerCode.reSend')} (${state.time.toString()})`;
              state.loading = false;
            } else {
              state.time = 60;
              if (timer.value) {
                clearInterval(timer.value);
              }
              timer.value = null;
              state.btnText = t('common.security.verification.send');
            }
          }, 1000);
        } else {
          showToast(verifyData.msg);
          state.loading = false;
        }
      } else {
        state.loading = false;
      }
    } else {
      showToast(data.msg);
      state.loading = false;
    }
  };

  const desensitization = computed(() => {
    const text = props.country + props.account;
    if (text.indexOf('@') > -1) {
      return text.replace(/^(.{0,3}).*@(.*)$/, '$1***@$2');
    } else {
      return text.replace(/^(.{3})(?:\d+)(.{2})$/, '$1****$2');
    }
  });
  useCustomFieldValue(() => {
    return code.value;
  });
  onMounted(() => {
    state.btnText = t('common.security.verification.send');
  });
  onUnmounted(() => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
      state.btnText = t('common.security.verification.send');
    }
  });
  const userStore = useUserStore();
  const showText = computed(() => {
    let ret: string | undefined = '';
    if (props.isLogin) {
      if (props.inputType == '1') {
        ret = userStore.email?.replace(/^(.{0,3}).*@(.*)$/, '$1***@$2');
      }
      if (props.inputType == '0') {
        ret = (props.country || userStore.countryCode) + ' ' + userStore.mobileNumber?.replace(/^(.{3})(?:\d+)(.{2})$/, '$1****$2');
      }
    } else {
      if (props.inputType == '1') {
        ret = props.emailText?.replace(/^(.{0,3}).*@(.*)$/, '$1***@$2');
      }
      if (props.inputType == '0') {
        ret = props.countryCodeText + ' ' + props.phoneText.replace(/^(.{3})(?:\d+)(.{2})$/, '$1****$2');
      }
    }
    return ret;
  });
</script>

<template>
  <div class="verification-code-input">
    <div class="label-wrapper">
      {{ inputLabel }} {{ !unShow && account && !disabled ? `（${desensitization}）` : '' }}
      <span class="color-text-2 m-l16">{{ unShow ? '' : showText }}</span>
    </div>
    <div class="h-100 w-full b-r10 p-[0,32] input-wrapper" :class="{ error: !!error }">
      <input
        v-model="code"
        :max-length="6"
        @keyup="code = code.replace(/[^\d]/g, '')"
        @input="inputText"
        :placeholder="$t('common.security.verification.placeholder')"
        class="fs-28 h-100 flex-1 b-r10 m-r24"
        :disabled="state.loading"
      />
      <div
        class="clear"
        v-show="!!code"
        @click="
          () => {
            code = '';
            inputText();
          }
        "
      >
        <IconFont name="close_search" class="color-text-2 fs-24" />
      </div>
      <div class="send-btn" v-if="!props.unShowBtn">
        <slot>
          <van-loading :size="px2rem('36px')" color="var(--color-text-2)" type="circular" v-if="state.loading" class="icon" />
          <span v-else class="btn min-w-150" :class="{ disabled: state.time < 60 || disabled }" @click="SendCode">{{ state.btnText }}</span>
        </slot>
      </div>
    </div>
    <slot name="error" :text="error">
      <div class="errorMsg-wrapper" v-show="!!error">
        {{ error }}
      </div>
    </slot>
  </div>
</template>

<style scoped lang="less">
  .clear {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 100px;
    margin-right: 16px;
  }
  .verification-code-input {
    position: relative;
    // margin-bottom: 50px;
    .label-wrapper {
      font-size: 28px;
      color: var(--color-text-1);
      margin-bottom: 24px;
    }
    .input-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid var(--color-bg-interactive-strong);
      &:focus,
      &:hover {
        border: 1px solid #ea4b64;
      }
      &.error {
        border: 1px solid var(--color-border-error);
      }
      input {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background-color: transparent;
      }
      .send-btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .icon {
          color: var(--color-fill-bitgreen);
        }
        .btn {
          font-size: 28px;
          text-align: right;
          cursor: pointer;
          color: #ea4b64;
          transition: 0.1s linear;
          &:hover {
            color: rgb(var(--primary-5));
          }
          &.disabled {
            cursor: no-drop;
            color: var(--color-text-2);
          }
        }
      }
    }
    .errorMsg-wrapper {
      height: 26px;
      line-height: 26px;
      margin-top: 22px;
      color: rgb(var(--danger-6));
      font-size: 26px;
      transition: 0.2s linear;
    }
    @keyframes animation {
      from {
        opacity: 0.3;
      }
      to {
        opacity: 1;
      }
    }
  }
</style>
