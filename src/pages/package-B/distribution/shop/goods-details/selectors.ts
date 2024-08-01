import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

export function store2Props({loginGoodsDetailsMain}: any): IAllReducerProps {
  return {
    main: loginGoodsDetailsMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
//create by moon https://github.com/creasy2010/moon
