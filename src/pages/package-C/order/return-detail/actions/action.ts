import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
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

    //判断是否登录
    async _isLogin() {
      const isLogin = Taro.getStorageSync('authInfo:token') ? Boolean(Taro.getStorageSync('authInfo:token')) : false;
      await action.commonChange('main.isLogin', Boolean(isLogin));
      return isLogin;
    },
    //初始化订单详情
    async _dataReady(tid) {
      const res = await api.returnOrderBaseController.findById_(tid);
      const res2 = await api.systemPointsConfigController.query();
      let reason = '';
      let flag = false;
      if (res2 && res2.status == 1) {
        flag = true;
      }
      if (res.returnFlowState == 'REJECT_RECEIVE' || res.returnFlowState == 'VOID') {
        // 拒绝收货 或者 审核驳回
        reason = res.rejectReason || '';
      } else if (res.returnFlowState == 'REJECT_REFUND') {
        //拒绝退款
        const res1 = await api.refundOrderController.queryRefundByReturnOrderNo(tid);
        let refuseReason = '';
        res1.refundOrderResponseList.forEach((r) => {
          refuseReason = refuseReason + r.refuseReason + ' ';
        });
        reason = refuseReason || '';
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            detail: res,
            rejectReason: reason,
            pointsIsOpen: flag,
          },
        },
      });
    },
    /**
     * 取消退单
     */
    async cancelOrder(tid) {
      Taro.showModal({
        title: '取消退货退款',
        content: '您确定要取消该退货退款?',
      }).then(async (res) => {
        if (res.confirm) {
          try {
            await api.returnOrderBaseController.cancel(tid, '用户取消');
            Taro.showToast({
              title: '成功取消退单',
              icon: 'none',
              duration: 2000,
            });
            //获取订单列表
            this._dataReady(tid);
          } catch (error) {}
        }
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('PackageCOrderReturnDetailMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
