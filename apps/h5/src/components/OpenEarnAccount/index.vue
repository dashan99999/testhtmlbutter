<template>
  <van-popup v-model:show="isShow" :style="{ width: '630px', height: '224px' }" teleport="body">
    <div class="p-40 flex flex-col justify-center items-center">
      <img class="w-90 h-auto" :src="TipsIcon1" alt="" />
      <div class="my-30 text-32 text-#F5F5F5 leading-50">您还没有开通理财账户，立即开通开始UbitEx 理财交易？</div>
      <div class="w-100% h-100 leading-100 text-center rounded-10 text-#131F00 text-30 bg-#ea4b64 font-normal" @click="handleOpen">
        立即开通
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@bitunix/shared/store';
  import TipsIcon1 from '~/assets/images/tips-icon1.png';

  interface Props {
    visible: boolean;
    onClose?: () => void;
  }
  const props = defineProps<Props>();
  const userStore = useUserStore();

  const isShow = ref(props.visible);

  onMounted(() => {
    console.log('isShow==>', isShow.value);
  });

  const handleOpen = async () => {
    await userStore.openEarnAccount();
    isShow.value = false;
    onClose();
  };
</script>
