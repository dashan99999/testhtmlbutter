<!--  -->
<template>
  <div class="SecurityReminder_box">
    <div class="title">
      <div class="flex items-center flex-justify-between">
        <div>
          <IconFont name="back" class="fs-36 bx-color-text-color" @click="router.go(-1)" />
          <span class="fs-36 m-l16">{{ $t('assets.withdraw') }}</span>
        </div>
      </div>
    </div>
    <p class="page_title fm-normal color-text-warning">{{ $t('assets.withdraw.noet12') }}</p>
    <div class="m-t40">
      <div
        class="item"
        @click="
          () => {
            if (!email || !openemail) {
              if (!email) {
                gotoSet('bindEmail');
              } else {
                gotoAccount('mobile');
              }
            }
          }
        "
      >
        <div>
          <ClientOnly>
            <SvgIcon w="44" h="44" :name="theme === 'dark' ? 'bx-icon:mail-dark' : 'bx-icon:mail-light'" />
          </ClientOnly>
          <span class="fs-32 v-middle m-l16">{{ $t('assets.internalTransfer.tip2') }}</span>
        </div>
        <SvgIcon v-if="!email || !openemail" w="24" h="24" name="bx-icon:go" />
        <SvgIcon w="32" h="32" v-else class="bind_icon" name="bx-icon:withdraw-choose" />
      </div>
      <div
        class="item"
        @click="
          () => {
            if (!phone || !openphone) {
              if (!phone) {
                gotoSet('bindMobile');
              } else {
                gotoAccount('mobile');
              }
            }
          }
        "
      >
        <div>
          <ClientOnly>
            <SvgIcon w="44" h="44" :name="theme === 'dark' ? 'bx-icon:tablet-dark' : 'bx-icon:tablet-light'" />
          </ClientOnly>
          <span class="fs-32 v-middle m-l16">{{ $t('assets.internalTransfer.tip4') }}</span>
        </div>
        <SvgIcon v-if="!phone || !openphone" w="24" h="24" name="bx-icon:go" />
        <SvgIcon w="32" h="32" v-else class="bind_icon" name="bx-icon:withdraw-choose" />
      </div>
      <div
        class="item m-b92"
        @click="
          () => {
            if (!google || !opengoogle) {
              if (!google) {
                gotoGoogleBind();
              } else if (!opengoogle) {
                gotoAccount('google');
              }
            }
          }
        "
      >
        <div>
          <ClientOnly>
            <SvgIcon w="44" h="44" :name="theme === 'dark' ? 'bx-icon:chrome-dark' : 'bx-icon:chrome-light'" />
          </ClientOnly>
          <span class="fs-32 v-middle m-l16 m-r16">{{ $t('common.google.authenticator') }}</span>
          <span class="recommend">{{ $t('assets.withdraw.noet8') }}</span>
        </div>
        <SvgIcon v-if="!google || !opengoogle" w="24" h="24" name="bx-icon:go" />
        <SvgIcon w="32" h="32" v-else class="bind_icon" name="bx-icon:withdraw-choose" />
      </div>
      <div class="m-b40" @click="() => (notify = !notify)">
        <ClientOnly>
          <SvgIcon v-show="!notify" :name="theme === 'dark' ? 'bx-icon:withdraw-unchoose' : 'bx-icon:unchoose'" w="32" h="32" />
        </ClientOnly>
        <SvgIcon v-show="notify" name="bx-icon:choose" w="32" h="32" />
        <span class="fs-24 v-middle color-text-2 m-l12">{{ $t('assets.notice') }}</span>
      </div>
      <div class="button" @click="setCode">
        {{ $t('assets.withdraw.noet15') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore, useUserStore } from '@bitunix/shared/store';
  import { openTargetWindow } from '#shared/utils/methods';
  const userStore = useUserStore();

  const opengoogle = computed(() => Number(userStore.googleAuthenticatorStatus));
  const google = computed(() => Number(userStore.googleAuthenticatorKey));
  const openemail = computed(() => Number(userStore.emailAuthenticatorStatus));
  const email = computed(() => userStore.email !== '0');
  const openphone = computed(() => Number(userStore.mobileAuthenticatorStatus));
  const phone = computed(() => userStore.mobileNumber !== '0');

  const router = useRouter();

  const appStore = useAppStore();
  const { theme } = toRefs(appStore);

  const { locale } = useI18n();
  const language = locale.value === 'en-us' ? '' : `/${locale.value}`;

  const gotoAccount = (type: string) => {
    openTargetWindow(`${language}/account/security?type=${type}`);
  };

  const gotoGoogleBind = () => {
    openTargetWindow(`${language}/account/bindGoogle`);
  };

  const gotoSet = (type: string) => {
    openTargetWindow(`${language}/account/${type}`);
  };

  const emit = defineEmits(['close']);
  const notify = ref(false);
  const setCode = () => {
    if (notify.value) {
      localStorage.setItem('NeverNotify', '1');
    }
    emit('close');
  };
</script>
<style lang="less" scoped>
  .SecurityReminder_box {
    padding: 0 30px;
    .title {
      font-weight: 500;
      font-size: var(--bx-font-size-num);
      color: var(--bx-text-color);
      padding: 40px 0;
    }
    .page_title {
      background: var(--color-bg-warning-weak);
      padding: 24px;
      font-size: 24px;
      border-radius: 10px;
      margin-top: 16px;
    }
    .item {
      height: 124px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .recommend {
        font-size: 24px;
        color: #ea4b64;
        padding: 3px 10px;
        vertical-align: middle;
        background: var(--color-bg-brand-weak);
        border-radius: 4px;
      }
    }
    .Never_notify {
      margin-top: 30px;
      margin-bottom: 10px;
    }
    .button {
      font-size: 30px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-family: HarmonyOS Sans SC;
      height: 100px;
      border-radius: 10px;
      border: 1px solid var(--color-border-base);
    }
  }
</style>
<style lang="less">
  .withdrawDialog {
    .dialog_icon {
      width: 160px;
      height: 160px;
      display: block;
      margin: 0 auto;
    }
    :deep(.van-popup) {
      background: var(--bx-bg-fg);
    }
  }
</style>
