<template>
  <div class="pb-300 text-#ffffff bg-#212121">
    <div class="relative min-h-240">
      <img class="w-full h-auto" :src="detail.cover_image" alt="" />
      <div
        class="absolute left-1/3 top-2/5 py-20 px-80 rounded-60 border-5 border-solid border-white inline-block bg-black bg-opacity-80 font-extrabold animate-bounce"
      >
        立即游玩
      </div>
    </div>
    <div class="px-20 py-15">
      <div class="grid gap-8" :style="{ gridTemplateColumns: '1fr 2fr 3fr' }">
        <div class="flex flex-col justify-center items-center h-110 rounded-10 bg-#2c2c2c">
          <div>-</div>
          <div class="mt-10 text-18 text-#919191">好评数</div>
        </div>
        <div class="flex flex-col justify-center items-center h-110 rounded-10 bg-#2c2c2c">
          <div class="flex items-center">
            <div v-for="platform in detail.game_link_obj" :key="platform.id">
              <!-- <img v-if="platform.device_type == 1" class="w-38 h-auto" :src="Platform4" alt="" /> -->
              <img v-if="platform.device_type == 1" class="mx-10 w-38 h-auto" :src="Platform5" alt="" />
              <img v-if="platform.device_type == 2" class="w-38 h-auto" :src="Platform6" alt="" />
            </div>
          </div>
          <div class="mt-10 text-18 text-#919191">支持设备</div>
        </div>
        <div class="flex flex-col justify-center items-center h-110 rounded-10 bg-#2c2c2c">
          <div>{{ detail.author }}</div>
          <div class="mt-10 text-18 text-#919191">发行商</div>
        </div>
      </div>
      <div class="mt-8 flex flex-col justify-center items-center h-120 rounded-10 bg-#2c2c2c text-center">
        <div class="font-bold"> 简体中文 及其他 5 个语言 </div>
        <div class="mt-10 text-18 text-#919191"> 支持语言 </div>
      </div>
      <div class="py-40">
        <div class="text-56 font-black">{{ detail.name }}</div>
        <div class="pt-20 text-32 font-normal">
          {{ detail.introduce }}
        </div>
      </div>
      <div class="flex justify-start">
        <div
          v-for="label in detail.label"
          :key="label.id"
          class="mr-10 px-20 py-6 text-24 border-1 border-solid border-#919191 text-#919191 rounded-10 inline-block"
        >
          {{ label }}
        </div>
      </div>
    </div>

    <div class="bg-#151515">
      <div class="mt-40">
        <swiper
          :slidesPerView="2"
          :spaceBetween="30"
          :centeredSlides="true"
          :modules="modules"
          :initialSlide="1"
          :loop="true"
          :navigation="true"
        >
          <swiper-slide v-for="(item, index) in detail.preview_image" :key="index" class="rounded-20">
            <img class="w-full h-221" :src="item" />
          </swiper-slide>
        </swiper>
      </div>

      <div class="p-40">
        <div class="flex justify-start">
          <div class="flex flex-col justify-center items-center">
            <div class="text-32 font-normal">游戏资讯</div>
            <div class="w-34 h-6 rounded-8 bg-#ea4b64"></div>
          </div>
        </div>

        <div class="mt-20 text-20 text-f5f5f5 leading-34">{{ detail.information }}</div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 z-9999 bg-#202020">
      <div class="p-20 flex items-center h-100">
        <div class="flex-1 flex justify-center items-center h-full bg-#ea4b64 rounded-80 text-28 font-bold" @click="handleOpenBuy">
          <span>马上购买</span>
          <img class="mx-20 w-26 h-auto" src="https://playmeow.com/_nuxt/img/icon_coin.17301a8.svg" alt="" />
          <span>{{ detail.price }}</span>
        </div>
        <div class="ml-20"><img class="w-60 h-60" :src="More" alt="" @click="handleShowDownload" /></div>
      </div>
      <div v-if="showDownload" class="px-20 pb-40 text-#919191 text-18">
        <div class="mb-20">以下是试玩版本的下载链结</div>
        <div v-for="platform in detail.game_link_obj" :key="platform.id">
          <div v-if="platform.device_type == 1" class="flex items-center">
            <img class="w-50 h-50" :src="Platform8" alt="" />
            <a :href="platform.game_link" download="win_game.zip">
              <div class="mx-20 px-18 py-6 text-26 border-1 border-solid border-#919191 text-#919191 rounded-10">立即下载</div>
            </a>
            <!-- <div class=""> 点击链接可下载游玩 </div> -->
          </div>
          <div v-if="platform.device_type == 2" class="mt-20 flex items-center">
            <img class="w-50 h-50" :src="Platform7" alt="" />
            <a :href="platform.game_link" download="android_game.apk">
              <div class="mx-20 px-18 py-6 text-26 border-1 border-solid border-#919191 text-#919191 rounded-10">立即下载</div>
            </a>
            <!-- <div class=""> 点击链接可下载游玩 </div> -->
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model:show="buyPopup" round>
      <div class="py-20 px-40 w-90vw h-55vh bg-#202020 rounded-20 text-18">
        <div class="text-center text-32"> 账单 </div>
        <div class="mt-60 p-20 bg-#373737 rounded-10">
          <div class="h-350">
            <div class="text-#919191 text-22">账单明细</div>
            <div class="mt-15 flex items-center">
              <div>{{ detail?.name }}</div>
              <div class="mx-10 flex-1 border-1 border-dashed border-#919191"></div>
              <span class="ml-10 text-32 font-black text-18">{{ detail?.price }}</span>
            </div>
          </div>

          <div class="mt-15 px-20 py-20 flex justify-between items-center border-y-1 border-y-dashed border-#919191">
            <div>总额:</div>
            <div class="ml-10 text-32 font-black text-18">{{ detail?.price }}</div>
          </div>
          <div class="mt-15 px-20 pb-20 border-b-1 border-b-dashed border-#919191">
            <div class="flex justify-between items-center">
              <div class="flex justify-between items-center"
                ><img class="mr-20 w-24 h-auto" :src="CoinSliver" alt="" />余额: {{ userStore?.userInfoDetail.sliver_coin }}</div
              >
              <div class="ml-10 text-32 font-black text-18">{{ userStore?.userInfoDetail.silver_coin }}</div>
            </div>
            <div class="mt-10 flex justify-between items-center">
              <div class="flex justify-between items-center"
                ><img class="mr-20 w-24 h-auto" :src="Coin" alt="" />余额: {{ userStore?.userInfoDetail.gold_coin }}</div
              >
              <div class="ml-10 text-32 font-black text-18">- {{ detail?.price }}</div>
            </div>
          </div>
          <div
            v-if="userStore?.userInfoDetail.gold_coin < detail?.price"
            class="mt-20 px-20 flex justify-between items-center text-#ea4b64"
          >
            <span>余额不足，还需支付：</span>
            <span>{{ userStore?.userInfoDetail.gold_coin - detail?.price }}</span>
          </div>
        </div>

        <div class="my-60 py-12 px-30 rounded-40 bg-#ea4b64 text-22 text-center" @click="handleBuy">前往支付</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
  import { getGameDetail, bugGames } from '@bitunix/shared/api/homeindex';
  import { useUserStore } from '@bitunix/shared/store';
  import { showToast } from '@bitunix/shared/utils/vant';
  import More from '~/assets/images/more.png';
  import Platform6 from '~/assets/images/platform6.png';
  import Platform4 from '~/assets/images/platform4.png';
  import Platform5 from '~/assets/images/platform5.png';
  import Platform7 from '~/assets/images/platform7.png';
  import Platform8 from '~/assets/images/platform8.png';
  import Coin from '~/assets/images/coin.svg';
  import CoinSliver from '~/assets/images/coin-silver.svg';

  const route = useRoute();
  const userStore = useUserStore();
  const detail = ref({});
  const modules = [Keyboard, Scrollbar, Navigation, Pagination];
  const showDownload = ref(false);
  const buyPopup = ref(false);

  const fetchDetail = async () => {
    const { data } = await getGameDetail(route.query.id);
    console.log('detail=res=>', data);
    detail.value = {
      ...data,
      cover_image: `http://23.224.129.162:8088/storage/${data.cover_image}`,
      preview_image: data.preview_image?.map((item) => `http://23.224.129.162:8088/storage/${item}`) || [],
      label: data.label?.split(',') || [],
    };
    console.log('detail==>', detail.value);
  };

  const handleShowDownload = () => {
    showDownload.value = !showDownload.value;
    console.log(showDownload.value);
  };

  const handleOpenBuy = () => {
    if (detail.value?.is_buy) {
      return showToast('游戏已购买，请勿重复购买');
    }
    buyPopup.value = true;
  };

  const handleBuy = async () => {
    bugGames({ game_id: detail.value.id })
      .then((res) => {
        if (res?.code == 200) {
          showToast('购买成功');
          buyPopup.value = false;
        }
      })
      .catch((error) => {
        console.log('error==>', error);
      });
  };

  onMounted(() => {
    fetchDetail();
  });
</script>
