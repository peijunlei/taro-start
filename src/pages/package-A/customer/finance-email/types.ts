import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  list: IMainListSet;

  request: IMainRequest;

  total: IMainTotal;

  reload: boolean;

  visible: boolean;

  ifModify: boolean;

  emailAddress: string;

  customerEmailId: string;
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

export type IMainListSet = IMainList[];

export interface IMainList {
  [k: string]: any;
}
export interface IMainRequest {
  [k: string]: any;
}
export type IMainTotal = number;

//create by moon https://github.com/creasy2010/moon
