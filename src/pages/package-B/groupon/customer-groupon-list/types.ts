import Actions from './actions';
import {GrouponTradeVO} from 'api/TradeBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  request: IMainRequest;

  total: IMainTotal;

  list: GrouponTradeVO[];

  reload: boolean;

  serverTime: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IListProps = {};
export type IListState = {};

export interface IMainRequest {
  q?: string;
  pageNum?: number;
  pageSize?: number;

  [k: string]: any;
}

export type IMainTotal = number;

//create by moon https://github.com/creasy2010/moon
