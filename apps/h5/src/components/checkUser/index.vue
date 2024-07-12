<!--  -->
<template>
  <div class="_box">
    <van-dialog v-model:show="msgModalA" title=" " class="dialogVant" lock-scroll :show-confirm-button="false">
      <div class="dialog_body content_a">
        <img class="dialog_icon" src="@/assets/images/fail.png" />
        <img class="dialog_close" src="@/assets/images/close_log.png" @click="msgModalA = false" />
        <p class="content_a_p p-t40">{{ $t('assets.checkUser1') }}</p>
        <div style="text-align: center" class="p-b40">
          <span class="content_a_span" @click="onClick">{{ $t('assets.checkUser2') }}</span>
        </div>
      </div>
      <template #footer>
        <van-button class="dialog_btn" type="primary" @click="() => navigateToLocale('/account/authentication')">{{
          $t('assets.checkUser6')
        }}</van-button>
      </template>
    </van-dialog>
    <van-dialog v-model:show="msgModalB" title=" " class="dialogVant" lock-scroll :show-confirm-button="false">
      <div class="dialog_body content_a">
        <img class="dialog_icon" src="@/assets/images/fail.png" />
        <img class="dialog_close" src="@/assets/images/close_log.png" @click="msgModalB = false" />
        <p class="content_a_p p-t40 p-b40">{{ $t('assets.checkUser3') }}</p>
      </div>
      <template #footer>
        <van-button
          class="dialog_btn"
          type="primary"
          @click="
            () => {
              msgModalB = false;
              showDialog = true;
            }
          "
          >{{ $t('assets.checkUser5') }}</van-button
        >
      </template>
    </van-dialog>
    <van-dialog v-model:show="showDialog" title=" " lock-scroll>
      <div class="dialog_body">
        <img class="dialog_icon" src="@/assets/images/fail.png" />
        <img class="dialog_close" src="@/assets/images/close_log.png" @click="showDialog = false" />
        <p class="dialog_text">{{ $t('home.download5') }}</p>
      </div>
      <template #footer>
        <van-button class="dialog_btn" type="primary" @click="() => navigateToLocale('/homedownload')">{{
          $t('home.download4')
        }}</van-button>
      </template>
    </van-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { checkUserApi } from '@bitunix/shared/api/assets';
  import { getUserSecurity } from '@bitunix/shared/hooks/getSymbolInfo';
  import { showToast } from 'vant';

  const { locale } = useI18n();

  enum url {
    withdraw = 'withdraw',
    deposit = 'recharge',
  }
  const msgModalA = ref(false);
  const msgModalB = ref(false);
  const propSymbol = ref<string | undefined>();
  const showDialog = ref<boolean>(false);
  const checkUser = async (type: 'withdraw' | 'deposit', symbol?: string, code = true) => {
    if (!code) return;
    propSymbol.value = symbol;
    const data = await checkUserApi(type);
    if (String(data.code) === '0') {
      // const a = true;
      const NeverNotify = localStorage.getItem('NeverNotify');
      const a = getUserSecurity() === 1;
      if (!NeverNotify && a && type === 'withdraw') {
        navigateToLocale({
          path: '/assets/withdraw',
          query: {
            symbol: propSymbol.value,
          },
        });
      } else {
        navigateToLocale({
          path: '/assets/' + url[type],
          query: {
            symbol,
          },
        });
      }
    } else if (String(data.code) === '10136') {
      msgModalA.value = true;
    } else if (String(data.code) === '10132') {
      msgModalB.value = true;
    } else {
      showToast(data.msg);
    }
  };
  const onClick = () => {
    if (locale.value === 'zh-cn') {
      window.open('https://bitunix.zendesk.com/hc/zh-cn/articles/15666657422105-KYC%E7%AD%89%E7%BA%A7%E6%9D%83%E7%9B%8A', '_blank');
    } else {
      window.open('https://bitunix.zendesk.com/hc/en-us/articles/15666657422105-KYC-Tiers-and-Benefits', '_blank');
    }
  };
  defineExpose({
    checkUser,
  });
</script>
<style lang="less" scoped>
  .svg_box {
    width: 100%;
    height: 118px;
  }
  .content_a {
    .content_a_svg {
      width: 140px;
      height: 140px;
      display: block;
      margin: 0 auto 20px;
      transform: translateY(-22px);
    }
    .content_a_p {
      color: var(--color-text-1);
      font-size: 26px;
      text-align: center;
    }
    .content_a_span {
      color: rgb(var(--primary-6));
      font-size: 24px;
      display: inline-block;
      margin-top: 10px;
      border-bottom: 1px dotted rgb(var(--primary-6));
      cursor: pointer;
    }
  }
  .dialog_body {
    position: relative;
  }
  .dialog_text {
    margin: 40px 0;
    text-align: center;
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    color: var(--color-text-1);
    padding: 0 40px;
  }
  .dialog_btn {
    width: calc(100% - 80px);
    margin: 0 auto 60px;
    background: #ea4b64;
    display: block;
    color: var(--color-text-on-btn-brand-base);
    border-color: #ea4b64;
  }
  .dialog_close {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 30px;
    top: -30px;
  }
  .dialogVant {
    width: 630px;
  }
  .dialog_icon {
    width: 160px;
    height: 160px;
    display: block;
    margin: 0 auto;
  }
</style>
