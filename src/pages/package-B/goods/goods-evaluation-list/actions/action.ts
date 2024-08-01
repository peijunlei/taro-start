import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {WMkit} from 'wmkit';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     *
     普通条件查询可以走,commonChange
     */
    async modifySearch(
      param,
      options: {
        isQuery: boolean;
        isResetPage: boolean;
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
      let {request} = getData().main;
      request.pageNum = request.pageNum + 1;
      dispatch({type: Command.modifyRequest, payload: request});
      await this.query();
    },

    /**
     * 以当前查询条件查询
     */
    async query(isResetPage: boolean = false) {
      if (isResetPage) {
        await dispatch({type: Command.modifyRequest, payload: {pageNum: 0}});
      }

      dispatch({
        type: Command.queryResult,
        payload: {
          total: 0,
          list: [],
        },
      });
    },

    /**
     * 商品评价点赞
     * @param goodsEvaluateId
     */
    async addCustomerGoodsEvaluatePraise(goodsEvaluateId, key) {
      action.commonChange('main.loading', true);
      if (WMkit.isLogin()) {
        await api.customerGoodsEvaluatePraiseController.add({
          goodsEvaluateId: goodsEvaluateId,
        });

        let {list, isBigImgShow} = getData().main;
        let num = list[key].goodNum;
        let isPraise = list[key].isPraise;

        if (!isPraise) {
          Taro.showToast({
            title: '点赞成功!',
            icon: 'none',
            duration: 2000,
          });
        } else {
          Taro.showToast({
            title: '已取消点赞!',
            icon: 'none',
            duration: 2000,
          });
        }

        action.commonChange([
          {paths: ['main', 'list', key + '', 'isPraise'], value: !isPraise},
          {paths: ['main', 'list', key + '', 'goodNum'], value: isPraise ? num - 1 : num + 1},
        ]);

        if (isBigImgShow) {
          action.commonChange('main.bigEvalItem.isPraise', !isPraise);
          action.commonChange('main.bigEvalItem.goodNum', isPraise ? num - 1 : num + 1);
        }
      } else {
        Taro.showToast({
          title: '请先登录!',
          icon: 'none',
          duration: 2000,
        });
      }
      action.commonChange('main.loading', false);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsEvaluationListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
