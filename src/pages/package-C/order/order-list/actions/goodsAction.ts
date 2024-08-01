import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import Taro, { redirectTo } from '@tarojs/taro';
import { WMkit, _ } from 'wmkit';
import { cache } from 'config';

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
      // 切换tab时，先把服务器时间置空
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.serverTime',
          value: null,
        },
      });

      let { key, form } = getData().main;
      let a = { pageNum: 0, pageSize: 10 };
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
      //获取订单列表
      action.query();
      // 重新查询服务器时间
      action.setServerTime();

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
      let { form, orders, keywords } = getData().main;
      const isShop = WMkit.isShop();
      action.commonChange('main.isLoadingList', true);
      let inviteeId = null;
      if (isShop) {
        inviteeId = Taro.getStorageSync(cache.INVITEE_ID);
      }
      // 如果是全部订单，将form里面的这三个属性成员删掉，不带在参数里
      if (!form.flowState && !form.payState) {
        delete form.flowState;
        delete form.payState;
        delete form.channelType;
      }
      form = { ...form, keywords, inviteeId };
      const LOGIN_DATA = Taro.getStorageSync(cache.LOGIN_DATA);
      // 礼品卡独立登录入口使用记录查询相关订单
      if (LOGIN_DATA?.userGiftCardId) {
        form.userGiftCardId = LOGIN_DATA.userGiftCardId;
      }
      action.commonChange([{ paths: 'main.isLoading', value: true }]);
      try {
        const res = await api.tradeBaseController.page(form);
        if (form.pageNum == 0) {
          action.commonChange([
            { paths: 'main.orders', value: res.content },
            { paths: 'main.isLoading', value: false },
            { paths: 'main.total', value: res.totalPages },
          ]);
        } else {
          action.commonChange([
            { paths: 'main.orders', value: orders.concat(res.content) },
            { paths: 'main.isLoading', value: false },
          ]);
        }
      } catch (e) {
        if (e.code === 'K-999995') {
          WMkit.clearLoginCache();
        }
        //
      }
      action.commonChange('main.isLoadingList', false);
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let { form, total } = getData().main;
      if (form.pageNum + 1 == total) return;
      let num = form.pageNum + 1;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.form.pageNum',
          value: num,
        },
      });
      await this.query();
    },
    /**
     * 取消订单
     */
    async cancelOrder(tid) {
      action.commonChange([
        { paths: 'main.visible', value: true },
        { paths: 'main.tid', value: tid },
      ]);
    },
    /**
     * 0元支付
     */
    async defaultPay(tid) {
      try {
        await api.tradeBaseController.defaultPay(tid);
        let res = await api.tradeBaseController.details(tid);
        if (res) {
          let context = [];
          context.push({
            extendMap: res.extendMap,
            tid: res.id,
            parentTid: res.parentId,
            tradeState: res.tradeState,
            paymentOrder: res.paymentOrder,
            orderTimeOut: res.orderTimeOut,
            isBookingSaleGoods: res.isBookingSaleGoods,
            bookingType: res.bookingType,
            storeName: res?.supplier?.storeName || '',
            isSelf: res?.supplier?.isSelf,
            storeType: res?.supplier?.storeType,
            crossBorderFlag: res.crossBorderFlag,
            price: res?.tradePrice?.totalPrice || 0,
            totalPrice: null,
          });
          let stringContext = encodeURIComponent(JSON.stringify(context));
          Taro.navigateTo({
            url: `/pages/package-C/order/order-tool/order-success/index?param=${stringContext}`,
          });
        } else {
          Taro.navigateTo({
            url: `/pages/package-C/order/fill-payment-success/index?tid=${tid}`,
          });
        }
      } catch (e) {
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
          if (tradeDetail['isAllReturn']) {
            canApply = false;
            errMsg = '订单已没有可退商品';
          }
          // 没有待处理的申请
          if (canApply) {
            if (tradeDetail['tradeItems'] && tradeDetail['tradeItems'].filter((v) => v.canReturnNum > 0).length == 0) {
              // 退货申请，如果没有可退商品则不允许申请
              canApply = false;
              errMsg = '订单已没有可退商品';
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
        } else {
          errMsg = '系统异常';
        }
      }

      //  可以申请，进入申请页面，否则提示错误信息
      if (canApply) {
        Taro.navigateTo({
          url: `/pages/package-C/order/return-refund/return-first-step/index?tid=${tid}`,
        });
      } else {
        Taro.showToast({
          title: errMsg,
          icon: 'none',
          duration: 2000,
        });
      }
    },

    //订单状态弹框筛选
    tabsChange(key) {
      let url = '';
      switch (key) {
        case 'assemble-order':
          url = '/pages/package-B/groupon/customer-groupon-list/index';
          break;
        case 'seckill-order':
          url = '/pages/package-B/groupon/customer-groupon-list/index';
          break;
        case 'points-order':
          url = '/pages/package-A/customer/user/points-order-list/index?keywords=';
          break;
        case 'virtual-order':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=1';
          break;
        case 'coupon-order':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=2';
          break;
        case 'movie-order':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=3';
          break;
        case 'local-life-order':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=4';
          break;
        case 'performance-order':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=5';
          break;
        case 'dingdong':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=6';
          break;
        case 'meituan':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=7';
          break;
        case 'sam':
          Taro.removeStorageSync('vir_order_list_tab');
          url = '/pages/package-A/customer/user/virtual-order-list/index?id=8';
          break;
      }
      url &&
        Taro.navigateTo({
          url,
        });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginOrdersListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
