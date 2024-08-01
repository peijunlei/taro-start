import Actions from './actions';
import {CouponCodeVO, TradeConfirmItemVO1} from 'api/TradeBaseController';
import {CheckGoodsInfoVO} from 'api/CouponCodeBaseController';
import {CustomerDeliveryAddressVO} from 'api/CustomerDeliveryAddressBaseController';
import {SystemPointsConfigQueryResponse} from 'api/SystemPointsConfigController';
import {CustomerBaseInfoResponse} from 'api/CustomerBaseController';
import {FullGiftLevelListByMarketingIdAndCustomerResponse} from 'api/MarketingFullGiftController';

export interface IMainReducer {
  isExpired: boolean;
  isReady: boolean;
  isThirdPlatform: boolean;
  isLoading?: boolean;
  coupons: CouponCodeVO;
  canUseCouponsLength: number;
  stores: TradeConfirmItemVO1;
  customer: CustomerBaseInfoResponse;
  mask: {
    isOpen: boolean;
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
    onClose: Function;
    onCancel: Function;
    onConfirm: Function;
  };
  orderList: {
    address: CustomerDeliveryAddressVO;
    invoiceData: {};
    buyRemark: {};
    enclosures: {};
    isVirtualGoods: boolean;
  };
  points: {
    showPointInput: boolean;
    totalPoint: number;
    maxPoint: number;
    usePoint: number;
    pointConfig: SystemPointsConfigQueryResponse;
  };

  localData: {
    //在线支付 线下支付
    deliverType: 0 | 1;
    //选中的优惠券
    confirmCoupon: {
      unreachedIds: string[];
      couponTotalPrice: number;
      checkGoodsInfos: CheckGoodsInfoVO;
      checkCoupon: any; //通用券
      checkCouponStore: any; //优惠券
    };
  };
  price: {
    couponTotalPrice: number;
    totalPrice: number;
    goodsTotalPrice: number;
    discountsTotalPrice: number;
    pointTotalPrice: number;
    totalDeliveryPrice: number;
    totalBuyPoint: number;
    totalCommission: number;
  };
  useStatus: {
    selectCoupon: any;
  };
  grouponFreeDelivery: boolean;
  openGroupon: boolean;
  purchaseBuy: boolean;
  payWay: [
    {
      name: string;
      id: 0 | 1;
    },
  ];
  stock: number;
  storeBagsFlag: boolean;
  isPresale: boolean;
  isBookingSaleGoods: boolean;
  isCommit: boolean;
  tailNoticeMobile: string;
  gifts: {
    isMaskOpen: boolean;
    fullGiftLevelList: FullGiftLevelListByMarketingIdAndCustomerResponse;
    selectedMarketingGifts: any;
  };
  shopName: string;
  inviteeName: string;
  initGiftMarketLevelId: string;
  offlineStatus: number;
  tradeno: string;
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
export type IDepositProps = {};
export type IDepositState = {};

export type IConfirmMaskProps = {};
export type IConfirmMaskState = {};

export type IPresaleProps = {};
export type IPresaleState = {};

export type IMaskProps = {};
export type IMaskState = {};

export type IGiftMaskProps = {};
export type IGiftMaskState = {};
export type IGiftItemProps = {
  //un-check check 赠品
  type: 1 | 2 | 3;
};
export type IGiftItemState = {};

//create by moon https://github.com/creasy2010/moon
