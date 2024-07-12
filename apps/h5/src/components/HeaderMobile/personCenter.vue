<template>
  <Transition name="slide-right">
    <div class="person-center-wrapper pointer-events-auto" v-show="props.show">
      <div class="flex items-center m-b40">
        <img class="w-88 h-88 b-r44" :src="userStore.avatar" alt="" />
        <div class="flex flex-1 flex-col m-l24 h-88 justify-between">
          <div class="color-text-1 fs-36">{{ userStore.nickName }}</div>
          <div class="flex items-center" @click="handleCopy(`${userStore.id}`)">
            <div class="color-text-2 fs-24">UID:{{ userStore.id }}</div>
            <IconFont name="copy color-text-2 fs-24 m-l8" />
          </div>
        </div>
      </div>
      <div class="w-full" v-for="item in menus" :key="item.url || item.action">
        <div class="w-full flex items-center justify-between h-120" @click="handleMenuClick(item)">
          <div class="fs-32 color-text-1 fm-medium flex items-center"
            >{{ $t(item.title) }}
            <span
              v-show="item.type === 'security' && userStore.userSecurityLevel === 'low'"
              class="w-10 h-10 b-r10 color-bg-error-base m-l16 block"
            ></span
          ></div>
          <IconFont
            v-if="item.children?.length"
            name="arrow_down"
            :class="['color-text-2', 'fs-24', 'arrow-icon', { rotate: item.expand }]"
          />
          <div v-else class="color-text-2 fs-28">{{ item.value }}</div>
        </div>
        <div v-show="item.children?.length" class="w-full collapse" :class="{ show: item.expand }">
          <div
            class="w-full flex items-center justify-between h-56"
            v-for="child in item.children"
            :key="child.url || child.action"
            @click="handleMenuClick(child)"
          >
            <div class="fs-28 color-text-2">{{ $t(child.title) }}</div>
          </div>
        </div>
      </div>
      <div class="flex h-100 items-center justify-center color-text-2 fs-30 btn b-r10 m-t80" @click="logout">
        {{ $t('common.header.logout') }}
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup name="person-center">
  import { useUserStore } from '@bitunix/shared/store';
  import { useClipboardPro } from '@bitunix/shared/hooks/useClipboard';
  import { showToast } from '@bitunix/shared/utils/vant';
  type MenuItem = {
    url?: string;
    title: string;
    expand?: boolean;
    children?: MenuItem[];
    action?: string;
    value?: any;
    type?: string;
  };
  const { t } = useI18n();
  const { copy } = useClipboardPro();
  const props = defineProps<{ show: boolean }>();
  const userStore = useUserStore();
  const localpath = useLocalePath();
  const emits = defineEmits(['close-panel']);
  const loginOut = useLogout();
  const logout = () => {
    emits('close-panel');
    loginOut(localpath('/'));
  };
  const routeLink = (url: string) => {
    emits('close-panel');
    navigateToLocale(url);
  };
  const handleCopy = (text: string) => {
    copy(text);
  };
  const menus = reactive<MenuItem[]>([
    {
      title: 'common.header.assets',
      expand: false,
      children: [
        {
          title: 'common.contract',
          url: '/assets/contract',
        },
        {
          title: 'common.spotAccount',
          url: '/assets/spotaccount',
        },
        {
          title: 'common.earnAccount',
          url: '/assets/earnAccount',
        },
      ],
    },
    {
      title: 'common.order',
      expand: false,
      children: [
        {
          title: 'common.spot_order',
          url: '/spot-order-page',
        },
      ],
    },
    {
      title: 'common.header.security',
      url: '/account/security',
      type: 'security',
    },
    {
      title: 'common.header.KYC',
      url: '/account/authentication',
    },
  ]);
  const handleMenuClick = (item: MenuItem) => {
    if (item.children?.length) {
      item.expand = !item.expand;
    }
    if (item.url) {
      if (item.url === '/assets/earnAccount') {
        return showToast(t('home.tip2'));
      }
      routeLink(item.url);
    }
  };
</script>
<style lang="less" scoped>
  .person-center-wrapper {
    background-color: var(--color-bg-popup);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 128px;
    z-index: 2025;
    box-sizing: border-box;
    padding: 40px 30px;
  }
  .slide-right-enter,
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.3s;
  }
  .btn {
    border: 2px solid var(--color-border-base);
  }
  .icon {
    transition: transform 0.3s linear;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rotate {
    transform: rotate(-180deg);
  }
  .collapse {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s linear;
    &.show {
      max-height: 200px;
    }
  }
</style>
