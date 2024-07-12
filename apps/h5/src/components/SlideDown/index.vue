<script lang="ts" setup name="slide-down">
  import { IconDown } from '@arco-design/web-vue/es/icon';
  const props = withDefaults(defineProps<{ align?: 'left' | 'right' | 'center'; showIcon: boolean }>(), {
    align: 'center',
    showIcon: false,
  });
  const wrapperPosition = computed(() => {
    const pos = {
      center: {
        left: '50%',
        transform: 'translate(-50%, 0)',
        animate: 'translate(-50%, 50%)',
      },
      left: {
        left: '0',
        transform: 'translate(0)',
        animate: 'translate(0, 50%)',
      },
      right: {
        right: '0',
        transform: 'translate(0)',
        animate: 'translate(0, 50%)',
      },
    };
    return pos[props.align];
  });
  const domRef = ref<HTMLElement | null>(null);
  const showRef = ref(false);
  const toggleAction = (v: boolean, e?: MouseEvent) => {
    if (v) {
      /* 判断是否是从下方进入 */
      const domRect = (domRef.value as HTMLElement).getBoundingClientRect();
      const eleDomLine = domRect.top + domRect.height + 5;
      if ((e as MouseEvent).clientY < eleDomLine) {
        showRef.value = v;
      }
    } else {
      showRef.value = v;
    }
  };
</script>
<template>
  <div class="wrapper" ref="domRef" @mouseenter="(e) => toggleAction(true, e)" @mouseleave="toggleAction(false)">
    <div :class="['title-slot-wrapper', { hover: showRef }]">
      <slot name="icon" :showRef="showRef"></slot>
    </div>
    <icon-down class="inner-icon" v-if="props.showIcon" />
    <div class="bridge" v-show="showRef"></div>
    <Transition name="fade">
      <div class="down-wrapper" :style="wrapperPosition" v-show="showRef">
        <slot name="content"></slot>
      </div>
    </Transition>
  </div>
</template>
<style lang="less" scoped>
  .wrapper {
    position: relative;
    cursor: pointer;
    .title-slot-wrapper {
      display: inline-block;
      &.hover {
        :deep(svg) {
          color: var(--color-fill-maindark) !important;
        }
        :deep(span) {
          color: var(--color-fill-maindark) !important;
        }
      }
    }
    .inner-icon {
      margin-left: 12px;
      transition: transform 0.3s;
    }
    &:hover .inner-icon {
      transform: rotate(180deg);
    }
    .bridge {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      height: 30px;
      width: 80px;
      z-index: 2023;
    }
    .down-wrapper {
      position: absolute;
      top: 200%;
      z-index: 2023;
      border-radius: 8px;
      transition: all 0.3s;
      transform: translate(0);
    }
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: v-bind('wrapperPosition.animate') !important;
  }
</style>
