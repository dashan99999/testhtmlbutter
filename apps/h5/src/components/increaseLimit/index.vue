<!-- 提升额度弹窗 -->
<template>
  <a-modal v-model:visible="showModal" width="600px" top="30%" :mask-closable="false" :footer="false">
    <template #title>{{ $t('assets.withdraw.RaiseLimit') }}</template>
    <div class="increaseLimit_body">
      <p class="modal_title">{{ $t('assets.withdraw.noet5') }}</p>
      <div class="list">
        <div v-if="!phone || !openphone" class="item">
          <SvgIcon class="icon" name="bx-icon:assets_dark_phone" />
          <div class="item_content">
            <p class="title"> {{ $t('assets.withdraw.noet6') }} </p>
            <p class="value">
              {{ $t('assets.withdraw.WithdrawalLimit') }}<span>{{ getWithdrawValue(1.5) }} USDT</span>
            </p>
          </div>
          <a-button v-if="!phone" class="item_btn" @click="routeLink('/account/accountSecurity/bindMobile')">
            {{ $t('assets.checkUser5') }}
          </a-button>
          <a-button v-else-if="!openphone" class="item_btn" @click="routeLink('/account/accountSecurity')">
            {{ $t('assets.withdraw.noet13') }}
          </a-button>
        </div>
        <div v-if="!email || !openemail" class="item">
          <SvgIcon class="icon" name="bx-icon:assets_dark_mail" />
          <div class="item_content">
            <p class="title">
              {{ $t('assets.withdraw.noet7') }}
              <a-tag v-if="google && opengoogle" class="title_tag">{{ $t('assets.withdraw.noet8') }}</a-tag>
            </p>
            <p class="value">
              {{ $t('assets.withdraw.WithdrawalLimit') }}
              <span :class="{ on: getUserSecurity(1.5) > security && !google }">{{ getWithdrawValue(1.5) }} USDT</span>
            </p>
          </div>
          <a-button
            v-if="!email"
            class="item_btn"
            :type="google && opengoogle ? 'primary' : undefined"
            @click="routeLink('/account/accountSecurity/bindEmail')"
          >
            {{ $t('assets.checkUser5') }}
          </a-button>
          <a-button
            v-else-if="!openemail"
            class="item_btn"
            :type="google && opengoogle ? 'primary' : undefined"
            @click="routeLink('/account/accountSecurity')"
          >
            {{ $t('assets.withdraw.noet13') }}
          </a-button>
        </div>
        <div v-if="!google || !opengoogle" class="item">
          <SvgIcon class="icon" name="bx-icon:assets_dark_google" />
          <div class="item_content">
            <p class="title">
              {{ $t('assets.withdraw.noet9') }}
              <a-tag class="title_tag">{{ $t('assets.withdraw.noet8') }}</a-tag>
            </p>
            <p class="value">
              {{ $t('assets.withdraw.WithdrawalLimit') }}
              <span :class="{ on: getUserSecurity(2) > security }">{{ getWithdrawValue(2) }} USDT</span>
            </p>
          </div>
          <a-button v-if="!google" class="item_btn" type="primary" @click="routeLink('/account/accountSecurity/bindGoogle')">
            {{ $t('assets.checkUser5') }}
          </a-button>
          <a-button v-else-if="!opengoogle" class="item_btn" type="primary" @click="routeLink('/account/accountSecurity')">
            {{ $t('assets.withdraw.noet13') }}
          </a-button>
        </div>
        <div v-if="idAuth !== 2" class="item">
          <SvgIcon class="icon" name="bx-icon:assets_dark_user" />
          <div class="item_content">
            <p class="title"> {{ $t('assets.withdraw.noet10') }}{{ idAuth + 1 }} </p>
            <p class="value">
              {{ $t('assets.withdraw.WithdrawalLimit') }}
              <span class="on">{{ userLimit }} USDT</span>，{{ $t('assets.withdraw.noet11') }}
            </p>
          </div>
          <a-button class="item_btn" @click="routeLink('/account/idAuth')">
            {{ $t('assets.checkUser5') }}
          </a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { withdrawRaiseValue, WithdrawRaiseValueRes } from '@bitunix/shared/api/assets';
  import { useAppStore, useUserStore } from '@bitunix/shared/store';
  import { getUserSecurity } from '@bitunix/shared/hooks/getSymbolInfo';
  const appStore = useAppStore();
  const userStore = useUserStore();

  const google = computed(() => (Number(userStore.googleAuthenticatorKey) === 0 ? 0 : 2));
  const email = computed(() => (userStore.email === '0' ? 0 : 1.5));
  const phone = computed(() => (userStore.mobileNumber === '0' ? 0 : 1.5));
  const opengoogle = computed(() => Number(userStore.googleAuthenticatorStatus));
  const openemail = computed(() => Number(userStore.emailAuthenticatorStatus));
  const openphone = computed(() => Number(userStore.mobileAuthenticatorStatus));

  // const google = computed(() => Number(userStore.googleAuthenticatorKey));
  // const email = computed(() => userStore.email !== '0');
  // const phone = computed(() => userStore.mobileNumber !== '0');

  const security = getUserSecurity(); // 获取用户安全验证等级 1 低  2 中  3 高

  const idAuth = computed(() => {
    // 认证状态 0：认证中 1：KYC Lv1 2：KYC Lv2 3：未认证
    if (userStore.authLevel === 3) {
      return 0;
    }
    return userStore.authLevel || 0;
  });
  const userLimit = computed(() => {
    const data = {
      0: appStore.user_day_withdraw_value_limit_no_auth,
      1: appStore.user_day_withdraw_value_limit_lv1,
      2: appStore.user_day_withdraw_value_limit_lv2,
    };
    return data[idAuth.value + 1];
  });

  const showModal = ref(false); // 划转弹窗显隐
  const openModal = () => {
    showModal.value = true;
  };
  defineExpose({
    openModal,
  });

  const routeLink = (page: string) => {
    window.open(page, '_blank');
  };
  const WithdrawRaise = ref<WithdrawRaiseValueRes>();
  const getWithdrawRaiseValue = async () => {
    // levelCValue 1  levelAValue 2  levelBValue 3  安全等级对应配置项
    const data = await withdrawRaiseValue();
    WithdrawRaise.value = data;
  };
  const getWithdrawValue = (num: number) => {
    const obj = {
      '1': WithdrawRaise.value?.levelCValue || '0',
      '2': WithdrawRaise.value?.levelAValue || '0',
      '3': WithdrawRaise.value?.levelBValue || '0',
    };
    return obj[getUserSecurity(num)];
  };
  onMounted(() => {
    getWithdrawRaiseValue();
  });
</script>

<style lang="less" scoped>
  .increaseLimit_body {
    .modal_title {
      width: 100%;
      padding: 10px 20px;
      font-size: 14px;
      background: var(--color-fill-blue);
      color: var(--color-text-5);
    }
    .item {
      padding: 26px 0 26px 60px;
      border-bottom: 1px solid var(--color-border-1);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:last-child {
        border-bottom: none;
      }
      .icon {
        position: absolute;
        width: 40px;
        height: 40px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .title_tag {
        height: 20px;
        background: var(--color-bg-bitgreen);
        color: rgb(var(--primary-6));
        border-radius: var(--border-radius-medium);
        margin-left: 14px;
      }
      .item_content {
        line-height: 22px;
        font-size: 16px;
        color: var(--color-text-1);
        .value {
          margin-top: 2px;
          font-size: 14px;
          color: var(--color-text-3);
          .on {
            color: rgb(var(--primary-6));
          }
        }
      }
      .item_btn {
        height: 40px;
        margin-left: 26px;
      }
    }
  }
</style>
