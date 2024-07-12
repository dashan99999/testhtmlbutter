<template>
  <VDropdown :distance="6" :showTriggers="['click']" :hideTriggers="['click']" :popperClass="getThemeClassName(props.theme)">
    <div class="widget-price-switch" v-if="!mobile">
      {{ props.lang && props.lang[type] }}
      <span class="arrow"></span>
    </div>
    <template #popper>
      <ul class="widget-price-popper">
        <!-- 当前版本先过滤指数价格不展示 -->
        <li
          :class="props.lang && type === item ? 'active' : ''"
          @click="() => clickHandle(item as any)"
          v-for="item in Object.keys(props.lang as any).filter(
            (val) => val !== 'index'
          )"
          :key="item"
        >
          {{ props.lang && props.lang[item] }}
          <span class="widget-price-item">
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.37038 1.47222L3.73612 6.10648L1.62964 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>

<script lang="ts" name="PriceSwitch" setup>
import { Dropdown as VDropdown } from 'floating-vue';
import { onMounted, ref } from 'vue';
import { hideAllPoppers } from 'floating-vue';
import { DEFAULT_PRICE, PRICE_CACHE_KEY, PRICE_TYPE } from '../constants';
import { clearHistoryState, getThemeClassName, isMobile, parseSymbol } from '../utils/index';

const mobile = ref<boolean>(false);
const type = ref<string>(DEFAULT_PRICE);
const props = defineProps({
  lang: Object,
  tvWidget: Object,
  theme: String
});

const clickHandle = (result: 'new' | 'mark' | 'index') => {
  type.value = result;

  if (!props.tvWidget) return;

  // 清理历史数据缓存状态
  clearHistoryState();
  const symbol = props.tvWidget.activeChart().symbol().toLowerCase();

  props.tvWidget.activeChart().setSymbol(`${PRICE_TYPE[result]}${parseSymbol(symbol)}`, {
    priceType: result
  });

  localStorage.setItem(PRICE_CACHE_KEY, result);
  hideAllPoppers();
};

onMounted(() => {
  mobile.value = isMobile();
  const priceType = localStorage.getItem(PRICE_CACHE_KEY) || '';

  if (Object.keys(props.lang as any).includes(priceType)) type.value = priceType;
});
</script>

<style lang="scss">
.widget-price-switch {
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    color: var(--color-text-button);
    .arrow {
      border-top-color: var(--color-text-button);
    }
  }

  .arrow {
    vertical-align: middle;
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid var(--color-text-2);
  }
}

.widget-price-popper {
  padding: 5px 0;
  margin: 0;
  list-style: none;
  background-color: var(--color-bg-2);

  & li {
    font-size: 12px;
    line-height: 14px;
    padding: 5px 10px;
    color: var(--color-text-1);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    .widget-price-item {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--color-text-3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      vertical-align: middle;
      box-sizing: content-box;

      & svg {
        display: none;
      }
    }

    &.active {
      .widget-price-item {
        background-color: var(--color-text-button);
        border-color: var(--color-text-button);
      }

      & svg {
        display: inline-block;

        & path {
          stroke: var(--color-bg-2);
        }
      }
    }

    &:hover {
      color: var(--color-text-button);
    }
  }
}
</style>
