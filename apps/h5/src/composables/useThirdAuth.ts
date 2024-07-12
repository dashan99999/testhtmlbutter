export function useThirdAuth() {
  useHead({
    script: [
      {
        defer: true,
        body: true,
        children: `
        (function (d, s, id) {
          var js;
          var fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
        `,
      },
      {
        defer: true,
        type: 'text/javascript',
        src: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
        body: true,
      },
    ] as any,
  });
}
