<script lang="ts" setup>
  import { calculate } from '@bitunix/shared/utils/calculate/calculate';
  interface IProps {
    value: string;
    error?: string;
  }
  const props = withDefaults(defineProps<IProps>(), { error: '--' });
  const result = computed(() => {
    const value = calculate(props.value, 'error');
    if (value === 'error') return props.error;
    return value;
  });
</script>
<template>
  <slot :value="result"></slot>
</template>
