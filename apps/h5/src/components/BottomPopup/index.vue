<script lang="ts" setup name="bottom-popup">
  import { px2rem } from '@bitunix/shared/utils/methods';
  interface IProps {
    show: boolean;
    title: string;
    isTop?: boolean;
  }
  const props = defineProps<IProps>();
  const emits = defineEmits(['update:show', 'closeModal']);
  // const focus = ref(false);
  const handleClose = () => {
    emits('update:show', false);
    emits('closeModal');
  };
</script>
<template>
  <div class="mask" @click="handleClose" v-show="props.show"></div>
  <Transition name="bottom-fade">
    <section class="wrapper" v-if="props.show" :style="{ top: isTop ? '0' : px2rem('128'), zIndex: isTop ? '101' : '20' }">
      <header class="header">
        <div class="title">{{ props.title }}</div>
        <IconFont class="fs-32 color-text-1" name="close2" @click="handleClose" />
      </header>
      <div class="content">
        <slot></slot>
      </div>
    </section>
  </Transition>
</template>
<style lang="less" scoped>
  .wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 128px;
    background: var(--bx-bg);
    box-sizing: border-box;
    z-index: 20;
    display: flex;
    flex-direction: column;
    padding: 30px;
    .header {
      padding: 30px 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 36px;
        color: var(--color-text-1);
      }
      .close-btn {
        font-size: 26px;
        color: var(--color-text-2);
      }
    }
    .content {
      flex: 1;
      box-sizing: border-box;
      overscroll-behavior: contain;
      overflow: auto;
    }
    .content::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
    }
    .content::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .bottom-fade-enter-active,
  .bottom-fade-leave-active {
    transition: all 0.3s;
  }
  .bottom-fade-enter-from,
  .bottom-fade-leave-to {
    transform: translateY(100%) !important;
  }
</style>
