import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import Taro from '@tarojs/taro';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {WMkit} from 'wmkit';
import LoadPageMain from '../reducers/main';
import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),
    /**
     * 初始化数据
     */
    async initDistribute() {
      await actions.action.commonChange('main.isLoadingFlag', true);
      const distributor = await api.distributionController.queryDistributorInfoByCustomerId();
      const isOpenWechat = await WMkit.isOpenWechat();
      // 分销员ID
      let distributionId = distributor.distributionCustomerVO.distributionId;
      try {
        const res = await Promise.all([
          api.customerBaseController.findCustomerCenterInfo(),
          api.customerFundsController.statistics(),
          api.distributionPerformanceController.queryYesterday({
            distributionId: distributionId,
          }),
          api.distributionPerformanceController.summaryPerformanceCurrentMonth(),
          api.distributionController.getSettingAndInvitor(),
          api.inviteCustomerRecordController.countInviteCustomer(),
          api.goodsInfoBaseController.addDistributorGoods({
            pageNum: 0,
            pageSize: 10,
            sortFlag: 0,
          }),
          api.messageController.page({
            pageNum: 0,
            pageSize: 10,
          }),
          api.distributionController.queryDistributorInfoByCustomerId(),
        ]);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              customerInfo: res[0],
              customerBalance: res[1],
              yesterdayPerformance: res[2].performanceByDayVO,
              monthPerformance: res[3].dataList[0],
              distributeSetting: res[4].distributionSettingSimVO,
              inviteInfo: res[4].distributionCustomerSimVO,
              inviteCustomer: res[5],
              hotGoodsList: res[6] ? res[6].esGoodsInfoPage.content : [],
              noticeNum: res[7].noticeNum,
              preferentialNum: res[7].preferentialNum,
              performanceDesc: res[4].distributionSettingSimVO
                ? res[4].distributionSettingSimVO.distributorLevelDesc
                : '',
              isOpenWechat: isOpenWechat,
              distributor: res[8].distributionCustomerVO,
            },
          },
        });
      } catch (e) {
        if (e.code === 'K-999995') {
          WMkit.clearLoginCache();
        }
      }
      await actions.action.commonChange('main.isLoadingFlag', false);
    },

    /**
     * 初始化数据
     */
    async init() {
      const isLogin = WMkit.isLogin();
      await actions.action.commonChange('main.isLoadingFlag', true);
      const shopCartSku = Taro.getStorageSync('mini::shopCartSku');
      let params = {
        esGoodsInfoDTOList: shopCartSku || [],
        pageSize: 10,
        pageNum: 0,
      };
      if (!isLogin) {
        const distribute = await api.distributionController.getUnLoginSettingAndInvitor();
        const {esGoodsInfoPage} = await api.goodsInfoBaseController.unLogigHotList(params);
        Taro.hideLoading();
        dispatch({
          type: Command.init,
          payload: {
            main: {
              isReady: true,
              customerInfo: {},
              customerBalance: {},
              inviteCustomer: {},
              noticeNum: 0,
              distribute: {
                //分销设置信息
                distributeSetting:
                  distribute && distribute.distributionSettingSimVO ? distribute.distributionSettingSimVO : {},
                //邀请人信息
                inviteInfo: {},
              },
              hotGoodsList: esGoodsInfoPage?.content,
            },
          },
        });
        await actions.action.commonChange('main.isLoadingFlag', false);
        return false;
      }
      params = {
        esGoodsInfoDTOList: [],
        pageSize: 10,
        pageNum: 0,
      };
      const [customerInfo, customerBalance, distribute, inviteCustomer, hotList, messageContext] = await Promise.all([
        // 会员信息
        await api.customerBaseController.findCustomerCenterInfo(),
        // 会员余额信息
        await api.customerFundsController.statistics(),
        //分销设置信息
        await api.distributionController.getSettingAndInvitor(),
        //设置邀新人数
        await api.inviteCustomerRecordController.countInviteCustomer(),
        //获取热销商品
        await api.goodsInfoBaseController.hotList(params),
        //消息中心
        await api.messageController.page({pageNum: 1, pageSize: 10}),
      ]);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            isReady: true,
            customerInfo,
            customerBalance,
            inviteCustomer,
            noticeNum: messageContext && messageContext.noticeNum ? messageContext.noticeNum : 0,
            distribute: {
              //分销设置信息
              distributeSetting:
                distribute && distribute.distributionSettingSimVO ? distribute.distributionSettingSimVO : {},
              //邀请人信息
              inviteInfo:
                distribute && distribute.distributionCustomerSimVO ? distribute.distributionCustomerSimVO : {},
            },
            hotGoodsList: hotList?.esGoodsInfoPage?.content,
          },
        },
      });
      await actions.action.commonChange('main.isLoadingFlag', false);
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
        LoadPageMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['LoadPageMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
