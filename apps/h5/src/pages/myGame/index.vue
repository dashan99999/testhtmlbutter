<template>
  <div class="home-index-wrapper">
    <div class="my-20 mt-60 px-20">
      <div class="text-40 font-bold">我的游戏</div>
    </div>
    <div class="px-20 grid grid-cols-2 gap-20">
      <GameCard v-for="(item, index) in games" :key="index" :game="item" :index="index" @on-expand="onExpand(index)" />
    </div>
  </div>
</template>
<script lang="ts" setup name="home-index">
  import { useToken } from '@bitunix/shared/utils/auth';
  import GameCard from '@/components/GameCard';
  import { memberGameLists } from '@bitunix/shared/api/homeindex';

  definePageMeta({
    namespace: ['myGame'],
    fws: true,
    sws: true,
  });
  const token = useToken();
  const games = ref([]);

  onMounted(() => {
    fetchMyGameList();
  });

  const fetchMyGameList = async () => {
    const { data } = await memberGameLists();
    games.value = data.map((item) => ({
      ...item,
      game_obj: {
        ...item.game_obj,
        cover_image: `http://23.224.129.162:8088/storage/${item.game_obj.cover_image}`,
      },
      ...item.game_obj,
      cover_image: `http://23.224.129.162:8088/storage/${item.game_obj.cover_image}`,
      isExpand: false,
    }));
    console.log('page==res==>', games.value);
  };

  const onExpand = async (index: number) => {
    // console.log('games[key]==>', games.value[key]);

    // console.log('index==>', index);
    // return;
    games.value[index]['isExpand'] = !games.value[index]['isExpand'];
    if (!games.value[index]?.detail) {
      // const { data } = await getGameDetail(String(games.value[key][index].id));
      const data = games.value[index].game_obj;
      games.value[index]['detail'] = {
        ...data,
        label: data.label?.split(',') || [],
      };
      console.log('games.value==>', games.value);
    }
  };
</script>
<style lang="less" scoped>
  .home-index-wrapper {
    width: 750px;
    box-sizing: border-box;
    padding-bottom: 32px;
    background-color: var(--bx-bg-fg);
  }
</style>
