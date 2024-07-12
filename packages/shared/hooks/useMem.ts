import { Ref, ref } from 'vue';
export function useMem<T = any>(func: () => T, deps: any[]): Ref<T | null> {
  const result: Ref<T> = ref<T | any>(null);
  watch(
    () => deps,
    () => {
      result.value = func();
    },
    { immediate: true, deep: true },
  );
  return result;
}
