import Actions from './actions';
import {AppMessageVO} from 'api/MessageController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  messageType: number;
  total: 0;
  list: AppMessageVO[];
  reload: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ITopProps = {};
export type ITopState = {};

export type IListProps = {};
export type IListState = {};

//create by moon https://github.com/creasy2010/moon
