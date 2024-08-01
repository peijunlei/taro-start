import {Command} from '../constant';
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
      const {main} = getData();
      if (!main) {
        return;
      }
      let {form, funds} = main;
      const res = await api.bossCustomerController.queryGrowthValue(form);
      if (form.pageNum == 0) {
        action.commonChange([{paths: 'main.funds', value: (res as any).content}]);
      } else {
        // @ts-ignore
        action.commonChange([{paths: 'main.funds', value: funds.concat(res.content)}]);
      }
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {form} = getData().main;
      let num = form.pageNum + 1;
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
    main: getReducerData('pagesPackageACustomerUserClassEquityMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
