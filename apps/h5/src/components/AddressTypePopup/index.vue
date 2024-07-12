<template>
  <div @click="show = !show" class="w-full h-100 flex items-center justify-between">
    <slot :data="text">
      <div class="flex items-center">
        <div v-if="!text" class="fs-28 color-text-2">
          {{ $t('common.placeholder.select') }}
        </div>
        <div v-else class="fs-28 color-text-1">
          {{ text }}
        </div>
      </div>
      <IconFont name="go" class="color-text-2 fs-26 p-r-30" />
    </slot>
  </div>
  <van-popup v-model:show="show" position="bottom">
    <van-picker :loading="isLoading" :columns="state" @cancel="show = false" @confirm="onConfirm" />
  </van-popup>
</template>

<script setup lang="ts">
  import { useCustomFieldValue } from '@vant/use';
  import { useAsyncState } from '@vueuse/core';
  import { getKycAddressTypes } from '@bitunix/shared/api/account';
  import type { PickerConfirmEventParams } from 'vant';
  type PropsType = { modelValue?: string };
  const props = defineProps<PropsType>();
  const emits = defineEmits(['update:modelValue']);
  const value = ref<string>();
  const show = ref(false);
  const { t } = useI18n();
  const { isLoading, state } = useAsyncState(
    async () => {
      const res = await getKycAddressTypes();
      return res.data.map((it) => ({
        text: it.msg,
        value: it.code,
      }));
    },
    [],
    { immediate: true },
  );
  const text = computed(() => {
    const item = state.value.find((it) => it.value === value.value);
    if (item) {
      return t(item.text);
    }
    return '';
  });
  watch(
    () => props.modelValue,
    (v) => (value.value = v),
    { immediate: true },
  );
  const onConfirm = ({ selectedValues }: PickerConfirmEventParams) => {
    const newValue = selectedValues.length ? (selectedValues[0] as string) : '';
    emits('update:modelValue', newValue);
    value.value = newValue;
    show.value = false;
  };
  useCustomFieldValue(() => value.value);
</script>

<style></style>
