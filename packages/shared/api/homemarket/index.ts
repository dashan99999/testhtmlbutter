import { get } from '#shared/utils/http/axios';
import { PrefixEnum } from '#shared/utils/http/axios/prefix';

/* 获取热门币对列表 */
export const getHotList = () => {
  return get({
    url: '/api/v1/common/symbol/hot',
  });
};
export type RecommendType = {
  /**必须币种简称:例如比特币**/
  shortName: string;
  /**必须币对名称	**/
  symbol: string;
  /**必须图标url	**/
  url: string;
  /**必须最近成交价格	**/
  price: number;
  /**必须涨幅	**/
  rose: number | null;
  /**必须杠杆倍率  **/
  lever: number;
};
/* 获取现货推荐币对列表 */
export const getRecommendSpotTradeCoinSymbolList = () => {
  return get<RecommendType[]>({
    url: '/optional/api/v1/user/recommend',
  });
};
/* 获取合约推荐币对列表 */
export const getRecommendFuturesCoinSymbolList = () => {
  return get(
    {
      url: '/futures/user/collection/query',
    },
    { hostType: PrefixEnum.FE_COV_API },
  );
};
