import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {VAS} from 'wmkit';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import GoodsAction from './goodsAction';

import ActivityAction from './activityAction';

import loginGoodsListPromotionMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),

    activityAction: getActionProxy<typeof ActivityAction>(ActivityAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(marketingId, reset = true) {
      await actions.loadReducer();
      //获取营销信息
      let res: any;
      try {
        const reqs = [
          actions.activityAction.getMarketingById(marketingId),
          //获取购物车商品选择的营销
          actions.activityAction.queryGoodsMarketingList(),
          // 计算购物车中参加同种营销的商品列表/总额/优惠
          actions.activityAction.calcMarketing(marketingId, null),
          //查询商品分类
          //await actions.goodsAction.findGoodsCates();
          VAS.fetchIepInfo(),
          VAS.checkIepAuth(),
        ];
        res = await Promise.all(reqs);
      } catch (e) {}
      let iepInfo = res[3];
      let iepSwitch = res[4];
      dispatch({
        type: Command.init,
        payload: {
          main: {
            marketingId,
            iepInfo,
            iepSwitch,
            goodsCates: res[3].cateList || [], //分类集合
            goodsBrands: res[3].brands || [], //品牌集合
          },
        },
      });
      if (reset) {
        //商品列表查询
        actions.goodsAction.query(false, marketingId);
      }
      setTimeout(() => {
        /** 获取浮窗 - 高度 - 操作 */
        actions.activityAction.getPickerHeightFn();
      }, 0);
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        loginGoodsListPromotionMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginGoodsListPromotionMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
