import type { LanguageItem, PublicInfoData } from '#shared/api/app/types';
export interface AppState {
  title?: string;
  loading?: boolean;
  h1?: string;
  theme: 'dark' | 'light';
  colorWeek?: boolean;
  navbar?: boolean;
  menu?: boolean;
  menuCollapse?: boolean;
  footer?: boolean;
  themeColor?: string;
  menuWidth?: number;
  globalSettings?: boolean;
  [key: string]: unknown;
  areaList: Array<AreaCode>;
  areaCodeByIp?: AreaCodeByIp;
  default_c2c_nick_freeze?: string;
  freezeExpiryDate?: string;
  publicMsg?: PublicMsg; // 网站基础信息
  indexHeaderTitle?: IndexHeaderTitle; // 网站title
  switch?: Switch; // 一些开关配置
  urls?: Urls;
  limitCountryList?: string[];
  HIT?: string;
  klineColor?: KlineColor;
  lan?: Lan;
  user_day_withdraw_value_limit_no_auth?: string;
  user_day_withdraw_value_limit_lv1?: string;
  user_day_withdraw_value_limit_lv2?: string | number;
  coinsymbol_introduce_names?: string[];
  update_safe_withdraw?: UpdateSafeWithdraw;
  seo?: Seo;
  scrollDistance: number;
  lockTime: {
    loginPasswordWithdrawLockTime?: string | number;
    capitalPasswordWithdrawLockTime?: string | number;
    safeSetWithdrawLockTime?: string | number;
  };
  embedded: boolean;
  languages: LanguageItem[];
}

export interface AreaCode {
  id?: number;
  code?: string;
  countryCode?: string;
  nick?: string;
  avatar?: string;
  area?: string;
}

export interface AreaCodeByIp {
  id?: number;
  area?: string;
  countryCode?: string;
  nick?: string;
  code?: string;
}

export interface PublicMsg {
  footer_logo_path: object;
  default_country_code_real: string;
  index_international_logo: string;
  company_name: string;
  company_hash: string;
  default_country_code: string;
  iconUrl: string;
  h5LoginImg: string;
  contact_number: string;
  logoUrl: string;
  contact_email: string;
  config_footer_js: string;
}
export interface IndexHeaderTitle {
  el_GR: string;
  ru_RU: string;
  ko_KR: string;
  en_US: string;
  vi_VN: string;
  zh_CN: string;
  mn_MN: string;
  ja_JP: string;
}
export interface Switch {
  is_return_open: string;
  saas_otc_flow_config: string;
  index_international_open: string;
  nameVerifiedType: string;
  incrementConfigStatus: number;
  newcoinOpen: string;
  lever_open: string;
  config_footer_open: string;
  fiat_open: string;
  is_inner_transfer_open: string;
  openLoginVerificationMode: string;
  symbol_profile: string;
  indep_co_switch: string;
  coin_tag_open: string;
  is_open_upload_img: string;
  index_kline_switch: string;
  register_cms_style: string;
  user_role_level_open: string;
  interfaceSwitch: string;
  fiat_trade_open: string;
  optional_symbol_server_open: string;
  is_deposit_open: string;
  config_header_open: string;
  etfNavigationSwitch: string;
  lock_position_v2_status: string;
  ui_change_open: string;
  coins_krw_open: string;
  login_regist_type: string;
  is_invitationCode_required: string;
  is_enforce_google_auth: string;
  regist_must_check_open: string;
  index_temp_type: string;
  wind_control_switch: string;
  yskyc_is_open: string;
  client_img_upload_open: string;
  is_invite_open: string;
  agentUserOpen: string;
  verificationType: string;
  index_layer_open: string;
  business_id: string;
  trade_depth_is_flash: string;
  open_txid_addr: string;
}

export interface Urls {
  mcoUrl: string;
  coUrl: string;
  mexUrl: string;
  exUrl: string;
  otcUrl: string;
  motcUrl: string;
}

export type KlineColor = {
  up: string;
  down: string;
};

export interface Lan {
  defLan: string;
  lanList: LanItem[];
}

export interface LanItem {
  name: string;
  id: string;
}

export interface UpdateSafeWithdraw {
  hour: string;
  is_open: string;
}
export interface Seo {
  el_GR: ElGr;
  ru_RU: RuRu;
  ko_KR: KoKr;
  en_US: EnU;
  zh_CN: ZhCn;
  vi_VN: ViVn;
  ja_JP: JaJp;
}

type JaJp = ElGr;

type ViVn = ElGr;

type ZhCn = ElGr;

type EnU = ElGr;

type KoKr = ElGr;

type RuRu = ElGr;

export interface ElGr {
  keywords: string;
  description: string;
  pageContent: string;
  title: string;
}
export interface IsHideLayoutType {
  isHideTheHead?: boolean;
  isHideTheFoot?: boolean;
}

export interface AppActions {
  toggleTheme: (theme: 'dark' | 'light') => void;
  toggleLoading: (open: boolean) => void;
  getAreaCode: () => Promise<AreaCode[]>;
  getAreaCodeByIp: () => Promise<AreaCodeByIp>;
  getDefaultC2CNickFreeze: () => void;
  getFreezeExpiryDate: () => Promise<void>;
  setPublicInfo: (data: PublicInfoData, limit: string) => Promise<void>;
  changeAssetsShow: (type: boolean) => void;
  changePageSize: (num: number) => void;
}
