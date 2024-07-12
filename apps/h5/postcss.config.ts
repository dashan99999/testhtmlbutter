// import * as path from 'path';
export default {
  plugins: [
    require('autoprefixer')(),
    require('@jonny1994/postcss-px-to-viewport')({
      viewportWidth: 750,
      rules: [
        [
          /\/node_modules\/vant\//, // The regex or string of the path
          (_pixels, parsedVal, prop) => {
            if (prop.includes('font')) {
              return parsedVal * 2 + 'vmin';
            }
            return parsedVal * 2 + 'vw';
          },
        ],
      ],
    }),
  ],
};
