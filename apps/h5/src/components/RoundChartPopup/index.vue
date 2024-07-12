<template>
  <span @click="onClick">
    <slot></slot>
  </span>
  <van-popup v-model:show="modalVisible" :style="{ width: '100%' }" round teleport="body">
    <div class="py-20 px-20 w-100% text-20">
      <div class="pb-20 text-20 text-#ffffff text-center">昨日收益</div>
      <div class="w-100% h-1 border border-#191919 border-solid"></div>
      <div class="mb-50 pt-10 text-20 text-#ffffff">昨日推广总收益</div>
      <div :id="props.chartId" class="w-100% h-269"></div>

      <div class="mt-50 flex">
        <img class="mr-10 w-21 h-21" :src="InfoGreen" alt="" />
        <span>推广收益包括直推收益，间推收益、团队收益（包含级差收益和平级收益）、平台分红，统计图表中只显示大于0的收益类别。</span>
      </div>
      <div class="mt-20 flex justify-center w-100%">
        <div class="mt-40 px-30 py-15 rounded-20 bg-#323232 text-#ea4b64 inline-block" @click="onClose">我知道了</div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
  import InfoGreen from '~/assets/images/info-green.png';
  import * as echarts from 'echarts';
  type EChartsOption = echarts.EChartsOption;

  interface IProps {
    chartId: string;
  }
  const props = withDefaults(defineProps<IProps>(), { chartId: '' });
  const modalVisible = ref(false);
  const chartRef = ref();
  const option: EChartsOption = ref({
    tooltip: {
      trigger: 'none', // 设置为 'none'，不触发 tooltip
    },
    legend: {
      right: '1%', // 将图例移到右边
      top: 'middle', // 设置图例垂直居中
      orient: 'vertical', // 设置图例垂直显示
      itemWidth: 5, // 设置图例项的宽度
      itemHeight: 5, // 设置图例项的高度
      itemShape: 'circle', // 将图例项的形状设置为圆点
      itemStyle: {
        borderWidth: 0, // 设置图例项的边框宽度为0，即去除边框
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['60%', '100%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderWidth: 0, // 设置饼状图的边框宽度为0，即去除边框
        },
        label: {
          show: true,
          position: 'inside', // 在内部显示 label
          formatter: '{c}', // 使用 '{c}' 来显示数值
          color: '#000000',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '直推收益', itemStyle: { color: '#ea4b64' } },
          { value: 735, name: '间推收益', itemStyle: { color: '#9CF25A' } },
          { value: 580, name: '团队收益', itemStyle: { color: '#649361' } },
          { value: 484, name: '平台分红', itemStyle: { color: '#2C565F' } },
        ],
      },
    ],
  });

  const onClick = () => {
    modalVisible.value = true;
  };

  const onClose = () => {
    modalVisible.value = false;
  };

  const initChart = async () => {
    console.log('initChart==>');
    const chartDom = document.getElementById(props.chartId)!;
    const myChart = echarts.init(chartDom);
    option.value && myChart.setOption(JSON.parse(JSON.stringify(option.value)));
  };

  watch(modalVisible, () => {
    if (!modalVisible.value) return;
    setTimeout(() => {
      initChart();
    }, 0);
  });
</script>
