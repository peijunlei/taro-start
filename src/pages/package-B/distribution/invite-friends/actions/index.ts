import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {WMkit,wxShare,_} from 'wmkit';

import Action from './action';

import packageBDistributionInviteFriendsMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      await actions.action.commonChange('main.isLoadingFlag',true)
      if (WMkit.isDistributor()) {
        actions.action.commonChange('main.isDistributor', true);
      }
      const res = await Promise.all([
        api.inviteCustomerRecordController.getDistributionSetting(),
        api.distributionController.getSettingAndInvitor(),
      ]);
      // 查询分销配置信息
      // const res = await api.inviteCustomerRecordController.getDistributionSetting();
      // let result = context as any;
      //1、分销大开关打开且邀新奖励开关打开2、小C身份且招募开关打开且为邀新升级类型，才能进入该页面
      if (res[0].openFlag && (res[0].inviteFlag || (!WMkit.isDistributor() && res[0].applyFlag && res[0].applyType))) {
        actions.action.commonChange('main.setting', res[0]);
      } else {
        // history.replace('/error');
      }
      //查询分销设置信息
      const dSetting = res[1].distributionSettingSimVO;
      let inviteImg = '';
      let ruleDesc = '';
      const applyFlag = dSetting.applyFlag;
      const inviteFlag = dSetting.inviteFlag;
      //展示邀新海报的情况
      //1.是分销员2.不是分销员且招募开关关闭且邀新奖励开关打开,均显示显示邀新奖励落地页海报
      if (JSON.stringify(dSetting) != '{}') {
        if (WMkit.isDistributor() || (!WMkit.isDistributor() && !applyFlag && inviteFlag)) {
          // 展示邀新海报
          inviteImg = res[0].inviteImg;
          // 邀新奖励说明
          ruleDesc = res[0].inviteDesc;
        } else {
          // history.replace('/error');
        }
        //查询分销设置信息
        const dSetting = res[1].distributionSettingSimVO;
        let inviteImg = '';
        let ruleDesc = '';
        const applyFlag = dSetting.applyFlag;
        const inviteFlag = dSetting.inviteFlag;
        //展示邀新海报的情况
        //1.是分销员2.不是分销员且招募开关关闭且邀新奖励开关打开,均显示显示邀新奖励落地页海报
        if (JSON.stringify(dSetting) != '{}') {
          if (WMkit.isDistributor() || (!WMkit.isDistributor() && !applyFlag && inviteFlag)) {
            // 展示邀新海报
            inviteImg = res[0].inviteImg;
            // 邀新奖励说明
            ruleDesc = res[0].inviteDesc;
          } else {
            //展示邀请注册时招募落地页海报
            inviteImg = res[0].inviteRecruitImg;
            // 招募规则说明
            ruleDesc = res[0].recruitDesc;
          }
        }
        const isOpenWechat = await WMkit.isOpenWechat();
        dispatch({
          type: Command.init,
          payload: {
            main: {
              detailList: ruleDesc,
              picture: inviteImg,
              dSetting: dSetting,
              isOpenWechat: isOpenWechat
            },
          },
        });
        if (_.isWeixin()) {
          wxShare.initShare(
            '邀新注册',
            '邀新注册…',
            'https://sbc-img.obs.cn-north-4.myhuaweicloud.com/202004011138219745.jpg',
            3,
          );
        }

        await actions.action.commonChange('main.isLoadingFlag', false)
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
        packageBDistributionInviteFriendsMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageBDistributionInviteFriendsMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
