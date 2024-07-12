<script setup lang="ts">
  import { useAppStore } from '@bitunix/shared/store';

  const appStore = useAppStore();
  const loading = computed(() => {
    return appStore.loading;
  });
</script>

<template>
  <div class="loading-pannal" :class="{ open: loading }">
    <div class="mask-wrapper"></div>
    <div class="loading-wrapper">
      <img src="@/assets/images/loadingIcon.gif" class="icon" alt="" srcset="" />
    </div>
  </div>
</template>

<style scoped lang="less">
  .loading-pannal {
    z-index: -1;
    .mask-wrapper {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      transition: 0.2s linear;
      z-index: -1;
      opacity: 0;
    }
    .loading-wrapper {
      width: 130px;
      height: 130px;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 8px;
      background: #16161a;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: -1;
      opacity: 0;
      .icon {
        width: 100px;
        height: 100px;
      }
    }

    &.open {
      z-index: 999;
      .loading-wrapper,
      .mask-wrapper {
        z-index: 999;
        opacity: 1;
      }
    }
  }
</style>
