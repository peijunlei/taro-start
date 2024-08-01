import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //删除SKU
    async deleteCustomerAccount(accountId) {
      try {
        await api.customerAccountBaseController.deleteCustomerAccount_(accountId);
      } catch (e) {
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      Taro.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 2000,
      });
    },
  };

  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('bankAccountsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
