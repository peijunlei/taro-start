import Actions from './actions';

export interface IMainReducer {
  key: number;
  status: boolean;
  creditDetailInfo: {};
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ICreditRepaymentDetailProps = {};
export type ICreditRepaymentDetailState = {};

export type IMainCalendarDataSet = IMainCalendarData[];

export interface IMainCalendarData {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
