<script setup lang="ts">
  /**
   * bitunix tab切换组件
   * @description 适用于本系统 一般用于切换手机或者邮箱.
   * @property {Array} list 需要切换的数据  示例：['手机','邮箱'] 格式
   * @property {Number} index 选中第几个
   * @event {Function} change 选中值发生变化回调
   * @example <PannalTab :list="options" @change="change" />
   */

  interface Props {
    list: string[];
    index?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    list: () => [],
    index: 0,
  });

  const emit = defineEmits(['change']);
  const selectIndex = ref(props.index);

  watch(
    () => props.index,
    () => {
      selectIndex.value = props.index;
    },
  );

  const check = (index: number) => {
    selectIndex.value = index;
    emit('change', index);
  };
</script>

<template>
  <div class="pannal-tab-wrapper flex">
    <div
      class="pannal-tab-item"
      v-for="(item, tIndex) in props.list"
      :key="tIndex"
      :class="{ current: tIndex === selectIndex }"
      @click="check(tIndex)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang="less">
  .pannal-tab {
    &-item {
      padding: 9px 16px;
      line-height: 22px;
      border-radius: var(--border-radius-medium);
      font-size: 16px;
      cursor: pointer;
      margin-right: 20px;
      color: var(--color-text-2);
      &.current {
        background-color: var(--color-bg-6);
        color: var(--color-text-1);
      }
    }
  }
</style>
