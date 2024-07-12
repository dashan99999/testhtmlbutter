<template>
  <div class="relative overflow-visible w-full bg-#292929 text-14">
    <img class="w-full h-auto" :src="props.game.cover_image" @click="router.push(`/gameDetailPC?id=${props.game.id}`)" />
    <div class="text-26 px-4">
      <div class="flex justify-between items-center">
        <div class="text-10">{{ props.game.name }}</div>
        <!-- <img class="max-w-24 max-h-24" :src="props.game.cover_image" alt="" @click="handleClickExpand" /> -->
        <div class="mt--5" @click="handleClickExpand">
          <van-icon name="arrow-down" :style="{ fontSize: '18px' }" />
        </div>
      </div>
      <div class="flex justify-between items-center text-12">
        <div class="light-text"> Trial available </div>
        <div class="flex items-center">
          <van-popover v-for="(item, index) in platforms" :key="index" :actions="actions" position="top-start" placement="bottom">
            <div class="px-10 py-5 text-10">{{ item.text }}</div>
            <template #reference>
              <img class="w-14 h-auto" :src="item.img" alt="" />
            </template>
          </van-popover>
        </div>
      </div>
    </div>

    <div v-if="props.game.isExpand" class="detail absolute top-100% start-0 z-999 pb-20 w-full px-10 text-left bg-#292929">
      <template v-if="props.game?.detail">
        <div class="mt-8 flex justify-start flex-wrap">
          <div
            v-for="label in props.game.detail.label"
            :key="label.id"
            class="mr-2 mb-4 px-2 py-1 text-6 border-1 border-solid border-#919191 rounded-5 inline-block"
          >
            {{ label }}
          </div>
        </div>
        <div class="mt-10 text-10 text-#919191 leading-16">
          {{ props.game.detail.introduce }}
        </div>
        <div class="my-15 text-12 font-blod text-#919191">作者: {{ props.game.detail.author }}</div>
        <div class="px-8 py-5 bg-#151515 rounded-8 inline-block font-blod text-26">
          <div class="flex items-center">
            <img class="mr-6 w-16 h-auto" src="https://playmeow.com/_nuxt/img/icon_coin.17301a8.svg" alt="" />
            <span class="text-14">{{ props.game.detail.price }}</span>
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
    font-size: 10px;
    color: #ffc364;
    text-shadow: 0 0 3px #ffc364, 0 0 6px #ff9900;
  }
</style>
