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

    changeTopActive(key: string, defaultCate: number) {
      const {chooseCateId} = getData().main;
      if (key && chooseCateId === key) {
        return false;
      }
      // keyWords = ''
      const changeParams: [{paths: string; value: any}] = [{paths: 'main.keyWords', value: ''}];
      // action.commonChange('main.keyWords', '');
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
      action.commonChange(changeParams);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageBGrouponGrouponSelectionMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
