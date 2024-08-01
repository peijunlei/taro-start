import Actions from './actions';
import Taro from '@tarojs/taro';
export interface IMainReducer {
  isTabbar: boolean;
  cateItems:any[];
  requestTask:Taro.RequestTask<any>;
  isReady: boolean;
  loadStatus: 'unload' | 'loading' | 'loaded';
  isMenuBoxFlag: boolean;
  menuList: [];
  linkInfoPage: {};
  totalPages: number;
  goods: IMainGoodsSet;
  appointmentSaleVOList: any;
  bookingSaleVOList: any;
  preKeyword: string;
  goodsInfo: any;
  navToolsObj: IMainNavTools;
  batchSpecIsShow: boolean;
  retailSpecIsShow: boolean;
  request: IMainRequest;
  total: IMainTotal;
  goodsShowType: number;
  imageShowType: number;
  goodsCates: IMainGoodsCatesSet;
  goodsBrands: IMainGoodsBrandsSet;
  goodsSpecs: IMainGoodsSpecs;
  shopCarNum: number;
  ifStore: boolean;
  isDistributor: boolean;
  distributionSwitch: number;
  spreadFlag: boolean;

  goodsShareVisible: boolean;
  shareModalVisible: boolean;
  addSelfShop: boolean;
  iepInfo: {};
  iepSwitch: boolean;
  openType: string;
  goodsLabels: any[];
  loadSkeleton: Boolean;
  flashsaleGoods: any;
  isOpenWechat: boolean;
  fromThirdCate: boolean;
  goodsPropertyVOS: IMainGoodsPropertySet;
}

export type IMainGoodsPropertySet = IMainGoodsProperty[];
export interface IMainGoodsProperty {
  [k: string]: any;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISearchProps = {};
export type ISearchState = {};

export type IMenuBoxProps = {};
export type IMenuBoxState = {};

export type ISpuListProps = {};
export type ISpuListState = {};

export type IBigSpuListProps = {};
export type IBigSpuListState = {};

export type ISkuListProps = {};
export type ISkuListState = {};

export type IBigSkuListProps = {};
export type IBigSkuListState = {};

export type INavToolsProps = {};
export type INavToolsState = {
  selectItem: number;
  roteState: boolean;
};

export type ICompositePickerProps = {};
export type ICompositePickerState = {
  composites: any;
  fadeState: boolean;
};

export type IScreenModalProps = {};
export type IScreenModalState = {
  chooseLabels:any[];
  chooseBrands:any[];
  chooseSizes:any[];
  findAllSizes: boolean;
  findAllLabels: boolean;
  findAllBrands: boolean;
  fadeState: boolean;
};

export type IShopCartNumProps = {};
export type IShopCartNumState = {};

export type IMainGoodsSet = IMainGoods[];

export interface IMainGoods {
  [k: string]: any;
}

export type IMainNavTools = {
  arrowFlag: boolean;
  priceSoft: boolean;
  composiName: string;
  composiId: number;
  screenIsShow: boolean;
  commission: boolean;
  [k: string]: any;
};

export interface IMainRequest {
  isGiftCard: boolean;
  deliveryAddressId?:string;
  keywords: string;
  cateId: number;
  companyType: any;
  pointsUsageFlag: boolean;
  distributionGoodsAudit: any;
  distributionGoodsStatus: any;
  brandIds: number[];
  specNameList: string[];
  propDetails: any;
  sortFlag: number;
  esGoodsInfoDTOList: any;
  pageNum: number;
  pageSize: number;
  enterPriseGoodsStatus: string;
  goodsChannelActivityId: number;
  goodsChannelCateIdList: number[];
  [k: string]: any;
}
export type IMainTotal = number;

export type IMainGoodsCatesSet = IMainGoodsCates[];

export interface IMainGoodsCates {
  [k: string]: any;
}

export type IMainGoodsBrandsSet = IMainGoodsBrands[];

export interface IMainGoodsBrands {
  [k: string]: any;
}

export interface IMainGoodsSpecs {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
