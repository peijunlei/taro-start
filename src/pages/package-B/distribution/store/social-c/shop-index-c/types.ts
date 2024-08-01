import {type} from 'config/upload';
import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  form: {
    pageNum: number;
    pageSize: number;
  };
  totalPages: number;
  //分销员基本信息
  baseInfo?: any;
  //分销员信息
  customerInfo: any;
  //分销设置
  settingInfo: any;
  goodsList: IMainHotGoodsListSet;
  currentPageList: IMainHotGoodsListSet;
  //商品评价是否打开
  isShow: boolean;

  //小店名称
  shopName: string;
  headImg: string;
  request: IMainRequest;
  navToolsObj: IMainNavTools;
  goodsBrands: IMainGoodsBrandsSet;
}
export type IMainGoodsBrandsSet = IMainGoodsBrands[];

export interface IMainGoodsBrands {
  [k: string]: any;
}
export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};
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
  customerId: string;
  brandIds: number[];
  pageNum: number;
  pageSize: number;
  [k: string]: any;
}
//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;
export type IScreenModalProps = {};
export type IScreenModalState = {};
export type ISearchProps = {};
export type ISearchState = {};
export type IInfoProps = {};
export type IInfoState = {};
export type IMainHotGoodsListSet = IMainHotGoodsList[];
export interface IMainHotGoodsList {
  [k: string]: any;
}
//create by moon https://github.com/creasy2010/moon
