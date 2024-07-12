<template>
  <div
    class="bitunix-icon-loading"
    :class="props.iconClass"
    @mouseenter="handlePlay"
    @mouseleave="handleStop"
    ref="animation"
    :id="randomID"
    :style="{ width: px2rem(width), height: px2rem(height) }"
  ></div>
</template>

<script setup lang="ts">
  import * as iconSource from '@/assets/icons/json/icon-json';
  import lottie, { AnimationItem } from 'lottie-web';
  import { px2rem } from '@bitunix/shared/utils/methods';

  interface Props {
    width?: string;
    height?: string;
    iconClass?: string;
    autoplay?: boolean;
    jsonDataName?: string;
    speed?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    width: '30px',
    height: '30px',
    autoplay: true,
    speed: 1,
    jsonDataName: 'LOADING_PULL',
  });

  let lottieControl = ref<AnimationItem>();
  const animation = ref(null);
  const randomID: string = new Date().valueOf().toString();

  onMounted(() => {
    if (animation.value) {
      // lottie.loadAnimation的返回值是用来控制该动画的实例
      lottieControl.value = lottie.loadAnimation({
        // name是控制具体某一个动画的关键
        name: randomID,
        container: animation.value,
        renderer: 'svg',
        // 是否循环播放 默认为true,如果是false，每次启动播放，只会播放一次
        loop: true,
        // 是否在一开始就启动播放
        autoplay: props.autoplay,
        animationData: iconSource[props.jsonDataName],
      });
      // 比如来控制播放速度
      lottieControl.value.setSpeed(props.speed);
    }
  });
  const handlePlay = () => {
    if (!props.autoplay) {
      // 控制动画的播放
      lottieControl.value!.play(randomID);
    }
    // lottieControl.goToAndStop(props.jsonDataName)
  };

  const handleStop = () => {
    if (!props.autoplay) {
      // 停止播放
      lottieControl.value!.stop(randomID);
    }
  };
</script>

<style lang="less">
  .bitunix-icon-loading {
    cursor: pointer;
    display: inline-block;
  }

  .dx-icon-color-warpper {
    overflow: hidden;
    svg {
      overflow: hidden;
      transform: translate(0px, 10000px) !important;
    }
  }
</style>
