import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  request: {
    //分页
    pageNum: number;
    pageSize: number;
  };
  list: IMainListSet;
  total: number;
  activityId: string;
  loadStatus: string;
}
export type IMainListSet = IMainList[];

export interface IMainList {
  [k: string]: any;
}
export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IOrderListProps = {};
export type IOrderListState = {};

export type IListProps = {};
export type IListState = {};

//create by moon https://github.com/creasy2010/moon
