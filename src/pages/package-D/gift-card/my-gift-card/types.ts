import Actions from './actions';
import {TabStatus, GiftCardInfo, InvalidStatus} from 'api/GiftCardController';

export interface IMainReducer {
  isCommLogin?: number;
  isReady: boolean;
  loadingStatus: LoadingStatus;
  // 当前选中的tab
  status: TabStatus;
  // 当前选中的子tab
  invalidStatus: InvalidStatus;
  // 可用数量
  useNum: number;
  // 不可用数量
  invalidNum: number;
  // 待激活数量
  notActive: number;
  // 可用余额
  cardBalance: number;
  // 礼品卡列表
  giftCardList: GiftCardInfo[];
  // 分页信息
  pageNum: number;
  /** 卡类型 - 0福点，1提货 */
  giftCardType: IGiftCardType;
}

/** 卡类型 - 0福点，1提货 */
export type IGiftCardType = 0 | 1;

export interface QueryInfo {
  status: TabStatus;
  pageNum: number;
  pageSize: number;
}

export enum LoadingStatus {
  // 加载中
  LOADING,
  // 加载完毕（还有）
  LOADED,
  // 加载完毕（没有更多）
  LOADED_NO_MORE
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

