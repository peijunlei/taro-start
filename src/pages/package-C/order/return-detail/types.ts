import Actions from './actions';
import {ReturnOrderVO} from 'api/ReturnOrderBaseController';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  detail: ReturnOrderVO; //订单详情
  orderButtons: {
    available: [];
    id: '';
  };

  // 拒绝原因，拒绝收货、拒绝退款 或 审核驳回
  rejectReason: '',
  pointsIsOpen: false //积分是否打开
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type OrderStatusProps = {};
export type OrderStatusState = {};

//create by moon https://github.com/creasy2010/moon
