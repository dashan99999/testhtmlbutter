<template>
  <div class="banner-wrapper">
    <p class="banner-title-1">{{ $t('home.banner7') }}</p>
    <p class="banner-title-2">{{ $t('home.banner8') }}</p>
    <p class="banner-title-3">{{ $t('home.banner9') }}</p>
    <!-- <p class="banner-title-4">{{ $t('home.banner1') }}</p> -->
    <div :class="['right-section']">
      <NuxtImg fetchpriority="high" class="phone" format="webp" alt="bitunix" src="/images/homeindex-banner-phone.svg" />
      <Head>
        <Link rel="preload" href="/_ipx/f_webp/images/homeindex-banner-phone.svg" as="image" fetchpriority="high" type="image/webp" />
      </Head>
    </div>
    <div class="register-wrapper" v-show="!isLogin">
      <van-field :key="$t('home.banner3')" v-model="accountRef" class="common-input border" :placeholder="$t('home.banner3')" clearable />
      <div class="btn" @click="linkRegister">{{ $t('home.ad3') }}</div>
    </div>
    <div @click="spotTradeLink" class="login-btn" type="primary" v-show="isLogin">{{ $t('home.banner5') }}</div>
  </div>
</template>
<script lang="ts" setup name="home-banner">
  const isLogin = useLoginStatus();
  /* 注册参数 */
  const accountRef = ref('');
  const numberReg = /^[0-9]*$/;
  const isEmail = /^(?=.*[a-zA-Z])(?=.*\d)|^[a-zA-Z]+$/;
  const linkRegister = () => {
    if (numberReg.test(accountRef.value) || accountRef.value.includes('@')) {
      navigateToLocale(`/register?account=${accountRef.value}`);
    } else if (isEmail.test(accountRef.value)) {
      // 如果是字母加数字
      navigateToLocale(`/register?account=${accountRef.value}&type=email`);
    } else {
      navigateToLocale('/register');
    }
  };
  /* 立即交易跳转 */
  const spotTradeLink = () => {
    navigateToLocale('/spot-trade');
  };
</script>
<style lang="less" scoped>
  .banner-wrapper {
    .banner-title-1 {
      display: inline-block;
      font-size: var(--bx-font-size-num);
      line-height: 66px;
      font-weight: 900;
      vertical-align: middle;
      background-image: linear-gradient(to right, rgba(214, 215, 216, 1), rgba(80, 83, 84, 1));
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      font-family: 'HarmonyOS_Sans_Regular';
    }
    .banner-title-2 {
      font-size: var(--bx-font-size-num);
      line-height: 66px;
      font-weight: 900;
      vertical-align: middle;
      color: #ea4b64;
      font-family: 'HarmonyOS_Sans_Regular';
    }
    .banner-title-3 {
      display: inline-block;
      font-size: 50px;
      line-height: 66px;
      font-weight: 900;
      vertical-align: middle;
      background-image: linear-gradient(94.29deg, #5f6162, #f1f1f2);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      font-family: 'HarmonyOS_Sans_Regular';
    }
    .banner-title-4 {
      color: var(--color-text-1);
      font-size: var(--bx-font-size-small);
      line-height: 28px;
      margin-top: 40px;
    }
    .register-wrapper {
      position: relative;
      margin-top: 50px;
      .register-input {
        width: 690px;
        height: 100px;
        border-radius: 8px;
      }
      .btn {
        // width: 100%;
        width: 690px;
        height: 100px;
        box-sizing: border-box;
        line-height: 100px;
        text-align: center;
        background-color: #ea4b64;
        color: var(--bx-btn-text-color);
        border-radius: var(--bx-radius-normal);
        font-size: var(--bx-font-size-btn);
        font-weight: var(--van-font-medium);
        cursor: pointer;
        margin-top: 30px;
        &:hover {
          background-color: var(--bx-primary-active-color);
        }
      }
    }
    .tips {
      font-size: 12px;
      color: var(--color-text-3);
      text-align: center;
      height: 52px;
      line-height: 52px;
      cursor: default;
    }
    .platform-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      :deep(.btn) {
        height: 34px !important;
        line-height: 34px !important;
        width: 49%;
        margin: 0 0 8px 0;
        img {
          width: 16px;
          height: 16px;
        }
        svg {
          width: 16px !important;
          height: 16px !important;
        }
      }
    }
    .right-section {
      // width: 100%;
      height: 500px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .phone {
        width: 570px;
        margin-top: 8px;
      }
    }

    .login-btn {
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-color: #ea4b64;
      color: var(--color-text-on-btn-brand-base);
      border-radius: 8px;
      font-size: var(--bx-font-size-btn);
      cursor: pointer;
      font-weight: var(--van-font-bold);
      margin-top: 72px;
      &:hover {
        background-color: var(--bx-primary-active-color);
      }
    }
  }
  @keyframes icon1 {
    from {
      transform: translateY(-5%);
    }
    to {
      transform: translateY(5%);
    }
  }
</style>
