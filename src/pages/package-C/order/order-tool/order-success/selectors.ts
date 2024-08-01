import {BASE} from './constant';
import {IAllReducerProps} from './types';

export function store2Props(props: any = {}): IAllReducerProps {
  return {
    main: props[BASE],
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
//create by moon https://github.com/creasy2010/moon
