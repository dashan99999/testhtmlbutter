import { checkAccept } from '../api/register';
import { useDebounceFn } from '@vueuse/core';

type validateStatus = 'error' | 'success' | 'warning' | 'validating' | undefined;

// <!-- 邮箱验证Ruler -->

// 邮箱校验正则
export const reg_email1 = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
export const reg_email = new RegExp(
  '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$',
);
// 邮箱验证loading
export const validEmailStatus = ref<validateStatus>(undefined);
export const validCheckAcceptFn = useDebounceFn(async (accept: string, countryCode?: string): Promise<string> => {
  validEmailStatus.value = 'validating';
  const result = await checkAccept({ accept: accept, countryCode: countryCode });
  if (result.code !== '0') {
    validEmailStatus.value = 'error';
    return result.msg;
  } else {
    validEmailStatus.value = undefined;
    return '';
  }
}, 500);

// 校验格式以及是否重复
export const validEmailRepeat = async (value, callback) => {
  validEmailStatus.value = undefined;
  if (value) {
    if (!reg_email.test(value)) {
      validEmailStatus.value = 'error';
      callback('邮箱格式不正确');
      return;
    }
    const msg: string = await validCheckAcceptFn(value);
    if (msg) {
      callback(msg);
    }
  }
};
// 只校验格式
export const validEmail = async (value, callback) => {
  if (value) {
    if (!reg_email.test(value)) {
      callback('邮箱格式不正确');
      return;
    }
  }
};

// <!-- 密码验证Ruler -->
// 校验密码必须输入8-20位大小写必须经过MD5加密
export const reg_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;
export const validPasswordStatus = ref<validateStatus>(undefined);
export const validPassword = async (value, callback) => {
  validPasswordStatus.value = undefined;
  if (value && !reg_password.test(value)) {
    validPasswordStatus.value = 'error';
    callback('需为6~20位字符，且包含大小写+数字');
  }
};

//校验资金密码格式 //防钓鱼码也适用
export const reg_fund_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
export const validFundPasswordStatus = ref<validateStatus>(undefined);
export const validFundPassword = async (value, callback) => {
  validFundPasswordStatus.value = undefined;
  if (value && !reg_fund_password.test(value)) {
    validFundPasswordStatus.value = 'error';
    callback('需为8~20位数字+字母组合');
  }
};

// 校验昵称
export const nickname_reg = /^[0-9a-zA-Z-\u4e00-\u9fa5]{2,30}$/;
export const validNickName = async (value, callback) => {
  if (value && !nickname_reg.test(value)) {
    callback('需为2~30位字符，且不包含符号');
  }
};

// IP地址正则
export const ip_reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;

// 证件号码验证正则
export const IDcard_reg = /[^a-zA-Z0-9_-]/;

// 手机号码验证正则
export const mobile_reg = /^[0-9]*$/;
