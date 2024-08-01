import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
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
     * tab切换
     */
    async changeTopActive(keys: string, rids: string[]) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            orders:[],
            key: keys,
            form: {
              returnFlowState: keys,
              pageNum: 0,
              pageSize: 10,
              rids: rids,
            },
          },
        },
      });
      //获取订单列表
      action.query();
    },
    /**
     * 查询订单列表
     */
    async query() {
      if (WMkit.inviteeId()) {
        await action.commonChange([{paths: 'main.form.inviteeId', value: WMkit.inviteeId()}]);
      }
      let {form, orders} = await getData().main;
      await action.commonChange('main.isLoadingList', true);
      try {
        const res = await api.returnOrderBaseController.page(form);
        if (form.pageNum == 0) {
          action.commonChange([
            {paths: 'main.orders', value: res.content},
            {paths: 'main.total', value: res.totalPages},
          ]);
        } else {
          action.commonChange([
            {paths: 'main.orders', value: orders.concat(res.content)},
            {paths: 'main.total', value: res.totalPages},
          ]);
        }
      } catch (e) {
        if (e.code === 'K-999995') {
          WMkit.clearLoginCache();
        }
        //
      }
      await action.commonChange('main.isLoadingList', false);
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {form, total} = getData().main;
      if (form.pageNum + 1 == total) return;
      let num = form.pageNum + 1;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.form.pageNum',
          value: num,
        },
      });
      await this.query();
    },
    /**
     * 取消退单
     * @param rid
     * @returns {Promise<TResult|TResult2|TResult1>}
     */
    async cancel(rid: string) {
      try {
        await api.returnOrderBaseController.cancel(rid, '用户取消');
        Taro.showToast({
          title: '成功取消退单',
          icon: 'none',
          duration: 2000,
        });
        //获取订单列表
        action.query();
      } catch (error) {}
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('PackageCOrderRefundListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
