import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 初始化
     * @param {string} key
     * @param value
     * @returns {Promise<void>}
     */
    async init() {
      // 查询缓存的关联授信订单信息
      let relatedInfo = await Taro.getStorageSync(cache.ONLINE_RELATED_ORDER);
      let {selectedOrderIds = [], totalPrice = 0} = relatedInfo;
      // 还款说明
      let repayNotes = await Taro.getStorageSync(cache.ONLINE_REPAY_NOTE);
      //查询客户授信账户
      const customerCreditAccountRes = await api.customerCreditRepayBaseController.getCreditAccountByCustomerIdForRepay();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            // 是否还款中 true 还款中 false 否
            waitRepay: customerCreditAccountRes.waitRepay,
            // 还款账号和还款信息
            customerCreditRepayVO: customerCreditAccountRes.customerCreditRepayVO,
            // 交易单列表
            tradeVOList: customerCreditAccountRes.tradeVOList,
            // 关联订单相关信息
            onlineRepay: {orderIds: selectedOrderIds, repayAmount: totalPrice, repayNotes: repayNotes},
          },
        },
      });
    },

    /**
     * 页面值变化
     * @param {string} key
     * @param value
     * @returns {Promise<void>}
     */
    async fieldChange(key: string, value) {
      action.commonChange(key, value);
    },

    /**
     * 跳转到关联订单页面
     * @returns {Promise<void>}
     */
    async toRelatedOrder() {
      let {onlineRepay} = getData().main;
      //设置还款说明缓存
      await Taro.setStorageSync(cache.ONLINE_REPAY_NOTE, onlineRepay.repayNotes);
      Taro.navigateTo({
        url: `/pages/package-C/credit/credit-associate-order/index?selectedOrderIds=${onlineRepay.orderIds}`,
      });
    },

    /**
     * 保存在线还款记录
     * @returns {Promise<void>}
     */
    async saveOnlineRepay() {
      let {onlineRepay} = getData().main;
      //判断所有字段合法性
      if (!onlineRepay.orderIds || onlineRepay.orderIds.length < 1) {
        Taro.showToast({title: '请选择关联订单', icon: 'none'});
        return;
      }
      if (!onlineRepay.repayNotes && onlineRepay.repayNotes.length > 500) {
        Taro.showToast({title: '还款说明：最多500字', icon: 'none'});
        return;
      }
      //保存授信还款申请
      let res;
      try {
        res = await api.customerCreditRepayBaseController.add(onlineRepay);
        // 删除缓存的授信订单信息
        Taro.removeStorageSync(cache.ONLINE_RELATED_ORDER);
        // 还款说明
        Taro.removeStorageSync(cache.ONLINE_REPAY_NOTE);
        Taro.navigateTo({
          url: `/pages/package-C/credit/repay-method/index?repayOrderCode=${res.customerCreditRepayVO.repayOrderCode}`,
        });
      } catch (e) {
        // 删除缓存的授信订单信息
        Taro.removeStorageSync(cache.ONLINE_RELATED_ORDER);
        Taro.showToast({title: e.message, icon: 'none'});
        if (e.code !== 'K-000001') {
          //刷新
          setTimeout(() => {
            this.init();
          }, 1000);
        }
        return;
      }
    },

    /**
     * 取消还款
     * @returns {Promise<void>}
     */
    async onCancelRepay() {
      // 取消还款申请
      try {
        await api.customerCreditRepayBaseController.cancel();
        // 隐藏弹框
        action.commonChange('main.isCanceled', false);
        // 删除缓存的授信订单信息
        Taro.removeStorageSync(cache.ONLINE_RELATED_ORDER);
        // 还款说明
        Taro.removeStorageSync(cache.ONLINE_REPAY_NOTE);
        // 取消后，刷新页面
        this.init();
      } catch (e) {
        Taro.showToast({title: e.message, icon: 'none'});
      }
    },

    /**
     * 在线还款下一步，去收银台
     * @returns {Promise<void>}
     */
    async checkRepay() {
      let {customerCreditRepayVO} = getData().main;
      try {
        await api.customerCreditRepayBaseController.checkRepayOrder();
        // 删除缓存的授信订单信息
        Taro.removeStorageSync(cache.ONLINE_RELATED_ORDER);
        // 还款说明
        Taro.removeStorageSync(cache.ONLINE_REPAY_NOTE);
        Taro.navigateTo({
          url: `/pages/package-C/credit/repay-method/index?repayOrderCode=${customerCreditRepayVO.repayOrderCode}`,
        });
      } catch (e) {
        // 删除缓存的授信订单信息
        Taro.removeStorageSync(cache.ONLINE_RELATED_ORDER);
        // 还款说明
        Taro.removeStorageSync(cache.ONLINE_REPAY_NOTE);
        Taro.showToast({title: e.message, icon: 'none'});
      }
    },
  };

  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('onlineRepaymentMain'),
  };
}
