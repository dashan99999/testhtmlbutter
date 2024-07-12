<template>
  <ProPopup
    v-model:show="show"
    :title="$t('common.time')"
    height="auto"
    :show-close="props.showClose"
    :text="text"
    :largeSize="props.largeSize"
    :borderBottom="props.borderBottom"
    :marginBottom="props.marginBottom"
  >
    <div class="p-l30">
      <span class="color-text-1">{{ startDate.join('-') }}</span>
      <span class="color-text-2 m-l16 m-r16">{{ $t('common.to') }}</span>
      <span class="color-text-1">{{ endDate.join('-') }}</span>
    </div>
    <template #popup>
      <div class="flex items-center justify-between p-[0,30] wrap">
        <div
          class="fs-28 color-text-2 flex-1 flex items-center justify-center bx-bg-bg-interactive b-r10 h-60"
          :class="{ active: step === 'start' }"
          @click="step = 'start'"
          >{{ startDateValue.join('-') }}</div
        >
        <div class="w-120 flex items-center justify-center fs-28 color-text-2">{{ $t('common.to') }}</div>
        <div
          class="fs-28 color-text-2 flex-1 flex items-center justify-center text-center bx-bg-bg-interactive b-r10 h-60"
          :class="{ active: step === 'end' }"
          @click="step = 'end'"
          >{{ endDateValue.join('-') }}</div
        >
      </div>
      <div class="p-40 box-border picker relative">
        <TransitionGroup mode="out-in" name="fade" tag="div">
          <div class="date-picker" v-if="step === 'start'">
            <van-date-picker :visible-option-num="5" :show-toolbar="false" v-model="startDateValue" :max-date="maxDate" />
          </div>
          <div class="date-picker" v-if="step === 'end'">
            <van-date-picker :min-date="minDate" :max-date="maxDate" :visible-option-num="5" :show-toolbar="false" v-model="endDateValue" />
          </div>
        </TransitionGroup>
      </div>
      <div class="flex items-center justify-between p-l30 p-r30 p-b64" v-if="showConfirm">
        <div class="w-full">
          <van-button plain block type="primary" @click="reset">{{ $t('common.reset') }}</van-button>
        </div>
        <div class="w-full m-l24">
          <van-button block type="primary" @click="confirm">{{ $t('common.query') }}</van-button>
        </div>
      </div>
    </template>
    <slot></slot>
    <template #extra v-if="!showConfirm">
      <IconFont @click="handleConfirm" name="choose_single" class="fs-32 bx-color-primary-color m-r48" />
    </template>
    <template #close>
      <IconFont v-show="props.showClose" name="close2" class="color-text-1 fs-32" @click="handleClose" />
    </template>
  </ProPopup>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  type Props = {
    show?: boolean;
    startDate?: string[];
    endDate?: string[];
    showClose?: boolean;
    showConfirm?: boolean;
    range?: number;
    validator?: (startDate: string[], endDate: string[]) => boolean;
    largeSize?: boolean;
    borderBottom?: boolean;
    marginBottom?: boolean;
  };
  const props = withDefaults(defineProps<Props>(), {
    show: false,
    showClose: true,
    showConfirm: false,
    largeSize: false,
    borderBottom: false,
    range: 30,
  });
  const { t } = useI18n();
  const defaultStartDate = computed(() =>
    dayjs()
      .subtract(props.range - 1, 'days')
      .format('YYYY-MM-DD')
      .split('-'),
  );
  const defaultEndDate = dayjs().format('YYYY-MM-DD').split('-');
  const emits = defineEmits(['update:show', 'update:startDate', 'update:endDate', 'confirm', 'update:range']);
  const show = useControlableValue(props, emits, { valueKey: 'show', default: false });
  const range = useControlableValue(props, emits, { valueKey: 'range', default: 30 });
  const startDate = useControlableValue(props, emits, { valueKey: 'startDate', default: defaultStartDate.value });
  const endDate = useControlableValue(props, emits, { valueKey: 'endDate', default: defaultEndDate });
  const startDateValue = ref(startDate.value);
  const endDateValue = ref(endDate.value);
  const minDate = computed(() => {
    return dayjs(startDateValue.value.join('/')).toDate();
  });
  const maxDate = dayjs().toDate();
  const text = computed(() => {
    return `${startDate.value.join('-')} ${t('common.to')} ${endDate.value.join('-')}`;
  });
  const step = ref<'start' | 'end'>('start');
  const confirm = () => {
    if (props.validator) {
      const result = props.validator(startDateValue.value, endDateValue.value);
      if (!result) {
        return;
      }
    }
    show.value = false;
    startDate.value = startDateValue.value;
    endDate.value = endDateValue.value;
    emits('confirm', [startDateValue.value, endDateValue.value]);
  };
  const reset = () => {
    startDateValue.value = defaultStartDate.value;
    endDateValue.value = defaultEndDate;
  };
  const handleConfirm = () => {
    if (step.value === 'start') {
      step.value = 'end';
    } else {
      confirm();
    }
  };
  const handleClose = () => {
    if (props.validator) {
      const result = props.validator(startDateValue.value, endDateValue.value);
      if (!result) {
        reset();
      }
    }
    show.value = false;
  };
  const [startRangeWatch, stopRangeWatch] = useWatch(
    () => range.value,
    (v) => {
      if (v !== 0) {
        stopDateWatch();
        startDate.value = dayjs()
          .subtract(range.value - 1, 'days')
          .format('YYYY-MM-DD')
          .split('-');
        endDate.value = dayjs().format('YYYY-MM-DD').split('-');
        nextTick(() => {
          startDateWatch();
        });
      }
    },
  );
  const [startDateWatch, stopDateWatch] = useWatch(
    () => [startDate.value, endDate.value],
    () => {
      stopRangeWatch();
      const d = dayjs(endDate.value.join('/')).diff(startDate.value.join('/'), 'day');
      range.value = d + 1;
      nextTick(() => {
        startRangeWatch();
      });
    },
  );
  watch(
    () => show.value,
    (v) => {
      if (v) {
        startDateValue.value = startDate.value;
        endDateValue.value = endDate.value;
      }
    },
  );
  startDateWatch();
  startRangeWatch();
</script>

<style scoped lang="less">
  .active {
    color: #ea4b64;
  }
  .picker {
    :deep(.van-picker-column__item--selected) {
      border-top: 1px solid var(--bx-border-color);
      border-bottom: 1px solid var(--bx-border-color);
    }
    :deep(.van-picker-column__item) {
      font-size: 30px;
    }
    height: 574px;
    overflow: hidden;
  }
</style>
