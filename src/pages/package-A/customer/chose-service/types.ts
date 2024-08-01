import Actions from './actions';

export interface IActorReducer {
  isReady: boolean;
  isLoading?: boolean;

  serviceList: IActorServiceList;
  enterpriseId: string;
  isAppointFlag: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IActorReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IListProps = {};
export type IListState = {};

export type IAppointModalProps = {};
export type IAppointModalState = {};

export interface IActorServiceList {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
