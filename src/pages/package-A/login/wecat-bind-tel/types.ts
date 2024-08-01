import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  phone: string;

  inviteCode: string;
  registerLimitType: number;
  verifiCode: IMainVerifiCode;
  openFlag: number;
  isRegister: number;
  id: any;
  channel: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IFormInfoProps = {};
export type IFormInfoState = {};

export type IMainVerifiCode = string;

//create by moon https://github.com/creasy2010/moon
