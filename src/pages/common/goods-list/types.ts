import Actions from './actions';
export interface IMainReducer {
  // 首次加载完成标识别
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
  goodsPropertyVOS: IMainGoodsPropertySet;
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
  goodsLabels: [];
  loadSkeleton: Boolean;
  flashsaleGoods: any;
  isOpenWechat: boolean;
  outOfStockFlag: boolean;
  brandMap: {};
  scrollTop: number;
  scrollTopToRight: number;
  brandTab: number;
  fromThirdCate: boolean;
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
export type IBrandFilterProps = {};
export type IScreenModalState = {
  chooseBrands: Array<Object>;
  findAllBrands: boolean;
  findAllLabels: boolean;
  fadeState: boolean;
  chooseCates: Array<any>;
  findAllCates: boolean;
  findAllProps: any;
  chooseProperty: any;
};

export type IBrandFilterState = {
  fadeState: boolean;
  chooseBrands: any;
  chooseRecoBrands: any;
  listHeights: any;
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
  keywords: string;
  cateId: number;
  companyType: any;
  pointsUsageFlag: boolean;
  distributionGoodsAudit: any;
  distributionGoodsStatus: any;
  brandIds: number[];
  propDetails: any;
  sortFlag: number;
  esGoodsInfoDTOList: any;
  pageNum: number;
  pageSize: number;
  enterPriseGoodsStatus: string;
  stockFlag: number;
  isOutOfStockShow: number;
  salePriceLow: number;
  salePriceHigh: number;
  [k: string]: any;
}
export type IMainTotal = number;

export type IMainGoodsCatesSet = IMainGoodsCates[];

export type IMainGoodsPropertySet = IMainGoodsProperty[];

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

export interface IMainGoodsProperty {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
