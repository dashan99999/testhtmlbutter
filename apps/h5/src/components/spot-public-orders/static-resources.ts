import { OrderColType } from '@/components/spot-public-orders/type';
import { ArrTransformObjData } from './type';

export const currentDelegationList: OrderColType[] = [
  {
    title: '订单类型',
    dataIndex: 'typeName',
  },
  {
    title: '委托量',
    dataIndex: 'volume',
  },
  {
    title: '委托价格',
    dataIndex: 'price',
    individualization: true,
  },
  {
    title: '委托金额',
    dataIndex: 'amount',
    individualization: true,
  },
  {
    title: '已成交/未成交',
    dataIndex: 'closedStatus',
  },
  {
    title: '时间',
    dataIndex: 'ctime',
  },
];
export const historicalCommissionList: OrderColType[] = [
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '订单类型',
    dataIndex: 'typeName',
  },
  {
    title: '成交数量/委托数量',
    dataIndex: 'dealVolumeAndVolume',
  },
  {
    title: '成交均价',
    dataIndex: 'avgPrice',
    individualization: true,
  },
  {
    title: '成交金额',
    dataIndex: 'dealAmount',
    individualization: true,
  },
  {
    title: '委托价格',
    dataIndex: 'price',
    individualization: true,
  },
  {
    title: '委托金额',
    dataIndex: 'amount',
    individualization: true,
  },
  {
    title: '时间',
    dataIndex: 'ctime',
  },
];

export const transactionDetailsList: OrderColType[] = [
  {
    title: '成交时间',
    dataIndex: 'ctime',
  },
  {
    title: '成交数量',
    dataIndex: 'volume',
    individualization: true,
    accuracy: 'basePrecision',
  },
  {
    title: '成交价格',
    dataIndex: 'price',
    individualization: true,
  },
  {
    title: '成交金额',
    dataIndex: 'amount',
    individualization: true,
    accuracy: 'basePrecision',
    suffix: 'quote',
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    individualization: true,
    suffix: 'base',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
];

export const roleArray = ['Maker', 'Taker'];
export const switchoverBtnArray = computed(() => {
  const { t } = useI18n();
  return [t('spotTrade.open_orders'), t('spotTrade.order_history')];
});
export const switchoverBtnTime = computed(() => {
  const { t } = useI18n();
  return [t('spotTrade.1_Day'), t('spotTrade.1_Week'), t('spotTrade.1_Month'), t('spotTrade.3_Months')];
});
export const sideTextObj = computed(() => {
  const { t } = useI18n();
  return {
    SELL: t('spotTrade.sell'),
    BUY: t('spotTrade.buy'),
  };
});
export const sideTextIndArray = computed(() => {
  const { t } = useI18n();
  return [t('spotTrade.sell'), t('spotTrade.buy')];
});

export const typeNameArray = computed(() => {
  const { t } = useI18n();
  return [t('spotTrade.limit_order'), t('spotTrade.market_order'), t('spotTrade.stop_limit')];
});
export const statusArray = computed(() => {
  const { t } = useI18n();
  return [
    t('spotTrade.all'),
    t('spotTrade.unexecuted'),
    t('spotTrade.completely_executed'),
    t('spotTrade.partially_filled'),
    t('spotTrade.cancelled'),
    '--',
    '--',
    t('spotTrade.partially_cancelled'),
  ];
});
export const delegateSelection = computed(() => {
  const { t } = useI18n();
  return arrTransformObj([t('spotTrade.all'), t('spotTrade.limit_order'), t('spotTrade.market_order')]);
});
export const transactionSelection = computed(() => {
  const { t } = useI18n();
  return arrTransformObj([t('spotTrade.all'), t('spotTrade.buy'), t('spotTrade.sell')]);
});
export const tradedSelection = computed(() => {
  const { t } = useI18n();
  return arrTransformObj([
    t('spotTrade.all'),
    t('spotTrade.completely_executed'),
    t('spotTrade.partially_cancelled'),
    t('spotTrade.cancelled'),
  ]);
});
export const directionSendArray = ['BUY', 'SELL'];

function arrTransformObj(array: any): ArrTransformObjData[] {
  if (!array || !Array.isArray(array)) {
    return [];
  }
  return array.reduce((arr, item, index) => {
    arr.push({
      label: item,
      value: index,
    });
    return arr;
  }, []);
}
