import Actions from './actions';
import {IMainRequest} from '@/pages/package-A/store/store-list/types';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  //商品详情
  goodList: {
    deliveryTime: string;
    logistics: {
      logisticCompanyName: string;
      logisticNo: string;
    };
    shippingItems: [];
    giftItemList: [];
    status: string;
    failMessage: string;
  },
  orderMType: string
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
