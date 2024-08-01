import Actions from './actions';
import {CustomerDeliveryAddressVO} from 'api/CustomerDeliveryAddressBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  addressList: CustomerDeliveryAddressVO[];
  // '1'为别处页面过来 缓存操作完后返回上个路由
  mode: '0' | '1';
  //确认订单 和 发票地址
  localKey: 'confirmAddress' | 'invoiceAddress';
  showAdd: boolean;
  pickerShow: boolean;
  currentAddress: CustomerDeliveryAddressVO;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {};

//create by moon https://github.com/creasy2010/moon
