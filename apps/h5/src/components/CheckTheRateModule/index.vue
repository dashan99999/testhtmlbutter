<template>
  <div class="get-rate-component">
    <div id="check-fee-module" class="relative"> </div>
    <van-popover v-model:show="showRatePopover" class="rate-overlay-class" placement="top-start">
      <template #reference>
        <span class="color-text-2 fs-24 underline">{{ $t('service.grade') }}</span>
      </template>
      <div class="color-text-2 flex items-center pb-24 m-b24 brd-bottom-color-border-base" @click="routeLink('/service/vip-service')">
        {{ $t('service.your_grade') }}
        <span class="color-text-brand-base flex items-center">
          {{ rateInformation.vipLevel ? 'VIP ' + rateInformation.vipLevel : $t('service.vip.Regular_User') }}
          <IconFont name="go" class="fs-20 ml-8" />
        </span>
      </div>
      <div class="flex items-center fs-24 color-text-2">
        <p class="flex-1 flex flex-col">
          Taker
          <span class="color-text-1 fs-30 m-t8">{{ fixD(feeObj.takerRate, 4) }}%</span>
        </p>
        <p class="flex-1 flex flex-col">
          Maker
          <span class="color-text-1 fs-30 m-t8">{{ fixD(feeObj.makerRate, 4) }}%</span>
        </p>
      </div>
    </van-popover>
  </div>
</template>
<script setup lang="ts">
  import { useUserStore } from '@bitunix/shared/store/index';
  import { fixD } from '@bitunix/shared/utils/maths';

  const userStore = useUserStore();
  const { rateInformation } = storeToRefs(userStore);
  const showRatePopover = ref<boolean>(false);
  const props = withDefaults(
    defineProps<{
      module: string;
    }>(),
    {
      module: 'spot',
    },
  );
  const feeObj = computed(() => {
    const feeMap = new Map([
      ['spot', { makerRate: rateInformation.value.spotMakerRate, takerRate: rateInformation.value.spotTakerRate }],
      ['contract', { makerRate: rateInformation.value.futureMakerRate, takerRate: rateInformation.value.futureTakerRate }],
    ]);
    return feeMap.get(props.module) as FeeObjType;
  });
  interface FeeObjType {
    makerRate: string;
    takerRate: string;
  }
  const routeLink = (url: string) => {
    navigateToLocale(url);
  };
</script>

<style lang="less">
  .rate-overlay-class {
    .van-popover__content {
      background: var(--color-bg-popup);
      color: var(--color-text-1);
      font-size: 26px;
      height: 216px;
      padding: 32px 24px;
      border: 1px solid var(--color-bg-interactive-strong);
      border-radius: 10px;
    }
  }
</style>
