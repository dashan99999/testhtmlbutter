import { useUserStore, useAppStore } from '#shared/store';

export default function useUser() {
  const userStore = useUserStore();
  const config = useRuntimeConfig();
  const route = useRoute();
  const token = useCookie(config.public.VITE_TOKEN);
  const logout = async (logoutTo?: string) => {
    useAppStore().setToPath({
      path: logoutTo,
      query: {
        ...route.query,
        redirect: route.name,
      },
    });
    await userStore.logout();
    token.value = '';
  };
  return {
    logout,
  };
}
