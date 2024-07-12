import { useLocalStorage } from '@vueuse/core';
type QueryType = { vipcode?: string; invitecode?: string };
type LocalQuery = QueryType & { viptime?: string | number; invitime?: string | number };

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client) {
    const currentQuery: Record<string, any> = {};
    const cache = useLocalStorage<LocalQuery>('register_code', {});
    for (const key in to.query ?? {}) {
      const formatKey = key.toLocaleLowerCase();
      if (['vipcode', 'invitecode', 'first'].includes(formatKey)) {
        currentQuery[formatKey] = to.query[key];
      }
    }
    if (currentQuery.vipcode && !currentQuery.first) {
      cache.value = {
        vipcode: currentQuery.vipcode,
        viptime: new Date().getTime(),
      };
    }
    if (currentQuery.invitecode && !currentQuery.first) {
      cache.value = {
        invitecode: currentQuery.invitecode,
        invitime: new Date().getTime(),
      };
    }
    const query: QueryType = {};
    if (Object.keys(currentQuery).length === 0 && Object.keys(cache.value).length > 0) {
      const { vipcode, viptime, invitecode, invitime } = cache.value;
      const nowTime = new Date().getTime();
      const expir = 3600 * 3 * 1000;
      if (vipcode && viptime) {
        if (nowTime - new Date(viptime).getTime() <= expir) {
          query['vipcode'] = vipcode;
        }
      }
      if (invitecode && invitime) {
        if (nowTime - new Date(invitime).getTime() <= expir) {
          query['invitecode'] = invitecode;
        }
      }
      if (Object.keys(query).length > 0) {
        return navigateTo({
          path: to.path,
          query: { ...to.query, ...query, first: 'true' },
        });
      }
    }
  }
});
