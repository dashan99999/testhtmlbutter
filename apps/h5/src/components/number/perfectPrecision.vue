<script lang="ts" setup>
  import DefaultDisplay from './default-display.vue';
  import Precision from './precision.vue';
  interface IProps {
    value: any;
    len: string | number;
    prefix?: string;
    suffix?: string;
    fm?: string;
  }
  const props = withDefaults(defineProps<IProps>(), { prefix: '', suffix: '' });
</script>
<template>
  <DefaultDisplay :value="props.value">
    {{ props.prefix }} <Precision :class="props.fm" :value="props.value" :fix-len="Number(props.len)" :thousand="true" :fill-zero="true" />
    {{ props.suffix }}
  </DefaultDisplay>
</template>
