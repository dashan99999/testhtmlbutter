import type { WatchSource, WatchCallback, WatchOptions } from 'vue';
export function useWatch(target: WatchSource, callback: WatchCallback, options?: WatchOptions) {
  const state = reactive<{ stop: null | (() => void) }>({ stop: null });
  const start = () => {
    if (!state.stop) {
      state.stop = watch(target, callback, options);
    }
  };
  const stop = () => {
    state.stop?.();
    state.stop = null;
  };
  return [start, stop];
}
