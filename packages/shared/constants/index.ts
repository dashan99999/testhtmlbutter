export const ID_TYPE = [
  {
    label: 'common.id_type.id_card',
    value: 'id_card',
  },
  {
    label: 'common.id_type.drive_license',
    value: 'drive_license',
  },
  {
    label: 'common.id_type.passport',
    value: 'passport',
  },
  {
    label: 'common.id_type.other',
    value: 'other',
  },
];

export enum KycStatusEnum {
  no_auth = 'account.menu.idAuth.no_auth',
  authing = 'account.menu.idAuth.authing',
  approved = 'account.menu.idAuth',
  reject = 'account.menu.idAuth.reject',
}

export const APP_ROUTES = [
  '/service/help-guide',
  '/service/vip-service',
  '/service/handling-fee',
  '/activity/newborn-zone',
  '/activity/welfare-center',
  '/activity/partner-trading',
  '/activity/winter-wonderland',
  '/community',
  '/assets/coupon',
  '/assets/couponDown',
  '/activity/partner-trading',
  '/activity/futures-trading',
];

export const REDIRECT_ROUTES = ['/activity/partner-trading'];
