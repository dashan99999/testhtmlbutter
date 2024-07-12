<script lang="ts" setup>
  import { onErrorCaptured } from 'vue';
  const hasError = ref(false);
  onErrorCaptured((err, instance, info) => {
    console.error(err);
    console.log(instance);
    console.error(info);
    hasError.value = true;
    return false;
  });
</script>
<template>
  <template v-if="!hasError">
    <slot></slot>
  </template>
  <template v-else> Error! </template>
</template>
