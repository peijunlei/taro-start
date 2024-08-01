import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  goodsInfo: IMainGoodsInfo;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IBuyListProps = {};
export type IBuyListState = {};

export interface IMainGoodsInfo {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
