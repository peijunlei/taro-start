import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

export function store2Props({
  packageACouponCouponCenterMain,

  packageACouponCouponCenterActor,
}: any): IAllReducerProps {
  return {
    main: packageACouponCouponCenterMain,

    actor: packageACouponCouponCenterActor,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
//create by moon https://github.com/creasy2010/moon
