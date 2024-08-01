import Actions from './actions';
import {CouponCodeVO} from 'api/couponCodeBaseController';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  delayLoading:boolean;
  unUseCount: IMainUnUseCount;

  usedCount: IMainUsedCount;

  overDueCount: IMainOverDueCount;

  useStatus: number;

  couponType: IMainCouponType;

  showDrapMenu: boolean;
  couponList: CouponCodeVO;
  request: IRequestType;
  total: ITotalType;
  isExplainFlag: boolean; //领券规则开关
  couponDesc: string; //领券规则
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IHeaderProps = {};
export type IHeaderState = {};

export type ICouponTypeMaskProps = {};
export type ICouponTypeMaskState = {};

export type ICouponListProps = {};
export type ICouponListState = {};

export type ICouponItemProps = {};
export type ICouponItemState = {};
export type IEmptyProps = {};
export type IEmptyState = {};

export type ICouponStatusTabProps = {};
export type ICouponStatusTabState = {};

export type IMainUnUseCount = number;
export type IMainUsedCount = number;
export type IMainOverDueCount = number;
export type IMainUseStatus = number;
export type IMainCouponType = null | number;
export type IMainShowDrapMenu = boolean;
export type IRequestType = {
  pageNum: number;
};
export type ITotalType = number;

//create by moon https://github.com/creasy2010/moon
