import Actions from './actions';
import {CustomerFundsStatisticsResponse} from 'api/CustomerFundsController';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  form: {
    sortColumn: 'createTime'; //排序规则 desc asc
    sortRole: 'desc';
    tabType: number;
  };
  funds: []; //明细列表=
  total: number;

  selectKey?: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {};

//create by moon https://github.com/creasy2010/moon
