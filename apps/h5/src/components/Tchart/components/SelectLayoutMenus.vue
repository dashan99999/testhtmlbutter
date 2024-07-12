<template>
  <VDropdown :distance="6" :showTriggers="['click']" :hideTriggers="['click']" :popperClass="getThemeClassName(props.theme)">
    <span class="bitunix-tv-icons widget-selectLayout-icon" v-tooltip="props.lang ? props.lang.selectLayout : null" v-html="icons[id]"></span>
    <template #popper>
      <ul class="widget-selectLayout-menus">
        <li v-for="(item, index) in menus" :key="index">
          <span class="widget-selectLayout-menus-index">{{ index + 1 }}</span>
          <div
            v-for="(iconKey, iconIndex) in item"
            :key="iconIndex"
            @click="() => clickHandle(iconKey)"
            v-html="icons[iconKey]"
            class="widget-selectLayout-menus-icon"
            :class="{ active: id === iconKey }"
          ></div>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>

<script lang="ts">
import { VTooltip } from 'floating-vue';
import { tradingViewCacheSave } from '../utils/tradingview';
export default {
  directives: {
    tooltip: VTooltip
  }
};
</script>

<script lang="ts" name="SelectLayoutMenus" setup>
import { Dropdown as VDropdown } from 'floating-vue';
import { hideAllPoppers } from 'floating-vue';
import { onMounted, ref } from 'vue';
import { getThemeClassName, getTradingViewLocalCache } from '../utils/index';

const icons: Record<string, string> = {
  s: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" d="M2.5 1C1.67 1 1 1.67 1 2.5v12c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5h-14ZM0 2.5A2.5 2.5 0 0 1 2.5 0h14A2.5 2.5 0 0 1 19 2.5v12a2.5 2.5 0 0 1-2.5 2.5h-14A2.5 2.5 0 0 1 0 14.5v-12Z"></path></svg>`,
  '2h': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v15H2.5A1.5 1.5 0 0 1 1 14.5v-12ZM10 16h6.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H10v15ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '2v': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1h14c.83 0 1.5.67 1.5 1.5V8H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5V9H1Zm1.5-9A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '3v': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1h14c.83 0 1.5.67 1.5 1.5V5H1V2.5ZM1 6v5h17V6H1Zm17 6H1v2.5c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5V12ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '3h': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H6v15H2.5A1.5 1.5 0 0 1 1 14.5v-12ZM7 16h5V1H7v15Zm6-15v15h3.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H13ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '3s': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v15H2.5A1.5 1.5 0 0 1 1 14.5v-12ZM10 16h6.5c.83 0 1.5-.67 1.5-1.5V9h-8v7Zm8-8V2.5c0-.83-.67-1.5-1.5-1.5H10v7h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '2-1': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v7H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5V9H1Zm17-1V2.5c0-.83-.67-1.5-1.5-1.5H10v7h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '1-2': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1h14c.83 0 1.5.67 1.5 1.5V8H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H9V9H1Zm9 7h6.5c.83 0 1.5-.67 1.5-1.5V9h-8v7ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '3r': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v7H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H9V9H1Zm9 7h6.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H10v15ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '4': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v7H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H9V9H1Zm9 7h6.5c.83 0 1.5-.67 1.5-1.5V9h-8v7Zm8-8V2.5c0-.83-.67-1.5-1.5-1.5H10v7h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '4h': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H4v15H2.5A1.5 1.5 0 0 1 1 14.5v-12ZM5 16h4V1H5v15Zm5-15v15h4V1h-4Zm5 0v15h1.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H15ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '4v': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1h14c.83 0 1.5.67 1.5 1.5V4H1V2.5ZM1 5v3h17V5H1Zm17 4H1v3h17V9Zm0 4H1v1.5c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5V13ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '4s': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v15H2.5A1.5 1.5 0 0 1 1 14.5v-12ZM10 16h6.5c.83 0 1.5-.67 1.5-1.5V12h-8v4Zm8-5V6h-8v5h8Zm0-6V2.5c0-.83-.67-1.5-1.5-1.5H10v4h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '1-3': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1h14c.83 0 1.5.67 1.5 1.5V8H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H6V9H1Zm6 7h5V9H7v7Zm6 0h3.5c.83 0 1.5-.67 1.5-1.5V9h-5v7ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '2-2': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v7H1V2.5ZM1 9v3h17V9H1Zm17-1V2.5c0-.83-.67-1.5-1.5-1.5H10v7h8Zm0 5H1v1.5c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5V13ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '1-4': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1h14c.83 0 1.5.67 1.5 1.5V8H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H4V9H1Zm4 7h4V9H5v7Zm5 0h4V9h-4v7Zm5 0h1.5c.83 0 1.5-.67 1.5-1.5V9h-3v7ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '5s': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v15H2.5A1.5 1.5 0 0 1 1 14.5v-12ZM10 16h6.5c.83 0 1.5-.67 1.5-1.5V13h-8v3Zm8-4V9h-8v3h8Zm0-4V5h-8v3h8Zm0-4V2.5c0-.83-.67-1.5-1.5-1.5H10v3h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '2-3': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v7H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H6V9H1Zm6 7h5V9H7v7Zm6 0h3.5c.83 0 1.5-.67 1.5-1.5V9h-5v7Zm5-8V2.5c0-.83-.67-1.5-1.5-1.5H10v7h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '5h': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M2.5 1C1.67 1 1 1.67 1 2.5v12c0 .83.67 1.5 1.5 1.5H4V1H2.5ZM9 16H5V1h4v3h1V1h4v15h-4v-3H9v3Zm6 0h1.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H15v15ZM2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17Zm9.18-7.49c0 1.16-.88 1.96-2.12 1.96-1.17 0-1.97-.7-2.04-1.63v-.05h.94v.02c.08.48.51.84 1.1.84.68 0 1.14-.46 1.14-1.12v-.01c0-.64-.47-1.1-1.13-1.1-.32 0-.6.1-.81.27-.1.09-.2.2-.27.32h-.88l.27-3.28h3.46v.83H8.7l-.16 1.7h.02c.25-.38.71-.6 1.28-.6 1.07 0 1.85.77 1.85 1.84v.01Z"></path></svg>`,
  '6': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H6v7H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H6V9H1Zm6 7h5V9H7v7Zm6 0h3.5c.83 0 1.5-.67 1.5-1.5V9h-5v7Zm5-8V2.5c0-.83-.67-1.5-1.5-1.5H13v7h5Zm-6-7H7v7h5V1ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '6c': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v4H1V2.5ZM1 6v5h8V6H1Zm0 6v2.5c0 .83.67 1.5 1.5 1.5H9v-4H1Zm9 4h6.5c.83 0 1.5-.67 1.5-1.5V12h-8v4Zm8-5V6h-8v5h8Zm0-6V2.5c0-.83-.67-1.5-1.5-1.5H10v4h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '6h': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M2.5 1C1.67 1 1 1.67 1 2.5v12c0 .83.67 1.5 1.5 1.5H4V1H2.5ZM9 16H5V1h4v3h1V1h4v15h-4v-3H9v3Zm6 0h1.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H15v15ZM2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17Zm9.16-7.48c0 1.13-.9 1.95-2.1 1.95-1.26 0-2.29-.87-2.29-2.85 0-1.87.87-2.98 2.3-2.98 1.05 0 1.82.6 2 1.45l.01.04h-1l-.01-.03c-.15-.39-.5-.64-1-.64-.91 0-1.29.87-1.33 1.94v.17h.02c.22-.51.78-.9 1.55-.9 1.08 0 1.85.78 1.85 1.84Zm-3.25 0v.01c0 .63.5 1.12 1.13 1.12a1.1 1.1 0 0 0 1.12-1.1c0-.65-.47-1.1-1.11-1.1-.65 0-1.14.45-1.14 1.08Z"></path></svg>`,
  '7h': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M2.5 1C1.67 1 1 1.67 1 2.5v12c0 .83.67 1.5 1.5 1.5H4V1H2.5ZM9 16H5V1h4v3h1V1h4v15h-4v-3H9v3Zm6 0h1.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H15v15ZM2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17Zm6.75-5.63H8.2l2.47-4.8v-.01H7.74v-.83h3.92v.84l-2.4 4.8Z"></path></svg>`,
  '8': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H4v7H1V2.5ZM1 9v5.5c0 .83.67 1.5 1.5 1.5H4V9H1Zm4 7h4V9H5v7Zm5 0h4V9h-4v7Zm5 0h1.5c.83 0 1.5-.67 1.5-1.5V9h-3v7Zm3-8V2.5c0-.83-.67-1.5-1.5-1.5H15v7h3Zm-4-7h-4v7h4V1ZM9 1H5v7h4V1ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '8c': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M1 2.5C1 1.67 1.67 1 2.5 1H9v3H1V2.5ZM1 5v3h8V5H1Zm0 4v3h8V9H1Zm0 4v1.5c0 .83.67 1.5 1.5 1.5H9v-3H1Zm9 3h6.5c.83 0 1.5-.67 1.5-1.5V13h-8v3Zm8-4V9h-8v3h8Zm0-4V5h-8v3h8Zm0-4V2.5c0-.83-.67-1.5-1.5-1.5H10v3h8ZM2.5 0A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14Z"></path></svg>`,
  '8h': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17" width="16" height="15"><path fill="currentColor" fill-rule="evenodd" d="M2.5 1C1.67 1 1 1.67 1 2.5v12c0 .83.67 1.5 1.5 1.5H4V1H2.5ZM9 16H5V1h4v3h1V1h4v15h-4v-3H9v3Zm6 0h1.5c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5H15v15ZM2.5 17h14a2.5 2.5 0 0 0 2.5-2.5v-12A2.5 2.5 0 0 0 16.5 0h-14A2.5 2.5 0 0 0 0 2.5v12A2.5 2.5 0 0 0 2.5 17Zm9.2-7.16c0 .96-.91 1.63-2.2 1.63s-2.19-.67-2.19-1.63v-.01c0-.72.52-1.27 1.27-1.42v-.03c-.64-.17-1.06-.64-1.06-1.24 0-.87.82-1.5 1.98-1.5 1.16 0 1.98.63 1.98 1.5 0 .6-.42 1.07-1.06 1.24v.03c.75.15 1.27.7 1.27 1.42ZM8.5 7.24c0 .48.4.82.99.82s.99-.34.99-.83c0-.5-.4-.83-.99-.83-.58 0-.99.34-.99.83Zm-.16 2.53c0 .54.48.93 1.15.93.68 0 1.15-.39 1.15-.93 0-.55-.47-.94-1.15-.94-.68 0-1.15.4-1.15.94Z"></path></svg>`
}; // "10c5" | "12c6" | "12c4" | "14c7" | "16c8" | "16c4"

const menus = [
  ['s'],
  ['2h', '2v'],
  ['3v', '3h', '3s', '2-1', '1-2', '3r'],
  ['4', '4h', '4v', '4s', '1-3', '2-2'],
  ['1-4', '5s', '2-3', '5h'],
  ['6', '6c', '6h'],
  ['7h'],
  ['8', '8c', '8h']
];

const props = defineProps({
  lang: Object,
  tvWidget: Object,
  theme: String,
  exType: String
});

const id = ref('s');

const clickHandle = (key: string) => {
  hideAllPoppers();
  if (!props.tvWidget) return;
  id.value = key;
  props.tvWidget.setLayout(key);
  tradingViewCacheSave(props.tvWidget, props.exType || '');
};

onMounted(() => {
  const target = getTradingViewLocalCache(props.exType);

  if (target) {
    id.value = JSON.parse(target).layout;
  }
});
</script>

<style lang="scss">
.widget-selectLayout-icon {
  & svg path {
    stroke: var(--color-text-2);
    fill: inherit;
  }
}

.widget-selectLayout-menus {
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: var(--color-bg-2);

  > li {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px 5px;

    .widget-selectLayout-menus-index {
      font-size: 12px;
      line-height: 14px;
      font-weight: 500;
      display: inline-block;
      padding-left: 5px;
      padding-right: 10px;
      color: var(--color-text-2);
    }

    .widget-selectLayout-menus-icon {
      padding: 5px;

      &:not(:last-child) {
        margin-right: 5px;
      }

      &:hover,
      &.active {
        path {
          stroke: var(--color-text-button);
        }
      }
    }

    &:hover,
    &.active {
      background-color: var(--color-bg-4);
    }
  }
}
</style>
