import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingFlag: boolean;
  customerInfo: IMainCustomerInfo;

  distributor: IMainDistributor;
  distribute: IMainDistribute;

  distributeSetting: IMainDistributeSetting;

  customerBalance: IMainCustomerBalance;

  yesterdayPerformance: IMainYesterdayPerformance;

  monthPerformance: IMainMonthPerformance;

  inviteInfo: IMainInviteInfo;

  inviteCustomer: IMainInviteCustomer;

  hotGoodsList: IMainHotGoodsListSet;

  checkedSku: IMainCheckedSku;

  detailState: IMainDetailState;

  shareVisible: IMainShareVisible;
  forbiddenShow: boolean;
  // 消息数量
  noticeNum: number;
  preferentialNum: number;
  isRuleShow: boolean;
  performanceDesc: '';
  goodsInfo: {};
  //分享赚弹窗
  goodsShareVisible: false;
  shareModalVisible: false;
  addSelfShop: true;
  isOpenWechat: boolean;
  isrefresh: boolean;
  refresh: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IDistributionTopProps = {};
export type IDistributionTopState = {};

export type IInvitFriendProps = {};
export type IInvitFriendState = {};

export type IMyCustomerProps = {};
export type IMyCustomerState = {};

export type ISalesFriendProps = {};
export type ISalesFriendState = {};

export type ISellwellGoodsProps = {};
export type ISellwellGoodsState = {};

export type IRuleModalProps = {};
export type IRuleModalState = {};

export type IToolImgProps = {};
export type IToolImgState = {};

export interface IMainCustomerInfo {
  [k: string]: any;
}
export interface IMainDistributor {
  [k: string]: any;
}
export interface IMainDistribute {
  [k: string]: any;
}
export interface IMainDistributeSetting {
  [k: string]: any;
}
export interface IMainCustomerBalance {
  [k: string]: any;
}
export interface IMainYesterdayPerformance {
  [k: string]: any;
}
export interface IMainMonthPerformance {
  [k: string]: any;
}
export interface IMainInviteInfo {
  [k: string]: any;
}
export interface IMainInviteCustomer {
  [k: string]: any;
}
export type IMainHotGoodsListSet = IMainHotGoodsList[];

export interface IMainHotGoodsList {
  [k: string]: any;
}
export interface IMainCheckedSku {
  [k: string]: any;
}
export type IMainDetailState = boolean;
export type IMainShareVisible = boolean;

export type IHeaderProps = {};
export type IHeaderState = {};

export type IHotProps = {};
export type IHotState = {};
//create by moon https://github.com/creasy2010/moon
