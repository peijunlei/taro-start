import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import * as _ from '@/wmkit/common/util';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';

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
    async query(isChangeFlag) {
      const isLogin = WMkit.isLogin();
      action.commonChange('main.isChangeFlag', isChangeFlag);
      const {main} = getData();
      if (isLogin) {
        let res = [];
        if (isChangeFlag === 0) {
          res = await Promise.all([
            api.customerCreditQueryBaseController.queryApplyInfoByCustomerId(), //获取热门兑换
            api.payBaseController.getCreditConfig(),
          ]);
        } else {
          res = await Promise.all([
            api.customerCreditQueryBaseController.queryChangeInfoByCustomerId(), //获取热门兑换
            api.payBaseController.getCreditConfig(),
          ]);
        }

        dispatch({
          type: Command.init,
          payload: {
            main: {
              applyInfo: (res[0] as any).applyNotes,
              auditStatus: (res[0] as any).auditStatus,
              effectStatus: (res[0] as any).effectStatus,
              rejectReason: (res[0] as any).rejectReason,
              alias: (res[1] as any).alias,
            },
          },
        });
        action.commonChange('main.isLoadingFlag', true);
        return false;
      }
    },
    async applySubmit() {
      const {main} = getData();
      if (main.applyInfo.split(' ').join('').length === 0)
        return Taro.showToast({title: '请输入申请说明', icon: 'none', duration: 2000});
      await api.customerCreditAuditBaseController.applyAudit({
        applyNotes: main.applyInfo,
        isChangeFlag: main.isChangeFlag,
      });
      Taro.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 1000,
      });
      await this.query(main.isChangeFlag);
      await action.commonChange('main.isEdit', false);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('creditMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
