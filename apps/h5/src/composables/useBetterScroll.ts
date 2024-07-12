import BScroll from '@better-scroll/core';
import type { Options, BScrollInstance } from '@better-scroll/core';
import type { Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import Slide from '@better-scroll/slide';
import MouseWheel from '@better-scroll/mouse-wheel';

interface CustomOptions extends Options {
  onCreated?: (instance: BScrollInstance) => void;
}

if (process.client) {
  BScroll.use(Slide as any);
  BScroll.use(MouseWheel as any);
}

export function useBetterScroll(el: Ref<HTMLElement | undefined>, opts?: CustomOptions) {
  const instance = ref<BScrollInstance>();
  const children = ref<HTMLElement>();
  const { onCreated, ...options }: CustomOptions = Object.assign(
    {
      scrollY: true,
      click: true,
      tap: 'tap',
      probeType: 0,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300,
      },
    },
    opts,
  );
  const { stop } = useResizeObserver(children, () => {
    instance.value?.refresh();
  });
  const init = () => {
    if (el.value) {
      instance.value?.destroy();
      instance.value = new BScroll(el.value!, options);
      onCreated && onCreated(instance.value);
    }
  };
  const destroy = () => {
    instance.value?.destroy();
  };
  onSafeMounted(() => {
    init();
  });
  watch(
    () => el.value,
    () => {
      children.value = (el.value?.children?.[0] ?? null) as HTMLElement;
    },
  );
  onUnmounted(() => {
    stop();
    instance.value?.destroy();
  });
  return { instance, init, destroy };
}
