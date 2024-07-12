<template>
  <Transition name="slide-right">
    <div class="rate-and-lan-wrapper pointer-events-auto" v-show="show">
      <header class="header">
        <div class="tabs">
          <div @click="toggleTab('lan')" class="tab" :class="{ active: activeTab === 'lan' }">{{ $t('common.settings.language') }}</div>
          <div @click="toggleTab('rate')" class="tab" :class="{ active: activeTab === 'rate' }">{{ $t('common.settings.rate') }}</div>
          <div class="line" :style="{ left: left }"></div>
        </div>
        <IconFont name="close" @click="show = false" class="right-icon" />
      </header>
      <section class="content" v-if="activeTab === 'lan'">
        <div
          class="row"
          v-for="item in languages"
          :key="item.languageKey"
          @click="setLan(item.languageKey)"
          :class="{ selected: locale === item.languageKey.replace('_', '-').toLowerCase() }"
          >{{ item.languageName }}</div
        >
      </section>
      <section class="content" v-else>
        <div class="row" @click="setRate('USD')" :class="{ selected: rateStore.quoteSymbol === 'USD' }">USD-$</div>
        <div class="row" @click="setRate('CNY')" :class="{ selected: rateStore.quoteSymbol === 'CNY' }">CNY-￥</div>
      </section>
    </div>
  </Transition>
</template>
<script lang="ts" setup name="rate-language">
  import { useRateStore, useAppStore } from '@bitunix/shared/store';
  import { px2rem } from '@bitunix/shared/utils/methods';
  import type { Ref } from 'vue';
  const { locale } = useI18n();
  const rateStore = useRateStore();
  const appStore = useAppStore();
  const { languages } = toRefs(appStore);
  const show = ref(false);
  const openSetting = (type: 'lan' | 'rate') => {
    activeTab.value = type;
    show.value = true;
  };
  defineExpose({
    openSetting,
  });

  // todo: 强制左距离，后续改为vant-tab组件
  const languagePosition: Record<string, string> = {
    'zh-cn': '126px',
    'zh-tw': '126px',
    'en-us': '270px',
    'tr-tr': '140px',
  };

  const languagePositionFirst: Record<string, string> = {
    'zh-cn': '0',
    'zh-tw': '0',
    'en-us': '40px',
    'tr-tr': '-10px',
  };

  const activeTab = ref<'lan' | 'rate'>('lan');
  const toggleTab = (type: 'lan' | 'rate') => {
    activeTab.value = type;
  };
  const left = computed(() => {
    if (activeTab.value === 'lan') {
      return px2rem(languagePositionFirst[locale.value]);
    } else {
      return px2rem(languagePosition[locale.value]);
    }
  });
  onMounted(() => {
    if (!!localStorage.getItem('rateSymbol')) {
      rateStore.setQuoteSymbol(localStorage.getItem('rateSymbol') as string);
    }
  });
  watch(
    () => [rateStore.currencyRateList, languages.value],
    () => {
      if (rateStore.currencyRateList.length && languages.value.length) {
        if (!rateStore.quoteSymbol) {
          const currentLangItem = languages.value.find((item) => {
            return item.languageKey.replace('_', '-').toLocaleUpperCase() === locale.value?.toLocaleUpperCase();
          });
          if (currentLangItem?.currencyName) {
            rateStore.setQuoteSymbol(currentLangItem.currencyName.toUpperCase());
          } else {
            rateStore.setQuoteSymbol('USD');
          }
        }
      }
    },
    { immediate: true },
  );
  // 设置汇率
  const setRate = (v: string) => {
    rateStore.setQuoteSymbol(v);
    show.value = false;
  };
  // 设置语言
  const cookie = useCookie(import.meta.env.VITE_CACHE_LANG);
  const handleUpdateLanguage = inject<Ref<(lang: string) => void>>('handleUpdateLanguage');
  const setLan = (v: string) => {
    const lang = v.replace('_', '-').toLocaleLowerCase();
    cookie.value = lang;
    show.value = false;
    handleUpdateLanguage?.value(lang);
  };
</script>
<style lang="less" scoped>
  .rate-and-lan-wrapper {
    background-color: var(--color-bg-interactive-base);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 2023;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    .header {
      padding: 0 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tabs {
      position: relative;
      display: flex;
      align-items: center;
      height: 100px;
      font-size: 32px;
      line-height: 32px;
      .tab {
        margin-right: 62px;
        color: var(--color-text-2);
        &.active {
          color: var(--color-text-1);
        }
      }
      .line {
        position: absolute;
        bottom: 0;
        width: 60px;
        height: 5px;
        background-color: #ea4b64;
        transition: all 0.2s;
        border-radius: 50px;
      }
    }
    .right-icon {
      font-size: 48px;
    }
    .content {
      padding: 25px 30px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      height: calc(100% - 200px);
      .row {
        height: 80px;
        line-height: 80px;
        color: var(--color-text-1);
        font-size: 26px;
        &.selected {
          color: #ea4b64;
        }
      }
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
</style>
