import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import GoodsAction from './goodsAction';

import ActivityAction from './activityAction';

import loginGoodsListCouponMain from '../reducers/main';
import action from '@/pages/common/coupon/actions/action';

export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),

    activityAction: getActionProxy<typeof ActivityAction>(ActivityAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(activity, couponId) {
      await actions.loadReducer();

      //商品列表查询
      await actions.goodsAction.query(false, activity, couponId);

      //查询商品分类
      //await actions.goodsAction.findGoodsCates();
      actions.goodsAction.commonChange('main.request.activity', activity);
      actions.goodsAction.commonChange('main.request.couponId', couponId);
      dispatch({
        type: Command.init,
        payload: {
          main: {},
        },
      });
    },
    /**
     * 重置
     */
     async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        loginGoodsListCouponMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginGoodsListCouponMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
