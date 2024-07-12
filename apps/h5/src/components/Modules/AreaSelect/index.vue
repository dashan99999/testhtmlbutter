<template>
  <div
    class="flex justify-between items-center h-100 p-l-30 select"
    :class="[{ 'bx-bg-bg-interactive': !props.noBg, 'w-full': props.fullWidth }, props.class]"
    @click="show = !show"
  >
    <slot :data="currentSelected" :show="show">
      <div class="fs-28 color-text-1"> {{ selectedText }} </div>
      <!--      <icon-caret-down v-if="props.noBg" class="icon caret" />-->
      <IconFont name="slidedown" :class="{ show }" class="icon fs-32 m-l16" />
    </slot>
    <van-popup class="AreaSelectPopup" teleport="body" @close="clearText()" position="bottom" round v-model:show="show" :closeable="false">
      <div class="wrap">
        <div class="head">
          <div class="p30 flex justify-between items-center p-b-24 h-100 head-title">
            <span class="color-text-1 fs-32">{{ popupTitle }}</span>
            <span class="color-text-2 fs-26" @click.stop="show = false">{{ $t('common.popup.close') }}</span>
          </div>
          <div class="p-l-30 p-r-30 flex justify-center items-center w-full seacrh">
            <van-search
              class="search"
              :placeholder="searchPlaceholder"
              @input="clear"
              @update:model-value="query"
              @clear="clearText"
              clearable
              shape="round"
              style="width: 100%"
            >
              <template #left-icon>
                <SvgIcon name="bx-icon:search" class="lefticon" />
              </template>
            </van-search>
          </div>
        </div>
        <section class="content p-l-30 p-r-30 p-b-30">
          <div v-if="loading" class="no-data flex justify-center">
            <icon-loading class="icon" size="20" />
            <span>{{ t('register.form.country.loading') }}</span>
          </div>
          <div id="content" class="list-wrapper" ref="listRef" v-scroll="onScroll">
            <div
              class="flex items-center justify-between p-t-40"
              :class="{ current: item.code === code || item.nick === code }"
              v-for="(item, index) in queryList"
              :key="index"
              @click.stop="selectValue(item)"
            >
              <div class="flex items-center">
                <van-image class="country-icon" :src="item.avatar" alt="" lazy-load width="8vw" height="8vw" />
                <div class="color-text-1 fs-26 p-l-24"> {{ item.nick }} </div>
              </div>
              <div class="color-text-2 fs-26"> {{ item.code }} </div>
            </div>
          </div>

          <van-empty v-if="!list.length && !loading" />
        </section>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts" name="area-select">
  /**
   * bitunix 手机区号选择控件 createBy yangshuai 2023-01-29
   * @description 适用于本系统 用于选择手机区号.
   * @property {Boolean} region 用于选择地区
   * @property {Boolean} noBg 无背景
   * @property {Boolean} disabled 禁用
   * @event {Function} onChange 选中值的回调
   * @example <AreaSelect v-model:value="value" @onChange="callback" />
   */

  import { useAppStore } from '@bitunix/shared/store/modules/app';
  import useLoading from '@bitunix/shared/hooks/loading';
  import { UseScrollReturn } from '@vueuse/core';
  import { vScroll } from '@vueuse/components';
  import { AreaCode, AreaCodeByIp } from './types';
  import { useFormItem } from '@arco-design/web-vue';
  import { useCustomFieldValue } from '@vant/use';
  import { IconLoading } from '@arco-design/web-vue/es/icon';
  const { locale } = useI18n();
  const show = ref<boolean>(false);
  const { eventHandlers } = useFormItem();
  const { t } = useI18n();
  const userStore = useAppStore();
  const { loading, setLoading } = useLoading();
  const currentSelected = ref<AreaCodeByIp>();

  interface Props {
    region?: boolean;
    noBg?: boolean;
    disabled?: boolean;
    popupTitle?: string;
    searchPlaceholder?: string;
    value?: string;
    fullWidth?: boolean;
    class?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    region: false,
    noBg: false,
    disabled: false,
  });

  type IAreaCodeArray = AreaCode[];

  // 注册emit事件
  const emit = defineEmits(['onChange', 'update:value']);
  // 选中区号code
  const code = useControlableValue(props, emit, {
    valueKey: 'value',
    extractVoidValue: true,
    default: props.region ? 'CA' : '+1',
    immediate: true,
  });
  // 根据ip获取当前区号数据
  let areaCurrent: AreaCodeByIp = reactive({});
  // 区号所有数据列表
  let areaList: IAreaCodeArray = userStore.areaList;
  // 筛选之后的下拉数据列表
  let queryList: IAreaCodeArray = userStore.areaList;
  // 渲染下拉列表数据
  let list = ref<IAreaCodeArray>([]);

  // 页码
  const page = ref(0);
  // 搜索
  const query = (text: string): void => {
    page.value = 0;
    if (text) {
      queryList = areaList.filter((item) => {
        return (item.nick?.toLowerCase() || '').indexOf(text.toLowerCase()) > -1 || (item.code || '').indexOf(text) > -1;
      });
      setListData(queryList);
    }
  };

  // 清空触发方法,query不会触发
  const clear = (e: InputEvent): void => {
    if (!e.data) {
      clearText();
    }
    scrollToTop();
  };

  //清空搜索
  const clearText = () => {
    queryList = userStore.areaList || [];
    setListData(areaList);
    // 回滚到顶部
    if (document.getElementById('content')) {
      const sectionElements = document.querySelectorAll('.content') as NodeListOf<HTMLElement>;
      sectionElements.forEach((element: HTMLElement) => {
        element.scrollTop = 0;
      });
    }
    scrollToTop();
  };

  // 分页渲染
  const setListData = (data: IAreaCodeArray) => {
    if (page.value === 0) {
      list.value = data.slice(page.value * 20, (page.value + 1) * 20);
    } else {
      list.value = list.value.concat(data.slice(page.value * 20, (page.value + 1) * 20));
    }
  };
  // 监听滚动 进行分页
  const onScroll = (state: UseScrollReturn) => {
    if (state.arrivedState.bottom && page.value < Math.ceil(queryList.length / 20)) {
      page.value++;
      setListData(queryList);
    }
  };

  // 初始化获取数据
  onMounted(async () => {
    init();
  });
  watch(locale, () => {
    init();
  });
  const init = async () => {
    setLoading(true);
    // if (!userStore.areaList || !userStore.areaList.length) {
    areaList = await userStore.getAreaCode();
    queryList = Object.assign([], areaList);
    // }
    if (!userStore.areaCodeByIp) {
      const result = await userStore.getAreaCodeByIp();
      areaCurrent = areaList.find((item) => item.code === result.code) || {};
    } else {
      areaCurrent = areaList.find((item) => item.code === userStore.areaCodeByIp?.code) || {};
    }
    if (props.value && !Object.keys(areaCurrent).length) {
      areaCurrent = areaList.find((item) => item.code === props.value || item.countryCode === props.value) || {};
    }
    setLoading(false);
    setListData(areaList);
    onEmit(areaCurrent);
  };
  const listRef = ref<HTMLElement | null>(null);
  const scrollToTop = () => {
    listRef.value?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  //选中区号
  const selectValue = (item: AreaCodeByIp) => {
    onEmit(item);
    show.value = false;
  };
  const selectedText = computed(() => {
    return props.region ? currentSelected.value?.nick ?? t('common.region.default') : code.value;
  });
  const onEmit = (item: AreaCodeByIp) => {
    if (props.region) {
      code.value = item.countryCode || '';
    } else {
      code.value = item.code || item.area || '';
    }
    emit('onChange', item);
    eventHandlers.value?.onChange?.();
    currentSelected.value = item;
  };
  const popupTitle = computed(() => props.popupTitle ?? t('common.region.popup.title'));
  const searchPlaceholder = computed(() => props.searchPlaceholder ?? t('common.settings.search'));
  useCustomFieldValue(() => {
    if (props.region) {
      return currentSelected.value?.countryCode;
    } else {
      return currentSelected.value?.code || currentSelected.value?.area || '';
    }
  });
</script>

<style lang="less" scoped>
  .seacrh {
    margin-top: 32px;
    margin-bottom: 40px;
  }
  .list-wrapper {
    div:first-child {
      padding-top: 0;
    }
  }
  .select {
    border-top-left-radius: var(--bx-radius-normal);
    border-bottom-left-radius: var(--bx-radius-normal);
    //width: 100%;
    .arco-icon {
      color: var(--color-text-1);
    }
  }
  .icon:before {
    vertical-align: middle;
  }
  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(100%) !important;
  }
  .search {
    padding: 0;
    border-radius: 50px;
    .lefticon {
      width: 32px;
    }
    :deep(.van-field__label--top) {
      width: 50px;
      margin-bottom: 0;
      margin-right: 0;
    }
  }
  .head {
    position: absolute;
    height: 200px;
    width: 100%;
    box-sizing: border-box;
    left: 0;
    top: 0;
  }
  .head-title {
    border-bottom: 1px solid var(--color-border-input);
  }
  .wrap {
    position: relative;
    padding-top: 240px;
    height: 100%;
    box-sizing: border-box;
  }
  .content {
    height: 100%;
    overflow-y: auto;
  }
  .show {
    transform: rotate(180deg);
  }
</style>
<style>
  .AreaSelectPopup {
    height: 1164px;
  }
</style>
