import { useUserStore, useMarketStore, useRateStore } from '#shared/store';

// 获取用户安全验证等级 1 低   2 中    3 高
function getUserSecurity(num = 0) {
  const userStore = useUserStore();
  // num 假设开启某项安全验证后，能够增加的分数
  // 安全验证等级分  谷歌2分 邮箱、手机号1.5分
  const google = Number(userStore.googleAuthenticatorStatus) === 1 ? 2 : 0;
  const email = Number(userStore.emailAuthenticatorStatus) === 1 ? 1.5 : 0;
  const phone = Number(userStore.mobileAuthenticatorStatus) === 1 ? 1.5 : 0;
  /*
    全都开了  5 = 高
    只有一种没开
    3.5 = 高
    3 = 中
    只开了1种 低
  */
  const code = google + email + phone + num;
  if (code <= 2) {
    return 1;
  } else if (code === 3) {
    return 2;
  } else {
    return 3;
  }
}

// 获取币种图标
function getIcon(symbol: string, defaultLogo: any) {
  const marketStore = useMarketStore();
  const obj = marketStore.futureSymbolList.find((e) => {
    return e.coinSymbol === symbol;
  });
  return obj?.icon || defaultLogo;
}

// 获取币种全称
function getFullName(symbol: string) {
  const marketStore = useMarketStore();
  const obj = marketStore.coinSymbolList.find((e) => {
    return e.name === symbol;
  });
  return obj?.fullName || '';
}

// 获取币种展示精度 symbol=USDT  num:获取不到精度时的值，默认为8
function getShowPrecision(symbol: string, num = 8) {
  const marketStore = useMarketStore();
  const obj = marketStore.coinSymbolList.find((e) => {
    return e.name === symbol;
  });
  return obj?.precision || num;
}

// 获取法币展示精度 num:获取不到精度时的值，默认为2
function getRatePrecision(num = 2, coin?: string) {
  const rateStore = useRateStore();
  const marketStore = useMarketStore();
  const obj = marketStore.fiatList?.find((e) => {
    return e.countryCoin === rateStore.quoteSymbol;
  });
  let rate = num;
  if (obj?.currencyPrecisions) {
    const children = obj?.currencyPrecisions.find((e) => {
      return e.coinSymbol === coin;
    });
    rate = children?.precision || num;
  } else {
    rate = obj?.precision || num;
  }
  return rate;
}

// 获取红绿涨跌色
const getTendencyColor = (value?: number | string) => {
  const colorMap = {
    0: {
      1: {
        up: '#e35461',
        down: '#5eba89',
      },
      0: {
        up: '#5eba89',
        down: '#e35461',
      },
    },
    1: {
      0: {
        up: '#4F93DF',
        down: '#FF9C46',
      },
      1: {
        up: '#FF9C46',
        down: '#4F93DF',
      },
    },
  };
  const userStore = useUserStore();
  const currentColor = colorMap[userStore.styleSetting][userStore.colorSetting];
  const v = Number(value || 0);
  if (v > 0) {
    // return '#5eba89';
    return currentColor.up;
  }
  if (v < 0) {
    // return '#e35461';
    return currentColor.down;
  }
  return 'var(--color-text-2)';
};

export { getUserSecurity, getIcon, getFullName, getShowPrecision, getRatePrecision, getTendencyColor };
