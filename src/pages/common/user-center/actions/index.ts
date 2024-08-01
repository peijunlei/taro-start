import * as reduxStore from '@/redux/store';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';
import Action from './action';
import Taro from '@tarojs/taro';
import { ifLogin } from '@/utils/common-functions';

import packageACustomerUserCenterMain from '../reducers/main';
import { AppMessagePageResponse } from 'api/MessageController';
import systemPointsConfigController, {
  BossGoodsEvaluateResponse,
  SystemPointsConfigQueryResponse,
} from 'api/SystemPointsConfigController';
import payBaseController from 'api/PayBaseController';
import qQServiceController from 'api/QQServiceController';
import { CustomerFundsStatisticsResponse } from 'api/CustomerFundsController';
import { CouponCodePageResponse } from 'api/CouponCodeBaseController';
import { CustomerSignRecordInitInfoResponse } from 'api/CustomerSignRecordController';
import { OrderTodoResp } from 'api/TradeBaseController';
import { cache } from 'config';
import { WMkit } from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      try {
        const isLogin = ifLogin();
        let type: any = 1;
        if (isLogin) {
          const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
          // 当前登录的账号所属的企业id
          const inviteeId = Taro.getStorageSync(cache.INVITEE_ID) ? Taro.getStorageSync(cache.INVITEE_ID) : null;
          const res = await Promise.all([
            api.customerBaseController.findCustomerCenterInfo(),
            api.goodsFollowBaseController.count(),
            api.storeFollowBaseController.storeFollowNum(),
            api.systemGrowthValueConfigController.isGrowthValueOpen(),
            api.customerFundsController.statistics(),
            api.couponCodeBaseController.listMyCouponList({ couponType: null }),
            api.customerSignRecordController.getCustomerInfo(),
            api.messageController.page({ pageNum: 0, pageSize: 1 }),
            api.systemPointsConfigController.query(),
            //获取订单物流信息
            api.logisticsLogBaseController.list(),
            api.tradeBaseController.tardeTodo(inviteeId),
            api.qQServiceController.qqDetail(0, type),
            api.customerBaseController.getEnterpriseInfoByCustomerId(),
            api.giftCardController.queryUseNum(),
            api.customerBaseController.getUsedEnterpriseId(),
          ]);
          let delivery = (res[9] as any).logisticsList;
          delivery.map((item) => {
            switch (item.state) {
              case '0':
                item.status = '运输中';
                break;
              case '1':
                item.status = '已揽收';
                break;
              case '2':
                item.status = '问题件';
                break;
              case '3':
                item.status = '已签收';
                break;
              case '4':
                item.status = '已退回';
                break;
              case '5':
                item.status = '派件中';
                break;
              case '6':
                item.status = '退回中';
                break;
              case '7':
                item.status = '转投';
                break;
              case '14':
                item.status = '收件人拒签';
                break;
            }
          });

          // 接口查询当前登录的账号最近一次登录的且有效的企业id
          const resId = res[14];
          let currentEnterpriseInfo = res[12]?.enterpriseInfoVOList.filter(
            (item) => item.enterpriseId === resId,
          )?.[0];
          if (currentEnterpriseInfo == null) {
            currentEnterpriseInfo = res[12]?.enterpriseInfoVOList[0];
          }
          // // 当前登录的账号所属的企业id
          loginData.lastLoginEnterpriseId = resId;
          Taro.setStorageSync(cache.LOGIN_DATA, loginData);
          Taro.setStorageSync(cache.CUSTOMER_INFO, res[0])
          dispatch({
            type: Command.init,
            payload: {
              main: {
                customer: res[0],
                goodsFollow: res[1],
                storeFollow: res[2],
                growthValueIsOpen: (res[3] as any).open,
                accountBalanceTotal: (res[4] as CustomerFundsStatisticsResponse).accountBalanceTotal,
                balanceAlias: (res[4] as CustomerFundsStatisticsResponse).alias || '余额',
                unUseCount: (res[5] as CouponCodePageResponse).unUseCount,
                signFlag: (res[6] as CustomerSignRecordInitInfoResponse).signFlag,
                isLogin: isLogin,
                messNum:
                  (res[7] as AppMessagePageResponse).noticeNum + (res[7] as AppMessagePageResponse).preferentialNum,
                pointsIsOpen: (res[8] as any).status === 1,
                delivery: delivery,
                orderCount: {
                  0: (res[10] as OrderTodoResp).waitPay,
                  1: (res[10] as OrderTodoResp).waitDeliver,
                  2: (res[10] as OrderTodoResp).waitReceiving,
                  3: (res[10] as OrderTodoResp).waitEvaluate,
                  4: (res[10] as OrderTodoResp).refund,
                },
                isServiceOpen:
                  res[11] &&
                    (res[11] as any).qqOnlineServerRop.effectiveMobile &&
                    (res[11] as any).qqOnlineServerRop.status
                    ? true
                    : false,
                enterpriseList: res[12].enterpriseInfoVOList,
                currentEnterpriseInfo,
                enterpriseId: resId,
                //aliUrl: res[12],
                giftCardNum: res[13]?.useNum || 0,
              },
            },
          });
        } else {
          dispatch({
            type: Command.init,
            payload: {
              main: {
                customer: {},
                goodsFollow: 0,
                storeFollow: 0,
                growthValueIsOpen: false,
                accountBalanceTotal: 0,
                unUseCount: 0,
                signFlag: false,
                messNum: 0,
                delivery: [],
                enterpriseList: [],
                orderCount: {},
                currentEnterpriseInfo: {},
                enterpriseId: '-1',
                balanceAlias: '余额',
                giftCardNum: 0,
              },
            },
          });
        }
        const res = await Promise.all([
          api.systemPointsConfigController.query(),
          api.systemPointsConfigController.isGoodsEvaluate(),
          api.qQServiceController.qqDetail(0, type),
          api.qQServiceController.weChatDetail(0),
        ]);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              pointsIsOpen: (res[0] as SystemPointsConfigQueryResponse).status == 1 ? true : false,
              evaluateIsOpen: (res[1] as BossGoodsEvaluateResponse).evaluate,
              isLogin: isLogin,
              isServiceOpen:
                res[2] && (res[2] as any).qqOnlineServerRop.effectiveMobile && (res[2] as any).qqOnlineServerRop.status
                  ? true
                  : false,
              isWechatOpen: res[3] && (res[3] as any).weChatOnlineServerRop.status === 1 ? true : false,
              wechatInfo:
                res[3] && (res[3] as any).weChatOnlineServerRop.groupStatus === 0
                  ? {
                    serviceUrl: (res[3] as any).weChatOnlineServerRop?.serviceUrl,
                    enterpriseId: (res[3] as any).weChatOnlineServerRop?.enterpriseId,
                  }
                  : {},
            },
          },
        });
      } catch (e) {
        if (e.code === 'K-999995') {
          WMkit.clearLoginCache();
        }
      }
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({ type: Command.clean });
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageACustomerUserCenterMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerUserCenterMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
