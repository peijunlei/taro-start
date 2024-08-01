import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  applyInfo: string;
  applyNotes: string;
  auditStatus: string;
  effectStatus: string;
  rejectReason: string;
  isEdit: boolean;
  alias: string;
  isLoadingFlag: boolean;
  isChangeFlag: number;
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

export type IApplyCreditProps = {};
export type IApplyCreditState = {};

export type ISignCalendarProps = {};
export type ISignCalendarState = {};

export type IPopularExchangesProps = {};
export type IPopularExchangesState = {};

export type IMainCalendarDataSet = IMainCalendarData[];

export interface IMainCalendarData {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
