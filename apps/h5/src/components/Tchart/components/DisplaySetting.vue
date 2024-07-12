<template>
  <VMenu placement="bottom-start" :distance="6" :showTriggers="['click']" :hideTriggers="['click']" :popperClass="getThemeClassName(props.theme)">
    <Icons type="display" v-if="!mobile" v-tooltip="props.lang ? props.lang.display : null" />
    <template #popper>
      <VMenu v-for="(item, index) in (menus as any)" :key="index" placement="right-start" :popperClass="getThemeClassName(props.theme)" instant-move>
        <DisplayMenuItem :item="item" :config="props.config" :handle="updateChecked" />
        <template #popper>
          <VMenu v-for="(subItem, key) in item.subMenu" :key="key" placement="right-start" instant-move>
            <DisplayMenuItem :item="subItem" :config="props.config" :handle="updateChecked" />
          </VMenu>
        </template>
      </VMenu>
    </template>
  </VMenu>
</template>

<script lang="ts">
import { VTooltip } from 'floating-vue';
export default {
  directives: {
    tooltip: VTooltip
  }
};
</script>

<script lang="ts" name="DisplaySetting" setup>
import Icons from './Icons.vue';
import DisplayMenuItem from './DisplayMenuItem.vue';
import { Menu as VMenu } from 'floating-vue';
import { onMounted, ref } from 'vue';
import { getThemeClassName, isMobile } from '../utils/index';
import { DISPLAY_MENUS, EVENTS, EX_TYPE_KEY } from '../constants';

const props = defineProps({
  lang: Object,
  tvWidget: Object,
  config: Object,
  render: Function,
  emit: Function,
  theme: String
});

const menus = ref<object[]>();
const mobile = ref(false);

const computedMenus = () => {
  const displayMenus = props.lang?.displayMenus;
  if (!displayMenus) return;

  menus.value = Object.keys(displayMenus)
    .filter((item) => item !== 'children')
    // 暂时先不显示不支持的功能
    .filter((item) => !['takeProfitStopLossOrders', 'positionCost', 'transactionRecords', 'children'].includes(item))
    .map((item) => {
      const name = displayMenus[item];
      const children = displayMenus?.children;

      if (children && children[item]) {
        // 现货没有限价委托快捷改价功能
        const exType = sessionStorage.getItem(EX_TYPE_KEY);
        const spotMenu = Object.keys(children[item]).filter((key: string) => key !== 'quickPriceAdjustmentLimit');
        const contractMenu = Object.keys(children[item]);
        const subMenu = (exType === 'spot' ? spotMenu : contractMenu).map((subItem: string) => ({
          key: subItem,
          name: children[item][subItem]
        }));

        return {
          name,
          subMenu
        };
      } else {
        return {
          key: item,
          name
        };
      }
    });
};

const updateChecked = (key: keyof typeof DISPLAY_MENUS, state: boolean) => {
  if (!props.config) return;

  props.config[key] = state;
  props.render && props.render(false);
  // 配置更改重新渲染
  props.emit && props.emit(EVENTS.RE_RENDER, null);
};

onMounted(() => {
  computedMenus();

  mobile.value = isMobile();
});
</script>
