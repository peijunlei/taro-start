import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isAgree: boolean;
  isLoading?: boolean;

  inviteeId: string;

  customerName: string;

  userInfo: IMainUserInfo;

  registerCode: string;

  openFlag: number;

  registerLimitType: number;
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
  flag: boolean;
};

export type IVipAgreementProps = {};
export type IVipAgreementState = {};

export type IMainUserInfo = {
  phone: string;
  verifiCode: string;
  password: string;
};

//create by moon https://github.com/creasy2010/moon
