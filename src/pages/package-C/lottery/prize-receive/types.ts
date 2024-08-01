import Actions from './actions';
import {CustomerDeliveryAddressVO} from 'api/CustomerDeliveryAddressBaseController';

export interface IMainReducer {
  isReady: boolean;
  address: CustomerDeliveryAddressVO;
  prizeInfo: any;
  prizeId: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IPrizeReceiveAddressProps = {};
export type IPrizeReceiveAddressState = {};
export type IPrizeReceiveGoodsProps = {};
export type IPrizeReceiveGoodsState = {};
export type IPrizeReceiveBtnProps = {};
export type IPrizeReceiveBtnState = {};
//create by moon https://github.com/creasy2010/moon
