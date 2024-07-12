/**
 * @store UserInfo
 * @description UserInfo 存储用户模块和共享用户个人相关配置信息
 * @example
 * 个人用户相关的账号安全，设置,角色等
 */

import { defineStore } from 'pinia';
import { getUserProfile, getVipUserRate, getInvitationInfo } from '#shared/api/user/index';
import { memberDetails } from '#shared/api/homeindex/index';
import { showToast } from '#shared/utils/vant';
import { futureState } from '#shared/api/assets';
import { UserInfo, SecurityLevel, UserInfoGetter, UserInfoActions } from './types';
import { getKycStatus } from '#shared/api/account';
import { getDefaultInvite } from '#shared/api/referral';
import { isLogin } from '#shared/utils/auth';
import { earnAccountCheck, earnAccountOpen } from '#shared/api/earn';
const storage = process.server ? undefined : localStorage;
export const useUserStore = defineStore<string, UserInfo, UserInfoGetter, UserInfoActions>('user', {
  state: () => ({
    id: undefined,
    avatar: undefined,
    nickName: undefined,
    userAccount: undefined,
    email: undefined,
    bindEmailStatus: undefined,
    bindPhoneStatus: undefined,
    googleAuthenticatorKey: undefined,
    mobileNumber: undefined,
    antiPhishingCode: undefined,
    antiPhishingCodeContent: undefined,
    capitalPword: undefined,
    googleAuthenticatorStatus: undefined,
    emailAuthenticatorStatus: undefined,
    mobileAuthenticatorStatus: undefined,
    loginPword: undefined,
    authLevel: undefined,
    authLevelText: undefined,
    c2cNick: undefined,
    tokenExpireHour: undefined,
    styleSetting: 0,
    colorSetting: 0,
    contractOpened: undefined,
    policyUrl: '',
    inviteCodeData: { inviteCode: '', link: '', shareRatio: 0, myRatio: 0 }, //默认邀请码信息
    rateInformation: {
      vipLevel: 0,
      spotMakerRate: '',
      spotTakerRate: '',
      futureMakerRate: '',
      futureTakerRate: '',
    },
    regTime: '',
    countryCode: '',
    isPartnerUser: false,
    isOpenEarnAccount: false,
    userInfoDetail: {},
  }),
  getters: {
    userProfile(state) {
      return { ...state };
    },
    userColorConfig(state) {
      const colorOption = [
        {
          up: 'success-6',
          down: 'danger-6',
          upColor: '#00C383',
          downColor: '#F65353',
        },
        {
          up: 'danger-6',
          down: 'success-6',
          upColor: '#F65353',
          downColor: '#00C383',
        },
      ];
      return colorOption[state.colorSetting];
    },
    // 用户账号安全等级
    userSecurityLevel(state) {
      let securityLevel: SecurityLevel = 'low';
      const authenticatorList = [state.googleAuthenticatorStatus, state.emailAuthenticatorStatus, state.mobileAuthenticatorStatus];
      let count = 0; // 开启了安全验证项的个数
      authenticatorList.forEach((i) => {
        if (i == 1) {
          count++;
        }
      });
      if (count === 1) {
        // 仅启用一项安全验证
        securityLevel = 'low';
      }
      if (state.emailAuthenticatorStatus == 1 && state.mobileAuthenticatorStatus == 1 && state.googleAuthenticatorStatus == 0) {
        // 仅开启了邮箱和手机验证的情况
        securityLevel = 'medium';
      }
      if (state.googleAuthenticatorStatus == 1 && (state.mobileAuthenticatorStatus == 1 || state.emailAuthenticatorStatus == 1)) {
        // 开启了google验证和其他任意一个安全验证
        securityLevel = 'high';
      }
      return securityLevel;
    },
    // google绑定提示弹框
    googleBindShow(state) {
      let show = false;
      const authenticatorList = [state.emailAuthenticatorStatus, state.mobileAuthenticatorStatus];
      let count = 0; // 开启了安全验证项的个数
      authenticatorList.forEach((i) => {
        if (i == 1) {
          count++;
        }
      });
      if (count === 1) {
        // 仅启用一项安全验证
        show = true;
      }

      return show && isLogin() && state.googleAuthenticatorStatus === 0;
    },
  },
  actions: {
    // switchRoles() {
    //   return new Promise((resolve) => {
    //     this.role = this.role === 'user' ? 'user' : 'admin';
    //     resolve(this.role);
    //   });
    // },
    // 设置用户的信息
    setInfo(partial: Partial<UserInfo>) {
      this.$patch(partial);
    },
    // 重置用户store信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info(token: string) {
      const { data } = await memberDetails({ token });
      console.log('result===>', data);

      this.userInfoDetail = data;
      // const data = await getKycStatus();
      // if (data.data.lv1 === 'authing' || data.data.lv2 === 'authing') {
      //   this.setInfo({ authLevel: 0, authLevelText: 'Verifying' });
      // } else if (data.data.lv1 === 'approved' && data.data.lv2 !== 'approved') {
      //   this.setInfo({ authLevel: 1, authLevelText: 'KYC Lv1' });
      // } else if (data.data.lv2 === 'approved') {
      //   this.setInfo({ authLevel: 2, authLevelText: 'KYC Lv2' });
      // } else {
      //   this.setInfo({ authLevel: 3, authLevelText: 'Unverified' });
      // }
      // this.getVipUserRateFn();
      // getInvitationInfo();
      // // 查询合约开通状态
      // const contract = await futureState();
      // this.contractOpened = contract.opened;
      // this.policyUrl = contract.policyUrl;
      // this.getEarnAccountCheck();
      return data;
    },
    // Logout （不建议业务组件中直接调用 store 里logout 方法 ，涉及跳转，接口调用等其它逻辑放在 #shared/hooks/user 中解耦。保持 store 里的方法干净 ）
    async logout() {
      // TODO 临时屏蔽
      // await userLogout();
      // 清除登录信息
      this.resetInfo();
    },
    openContract() {
      // 开通合约服务
      this.contractOpened = 1;
    },
    // 获取用户默认邀请码信息
    async getDefaultInviteFn() {
      const res = await getDefaultInvite();
      this.inviteCodeData = res;
    },
    // 获取当前用户费率信息
    async getVipUserRateFn() {
      const res = await getVipUserRate();
      this.rateInformation = res;
    },
    // 校验用户是否开通理财账户
    async getEarnAccountCheck() {
      const res = await earnAccountCheck();
      this.isOpenEarnAccount = res || false;
    },
    // 开通理财账户
    async openEarnAccount() {
      const res = await earnAccountOpen();
      console.log('openEarnAccount==res==>', res);
      if (res) {
        this.isOpenEarnAccount = true;
        showToast('开通成功');
      }
    },
  },
  persist: [
    {
      key: 'styleSetting',
      storage,
      paths: ['styleSetting'],
    },
    {
      key: 'colorSetting',
      storage,
      paths: ['colorSetting'],
    },
  ],
});
