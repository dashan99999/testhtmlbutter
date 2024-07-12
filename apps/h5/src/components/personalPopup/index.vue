<!--个人资产左侧列表弹窗-->
<template>
  <teleport to="body">
    <Transition name="slide-left">
      <div class="popContent" v-show="props.show" @click="() => closePop()">
        <div class="content" @click.stop>
          <div
            class="fs-32 p-t40 p-b40 items-center p-r30"
            v-for="(item, index) in addressList"
            :key="index"
            @click="() => goToPage(item, false)"
          >
            <div>
              <SvgIcon :name="isSelect(item) ? item.iconNameSelect : item.iconName" w="40" h="40" />
              <span class="m-l20" :class="getFontColor(item)">{{ item.label }}</span>
              <div style="display: inline-block; float: right">
                <SvgIcon v-show="item.children && item.slideUp" name="bx-icon:array_up" w="24" h="24" />
                <SvgIcon v-show="item.children && !item.slideUp" name="bx-icon:array_down" w="24" h="24" />
              </div>
            </div>
            <div class="flex flex-col m-t40" v-show="item.children && item.slideUp">
              <span
                @click.stop="(e) => goToPage(items as DateType, true)"
                :class="getFontColor(items as DateType)"
                class="p-l50 p-t40 p-b40"
                v-for="(items, key) in item?.children"
                :key="key"
                >{{ items.label }}</span
              >
            </div>
          </div>
        </div>
        <van-dialog :close-on-click-overlay="true" v-model:show="showDialog" title=" " @click.stop>
          <div class="dialog_body">
            <img class="dialog_icon" src="@/assets/images/fail.png" />
            <img class="dialog_close" src="@/assets/images/close_log.png" @click="showDialog = false" />
            <p class="dialog_text">{{ $t('home.download5') }}</p>
          </div>
          <template #footer>
            <van-button class="dialog_btn" type="primary" @click="() => navigateToLocale('/homedownload')">{{
              $t('home.download4')
            }}</van-button>
          </template>
        </van-dialog>
      </div>
    </Transition>
  </teleport>
</template>
<script setup lang="ts">
  interface Props {
    show: boolean;
    close: (e: boolean) => void;
  }
  interface DateType {
    label: string;
    isDevelop: boolean;
    iconName: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
    slideUp?: boolean;
    iconNameSelect: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    show: false,
  });

  const route = useRoute();

  const showDialog = ref<boolean>(false);

  const { t } = useI18n();

  let addressList = ref<Array<DateType>>([
    {
      label: t('assets.spotAccount'),
      isDevelop: true,
      iconName: 'bx-icon:account',
      href: '/assets/spotAccount',
      iconNameSelect: 'bx-icon:account_select',
    },
    {
      label: t('assets.contract'),
      isDevelop: true,
      iconName: 'bx-icon:futures',
      href: '/assets/contract',
      iconNameSelect: 'bx-icon:futures_select',
    },
    {
      label: t('assets.capitalFlow'),
      isDevelop: true,
      iconName: 'bx-icon:history1',
      href: '/',
      iconNameSelect: 'bx-icon:history1_select',
      slideUp: true,
      children: [
        {
          label: t('assets.spot.record'),
          href: '/assets/capitalFlow/spotTrade',
        },
        {
          label: t('assets.contract.record'),
          href: '/assets/capitalFlow/contractTrade',
        },
      ],
    },
  ]);

  // 是否是当前页面
  const isSelect = (i: DateType) => {
    if (i.children) {
      return i.children.some((item: Record<string, string>) => {
        return route.path.includes(item.href);
      });
    } else {
      return route.path.includes(i.href);
    }
  };

  const goToPage = (i: DateType, isChild: boolean) => {
    if (route.path.includes(i.href) && isChild) {
      return;
    }
    if (isChild) {
      navigateToLocale(i.href);
    } else {
      if (!i.isDevelop) {
        showDialog.value = true;
      } else if (i.children) {
        addressList.value = addressList.value.map((items) => {
          return items.children
            ? { ...items, slideUp: !items.slideUp }
            : {
                ...items,
              };
        }) as Array<DateType>;
        return;
      } else {
        navigateToLocale(i.href);
      }
    }
  };

  // 设置字体颜色
  const getFontColor = (i: DateType) => {
    if (i.children) {
      // 如果是资金流水
      return i.children.some((item: Record<string, string>) => {
        return route.path.includes(item.href);
      })
        ? 'color-text-1'
        : 'color-text-2';
    } else {
      return route.path.includes(i.href) ? 'color-text-brand-base' : 'color-text-2';
    }
  };

  const closePop = () => {
    props.close(false);
    // document.body.style.overflow = 'auto';
  };

  onMounted(() => {
    // document.body.style.overflow = 'hidden';
  });
  // onUnmounted(() => {
  //   document.body.style.overflow = 'auto';
  // });
</script>

<style scoped lang="less">
  .slide-left-enter,
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.3s;
  }
  .popContent {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.55);
    z-index: 3000;
    overflow-y: hidden;

    .content {
      background: var(--bx-bg-fg);
      width: 575px;
      height: 100vh;
      padding: 30px 0 0 30px;
    }
  }

  .dialog_body {
    position: relative;
  }
  .dialog_text {
    margin: 40px 0;
    text-align: center;
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    color: var(--color-text-1);
  }
  .dialog_btn {
    width: calc(100% - 80px);
    margin: 0 auto 60px;
    background: #ea4b64;
    display: block;
    color: var(--color-text-on-btn-brand-base);
  }
  .dialog_close {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 30px;
    top: -30px;
  }
  .dialog_icon {
    width: 160px;
    height: 160px;
    display: block;
    margin: 0 auto;
  }
</style>
