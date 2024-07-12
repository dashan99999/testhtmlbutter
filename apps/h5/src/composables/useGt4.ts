import { useScriptTag } from '@vueuse/core';
export function useGt4() {
  const { load } = useScriptTag('/externals/gt4.js', () => {}, { defer: true, immediate: false, async: false });
  const route = useRoute();
  if (process.client) {
    watch(
      () => route.path,
      () => {
        const config = route.meta.script?.gt4;
        if (config === undefined || config === true) {
          load();
        }
      },
      {
        immediate: true,
      },
    );
  }
}
