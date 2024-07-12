<template>
  <span @click="onClick">
    <slot></slot>
  </span>
  <van-popup v-model:show="modalVisible" :style="{ width: '100%' }" round position="bottom" teleport="body" :close="onClose">
    <div class="pt-40 pb-80 px-20 flex flex-col justify-center items-center text-26">
      <div class="px-50 py-5 bg-#1a1a1a rounded-28">订单概览</div>
      <div class="my-20 w-100% flex justify-between items-center text-26">
        <div>
          <div class="text-#808080">{{ $t('assets.earn.order2') }}</div
          ><div class="text-#F5F5F5">{{ fixD(detail.coinAmount + detail.ubAmount, 2) }} <span class="text-#808080">USDT</span></div>
        </div>
        <div class="py-5 px-20 bg-#ea4b64 rounded-28">{{ orderStatus(detail.status) }}</div>
      </div>

      <div class="w-100% border border-solid border-#333333"></div>

      <div class="my-20 w-100% flex justify-between items-center text-26">
        <span class="text-#808080">{{ $t('assets.earn.order3') }}</span
        ><span class="text-#F5F5F5">{{ fixD(detail?.revenueQuantity, 2) }} StUB</span>
      </div>
      <div class="my-20 w-100% flex justify-between items-center text-26">
        <span class="text-#808080">交易币价</span
        ><span class="text-#F5F5F5">{{ fixD(detail?.coinPrice / detail?.ubPrice, 2) }} <span class="text-#808080">USDT/UB</span></span>
      </div>
      <div class="my-20 w-100% flex justify-between items-center text-26">
        <span class="text-#808080">质押档位</span>
        <div class="text-#F5F5F5">
          <div>{{ detail?.stakeDays }}<span class="text-#808080">天</span></div>
          <div class="text-#808080 text-right">{{ detail.dailyRate }}%</div>
        </div>
      </div>
      <div class="my-20 w-100% flex justify-between items-center text-26">
        <span class="text-#808080">自动做市</span>
        <div class="text-#F5F5F5">{{ detail?.auto ? '开启' : '关闭' }}</div>
      </div>
      <div class="my-20 w-100% flex justify-between items-center text-26">
        <span class="text-#808080">{{ $t('assets.earn.order5') }}</span
        ><span class="text-#808080">{{ dayjs(detail.createTime).format('YYYY-MM-DD HH:mm:ss (UTC)') }}</span>
      </div>
      <div class="my-20 w-100% flex justify-between items-center text-26">
        <span class="text-#808080">结算时间</span>
        <span class="text-#808080">{{ dayjs(detail.settlementTime).format('YYYY-MM-DD HH:mm:ss (UTC)') }}</span>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
  import { orderDetail } from '#shared/api/earn';
  import { fixD } from '@bitunix/shared/utils/maths';
  import dayjs from 'dayjs';
  interface IProps {
    id: string;
  }
  const { id } = withDefaults(defineProps<IProps>(), { id: '' });
  const modalVisible = ref(false);
  const detail = ref({});

  const orderStatus = computed(() => (status: any) => {
    // 订单状态,PROCESS(进行中),COMPLETE(已完成),RENEW(已复投),REDEEM(已回收资金)，HOLD（排队中）
    const statusMap: any = {
      PROCESS: '进行中',
      COMPLETE: '已完成',
      RENEW: '已复投',
      REDEEM: '已回收资金',
      HOLD: '排队中',
    };
    return statusMap[status];
  });

  watch(modalVisible, () => {
    if (!modalVisible.value) return;
    fetchOrderDetail();
  });

  const fetchOrderDetail = () => {
    orderDetail(id).then((res) => {
      detail.value = res;
    });
  };

  const onClick = () => {
    modalVisible.value = true;
    console.log('modalVisible.value==>', modalVisible.value);
  };

  const onClose = () => {
    modalVisible.value = false;
    console.log('onClose==>', modalVisible.value);
  };

  // onMounted(() => {
  //   console.log('id==>', id);
  //   if (!id) return;
  //   fetchOrderDetail();
  //   console.log('==detail>', detail.value);
  // });
</script>
