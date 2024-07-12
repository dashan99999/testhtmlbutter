/**
 * @description 模拟的react的useEffect
 * @param fn
 * @param deps
 */
export function useEffect(fn: () => void | (() => any), deps: any[] = []) {
  const resFn = ref(() => {});
  if (deps.length === 0) {
    onMounted(() => {
      const res = fn();
      if (typeof res === 'function') {
        resFn.value = res;
      } else {
        resFn.value = () => {};
      }
    });
  } else {
    watch(
      () => deps,
      () => {
        resFn.value();
        const res = fn();
        if (typeof res === 'function') {
          resFn.value = res;
        } else {
          resFn.value = () => {};
        }
      },
      { immediate: true, deep: true },
    );
  }
  onUnmounted(() => {
    resFn.value();
  });
}
