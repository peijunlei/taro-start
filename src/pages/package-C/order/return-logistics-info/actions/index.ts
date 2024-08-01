import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import api from 'api';
import Action from './action';
import packageCOrderLogisticsInfoMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(
      id: string,
      type: string,
      orderMType: string,
      thirdPlatformType: string,
      buyerId: string,
      thirdPlatformOrderId: string,
    ) {
      if (thirdPlatformType != null && thirdPlatformType == '0') {
        let res = await api.tradeBaseController.linkedMallLogistics({lmOrderId: thirdPlatformOrderId, bizUid: buyerId});
        dispatch({
          type: Command.init,
          payload: {
            main: {
              goodList: {
                logistics: {
                  logisticCompanyName: res.logisticCompanyName,
                  logisticNo: res.logisticNo,
                  logisticStandardCode: res.logisticStandardCode,
                },
                deliveryTime: res.deliveryTime,
              },
            },
          },
        });
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.detail',
            value: res.logisticsDetailList,
          },
        });
      } else {
        await actions.loadReducer();
        try {
          const res = await api.tradeBaseController.shippItemsByLogisticsNo(type, id, null);
          dispatch({
            type: Command.init,
            payload: {
              main: {
                goodList: {
                  logistics: {
                    logisticCompanyName: res.logistics.logisticCompanyName,
                    logisticNo: res.logistics.logisticNo,
                    logisticStandardCode: res.logistics.logisticStandardCode,
                  },
                  deliveryTime: res.deliverTime,
                  // detail:res2?res2:[],
                },
              },
            },
          });
          await actions.getList(res.logistics.logisticStandardCode, res.logistics.logisticNo);
        } catch (e) {}
      }
    },
    async getList(comCode, deliCode) {
      console.log('getList', comCode, deliCode);

      try {
        await api.tradeBaseController.logistics({companyCode: comCode, deliveryNo: deliCode});
      } catch (e) {
        //因为后台接口问题，在异常中取得后台返回结果
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.detail',
            value: e,
          },
        });
      }
    },

    /**
     * 初始化数据
     */
    async initReturn(rid: string) {
      await actions.loadReducer();
      try {
        const res = await api.returnOrderBaseController.returnLogistics(rid);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              goodList: {
                logistics: {
                  logisticCompanyName: res.company,
                  logisticNo: res.no,
                  logisticStandardCode: res.code,
                },
                deliveryTime: res.createTime,
              },
            },
          },
        });
        await actions.getList(res.code, res.no);
      } catch (e) {}
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
        packageCOrderLogisticsInfoMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderLogisticsInfoMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
