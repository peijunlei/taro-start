import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {cache} from 'config';
import api from 'api';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async changeEnterprise(enterpriseId) {
      try {
        await api.customerBaseController.changeLoginEnterpriseId(enterpriseId);
      } catch (e) {
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      let loginData = Taro.getStorageSync(cache.LOGIN_DATA);
      // 当前登录的账号所属的企业id
      loginData.lastLoginEnterpriseId = enterpriseId;
      Taro.setStorageSync(cache.LOGIN_DATA, loginData);
      Taro.navigateBack({
        delta: 1,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('chooseEnterpriseMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
