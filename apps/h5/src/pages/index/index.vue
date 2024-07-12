<template>
  <div class="home-index-wrapper">
    <HomeCarousel />
    <HomeCarousel2 v-if="isMobile" />
    <HomeCarousel2PC v-else />
  </div>
</template>
<script lang="ts" setup name="home-index">
  import HomeCarousel from './components/home-carousel/index.vue';
  import HomeCarousel2 from './components/home-carousel2/index.vue';
  import HomeCarousel2PC from './components/home-carousel2PC/index.vue';
  import { useToken } from '@bitunix/shared/utils/auth';
  import { useDevice } from '@bitunix/shared/hooks/useDevice';
  const { isMobile } = useDevice();

  definePageMeta({
    namespace: ['home', 'account'],
    fws: true,
    sws: true,
  });
  const token = useToken();

  onMounted(() => {
    console.log('token==>', token.value);
  });
</script>
<style lang="less" scoped>
  .home-index-wrapper {
    max-width: 750px;
    box-sizing: border-box;
    padding-bottom: 32px;
    background-color: var(--bx-bg-fg);
  }
</style>
