import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  id: string | number;
  total: number;
  pageSize: number;
  pageNum:number;
  totalPages: number;
  balance: number;
  // 记录数据
  billList: Array<any>
  /** 卡类型 - 0福点卡，1提货卡 */
  giftCardType: 0 | 1;
  giftCardId:number|string
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;
export type IGiftCardBillInfoProps = {};
export type IGiftCardBillInfoState = {};