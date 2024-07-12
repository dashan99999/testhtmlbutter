<template>
  <div class="relative overflow-visible w-full bg-#292929">
    <img class="w-full h-221" :src="props.game.cover_image" @click="router.push(`/gameDetail?id=${props.game.id}`)" />
    <div class="text-26 p-10">
      <div class="flex justify-between items-center">
        <div>{{ props.game.name }}</div>
        <!-- <img class="max-w-24 max-h-24" :src="props.game.cover_image" alt="" @click="handleClickExpand" /> -->
        <div class="w-30 h-30 bg-#ffffff1a rounded-1/2" @click="handleClickExpand">
          <van-icon name="arrow-down" />
        </div>
      </div>
      <div class="mt-5 flex justify-between items-center">
        <div class="light-text"> Trial available </div>
        <div class="mt-5 flex items-center">
          <van-popover v-for="(item, index) in platforms" :key="index" :actions="actions" position="top-start" placement="bottom">
            <div class="px-10 py-5 text-22">{{ item.text }}</div>
            <template #reference>
              <img class="w-28 h-auto" :src="item.img" alt="" />
            </template>
          </van-popover>
        </div>
      </div>
    </div>

    <div v-if="props.game.isExpand" class="detail absolute top-100% start-0 z-999 pb-20 w-full px-10 text-left bg-#292929">
      <template v-if="props.game?.detail">
        <div class="flex justify-start">
          <div
            v-for="label in props.game.detail.label"
            :key="label.id"
            class="mr-5 px-5 py-2 text-14 border-1 border-solid border-#919191 rounded-5 inline-block"
          >
            {{ label }}
          </div>
        </div>
        <div class="mt-15 text-18 text-#919191 leading-28">
          {{ props.game.detail.introduce }}
        </div>
        <div class="my-15 text-20 font-blod text-#919191">作者: {{ props.game.detail.author }}</div>
        <div class="px-10 py-5 bg-#151515 rounded-8 inline-block font-blod text-26">
          <div class="flex items-center">
            <img class="mr-10 w-26 h-auto" src="https://playmeow.com/_nuxt/img/icon_coin.17301a8.svg" alt="" />
            <span>{{ props.game.detail.price }}</span>
          </div>
        </div>
        <!-- <div class="text-#919191 text-right"> 2024年5月24日 </div> -->
      </template>
      <div v-else class="flex justify-centerw-full bg-#292929">
        <Loading type="spinner" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { Loading } from 'vant';
  import Platform1 from '~/assets/images/platform1.png';
  import Platform2 from '~/assets/images/platform2.png';
  import Platform3 from '~/assets/images/platform3.png';

  const props = withDefaults(
    defineProps<{
      game: any;
      index: number;
    }>(),
    {
      game: {},
      index: 0,
    },
  );
  const emit = defineEmits(['onExpand']);
  const router = useRouter();
  const platforms = [
    { img: Platform1, text: '支持网页游玩' },
    { img: Platform2, text: '支持 Windows 电脑' },
    { img: Platform3, text: '支持 Android 手机' },
  ];

  function handleClickExpand() {
    emit('onExpand');
  }
</script>

<style scoped lang="less">
  .light-text {
    font-size: 22px;
    color: #ffc364;
    text-shadow: 0 0 3px #ffc364, 0 0 6px #ff9900;
  }
</style>
