// import { post } from '#shared/utils/http/axios';
import { get, post } from '#shared/utils/http/axios/request';

export interface gameItemType {
  id: number;
  name: string;
  cover_image: string;
  price: number;
  author: string;
  game_link_obj: any;
}
export interface gameListType {
  bestSeller: gameItemType;
  recommend: gameItemType;
  latest: gameItemType;
}

/* 注册 */
export const registers = (data) => {
  return post({
    url: '/registers',
    data,
  });
};

/* 登陆 */
export const logins = (data) => {
  return post({
    url: '/logins',
    data,
  });
};

/* 用户详情 */
export const memberDetails = (params) => {
  return get({
    url: '/memberDetails',
    params,
  });
};

/* 首页接口-畅销游戏, 推荐游戏,最新游戏 */
export const getGameLists = () => {
  return get({
    url: '/gameLists',
  });
};

/* 游戏详情 */
export const getGameDetail = (id) => {
  return get({
    url: '/gameDetails',
    params: { id },
  });
};

/* 广告---首页轮播广告 */
export const getBanners = (data) => {
  return get({
    url: '/banners',
    params: data,
  });
};

/* 充值商品列表 */
export const goodsLists = () => {
  return get({
    url: '/goodsLists',
  });
};

/* 支付渠道列表 */
export const channelLists = () => {
  return get({
    url: '/channelLists',
  });
};

/* 支付购买金币 */
export const payOrders = (data) => {
  return post({
    url: '/payOrders',
    data,
  });
};

/* 购买游戏 */
export const bugGames = (data) => {
  return post({
    url: '/bugGames',
    data,
  });
};

/* 我的游戏 */
export const memberGameLists = () => {
  return get({
    url: '/memberGameLists',
  });
};
