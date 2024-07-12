const transformLocale = (locale: string) => {
  return locale
    .split('-')
    .map(function (it, index) {
      return index === 1 ? it.toLocaleUpperCase() : it;
    })
    .join('-');
};
const setZendeskLocale = (locale: string) => {
  if (typeof window !== undefined && window.zE) {
    window.zE('messenger:set', 'locale', transformLocale(locale));
  }
};

export function useZendeskScript() {
  const runtimeConfig = useRuntimeConfig();
  useHead({
    script: [
      {
        body: true,
        children: `
          function zdeskOnload() {
            var pathname = location.pathname;
            var locales = ${JSON.stringify(runtimeConfig.public.VITE_LOCALE_OPTIONS)};
            var current = locales.find(function(item){ return pathname.startsWith('/'+ item)});
            var locale = current ? current : 'en-us';
            if (window.zE) {
              zE('messenger:set', 'locale', locale.split('-').map(function(item, index){ return index === 1 ? item.toLocaleUpperCase() : item}).join('-'));
            }
          }
        `,
      },
      {
        defer: true,
        async: false,
        src: 'https://static.zdassets.com/ekr/snippet.js?key=73d65c47-d016-40d3-9aae-6d962989226e',
        id: 'ze-snippet',
        body: true,
        onload: `zdeskOnload()`,
      } as any,
    ],
  });
}

export function useZendesk() {
  const { locale } = useI18n();
  const route = useRoute();
  watch(
    () => route.path,
    () => {
      const show = route.meta.script?.zendesk;
      if (process.client) {
        if ((window as any).zEACLoaded) {
          window.zE?.('messenger', show ? 'show' : 'hide');
        }
      }
    },
    { immediate: true },
  );
  watch(
    () => locale.value,
    () => {
      setZendeskLocale(locale.value);
    },
  );
}
