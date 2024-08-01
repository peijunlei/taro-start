import Actions from './actions';
import {GoodsVO5, PurchaseResponse, StoreVO1} from 'api/PurchaseBaseController';
import {CustomerDeliveryAddressVO} from 'api/CustomerDeliveryAddressBaseController';

export interface IMainReducer {
  isReady: boolean;
  isFromC: boolean;
  restrictedList: Array<any>;
  isSecondShopCart: boolean;
  isLoading?: boolean;
  purInfo: PurchaseResponse;
  purInfos: {appointmentSaleVOList: []; bookingSaleVOList: []};
  isStoreInit: boolean;
  customerInfo: any;
  coupon: {
    goodsInfoIds: [];
  };
  useStatus: {
    isMaskOpen: boolean;
    //修改促销 查看赠品 领取赠品 赠品sku 领劵
    maskType: 0 | 1 | 2 | 3 | 4;
    confirmMask: {
      isOpen: boolean;
      type: 0 | 1;
      message: any;
    };
    isEmpty: boolean;
    isEdit: boolean;
    isLogin: boolean;
  };
  packageMaskData: any;
  goods: {
    chooseMarketingSkuId: number | string;
    selectedMarketingGifts: any;
    checkselectedMarketingGift: any;
    setMessage: any;
    marketing: any;
    checkStore: [];
    checkSku: Array<string>;
    storeMarketing: any;
    goodsMarketing: any;
    giftGoodsInfos: any;
    skuMarketingDict: any;
  };
  messNum: number;
  defaltAddress: any;
  addressList: CustomerDeliveryAddressVO[];
  retailSpecIsShow: boolean;
  goodsDetail: IMainGoodsDetail;

  goodsInfo: IMainGoodsInfo;
  iepInfo: {};
  sku: any;
  goodsInfoId: any;
  appointmentSaleVOList: [];
  getPriceInfoFlag: boolean;
  storeMarketingGroup: {};
  pageArea: any;
  activedItem: string;
  relationGoodsIdList: Array<any>;
  pickerShow: boolean;
  currentAddress: CustomerDeliveryAddressVO;
  pageIndex: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ILoginHeaderProps = {};
export type ILoginHeaderState = {
  pageIndex: number;
};

export type IStoreItemProps = {
  store: StoreVO1;
  //优惠券选项
  storeCouponFlag: Boolean;
};
export type IStoreItemState = {};

export type ISpuItemProps = {
  spu: GoodsVO5;
  key: Number | String;
};
export type ISpuItemState = {};

export type ISkuItemProps = {
  //正常 缺货 失效 无购买  购物车主页的赠品 弹窗下的赠品
  type: 0 | 1 | 2 | 4;
  sku: GoodsVO5;
  key: Number | String;
};
export type ISkuItemState = {};

export type IConfirmMaskProps = {};
export type IConfirmMaskState = {};

export type IGiftMaskProps = {};
export type IGiftMaskState = {};

export type ICouponMaskProps = {};
export type ICouponMaskState = {};

export type IPromationMaskProps = {};
export type IPromationMaskState = {};

export type IInvalidGoodsProps = {};
export type IInvalidGoodsState = {};

export type IMoneyFooterProps = {};
export type IMoneyFooterState = {};

export type IMarketingProps = {};
export type IMarketingState = {};

export type IMaskProps = {};
export type IMaskState = {};

export type IGiftItemProps = {
  //un-check check 赠品
  type: 1 | 2 | 3;
};
export type IGiftItemState = {};

export type IGiftListProps = {};
export type IGiftListState = {};

export type ISkuSimpleItemProps = {};
export type ISkuSimpleItemState = {};

export type IStoreProps = {};
export type IStoreState = {};
export interface IMainGoodsDetail {
  [k: string]: any;
}
export interface IMainGoodsInfo {
  [k: string]: any;
}
//create by moon https://github.com/creasy2010/moon
