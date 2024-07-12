<template>
  <div class="wrapper">
    <ClientOnly>
      <div class="title">{{ t('account.accountSecurity.welcome') }}</div>
      <section class="inner-wrapper">
        <section class="right">
          <div class="content-item" @click="linkTo('/account/bindGoogle')">
            <div class="step-icon">1</div>
            <div class="nav">
              <div class="left-area">
                <SvgIcon class="icon" name="bx-icon:mobile-register-success-icon1" />
                <span class="recommend">{{ $t('assets.withdraw.noet8') }}</span>
              </div>
              <span class="btn">{{ $t('assets.checkUser5') }}</span>
            </div>
            <div class="text">{{ $t('register.validate.tip') }}</div>
          </div>
          <div class="content-item" @click="linkTo('/homedownload')">
            <div class="step-icon">2</div>
            <div class="nav">
              <div class="left-area">
                <SvgIcon class="icon" name="bx-icon:mobile-register-success-icon2" />
              </div>
              <span class="btn"> {{ $t('home.download4') }}</span>
            </div>
            <div class="text">{{ $t('register.validate.down') }}</div>
          </div>
        </section>
      </section>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup name="register-success">
  definePageMeta({
    namespace: ['register', 'account', 'assets', 'home'],
    auth: true,
    pageLayouts: {
      footer: false,
    },
  });
  const { t } = useI18n();
  const linkTo = (url: string) => {
    navigateToLocale(url);
  };
</script>
<style lang="less" scoped>
  .wrapper {
    background-color: var(--bx-bg-fg);
    width: 750px;
    min-height: calc(100vh - 128px);
    padding: 40px 30px;
    .title {
      color: var(--color-text-1);
      font-size: var(--bx-font-size-title);
    }
    .inner-wrapper {
      display: flex;
      margin-top: 30px;
      .right {
        padding-left: 80px;
        box-sizing: border-box;
        position: relative;
        .content-item {
          width: 610px;
          min-height: 162px;
          border-radius: var(--bx-radius-normal);
          box-sizing: border-box;
          padding: 30px;
          border: 1px solid var(--color-border-input);
          margin-bottom: 60px;
          position: relative;
          .step-icon {
            width: 50px;
            height: 50px;
            line-height: 50px;
            border-radius: 50%;
            text-align: center;
            color: var(--color-text-1);
            background-color: var(--bx-bg);
            font-size: var(--bx-font-size-base);
            position: absolute;
            left: -80px;
            top: 0;
          }
          .nav {
            display: flex;
            justify-content: space-between;
            .left-area {
              .recommend {
                display: inline-block;
                background-color: var(--bx-primary-weak-color);
                line-height: 34px;
                text-align: center;
                color: #ea4b64;
                font-size: var(--bx-font-size-small);
                margin-left: 20px;
                padding: 2px 10px;
                border-radius: 4px;
              }
            }
            .icon {
              width: 45px;
              height: 45px;
            }
            .btn {
              padding: 10px 24px;
              text-align: center;
              background-color: #ea4b64;
              color: var(--bx-btn-text-color);
              font-size: var(--bx-font-size-select-sub);
              border-radius: 8px;
              font-weight: var(--van-font-regular);
            }
          }
          .text {
            color: var(--color-text-1);
            font-size: var(--bx-font-size-select-sub);
            margin-top: 26px;
          }
          &:not(:last-child) {
            &::after {
              content: '';
              display: block;
              width: 0;
              height: calc(100% + 35px);
              border-left: 2px dashed var(--color-border-input);
              position: absolute;
              left: -55px;
              top: 50px;
            }
          }
        }
      }
    }
  }
</style>
