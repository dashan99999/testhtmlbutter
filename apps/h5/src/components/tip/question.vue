<script lang="ts" setup>
  interface IProps {
    class: string;
    trigger: 'click' | 'hover';
    height: string;
    width: string;
    text: string;
  }
  const props = withDefaults(defineProps<IProps>(), {
    class: '',
    trigger: 'hover',
    height: 'auto',
    width: '242px',
    text: '',
  });
</script>
<template>
  <a-popover
    content-class="color-bg-4 p-l20 p-r20"
    arrow-class="color-bg-4 "
    class="index"
    style="z-index: 3000"
    :content-style="{ width: props.width }"
  >
    <SvgIcon name="bx-icon:circle-question" class="icon relative" style="width: 12px; height: 12px; left: 3px; top: -1px" />
    <template #content>
      <div class="color-text-1 fs-14">{{ props.text }}</div>
    </template>
  </a-popover>
</template>
<style lang="less" scoped>
  .color-bg-4 {
    background-color: var(--color-bg-4);
  }
  .color-text-1 {
    color: var(--color-text-1);
  }
</style>
