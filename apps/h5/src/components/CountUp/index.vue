<script lang="ts" setup name="CountUp">
  import gsap from 'gsap';
  import { transferToNumber } from '@bitunix/shared/utils/methods';
  const props = withDefaults(defineProps<{ count: number | string; precision?: number }>(), {
    count: 0,
    precision: -1,
  });
  const animationNumber = reactive({
    count: 0,
  });
  const computedAnimationNumber = computed(() => {
    if (isNaN(parseFloat(props.count as string))) {
      return props.count;
    }
    if (props.precision < 0) {
      return animationNumber.count;
    }
    const num = Math.floor(animationNumber.count * Math.pow(10, props.precision)) / Math.pow(10, props.precision);
    return num;
  });
  watch(
    toRefs(props).count,
    (n: number | string) => {
      if (isNaN(parseFloat(n as string))) {
        return;
      }
      if (typeof n === 'string') {
        n = parseFloat(n);
      }
      gsap.to(animationNumber, {
        duration: 0.5,
        ease: 'bounce.out',
        count: n,
      });
    },
    {
      immediate: true,
    },
  );
</script>
<template>
  <div class="count-up-wrapper">
    <slot :value="transferToNumber(computedAnimationNumber)">
      {{ transferToNumber(computedAnimationNumber) }}
    </slot>
    <span class="icon-wrapper">
      <slot name="suffix"></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
  .count-up-wrapper {
    display: inline-block;
  }
</style>
