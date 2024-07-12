<script lang="ts" setup>
  interface IProps {
    text: string;
  }
  const props = withDefaults(defineProps<IProps>(), { text: '' });
  const modalVisible = ref(false);
  const onClick = () => {
    modalVisible.value = true;
  };
  console.log(props);
</script>
<template>
  <span @click="onClick">
    <slot></slot>
  </span>

  <a-modal :visible="modalVisible" :title="undefined" :closable="false" :footer="false" :modal-style="{ zIndex: 9999 }">
    <div class="">{{ props.text }}</div>
  </a-modal>
</template>
