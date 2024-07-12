import { get } from '#shared/utils/http/axios';

interface ResponseData<t = unknown> {
  code: number | string;
  data: t;
  msg: string;
  status: string;
}

// 获取币种信息列表
interface CoinSymbolsConfig {
  coinSymbol: string; // 搜索的币种(支持大小写不敏感的模糊匹配)
}
interface CoinSymbolsRes {
  coinSymbol: string;
  longName: string;
  shortName: string;
}

// 获取币种详情
interface CoinSymbolsDetailRes {
  coinSymbol: string; // 币种
  shortName: string; // 币种简称
  longName: string; // 币种全称
  publishTime: string; // 发行时间(yyyy-MM-dd)
  publishAmount: string; // 发行总量
  currencyAmount: string; // 流通总量
  introduction: string; // 项目简介
  officialUrl: string; // 官网地址
  blockchainUrl: string; // 区块链查询地址
  icon: string; // 币种图标url
  symbols: {
    base: string; // 基准货币
    quote: string; // 计价货币
    symbol: string;
  }[]; // 相关币种
}

// 获取币种信息列表
export const coinSymbols = async (params: CoinSymbolsConfig) => get<CoinSymbolsRes[]>({ url: '/api/v1/common/coin_symbols', params });

// 获取币种详情
export const coinSymbolsDetail = async (params: string) =>
  get<ResponseData<CoinSymbolsDetailRes>>({ url: '/api/v1/common/coin_symbol/' + params }, { tips: true });

export type { CoinSymbolsRes, CoinSymbolsDetailRes };
