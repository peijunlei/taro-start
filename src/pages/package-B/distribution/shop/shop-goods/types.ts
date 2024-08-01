import Actions from './actions';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  delayLoading:boolean;
  goods: IMainGoodsSet;
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
  goodsLabels: [];
  loadStatus: string;
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

export type ISpuListProps = {};
export type ISpuListState = {};

export type IBigSpuListProps = {};
export type IBigSpuListState = {};

export type ISkuListProps = {};
export type ISkuListState = {
  /** .social_btn_box_2023元素宽度 - 集合 */
  socialBtnBox2023WidthList: Array<number>;
};

export type IBigSkuListProps = {};
export type IBigSkuListState = {};

export type INavToolsProps = {};
export type INavToolsState = {
  selectItem: number;
};

export type ICompositePickerProps = {};
export type ICompositePickerState = {
  composites: any;
};

export type IScreenModalProps = {};
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
  [k: string]: any;
};

export interface IMainRequest {
  keywords: string;
  cateId: number;
  companyType: any;
  brandIds: number[];
  propDetails: any;
  sortFlag: number;
  esGoodsInfoDTOList: any;
  hideSelectedDistributionGoods?: boolean; //是否隐藏已选商品
  pageNum: number;
  pageSize: number;
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
