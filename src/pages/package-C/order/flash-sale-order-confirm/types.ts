import Actions from './actions';
import {CouponCodeVO, TradeConfirmItemVO1} from 'api/TradeBaseController';
import {CheckGoodsInfoVO} from 'api/CouponCodeBaseController';
import {CustomerDeliveryAddressVO} from 'api/CustomerDeliveryAddressBaseController';
import {SystemPointsConfigQueryResponse} from 'api/SystemPointsConfigController';

export interface IMainReducer {
  cityId:string;
  isReady: boolean;
  isLoading?: boolean;
  coupons: CouponCodeVO;
  stores: TradeConfirmItemVO1;
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
    invoiceData: {};
    buyRemark: {};
    enclosures: {};
    dangaoPhone:{},
    dangaoDate:{},
    dangaoTime:{},
    dangaoGreeting:{},
    dangaoShop:{},
    dangaoDeliverWay:{},
    dangaoDeliveryText:{},
    dangaoDistributionRuleId:{},
    dangaoDeliveryAmount:{},
    isVirtualGoods: boolean;
  };
  points: {
    showPointInput: Boolean;
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
      checkCoupon: any;
    };
  };
  price: {
    couponTotalPrice: number;
    totalPrice: number;
    goodsTotalPrice: number;
    discountsTotalPrice: number;
    pointTotalPrice: number;
    totalDeliveryPrice: number;
  };
  useStatus: {
    selectCoupon: any;
  };
  grouponFreeDelivery: boolean;
  openGroupon: boolean;
  flashFreeDelivery: boolean;
  payWay: [
    {
      name: string;
      id: 0 | 1;
    },
  ];
  visible: boolean;

  // 可用礼品卡数
  giftCardNum: number;
  // 礼品卡优惠金额
  giftCardPrice: number;
  /** 卡类型 - 0福点卡，1提货卡 */
  giftCardType: 0 | 1;
  /** 用户使用的提货卡名称 */
  pickUpCardName: string;
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
