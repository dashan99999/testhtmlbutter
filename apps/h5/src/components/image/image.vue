<script lang="ts" setup>
  interface IProps {
    src: string;
    class?: any;
    style?: any;
  }
  const props = defineProps<IProps>();
  const hasError = ref(false);
  const onError = () => {
    hasError.value = true;
  };
  console.log(props);
</script>
<template>
  <template v-if="!hasError">
    <img :src="props.src" :class="props.class" :style="props.style" @error="onError" />
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>
