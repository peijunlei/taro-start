import Actions from './actions';
import {GiftCardInfo} from 'api/GiftCardController';

export interface IMainReducer {
  isReady: boolean;
  // 选中的tab
  tab: TabType;
  // 可用礼品卡数量
  validNum: number;
  // 可用礼品卡列表
  validList: GiftCardInfo[];
  // 不可用礼品卡数量
  invalidNum: number;
  // 不可用礼品卡列表
  invalidList: GiftCardInfo[];
  // 可用商品弹窗
  modalFlag: boolean;
  // 可用商品弹窗商品
  modalStoreGoods: any[];
  // 确认订单的商品清单
  goodsInfos: IGoodsInfo[];
  // 已选的礼品卡
  checkedCardIds: string[];
  // 提示弹窗
  tipModal: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IGiftCardListProps = {};
export type IGiftCardListState = {};

export type IGiftCardTabProps = {};
export type IGiftCardTabState = {};

export type IGoodsModalProps = {};
export type IGoodsModalState = {};

export type IGoodsInfo = {
  storeInfo: {
    storeId: number;
    isSelf: boolean;
    storeName: string;
  };
  skuId: string;
  skuName: string;
  specDetails: string;
  // 弹窗展示金额
  price: number;
  splitPrice: number;
  pointSplitPrice: number;
  num: number;
  pic: number;
}

export enum TabType {
  // 可用
  USABLE = 0,
  // 不可用
  UN_USABLE = 1,
}
