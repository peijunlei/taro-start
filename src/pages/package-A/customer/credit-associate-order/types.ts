import Actions from './actions';

export interface IMainReducer {
  key: number;
  status: boolean;
  repayOrderCode: string;
  orderList: [];
  totalPrice: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IOrderItemProps = {};
export type IOrderItemState = {};

export type IOrderBottomProps = {};
export type IOrderBottomState = {};

export type IMainCalendarDataSet = IMainCalendarData[];

export interface IMainCalendarData {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
