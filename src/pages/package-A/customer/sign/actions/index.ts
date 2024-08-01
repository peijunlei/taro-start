import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import signMain from '../reducers/main';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      await actions.action.query();
      let userInfoRes;
      let signRecordListRes;
      try {
        userInfoRes = await api.customerSignRecordController.getCustomerInfo();
        //此处后台方法名有误，记得修改为getListByThisMonth
        signRecordListRes = await api.customerSignRecordController.getListByThisMonth();
      } catch (e) {
        //系统异常
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      //处理已经签到的日期数据得出当月签到的序号（天）数组
      let dayNumArr = signRecordListRes.customerSignRecordVOList.map((v) => {
        let oneDay = new Date(v.signRecord.substr(0, 10));
        return oneDay.getDate();
      });
      const context = userInfoRes;
      dispatch({
        type: Command.init,
        payload: {
          main: {
            userInfo: context.customerVO,
            signPoint: context.signPoint,
            pointsFlag: context.pointFlag,
            signFlag: context.signFlag,
            growthFlag: context.growthFlag,
            growthValue: context.growthValue,
            signRecordList: signRecordListRes.customerSignRecordVOList,
            daysNumArr: dayNumArr,
          },
        },
      });
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
        signMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['signMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
