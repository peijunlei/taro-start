import Actions from './actions';
import { OfflineAccountVOArray } from 'api/AccountBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  sellerAccounts: OfflineAccountVOArray;
  tid: ''
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IAccountFormProps = {};
export type IAccountFormState = {};

//create by moon https://github.com/creasy2010/moon
