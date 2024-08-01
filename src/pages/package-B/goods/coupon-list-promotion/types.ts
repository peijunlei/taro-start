import Actions from './actions';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingFlag:boolean;
  goods: IMainGoodsSet;
  //分类集合
  goodsCates: any;
  couponInfo: any;
  //品牌集合
  goodsBrands: any;
  navToolsObj: IMainNavTools;
  request: IMainRequest;
  total: IMainTotal;
  imageShowType: number;
  marketingId: number;
  goodsMarketing: IGoodsMarketing;
  title: string;
  marketing: IMarketing;
  loadSkeleton: boolean;
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

export type ISkuListProps = {};
export type ISkuListState = {};

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

export type ISalesPickerProps = {};
export type ISalesPickerState = {};

export type IClassifyPickerProps = {};
export type IClassifyPickerState = {};

export type IFindGiftsModalProps = {};
export type IFindGiftsModalState = {};

export type IBrandPickerProps = {};
export type IBrandPickerState = {};

export type IActivityProps = {};
export type IActivityState = {};

export type IConfirmMaskProps = {};
export type IConfirmMaskState = {};

export type IMaskProps = {};
export type IMaskState = {};

export type IBottomProps = {};
export type IBottomState = {};

export type IGiftMaskProps = {};
export type IGiftMaskState = {};

export type IGiftListProps = {};
export type IGiftListState = {};

export type IGiftItemProps = {
  //un-check check 赠品
  type: 1 | 2 | 3;
};
export type IGiftItemState = {};

export type IMainGoodsSet = IMainGoods[];

export interface IMainGoods {
  [k: string]: any;
}

export type IMainNavTools = {
  arrowFlag: boolean;
  priceSoft: boolean;
  composiName: string;
  composiId: number;
  catesFlag: boolean;
  brandFlag: boolean;
  [k: string]: any;
};

export interface IMainRequest {
  cateIds: number[];
  brandIds: number[];
  couponId: string;
  activity: string;
  sortFlag: number;
  pageNum: number;
  pageSize: number;
  [k: string]: any;
}
export type IMainTotal = number;

export interface IGoodsMarketing {}
export interface IMarketing {
  [k: string]: any;
}
export interface ICalc {
  [k: string]: any;
}

export type IGift = IGiftSet[];

export interface IGiftSet {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
