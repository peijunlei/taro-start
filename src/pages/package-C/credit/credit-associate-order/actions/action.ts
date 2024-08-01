import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {cache} from 'config';
import Taro from '@tarojs/taro';
import {_} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 列表数据初始化，并计算金额
     * @param list
     * @returns {Promise<void>}
     */
    async initOrderList(list) {
      await action.commonChange('main.repayOrderList', list);
      // 计算还款金额
      await action.calcRepayAmount();
    },

    /**
     * 订单选择事件
     * @param {string} orderId
     * @param {boolean} checked
     * @returns {Promise<void>}
     */
    async checkOrder(orderId: string, checked: boolean) {
      const {selectedOrderIds, repayOrderList} = getData().main;
      // 选中订单
      if (checked) {
        let newCheckOrder = selectedOrderIds.slice(0);
        newCheckOrder.push(orderId);

        let normalOrderList = [];
        repayOrderList.map((order) => {
          if (order.canCheckFlag) {
            normalOrderList = [...normalOrderList, order.id];
          }
        });

        action.commonChange([
          {paths: 'main.selectedOrderIds', value: newCheckOrder},
          {paths: 'main.isCheckedAll', value: newCheckOrder.length == normalOrderList.length},
        ]);
      } else {
        let orderIds = selectedOrderIds.slice(0);
        // 取消选中
        let newCheckOrder = orderIds.filter((v) => v != orderId);
        action.commonChange([
          {paths: 'main.selectedOrderIds', value: newCheckOrder},
          {paths: 'main.isCheckedAll', value: false},
        ]);
      }
      // 计算还款金额
      setTimeout(() => this.calcRepayAmount(), 200);
    },

    /**
     * 全选订单操作
     * @param {boolean} checked
     * @returns {Promise<void>}
     */
    async selectAllOrder(checked: boolean) {
      const {repayOrderList} = getData().main;
      // 只能勾选已完成且无退货退款订单和已完成且部分退货退款完成订单
      let normalOrderList = [];
      if (checked) {
        repayOrderList.map((order) => {
          if (order.canCheckFlag) {
            normalOrderList = [...normalOrderList, order.id];
          }
        });
        action.commonChange([
          {paths: 'main.selectedOrderIds', value: normalOrderList},
          {paths: 'main.isCheckedAll', value: checked},
        ]);
      } else {
        action.commonChange([
          {paths: 'main.selectedOrderIds', value: []},
          {paths: 'main.isCheckedAll', value: checked},
        ]);
      }

      // 计算还款金额
      setTimeout(() => this.calcRepayAmount(), 200);
    },

    /**
     * 计算选中订单的还款金额
     * @returns {Promise<void>}
     */
    async calcRepayAmount() {
      const {selectedOrderIds, repayOrderList} = getData().main;

      let totalPrice = 0.0;
      selectedOrderIds.map((tradeId) => {
        repayOrderList.map((trade) => {
          if (tradeId == trade.id) {
            totalPrice = _.add(totalPrice, trade.canRepayPrice);
          }
        });
      });
      action.commonChange('main.totalPrice', _.addZero(totalPrice));
    },

    /**
     * 保持选择的授信订单
     * @returns {Promise<void>}
     */
    async saveCheckedOrder() {
      let {selectedOrderIds, totalPrice} = getData().main;
      if (selectedOrderIds.length <= 0) {
        Taro.showToast({title: '请选择关联订单', icon: 'none'});
        return;
      }
      let repayInfo = {
        selectedOrderIds: selectedOrderIds,
        totalPrice: totalPrice,
      };
      //设置缓存
      Taro.setStorageSync(cache.ONLINE_RELATED_ORDER, repayInfo);
      //跳回到在线还款页面
      Taro.navigateBack();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('CreditAssociateMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
