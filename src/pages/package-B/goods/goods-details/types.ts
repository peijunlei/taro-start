import Actions from './actions';
import {MarketingGoodsInfoResponse, MarketingMoreGoodsInfoResponse} from '@/webapi/MarketingController';

export interface IMainReducer {
  /**限区域信息 */
  goodsRestrictedTemplateVO:any;
  /**蛋糕限售信息 */
  dangaoRestrictedVO:{
    /**0 否 1是 */
    canBuy?:'0'|'1';
    distrubtion?:string
  };
  defaultAddress: any;
  address:any;
  isReady: boolean;
  isLoading?: boolean;
  isMenuBoxFlag: boolean;
  menuList: [];
  goodsDetail: IMainGoodsDetail;

  goodsInfo: IMainGoodsInfo;

  storeInfo: IMainStoreInfo;

  collect: IMainCollect;

  slideImages: any;

  skuId: string;
  batchSpecIsShow: boolean;
  retailSpecIsShow: boolean;
  isCouponShow: boolean;
  isPromotionShow: boolean;
  isPay: boolean;
  currentPreBuyStatus: any;
  gift: any;

  fullGiftLevelList: any;

  isShow: boolean;
  subscriptionFlag: boolean;
  top3Evaluate: any;

  shopCarNum: number;

  goodsProps: any;

  goodsBrand: any;

  descData: String;

  flashsaleGodos: any;

  serverTime: any;
  buyTime: any;
  appointmentSaleVO: any;
  bookingSaleVO: any;
  ruleContent: any;
  goodsShareVisible: boolean;
  shareModalVisible: boolean;
  addSelfShop: boolean;

  isBigImgShow: boolean;
  bigEvalItem: any;
  currentImg: number;

  isPointsGoods: boolean; //是否是积分商品
  //积分商品信息
  pointsGoods: any;
  //积分商品Id
  pointsGoodsId: string;
  pointsExchangeVisible: boolean;
  marketingSuits: MarketingMoreGoodsInfoResponse[];

  iepInfo: {};
  iepSwitch: boolean;
  isAppointFlag: boolean;
  isShowRule: boolean;
  openType: string;

  isServiceOpen: boolean;
  enterpriseId: string;
  serviceUrl: string;

  //商品名称
  goodsName: string;

  // 是否展示商品属性特性参数弹框
  goodsPropertyModalVisible: boolean;

  //商品副标题
  goodsSubtitle: string;

  isLoadSkeleton: boolean;

  isOpenWechat: boolean;

  pvUvStaticsNum: number;

  isRun: boolean;
}



export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IGoodsInfoProps = {};
export type IGoodsInfoState = {};

export type IGoodsCouponProps = {};
export type IGoodsCouponState = {};

export type IGoodsSpecProps = {};
export type IGoodsSpecState = {};

export type IGoodsEvaluationProps = {};
export type IGoodsEvaluationState = {};

export type IGroupProps = {};
export type IGroupState = {};

export type ISeckillProps = {};
export type ISeckillState = {};

export type IPrebuyProps = {};
export type IPrebuyState = {};

export type IBuyStatusProps = {};
export type IBuyStatusState = {};

export type IReducePriceProps = {};
export type IReducePriceState = {};

export type ICouponModalProps = {};
export type ICouponModalState = {};

export type IPromotionModalProps = {};
export type IPromotionModalState = {};

export type IWaitGroupModalProps = {};
export type IWaitGroupModalState = {};

export type IAppointModalProps = {};
export type IAppointModalState = {};

export type IImgSlidesProps = {};
export type IImgSlidesState = {
  num: number;
  playVideo: boolean;
};

export type IVideoSlidesProps = {};
export type IVideoSlidesState = {};

export type IPriceProps = {};
export type IPriceState = {};

export type ICollectProps = {};
export type ICollectState = {};

export type ITitleProps = {};
export type ITitleState = {};

export type IStoreInfoProps = {};
export type IStoreInfoState = {};

export type IPriceWholesaleProps = {};
export type IPriceWholesaleState = {};

export type IGiftMaskProps = {};
export type IGiftMaskState = {};

export type IGiftListProps = {};
export type IGiftListState = {};

export type IBottomProps = {};
export type IBottomState = {};

export type IGoodsDescProps = {};
export type IGoodsDescState = {};

export type IPresaleProps = {};
export type IPresaleState = {};

export type IPresaleStatusProps = {};
export type IPresaleStatusState = {
  isShow: boolean;
};

export type IBigPictureProps = {};
export type IBigPictureState = {
  show: boolean;
};

export type ICombinationGoodsProps = {};
export type ICombinationGoodsState = {};

export type IGiftItemProps = {
  //un-check check 赠品
  type: 1 | 2 | 3;
};
export type IGiftItemState = {};

export interface IMainGoodsDetail {
  [k: string]: any;
}
export interface IMainGoodsInfo {
  [k: string]: any;
}
export interface IMainStoreInfo {
  [k: string]: any;
}
export type IMainCollect = boolean;

//create by moon https://github.com/creasy2010/moon
