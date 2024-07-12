import { post } from '#shared/utils/http/axios';

export const cmsList = () => {
  return post({
    url: '/cms/footer/list',
  });
};
export const cmsDetail = (data) => {
  return post({
    url: '/cms/info',
    data,
  });
};
