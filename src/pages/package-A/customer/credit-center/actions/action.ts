import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import * as _ from '@/wmkit/common/util';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';
// import { Toast } from '@wanmi/ui-taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 查询  列表
     */
    async query() {
      const res = await api.customerCreditAccountBaseController.getCreditAccountDetail();
      Taro.setNavigationBarTitle({title: `我的${res.alias}`});
      await action.commonChange('main.creditInfo', res);
      console.log('res==', res);
    },
    /**
     * 点击在线还款，验证账户授信还款情况
     * @returns {Promise<void>}
     */
    async onlineRepay() {
      let res;
      try {
        res = await api.customerCreditRepayBaseController.checkCreditAccountHasRepaid();

        // 在线还款
        Taro.navigateTo({url: `/pages/package-C/credit/online-repayment/index`});
      } catch (e) {
        Taro.showToast({
          title: e.message,
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
    main: getReducerData('creditCenterMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
