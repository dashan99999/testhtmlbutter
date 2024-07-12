<template>
  <VDropdown :distance="6" :showTriggers="['click']" :hideTriggers="['click']" :popperClass="getThemeClassName(props.theme)">
    <span class="bitunix-tv-icons widget-series-icon" v-html="active?.icon" v-tooltip="active ? active?.name : null"></span>
    <template #popper>
      <ul class="widget-series-menus">
        <li v-for="item in menus" :key="item.key" :class="item.key === active?.key ? 'active' : ''" @click="() => clickHandle(item.key)">
          <span class="series-menus-icon" v-html="item.icon"></span>
          <span class="series-menus-name">{{ item.name }}</span>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>

<script lang="ts">
import { VTooltip } from 'floating-vue';
export default {
  directives: {
    tooltip: VTooltip
  }
};
</script>

<script lang="ts" name="SeriesMenus" setup>
import { Dropdown as VDropdown } from 'floating-vue';
import { hideAllPoppers } from 'floating-vue';
import { getThemeClassName } from '../utils';
import { onMounted, ref, watch } from 'vue';
import { DEFAULT_SERIES, SERIES_CACHE_KEY } from '../constants';

const icons = {
  '0': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.372 3.6a.75.75 0 00-1.5 0v2.102H13a.75.75 0 000 1.5h2.872v9.744a.75.75 0 001.5 0v-1.87h2.888a.75.75 0 000-1.5h-2.888v-6.97a.754.754 0 000-.309V3.6zM6.74 7.269a.75.75 0 111.5 0v2.014H11a.75.75 0 110 1.5H8.24v9.421a.75.75 0 11-1.5 0v-1.788H3.962a.75.75 0 010-1.5h2.776v-6.731a.754.754 0 010-.304V7.269z"></path></svg>`,
  '1': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7 2.85a.75.75 0 01.75.75v1.65H9c.966 0 1.75.784 1.75 1.75v10A1.75 1.75 0 019 18.75H7.75v1.65a.75.75 0 01-1.5 0v-1.65H5A1.75 1.75 0 013.25 17V7c0-.966.784-1.75 1.75-1.75h1.25V3.6A.75.75 0 017 2.85zM4.75 7A.25.25 0 015 6.75h4a.25.25 0 01.25.25v10a.25.25 0 01-.25.25H5a.25.25 0 01-.25-.25V7zM15 7.25A1.75 1.75 0 0013.25 9v6c0 .966.784 1.75 1.75 1.75h1.25V18a.75.75 0 001.5 0v-1.25H19A1.75 1.75 0 0020.75 15V9A1.75 1.75 0 0019 7.25h-1.25V6a.75.75 0 00-1.5 0v1.25H15zM14.75 9a.25.25 0 01.25-.25h4a.25.25 0 01.25.25v6a.25.25 0 01-.25.25h-4a.25.25 0 01-.25-.25V9z" clip-rule="evenodd"></path></svg>`,
  '2': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M20.289 3.308a.75.75 0 01.403.98l-2.5 5.992a.75.75 0 01-.692.462h-2.104L12.5 16.898a.75.75 0 01-1.336.041l-2.422-4.417-4.078 7.824a.75.75 0 11-1.33-.694l4.726-9.067a.75.75 0 011.323-.014l2.387 4.354 2.47-5.254a.75.75 0 01.678-.43H17l2.308-5.53a.75.75 0 01.981-.404z" clip-rule="evenodd"></path></svg>`,
  '3': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20.615 4.509a.75.75 0 10-.943-1.167l-2.89 2.335h-2.316a.75.75 0 00-.471.166l-2.66 2.149L8.7 6.167a.75.75 0 00-.888.025l-4.13 3.216a.75.75 0 10.922 1.184L8.3 7.714l2.644 1.83a.75.75 0 00.898-.033l2.89-2.334h2.316a.75.75 0 00.471-.167l3.097-2.501zM4.5 19a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM7 19.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM10.5 19a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM13 19.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM16.5 19a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM19.144 19.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM4.5 16a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM7 16.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM10.5 16a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM13 16.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM16.5 16a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM19.144 16.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM4.5 13a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM7 13.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z"></path><path d="M7.5 10a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM10 13.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM13.5 13a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM13 10.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM16.5 13a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM19.144 13.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM16.5 10a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM19.144 10.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM19.644 7a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1z"></path></svg>`,
  '4': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M15.5 2.75a1.75 1.75 0 00-1.75 1.75v3.268a1.765 1.765 0 00-.25-.018h-4A1.75 1.75 0 007.75 9.5v4c0 .085.006.168.018.25H4.5a1.75 1.75 0 00-1.75 1.75v4c0 .966.784 1.75 1.75 1.75h4a1.75 1.75 0 001.75-1.75v-4c0-.085-.006-.168-.018-.25H13.5a1.75 1.75 0 001.75-1.75v-3.268c.082.012.165.018.25.018h4a1.75 1.75 0 001.75-1.75v-4a1.75 1.75 0 00-1.75-1.75h-4zm-.25 1.75a.25.25 0 01.25-.25h4a.25.25 0 01.25.25v4a.25.25 0 01-.25.25h-4a.25.25 0 01-.25-.25v-4zM9.5 9.25a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h4a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25h-4zm-5 6a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h4a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25h-4z" clip-rule="evenodd"></path></svg>`,
  '5': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M6.522 3.793a.75.75 0 01.75-.75h4.132a.75.75 0 01.75.75v10.8h2.632V6.225a.75.75 0 01.75-.75h4.723a.75.75 0 01.75.75V18.99a.75.75 0 01-1.5 0V6.975h-3.223v8.368a.75.75 0 01-.75.75h-4.132a.75.75 0 01-.75-.75v-10.8H8.022v15.663a.75.75 0 01-.75.75H3.73a.75.75 0 01-.75-.75v-4.255a.75.75 0 011.5 0v3.505h2.042V3.793z" clip-rule="evenodd"></path></svg>`,
  '6': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M3.241 3.47a.75.75 0 011.061 0l.996.995.995-.995a.75.75 0 011.06 1.06l-.995.996.996.996a.75.75 0 11-1.06 1.06l-.996-.996-.996.996a.75.75 0 01-1.06-1.06l.995-.996-.996-.996a.75.75 0 010-1.06zM20.759 4.53a.75.75 0 10-1.06-1.06l-.996.995-.996-.995a.75.75 0 10-1.06 1.06l.995.996-.996.996a.75.75 0 101.061 1.06l.996-.996.996.996a.75.75 0 101.06-1.06l-.995-.996.995-.996zM7.354 9.944a.75.75 0 010 1.06L6.358 12l.996.996a.75.75 0 01-1.06 1.06l-.996-.995-.996.995a.75.75 0 11-1.06-1.06L4.236 12l-.996-.996a.75.75 0 011.061-1.06l.996.995.995-.995a.75.75 0 011.06 0zM7.354 17.478a.75.75 0 10-1.061-1.06l-.995.995-.996-.995a.75.75 0 00-1.06 1.06l.995.996-.996.996a.75.75 0 101.06 1.06l.997-.995.995.995a.75.75 0 001.061-1.06l-.996-.996.996-.996zM20.76 9.944a.75.75 0 010 1.06l-.996.996.996.995a.75.75 0 11-1.06 1.061l-.997-.996-.995.996a.75.75 0 01-1.061-1.06l.996-.996-.996-.996a.75.75 0 011.06-1.06l.996.995.996-.995a.75.75 0 011.06 0z"></path><path fill-rule="evenodd" d="M12 21a2.378 2.378 0 100-4.755A2.378 2.378 0 0012 21zm0-1.5a.878.878 0 100-1.756.878.878 0 000 1.756zM14.378 12a2.378 2.378 0 11-4.756 0 2.378 2.378 0 014.756 0zm-1.5 0a.878.878 0 11-1.756 0 .878.878 0 011.756 0z" clip-rule="evenodd"></path></svg>`,
  '7': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.933 3.6a.75.75 0 01.75-.75h5.281a.75.75 0 01.75.75v4.05h4.531a.75.75 0 01.75.75v12a.75.75 0 01-.75.75h-5.281a.75.75 0 01-.75-.75V9.15h-3.781v4.05a.75.75 0 01-.75.75H3.815a.75.75 0 01-.75-.75V8.4a.75.75 0 01.75-.75h5.118V3.6zm1.5 4.05h3.781v-3.3h-3.781v3.3zm-1.5 1.5H4.565v3.3h4.368v-3.3zm6.781 0v10.5h3.781V9.15h-3.781z" clip-rule="evenodd"></path></svg>`,
  '8': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M6.786 2.85a.75.75 0 01.75.75v1.65h1.25c.967 0 1.75.783 1.75 1.75v12.4a1.75 1.75 0 01-1.75 1.75h-4a1.75 1.75 0 01-1.75-1.75V7c0-.967.784-1.75 1.75-1.75h1.25V3.6a.75.75 0 01.75-.75zM4.536 7a.25.25 0 01.25-.25h4a.25.25 0 01.25.25v12.4a.25.25 0 01-.25.25h-4a.25.25 0 01-.25-.25V7zM15.286 5.25A1.75 1.75 0 0013.536 7v7.6c0 .966.784 1.75 1.75 1.75h4a1.75 1.75 0 001.75-1.75V7a1.75 1.75 0 00-1.75-1.75h-1.25V3.6a.75.75 0 00-1.5 0v1.65h-1.25zM15.036 7a.25.25 0 01.25-.25h4a.25.25 0 01.25.25v7.6a.25.25 0 01-.25.25h-4a.25.25 0 01-.25-.25V7z" clip-rule="evenodd"></path></svg>`,
  '9': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M7.75 9.73v1.5h-1.5v-1.5h1.5zM7.75 12.73h-1.5v1.5h1.5v-1.5zM7.75 15.73h-1.5v1.5h1.5v-1.5z"></path><path fill-rule="evenodd" d="M7 2.85a.75.75 0 01.75.75v1.65H9c.966 0 1.75.784 1.75 1.75v10A1.75 1.75 0 019 18.75H7.75v1.65a.75.75 0 01-1.5 0v-1.65H5A1.75 1.75 0 013.25 17V7c0-.966.784-1.75 1.75-1.75h1.25V3.6A.75.75 0 017 2.85zM4.75 7A.25.25 0 015 6.75h1.25v1.48h-1.5V7zm3 1.23h-1.5v1.5h-1.5v1.5h1.5v1.5h-1.5v1.5h1.5v1.5h-1.5V17c0 .138.112.25.25.25h4a.25.25 0 00.25-.25v-1.27h-1.5v-1.5h1.5v-1.5h-1.5v-1.5h1.5v-1.5h-1.5v-1.5zm0 0V6.75H9a.25.25 0 01.25.25v1.23h-1.5zM15 7.25A1.75 1.75 0 0013.25 9v6c0 .966.784 1.75 1.75 1.75h1.25V18a.75.75 0 001.5 0v-1.25H19A1.75 1.75 0 0020.75 15V9A1.75 1.75 0 0019 7.25h-1.25V6a.75.75 0 00-1.5 0v1.25H15zM14.75 9a.25.25 0 01.25-.25h4a.25.25 0 01.25.25v6a.25.25 0 01-.25.25h-4a.25.25 0 01-.25-.25V9z" clip-rule="evenodd"></path></svg>`,
  '10': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.35 2.85a.75.75 0 01.7.553l1.747 6.407h-1.555l-.998-3.661-1.257 3.658v.003H9.552L7.95 7.09l-.947 2.72H5.414l1.652-4.741a.75.75 0 011.354-.134l1.677 2.845 1.52-4.424a.75.75 0 01.734-.506zM16.841 17.308l-.953-3.498h-1.555l1.747 6.407a.75.75 0 001.441.02l1.948-6.427H17.9l-1.06 3.498zM5.61 13.81H4.02l-1.28 3.676a.75.75 0 001.416.493L5.61 13.81zM19.113 9.81h1.568l.33-1.091a.75.75 0 10-1.435-.435l-.463 1.526zM3.5 11a.5.5 0 00-.5.5v.5a.5.5 0 00.5.5H4a.5.5 0 00.5-.5v-.5A.5.5 0 004 11h-.5zM5.757 11.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.5a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5v-.5zM9.015 11a.5.5 0 00-.5.5v.5a.5.5 0 00.5.5h.5a.5.5 0 00.5-.5v-.5a.5.5 0 00-.5-.5h-.5zM11.272 11.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.5a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5v-.5zM14.53 11a.5.5 0 00-.5.5v.5a.5.5 0 00.5.5h.5a.5.5 0 00.5-.5v-.5a.5.5 0 00-.5-.5h-.5zM16.787 11.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.5a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5v-.5zM20.044 11a.5.5 0 00-.5.5v.5a.5.5 0 00.5.5h.5a.5.5 0 00.5-.5v-.5a.5.5 0 00-.5-.5h-.5z"></path></svg>`,
  '12': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.482 3.6a.75.75 0 10-1.5 0v1.65h-1.25A1.75 1.75 0 002.982 7v12.4c0 .966.784 1.75 1.75 1.75h4a1.75 1.75 0 001.75-1.75V7a1.75 1.75 0 00-1.75-1.75h-1.25V3.6zm-2.75 3.15a.25.25 0 00-.25.25v3.05h4.5V7a.25.25 0 00-.25-.25h-4zm-.25 12.65v-3.942h4.5V19.4a.25.25 0 01-.25.25h-4a.25.25 0 01-.25-.25zm4.5-7.85v2.408h-4.5V11.55h4.5zM13.508 7c0-.967.783-1.75 1.75-1.75h1.25V3.6a.75.75 0 011.5 0v1.65h1.25c.966 0 1.75.783 1.75 1.75v7.6a1.75 1.75 0 01-1.75 1.75h-4a1.75 1.75 0 01-1.75-1.75V7zm6 3.05V7a.25.25 0 00-.25-.25h-4a.25.25 0 00-.25.25v3.05h4.5zm-4.5 1.5h4.5v3.05a.25.25 0 01-.25.25h-4a.25.25 0 01-.25-.25v-3.05z" clip-rule="evenodd"></path></svg>`,
  '13': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" fill-rule="evenodd" d="M12 7v14h5V7h-5Zm4 1h-3v12h3V8ZM19 15v6h5v-6h-5Zm4 1h-3v4h3v-4ZM5 12h5v9H5v-9Zm1 1h3v7H6v-7Z"></path></svg>`,
  '14': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="m18.43 15.91 6.96-8.6-.78-.62-6.96 8.6a2.49 2.49 0 0 0-2.63.2l-2.21-2.02A2.5 2.5 0 0 0 10.5 10a2.5 2.5 0 1 0 1.73 4.3l2.12 1.92a2.5 2.5 0 1 0 4.08-.31ZM10.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path><path d="M8.37 13.8c.17.3.4.54.68.74l-5.67 6.78-.76-.64 5.75-6.88Z"></path></svg>`,
  '15': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 5h5v1h-4v13h-6v-7h-4v12H5v-1h4V11h6v7h4V5Z"></path></svg>`,
  '16': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="M22 3h1v1h-1V3Zm0 2V4h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1V9h-1V8h-1V7h-1V6h-1V5h-1v1H9v1H8v1H7v1H6v1H5v1H4v1h1v1H4v1h1v-1h1v-1h1v-1h1v-1h1V9h1V8h1v1h1v1h1v1h1v1h1v1h1v-1h1v-1h1v-1h1V9h1V8h1V7h1V6h1V5h-1Zm-1 1V5h1v1h-1Zm-1 1V6h1v1h-1Zm-1 1V7h1v1h-1Zm-1 1V8h1v1h-1Zm-1 1V9h1v1h-1Zm-1 1v-1h1v1h-1Zm-1 0v-1h-1V9h-1V8h-1V7h-1V6h-1v1H9v1H8v1H7v1H6v1H5v1h1v-1h1v-1h1V9h1V8h1V7h1v1h1v1h1v1h1v1h1Zm0 0h1v1h-1v-1Zm.84 6.37 7.5-7-.68-.74-7.15 6.67-4.66-4.65-.33-.34-.36.32-5.5 5 .68.74 5.14-4.68 4.67 4.66.34.35.35-.33ZM6 23H5v1h1v-1Zm0-1H5v-1h1v1Zm1 0v1H6v-1h1Zm0-1H6v-1h1v1Zm1 0v1H7v-1h1Zm0-1H7v-1h1v1Zm1 0v1H8v-1h1Zm0-1H8v-1h1v1Zm1 0v1H9v-1h1Zm0-1H9v-1h1v1Zm1 0h-1v1h1v1h1v1h1v1h1v1h1v1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h-1v-1h1v-1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1h1v1Zm0 0h1v1h-1v-1Zm2 2v1h1v1h1v1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1Zm0 0v-1h-1v1h1Z"></path></svg>`
};

interface IMenuItem {
  icon: string;
  key: string;
  name: string;
}

const active = ref<IMenuItem>();
const menus = ref<IMenuItem[]>();
const props = defineProps({
  lang: Object,
  tvWidget: Object,
  theme: String
});

const computedMenus = () => {
  let result: IMenuItem[] = [];
  let icon;

  // 按照TradingView官方顺序排序
  ['0', '1', '9', '13', '2', '14', '15', '3', '16', '10', '11', '12', '8', '4', '7', '5', '6'].forEach((item) => {
    icon = icons[item as keyof typeof icons];
    if (icon && props.lang) {
      result.push({
        icon,
        key: item,
        name: props.lang[item]
      });
    }
  });
  menus.value = result;
};

const clickHandle = (key: string) => {
  updateChartType(key);
  localStorage.setItem(SERIES_CACHE_KEY, key);
  hideAllPoppers();
};

// 更新UI和图表状态
const updateChartType = (key: string) => {
  active.value = menus.value?.filter((item) => item.key === key)[0];

  const type = parseInt(key);
  const activeChart = props.tvWidget && props.tvWidget.activeChart();

  if (!isNaN(type) && props.tvWidget && activeChart) activeChart.setChartType(type);
};

// 处理重新渲染和属性变更重置数据
const onChartReadyCallback = () => {
  props.tvWidget &&
    props.tvWidget.onChartReady(() => {
      computedMenus();

      const key = localStorage.getItem(SERIES_CACHE_KEY) || DEFAULT_SERIES;
      active.value = menus.value?.filter((item) => item.key === key)[0];
    });
};

// 恢复之前保存的图表状态
watch(
  () => props.tvWidget,
  () => {
    if (!props.tvWidget) return;
    onChartReadyCallback();
  }
);

onMounted(() => setTimeout(() => onChartReadyCallback(), 0));
</script>

<style lang="scss">
.widget-series-icon {
  & svg path {
    stroke: initial;
    fill: var(--color-text-2);
  }
}

.widget-series-menus {
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: var(--color-bg-2);

  > li {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover,
    &.active {
      background-color: var(--color-bg-4);

      & > span {
        color: var(--color-text-button);
      }
      & > span path {
        fill: var(--color-text-button);
      }
    }

    .series-menus-icon {
      margin-right: 5px;
    }
    .series-menus-name {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
