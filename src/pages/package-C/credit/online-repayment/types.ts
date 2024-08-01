import Actions from './actions';
import {CustomerCreditRepayVO, TradeVO} from 'api/CustomerCreditRepayBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  waitRepay: boolean;
  customerCreditRepayVO: CustomerCreditRepayVO;
  tradeVOList: TradeVO;
  onlineRepay: IOnlineRepay;
  isCanceled: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IRepayFormProps = {};
export type IRepayFormState = {};

export type ICreditRepayingProps = {};
export type ICreditRepayingState = {};

export type IRepayingItemProps = {};
export type IRepayingItemState = {};

export interface IMainRequest {
  q?: string;
  pageNum?: number;
  pageSize?: number;
  [k: string]: any;
}

export interface IOnlineRepay {
  orderIds?: string[];
  repayNotes?: string;
  repayAmount?: number;
}

export type IMainTotal = number;
