<template>
  <div class="transaction-details color-bg-popup">
    <van-popup
      v-model:show="detailsSwitch"
      overlay-class="transaction-details-pop"
      position="right"
      teleport="body"
      :style="{ width: '100%', height: '100%', padding: px2rem('30px') }"
    >
      <div class="h-100 flex-row-between-center">
        <span class="fs-36 color-text-1 fm-medium">{{ $t('spotTrade.Trade_details') }}</span>
        <SvgIcon @click="closeTransactionDetails" name="bx-icon:date-cancel" w="32" h="32" />
      </div>
      <p class="fs-28 color-text-2 mb-20 flex items-center">
        {{ $t('spotTrade.order_number') }}: <span>{{ props.queryDetailsObj.orderId }} </span>
        <IconFont
          name="copy"
          class="ml-6 w-24 h-24 inline-block transform-scale-80 mb-6"
          @click="clipboard.copy(props.queryDetailsObj.orderId)"
        />
      </p>
      <van-loading v-if="isLoading" color="#ea4b64" size="40" />
      <template v-else>
        <div
          class="detail-item brd-bottom-color-border-base fs-28 mt-40 color-text-1"
          v-for="(item, index) in state.detailsData"
          :key="index"
        >
          <p class="flex-row-between-center m-b40 truncate">
            <span class="color-text-2">{{ $t('spotTrade.Transaction_time') }}</span>
            <span>
              {{ dayjs(item.ctime).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </p>
          <p class="flex-row-between-center m-b40 truncate">
            <span class="color-text-2">{{ $t('spotTrade.executed_num') }}</span>
            <span>
              <DefaultDisplay :value="item.volume">
                <Precision
                  :value="item.volume"
                  :fix-len="props.queryDetailsObj?.coinPairPrecisionBase"
                  :thousand="true"
                  :fill-zero="true"
                />
                {{ props.queryDetailsObj.base.toUpperCase() }}
              </DefaultDisplay>
            </span>
          </p>
          <p class="flex-row-between-center m-b40 truncate">
            <span class="color-text-2">{{ $t('spotTrade.Transaction_price') }}</span>
            <span>
              <DefaultDisplay :value="item.price">
                <Precision :value="item.price" :fix-len="props.queryDetailsObj.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                {{ props.queryDetailsObj.quote.toUpperCase() }}
              </DefaultDisplay>
            </span>
          </p>
          <p class="flex-row-between-center m-b40 truncate">
            <span class="color-text-2">{{ $t('spotTrade.executed_total') }}</span>
            <span>
              <DefaultDisplay :value="mulDec(item.volume, item.price)">
                <Precision
                  :value="mulDec(item.volume, item.price)"
                  :fix-len="props.queryDetailsObj.coinPairPrecisionQuote"
                  :thousand="true"
                  :fill-zero="true"
                />
                {{ props.queryDetailsObj.quote.toUpperCase() }}
              </DefaultDisplay>
            </span>
          </p>
          <p class="flex-row-between-center m-b40 truncate">
            <span class="color-text-2">{{ $t('spotTrade.fee') }}</span>
            <span>
              <DefaultDisplay :value="item.fee">
                <Precision :value="item.fee" :fix-len="backCoinSymbolPrecision(item.feeCoin)" :thousand="true" :fill-zero="true" />
                {{ item.feeCoin.toUpperCase() }}
              </DefaultDisplay>
            </span>
          </p>
          <p class="flex-row-between-center m-b40 truncate">
            <span class="color-text-2">{{ $t('spotTrade.role') }}</span>
            <span>{{ item.role === 1 ? 'Maker' : 'Taker' }}</span>
          </p>
        </div>
      </template>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';
  import { DefaultDisplay, Precision } from '@/components/number';
  import { getListByOrder } from '@bitunix/shared/api/spot-trade/index';
  import { ExpandedTableType, HistoryDataListType, CurrentOrderDataType } from '../../type';
  import { backCoinSymbolPrecision } from '@/pages/spot-trade/components/config';
  import { mulDec } from '@bitunix/shared/utils/maths';
  import { px2rem } from '@bitunix/shared/utils/methods';
  import { useClipboard } from '@bitunix/shared/hooks/useClipboard';

  type OrderDataTypeObj = HistoryDataListType | CurrentOrderDataType;

  const props = defineProps<{
    detailsShow: boolean;
    queryDetailsObj: OrderDataTypeObj;
  }>();

  const isLoading = ref<boolean>(false);
  const state = reactive({
    detailsData: [] as ExpandedTableType[],
  });

  const clipboard = useClipboard();

  const detailsSwitch = computed(() => {
    if (props.detailsShow) {
      getListByOrderFun(props.queryDetailsObj);
    }
    return props.detailsShow;
  });

  const getListByOrderFun = async (row: OrderDataTypeObj) => {
    isLoading.value = true;
    const params = {
      orderId: row.orderId,
      base: row.base,
      quote: row.quote,
    };
    try {
      const res = await getListByOrder(params);
      isLoading.value = false;
      state.detailsData = res;
      return;
    } catch (error) {
      isLoading.value = false;
    }
  };
  const emit = defineEmits<{
    (e: 'closeTransaction'): void;
  }>();
  const closeTransactionDetails = () => {
    emit('closeTransaction');
  };
</script>

<style lang="less" scoped>
  :deep(.van-loading) {
    margin-top: 200px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
