import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  phone: string;

  verifiCode: IMainVerifiCode;
  wecatAuthParams: IMainWecatAuthParamsSet;
  isNew: boolean;
  routers: any[];
  visible:boolean;
  loginFlag: boolean;
  inviteCode: string
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IFormInfoProps = {};
export type IFormInfoState = {
  code: string;
  isNew: boolean;
};

export type IMainVerifiCode = string;

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
