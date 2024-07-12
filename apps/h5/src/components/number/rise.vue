<script lang="ts" setup>
  const props = defineProps<{ value: string | number | null | undefined; positive?: any; class?: string }>();
  const solts = useSlots();
  const attr = ref({
    className: 'color-equal-text',
    prefix: '',
    isNaN: false,
  });
  watch(
    () => [props, solts],
    () => {
      let num = Number(props.value);
      if (isNaN(num)) {
        attr.value = {
          className: 'color-equal-text',
          prefix: '',
          isNaN: true,
        };
      }
      if (num > 0) {
        attr.value = {
          className: 'color-up-text',
          prefix: props.positive !== undefined ? '+' : '',
          isNaN: false,
        };
      } else if (num < 0) {
        attr.value = {
          className: 'color-down-text',
          prefix: '',
          isNaN: false,
        };
      } else {
        attr.value = {
          className: 'color-equal-text',
          prefix: '',
          isNaN: false,
        };
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );
</script>
<template>
  <span :class="[attr.className, props.class]">
    <template v-if="attr.isNaN">--</template>
    <template v-else>
      <template v-if="solts['default']">
        <slot></slot>
      </template>
      <template v-else> {{ attr.prefix }}{{ props.value }}</template>
    </template>
  </span>
</template>
<style lang="less" scoped>
  .color-up-text {
    color: rgb(var(--success-6));
  }
  .color-down-text {
    color: rgb(var(--danger-6));
  }
  .color-equal-text {
    color: var(--color-text-2);
  }
</style>
