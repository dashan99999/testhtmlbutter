<script lang="ts" setup>
  interface IProps {
    value?: string | number | undefined | null;
    empty?: string;
  }
  const props = withDefaults(defineProps<IProps>(), { empty: '--' });
</script>
<template>
  <span v-if="props.value === undefined || props.value === null || props.value === '' || props.value === '--'">{{ props.empty }}</span>
  <template v-else>
    <slot></slot>
  </template>
</template>
