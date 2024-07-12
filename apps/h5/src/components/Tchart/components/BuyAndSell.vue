<template>
  <div class="tv-buy-sell-bar" :style="{ left: `${props.x}px`, top: `${props.y}px` }">
    <div class="tv-buy-sell-header">
      <label class="tv-buy-sell-input">
        <span class="buy-sell-title">{{ getPriceLang(props.lang, data.order.unit) }} ({{ getUnit() }})</span>
        <input
          type="text"
          ref="input"
          :placeholder="props.lang?.numberPlaceholder"
          v-model="inputValue"
          @focus="() => setVisible(true)"
          @keydown.enter="createOrder(props.price > props.targetPrice ? ORDER_TYPE.BUY : ORDER_TYPE.SELL)"
        />
        <i class="tv-buy-sell-input-mini-tipsy" ref="miniTipsy">{{ props.lang?.tipsy.mini }} {{ data.order.minNum }} {{ getUnit() }}</i>
      </label>
      <div class="tv-buy-sell-state">
        <div class="tv-buy-sell-buy" v-if="props.price > props.targetPrice" @click="() => createOrder(ORDER_TYPE.BUY)">
          <span class="buy-sell-title">{{ props.lang?.limitBuy }}</span>
          <span class="buy-sell-value">{{ price }}</span>
        </div>
        <div v-else class="tv-buy-sell-sell" @click="() => createOrder(ORDER_TYPE.SELL)">
          <span class="buy-sell-title">{{ props.lang?.limitSell }}</span>
          <span class="buy-sell-value">{{ price }}</span>
        </div>
      </div>
    </div>
    <ul class="tv-buy-sell-scale" ref="footer">
      <li @click="() => setInput('10%')">10%</li>
      <li @click="() => setInput('20%')">20%</li>
      <li @click="() => setInput('50%')">50%</li>
      <li @click="() => setInput('100%')">100%</li>
    </ul>
  </div>
</template>

<script lang="ts" name="BuyAndSell" setup>
import { computed, inject, ref, watch } from 'vue';
import { MaybeRef, Order, OrderEmit } from '../interfaces';
import { toThousands, fillZero, getPriceLang, throttledClick } from '../utils/index';
import { ENTRUST_TYPE, EVENTS, ORDER_TYPE, WS_PRICES_CACHE_KEY, Unit } from '../constants';

const input = ref<HTMLElement | null>(null);
const footer = ref<HTMLElement | null>(null);
const miniTipsy = ref<HTMLElement | null>(null);
const inputValue = ref<string>('');
const props = defineProps({
  tvWidget: Object,
  lang: Object,
  price: {
    type: Number,
    default: 0
  },
  targetPrice: {
    type: Number,
    default: 0
  },
  x: Number,
  y: Number
});

const emitOrder = inject<OrderEmit>(EVENTS.ORDER);
const data: MaybeRef<any> = inject(WS_PRICES_CACHE_KEY);

// 界面上显示的价格
const price = computed(() => toThousands(fillZero(props.targetPrice?.toString() || '0', data.value.quotePrecision)));

// 监听用户输入控制界面上提示显示与隐藏
watch(
  () => inputValue.value,
  () => {
    if (!miniTipsy.value || !footer.value) return;

    if (!inputValue.value) {
      miniTipsy.value.style.display = 'block';
      footer.value.style.display = 'flex';
    } else if (inputValue.value >= data.value.order.minNum) {
      miniTipsy.value.style.display = 'none';
      // footer.value.style.display = 'none';
    } else {
      miniTipsy.value.style.display = 'block';
      footer.value.style.display = 'flex';
    }
  }
);

watch(
  () => [props.x, props.y],
  () => {
    inputValue.value = '';
    input.value?.focus();
  }
);

// 获取价格类型
const getUnit = () => ([Unit.quote, Unit.cost].includes(data.value.order.unit) ? data.value.quote : data.value.base);

// 设置状态与输入框获取焦点
const setInput = (val: string) => {
  inputValue.value = val;
  input.value?.focus();
};

// 设置tipsy组件显示
const setVisible = (visible: boolean) => {
  if (!miniTipsy.value || !footer.value) return;
  if (visible && inputValue.value.indexOf('%') === -1) {
    miniTipsy.value.style.display = 'block';
    footer.value.style.display = 'flex';
  } else {
    miniTipsy.value.style.display = 'none';
    // footer.value.style.display = 'none';
  }
};

// 点击买入卖出后事件回调
const createOrder = (side: string) =>
  throttledClick(() => {
    if (!inputValue.value) return;

    emitOrder?.({
      numVal: inputValue.value.toString(),
      base: data.value.base,
      quote: data.value.quote,
      type: ENTRUST_TYPE.LIMIT,
      side,
      price: fillZero(props.targetPrice?.toString() || '0', data.value.quotePrecision)
    } as Order);

    // 下单后清空输入
    setTimeout(() => {
      inputValue.value = '';

      if (!props.tvWidget) return;
      const { document } = props.tvWidget._iFrame.contentWindow;
      // 执行一次点击事件，关闭下单弹框
      if (document) document.dispatchEvent(new Event('click'));
    }, 500);
  });
</script>

<style lang="scss">
.tv-buy-sell-bar {
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-border-1);
  border-radius: 4px;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: unset;
  z-index: 5;
  user-select: none;

  .tv-buy-sell-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tv-buy-sell-buy {
      background-color: var(--tv-buy-color);
    }

    .tv-buy-sell-sell {
      background-color: var(--tv-sell-color);
    }

    .tv-buy-sell-state .tv-buy-sell-buy,
    .tv-buy-sell-state .tv-buy-sell-sell,
    .tv-buy-sell-input {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: white;
      width: 90px;
      height: 54px;
      font-size: 12px;
      line-height: 14px;
      cursor: pointer;

      & > span {
        margin: 2px 0;
      }
    }

    .tv-buy-sell-input {
      position: relative;
      min-width: 120px;
      padding: 0 5px;
      color: var(--color-text-1);
      border: 1px solid var(--color-bg-2);
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;

      &:focus,
      &:active,
      &:has(input:focus) {
        border-color: var(--color-text-1);
      }

      & input {
        outline: none;
        border: none;
        width: 100%;
        height: 20px;
        background-color: var(--color-bg-2);
        text-align: center;
        color: var(--color-text-1);
      }

      .tv-buy-sell-input-mini-tipsy {
        display: none;
        position: absolute;
        top: -50px;
        background-color: var(--color-bg-5);
        color: var(--color-text-1);
        padding: 12px;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
        width: auto;
        font-style: initial;
        white-space: nowrap;

        &::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid var(--color-bg-5);
          position: absolute;
          bottom: -8px;
          left: 45%;
          right: 50%;
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
  }

  .tv-buy-sell-scale {
    list-style: none;
    padding: 0;
    margin: 0;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 14px;
    display: none;
    align-items: center;
    justify-content: space-between;
    color: var(--color-text-2);
    transition: all 0.3s ease-in-out;

    & li {
      text-align: center;
      min-width: 30px;
      background-color: var(--color-bg-tag);
      padding: 2px 5px;
      margin: 0 2px;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover,
      &.active {
        background-color: var(--color-bg-6);
        color: var(--color-text-1);
      }
    }
  }
}
</style>
