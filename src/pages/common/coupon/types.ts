import Actions from './actions';
import {CouponVO3} from 'api/CouponInfoController';

export interface IMainReducer {
  isReady: boolean;
  coupon: {
    couponViews: CouponVO3;
    storeMap: any;
  };
  isLoading?: boolean;
  goodsInfoIds: [];
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ICouponListProps = {};
export type ICouponListState = {};

export type ICouponItemProps = {};
export type ICouponItemState = {};

//create by moon https://github.com/creasy2010/moon
