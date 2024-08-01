import Actions from './actions';
import {IMainRequest} from '@/pages/package-A/store/store-list/types';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  detail: [];
  goodList: {
    deliveryTime: '';
    deliveryInfo: '';
    remark: '';
    logistics: {
      logisticCompanyName: '';
      logisticNo: '';
      logisticStandardCode: '';
    };
  };
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IOrderListProps = {};
export type IOrderListState = {};

export type INavToolsProps = {};
export type INavToolsState = {};

//create by moon https://github.com/creasy2010/moon
