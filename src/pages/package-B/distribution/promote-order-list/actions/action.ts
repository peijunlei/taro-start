import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import * as WMkit from '@/wmkit/common/kit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    /**
     * tab切换
     */
    async changeTopActive(keys: string) {
      let {key, form} = getData().main;
      let a = {pageNum: 0, pageSize: 10, customerOrderListAllType: true};
      if (keys !== '') {
        a.customerOrderListAllType = false;
      }
      if (key != keys) {
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.key',
            value: keys,
          },
        });
        const [state, value] = keys.split('-');
        a[state] = value;
        dispatch({
          type: Command.setForm,
          payload: {
            form: a,
          },
        });
      }
      //获取订单列表是
      action.query();
    },
    /**
     * 查询店铺-小店名称
     * @param distributorId
     * @returns {Promise<void>}
     */
    async queryShopInfo(distributorId) {
      const propsRes = (await api.goodsInfoBaseController.getShopInfo(distributorId)) as any;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.inviteeShopName',
          value: propsRes,
        },
      });
    },
    /**
     * 设置
     */
    async setServerTime() {
      //获取服务时间
      try {
        const serverTime = await api.systemController.queryServerTime();
        //存储服务时间
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.serverTime',
            value: serverTime,
          },
        });
        return true;
      } catch (e) {
        return false;
      }
    },
    /**
     * 查询订单列表
     */
    async query() {
      let {form, orders} = getData().main;
      action.commonChange('main.isLoadingList', true);
      const res = await api.tradeBaseController.customerOrderPage(form);
      if (form.pageNum == 0) {
        action.commonChange([{paths: 'main.orders', value: res.content}]);
      } else {
        action.commonChange([{paths: 'main.orders', value: orders.concat(res.content)}]);
      }
      action.commonChange([{paths: 'main.totalPages', value: res.totalPages}]);
      action.commonChange('main.isLoadingList', false);
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {form, totalPages} = getData().main;
      let num = form.pageNum + 1;
      if (num == totalPages) return;
      // action.commonChange('main.delayFlag', false);
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.form.pageNum',
          value: num,
        },
      });
      await this.query();
      // setTimeout(() => {
      //   action.commonChange('main.delayFlag', true);
      // }, 1500);
    },

    /**
     * 取消订单
     */
    async cancelOrder(tid) {
      Taro.showModal({
        title: '取消订单',
        content: '您确定要取消该订单?',
      }).then(async (res) => {
        if (res.confirm) {
          try {
            await api.tradeBaseController.cancel(tid);
            Taro.showToast({
              title: '取消成功',
              icon: 'none',
              duration: 2000,
            });
            // window.location.reload();
            //获取订单列表
            action.query();
          } catch (error) {}
        }
      });
    },
    /**
     * 0元支付
     */
    async defaultPay(tid) {
      try {
        await api.tradeBaseController.defaultPay(tid);
        Taro.navigateTo({
          url: `/pages/package-C/order/fill-payment-success/index?tid=${tid}`
        })
      }catch (e) {
        return false;
      }
      return true;
    },
    async applyRefund(tid) {
      let context = await api.returnOrderBaseController.tradeDetails(tid);
      let tradeDetail = context;
      let errMsg;
      let canApply = false;
      if (tradeDetail) {
        const flowState = tradeDetail['tradeState'] ? tradeDetail['tradeState']['flowState'] : '';
        const payState = tradeDetail['tradeState'] ? tradeDetail['tradeState']['payState'] : '';
        const deliverStatus = tradeDetail['tradeState'] ? tradeDetail['tradeState']['deliverStatus'] : '';

        // 获取该订单所有的待处理及已完成的退单列表
        let orderReturnListRes = await api.returnOrderBaseController.findByTid(tid);

        if (orderReturnListRes) {
          canApply = true;

          // 如果有未处理完的，则不允许再次申请
          (orderReturnListRes as any).forEach((v) => {
            if (
              v.returnFlowState != 'REFUNDED' &&
              v.returnFlowState != 'COMPLETED' &&
              v.returnFlowState != 'REJECT_REFUND' &&
              v.returnFlowState != 'REJECT_RECEIVE' &&
              v.returnFlowState != 'VOID'
            ) {
              // 有未处理完的
              canApply = false;
              errMsg = '该订单关联了处理中的退单，不可再次申请';
            }
          });

          // 没有待处理的申请
          if (canApply) {
            // 退款申请，如果有已完成的则不允许再次申请
            if (flowState == 'AUDIT' && payState == 'PAID' && deliverStatus == 'NOT_YET_SHIPPED') {
              (orderReturnListRes as any).forEach((v) => {
                // 已完成申请的
                if (v.returnFlowState == 'COMPLETED') {
                  canApply = false;
                  errMsg = '无可退商品';
                }
              });
            } else {
              if (
                tradeDetail['tradeItems'] &&
                tradeDetail['tradeItems'].filter((v) => v.canReturnNum > 0).length == 0
              ) {
                // 退货申请，如果没有可退商品则不允许申请
                canApply = false;
                errMsg = '无可退商品';
              } else if (tradeDetail['payInfo']['payTypeId'] == '0') {
                // 在线支付需判断退款金额
                let totalApplyPrice = 0;
                (orderReturnListRes as any).forEach((v) => {
                  // 计算已完成的申请单退款总额
                  if (v.returnFlowState == 'COMPLETED') {
                    totalApplyPrice = _.add(
                      totalApplyPrice,
                      v.returnPrice.applyStatus ? v.returnPrice.applyPrice : v.returnPrice.totalPrice,
                    );
                  }
                });
                if (
                  totalApplyPrice > tradeDetail['tradePrice']['totalPrice'] &&
                  tradeDetail['tradePrice']['totalPrice'] !== 0
                ) {
                  canApply = false;
                  errMsg = '无可退金额';
                }
              }
            }
          }
        } else {
          errMsg = '系统异常';
        }
      }

      //  可以申请，进入申请页面，否则提示错误信息
      if (canApply) {
        // 已完结订单，则为退货申请，否则认为是退款申请
        let isReturn = tradeDetail['tradeState'].flowState == 'COMPLETED' ? true : false;

        // 退货，则进入退货申请页面，否则进入退款申请页面
        if (isReturn) {
          Taro.navigateTo({
            url: `/pages/package-C/order/return-refund/return-first-step/index?tid=${tid}`,
          });
        } else {
          Taro.navigateTo({
            url: `/pages/package-C/order/return-refund/refund-first-step/index?tid=${tid}`,
          });
        }
      } else {
        Taro.showToast({
          title: errMsg,
          icon: 'none',
          duration: 2000,
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('PackageBDistributionPromoteOrdersListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
