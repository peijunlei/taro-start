import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  userInfo: {
    signContinuousDays: number;
  };
  signPoint: number;
  signRecordList: [];
  pointsFlag: boolean;
  signFlag: boolean;
  growthFlag: boolean;
  growthValue: number;
  daysNumArr: number[];
  calendarData: IMainCalendarDataSet;
  isOpened: boolean;
  toastContent: string;
  flag: false; //积分规则开关
  pointsRule: string; //积分规则
  hotExchange: any; //积分兑换
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISignHeaderProps = {};
export type ISignHeaderState = {};

export type ISignCalendarProps = {};
export type ISignCalendarState = {};

export type IPopularExchangesProps = {};
export type IPopularExchangesState = {};

export type IMainCalendarDataSet = IMainCalendarData[];

export interface IMainCalendarData {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
