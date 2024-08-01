import Actions from './actions';
import {IMainRequest} from '@/pages/package-A/store/store-list/types';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  key: string;
  //订单列表
  orders: any;
  // 列表数据
  form: {
    //订单流程状态
    flowState: string;
    //订单付款状态
    payState: string;
    // 邀请人ID
    inviteeId: string;
    // 分销渠道
    channelType: string;
    pageNum: number;
    pageSize: number;
    keywords: string;
    xuanKuaTradeFlag?:boolean;
    xuanKuaMovieTradeFlag?:boolean;
    xuanKuaLifeTradeFlag?:boolean;
    xuanKuaDramaTradeFlag?:boolean;
    goodsType?:string;
    tongKaShuKeTradeType?:number;
  };
  total: number;
  serverTime: string;
  orderButtons: {
    available: any;
    id: string;
  };
  inviteeShopName: string;
  showCateMask: boolean;
  keywords: string;
  orderListType: number;
  visible: boolean;
  tid: string;
  needSearchBarUpdate: boolean;
  ztCode?: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IOrderListProps = {};
export type IOrderListState = {
  maxNum: number;
};

export type INavToolsProps = {};
export type INavToolsState = {};
export type IOrderCateMaskProps = {};
export type IOrderCateMaskState = {
  key: string;
};

//create by moon https://github.com/creasy2010/moon
