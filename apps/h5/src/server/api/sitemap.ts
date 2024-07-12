export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();
  try {
    const req = await fetch(`${config.public.VITE_BASE_URL}/web/api/v1/common/coin/list`);
    const data = await req.json();
    return data.data
      .map((p: any) => {
        return {
          loc: `/spot-trade/${p.name.toLocaleUpperCase()}USDT`,
          _i18nTransform: true,
        };
      })
      .concat([
        {
          loc: '/cms/agreement',
          _i18nTransform: true,
        },
        {
          loc: '/cms/privacy',
          _i18nTransform: true,
        },
      ]);
  } catch (e) {
    return [];
  }
});
