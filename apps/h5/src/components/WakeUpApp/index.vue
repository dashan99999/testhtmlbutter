<template>
  <div
    v-if="!embedded && isAndroid"
    class="fixed right-0 py-16 pl-24 pr-12 color-text-on-btn-brand-base color-bg-btn-brand-base fs-24 border-rd-l-52 flex-row-center-center z-1"
    :class="[subHeadHeight ? 'top-188' : 'top-60']"
    :style="{ ...computedTop }"
  >
    <a
      ref="openApp"
      :href="`applaunch://m.bitunix.com?type=h5&path=${encodeURIComponent(`${currentHost}${props.pathname}${connectingSymbol}${refTime}`)}`"
      @click="handleClickA"
    >
      {{ $t('activity.open_in_app') }}
    </a>
    <IconFont class="fs-20 ml-4" name="go" />
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '#shared/store/index';

  interface Props {
    pathname: string;
    top?: string;
  }

  const props = withDefaults(defineProps<Props>(), {});

  const appStore = useAppStore();
  const { embedded } = storeToRefs(appStore);

  const currentHost = import.meta.env.VITE_HOST;

  const isAndroid = ref<boolean>(false);
  const subHeadHeight = ref<boolean>(false);
  const refTime = ref(new Date().getTime());

  onMounted(() => {
    if (process.client) {
      getMobileType();
      subHeadHeight.value = /browser/i.test(location.pathname);
    }
  });

  const computedTop = computed(() => {
    if (!props.top) {
      return {};
    }
    if (subHeadHeight.value) {
      return { top: ` ${px2rem(128 + Number(props.top))}` };
    }
    return { top: ` ${px2rem(props.top)}` };
  });

  const handleClickA = () => {
    console.log(`${currentHost}${props.pathname}${connectingSymbol.value}${refTime.value}`);
    refTime.value = new Date().getTime();
    visibilitychangeFn();
  };

  const visibilitychangeFn = () => {
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        navigateToLocale('/homedownload');
      }
    }, 2000);
  };

  const connectingSymbol = computed(() => {
    if (props.pathname.indexOf('?') > -1) {
      return '&t=';
    }
    return '?t=';
  });

  const getMobileType = () => {
    const ua = navigator.userAgent;
    isAndroid.value = /Android/i.test(ua);
    // if (!embedded.value && isAndroid) {
    //   setTimeout(() => {
    // openApp.value?.click();
    // }, 500);
    // }
  };
</script>

<style lang="less" scoped>
  .set-top-188 {
    top: 188px !important;
  }
</style>
