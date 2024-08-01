import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {WMkit, _} from 'wmkit';

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState, payTypeId) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待付款';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status != 'VOID' && payState == 'NOT_PAID' && payTypeId == '0') {
    return '待付款';
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
};
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
      if (getData().main && 'key' in getData().main && getData().main.key === keys) {
        return true;
      }
      let form = {orderType: 'POINTS_ORDER', keywords: ''};
      if (keys) {
        const [state, value] = keys.split('-');
        form[state] = value;
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            key: keys,
            form: form,
          },
        },
      });

      // 有邀请人ID并且是店铺内购买，则显示店铺内订单，否则是全部订单
      if (WMkit.inviteeId() && WMkit.isShop()) {
        dispatch({
          type: Command.commonChange,
          payload: [
            {
              paths: 'main.form.inviteeId',
              value: WMkit.inviteeId(),
            },
            {
              paths: 'main.form.channelType',
              value: WMkit.channelType(),
            },
          ],
        });
        this.queryShopInfo(WMkit.inviteeId());
      }
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
          url: `/pages/package-C/order/fill-payment-success/index?tid=${tid}`,
        });
      } catch (e) {
        return false;
      }
      return true;
    },

    async nativeTo() {
      const res = await api.systemPointsConfigController.query();
      if (!res.status) {
        Taro.navigateTo({
          url: '/pages/package-A/customer/user/goods-failure/index',
        });
      }
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
        let isReturn = tradeDetail['tradeState'].flowState == 'COMPLETED';

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
    main: getReducerData('PackageACustomerUserPointsOrdersListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
