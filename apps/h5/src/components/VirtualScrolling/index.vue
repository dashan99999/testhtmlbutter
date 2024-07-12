<!-- 虚拟滚动 -->
<template>
  <div class="virtual-scrolling">
    <div class="list bg-transparent" ref="listRef" @scroll.passive="getScroll($event)">
      <div v-if="options.length" :style="{ height: rowHeight * options.length + 'px', width: '100%' }">
        <div
          class="item"
          v-for="(item, index) in options.slice(min - 2, min + 10)"
          :key="index"
          :style="{ top: `${rowHeight * Number(item.index)}px`, height: `${rowHeight}px`, lineHeight: `${rowHeight}px` }"
        >
          <slot name="list-row" :record="item"></slot>
        </div>
      </div>
      <bx-empty class="mt-200" v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
  import bxEmpty from '@/components/bxEmpty/index.vue';

  interface Props {
    rowHeight: number;
    data: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    rowHeight: 40,
    data: [],
  });
  const rowHeight = computed(() => {
    return props.rowHeight;
  });
  const listH = rowHeight.value * 2 + 'px';
  let min = ref(2);
  const getScroll = (event: any) => {
    let scrollTop = event.target.scrollTop;
    // 当滚动距离大于2条数据的高度时开始动态计算
    if (scrollTop > 2 * rowHeight.value) {
      min.value = Math.ceil(scrollTop / rowHeight.value);
    } else {
      min.value = 2;
    }
  };
  const options = computed(() => {
    props.data.map((item: any, index: number) => (item.index = index));
    return props.data;
  });
  // setInterval(() => {
  // console.log(options.value);
  // }, 1000);
</script>

<style lang="less" scoped>
  @height: v-bind(listH);
  .virtual-scrolling {
    .list {
      margin: 0 auto;
      width: 100%;
      // height: calc(100% - @height);
      height: 100%;
      overflow: auto;
      position: relative;
      .item {
        position: absolute;
        width: 100%;
      }
    }
  }
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: var(--bx-radius-normal);
    box-shadow: inset 0 0 5px transparent;
    background: transparent;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px transparent;
    border-radius: var(--bx-radius-normal);
    background: transparent;
  }
</style>
