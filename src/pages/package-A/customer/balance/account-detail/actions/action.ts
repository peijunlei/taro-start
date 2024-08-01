import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import { getCurrentInstance } from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async page() {
      let {form} = getData().main;
      form.pageNum = 0;
      const res = await api.customerFundsController.page(form);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            funds: res.content,
            total: res.totalElements,
          },
        },
      });
    },
    async nextPage() {
      let {form, funds} = getData().main;
      form.pageNum = form.pageNum + 1;
      const res = await api.customerFundsController.page(form);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            funds: [...funds, ...res.content],
            total: res.totalElements,
          },
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerBalanceAccountDetailMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
