<template>
  <div class="p30 flex flex-col items-center h-full justify-center" :class="{ 'm-t200': props.isMargin }">
    <div>
      <IconFont name="empty" class="color-text-2 fs-60" />
    </div>
    <div class="m-t16 color-text-2 fs-24">{{ $t('common.noData') }}</div>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    isMargin?: boolean;
  };
  const props = withDefaults(defineProps<Props>(), {
    isMargin: false,
  });
</script>
