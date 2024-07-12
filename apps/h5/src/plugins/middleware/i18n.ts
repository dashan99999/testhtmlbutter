const i18nResources = import.meta.glob('~/assets/locale/**/*.json');
const langsCache: Record<string, boolean> = {};
export default defineNuxtRouteMiddleware(async (to) => {
  const { $i18n } = useNuxtApp();
  const { namespace } = to.meta;
  let namespaces: string[] = ['common'];
  if (namespace) {
    namespaces = [...namespaces, ...(Array.isArray(namespace) ? namespace : [namespace])];
  }

  const locale = toValue($i18n.locale);
  const locales = Array.from(new Set(['en-us', locale]));
  for (const name of namespaces) {
    for (const langLocale of locales) {
      const cacheKey = `${langLocale}/${name.replace('.', '/')}`;
      if (!langsCache[cacheKey]) {
        for (const key in i18nResources) {
          if (key.includes(cacheKey)) {
            const message: any = await i18nResources[key]();
            langsCache[cacheKey] = true;
            const json: Record<string, string> = {};
            for (const lkey in message.default) {
              json[`${name}.${lkey}`] = message.default[lkey];
            }
            $i18n.mergeLocaleMessage(langLocale, json);
            break;
          }
        }
      }
    }
  }
});
