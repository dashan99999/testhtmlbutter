<template>
  <VDropdown :distance="6" :showTriggers="['click']" :hideTriggers="['click']" :popperClass="getThemeClassName(props.theme)">
    <span class="bitunix-tv-icons widget-screenshot-icon" v-tooltip="props.lang ? props.lang.screenshot : null">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.898 5.87758C14.898 5.59613 14.7861 5.3262 14.5871 5.12718C14.3881 4.92816 14.1182 4.81636 13.8367 4.81636H11.7143L10.1224 2.69391H5.87755L4.28571 4.81636H2.16326C1.88181 4.81636 1.61188 4.92816 1.41286 5.12718C1.21384 5.3262 1.10204 5.59613 1.10204 5.87758V12.2449C1.10204 12.5264 1.21384 12.7963 1.41286 12.9953C1.61188 13.1943 1.88181 13.3062 2.16326 13.3062H13.8367C14.1182 13.3062 14.3881 13.1943 14.5871 12.9953C14.7861 12.7963 14.898 12.5264 14.898 12.2449V5.87758Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.99999 10.9184C8.63326 10.9184 9.2406 10.6668 9.68839 10.219C10.1362 9.77125 10.3877 9.16391 10.3877 8.53064C10.3877 7.89737 10.1362 7.29003 9.68839 6.84224C9.2406 6.39445 8.63326 6.14288 7.99999 6.14288C7.36672 6.14288 6.75938 6.39445 6.31159 6.84224C5.8638 7.29003 5.61224 7.89737 5.61224 8.53064C5.61224 9.16391 5.8638 9.77125 6.31159 10.219C6.75938 10.6668 7.36672 10.9184 7.99999 10.9184Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <template #popper>
      <ul class="widget-screenshot-menus">
        <li v-for="item in menus" :key="item.key" @click="() => clickHandle(item.key)">
          <span class="screenshot-menus-icon" v-html="item.icon"></span>
          <span class="screenshot-menus-name">{{ item.name }}</span>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>

<script lang="ts">
  import { VTooltip } from 'floating-vue';
  export default {
    directives: {
      tooltip: VTooltip,
    },
  };
</script>

<script lang="ts" name="ScreenshotMenus" setup>
  import { Dropdown as VDropdown } from 'floating-vue';
  import { hideAllPoppers } from 'floating-vue';
  import { onMounted, ref } from 'vue';
  import { getThemeClassName, saveDataURLToFile } from '../utils/index';

  const icons = {
    download: `<svg xmlns="http://www.w3.org/2000/svg" id="ic-download" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 7.5L8 11L12 7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M15 14H1" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M8 2V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" id="ic-copy" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2.5" y="5" width="8.5" height="8.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M5.5 3.59375V2H14V10.5H12.4062" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
    </svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" id="ic-link" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_956_4579)">
        <path d="M12.4078 6.98656L11.9835 7.41082L12.832 8.25935L13.2563 7.83508L12.4078 6.98656ZM7.01018 5.59591L9.83861 2.76749L8.99008 1.91896L6.16166 4.74738L7.01018 5.59591ZM13.2327 6.1616L12.4078 6.98656L13.2563 7.83508L14.0813 7.01013L13.2327 6.1616ZM13.2327 2.76749C14.17 3.70474 14.17 5.22434 13.2327 6.1616L14.0813 7.01013C15.4871 5.60424 15.4871 3.32484 14.0813 1.91896L13.2327 2.76749ZM9.83861 2.76749C10.7759 1.83023 12.2955 1.83023 13.2327 2.76749L14.0813 1.91896C12.6754 0.51307 10.396 0.51307 8.99008 1.91896L9.83861 2.76749ZM6.16166 4.74738C4.75577 6.15327 4.75577 8.43267 6.16166 9.83855L7.01018 8.99003C6.07293 8.05277 6.07293 6.53317 7.01018 5.59591L6.16166 4.74738Z" fill="currentColor"/>
        <path d="M3.59248 9.01369L4.01674 8.58942L3.16821 7.7409L2.74395 8.16516L3.59248 9.01369ZM8.99006 10.4043L6.16163 13.2328L7.01016 14.0813L9.83859 11.2529L8.99006 10.4043ZM2.76752 9.83865L3.59248 9.01369L2.74395 8.16516L1.91899 8.99012L2.76752 9.83865ZM2.76752 13.2328C1.83026 12.2955 1.83026 10.7759 2.76752 9.83865L1.91899 8.99012C0.513105 10.396 0.513105 12.6754 1.91899 14.0813L2.76752 13.2328ZM6.16163 13.2328C5.22437 14.17 3.70478 14.17 2.76752 13.2328L1.91899 14.0813C3.32488 15.4872 5.60427 15.4872 7.01016 14.0813L6.16163 13.2328ZM9.83859 11.2529C11.2445 9.84697 11.2445 7.56758 9.83859 6.16169L8.99006 7.01022C9.92732 7.94748 9.92732 9.46707 8.99006 10.4043L9.83859 11.2529Z" fill="currentColor"/>
      </g>
    </svg>`,
    openTab: `<svg xmlns="http://www.w3.org/2000/svg" id="ic-open-tab" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.71704 3.34448L8.06155 0.999974L10.4061 3.34448" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M11.75 6H14V15H2V6H4.25" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M8 2V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>`,
  };

  interface IMenuItem {
    icon: string;
    key: string;
    name: string;
  }

  const props = defineProps({
    lang: Object,
    tvWidget: Object,
    theme: String,
  });

  const menus = ref<IMenuItem[]>();

  const clickHandle = (key: string) => {
    hideAllPoppers();
    if (!props.tvWidget) return;

    // 下载图片
    if (key === 'download') {
      props.tvWidget.takeClientScreenshot().then((result: any) => {
        saveDataURLToFile(result.toDataURL('image/png'));
      });
    }

    // 复制图片
    if (key === 'copy') {
      navigator.clipboard.write
        ? (navigator.vendor.includes('Apple')
            ? navigator.clipboard.write([
                new ClipboardItem({
                  'image/png': props.tvWidget.takeClientScreenshot().then(
                    (result: any) =>
                      new Promise((resolve) => {
                        result.toBlob(resolve);
                      }),
                  ),
                }),
              ])
            : props.tvWidget.takeClientScreenshot().then(
                (result: any) =>
                  new Promise((resolve, reject) => {
                    result.toBlob((blob: Blob) => {
                      blob
                        ? navigator.clipboard
                            .write([
                              new ClipboardItem({
                                'image/png': blob,
                              }),
                            ])
                            .then(resolve)
                            .catch(reject)
                        : reject();
                    });
                  }),
              )
          )
            .then(() => {
              // Ve.success(this.t("chartCopy"))
            })
            .catch(() => {
              // o && Ve.error(o.toString())
            })
        : props.tvWidget.takeClientScreenshot().then((result: any) => {
            result.toBlob((blob: Blob) => {
              window.open(URL.createObjectURL(blob), '_blank');
            });
          });
    }

    // 复制图片地址
    if (key === 'link') {
      if (navigator.vendor.includes('Apple')) {
        navigator.clipboard
          .write([
            new ClipboardItem({
              'text/plain': new Promise((resolve) => {
                const callback = (url: string) => {
                  props.tvWidget?.unsubscribe('onScreenshotReady', callback);
                  resolve(
                    new Blob([`https://www.tradingview.com/x/${url}`], {
                      type: 'text/plain',
                    }),
                  );
                };
                props.tvWidget?.subscribe('onScreenshotReady', callback);
              }),
            }),
          ])
          .then(() => {
            // Ve.success(this.t("chartLinkCopy"))
          })
          .catch((n) => {
            // n && Ve.error(n.toString())
          });
      } else {
        const callback = (url: string) => {
          props.tvWidget?.unsubscribe('onScreenshotReady', callback);
          navigator.clipboard
            .writeText(`https://www.tradingview.com/x/${url}`)
            .then(() => {
              // Ve.success(this.t("chartLinkCopy"))
            })
            .catch((s) => {
              // s && Ve.error(s.toString())
            });
        };
        props.tvWidget?.subscribe('onScreenshotReady', callback);
      }
      props.tvWidget?.takeScreenshot();
    }

    // 新标签打开图片
    if (key === 'openTab') {
      const callback = (id: string) => {
        props.tvWidget?.unsubscribe('onScreenshotReady', callback);
        window.open(`https://www.tradingview.com/x/${id}`, '_blank');
      };

      props.tvWidget.subscribe('onScreenshotReady', callback);
      props.tvWidget.takeScreenshot();
    }
  };

  onMounted(() => {
    menus.value = [
      {
        icon: icons.download,
        key: 'download',
        name: props.lang?.saveImage,
      },
      {
        icon: icons.copy,
        key: 'copy',
        name: props.lang?.copyImage,
      },
      {
        icon: icons.link,
        key: 'link',
        name: props.lang?.copyImageAddress,
      },
      {
        icon: icons.openTab,
        key: 'openTab',
        name: props.lang?.openImageNewTab,
      },
    ];
  });
</script>

<style lang="scss">
  .widget-screenshot-icon {
    & svg path {
      stroke: var(--color-text-2);
      fill: inherit;
    }
  }

  .widget-screenshot-menus {
    padding: 0;
    margin: 0;
    list-style: none;
    background-color: var(--color-bg-2);

    > li {
      padding: 8px 10px;
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
          stroke: var(--color-text-button);
        }
      }

      .screenshot-menus-icon {
        margin-right: 5px;
        vertical-align: middle;
        line-height: 0;
      }
      .screenshot-menus-name {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
</style>
