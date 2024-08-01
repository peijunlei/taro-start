import Store, {getReducerData} from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Taro from '@tarojs/taro';

import Action from './action';
import {_} from 'wmkit';
import packageCReturnRefundMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tid, skuId) {
      await actions.loadReducer();
      const res = await Promise.all([
        api.returnOrderBaseController.tradeDetails(tid),
        api.returnOrderBaseController.findCompletedByTid(tid),
      ]);
      let tradeDetail = res[0];
      let returnOrderListRes = res[1];
      // 已完结订单，则为退货申请，否则认为是退款申请
      let isReturn = tradeDetail['tradeState'].flowState == 'COMPLETED' ? true : false;
      //订单里原来的所有商品信息
      let originTradeItems = [];
      // 退货原因
      let returnReasonList;
      // 已经完成退款的钱
      let hasReturnPrice = 0;
      // 已经完成退款的积分
      let hasReturnPoints = 0;
      // 退货申请，设置商品可退数量
      originTradeItems = tradeDetail['tradeItems'];
      // 只展示有可退商品的信息
      tradeDetail['tradeItems'] = tradeDetail['tradeItems'].filter((v) => v.canReturnNum > 0);

      if (tradeDetail['gifts']) {
        // 只展示有可退数量的赠品信息
        tradeDetail['gifts'] = tradeDetail['gifts'].filter((v) => v.canReturnNum > 0);
        // 默认赠品退货数量为0
        tradeDetail['gifts'].forEach((v) => {
          v.num = 0; //初始化默认的退货数量
        });
      }
      tradeDetail['tradeItems'].forEach((v) => {
        v.skuBuyNum = v.num; //初始化下订时购买的数量
        v.price = _.div(v.splitPrice, v.num); //初始化每个商品的均摊平均价格
        v.skuPoint = _.addZeroFloor((v.points || 0) / v.num); //初始化每个商品的均摊平均积分(向下截取小数点后两位)
        v.num = v.canReturnNum; //初始化默认的退货数量
      });

      dispatch({
        type: Command.init,
        payload: {
          main: {
            tid: tid,
            tradeMarketings: tradeDetail['tradeMarketings'],
            gifts: tradeDetail['gifts'],
            totalPrice: tradeDetail['tradePrice']['totalPrice'] - hasReturnPrice,
            tradePoints: tradeDetail['tradePrice']['points'] - hasReturnPoints || 0,
            originTradeItems: originTradeItems,
            returnOrderList: returnOrderListRes,
            isReturn: isReturn,
            skus: tradeDetail['tradeItems'],
            crossBorderFlag: tradeDetail['crossBorderFlag'],
            flowState: tradeDetail['tradeState']['flowState'],
            payState: tradeDetail['tradeState']['payState'],
            deliverStatus: tradeDetail['tradeState']['deliverStatus'],
          },
        },
      });
      if (!isReturn) {
        dispatch({
          type: Command.init,
          payload: {
            main: {
              returnReasonList: returnReasonList,
              returnWayList: [],
            },
          },
        });
      }
      if (skuId) {
        await actions.action.checkOne(skuId);
        const {main} = getData();
        let newSkus = main.skus.filter((item) => item.skuChecked === true);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              skus: newSkus,
            },
          },
        });
      }
      if (await actions.action.isRefund()) {
        await actions.action.checkAll(false);
      }
    },

    /**
     * 退货申请第二步，初始化页面
     */
    async initApplyPage() {
      await actions.loadReducer();
      const res = await Promise.all([
        api.returnOrderBaseController.findReturnReason(),
        api.returnOrderBaseController.findReturnWay(),
        api.returnOrderController.findTransfer(),
      ]);

      let returnReasonList = res[0]['refundCauseVOList'];
      let returnWayList = res[1];
      returnReasonList = (returnReasonList as any).map((v) => {
        for (let k in v) {
          return {
            id: v.id,
            name: v['cause'],
          };
        }
      });

      returnWayList = (returnWayList as any).map((v) => {
        for (let k in v) {
          return {
            id: k,
            name: v[k],
          };
        }
      });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            tid: res[2]['tid'],
            totalPrice: res[2]['returnPrice']['totalPrice'],
            tradePoints: res[2]['returnPoints']['applyPoints'] || 0,
            isReturn: true,
            skus: res[2]['returnItems'],
            giftSecond: res[2]['returnGifts'],
            returnReasonList: returnReasonList,
            returnWayList: returnWayList,
          },
        },
      });
    },

    /**
     * 退货成功初始化
     * @param rid
     */
    async returnsOkInit(rid) {
      await actions.loadReducer();
      try {
        let returnOrderRes = await api.returnOrderBaseController.findById(rid);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              returnsResult: returnOrderRes,
            },
          },
        });
      } catch (error) {
        Taro.showToast({
          title: '退单不存在',
          icon: 'none',
          duration: 2000,
        });
        // Taro.navigateTo({
        //   url: `/pages/package-C/order/order-list/index`,
        // });
      }
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
        packageCReturnRefundMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCReturnRefundMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

function getData() {
  return {
    main: getReducerData('packageCReturnRefundMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
