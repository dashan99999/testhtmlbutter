<template>
  <div class="tv-header-widget">
    <div class="left">
      <Resolution :data="t" :tvWidget="props.tvWidget" :theme="props.theme" />
      <div class="widget-icons-group">
        <span class="widget-icons-left-line"></span>
        <SeriesMenus :lang="t.seriesType" :tvWidget="props.tvWidget" :theme="props.theme" />
        <Icons type="indicator" :handle="iconHandle" :tooltip="t.indicator" />
        <ScreenshotMenus v-if="!mobile" :lang="t" :tvWidget="props.tvWidget" :theme="props.theme" />
        <DisplaySetting
          :lang="t"
          :tvWidget="props.tvWidget"
          :render="props.render"
          :config="props.displayMenus"
          :emit="props.emit"
          :theme="props.theme"
        />
        <!-- <SelectLayoutMenus :lang="t" :tvWidget="props.tvWidget" :theme="props.theme" :exType="props.exType" /> -->
        <Icons type="setting" :handle="iconHandle" :tooltip="t.setting" />
        <Icons type="reset" :handle="iconHandle" :tooltip="t.clear" />
      </div>
    </div>
    <div class="right">
      <PriceSwitch v-if="props.exType === 'contract'" :lang="t.price" :tvWidget="props.tvWidget" :theme="props.theme" />
      <Icons :type="isFullScreen ? 'exitFullscreen' : 'fullscreen'" :handle="() => iconHandle('fullscreen')" :tooltip="t.fullscreen" />
    </div>
  </div>
</template>

<script lang="ts" name="HeaderWidget" setup>
import i18n from '../locale/index';
import Icons from './Icons.vue';
import Resolution from './Resolution.vue';
import SeriesMenus from './SeriesMenus.vue';
import ScreenshotMenus from './ScreenshotMenus.vue';
import DisplaySetting from './DisplaySetting.vue';
import PriceSwitch from './PriceSwitch.vue';
import SelectLayoutMenus from './SelectLayoutMenus.vue';
import { onMounted, ref } from 'vue';
import { clearLocalStorage, isMobile } from '../utils/index';
import { TV_DEFAULT_ID } from '../constants';

const props = defineProps({
  lang: String,
  tvWidget: Object,
  exType: String,
  wsUrl: [String, URL],
  render: Function,
  theme: String,
  emit: Function,
  displayMenus: Object
});

// 如果传递进来的语言类型有误则使用英文语言兜底
const t = ref(props.lang ? i18n[props.lang] : i18n.en_US);
const mobile = ref(false);
const isFullScreen = ref(false);

const iconHandle = (type: 'indicator' | 'reset' | 'setting' | 'display' | 'fullscreen') => {
  const { tvWidget } = props;
  const activeChart = tvWidget?.activeChart();
  const handle = {
    indicator: () => {
      activeChart.executeActionById('insertIndicator');
    },
    reset: () => {
      tvWidget?.showConfirmDialog({
        title: t.value.clear,
        content: t.value.clear,
        showDisableConfirmationsCheckbox: true,
        callback: (res: boolean) => {
          if (res) {
            clearLocalStorage();
            // 强制让子组件渲染
            props.render && props.render();
          }
        }
      });
    },
    setting: () => activeChart.executeActionById('chartProperties'),
    display: () => null,
    fullscreen: () => {
      isFullScreen.value = !isFullScreen.value;
      const target = document.getElementById(TV_DEFAULT_ID);
      const classname = 'trading_view_fullscreen';

      if (isFullScreen.value) {
        target && target.classList.add(classname);
      } else {
        target && target.classList.remove(classname);
      }
    }
  };

  handle[type]();
};

onMounted(() => {
  mobile.value = isMobile();
});
</script>
<style lang="scss">
.tv-header-widget {
  width: 100%;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-bg-0);
  border-bottom: 1px solid var(--color-border-1);

  @media (max-width: 768px) {
    background-color: var(--color-bg-kline-tool);
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;

    .widget-icons-group {
      padding-left: 5px;
      margin-left: 15px;
      display: flex;
      justify-content: center;
      align-items: center;

      .widget-icons-left-line {
        width: 1px;
        height: 12px;
        background-color: var(--color-text-2);
        opacity: 0.5;
      }
    }
  }
  .right {
    display: flex;
    margin-right: 5px;
  }
}
</style>
