<!--  -->
<template>
  <a-modal v-model:visible="showModal" width="600px" top="20%" hide-cancel :mask-closable="false" :align-center="false">
    <template #title></template>
    <div>
      <div class="svg_box">
        <SvgIcon class="content_svg" name="bx-icon:assets_fail_dark" />
      </div>
      <p class="content_text">{{ $t('common.openContract.note1') }}</p>
      <div class="agree_box">
        <a-checkbox v-model="agree">{{ $t('common.openContract.note2') }}</a-checkbox>
        <span class="agree_on" @click="link">《{{ $t('common.openContract.note3') }}》</span>
      </div>
    </div>
    <template #footer>
      <div class="footer_box">
        <a-button class="footer_btn" type="outline" @click="showModal = false">{{ $t('common.openContract.note4') }}</a-button>
        <a-button class="footer_btn" type="primary" @click="open" :disabled="!agree">{{ $t('common.openContract.note5') }}</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { openContract } from '@bitunix/shared/api/user';
  import { useUserStore } from '@bitunix/shared/store';
  import { showSuccessToast } from '@bitunix/shared/utils/vant';

  const { t } = useI18n();
  const userStore = useUserStore();
  const showModal = ref(true);
  const agree = ref(true);

  const emit = defineEmits(['close']);
  const open = () => {
    openContract()
      .then(() => {
        userStore.openContract();
        showModal.value = false;
        showSuccessToast(t('common.openContract.note6'));
        emit('close');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { locale } = useI18n();
  const link = () => {
    const zh_CN = 'https://bitunix.zendesk.com/hc/zh-cn/articles/16492827232921-Ubit%E5%90%88%E7%BA%A6%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE';
    const en = 'https://bitunix.zendesk.com/hc/en-us/articles/16492827232921-Ubit-Futures-Services-Agreement';
    const lan = locale.value;
    if (lan === 'zh-cn') {
      window.open(zh_CN);
    } else {
      window.open(en);
    }
  };
</script>

<style lang="less" scoped>
  .svg_box {
    width: 100%;
    height: 118px;
    margin-bottom: 20px;
  }
  .content_svg {
    width: 140px;
    height: 140px;
    display: block;
    margin: 0 auto;
    transform: translateY(-22px);
  }
  .content_text {
    color: var(--color-text-1);
    font-size: 14px;
    text-align: center;
    height: 20px;
    line-height: 20px;
  }
  .agree_box {
    margin-top: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    .agree_on {
      color: rgb(var(--primary-6));
      cursor: pointer;
    }
  }
  .footer_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer_btn {
      width: 270px;
    }
  }
</style>
