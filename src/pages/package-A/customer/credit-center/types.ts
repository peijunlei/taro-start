import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  selectKey: number;
  creditInfo: IMainCreditInfo;
  historyRecoverList: [];
  historyUsedList: [];
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ICreditHeaderProps = {};
export type ICreditHeaderState = {};

export type INavProps = {};
export type INavState = {};

export type IRecordListProps = {};
export type IRecordListState = {};

export type IOrderItemProps = {};
export type IOrderItemState = {};

export type IRepaymentItemProps = {};
export type IRepaymentItemState = {};

export type ISignCalendarProps = {};
export type ISignCalendarState = {};

export type IPopularExchangesProps = {};
export type IPopularExchangesState = {};

export type IMainCalendarDataSet = IMainCalendarData[];

export interface IMainCalendarData {
  [k: string]: any;
}

export interface IMainCreditInfo {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
