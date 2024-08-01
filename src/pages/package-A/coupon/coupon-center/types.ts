import Actions from './actions';
import {CouponCateVOArray} from 'api/CouponCateController';
import {CouponVO, CouponCacheCenterPageResponse} from 'api/CouponInfoController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList:boolean;
  couponType: number;

  couponCateId: IMainCouponCateId;

  couponCateList: CouponCateVOArray;

  activedKey: number;

  showCateMask: IMainShowCateMask;

  showDrapMenu: IMainShowDrapMenu;

  initialEnd: IMainInitialEnd;
  couponInfo: CouponCacheCenterPageResponse;
  request: {pageNum: 0; pageSize: 10; couponCateId: null; couponType: null};
  total: ITotalType;
  couponList: CouponVO;
  isLogin: boolean;
  isExplainFlag: boolean; //领券规则开关
  couponDesc: string; //领券规则
}

export interface IActorReducer {
  isReady: boolean;
  isLoading?: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  actor: IActorReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ICouponListProps = {};
export type ICouponListState = {};

export type ICouponItemProps = {};
export type ICouponItemState = {};

export type ICouponCateMaskProps = {};
export type ICouponCateMaskState = {};

export type ICateTabProps = {};
export type ICateTabState = {};

export type IHeaderProps = {};
export type IHeaderState = {};

export type ICouponTypeMaskProps = {};
export type ICouponTypeMaskState = {};

export type IMainCouponType = string;
export type IMainCouponCateId = string;
export type IMainActivedKey = string;
export type IMainShowCateMask = boolean;
export type IMainShowDrapMenu = boolean;
export type IMainInitialEnd = boolean;
export type IActorForm = {};
export type IRequestType = {};
export type ITotalType = number;
export type ICouponList = [];
export interface IActorCouponStateChanged {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
