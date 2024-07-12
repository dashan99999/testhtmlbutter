<template>
  <div>
    <div class="my-20 px-20">
      <div class="text-20 font-bold">最新游戏</div>
    </div>
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :centeredSlides="true"
      :modules="modules"
      :initialSlide="1"
      :loop="true"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in games?.latest" :key="index" class="rounded-20">
        <GameCard2 :game="item" :index="index" @on-expand="onExpand('latest', index)" />
      </swiper-slide>
    </swiper>

    <div class="px-120">
      <div class="my-20 mt-60 px-20">
        <div class="text-20 font-bold">畅销游戏</div>
      </div>
      <div class="px-20 grid grid-cols-3 gap-20">
        <GameCard2
          v-for="(item, index) in games?.bestSeller"
          :key="index"
          :game="item"
          :index="index"
          @on-expand="onExpand('bestSeller', index)"
        />
      </div>
    </div>

    <div class="px-120">
      <div class="my-20 mt-60 px-20">
        <div class="text-20 font-bold">推荐游戏</div>
      </div>
      <div class="px-20 grid grid-cols-3 gap-20">
        <GameCard2
          v-for="(item, index) in games?.recommend"
          :key="index"
          :game="item"
          :index="index"
          @on-expand="onExpand('recommend', index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
  import BJPG from '~/assets/images/b.jpg';
  import Person from '~/assets/icons/svg/person.svg';
  import GameCard2 from '@/components/GameCard2';
  import { getGameLists, gameListType, getGameDetail } from '@bitunix/shared/api/homeindex';
  import { useDevice } from '@bitunix/shared/hooks/useDevice';

  const modules = [Keyboard, Scrollbar, Navigation, Pagination];
  const { isMobile } = useDevice();

  const games = ref<gameListType>({});

  const onExpand = async (key: any, index: number) => {
    // console.log('games[key]==>', games.value[key]);

    // console.log('index==>', index);
    // return;
    games.value[key][index]['isExpand'] = !games.value[key][index]['isExpand'];
    if (!games.value[key][index]?.detail) {
      const { data } = await getGameDetail(String(games.value[key][index].id));
      games.value[key][index]['detail'] = {
        ...data,
        label: data.label?.split(',') || [],
      };
      console.log('games.value==>', games.value);
    }
  };

  onMounted(() => {
    fetchGameList();
    console.log('onMounted==isMobile==>', isMobile.value);
  });

  const fetchGameList = async () => {
    const { data } = await getGameLists();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = data[key].map((item) => ({
          ...item,
          cover_image: `http://23.224.129.162:8088/storage/${item.cover_image}`,
          isExpand: false,
        }));
      }
    }
    games.value = data;
    console.log('page==res==>', games.value);
  };
</script>

<style scoped lang="less">
  .swiper {
    width: 100%;
    overflow: visible;
  }

  // :deep(.swiper-wrapper) {
  //   transform: translate3d(-160px, 0px, 0px) !important;
  // }

  .swiper-slide {
    margin-right: 15px !important;
    text-align: center;
    font-size: 18px;
    background: #292929;
    // color: #ffffff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.detail) {
      width: 94.2%;
    }
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  :deep(.swiper-button-prev) {
    color: #ea4b64 !important;
  }
  :deep(.swiper-button-next) {
    color: #ea4b64 !important;
  }
</style>
