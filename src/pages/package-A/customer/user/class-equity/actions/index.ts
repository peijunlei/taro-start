import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageACustomerUserClassEquityMain from '../reducers/main';
import api from 'api';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(id) {
      await actions.loadReducer();
      const res = await Promise.all([
        api.customerLevelRightsBaseController.queryCustomerLevelRightsList(),//获取等级列表
        api.customerLevelBaseController.getCustomerLevelRightsInfos(), //获取用户信息
      ]);
      await actions.action.page();
      let gradeList = (res[0] as any).customerLevelVOList;
      let userInfo = res[1] as any;
      let index = gradeList.findIndex(item => {
        return userInfo.customerLevelId == item.customerLevelId
      });
      let levelInfo ={};
      let isLastOne =false;
      if (index + 1 == gradeList.length) {
        isLastOne = true;
        levelInfo = {
          atPresentLevelName: userInfo.customerLevelName,
          nowHaveGrowthValue:userInfo.customerGrowthValue,
        }
      } else {
        //组装一下数据
        levelInfo = {
          atPresentLevelName: userInfo.customerLevelName,
          nextLevelName: gradeList[index + 1].customerLevelName,
          needGrowthValue: gradeList[index + 1].growthValue - userInfo.customerGrowthValue,
          nowHaveGrowthValue:userInfo.customerGrowthValue,
          nextGrowthValue: gradeList[index + 1].growthValue
        }
      }

      //找到当前是第几个
      let indexId = gradeList.findIndex((item) => {
        return id == item.customerLevelId;
      });

      dispatch({
        type: Command.init,
        payload: {
          main: {
            gradeList:gradeList,
            isLastOne:isLastOne,
            levelInfo:levelInfo,
            atPresentEquityNum:indexId,//当前轮播是第几个
          }
        }
      });
    },
    /**
     * 重置
     */
     async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        pagesPackageACustomerUserClassEquityMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageACustomerUserClassEquityMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
