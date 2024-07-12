import { useRouter } from 'vue-router';

export function useQueryParam<Q>(defaultQuery: Q) {
  const query = ref<Q>(defaultQuery);
  const router = useRouter();
  watch(
    () => [router.currentRoute],
    () => {
      // @ts-ignore
      query.value = Object.assign({}, defaultQuery, router.currentRoute.value.query) as Q;
    },
    { immediate: true, deep: true },
  );
  const changeQuery = (param: { [key: string]: string }) => {
    console.log(Object.assign({}, query.value, param));
    navigateToLocale({ path: router.currentRoute.value.path, query: Object.assign({}, query.value, param) });
  };
  return {
    query,
    changeQuery,
  };
}
