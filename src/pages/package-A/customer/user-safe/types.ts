import Actions from './actions';
import { CustomerBaseInfoResponse } from 'api/CustomerBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  customer:CustomerBaseInfoResponse;
  flag:boolean;//是否设置支付密码
  isLoadingFlag:boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {};

//create by moon https://github.com/creasy2010/moon
