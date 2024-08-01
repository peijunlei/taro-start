import {IAllReducerProps} from './types';

export function store2Props({packageACustomerMessagePushListMain}: any): IAllReducerProps {
  return {
    main: packageACustomerMessagePushListMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
//create by moon https://github.com/creasy2010/moon
