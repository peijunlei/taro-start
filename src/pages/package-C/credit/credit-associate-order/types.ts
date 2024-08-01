import Actions from './actions';
import {TradeVO} from 'api/CustomerCreditRepayBaseController';

export interface IMainReducer {
  isReady: boolean;
  status: boolean;
  selectedOrderIds: string[];
  repayOrderList: TradeVO;
  totalPrice: number;
  isCheckedAll: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IRepayOrderListProps = {};
export type IRepayOrderListState = {};

export type IOrderBottomProps = {};
export type IOrderBottomState = {};

export type IMainCalendarDataSet = IMainCalendarData[];

export interface IMainCalendarData {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
