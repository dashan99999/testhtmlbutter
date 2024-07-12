<template>
  <span @click="onClick">
    <slot></slot>
  </span>
  <van-popup v-model:show="modalVisible" :style="{ width: '100%' }" round teleport="body">
    <div class="pt-40 pb-20 px-20 flex flex-col justify-center items-center text-26">
      <div class="text-25 text-#F5F5F5 leading-30"> {{ props.text }} </div>
      <div class="mt-20 flex justify-end w-100%">
        <div class="mt-40 px-20 py-8 rounded-20 bg-#ea4b64 text-#000000 inline-block" @click="onClose">我知道了</div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
  interface IProps {
    text: string;
  }
  const props = withDefaults(defineProps<IProps>(), { text: '' });
  const modalVisible = ref(false);

  const onClick = () => {
    modalVisible.value = true;
  };

  const onClose = () => {
    modalVisible.value = false;
  };
</script>
