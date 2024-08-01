import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';

import {getPrizeList} from 'api/DrawRecordController';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async initData(id) {
      let {loadStatus} = getData().main;
      action.commonChange('main.activityId', id || '');
      if (loadStatus === 'loading') {
        return;
      } else {
        action.commonChange('main.loadStatus', 'loading');
      }
      action.commonChange('main.list', []);
      action.commonChange('main.request', {pageNum: 0, pageSize: 10});
      await action.nextPage(true);
    },
    /**
     * 查询下一页
     */
    async nextPage(init?) {
      let {request, total, list, activityId} = getData().main;
      if (request.pageNum + 1 == total && !init) return;
      action.commonChange('main.request.pageNum', init ? request.pageNum : request.pageNum + 1);
      try {
        let result = await getPrizeList({
          ...request,
          pageNum: init ? request.pageNum : request.pageNum + 1,
          activityId,
        });
        if (init && request.pageNum === 0) {
          dispatch({
            type: Command.init,
            payload: {
              main: {
                list: result.drawRecordVOPage.content,
                total: result.drawRecordVOPage.totalPages,
                loadStatus: 'loaded',
              },
            },
          });
        } else {
          let merge = (a, b, p) => a.filter((aa) => !b.find((bb) => aa[p] === bb[p])).concat(b);
          // 合并
          let listItem = merge(list, result.drawRecordVOPage.content, 'id');
          dispatch({
            type: Command.init,
            payload: {
              main: {
                list: listItem,
                total: result.drawRecordVOPage.totalPages,
                loadStatus: 'loaded',
              },
            },
          });
        }
      } catch (e) {
        dispatch({
          type: Command.init,
          payload: {
            main: {
              list: [],
              total: 0,
              loadStatus: 'loaded',
            },
          },
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageAPrizeListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
