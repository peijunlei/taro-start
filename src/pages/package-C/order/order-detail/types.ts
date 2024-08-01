import Actions from './actions';
import {CheckGoodsInfoVO} from 'api/CouponCodeBaseController';
import {SystemPointsConfigQueryResponse} from 'api/SystemPointsConfigController';
import {CouponCodeVO, TradeConfirmItemVO1, TradeVO} from 'api/TradeBaseController';

export interface IMainReducer {
  maskInfo:any;
  isReady: boolean;
  isThirdPlatform: boolean;
  isLoading?: boolean;
  isLoadingFlag: boolean;
  tid: string;
  detail: TradeVO; //订单详情
  orderButtons: {
    available: [];
    id: '';
  };
  serverTime: string;
  pointsOrder: boolean; //积分订单
  promotionOrder: boolean; //推广订单
  pointConfig: SystemPointsConfigQueryResponse; //积分使用设置
  isPresale: boolean;
  isBookingSaleGoods: boolean;
  localData: {
    //选中的优惠券
    confirmCoupon: {
      unreachedIds: string[];
      couponTotalPrice: number;
      checkGoodsInfos: CheckGoodsInfoVO;
      checkCoupon: any;
    };
  };
  coupons: CouponCodeVO;
  points: {
    showPointInput: boolean;
    totalPoint: number;
    maxPoint: number;
    usePoint: number;
  };
  useStatus: {
    selectCoupon: any;
  };
  isPayBalance: boolean;

  goodsTotalPrice: number;
  param: any;
  usePoint: number;
  thirdPlatformOrderId: string;
  thirdPlatformType: number;

  giftCardType: number | null;
  pickUpCardName: string | null;
  giftCardNum: number;
  giftCardPrice: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type OrderStatusProps = {};
export type OrderStatusState = {};

//create by moon https://github.com/creasy2010/moon
