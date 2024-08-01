import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  maskOpen: boolean;
  tabType: 0 | 1;
  checkCoupon: any;
  checkCouponStore: any;
  canUseCouponsLength: number;
  disableCouponsLength: number;
  isLoading?: boolean;
  canUseCoupons: any;
  disableCoupons: any;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoMaskProps = {};
export type IInfoMaskState = {};

export type ICouponTabProps = {};
export type ICouponTabState = {};

export type ICouponListProps = {};
export type ICouponListState = {};

export type ICouponItemProps = {};
export type ICouponItemState = {};
//create by moon https://github.com/creasy2010/moon
