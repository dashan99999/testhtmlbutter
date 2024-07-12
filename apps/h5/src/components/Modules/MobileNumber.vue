<template>
  <div class="mobile-number">
    <van-field
      v-model="value.mobileNumber"
      :placeholder="placeholder"
      size="large"
      class="common-input mobile-input"
      @blur="getCodeChild()"
      :class="props.class"
      label-align="left"
      :clearable="props.clearable"
    >
      <template #label>
        <AreaSelect :no-bg="props.noBg" v-model:value="value.countryCode" />
      </template>
    </van-field>
  </div>
</template>

<script setup lang="ts">
  import { useCustomFieldValue } from '@vant/use';
  type ValueType = {
    countryCode?: string;
    mobileNumber?: string;
  };
  const props = defineProps<{
    modelValue?: ValueType;
    class?: string;
    clearable?: boolean;
    noBg?: boolean;
    placeholder?: string;
  }>();
  const emits = defineEmits(['update:modelValue', 'get-code']);
  // blur失焦和切换区号校验用户是否存在
  const getCodeChild = () => {
    emits('get-code');
  };
  const { t } = useI18n();
  const placeholder = computed(() => {
    return props.placeholder || t('login.form.phone.placeholder');
  });
  watch(
    () => props.modelValue?.countryCode,
    () => {
      emits('get-code');
    },
  );
  const value = useControlableValue(props, emits, { default: { countryCode: '', mobileNumber: '' }, valueKey: 'modelValue' });
  // const onClear = () => {
  //   emits('update:modelValue', { ...props.modelValue, mobileNumber: '' });
  // };
  useCustomFieldValue(() => ({ countryCode: value.value.countryCode, mobileNumber: value.value.mobileNumber }));
</script>

<style lang="less" scoped>
  .mobile-number {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    :deep(.select-input) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    :deep(.van-field__label) {
      margin-right: 0;
    }
  }
  .mobile-input {
    flex: 1;
    width: 100%;
    :deep(.van-field__control) {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
</style>
