<template>
  <div class="color-text-2 fs-28 my-auto mx-auto fm-medium text-center">
    <SvgIcon v-if="currentColor === 'dark'" class="mb-16" name="bx-icon:bx-empty" w="200" h="200" />
    <SvgIcon v-else class="mb-16" name="bx-icon:bx-empty-light" w="200" h="200" />
    <br />
    {{ $t(props.displayText) }}
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '#shared/store';

  const appStore = useAppStore();

  const currentColor = computed(() => {
    const afferentColor = props.dark ? 'dark' : props.light ? 'light' : '';
    return afferentColor || appStore.theme;
  });

  interface Props {
    displayText?: string;
    dark?: boolean;
    light?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    displayText: 'common.noData',
  });
</script>

<style lang="less" scoped></style>
