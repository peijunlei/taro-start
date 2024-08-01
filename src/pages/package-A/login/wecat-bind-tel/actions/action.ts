import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';
import actions from '@/pages/common/coupon/actions';
const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 发送验证码事件
     */
    async sendCode() {
      let {phone, id} = getData().main;
      if (phone == '') {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(phone)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        let res = await api.thirdLoginController.sendCode(id, phone);
        Taro.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000,
        });
        action.commonChange('main.isRegister', res.isRegister);
      } catch (error) {
        Taro.showToast({
          title: error.message,
          icon: 'none',
          duration: 2000,
        });
        return false;
      }

      return true;
    },

    //提交
    async submit() {
      let {phone, verifiCode, id, inviteCode, channel, registerLimitType, openFlag} = getData().main;

      if (phone == '') {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(phone)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      if (verifiCode == '') {
        Taro.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      if (openFlag && registerLimitType == 1 && inviteCode == '') {
        Taro.showToast({
          title: '请输入邀请码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        let result = await api.wechatLoginController.weChatBind({
          id: id,
          phone: phone,
          verifyCode: verifiCode,
          inviteeId: WMkit.inviteeId(),
          shareUserId: WMkit.inviteeId(),
          inviteCode: inviteCode,
          //传入终端类型
          channel,
        });
        if (isH5) {
          WMkit.switchLogin(result, 'bind-tel');
        } else {
          WMkit.switchLogin(result, Taro.getCurrentPages());
        }
      } catch (error) {
        Taro.showToast({
          title: error,
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
    main: getReducerData('loginWecatBindTelMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
