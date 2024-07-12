<template>
  <div class="spot-public-orders">
    <div v-if="props.data.length">
      <section class="mb-60" v-for="(item, index) in vData" :key="index">
        <div class="item-list" :class="['overflow-hidden', type && item.isShowMore ? '' : minHeight]">
          <div class="flex-row-between-start m-b28">
            <p>
              <span class="fvn-number color-text-1 fs-32 fm-medium mb-12 inline-block">{{ item.base + '/' + item.quote }}</span>
              <br />
              <button :class="['button-type color-bg-success-base h-36 leh-36 mr-8 fs-20', { '!color-bg-error-base': item.side === 1 }]">
                {{ sideTextIndArray[item.side - 1] || '--' }}
              </button>
              <button class="button-type color-bg-interactive-base px-8 h-36 leh-36 color-text-2 fs-20">
                {{ typeNameArray[item.type - 1] || '--' }}
              </button>
            </p>
            <button
              v-if="props.type === 0"
              class="button-type color-bg-secondary-base color-text-1 fs-22 h-48 px-8"
              @click="functionButtons(item)"
            >
              {{ $t('spotTrade.cancel') }}
            </button>
            <p v-else class="color-text-2 flex items-center font-medium" @click="functionButtons(item)">
              <span class="fs-24 mr-6">{{ statusArray[item.status] }}</span>
              <IconFont name="go" class="h-24 color-text-2 scale-80" />
            </p>
          </div>
          <template v-if="props.type === 0">
            <!-- 委托价格 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.entrust_price') }}</span>
              <span>
                <span v-if="item.type === 1">
                  <DefaultDisplay :value="item.price">
                    <Precision :value="item.price" :fix-len="item.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                    {{ item.quote }}
                  </DefaultDisplay>
                </span>
                <span v-else>
                  {{ $t('spotTrade.market_price') }}
                </span>
              </span>
            </div>
            <!-- 成交数量 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.executed_num') }}</span>
              <span>
                <DefaultDisplay :value="item.dealVolume">
                  <Precision :value="item.dealVolume" :fix-len="item.coinPairPrecisionBase" :thousand="true" :fill-zero="true" />
                  {{ item.base }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 委托量 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.order_amount') }}</span>
              <span>
                <span v-if="item.type === 2 && item.side === 2">-</span>
                <DefaultDisplay v-else :value="item.volume">
                  <Precision :value="item.volume" :fix-len="item.coinPairPrecisionBase" :thousand="true" :fill-zero="true" />
                  {{ item.base }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 成交金额 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.executed_total') }}</span>
              <span>
                <DefaultDisplay :value="item.dealAmount">
                  <Precision :value="item.dealAmount" :fix-len="item.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                  {{ item.quote }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 委托金额 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.entrust_total') }}</span>
              <span>
                <DefaultDisplay :value="item.amount">
                  <Precision :value="item.amount" :fix-len="item.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                  {{ item.quote }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 时间 -->
            <div class="order-line">
              <span class="color-text-2 fvn-number">{{ $t('spotTrade.time') }}</span>
              <span>{{ dayjs(item.ctime).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </div>
          </template>
          <template v-else>
            <!-- 成交均价 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.average_price') }}</span>
              <span>
                <DefaultDisplay :value="item.avgPrice">
                  <Precision :value="item.avgPrice" :fix-len="item.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                  {{ item.quote }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 委托价格 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.entrust_price') }}</span>
              <span>
                <span v-if="item.type === 1">
                  <DefaultDisplay :value="item.price">
                    <Precision :value="item.price" :fix-len="item.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                    {{ item.quote }}
                  </DefaultDisplay>
                </span>
                <span v-else>
                  {{ $t('spotTrade.market_price') }}
                </span>
              </span>
            </div>
            <!-- 成交数量 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.executed_num') }}</span>
              <span>
                <DefaultDisplay :value="item.dealVolume">
                  <Precision :value="item.dealVolume" :fix-len="item.coinPairPrecisionBase" :thousand="true" :fill-zero="true" />
                  {{ item.base }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 委托量 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.order_amount') }}</span>
              <span v-if="item.type === 2 && item.side === 2">-</span>
              <span v-else>
                <DefaultDisplay :value="item.volume">
                  <Precision :value="item.volume" :fix-len="item.coinPairPrecisionBase" :thousand="true" :fill-zero="true" />
                  {{ item.base }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 成交金额 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.executed_total') }}</span>
              <span>
                <DefaultDisplay :value="item.dealAmount">
                  <Precision :value="item.dealAmount" :fix-len="item.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                  {{ item.quote }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 委托金额 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.Order_total') }}</span>
              <span>
                <DefaultDisplay :value="item.amount">
                  <Precision :value="item.amount" :fix-len="item.coinPairPrecisionQuote" :thousand="true" :fill-zero="true" />
                  {{ item.quote }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 手续费 -->
            <div class="order-line">
              <span class="color-text-2">{{ $t('spotTrade.fee') }}</span>
              <span>
                <DefaultDisplay :value="item.fee">
                  <Precision :value="item.fee" :fix-len="backCoinSymbolPrecision(item.feeCoin)" :thousand="true" :fill-zero="true" />
                  {{ item.feeCoin?.toUpperCase() }}
                </DefaultDisplay>
              </span>
            </div>
            <!-- 时间 -->
            <div class="order-line">
              <span class="color-text-2 fvn-number">{{ $t('spotTrade.time') }}</span>
              <span>{{ dayjs(item.ctime).format('YYYY-MM-DD HH:mm:ss') }}</span>
            </div>
          </template>
        </div>
        <!-- 展开收起 -->
        <div v-if="type" class="flex-row-end-center" @click="showMore(index)">
          <p class="flex items-center">
            <span class="color-text-brand-base fs-22 mr-6">{{
              item.isShowMore ? $t('spotTrade.retract.text') : $t('spotTrade.expand.text')
            }}</span>
            <van-icon name="arrow-down" color="#ea4b64" :class="['arrow-down-icon', { 'icon-rotate': item.isShowMore }]" />
          </p>
        </div>
      </section>
    </div>
    <div v-else class="flex-col-center-center h-246">
      <SvgIcon name="bx-icon:no-data" w="93" h="83" />
      <span class="fs-24 color-text-2 m-t20">{{ $t('spotTrade.noData') }}</span>
    </div>
    <transaction-details :details-show="detailsShow" :query-details-obj="state.queryDetailsObj" @close-transaction="closeTransaction" />
  </div>
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';
  import transactionDetails from './components/transaction-details/index.vue';
  import { HistoryDataListType, CurrentOrderDataType } from './type';
  import { sideTextIndArray, statusArray, typeNameArray } from '@/components/spot-public-orders/static-resources';
  import { DefaultDisplay, Precision } from '@/components/number';
  import { backCoinSymbolPrecision } from '@/pages/spot-trade/components/config';

  const props = defineProps<{
    type: number;
    data: any;
  }>();
  const detailsShow = ref<boolean>(false);

  type OrderDataType = HistoryDataListType[] | CurrentOrderDataType[];
  type OrderDataTypeObj = HistoryDataListType | CurrentOrderDataType;
  const state = reactive({
    orderData: [] as OrderDataType,
    queryDetailsObj: {} as OrderDataTypeObj,
  });
  const emit = defineEmits<{
    (e: 'handleOrderCancel', row: any): void;
  }>();
  const vData = computed(() => {
    state.orderData = props.data;
    return state.orderData.map((item) => {
      item.isShowMore = false;
      return item;
    });
  });
  const functionButtons = (row: OrderDataTypeObj) => {
    if (props.type === 0) {
      emit('handleOrderCancel', row);
      return;
    }
    // 历史订单查看详情
    state.queryDetailsObj = row;
    detailsShow.value = true;
  };
  const closeTransaction = () => {
    detailsShow.value = false;
  };
  const minHeight = computed((): string => {
    if (props.type === 0) {
      return 'h-410';
    }
    return 'h-320';
  });
  const showMore = (index: number) => {
    state.orderData[index].isShowMore = !state.orderData[index].isShowMore;
  };
</script>

<style lang="less">
  .order-details-dialog {
    background-color: #1a1b1e;
    .van-dialog__message {
      color: var(--color-text-1);
      font-size: var(--bx-font-size-base);
    }
    .van-hairline--top {
      .van-button {
        background-color: #1a1b1e;
        border: 0;
      }
    }
  }
</style>
<style lang="less" scoped>
  .spot-public-orders {
    .button-type {
      text-align: center;
      padding: 0 8px;
      border: 0;
      border-radius: 4px;
    }
    .arrow-down-icon {
      transition: all 0.2s;
      &.icon-rotate {
        transform: rotate(180deg);
      }
    }
    .item-list {
      .order-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        color: var(--color-text-1);
        margin-bottom: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .order-dialog {
    background-color: #1a1b1e;
  }
</style>
