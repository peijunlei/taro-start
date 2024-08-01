import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  storeId: IMainStoreId;

  form: {
    rid: ''; //订单编号
    logisticsNo: ''; //物流单号
    time: any; //发货时间
    expressName: ''; //物流公司
    formatTime: any; //发货时间
    expressCode: ''; //物流公司标准编码
  };
  logisticsList: [];
  newLogisticsList: [];
  checkLogistics: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IFormItemProps = {};
export type IFormItemState = {};

export type IMainStoreId = null;
export interface IMainForm {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
