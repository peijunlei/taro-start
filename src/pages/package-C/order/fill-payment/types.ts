import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  time: IMainTime;

  isOpen: IMainIsOpen;

  sellerAccount: IMainSellerAccount;

  remark: IMainRemark;

  payOrder: IMainPayOrder;
  tid: '';
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IPaymentProps = {};
export type IPaymentState = {
  timeList: any[];
  timeIndex: any[];
};

export type IMainTime = any;
export type IMainIsOpen = boolean;
export interface IMainSellerAccount {
  [k: string]: any;
}
export type IMainRemark = string;
export interface IMainPayOrder {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
