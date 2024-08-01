import Actions from './actions';
import {IMainRequest} from '@/pages/package-A/store/store-list/types';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  key: string;
  delayFlag:boolean;
  //订单列表
  orders: [];
  // 列表数据
  form: {
    //订单流程状态
    flowState: string;
    //订单付款状态
    payState: string;
    //小b端我的客户列表是否是查询全部
    customerOrderListAllType: Boolean
    pageNum: number;
    pageSize: number;
  };
  totalPages:number;
  serverTime: string;
  orderButtons: {
    available: any;
    id: string;
  };
  inviteeShopName:string;
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
