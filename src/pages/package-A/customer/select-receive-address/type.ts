import Actions from './actions'
export interface IMainReducer {
  nearAddressList:any[];
  searchAddressList:any[];
  isShowMap:boolean;
  isReady: boolean;
  deliveryInfo: IMainCreditInfo;
}
export type ActionType = ReturnType<typeof Actions>;

export interface IMainCreditInfo {
  [k: string]: any;
}

export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};
export type IProps = IAllReducerProps & ActionType;
