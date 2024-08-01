import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList:boolean;
  tab: IMainTab;

  isDistributor: IMainIsDistributor;

  rang: IMainRang;

  myRank: IMainMyRank;

  rankList: IMainRankListSet;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISalesRankItemProps = {};
export type ISalesRankItemState = {};

export type ISalesRankListProps = {};
export type ISalesRankListState = {};

export type ISalesRankMyRankProps = {};
export type ISalesRankMyRankState = {};

export type ITabProps = {};
export type ITabState = {};

export type IMainTab = string;
export type IMainIsDistributor = boolean;
export type IMainRang = string;
export interface IMainMyRank {
  [k: string]: any;
}
export type IMainRankListSet = IMainRankList[];

export interface IMainRankList {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
