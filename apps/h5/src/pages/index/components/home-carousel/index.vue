<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-full">
    <van-swipe class="my-swipe box-border">
      <van-swipe-item v-for="item in bannerList" :key="item.key" indicator-color="white">
        <img class="w-100% h-auto" :src="item.picture_url" :alt="item.picture_url" />
      </van-swipe-item>
      <!-- <template #indicator="{ active, total }">
        <div class="indicators"></div>
        <div v-for="item in total" :key="item" class="indicator"></div>
      </template> -->
    </van-swipe>
  </div>
</template>
<script lang="ts" setup name="home-carousel">
  import { APP_ROUTES } from '@bitunix/shared/constants';
  // import { getBannerList } from '@bitunix/shared/api/app';
  import { getBanners } from '@bitunix/shared/api/homeindex';
  const { locale } = useI18n();

  const bannerList = ref([]);

  onMounted(() => {
    fetchBannersList();
  });

  const fetchBannersList = async () => {
    const { data } = await getBanners({ type: 0 });
    bannerList.value = data.map((item) => ({
      ...item,
      picture_url: `http://23.224.129.162:8088/storage/${item.picture_url}`,
    }));
  };
  // banner图列表
  // const bannerRes = useLazyAsyncData(
  //   async () => {
  //     const { data } = await getBanners();
  //     console.log('data==>', data);

  //     return data;
  //   },
  //   {
  //     watch: [locale],
  //   },
  // );
  // // const bannerList = computed(() => bannerRes.data.value || []);
  // const bannerList = computed(
  //   () =>
  //     bannerRes.data.value?.length || [
  //       { title: '1', imageUrl: 'http://139.196.186.154:8081/upload/ad_banner/01.jpg' },
  //       { title: '2', imageUrl: 'http://139.196.186.154:8081/upload/ad_banner/02.jpg' },
  //     ],
  // );
</script>
<style lang="less" scoped>
  .my-swipe {
  }

  :deep(.van-swipe__indicator) {
    width: 20px;
    height: 20px;
    border: 3px solid #ffffff !important;
    background-color: #000000 !important;
    opacity: 1;
  }
  :deep(.van-swipe__indicator--active) {
    border: 4px solid #000000 !important;
    background-color: #ffffff !important;
  }

  // .indicators {
  //   position: absolute;
  //   right: 50px;
  //   bottom: 5px;
  //   background: red;
  //   .indicator {
  //     background: #ffffff;
  //     width: 5px;
  //     height: 5px;
  //     border-radius: 50%;
  //   }
  // }
</style>
