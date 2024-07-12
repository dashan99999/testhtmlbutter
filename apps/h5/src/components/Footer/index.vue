<script setup lang="ts">
  import FooterCollapseItem from './FooterCollapseItem.vue';
  import type { FriendLinkItem, MediaItem } from '@bitunix/shared/api/app/types';
  import Logo from '~/assets/images/UbitEx.svg';
  // 不同页面控制显隐
  const route = useRoute();
  const { data } = useNuxtData<{ footerList: FriendLinkItem[]; mediaList: MediaItem[] }>('footerData');
  const showFooter = computed(() => route.meta.pageLayouts?.footer ?? true);
</script>
<template>
  <div class="footer-wrapper" v-if="showFooter" id="footer">
    <!--    <IconFont name="a-Bitunixlogolight1" class="logo" />-->
    <img class="ml-20" :src="Logo" alt="" />
    <FooterCollapseItem v-for="item in data?.footerList" :key="item.id" :name="item.name" :children="item.children" />
    <div class="social-title">{{ $t('common.footer.Community') }}</div>
    <div class="social-media-list">
      <MediaItem class="icon-wrapper" v-for="item in data?.mediaList" :key="item.type" :info="item" />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .footer-wrapper {
    position: relative;
    width: 750px;
    box-sizing: border-box;
    padding: 50px 30px 160px 30px;
    background-color: var(--color-bg-popup);
    .logo {
      margin-bottom: 40px;
      font-size: 40px;
      background-image: linear-gradient(to right, #ea4b64 40px, var(--color-text-1) 40px);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    .social-title {
      font-size: 26px;
      color: var(--color-text-1);
      padding: 30px 20px;
    }
    .social-media-list {
      display: flex;
      flex-wrap: wrap;
      // width: 100%;
      padding: 40px 40px 0;
      box-sizing: border-box;
      .icon-wrapper {
        margin-left: 70px;
        margin-bottom: 18px;
        &:nth-of-type(5n + 1) {
          margin-left: 0;
        }
        .icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
