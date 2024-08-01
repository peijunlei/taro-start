import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isAgree: boolean;
  mode?: boolean // 是不是只要验证码登录
  toUrl?: string

  phone: IMainPhone;

  verifiCode: IMainVerifiCode;

  password: IMainPassword;

  routers: any[];

  wecatAuthParams: IMainWecatAuthParamsSet;
  visible: boolean;
  loginFlag: boolean;
  inviteCode: string;
  pcLogo: any[];
  code: string;
  encryptedData: string;
  iv: string;
  openFlag: any;
  registerLimitType: any;
  isOpenWechat: boolean;
  switchLogin: boolean;
  flag: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ILoginFormProps = {};
export type ILoginFormState = {};

export type IOtherLoginProps = {};
export type IOtherLoginState = {
  code: string;
  isNew: boolean;
  isOpened: boolean;
};

export type IMainPhone = string;
export type IMainVerifiCode = string;
export type IMainPassword = string;

export type IMainWecatAuthParamsSet = {
  channel: any;
  unionId: string;
  phonNumber: string;
  nickName: string;
  headimgurl: string;
  openId: string;
  sessionKey: string;
  appId: string;
};
//create by moon https://github.com/creasy2010/moon
