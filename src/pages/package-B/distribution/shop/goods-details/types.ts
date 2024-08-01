import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

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

  gift: any;

  fullGiftLevelList: any;

  isShow: boolean;

  top3Evaluate: any;

  shopCarNum: number;

  goodsProps: any;

  goodsBrand: any;

  descData: String;

  flashsaleGodos: any;

  serverTime: any;

  goodsShareVisible: boolean;
  shareModalVisible: boolean;
  addSelfShop: boolean;

  isBigImgShow: boolean;
  bigEvalItem: any;
  currentImg: number;

  isServiceOpen: boolean;
  isOpenWechat: boolean;
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

export type IReducePriceProps = {};
export type IReducePriceState = {};

export type ICouponModalProps = {};
export type ICouponModalState = {};

export type IPromotionModalProps = {};
export type IPromotionModalState = {};

export type IWaitGroupModalProps = {};
export type IWaitGroupModalState = {};

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

export type IBigPictureProps = {};
export type IBigPictureState = {
  num: number;
  show: boolean;
};

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
