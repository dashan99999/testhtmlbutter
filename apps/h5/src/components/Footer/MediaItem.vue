<script lang="ts" setup name="media-item">
  import { useAppStore } from '@bitunix/shared/store';
  const appStore = useAppStore();
  const props = defineProps<{ info: any }>();
  const showPopover = ref(false);
</script>
<template>
  <div class="wrapper">
    <van-popover teleport="#footer" v-if="props.info.list.length > 1" v-model:show="showPopover" placement="top">
      <a v-for="item in props.info.list" :key="item.type" target="_blank" :href="item.address" class="link-item">{{ item.notes }}</a>
      <template #reference>
        <van-image
          radius="50%"
          :alt="props.info.type"
          lazy-load
          class="icon"
          :src="props.info.blackIcon"
          v-if="appStore.theme === 'dark'"
        />
        <van-image radius="50%" :alt="props.info.type" lazy-load class="icon" :src="props.info.whiteIcon" v-else />
      </template>
    </van-popover>
    <a v-else :href="props.info.list[0].address" class="link-item-a" target="_blank">
      <van-image radius="50%" :alt="props.info.type" lazy-load class="icon" :src="props.info.blackIcon" v-if="appStore.theme === 'dark'" />
      <van-image radius="50%" :alt="props.info.type" lazy-load class="icon" :src="props.info.whiteIcon" v-else />
    </a>
  </div>
</template>
<style lang="less" scoped>
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .link-item {
    display: block;
    padding: 20px;
    background-color: var(--color-bg-popup);
    color: var(--color-text-1);
    font-size: 26px;
    &-a {
      padding: 0;
    }
  }
</style>
