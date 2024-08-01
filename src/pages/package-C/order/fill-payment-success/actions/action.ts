import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {UploadImage, immutable} from 'wmkit';
import Taro from '@tarojs/taro';
import moment from 'dayjs';

import {cache} from 'config';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //上传图片
    async _chooseImage() {
      //选择图片后 会触发didshow函数
      // await action._savaLocal();
      //图片大小不能超过5M
      const FILE_MAX_SIZE = 500 * 1024 * 10;
      const {context} = await UploadImage(FILE_MAX_SIZE);
      action.commonChange([{paths: 'main.payOrder.encloses', value: context[0]}]);
    },

    /**
     * 提交
     */
    async applyPay() {
      const {
        main: {sellerAccount, remark, payOrder, time, tid},
      } = getData();
      if (JSON.stringify(sellerAccount) == '{}') {
        Taro.showToast({
          title: '请选择收款账号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }

      if (!time) {
        Taro.showToast({
          title: '请选择付款时间',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }

      if (remark.length > 100) {
        Taro.showToast({
          title: '付款备注(100字以内)',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }

      if (!payOrder.encloses) {
        Taro.showToast({
          title: '请上传附件',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }

      let payRecord = immutable.Map();
      payRecord = payRecord.set('accountId', sellerAccount.accountId);
      payRecord = payRecord.set('tid', tid);
      payRecord = payRecord.set('createTime', moment(time).format('YYYY-MM-DD HH:mm:ss'));
      payRecord = payRecord.set('remark', remark);

      let encloses = payOrder.encloses;
      payRecord = payRecord.set('encloses', encloses);
      const res = await api.tradeBaseController.createPayOrder(payRecord.toJS());
      Taro.redirectTo({
        url: `/pages/package-C/order/fill-payment-success/index?tid=${tid}`,
      });
    },

    /**
     * 设置选中的收款账号
     */
    async setSelectedAccount() {
      const sellerA = Taro.getStorageSync(cache.SELLER_ACCOUNT);
      await action.commonChange('main.sellerAccount', sellerA);
      // Taro.removeStorageSync(cache.SELLER_ACCOUNT);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderFillPaymentMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
