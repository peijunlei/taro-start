import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  detail: any;
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
export type PrizeBuyerInfoProps = {};
export type PrizeBuyerInfoState = {};
export type PrizeGoodsProps = {};
export type PrizeGoodsState = {};

//create by moon https://github.com/creasy2010/moon
