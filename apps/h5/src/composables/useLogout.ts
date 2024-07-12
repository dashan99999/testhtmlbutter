import { useUserStore } from '#shared/store';
import { useToken } from '@bitunix/shared/utils/auth';
import type { RouteLocationRaw } from 'vue-router';

export function useLogout() {
  const token = useToken();
  const userStore = useUserStore();
  return (redirect?: RouteLocationRaw) => {
    userStore.$reset();
    token.value = '';
    navigateToLocale(redirect || '/login');
  };
}
