<script lang="ts" setup name="PageLayout">
  // import { isMobile } from '@bitunix/shared/utils/tools';
  const MobileHeader = defineAsyncComponent(() => import('@/components/HeaderMobile/index.vue'));
  const MobileWeb = defineAsyncComponent(() => import('@/components/HeaderWeb/index.vue'));
  const MobileFooter = defineAsyncComponent(() => import('@/components/Footer/index.vue'));
  // import MobileDetect from 'mobile-detect';
  import { useDevice } from '@bitunix/shared/hooks/useDevice';
  const { isMobile } = useDevice();
  const route = useRoute();
  // 注入当前容易元素滚动的距离
  const scrollDistance = ref(0);
  provide('scrollDistance', scrollDistance);
  const containerHeight = ref(0);
  provide('containerHeight', containerHeight);
  const isCollapse = ref(false);
  // 监听右侧面板是否展开
  const handleToggleCollapse = (v: boolean) => {
    isCollapse.value = v;
  };
  const showHeader = computed(() => route.meta.pageLayouts?.header === undefined);

  // let headers = useRequestHeaders();
  // const md = process.server ? new MobileDetect(headers['user-agent']) : new MobileDetect(navigator.userAgent);
  // const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile';
</script>
<template>
  <div class="default-layout wrapper" :class="{ 'layout-wrapper': isCollapse }">
    <div v-if="isMobile" class="p-t113">
      <mobile-header @toggle-collapse="handleToggleCollapse" />
    </div>
    <div v-else class="p-t40">
      <mobile-web @toggle-collapse="handleToggleCollapse" />
    </div>
    <div class="content-inner">
      <slot></slot>
    </div>
    <!-- <MobileFooter v-show="route.meta.pageLayouts?.footer === undefined" /> -->
  </div>
</template>
<style lang="less" scoped>
  .layout-wrapper {
    width: 750px;
    height: 100%;
    overflow: hidden;
  }
</style>
