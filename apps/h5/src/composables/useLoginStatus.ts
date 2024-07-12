export function useLoginStatus() {
  const config = useRuntimeConfig();
  const token = useCookie(config.public.VITE_TOKEN);
  const isLogin = computed(() => !!token.value);
  return isLogin;
}
