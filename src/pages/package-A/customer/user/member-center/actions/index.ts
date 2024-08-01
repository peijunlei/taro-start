import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {_, WMkit} from 'wmkit';
import Action from './action';
import parse from 'url-parse';
import pagesPackageACustomerUserMemberCenterMain from '../reducers/main';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      await actions.action.commonChange('main.isLoadingFlag',true)
      const isLogin = WMkit.isLogin();

      if (!isLogin) {
        const res = await api.pointsMallController.hotExchange({pageSize: 10}); //获取热门兑换
        await actions.action.query(); //查询会员最爱买列表

        dispatch({
          type: Command.init,
          payload: {
            main: {
              hotExchange: res.pointsGoodsVOPage.content,
            },
          },
        });
        await actions.action.commonChange('main.isLoadingFlag',false)
        return false;
      }

      /**1.基础信息和等级*/
      const res = await Promise.all([
        api.customerLevelRightsBaseController.queryCustomerLevelRightsList(), //获取等级列表
        api.customerLevelBaseController.getCustomerLevelRightsInfos(), //获取用户信息
        api.customerBaseController.findCustomerCenterInfo(), //获取积分信息
        api.systemPointsConfigController.query(), //获取积分设置
        api.pointsMallController.hotExchange({pageSize: 10}), //获取热门兑换
      ]);
      await actions.action.query(); //查询会员最爱买列表
      let gradeList = res[0] && res[0].customerLevelVOList ? res[0].customerLevelVOList : [];
      let userInfo = res[1];
      /**2.找到当前处于第几个等级*/
      let index = gradeList.findIndex((item) => {
        return userInfo.customerLevelId == item.customerLevelId;
      });
      /**4.这是 最后一个等级*/
      let isLastOne = false;
      let nextGradeInfo = {};
      let notGetGradeList = [];
      if (index + 1 == gradeList.length) {
        isLastOne = true;
        nextGradeInfo = gradeList[index];
      } else {
        /**5.得到下一个等级的信息。处理未获得到的权益*/
        nextGradeInfo = gradeList[index + 1];
        let resultNextGradeList = [];
        gradeList.slice(index + 1).map((value) => {
          value?.customerLevelRightsVOS?.map((_data) => {
            let index = resultNextGradeList.findIndex((item) => {
              return item.rightsId == _data.rightsId;
            });
            if (index === -1) {
              resultNextGradeList.push({
                customerLevelId: value.customerLevelId,
                ..._data,
              });
            }
          });
        });
        /**6.过滤已经获得的权益*/
        let data = resultNextGradeList?.concat(gradeList[index]?.customerLevelRightsVOS).filter((x) => {
          let d = gradeList[index]?.customerLevelRightsVOS?.filter((v) => v.rightsId == x.rightsId);
          return d?.length == 0;
        });
        notGetGradeList = data;
      }
      let pointsIsOpen = false;
      if (res[3].status == 1) {
        pointsIsOpen = true;
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            gradeList: gradeList,
            userInfo: userInfo,
            nowPossessGradeInfo: gradeList[index],
            isLastOne: isLastOne,
            nextGradeInfo: nextGradeInfo,
            notGetGradeList: notGetGradeList,
            pointsAvailable: res[2] && res[2].pointsAvailable ? res[2].pointsAvailable : '',
            pointsIsOpen: pointsIsOpen,
            hotExchange: res[4].pointsGoodsVOPage.content,
            pointsRule: res[3].remark,
            isLoadingFlag:false
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
        pagesPackageACustomerUserMemberCenterMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageACustomerUserMemberCenterMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
