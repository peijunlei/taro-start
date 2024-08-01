import Actions from './actions';
import {CustomerFundsStatisticsResponse} from 'api/CustomerFundsController';
export interface IMainReducer {
  isOpenEnterprise:boolean;
  isReady: boolean;
  isLoading?: boolean;
  isLoadingFlag:boolean;
  amount:CustomerFundsStatisticsResponse;
  isOpenWechat: boolean;
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
