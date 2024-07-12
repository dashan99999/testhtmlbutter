import type { WatchOptions } from 'vue';

export function useTransState() {
  const transing = useState('transition-state', () => false);
  const resolving = useState('suspense-resolve', () => false);
  return { resolving, transing };
}
export function onSafeMounted(callback: () => void) {
  const exced = ref(false);
  const { transing, resolving } = useTransState();
  watch(
    () => [transing.value, resolving.value],
    ([t, r]) => {
      if (!t && !r && !exced.value && process.client) {
        exced.value = true;
        nextTick(() => {
          callback();
        });
      }
    },
    {
      immediate: true,
    },
  );
}

export function watchWithTransitionEnd<T = any>(
  deps: () => T,
  callback: (newData: T, oldData: T) => void,
  opts?: WatchOptions & { once?: boolean },
) {
  const { transing, resolving } = useTransState();
  const depArr = computed(() => {
    const value = deps();
    return Array.isArray(value) ? value : [value];
  });
  const tick = ref(false);
  if (process.client) {
    watch(
      () => [transing.value, resolving.value, ...depArr.value],
      ([isTransition, isResolve, ...rest], old) => {
        if (!isTransition && !isResolve) {
          if (opts?.once && tick.value) {
            return;
          }
          const [_, ...oldRest] = old ?? [];
          nextTick(() => {
            callback((rest.length > 1 ? rest : rest[0]) as T, oldRest as T);
          });
          tick.value = true;
        }
      },
      opts,
    );
  }
}
