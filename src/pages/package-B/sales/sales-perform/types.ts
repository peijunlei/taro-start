import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  isOpenLayer: IMainIsOpenLayer;

  isRuleShow: IMainIsShowTagList;

  dayOrMonthFlag: IMainDayOrMonthFlag;

  choiceTabFlag: IMainChoiceTabFlag;

  monthData: IMainMonthDataSet;

  monthStr: IMainMonthStr;

  dayForm: IMainDayForm;

  monthForm: IMainMonthForm;

  distributionId: IMainDistributionId;

  data: IMainMonthForm;
  performanceDesc: IMainPerformanceDesc;

  length: IMainLength;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISalesConfirmProps = {};
export type ISalesConfirmState = {};

export type ISalesEmptyProps = {};
export type ISalesEmptyState = {};

export type ISalesListItemProps = {};
export type ISalesListItemState = {};

export type ISalesTableProps = {};
export type ISalesTableState = {};

export type ISalesTagBarListProps = {};
export type ISalesTagBarListState = {};

export type ISalesTagBarProps = {};
export type ISalesTagBarState = {};

export type ISalesTotalProps = {};
export type ISalesTotalState = {};

export type IMainIsOpenLayer = boolean;
export type IMainIsShowTagList = boolean;
export type IMainDayOrMonthFlag = boolean;
export type IMainChoiceTabFlag = number;
export type IMainMonthDataSet = IMainMonthData[];

export interface IMainMonthData {
  [k: string]: any;
}
export type IMainMonthStr = string;
export interface IMainDayForm {
  [k: string]: any;
}
export interface IMainMonthForm {
  [k: string]: any;
}
export type IMainDistributionId = string;
export type IMainDataSet = IMainData[];

export interface IMainData {
  [k: string]: any;
}
export type IMainPerformanceDesc = string;
export type IMainLength = number;

//create by moon https://github.com/creasy2010/moon
