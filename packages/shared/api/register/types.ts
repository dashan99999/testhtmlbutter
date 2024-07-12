export interface CheckAcceptParams {
  accept: string;
  countryCode?: string;
}

export interface RegisterCheckParams {
  agreement: boolean;
  nation: string;
  account: string;
  areaCode?: string;
  invitationCode?: string;
  partnerCode?: string;
  password: string;
  mobileNumber: {
    mobileNumber: string;
    countryCode: string;
  };
  confirm_password: string;
}

export interface RegisterCheckRes {
  token: string;
}

export interface RegisterConfirmParams {
  token: string;
  account: string;
  verificationCode: string;
}

export interface RegisterConfirmRes<T = any> {
  code: string;
  data: T;
  msg: string;
}

export interface PlatFormCheckParams {
  token: string;
  id: string;
  type: string;
}

export interface PlatFormCheckRes<T = PlatFormCheckAuth> {
  uid: string;
  accept: string;
  type: number;
  auth: T;
  emailIsBound: boolean;
}

export interface PlatFormCheckAuth {
  googleAuth: number;
  emailAuth: number;
  mobileAuth: number;
}

export interface PlatFormLoginParams {
  uid: string;
  email?: string;
  google?: string;
  mobile?: string;
}

export interface PlatFormBindAccountParams {
  uid: string;
  country?: string;
  accept: string;
  pass: string;
}

export interface PlatFormBindNewAccountParams {
  uid: string;
  areaCode?: string;
  invitationCode?: string;
  accept: string;
  nation: string;
  agreement: boolean;
}

export interface PlatFormBindAccountResult {
  emailAuth: number;
  googleAuth: number;
  mobileAuth: number;
}
