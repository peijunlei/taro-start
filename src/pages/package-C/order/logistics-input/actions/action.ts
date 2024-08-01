import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {FormRegexUtil} from 'wmkit';
import moment from 'dayjs';
import {cache, Const} from 'config';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    changeLogistics(value) {
      const {
        main: {logisticsList},
      } = getData();

      action.commonChange([
        {paths: 'main.form.expressName', value: logisticsList[value].expressName},
        {paths: 'main.form.expressCode', value: logisticsList[value].expressCode},
        {paths: 'main.checkLogistics', value},
      ]);
    },
    /**
     * 保存物流信息
     */
    async save() {
      const {
        main: {form},
      } = getData();
      const rid = form.rid;
      if (
        !FormRegexUtil(form.expressName, '物流公司', {required: true}) ||
        !FormRegexUtil(form.logisticsNo, '物流单号', {required: true}) ||
        !FormRegexUtil(form.formatTime, '发货时间', {required: true})
      ) {
        return;
      }
      const params = {
        code: form.expressCode,
        company: form.expressName,
        no: form.logisticsNo,
        createTime: moment(new Date(form.formatTime)).format(Const.SECONDS_FORMAT),
      };
      const res = await api.returnOrderBaseController.deliver(params, rid);
      Taro.navigateTo({
        url: `/pages/package-C/order/refund-list/index`,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderLogisticsInputMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
