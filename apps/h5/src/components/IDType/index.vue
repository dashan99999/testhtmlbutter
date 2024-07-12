<template>
  <div @click="show = !show" class="w-full h-100 flex items-center justify-between p-r-30 p-r30">
    <slot :data="text">
      <div v-if="!text" class="fs-28 bx-color-input-text-color">
        {{ $t('account.idAuth.individual.base.step1.placeholder2') }}
      </div>
      <div v-else class="fs-28 color-text-1">
        {{ text }}
      </div>
      <IconFont name="arrow_updown" class="fs-28 color-text-2 iconfont" :class="{ hideArea: !show }" />
    </slot>
  </div>
  <van-popup v-model:show="show" position="bottom">
    <van-list>
      <div
        :class="[
          'fs-28',
          'h-80',
          'flex',
          'items-center',
          'justify-center',
          item.value === value ? 'bx-color-primary-color' : 'color-text-2',
        ]"
        @click="handleSelect(item)"
        v-for="item in ID_TYPE"
        :key="item.value"
        >{{ $t(item.label) }}</div
      >
    </van-list>
  </van-popup>
</template>

<script setup lang="ts">
  import { ID_TYPE } from '@bitunix/shared/constants';
  import { useCustomFieldValue } from '@vant/use';
  type PropsType = { modelValue?: string };
  const props = defineProps<PropsType>();
  const emits = defineEmits(['update:modelValue']);
  const value = ref<string>();
  const show = ref(false);
  const { t } = useI18n();
  const text = computed(() => {
    const item = ID_TYPE.find((it) => it.value === value.value);
    if (item) {
      return t(item.label);
    }
    return '';
  });
  watch(
    () => props.modelValue,
    (v) => (value.value = v),
    { immediate: true },
  );
  const handleSelect = (item: { label: string; value: string }) => {
    emits('update:modelValue', item.value);
    value.value = item.value;
    show.value = false;
  };
  useCustomFieldValue(() => value.value);
</script>

<style scoped>
  .hideArea {
    transform: rotateZ(180deg);
  }
</style>
