<script setup lang="ts">
  /**
   * bitunix 文本框校验控件 createBy yangshuai 2023-01-28
   * @description 适用于本系统 用于各类型包含校验的文本框.
   * @property {String} inputLabel 文本框名称
   * @property {String} inputType 验证码框类型 (0:手机，1:邮箱，2:谷歌)
   * @property {String} errorMsg 错误提示
   * @property {Boolean} regRepeat 是否检验重复
   * @event {Function} input 输入值发生变化回调
   * @event {String} placeholder input提示
   * @example <VerificationInput input-label="邮箱" input-type="1" @input="callback" />
   */

  import { useDebounceFn } from '@vueuse/core';
  import { mobile_reg, reg_email } from '@bitunix/shared/utils/regexp';
  import { checkAccept } from '@bitunix/shared/api/register';
  import { IconLoading } from '@arco-design/web-vue/es/icon';
  import { px2rem } from '@bitunix/shared/utils/methods';

  interface Props {
    inputLabel?: string;
    inputType: string;
    errorMsg?: string;
    regRepeat?: boolean;
    areaCode?: string;
    placeholder?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    inputLabel: '',
    inputType: '',
    errorMsg: '',
    regRepeat: false,
  });

  const { t } = useI18n();
  const error = ref('');
  const input = ref('');
  const areaCode = ref('');

  watch(
    (): string => props.errorMsg,
    (newValue): void => {
      error.value = newValue;
    },
  );

  const loading = ref(false);
  const validCheckAcceptFn = useDebounceFn(async (accept: string, countryCode?: string): Promise<string> => {
    loading.value = true;
    const result = await checkAccept({ accept: accept, countryCode: countryCode });
    loading.value = false;
    if (result.code !== '0') {
      return result.msg;
    }
    return '';
  }, 500);

  // 校验格式以及是否重复
  const valid = async () => {
    error.value = '';
    if (input.value) {
      error.value = validReg();
      if (!props.regRepeat || error.value) return;
      const msg: string = await validCheckAcceptFn(input.value, areaCode.value);
      if (msg) {
        error.value = msg;
        emit('update:errorStatus', true);
      }
    }
  };

  const validReg = (): string => {
    if (props.inputType === '0') {
      // 手机号
      if (!mobile_reg.test(input.value)) {
        emit('update:errorStatus', true);
        return t('common.regexp.phone');
      }
    } else if (props.inputType === '1') {
      // 邮箱
      if (!reg_email.test(input.value)) {
        emit('update:errorStatus', true);
        return t('common.regexp.email');
      }
    }
    emit('update:errorStatus', false);
    return '';
  };

  const emit = defineEmits(['input', 'update:value', 'update:errorStatus', 'update:areaCode']);
  const inputText = () => {
    valid();
    emit('update:value', input);
    emit('input', input);
  };
  const areaCodeCallback = () => {
    valid();
    emit('update:areaCode', areaCode.value);
  };
</script>

<template>
  <div class="verification-input">
    <div class="label-wrapper"> {{ inputLabel }} </div>
    <div class="input-wrapper">
      <a-input-group style="width: 100%">
        <AreaSelect
          v-if="props.inputType === '0'"
          v-model:value="areaCode"
          :style="{ width: px2rem('110') }"
          @on-change="areaCodeCallback"
        />
        <a-input
          v-model="input"
          size="large"
          class="flex-1"
          @input="inputText"
          @clear="inputText"
          :placeholder="props.placeholder || t('common.security.verification.placeholder.unknown') + props.inputLabel"
          allow-clear
          :error="!!error"
        >
          <template #suffix>
            <div class="send-btn">
              <icon-loading v-if="loading" class="icon" />
            </div>
          </template>
        </a-input>
      </a-input-group>
    </div>
    <div class="errorMsg-wrapper" :class="{ show: !!error }"> {{ error }} </div>
  </div>
</template>

<style scoped lang="less">
  .verification-input {
    position: relative;
    .label-wrapper {
      font-size: 28px;
      color: var(--color-text-2);
      margin-bottom: 12px;
    }
    .input-wrapper {
      .send-btn {
        display: flex;
        width: 10px;
        justify-content: center;
        .icon {
          color: rgb(var(--primary-6));
        }
        .btn {
          cursor: pointer;
          color: rgb(var(--primary-6));
          transition: 0.1s linear;
          &:hover {
            color: rgb(var(--primary-5));
          }
          &.disabled {
            cursor: no-drop;
            color: var(--color-text-4);
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
      opacity: 0;
      transition: 0.2s linear;
      &.show {
        animation: animation 0.6s;
        animation-iteration-count: 2;
        opacity: 1;
      }
    }
    @keyframes animation {
      from {
        opacity: 0.3;
      }
      to {
        opacity: 1;
      }
    }
    :deep(.arco-input-wrapper) {
      padding-left: 30px;
    }
    :deep(.arco-input)::placeholder {
      color: var(--color-text-3);
    }
  }
</style>
