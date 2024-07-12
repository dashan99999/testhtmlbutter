<template>
  <i aria-hidden="true" class="svg-icon-spin inline-block" :class="calsses" :style="styled"> </i>
</template>

<script lang="ts" setup>
  import { type CSSProperties } from 'vue';
  import { px2rem } from '@bitunix/shared/utils/methods';

  interface Props {
    name: string;
    prefix?: string;
    color?: string;
    size?: string;
    style?: CSSProperties;
    w?: string;
    h?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    // color: '#333',
    size: 'default',
  });
  const calsses = computed(() => {
    return {
      [`sdms-size-${props.size}`]: props.size,
      [props.name]: true,
    };
  });
  const styled = computed(() => {
    return {
      ...props.style,
      width: props.w ? px2rem(props.w) : props.style?.width ? px2rem(props.style.width as string) : '',
      height: props.h ? px2rem(props.h) : props.style?.height ? px2rem(props.style.height as string) : '',
    };
  });
  const fontSize = reactive({ default: '32px', small: '20px', large: '48px' });
</script>
<style lang="less" scoped>
  .svg-icon-spin {
    width: v-bind('fontSize.default');
    height: v-bind('fontSize.default');
    fill: v-bind(color);
    vertical-align: middle;
    color: v-bind(color);

    &.sdms-size-small {
      font-size: v-bind('fontSize.small');
      height: v-bind('fontSize.small');
    }

    &.sdms-size-large {
      font-size: v-bind('fontSize.large');
      height: v-bind('fontSize.large');
    }
  }
</style>
