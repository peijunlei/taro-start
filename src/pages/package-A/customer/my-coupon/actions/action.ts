import {Command} from '../constant';
import Taro from '@tarojs/taro';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    /**
     * 改变分类/类型弹窗显示隐藏
     * @param tab
     */
    async changeMaskShow() {
      const {
        main: {showDrapMenu},
      } = getData();
      await action.commonChange('main.showDrapMenu', !showDrapMenu);
    },
    /**
     * 改变优惠券类型值
     * @param tab
     */
    async changeTypeValue(value: any) {
      await action.commonChange('main.couponType', value);
      this.modifySearch({pageNum: 0, couponType: value}, {isQuery: true, isResetPage: true});
    },
    /**
     * 改变优惠券类型值
     * @param tab
     */
    async changeStatus(value) {
      dispatch({
        type: Command.commonChange,
        payload: {paths: ['main', 'useStatus'], value: value},
      });
      action.commonChange('main.delayLoading', false);
      this.modifySearch({pageNum: 0, useStatus: value}, {isQuery: true, isResetPage: true});
    },
    async modifySearch(
      param,
      options: {
        isQuery?: boolean;
        isResetPage?: boolean;
      } = {isQuery: true, isResetPage: false},
    ) {
      dispatch({type: Command.modifyRequest, payload: param});
      //修改完直接查询;
      if (options.isQuery) {
        await this.query(options.isResetPage);
      }
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {request, total} = getData().main;
      let num = request.pageNum + 1;
      if (num == total) {
        setTimeout(() => {
          action.commonChange('main.delayLoading', true);
        }, 200);
        return;
      }
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.request.pageNum',
          value: num,
        },
      });
      await this.query();
    },
    /**
     * 以当前查询条件查询
     */
    async query(isResetPage: boolean = false) {
      await action.commonChange('main.isLoadingList', true);
      if (isResetPage) {
        await dispatch({
          type: Command.modifyRequest,
          payload: {pageNum: 0},
        });
        await action.commonChange([
          {paths: 'main.request.pageNum', value: 0},
          {paths: 'main.couponList', value: []},
        ]);
      }
      const {main} = getData();

      if (!main) {
        return;
      }
      let {request, couponList} = main;
      if (request.pageNum != 0) {
        await action.commonChange('main.delayLoading', false);
      }
      let {
        couponCodeVos: {content, totalPages},
        overDueCount,
        unUseCount,
        usedCount,
      } = await api.couponCodeBaseController.listMyCouponList(request);
      dispatch({
        type: Command.queryResult,
        payload: {
          isLoadingList: false,
          total: totalPages,
          overDueCount,
          unUseCount,
          usedCount,
          couponList: couponList.concat(content),
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerMyCouponMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
