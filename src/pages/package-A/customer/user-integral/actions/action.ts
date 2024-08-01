import {Command} from '../constant';
import Taro from '@tarojs/taro';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async page() {
      let {form = {}, funds = []} = getData().main || {};
      action.commonChange('main.isLoadingList', true);
      const res = await api.customerPointsController.page(form);
      action.commonChange([{paths: 'main.totalPages', value: (res as any).customerPointsDetailVOPage.totalPages}]);
      if (form.pageNum == 0) {
        action.commonChange([
          {paths: 'main.funds', value: res?.customerPointsDetailVOPage?.content},
          {paths: 'main.total', value: res?.customerPointsDetailVOPage?.totalPages},
        ]);
      } else {
        // @ts-ignore
        action.commonChange([{paths: 'main.funds', value: funds.concat(res?.customerPointsDetailVOPage?.content)}]);
      }
      action.commonChange('main.isLoadingList', false);
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {form = {}, totalPages} = getData().main || {};
      let num = form.pageNum + 1;
      if (num == totalPages) return;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.form.pageNum',
          value: num,
        },
      });
      await this.page();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerUserIntegralMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
