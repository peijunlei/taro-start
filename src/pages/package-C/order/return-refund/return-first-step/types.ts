import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  skus: IMainSkusSet;

  tradeMarketings: IMainTradeMarketingsSet;

  gifts: IMainGiftsSet;

  giftSecond: IMainGiftsSet;

  originTradeItems: IMainOriginTradeItemsSet;

  returnOrderList: IMainReturnOrderListSet;

  tid: IMainTid;

  returnReasonList: IMainReturnReasonListSet;

  returnWayList: IMainReturnWayListSet;

  selectedReturnReason: IMainSelectedReturnReason;

  selectedReturnWay: IMainSelectedReturnWay;

  description: IMainDescription;

  images: IMainImagesSet;

  totalPrice: IMainTotalPrice;

  tradePoints: IMainTradePoints;

  isReturn: IMainIsReturn;

  returnsResult: IMainReturnsResult;
  newPrice: number;
  newPoints: number;
  allReturnGifts: IMainAllReturnGifts;
  // from: IMainFrom
  giftFlag: number;

  bigImageShow: boolean;
  crossBorderFlag: boolean;
  flowState: string;
  payState: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IReturnRefundFileProps = {};
export type IReturnRefundFileState = {
  isShowTip: boolean;
};

export type IReturnRefundHeadProps = {};
export type IReturnRefundHeadState = {};

export type IReturnRefundPriceProps = {};
export type IReturnRefundPriceState = {};

export type IReturnRefundReasonProps = {};
export type IReturnRefundReasonState = {};

export type IReturnRefundRemarkProps = {};
export type IReturnRefundRemarkState = {};

// export type IReturnGiftsItemProps = {};
// export type IReturnGiftsItemState = {};

export type IReturnGiftsListProps = {};
export type IReturnGiftsListState = {};

export type IReturnSkusBoxProps = {};
export type IReturnSkusBoxState = {};
// export type IReturnSkusItemProps = {};
// export type IReturnSkusItemState = {};

export type IReturnSkusListProps = {};
export type IReturnSkusListState = {};

export type IReturnSkusPriceProps = {};
export type IReturnSkusPriceState = {};

export type IMainSkusSet = IMainSkus[];

export interface IMainSkus {
  [k: string]: any;
}
export type IMainTradeMarketingsSet = IMainTradeMarketings[];

export interface IMainTradeMarketings {
  [k: string]: any;
}
export type IMainGiftsSet = IMainGifts[];

export interface IMainGifts {
  [k: string]: any;
}
export type IMainOriginTradeItemsSet = IMainOriginTradeItems[];

export interface IMainOriginTradeItems {
  [k: string]: any;
}
export type IMainReturnOrderListSet = IMainReturnOrderList[];

export interface IMainReturnOrderList {
  [k: string]: any;
}
export type IMainTid = string;
export type IMainReturnReasonListSet = IMainReturnReasonList[];

export interface IMainReturnReasonList {
  [k: string]: any;
}
export type IMainReturnWayListSet = IMainReturnWayList[];

export interface IMainReturnWayList {
  [k: string]: any;
}
export type IMainSelectedReturnReason = string;
export type IMainSelectedReturnWay = string;
export type IMainDescription = string;
export type IMainImagesSet = IMainImages[];

export interface IMainImages {
  [k: string]: any;
}
export type IMainTotalPrice = number;
export type IMainTradePoints = number;
export type IMainIsReturn = boolean;
export interface IMainReturnsResult {
  [k: string]: any;
}
export type IMainAllReturnGifts = {};

// export interface IMainFrom {
//   [k: string]: any;
// }

//create by moon https://github.com/creasy2010/moon
