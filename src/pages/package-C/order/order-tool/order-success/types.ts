import Actions from './actions';
export interface IMainReducer {
  payOrders: any[];
  tid: any;
  relationGoodsIdList: any[];
  // 支付类型：0线上支付、1线下支付
  payType: number;
  // 付款类型：0已收款、1未收款、2待确认
  _payOrderStatus: number;
  paymentOrder: string;
  auditState: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISearchProps = {};
export type ISearchState = {};

export type IMenuBoxProps = {};
export type IMenuBoxState = {};

export type ISpuListProps = {};
export type ISpuListState = {};

export type IBigSpuListProps = {};
export type IBigSpuListState = {};

export type ISkuListProps = {};
export type ISkuListState = {};

export type IBigSkuListProps = {};
export type IBigSkuListState = {};

export type INavToolsProps = {};
export type INavToolsState = {
  selectItem: number;
};

export type ICompositePickerProps = {};
export type ICompositePickerState = {
  composites: any;
};

export type IScreenModalProps = {};
export type IScreenModalState = {};

export type IShopCartNumProps = {};
export type IShopCartNumState = {};

export type IMainGoodsSet = IMainGoods[];

export interface IMainGoods {
  [k: string]: any;
}

export interface IMainRequest {
  pageIndex: number;
  pageSize: number;
  type: any;
  relationGoodsIdList: any[];
  recommendType: any;
  [k: string]: any;
}
export type IMainTotal = number;

export type IMainGoodsCatesSet = IMainGoodsCates[];

export interface IMainGoodsCates {
  [k: string]: any;
}

export type IMainGoodsBrandsSet = IMainGoodsBrands[];

export interface IMainGoodsBrands {
  [k: string]: any;
}

export interface IMainGoodsSpecs {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
