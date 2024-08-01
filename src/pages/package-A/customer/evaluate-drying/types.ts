import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  //晒单图片
  enclosures: Array<any>;
  //店铺评价
  storeBaseInfo: any;
  //订单信息
  orderBaseInfo: any;
  //店铺评分
  storeEvaluate: any;
  //订单评分
  orderEvaluate: any;
  //店铺信息
  storeInfo: any;
  //是否显示
  isShow: number;
  //评价类型
  evaluateType: number;
  //店铺信息
  storeVO: any;
  //订单ID
  tid: string;
  //订单创建时间
  createTime: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IAnonymousEvalProps = {};
export type IAnonymousEvalState = {};

//create by moon https://github.com/creasy2010/moon
