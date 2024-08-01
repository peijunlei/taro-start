import Actions from './actions';



export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  order: {
    skus: any, // 商品清单
    gifts: any, //赠品清单
    // 是否自购订单
    selfBuy: boolean,
    // 是否自营店铺
    isSelf: boolean
  };
  promotionOrder:boolean;//是否是积分商品
}


export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {

  main: IMainReducer,

  [name: string]: any;
}

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;


export type IOrderGiftItemProps = {};
export type IOrderGiftItemState = {};

export type IOrderSkuItemProps = {};
export type IOrderSkuItemState = {};


export interface IMainOrder {
  [k: string]: any;
}
export interface IMainReturnOrder {
  [k: string]: any;
}


//create by moon https://github.com/creasy2010/moon
