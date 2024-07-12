<template>
  <div @click="show = !show" class="w-full h-100 flex items-center justify-between p-r-30">
    <slot :data="value">
      <div v-if="!props.modelValue.length" class="fs-28 bx-color-input-text-color">
        {{ placeholders }}
      </div>
      <div v-else class="fs-28 color-text-1">
        {{ props.modelValue }}
      </div>
      <SvgIcon name="svg-calendar" w="30" h="30" />
    </slot>
  </div>
  <van-popup v-model:show="show" position="bottom">
    <van-date-picker
      :confirm-button-text="$t('account.apiManagement.edit.btn')"
      :cancel-button-text="$t('account.apiManagement.cancel.btn')"
      :model-value="defaultValue"
      :formatter="props.formatter"
      :title="pickerTitle"
      @cancel="show = false"
      @confirm="handleConfirm"
      :max-date="maxDate"
      :min-date="minDate"
    />
  </van-popup>
</template>

<script setup lang="ts">
  import { useCustomFieldValue } from '@vant/use';
  type PropsType = { placeholder?: string; title?: string; modelValue: string; formatter?: any };
  const props = defineProps<PropsType>();
  const value = ref<string[]>([]);
  const defaultValue = ref<string[]>([]);
  const emits = defineEmits(['update:modelValue']);
  const show = ref(false);
  const { t } = useI18n();
  // 设置最大可选时间为今天
  const maxDate = ref(new Date());
  // 设置最小可选时间
  const minDate = ref(new Date(1900, 0, 1));
  const placeholders = computed(() => props.placeholder ?? t('common.placeholder.select'));
  watch(
    () => props.modelValue,
    (v) => {
      if (v) {
        value.value = v.split('-');
      } else {
        // 默认从今天开始选择
        const date = new Date();
        defaultValue.value = [
          String(date.getFullYear()),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0'),
        ];
      }
    },
    {
      immediate: true,
    },
  );
  const pickerTitle = computed(() => props.title ?? t('common.placeholder.select'));
  const handleConfirm = ({ selectedValues }: any) => {
    emits('update:modelValue', selectedValues.join('-'));
    value.value = selectedValues;
    show.value = false;
  };
  useCustomFieldValue(() => {
    return value.value;
  });
</script>

<style lang="less" scoped></style>
