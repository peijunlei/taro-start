import {Command} from '../constant';
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
    async page() {
      let {form = {}, list = [], chooseCateId, keyWords, sticky} = getData().main || {};
      action.commonChange('main.isLoadingFlag', true);
      let params =
        chooseCateId == '-1'
          ? {}
          : {
              grouponCateId: chooseCateId,
              goodsName: keyWords,
              sticky: sticky,
            };
      const res = await api.grouponCenterController.list({...params, ...form});
      action.commonChange([{paths: 'main.totalPages', value: (res as any).grouponCenterVOList.totalPages}]);
      if (form.pageNum == 0) {
        action.commonChange([
          {paths: 'main.list', value: res?.grouponCenterVOList?.content},
          {
            paths: 'main.totalPages',
            value: res?.grouponCenterVOList?.totalPages,
          },
        ]);
      } else {
        // @ts-ignore
        action.commonChange([{paths: 'main.list', value: list.concat(res?.grouponCenterVOList?.content)}]);
      }
      action.commonChange('main.isLoadingFlag', false);
    },
    async nextPage() {
      let {form = {}, totalPages} = getData().main || {};
      if (form.pageNum == totalPages) return;
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
    async changeTopActive(key: string, defaultCate: number) {
      const {chooseCateId} = getData().main;
      await action.commonChange('main.list', []);
      if (key && chooseCateId === key) {
        return false;
      }
      // keyWords = ''
      // action.commonChange('main.keyWords', '');
      const changeParams: [{paths: string; value: any}] = [{paths: 'main.keyWords', value: ''}];
      // 精选分类下的设值
      if (defaultCate == 1) {
        // 精选 = true
        // action.commonChange('main.sticky', true);
        // // chooseCateId = ''
        // action.commonChange('main.chooseCateId', '');
        changeParams.push({paths: 'main.sticky', value: true}, {paths: 'main.chooseCateId', value: ''});
      } else {
        if (key === '-1') {
          // 精选 = false
          // action.commonChange('main.sticky', '');
          // // chooseCateId = key
          // action.commonChange('main.chooseCateId', key);
          changeParams.push({paths: 'main.sticky', value: ''}, {paths: 'main.chooseCateId', value: key});
        } else {
          // 精选 = false
          // action.commonChange('main.sticky', false);
          // // chooseCateId = key
          // action.commonChange('main.chooseCateId', key);
          changeParams.push({paths: 'main.sticky', value: false}, {paths: 'main.chooseCateId', value: key});
        }
      }
      await action.commonChange(changeParams);
      await this.page();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageBGrouponGrouponCenterMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
