import {Command, BASE} from './../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from './../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  const action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData(BASE),
  };
}
