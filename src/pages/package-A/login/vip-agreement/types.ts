import Actions from './actions';
import {AppointmentPageResponse} from 'api/AppointmentController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  words: AppointmentPageResponse;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IWordsProps = {};
export type IWordsState = {};

//create by moon https://github.com/creasy2010/moon