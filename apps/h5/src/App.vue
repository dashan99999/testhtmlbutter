<template>
  <Html :bx-theme="theme" :class="{ fullscreen: route.meta.fullscreen, 'is-home': route.meta.script?.zendesk === 'home' }" />
  <Head>
    <Link rel="icon" href="/favico.ico" />
    <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <Meta name="screen-orientation" content="portrait" />
    <!-- Facebook  -->
    <Meta property="og:type" content="website" />
    <Meta property="og:title" content="Games" />
    <Meta property="og:description" content="Games" />
    <Meta property="og:url" content="https://www.bitunix.com/" />
    <Meta property="og:image" content="" />
    <Meta property="og:site_name" content="Games" />
    <!-- facebook end -->

    <!-- twitter code -->
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" content="Games" />
    <Meta name="twitter:description" content="Games" />
    <Meta name="twitter:site" content="@Games" />
    <Meta name="twitter:creator" content="@Games" />
    <Meta name="twitter:image" content="@Games" />
    <!-- twitter end -->

    <!-- canonical-start -->
    <Link rel="dns-prefetch" :href="ossHost" />
    <Link rel="preconnect" :href="ossHost" />
    <Link rel="dns-prefetch" :href="apiHost" />
    <Link rel="preconnect" :href="apiHost" />
    <Link rel="apple-touch-icon" sizes="192x192" :href="`${siteHost}/h5-static/icon-192.png`" />
    <Meta name="mobile-web-app-capable" content="yes" />
    <Meta name="apple-mobile-web-app-title" content="Games" />
    <Meta name="apple-mobile-web-app-status-bar-style" content="white" />
    <Meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />
    <Meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
    <Meta name="apple-mobile-web-app-capable" content="yes" />
    <Link rel="apple-touch-startup-image" :href="`${siteHost}/h5-static/startup.png`" />
    <!-- canonical-end -->

    <!-- GSC-start -->
    <Meta name="google-site-verification" content="NmUorWFbLfZ72pf09RcUaKc2HKEPV8VD2YcAqQeVRYk" />
  </Head>
  <Body :class="{ 'reset-overflow': APP_ROUTES.some((path) => $route.path.includes(path)) }">
    <NoScript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-5PTBB84"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></NoScript>
    <NoScript>
      <img
        fetchpriority="low"
        height="1"
        width="1"
        style="display: none"
        src="https://www.facebook.com/tr?id=306369658559649&ev=PageView&noscript=1"
      />
    </NoScript>
  </Body>
  <div class="h-full">
    <NuxtErrorBoundary @error="(e) => console.error(e)">
      <NuxtLayout>
        <NuxtLoadingIndicator color="#ea4b64" />
        <VitePwaManifest />
        <NuxtPage
          :transition="transitionHook"
          :page-key="(route) => (route.fullPath.includes('/spot-trade/') ? 'spot-trade' : route.fullPath)"
        />
      </NuxtLayout>
    </NuxtErrorBoundary>
  </div>
</template>
<script setup lang="ts">
  import { useUserStore, useAppStore, useMarketStore, useRateStore } from '@bitunix/shared/store';
  import { useProviderExchangeWebSocket, useProviderFutureWebSocket } from '@bitunix/shared/hooks/websocket';
  import { getBaseConfig, getFooterList, getMediaList } from '@bitunix/shared/api/app';
  import { SEOHEAD } from '@bitunix/shared/constants/seoConfig';
  import { APP_ROUTES } from '@bitunix/shared/constants';
  import { setRootFontSize } from '@bitunix/shared/utils/tools';

  import 'swiper/css';
  import 'swiper/css/pagination';

  const apiHost = import.meta.env.VITE_BASE_URL;
  const ossHost = import.meta.env.VITE_OSS_HOST;
  const siteHost = import.meta.env.VITE_HOST;
  const { finalizePendingLocaleChange, locale } = useI18n();
  const userStore = useUserStore();
  const appStore = useAppStore();
  const marketStore = useMarketStore();
  const rateStore = useRateStore();
  const config = useRuntimeConfig();
  const token = useCookie(config.public.VITE_TOKEN);
  const { theme } = toRefs(appStore);
  const route = useRoute();
  await useLazyAsyncData(
    'footerData',
    async () => {
      const footerList = await getFooterList();
      const mediaList = await getMediaList();
      return { footerList: footerList.data ?? [], mediaList: mediaList.data ?? [] };
    },
    { watch: [locale] },
  );

  const init = async () => {
    if (token.value && !userStore.id) {
      userStore.info();
    }
    // marketStore.preparationSpotData = false;
    // const { data, code } = await getBaseConfig();
    // if (code === '0') {
    //   appStore.languages = data.languageList;
    //   appStore.setPublicInfo(data.publicInfo, data.withDrawLimit);
    //   rateStore.$patch((state) => {
    //     state.rateList = data.rateList;
    //     state.currencyRateList = data.rateCurrency;
    //   });
    //   const cl = data.coinPairList.map((item) => ({
    //     ...item,
    //     symbol: (item.base + item.quote).toUpperCase(),
    //   }));
    //   marketStore.separateSetSymbolListFun(cl);
    //   marketStore.$patch((state) => {
    //     state.coinSymbolList = data.coinSymbolList;
    //     state.coinSymbolSort = data.coinSymbolSort;
    //     state.fiatList = data.fiatList;
    //     state.futureCoinSymbolList = data.futureCoinSymbolList;
    //     state.futureSymbolList = data.futureSymbolList;
    //     state.preparationSpotData = true;
    //   });
    // } else {
    //   marketStore.preparationSpotData = true;
    // }
  };

  if (process.client) {
    init();
  }

  const i18nHead = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
  });
  const meta = computed(
    () =>
      SEOHEAD[(typeof route.name === 'string' ? route.name : 'index').replace(/_[_\-\w\W]+$/gm, '') as keyof typeof SEOHEAD] ??
      SEOHEAD['index'],
  );
  useHead({
    title: meta.value.title,
    htmlAttrs: {
      lang: i18nHead.value.htmlAttrs!.lang ?? '',
    },
    meta: [...(i18nHead.value.meta || []), ...meta.value.meta],
    link: [...(i18nHead.value.link || [])],
  });
  useHead({
    script: [
      {
        children: `
          var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          var isMainSite = /^www/.test(location.host);
          var locales = ${JSON.stringify(config.public.VITE_LOCALE_OPTIONS)};
          var appRoutes = ${JSON.stringify(APP_ROUTES)};
          if (/^(www|m)\./.test(location.host)) {
            if (isMobile && isMainSite) {
              location.href = location.href.replace(location.host, location.host.replace('www.', 'm.'));
            } else if (!isMobile && !isMainSite) {
              var href = location.href.replace(location.host, location.host.replace('m.', 'www.'));
              var locale = locales.find(function(it){ return href.includes('/'+it)});
              if (locale) {
                href = href.replace('/'+locale, '');
              }
              location.href = href;
            }
          }
            function getCookie(cname){
              var name = cname + "=";
              var ca = document.cookie.split(';');
              for(var i=0; i<ca.length; i++)
              {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
              }
              return "";
            }
            var isWebview = appRoutes.some(function(r) {
              return location.pathname.includes(r) && !location.pathname.includes('/browser');
            });
            if (!isWebview) {
              var cacheLocale = getCookie('${config.public.VITE_CACHE_LANG}');
              var browserLocale = navigator.language.toLowerCase();
              if (browserLocale) {
                browserLocale = browserLocale.replace('_', '-');
              }
              if (!cacheLocale && browserLocale && locales.includes(browserLocale)) {
                var currentLocale = locales.find(function(it){ return location.pathname.includes('/'+it)}) || 'en-us';
                if (currentLocale !== browserLocale) {
                  if (currentLocale === 'en-us') {
                    location.href = location.origin + '/' + browserLocale + location.pathname + location.search;
                  } else if (browserLocale === 'en-us') {
                    location.href = location.origin + location.pathname.replace('/'+currentLocale, '') + location.search;
                  } else {
                    location.href = location.origin + location.pathname.replace('/'+currentLocale, '/'+browserLocale) + location.search;
                  }
                }
              }              
            }
            var localeTheme = localStorage.getItem('h5-theme');
            if (localeTheme) {
              var theme = JSON.parse(localeTheme);
              theme.theme && document.getElementsByTagName('html')[0].setAttribute('bx-theme', theme.theme);
            }
          `,
      },
      {
        type: 'application/ld+json',
        id: 'schemaMarkup',
        body: true,
        children: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Professional Crypto Derivatives Exchange | Games",
              "url": "https://www.bitunix.com/",
              "publisher": {
                "@type": "Organization",
                "name": "Professional Crypto Derivatives Exchange | Games",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://uccex.oss-ap-southeast-1.aliyuncs.com/system/logo.png",
                  "width": "",
                  "height": ""
                }
              },
              "description": "Games",
              "image": {
                "@type": "ImageObject",
                "url": "https://uccex.oss-ap-southeast-1.aliyuncs.com/system/banner.png"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.bitunix.com/"
              },
              "sameAs": [
                "https://www.facebook.com/people/Bitunixofficial/100087631631562/",
                "https://twitter.com/bitunix",
                "https://www.linkedin.com/company/bitunix-innovation-limited/",
                "https://www.youtube.com/@bitunix.official",
                "https://t.me/bitunixglobal",
                "https://apps.apple.com/app/id6446243957?platform=iphone",
                "https://play.google.com/store/apps/details?id=io.bitunix.android"
              ]
            }
            `,
      },
      {
        defer: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-5LMCK62GGM',
        body: true,
      },
      {
        defer: true,
        body: true,
        children: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-5LMCK62GGM");
          `,
      },
      {
        defer: true,
        body: true,
        children: `
                (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-5PTBB84');
          `,
      },
      {
        defer: true,
        body: true,
        children: `
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','ofys2');
          `,
      },
      {
        defer: true,
        body: true,
        children: `
          <!-- Meta Pixel Code -->
            !(function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '306369658559649');
            fbq('track', 'PageView');
          <!-- End Meta Pixel Code -->
          `,
      },
    ] as any,
  });
  if (process.client) {
    useProviderExchangeWebSocket();
    useProviderFutureWebSocket();
  }
  const onBeforeEnter = async () => {
    await finalizePendingLocaleChange();
  };
  const { transing } = useTransState();
  const transitionHook = {
    onBeforeEnter,
    onAfterEnter: () => {
      transing.value = false;
    },
    onEnterCancelled: () => {
      transing.value = false;
    },
    onBeforeLeave: () => {
      transing.value = true;
    },
  };
  useGt4();
  useZendesk();
</script>
