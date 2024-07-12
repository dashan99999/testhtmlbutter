<template>
  <van-popup
    v-model:show="isShow"
    position="right"
    :style="{ width: '50%', height: '100%' }"
    teleport="body"
  />
</template>

<script setup>
  const isShow = ref(true);
</script>
