import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  request: IMainRequest;

  list: IMainListSet;

  total: IMainTotal;
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

export type IAccountItemProps = {};
export type IAccountItemState = {};

export interface IMainRequest {
  [k: string]: any;
}
export type IMainListSet = IMainList[];

export interface IMainList {
  [k: string]: any;
}
export type IMainTotal = string;

//create by moon https://github.com/creasy2010/moon
