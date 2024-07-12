<template>
  <div v-if="showDialog" class="h5-guide-download-main h-499">
    <van-dialog v-model:show="showDialog" title=" " lock-scroll teleport="body" style="height: 250px">
      <div class="text-center pl-40 pr-40 pt-34">
        <img class="absolute right-30 top-30" src="../../assets/images/close_log.png" width="16" height="16" @click="showDialog = false" />
        <svg-icon name="bx-icon:assets_fail_dark" w="160" h="160" />
        <p class="mt-40 mb-40 color-text-1 fs-28">{{ $t('home.download5') }}</p>
        <van-button type="primary" block @click="linkToDownload">{{ $t('home.download4') }}</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
  const showDialog = ref<boolean>(false);

  // 跳转至app下载引导页
  const linkToDownload = () => {
    navigateToLocale('/homedownload');
  };

  const turnDialog = () => {
    showDialog.value = true;
  };

  defineExpose({
    turnDialog,
  });
</script>

<style lang="less" scoped>
  .dialog_body {
    position: relative;
  }
</style>
