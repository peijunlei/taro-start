import Actions from './actions';
import {StoreCustomerFollowVO} from 'api/StoreFollowController';

export interface IMainReducer {
  isReady: boolean;
  isLoading: boolean;

  request: IMainRequest;

  total: IMainTotal;

  list: StoreCustomerFollowVO[];

  selectedList: any;

  ifModify: boolean;

  ifSelectAll: boolean;

  reload: boolean;

  customerId: string;
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

export type IBottomProps = {};
export type IBottomState = {};

export type IListItemProps = {};
export type IListItemState = {};

export interface IMainRequest {
  q?: string;
  pageNum?: number;
  pageSize?: number;
  [k: string]: any;
}
export type IMainTotal = number;

//create by moon https://github.com/creasy2010/moon
