import Actions from './actions';
import {CouponCodeVO, TradeConfirmItemVO1} from 'api/TradeBaseController';
import {CheckGoodsInfoVO} from 'api/CouponCodeBaseController';
import {CustomerDeliveryAddressVO} from 'api/CustomerDeliveryAddressBaseController';
import {SystemPointsConfigQueryResponse} from 'api/SystemPointsConfigController';
import {PointsTradeConfirmResponse} from 'api/PointsTradeController';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingFlag: boolean;
  passwordMaskShow: boolean;
  myStore: PointsTradeConfirmResponse;
  isShowCheckPayPwRes: boolean;
  mask: {
    isOpen: boolean;
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
    onClose: Function;
    onConfirm: Function;
  };
  orderList: {
    address: CustomerDeliveryAddressVO;
    buyRemark: {};
    isVirtualGoods: boolean;
  };
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IAddressProps = {};
export type IAddressState = {};

export type IStoreItemProps = {};
export type IStoreItemState = {};

export type IEnclosureProps = {};
export type IEnclosureState = {};

export type IPayConProps = {};
export type IPayConState = {};

export type IPriceFooterProps = {};
export type IPriceFooterState = {};

export type IPriceConProps = {};
export type IPriceConState = {};

export type IConfirmMaskProps = {};
export type IConfirmMaskState = {};

//create by moon https://github.com/creasy2010/moon
