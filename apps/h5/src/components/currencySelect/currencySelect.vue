<template>
  <div ref="currencySelect" class="select_box currency_select_box" id="currency_select_box">
    <img :src="defaultLogo" style="width: 0; height: 0; opacity: 0" />
    <a-select
      class="currency_select_log"
      v-model="theSymbol"
      value-key="name"
      :style="{ width: '100%' }"
      allow-search
      @change="checkCurrency"
      :show-extra-options="false"
      :loading="selectLoading"
      :popup-container="currencySelect"
      :placeholder="$t('assets.recharge.selectCoin')"
    >
      <template #label="{ data }">
        <span class="select_input">
          <img class="input_icon" :src="showSymbol?.logo" :onerror="`onerror=null;src='${defaultLogo}'`" />
          {{ data?.label }}
        </span>
      </template>
      <a-option v-for="item in exchangeData" :key="item.name" class="log_body_item" :value="item">
        <template v-if="isOptionShow(item)">
          <img class="list_coin_logo" :src="item.logo || defaultLogo" :onerror="`onerror=null;src='${defaultLogo}'`" />
          <span class="coin_name b-8-cl">{{ item.name }}</span>
          <!-- <span class="coin_full_name">{{ item.exchange_symbol }}</span> -->
          <div v-if="props.type !== 'recharge'" class="coin_balance">
            <template v-if="Number(item.balance) > 0">
              <p class="balance_money b-8-cl">{{ item.balance }}</p>
              <!-- <p class="balance_rate"><GlobalRate :value="item.balance" :precision="item.precision" /></p> -->
              <p class="balance_rate"><GlobalRate :value="item.balance!" :precision="getShowPrecision(item.name, 2)" /></p>
            </template>
            <template v-else>
              <p class="balance_money balance_money_none b-8-cl">0</p>
            </template>
          </div>
        </template>
      </a-option>
    </a-select>
    <div v-if="props.hotList && hotList.length" class="hot_currency_list">
      <template v-for="(item, index) in hotList">
        <a-button v-if="index < 4" :key="item.name" class="hot_currency_btn" size="small" @click="checkCurrency(item)">
          {{ item.name }}
        </a-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import defaultLogo from '@/assets/images/defaultCurrency.png';
  import {
    getAccountBalance,
    SymbolByTypeRes,
    /* NewWorksListType, */ symbolBalance,
    BalanceType,
    getCoinNetwork,
  } from '@bitunix/shared/api/assets';
  import { fixD } from '@bitunix/shared/utils/maths';
  import { getShowPrecision } from '@bitunix/shared/hooks/getSymbolInfo';

  interface Props {
    type?: 'withdraw' | 'recharge';
    symbol?: string;
    whiteList?: string[]; // ['USDT', 'BTC', 'ETH']
    hotList?: boolean; // 是否展示热门币种列表
  }
  const props = withDefaults(defineProps<Props>(), {
    type: undefined,
    symbol: '',
    hotList: true,
  });
  const currencySelect = ref();

  // 币种选择
  const showSymbol = ref<SymbolByTypeRes>(); // 当前选择币种的详细信息
  const theSymbol = ref(''); // 当前选择的币种
  const selectLoading = ref(false); // 选择框加载状态
  const emit = defineEmits(['select']);
  const checkCurrency: any = async (item: SymbolByTypeRes) => {
    const netConfig = await getCoinNetwork({ coin: item.name });
    const data: SymbolByTypeRes = JSON.parse(JSON.stringify(item));
    showSymbol.value = data;
    theSymbol.value = data.name;
    emit('select', data, netConfig.networks);
  };

  const exchangeData = ref<SymbolByTypeRes[]>([]);
  const hotList = ref<SymbolByTypeRes[]>([]);
  const balanceConfig = ref<{ [x: string]: BalanceType }>({});
  // 获取币种选择列表
  const getBalance = async () => {
    selectLoading.value = true;
    let data = await getAccountBalance();
    selectLoading.value = false;
    let symbol: SymbolByTypeRes | null = null;
    let list = data;
    // 匹配白名单
    if (props.whiteList && props.whiteList.length) {
      list = list.filter((item) => {
        return props.whiteList?.indexOf(item.name) !== -1;
      });
    }
    const hot: SymbolByTypeRes[] = [];
    // 添加币种余额以及汇率转换金额
    list.forEach((e) => {
      const showPrecision = getShowPrecision(e.name, 8);
      const thisBalance = balanceConfig.value[e.name];
      // 当前币种可用余额存在且大于0
      if (thisBalance && thisBalance.normalBalance) {
        e.balance = fixD(thisBalance.normalBalance, showPrecision);
      } else {
        e.balance = '0.00';
      }
      if (e.name === props.symbol) {
        symbol = e;
      }
      if (e.isHot) {
        hot.push(e);
      }
    });
    // 根据币种余额排序
    list.sort((a, b) => {
      return Number(b.balance) - Number(a.balance);
    });
    exchangeData.value = list;
    hotList.value = hot.sort((a, b) => {
      return Number(a.sort) - Number(b.sort);
    });
    if (symbol) checkCurrency(symbol);
  };
  // 分币种查询用户余额
  const getBalanceNum = async () => {
    let { code, data } = await symbolBalance();
    if (String(code) === '0') {
      const obj: { [x: string]: BalanceType } = {};
      data.forEach((e) => {
        obj[e.coin] = e;
      });
      balanceConfig.value = obj;
    }
  };
  const isOptionShow = (item: SymbolByTypeRes) => {
    if (props.type === 'withdraw') {
      let type = 0;
      if (balanceConfig.value[item.name]) {
        type = balanceConfig.value[item.name].withdrawOpen;
      } else {
        type = item.withdrawOpen;
      }
      return !!type;
    } else if (props.type === 'recharge') {
      let type = 0;
      if (balanceConfig.value[item.name]) {
        type = balanceConfig.value[item.name].depositOpen;
      } else {
        type = item.depositOpen;
      }
      return !!type;
    } else {
      return true;
    }
  };

  onMounted(() => {
    getBalanceNum();
    getBalance();
  });
</script>

<style lang="less" scoped>
  #currency_select_box,
  .currency_select_box {
    position: relative;
  }
  .select_input {
    display: flex;
    align-items: center;
    .input_icon {
      width: 22px;
      display: block;
      margin-right: 8px;
    }
  }
  .log_body_item {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 44px;
    cursor: pointer;
    user-select: none;
    // &:hover {
    //   background: var(--color-bg-3);
    // }
    .list_coin_logo {
      position: absolute;
      top: 10px;
      left: 20px;
      width: 16px;
      height: 16px;
    }
    .coin_name {
      font-size: 14px;
    }
    .coin_balance {
      position: absolute;
      top: 0;
      right: 22px;
      text-align: right;
      .balance_money {
        font-size: 14px;
        height: 18px;
        line-height: 20px;
      }
      .balance_money_none {
        height: 36px;
        line-height: 36px;
      }
      .balance_rate {
        color: var(--color-text-2);
        font-size: 12px;
        height: 16px;
        line-height: 12px;
      }
    }
  }
  .hot_currency_list {
    margin-top: 10px;
    .hot_currency_btn {
      height: 30px;
      padding: 0 10px;
      margin-right: 10px;
    }
  }
</style>
