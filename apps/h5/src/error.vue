<template>
  <div class="w-full h-full color3">
    <div class="p30 flex items-center justify-center flex-col p80 w-full h-full">
      <div class="flex items-center justify-center p30">
        <van-image width="15vw" :src="errorIcon" />
      </div>
      <div class="error-content fs-30 p-t40 p-b40 color1">{{ props.error.statusCode }}</div>
      <div class="error-content fs-30 p-t40 p-b40 color1">{{ props.error.statusMessage }}</div>
      <div>
        <van-button @click="handleError" type="primary" block>GO Home</van-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import errorIcon from '~/assets/images/errorIcon.png';
  const props = defineProps<{ error: any }>();
  const localePath = useLocalePath();
  const handleError = () => {
    location.reload();
  };
  onMounted(() => {
    if (props.error.statusCode === 404) {
      clearError({ redirect: localePath('/') });
    }
  });
</script>
<style lang="less">
  .error-content {
    max-height: 50vh;
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    text-align: center;
  }
  .color1 {
    color: #f5f5f5;
  }
  .color2 {
    color: #999999;
  }
  .color3 {
    background-color: #000;
  }
</style>
