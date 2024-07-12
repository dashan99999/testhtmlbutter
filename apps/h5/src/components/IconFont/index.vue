<template>
  <i class="bitunix_iconfont" :class="iconClass"></i>
</template>
<script setup lang="ts">
  import { normalizeClass } from 'vue';
  const props = defineProps<{ name: string; class?: any }>();
  const iconClass = computed(() => {
    return normalizeClass([`icon_${props.name}`, props.class]);
  });
</script>
