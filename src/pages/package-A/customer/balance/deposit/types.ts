import Actions from './actions';
import {number} from 'prop-types';
import {IAddCustomerDrawCashCustomerDrawCashAddRequestReq} from 'api/CustomerDrawCashController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  customerDrawCashAddRequest: IAddCustomerDrawCashCustomerDrawCashAddRequestReq;
  use?: {
    nickName: string;
    headimgurl: string;
  };
  cash?: {
    money: number;
    alreadyDrawCash: number;
    inputMoney: number;
  };
  payData?: {
    payErrorTime: number;
    checkPayPwRes: number;
  };
  passwordMaskShow: boolean;
  isSubmit: boolean;
  mask: {
    isOpen: boolean;
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
    onClose: Function;
    onConfirm: Function;
  };
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISuccessProps = {};
export type ISuccessState = {};

export type IDepositRecordsProps = {};
export type IDepositRecordsState = {};

export type IDepositItemProps = {};
export type IDepositItemState = {};

export type IPasswordMaskProps = {};
export type IPasswordMaskState = {};
//create by moon https://github.com/creasy2010/moon
