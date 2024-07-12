<template>
  <van-dialog closeable v-model:show="tipsErrorMsgVisible" className="google-dialog">
    <template #title> </template>
    <!-- 自定义对话框内容 -->
    <template #default>
      <div class="text-center flex items-center justify-center flex-col">
        <div class="warning-icon">
          <IconFont name="a-Group79" class="fs-65 color-text-warning" />
        </div>
        <div class="tips-text"> {{ $t(tipsErrorMsg) }} </div>
        <van-button type="primary" size="large" long class="confirm-btn" @click="linkTo"> {{ $t(buttonText) }} </van-button>
      </div>
    </template>
    <!-- 隐藏底部按钮 -->
    <template #footer>
      <!-- 不显示任何按钮 -->
    </template>
  </van-dialog>
  <open-google ref="popupRef" />
</template>
<script lang="ts" setup name="google-verify">
  import { useUserStore } from '@bitunix/shared/store';

  const { t } = useI18n();
  const userStore = useUserStore();
  // 安全等级低提示信息
  const tipsErrorMsgVisible = ref(false);
  const tipsErrorMsg = ref('这里是错误');
  const buttonText = ref(t('common.checkUser5'));

  const googleType = ref<'bind' | 'open'>('bind');
  const linkTo = () => {
    tipsErrorMsgVisible.value = false;
    if (googleType.value === 'bind') {
      navigateToLocale('/account/bindgoogle');
    } else {
      popupRef.value.showBottomPopup();
    }
  };
  // 显示绑定google弹窗
  const showVerify = () => {
    if (userStore.googleBindShow) {
      tipsErrorMsg.value = 'common.windowTip1';
      if (userStore.googleAuthenticatorKey === '0') {
        buttonText.value = 'common.windowTip2';
        googleType.value = 'bind';
      } else {
        buttonText.value = 'common.windowTip3';
        googleType.value = 'open';
      }
      tipsErrorMsgVisible.value = true;
    }
  };
  defineExpose({
    showVerify,
  });

  /**
   * google开启的验证框
   */
  const popupRef = ref<any>(null);
</script>
<style lang="less" scoped>
  .text-center {
    .warning-icon {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background-color: var(--color-bg-warning-weak);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tips-text {
      color: var(--color-text-1);
      font-size: 28px;
      margin: 40px 0;
    }
  }
</style>
<style>
  .google-dialog {
    background: var(--bx-bg-popup);
    border: 1px solid var(--color-bg-interactive-strong);
    border-radius: 12px;
    padding: 10px 40px 60px;

    .confirm-btn {
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: var(--bx-font-size-btn);
      color: var(--bx-btn-text-color);
      border-radius: 10px;
      font-weight: 500;
      background: #ea4b64;
    }
  }
</style>
