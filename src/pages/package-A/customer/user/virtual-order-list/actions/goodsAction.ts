import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import goodsInfoBaseController from 'api/GoodsInfoBaseController';
import returnOrderBaseController from 'api/ReturnOrderBaseController';
import systemController from 'api/SystemController';
import tradeBaseController from 'api/TradeBaseController';
import { extraPathsValue } from '@/redux/util';
import Taro, { getCurrentInstance, redirectTo } from '@tarojs/taro';
import { WMkit, _, msg } from 'wmkit';
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
      let id = getCurrentInstance().router.params.id;
      // 切换tab时，先把服务器时间置空
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.serverTime',
          value: null,
        },
      });

      let { key, form } = getData().main;
      let a = { pageNum: 0, pageSize: 10, goodsType: id };
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
          type: Command.setForms,
          payload: {
            form: a,
          },
        });
      }
      //获取订单列表
      action.query();
      // 重新查询服务器时间
      action.setServerTime();
    },
    /**
     * 查询店铺-小店名称
     * @param distributorId
     * @returns {Promise<void>}
     */
    async queryShopInfo(distributorId) {
      const propsRes = (await goodsInfoBaseController.getShopInfo(distributorId)) as any;
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
        const serverTime = await systemController.queryServerTime();
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
      let id = getCurrentInstance().router.params.id;
      const isShop = WMkit.isShop();
      action.commonChange('main.isLoadingList', true);
      // 如果是全部订单，将form里面的这三个属性成员删掉，不带在参数里
      if (!form.flowState && !form.payState) {
        delete form.flowState;
        delete form.payState;
        delete form.channelType;
      }
      // 电影，生活，演出
      if (['3', '4', '5'].includes(id)) {
        form = {
          ...form,
          ...{ goodsType: null },
          keywords,
          xuanKuaTradeFlag: 1,
          xuanKuaMovieTradeFlag: id === '3' ? 1 : null,
          xuanKuaLifeTradeFlag: id === '4' ? 1 : null,
          xuanKuaDramaTradeFlag: id === '5' ? 1 : null,
        };
      } else if (['6', '7', '8'].includes(id)) {
        // 6,7,8 对应 叮咚 美团 山姆  对应查询条件 2 1 0 
        form = { ...form, keywords, goodsType: null, tongKaShuKeTradeType: id === '6' ? 2 : id === '7' ? 1 : 0 };
      } else {
        form = { ...form, keywords, goodsType: id, xuanKuaTradeFlag: false };
      }
      action.commonChange([{ paths: 'main.isLoading', value: true }]);

      console.log('%c [  ]-112', 'font-size:13px; background:pink; color:#bf2c9f;');
      const res = await tradeBaseController.page(form);

      console.log('%c [  ]-115', 'font-size:13px; background:pink; color:#bf2c9f;');
      console.log('>>>>>> tradeBaseController.page:', form);
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
      action.setServerTime();
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
        await tradeBaseController.defaultPay(tid);
        Taro.navigateTo({
          url: `/pages/package-C/order/fill-payment-success/index?tid=${tid}`,
        });
      } catch (e) {
        return false;
      }
      return true;
    },
    async applyRefund(tid) {
      let context = await returnOrderBaseController.tradeDetails(tid);
      let tradeDetail = context;
      let errMsg;
      let canApply = false;
      if (tradeDetail) {
        const flowState = tradeDetail['tradeState'] ? tradeDetail['tradeState']['flowState'] : '';
        const payState = tradeDetail['tradeState'] ? tradeDetail['tradeState']['payState'] : '';
        const deliverStatus = tradeDetail['tradeState'] ? tradeDetail['tradeState']['deliverStatus'] : '';

        // 获取该订单所有的待处理及已完成的退单列表
        let orderReturnListRes = await returnOrderBaseController.findByTid(tid);

        if (orderReturnListRes) {
          canApply = true;

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
        // 已完结订单，则为退货申请，否则认为是退款申请
        let isReturn = tradeDetail['tradeState'].flowState == 'COMPLETED';

        // 退货，则进入退货申请页面，否则进入退款申请页面
        if (isReturn) {
          Taro.navigateTo({
            url: `/pages/package-C/order/return-refund/return-first-step/index?tid=${tid}`,
          });
        } else {
          Taro.navigateTo({
            url: `/pages/package-C/order/return-refund/return-first-step/index?tid=${tid}`,
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
    main: getReducerData('virtualOrdersListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
