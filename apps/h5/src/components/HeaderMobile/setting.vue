<template>
  <Transition name="slide-right">
    <div class="setting-wrapper p-[3,30,0,30] pointer-events-auto" v-show="props.show">
      <div class="flex justify-between items-center m-t20" v-show="!isLogin">
        <div class="w-50%">
          <van-button block plain type="primary" class="tbtn" @click="linkTo('/login')">{{ $t('common.header.login') }}</van-button>
        </div>
        <div class="m-l30 w-50%">
          <van-button block type="primary" class="tbtn" @click="linkTo('/register')">{{ $t('common.header.register') }}</van-button>
        </div>
      </div>
      <div class="m-t40 w-full">
        <div class="w-full" v-for="item in menus" :key="item.url || item.action">
          <div class="w-full flex items-center justify-between h-120" @click="handleMenuClick(item)">
            <div class="fs-32 color-text-1 fm-medium">{{ $t(item.title) }}</div>
            <IconFont
              v-if="item.children?.length"
              name="arrow_down"
              :class="['color-text-2', 'fs-24', 'arrow-icon', { rotate: item.expand }]"
            />
            <van-switch
              v-else-if="item.type === 'switch'"
              :size="px2rem('48')"
              active-value="dark"
              inactive-value="light"
              inactive-color="var(--color-bg-zero)"
              active-color="var(--color-bg-success-base)"
              v-model="appStore.theme"
            />
            <div v-else class="color-text-2 fs-28">{{ item.value }}</div>
          </div>
          <div v-show="item.children?.length" class="w-full collapse" :class="{ show: item.expand }">
            <div
              class="w-full flex items-center justify-between h-96"
              v-for="child in item.children"
              :key="child.url || child.action"
              @click="handleMenuClick(child)"
            >
              <div class="fs-28 color-text-2">{{ $t(child.title) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <RateAndLan ref="RateLanRef" />
</template>
<script lang="ts" setup name="header-setting">
  import RateAndLan from './rateAndLan.vue';
  import { useRateStore, useAppStore } from '@bitunix/shared/store';
  import { px2rem } from '@bitunix/shared/utils/methods';

  type MenuItem = {
    url?: string;
    title: string;
    expand?: boolean;
    children?: MenuItem[];
    action?: string;
    value?: any;
    type?: string;
  };

  const { locale } = useI18n();
  const isLogin = useLoginStatus();
  const appStore = useAppStore();
  const { languages } = toRefs(appStore);
  const props = defineProps<{ show: boolean }>();

  const RateLanRef = ref<InstanceType<typeof RateAndLan> | null>(null);
  const openDefaultSetting = (type: 'lan' | 'rate') => {
    RateLanRef.value?.openSetting(type);
  };

  const rateStore = useRateStore();
  const currentLang = computed(() => {
    return (Array.isArray(languages.value) ? languages.value : []).find(
      (it) => it.languageKey.replace('_', '-').toLowerCase() === locale.value,
    )?.languageName;
  });

  const linkTo = (path: string) => {
    navigateToLocale(path);
    emits('closePanel');
  };

  const menus = reactive<MenuItem[]>([
    {
      title: 'common.header.markets',
      url: '/homemarket',
    },
    {
      title: 'common.header.trade',
      expand: false,
      children: [
        {
          title: 'common.header.spot',
          url: '/spot-trade',
        },
      ],
    },
    {
      title: 'common.header.support',
      expand: false,
      children: [
        {
          title: 'common.header.helpCenter',
          action: 'help',
        },
        {
          title: 'common.header.community',
          url: '/community',
        },
      ],
    },
    {
      title: 'common.settings.language',
      value: currentLang.value,
      action: 'lang',
    },
    {
      title: 'common.settings.rate',
      value: rateStore.quoteSymbol,
      action: 'rate',
    },
    // {
    //   title: 'common.dark',
    //   value: appStore.theme,
    //   type: 'switch',
    // },
    {
      title: 'common.settings.download',
      url: '/homedownload',
    },
  ]);
  watch(
    () => currentLang.value,
    (v) => {
      const item = menus.find((it) => it.action === 'lang');
      if (item) {
        item.value = v;
      }
    },
  );
  watch(
    () => appStore.theme,
    (v) => {
      const item = menus.find((it) => it.action === 'switch');
      if (item) {
        item.value = v;
      }
    },
  );
  watch(
    () => rateStore.quoteSymbol,
    (v) => {
      const item = menus.find((it) => it.action === 'rate');
      if (item) {
        item.value = v;
      }
    },
  );
  const handleMenuClick = (item: MenuItem) => {
    if (item.children?.length) {
      item.expand = !item.expand;
    }
    if (item.url) {
      if (item.url === '/homedownload') {
        window.open('http://www.ubit.press/', '_blank');
      } else {
        linkTo(item.url);
      }
    } else if (item.action) {
      switch (item.action) {
        case 'help':
          openHelper();
          break;
        case 'lang':
          openDefaultSetting('lan');
          break;
        case 'rate':
          openDefaultSetting('rate');
          break;
      }
    }
  };

  // 出发关闭右侧面板事件
  const emits = defineEmits(['closePanel']);
  // 打开帮助中心
  const openHelper = () => {
    const url =
      locale.value === 'zh-cn'
        ? 'https://ubit001.zendesk.com/hc/zh-tw/community/topics'
        : 'https://ubit001.zendesk.com/hc/en/community/topics';
    window.open(url, '_blank');
  };
</script>
<style lang="less" scoped>
  .setting-wrapper {
    background-color: var(--bx-bg-popup);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 124px;
    z-index: 2022;
    box-sizing: border-box;
    .tbtn {
      height: 88px !important;
      line-height: 88px !important;
      // border: 1px solid #ea4b64 !important;
    }
  }

  .slide-right-enter,
  .slide-right-leave-to {
    transform: translateX(100%);
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.3s;
  }
  .arrow-icon {
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
