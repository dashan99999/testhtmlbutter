<template>
  <ul class="resolution-bar">
    <li class="resolution-item" :class="item === active ? 'active' : ''" v-for="item in secondArray" :key="item" @click="() => clickHandle(item)">
      <span>{{ props.data && props.data.resolutionLabels[item] }}</span>
    </li>
    <li class="tv-widget-popup">
      <VDropdown :distance="6" :showTriggers="['click']" :hideTriggers="['click']" :popperClass="getThemeClassName(props.theme)">
        <div class="active-bar">
          <span class="active-bar-content" v-if="!secondArray.includes(active)">{{ props.data && props.data.resolutionLabels[active] }}</span>
          <span class="arrow"></span>
        </div>
        <template #popper>
          <div class="resolution-dropdown">
            <div class="resolution-dropdown-wrapper">
              <div v-if="!isMobile()" class="resolution-dropdown-header">
                <span class="resolution-title">{{ props.data && props.data.resolutionContent.title }}</span>
                <span v-if="!isEdit" @click="isEdit = true" class="resolution-btn">{{ props.data && props.data.resolutionContent.edit }}</span>
                <span
                  v-else
                  @click="
                    {
                      saveResolution();
                      hideAllPoppers();
                    }
                  "
                  class="resolution-btn"
                  >{{ props.data && props.data.resolutionContent.save }}</span
                >
              </div>
              <p v-if="!isMobile()" class="resolution-count">
                {{ props.data && props.data.resolutionContent.add }}
                <span class="resolution-count-group"
                  ><i>{{ secondArray.length }}</i
                  >/{{ PC_RESOLUTION_BREAK }}</span
                >
              </p>
              <div
                v-for="item in firstArray"
                class="resolution-item"
                :class="secondArray.includes(item) ? 'active' : ''"
                :key="item"
                @click="
                  () => {
                    clickHandle(item);
                    !isEdit && hideAllPoppers();
                  }
                "
              >
                <span>{{ props.data && props.data.resolutionLabels[item] }}</span>
                <svg class="resolution-item-active-btn" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M0 24L24 0V20C24 22.2091 22.2091 24 20 24H0Z" fill="var(--color-text-button)" />
                  <path
                    d="M19.5 14.4L14.3438 19.5563L12 17.2125"
                    stroke="var(--color-text-icon-check)"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </template>
      </VDropdown>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { Dropdown as VDropdown } from 'floating-vue';
import { onMounted, ref } from 'vue';
import { hideAllPoppers } from 'floating-vue';
import { ResolutionCustomCompare, clearHistoryState, getThemeClassName, isMobile } from '../utils/index';
import { PC_RESOLUTION_BREAK, DEFAULT_RESOLUTIONS, RESOLUTIONS_CACHE_KEY, USER_RESOLUTIONS_CACHE_KEY } from '../constants';

const props = defineProps({
  data: Object,
  tvWidget: Object,
  theme: String
});
const isEdit = ref(false);
const firstArray = ref<string[]>([]);
const secondArray = ref<string[]>([]);
const active = ref(DEFAULT_RESOLUTIONS);

const clickHandle = (type: string) => {
  if (isEdit.value) {
    if (secondArray.value.includes(type)) secondArray.value = secondArray.value.filter((item) => item !== type);
    else if (secondArray.value.length < (isMobile() ? 1 : PC_RESOLUTION_BREAK))
      secondArray.value = [...secondArray.value, type].slice().sort(ResolutionCustomCompare);
  } else {
    // 清理历史数据缓存状态
    clearHistoryState();
    active.value = type;
    localStorage.setItem(RESOLUTIONS_CACHE_KEY, type);
    props.tvWidget && props.tvWidget.activeChart().setResolution(type);
  }
};

const saveResolution = () => {
  if (isEdit.value) {
    isEdit.value = false;
    localStorage.setItem(USER_RESOLUTIONS_CACHE_KEY, JSON.stringify(secondArray.value));
  }
};

onMounted(() => {
  if (!props.data) return;

  const keys = Object.keys(props.data.resolutionLabels);
  const mobile = isMobile();
  firstArray.value = keys;

  // 设置用户缓存的分辨率
  const cacheRe = localStorage.getItem(RESOLUTIONS_CACHE_KEY);
  if (cacheRe) active.value = cacheRe;

  // 设置用户收藏的分辨率
  const userCacheRe = localStorage.getItem(USER_RESOLUTIONS_CACHE_KEY);
  if (userCacheRe) secondArray.value = JSON.parse(userCacheRe);
  else secondArray.value = mobile ? [] : keys.slice(0, PC_RESOLUTION_BREAK);
});
</script>

<style lang="scss">
.resolution-bar {
  padding: 0;
  margin: 0 0 0 9px;
  list-style: none;
  display: flex;
  align-items: center;

  .tv-widget-popup {
    margin-left: 5px;
    cursor: pointer;

    .active-bar {
      cursor: pointer;
      padding: 0 5px;
      font-size: 12px;
      line-height: 14px;
      color: var(--color-text-button);

      .active-bar-content {
        margin-right: 5px;
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

      &:hover {
        border-top-color: var(--color-text-button);
      }
    }
  }
}

.resolution-item {
  position: relative;
  margin: 0 5px;
  padding: 0 2px;
  cursor: pointer;
  font-size: 12px;
  line-height: 14px;
  color: var(--color-text-2);
  overflow: hidden;

  &.active,
  &:hover {
    color: var(--color-text-button);
  }

  &:not(li):hover,
  &:not(li).active {
    border-color: var(--color-text-button);
    color: var(--color-text-button);
  }

  .resolution-item-active-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  &.active {
    .resolution-item-active-btn {
      opacity: 1;
    }
  }
}

.resolution-dropdown {
  background-color: var(--color-bg-2);
  padding: 10px;
  width: 318px;
  @media (max-width: 768px) {
    box-sizing: border-box;
  }

  .resolution-dropdown-wrapper {
    .resolution-dropdown-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;

      .resolution-title {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: var(--color-text-1);
      }
      .resolution-btn {
        cursor: pointer;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: var(--color-text-button);
      }
    }
    .resolution-count {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      margin: 5px 0;
      padding: 0 5px;

      .resolution-count-group i {
        font-style: normal;
        color: var(--color-text-button);
      }
    }
  }

  .resolution-item {
    display: inline-block;
    margin: 5px;
    text-align: center;
    color: var(--color-text-1);
    border: 1px solid var(--color-border-1);
    border-radius: 4px;
    width: 63px;
    height: 30px;
    line-height: 30px;
    text-align: center;

    @media (max-width: 768px) {
      width: 64px;
    }
  }
}

// 三方组件样式
.v-popper__arrow-container {
  display: none;
}

.v-popper--theme-dropdown .v-popper__inner {
  background-color: var(--color-bg-2) !important;
  color: var(--color-text-2) !important;
  border-radius: 6px;
  border-color: var(--color-border-1) !important;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}

.v-popper--theme-dropdown .v-popper__arrow-inner {
  visibility: visible;
  border-color: var(--color-border-1) !important;
}

.v-popper--theme-dropdown .v-popper__arrow-outer {
  border-color: var(--color-border-1) !important;
}
</style>
