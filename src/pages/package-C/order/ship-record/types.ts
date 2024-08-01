import Actions from './actions';
import {IMainRequest} from '@/pages/package-A/store/store-list/types';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  key: string;
  tradeDilivery: [];
  type: string; //判断是否是客户订单物流信息标记
  deliveryStatus: boolean; //根据订单的发货状态决定是否显示确认收货按钮(全部发货时方可显示)
  orderId: string; //获取订单id
  orderMType: string; //获取订单类型
  showConfirmMask: boolean; //是否展示确认收货弹框
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
