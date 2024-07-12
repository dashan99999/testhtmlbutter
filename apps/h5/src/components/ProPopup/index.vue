<template>
  <div>
    <div class="w-full" @click="showPopup = !showPopup" v-if="showSlot">
      <slot name="default">
        <div class="flex items-center">
          <div
            :class="{ 'h-100': largeSize, 'h-80': !largeSize, 'bd-border-color': props.border }"
            class="b-r10 flex-1 flex items-center justify-between p-l32 p-r32 box-border"
          >
            <label v-if="!!text" class="color-text-1" :class="textClass">{{ text }}</label>
            <label v-else class="color-text-2" :class="textClass">{{ placeholder }}</label>
            <IconFont name="arrow_updown" class="color-text-2 fs-24" :class="{ toggle: true, show: showPopup, textClass }" />
          </div>
        </div>
      </slot>
    </div>
    <van-popup
      safe-area-inset-top
      safe-area-inset-bottom
      :overlay="true"
      :style="{ height }"
      v-model:show="showPopup"
      :title="title"
      position="bottom"
      teleport="body"
    >
      <div class="flex items-center justify-between p-[40,30]" :class="{ border: props.borderBottom, 'm-b40': props.marginBottom }">
        <div class="fs-36 color-text-1">{{ title }}</div>
        <div class="fs-36 color-text-1">
          <slot name="extra"></slot>
          <slot name="close">
            <IconFont v-show="props.showClose" name="close2" class="color-text-1 fs-32" @click="showPopup = false" />
          </slot>
        </div>
      </div>
      <slot name="popup"></slot>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    title?: string | false;
    placeholder?: string;
    showSlot?: boolean;
    showClose?: boolean;
    show?: boolean;
    height?: number | string;
    text?: string;
    size?: 'normal' | 'small';
    largeSize?: boolean;
    borderBottom?: boolean;
    marginBottom?: boolean;
    border?: boolean;
  };
  const { t } = useI18n();
  const props = withDefaults(defineProps<Props>(), {
    showSlot: true,
    show: false,
    showClose: true,
    height: '100vh',
    size: 'normal',
    largeSize: false,
    borderBottom: false,
    marginBottom: false,
    border: true,
  });
  const { title, showSlot, height, text } = toRefs(props);
  const emits = defineEmits(['update:show']);
  const showPopup = useControlableValue(props, emits, { valueKey: 'show', default: false });
  const placeholder = computed(() => props.placeholder || t('assets.table.all'));
  const textClass = computed(() => (props.size === 'normal' ? 'fs-28' : 'fs-24'));
</script>

<style scoped lang="less">
  .border {
    border-bottom: 1px solid var(--color-border-base);
  }
  .toggle {
    transform: rotate(180deg);
    transition: transform 0.2s linear;
    &.show {
      transform: rotate(0deg);
    }
  }
</style>
