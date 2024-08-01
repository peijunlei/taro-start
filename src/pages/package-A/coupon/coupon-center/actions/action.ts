import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {immutable} from 'wmkit'
import Taro from '@tarojs/taro';
import * as immerUtil from '@/redux/immer-util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 切换分类弹窗改变选中分类
     * @param tab
     */
    async changeCateId(cateId: string, key: number) {
      action.commonChange([
        {paths: 'main.couponCateId', value: cateId},
        {paths: 'main.activedKey', value: key},
        {paths: 'main.request.pageNum', value: 0},
        {paths: 'main.request.couponCateId', value: cateId},
      ]);
      action.query();
      // this.modifySearch({ pageNum: 0, couponCateId: cateId }, { isQuery: true, isResetPage: true });
    },
    /**
     * 改变分类/类型弹窗显示隐藏
     * @param tab
     */
    async changeMaskShow(type: number) {
      const {
        main: {showCateMask, showDrapMenu},
      } = getData();
      if (type == 1) {
        await action.commonChange('main.showDrapMenu', !showDrapMenu);
      } else if (type == 2) {
        await action.commonChange('main.showCateMask', !showCateMask);
      } else {
        await action.commonChange([
          {paths: 'main.showDrapMenu', value: false},
          {paths: 'main.showCateMask', value: false},
        ]);
      }
    },
    /**
     * 优惠券领取按钮状态改变
     * @param tab
     */
    async changeGet(index, couponStarted) {
      const {main} = getData();
      const skusNew = immutable.fromJS(main)
        .setIn(['couponList', index, 'hasFetched'], true)
        .setIn(['couponList', index, 'couponStarted'], couponStarted);
      await action.commonChange('main.couponList', skusNew.toJS().couponList);
    },
    /**
     * 改变优惠券类型值
     * @param tab
     */
    async changeTypeValue(value: any) {
      await action.commonChange([
        {paths: 'main.request.pageNum', value: 0},
        {paths: 'main.request.couponType', value: value},
      ]);
      action.query();
      // this.modifySearch({ pageNum: 0, couponType: value }, { isQuery: true, isResetPage: true });
    },
    /**
     * 优惠券倒计时结束
     */
    async countOver(index) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.couponList',
          value: (couponList) => {
            couponList.splice(index, 1);
            return couponList;
          },
        },
      });
    },
    /**
     * 领取优惠券
     */
    async receiveCoupon(coupon, index) {
      const {main} = getData();

      await api.couponCodeBaseController.customerFetchCoupon({
        couponInfoId: coupon.couponId,
        couponActivityId: coupon.activityId,
      });

      const skusNew = immutable.fromJS(main)
        .setIn(['couponList', index, 'hasFetched'], true)
        .setIn(['couponList', index, 'couponStarted'], await this.convertCouponStarted(coupon));
      await action.commonChange('main.couponList', skusNew.toJS().couponList);
    },

    /**
     * 计算couponStarted 优惠券开始标记
     * @private
     */
    async convertCouponStarted(coupon) {
      let couponStarted = false;
      if (coupon.rangeDayType === 0) {
        if (new Date(coupon.couponStartTime.replace(/-/g, '/')).getTime() - new Date().getTime() < 0) {
          couponStarted = true;
        }
      }
      //领取生效
      if (coupon.rangeDayType === 1) {
        couponStarted = true;
      }
      return couponStarted;
    },

    async modifySearch(
      param,
      options: {
        isQuery?: boolean;
        isResetPage?: boolean;
      } = {isQuery: true, isResetPage: false},
    ) {
      dispatch({type: Command.modifyRequest, payload: param});
      //修改完直接查询;
      if (options.isQuery) {
        await this.query(options.isResetPage);
      }
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {request = {}, total} = getData().main || {};
      const num = request.pageNum;
      if (num >= total - 1) {
        return;
      }
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.request.pageNum',
          value: num + 1,
        },
      });
      // dispatch({ type: Command.modifyRequest, payload: { pageNum: request.pageNum + 1 } });
      await this.query();
    },
    /**
     * 以当前查询条件查询
     */
    async query() {
      action.commonChange('main.isLoadingList',false)
      let {request = {}, couponList, couponInfo} = getData().main || {};
      let res;
      let token = Taro.getStorageSync('authInfo:token');
      if (token) {
        res = await api.couponInfoController.getCouponStarted(request);
      } else {
        res = await api.couponInfoController.getCouponStartedFront(request);
      }
      if (request.pageNum == 0) {
        action.commonChange([
          {paths: 'main.couponList', value: res.couponViews.content},
          {paths: 'main.total', value: res.couponViews.totalPages},
          {paths: 'main.couponInfo', value: res},
        ]);
      } else {
        console.log('couponInfo',couponInfo)
        if (res && res.storeMap) {
          if(couponInfo.storeMap){
            action.commonChange('main.couponInfo.storeMap', Object.assign(couponInfo.storeMap, res.storeMap));
          }
        }
        action.commonChange([{paths: 'main.couponList', value: couponList.concat(res.couponViews.content)}]);
      }
      action.commonChange('main.isLoadingList',true)
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACouponCouponCenterMain'),

    actor: getReducerData('packageACouponCouponCenterActor'),
  };
}

//create by moon https://github.com/creasy2010/moon
