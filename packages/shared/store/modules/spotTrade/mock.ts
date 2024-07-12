import Mock from 'mockjs';
// 模拟生产环境数据
let ind = -1;
export const backDataMock = () => {
  if (ind > 160) {
    ind = -1;
  }
  ind += 1;
  return Mock.mock({
    data: {
      symbol: [
        'btcusdt',
        'ethusdt',
        'vdusdt',
        'manausdt',
        'sandusdt',
        'filusdt',
        'solusdt',
        'dogeusdt',
        'apeusdt',
        'shibusdt',
        'flokiusdt',
        'galausdt',
        'avaxusdt',
        'enjusdt',
        'atomusdt',
        'axsusdt',
        'aptusdt',
        'aaveusdt',
        'bchusdt',
        'maticusdt',
        'ftmusdt',
        'crvusdt',
        'usdcusdt',
        'xmrusdt',
        'busdusdt',
        'daiusdt',
        'maskusdt',
        'chzusdt',
        'sushiusdt',
        'snxusdt',
        'gmtusdt',
        'hookusdt',
        'mboxusdt',
        'sxpusdt',
        'bitusdt',
        'rsrusdt',
        'powrusdt',
        'rlcusdt',
        'agixusdt',
        'looksusdt',
        'galusdt',
        'yggusdt',
        'cvcusdt',
        'funusdt',
        'bswusdt',
        'requsdt',
        'celrusdt',
        'api3usdt',
        'phausdt',
        'gftusdt',
        'metisusdt',
        'cotiusdt',
        'racausdt',
        'blurusdt',
        'darusdt',
        'ldousdt',
        'cfxusdt',
        'ssvusdt',
        'snmusdt',
        'lqtyusdt',
        'audiousdt',
        'SKLUSDT',
        'HIGHUSDT',
        'GLMUSDT',
        'DODOUSDT',
        'SPACEIDUSDT',
        'IDUSDT',
        'ARBUSDT',
        'JOEUSDT',
        'vdnusdt',
        'flowusdt',
        'xrpusdt',
        'dydxusdt',
        'etcusdt',
        'yfiusdt',
        'qntusdt',
        'bsvusdt',
        'bnxusdt',
        'linkusdt',
        'yfiiusdt',
        'rbusdt',
        'balusdt',
        'zecusdt',
        'batusdt',
        'elfusdt',
        'adausdt',
        'slpusdt',
        'mkrusdt',
        'uniusdt',
        '1inchusdt',
        'antusdt',
        'dashusdt',
        'kncusdt',
        'bttusdt',
        'trxusdt',
        'mmffil',
        'luncusdt',
        'nftusdt',
        'vdustusdt',
        'chrusdt',
        'leousdt',
        'nmrusdt',
        'wbtcusdt',
        'crousdt',
        'nearusdt',
        'bandusdt',
        'cakeusdt',
        'mmfusdt',
        'hftusdt',
        'zilusdt',
        'zrxusdt',
        'reefusdt',
        'eosusdt',
        'ankrusdt',
        'sntusdt',
        'ceekusdt',
        'omgusdt',
        'omgeth',
        'xtzusdt',
        'eosbtc',
        'ltcusdt',
        'ethbtc',
        'bchbtc',
        'ltcbtc',
        'peopleusdt',
        'usddusdt',
        'iqusdt',
        'srmusdt',
        'spellusdt',
        'ksmusdt',
        'winusdt',
        'htusdt',
        'jstusdt',
        'ensusdt',
        'bnbusdt',
        'egldusdt',
        'dotusdt',
        'compusdt',
        'hotusdt',
        'rndrusdt',
        'grtusdt',
        'ontusdt',
        'okbusdt',
        'renusdt',
        'imxusdt',
        'fxsusdt',
        'nexousdt',
        'loomusdt',
        'dentusdt',
        'pyrusdt',
        'storjusdt',
        'tusdusdt',
        'oceanusdt',
        'woousdt',
        'vgxusdt',
        'bntusdt',
        'lptusdt',
        'cvxusdt',
        'ampusdt',
        'mxcusdt',
        'jasmyusdt',
        'bfetusdt',
        'fetusdt',
        'injusdt',
      ][ind],
      open: '27333.6038',
      'close|1746-27333.2-6': 1,
      amount: '0',
      vol: '0',
      high: '27333.6038',
      low: '27333.6038',
      rose: '0',
      rose7d: '-2.6761910934',
      rose1h: '0',
      rose4h: '0',
      'rose24h|-100-100.2': 0,
      timestamp: 1679885460,
      utime: '2023-03-27T10:51:00+08:00',
      lastDealId: 0,
      base: [
        'BTC',
        'ETH',
        'VD',
        'MANA',
        'SAND',
        'FIL',
        'SOL',
        'DOGE',
        'APE',
        'SHIB',
        'FLOKI',
        'GALA',
        'AVAX',
        'ENJ',
        'ATOM',
        'AXS',
        'APT',
        'AAVE',
        'BCH',
        'MATIC',
        'FTM',
        'CRV',
        'USDC',
        'XMR',
        'BUSD',
        'DAI',
        'MASK',
        'CHZ',
        'SUSHI',
        'SNX',
        'GMT',
        'HOOK',
        'MBOX',
        'SXP',
        'BIT',
        'RSR',
        'POWR',
        'RLC',
        'AGIX',
        'LOOKS',
        'GAL',
        'YGG',
        'CVC',
        'FUN',
        'BSW',
        'REQ',
        'CELR',
        'API3',
        'PHA',
        'GFT',
        'METIS',
        'COTI',
        'RACA',
        'BLUR',
        'DAR',
        'LDO',
        'CFX',
        'SSV',
        'SNM',
        'LQTY',
        'AUDIO',
        'SKL',
        'HIGH',
        'GLM',
        'DODO',
        'SPACEID',
        'ID',
        'ARB',
        'JOE',
        'VDN',
        'FLOW',
        'XRP',
        'DYDX',
        'ETC',
        'YFI',
        'QNT',
        'BSV',
        'BNX',
        'LINK',
        'YFII',
        'RB',
        'BAL',
        'ZEC',
        'BAT',
        'ELF',
        'ADA',
        'SLP',
        'MKR',
        'UNI',
        '1INCH',
        'ANT',
        'DASH',
        'KNC',
        'BTT',
        'TRX',
        'MMF',
        'LUNC',
        'NFT',
        'VDUST',
        'CHR',
        'LEO',
        'NMR',
        'WBTC',
        'CRO',
        'NEAR',
        'BAND',
        'CAKE',
        'MMF',
        'HFT',
        'ZIL',
        'ZRX',
        'REEF',
        'EOS',
        'ANKR',
        'SNT',
        'CEEK',
        'OMG',
        'OMG',
        'XTZ',
        'EOS',
        'LTC',
        'ETH',
        'BCH',
        'LTC',
        'PEOPLE',
        'USDD',
        'IQ',
        'SRM',
        'SPELL',
        'KSM',
        'WIN',
        'HT',
        'JST',
        'ENS',
        'BNB',
        'EGLD',
        'DOT',
        'COMP',
        'HOT',
        'RNDR',
        'GRT',
        'ONT',
        'OKB',
        'REN',
        'IMX',
        'FXS',
        'NEXO',
        'LOOM',
        'DENT',
        'PYR',
        'STORJ',
        'TUSD',
        'OCEAN',
        'WOO',
        'VGX',
        'BNT',
        'LPT',
        'CVX',
        'AMP',
        'MXC',
        'JASMY',
        'BFET',
        'FET',
        'INJ',
      ][ind],
      quote: 'USDT',
    },
    ts: '2023-03-27T10:53:59+08:00',
  });
};