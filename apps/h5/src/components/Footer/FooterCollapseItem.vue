<template>
  <div class="wrapper" v-if="props.children">
    <div class="title" @click.stop="toggleExpand"
      >{{ props.name }} <IconFont v-if="props.children" name="go" class="icon fs-26" :class="{ expand: isExpand }"
    /></div>
    <div class="content" v-show="isExpand">
      <template v-for="item in props.children" :key="item.id">
        <a v-if="item.id !== 38" :href="item.url" target="_blank" class="item">{{ item.name }}</a>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup name="footer-collapse-item">
  interface IProps {
    name: string;
    children: any;
  }
  const props = defineProps<IProps>();

  const isExpand = ref(false);
  const toggleExpand = () => {
    isExpand.value = !isExpand.value;
  };
  const router = useRouter();
  watch(
    () => router,
    () => {
      isExpand.value = false;
    },
    {
      deep: true,
    },
  );
</script>
<style lang="less" scoped>
  .wrapper {
    padding: 30px 0px 30px 20px;
    .title {
      position: relative;
      font-size: 26px;
      color: var(--color-text-1);
      .icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        &.expand {
          transform: translateY(-50%) rotate(90deg);
        }
      }
    }
    .item {
      color: var(--color-text-1);
      display: block;
      padding: 30px 30px;
      font-size: 26px;
    }
  }
</style>
