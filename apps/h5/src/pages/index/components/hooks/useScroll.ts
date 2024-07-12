import { Ref } from 'vue';

interface Params {
  target: number; // 滚动的目标距离
}
export const useScroll = (p: Params) => {
  const scrollDistance = inject<Ref<number>>('scrollDistance') as Ref<number>;
  const containerHeight = inject<Ref<number>>('containerHeight') as Ref<number>;
  const isTouch = ref(false);
  const canChange = ref(true);
  watch(
    () => scrollDistance.value,
    (v: number) => {
      if (v + containerHeight.value >= p.target && canChange.value) {
        nextTick(() => {
          isTouch.value = true;
          canChange.value = false;
        });
      }
    },
    {
      immediate: true,
    },
  );

  return { isTouch };
};
