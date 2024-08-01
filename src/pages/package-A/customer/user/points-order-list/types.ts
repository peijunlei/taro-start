import Actions from './actions';
import {IMainRequest} from '@/pages/package-A/store/store-list/types';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  key: string;
  //订单列表
  orders: any;
  // 列表数据
  form: {
    //订单流程状态
    flowState: string;
    //订单付款状态
    payState: string;
    // 邀请人ID
    inviteeId: string;
    // 分销渠道
    channelType: string;
    orderType: string;
    keywords: string;
  };
  serverTime: string;
  orderButtons: {
    available: any;
    id: string;
  };
  inviteeShopName: string;
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
