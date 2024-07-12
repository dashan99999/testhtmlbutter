<template>
  <van-dialog v-bind="$attrs">
    <template #title> </template>
    <div class="text-center">
      <img src="@/assets/images/warningIcon.png" style="width: 140px; height: 140px" />
      <div class="tips-text m-t10"> {{ $t('home.tip2') }} </div>
      <van-button type="primary" size="large" style="margin-top: 20px" class="confirm-btn" @click="linkToDownload">
        {{ $t('home.download4') }}
      </van-button>
    </div>
    <template #footer>
      <!-- 不显示任何按钮 -->
    </template>
  </van-dialog>
</template>
<script lang="ts" setup name="download-popup">
  const linkToDownload = () => {
    navigateToLocale('homedownload');
  };
</script>
<style lang="less" scoped></style>
