import Actions from './actions';
import noop from '@/wmkit/common/noop';
import {PayChannelItemVOArray} from 'api/PayController';
import {CreditAccountDetailResponse} from 'api/CustomerCreditAccountBaseController';

export interface IMainReducer {
  giftCardPrice: number;
  ordersource:string;
  servicePrice: number;
  servicePriceRate: number;
  originPrice:number;
  serviceFeeAmount: number;
  serviceShow: boolean;
  isReady: boolean;
  balance: {
    balancMoney: number;
    channelCode: number;
  };
  payInfo: PayChannelItemVOArray;
  mask: {
    isOpen: boolean;
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
    onClose: Function;
    onConfirm: Function;
  };
  passwordMaskShow: boolean;
  payErrorTime: number;
  isLoading?: boolean;
  tradeNo: string;
  parentTid: string;
  tradePrice: string;
  orderTimeOut: string;
  isBookingSaleGoods: boolean;
  // 订单状态
  tradeState: {payState: string};
  isSubmit: boolean;
  bookingType: number;
  credit: CreditAccountDetailResponse;
  paying: boolean;
  checkedBalance: boolean;
  comPayType: string;
  password: string;
  balancePrice: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IMaskProps = {};
export type IMaskState = {};

export type IHeaderProps = {};
export type IHeaderState = {};
export type IPayListProps = {};
export type IPayListState = {};

export type IPasswordMaskProps = {};
export type IPasswordMaskState = {};

//create by moon https://github.com/creasy2010/moon
