import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  tab: IMainTab;

  isDistributor: IMainIsDistributor;

  totalNum: IMainTotalNum;

  friendsList: IMainFriendsSet;
  tabList: any;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IHeaderProps = {};
export type IHeaderState = {};

export type ITabProps = {};
export type ITabState = {};

export type IFriendListProps = {};
export type IFriendListState = {};

export type IFriendItemProps = {};
export type IFriendItemState = {};

export type IMainTab = string;
export type IMainIsDistributor = boolean;
export type IMainTotalNum = number;
export type IMainFriendsSet = IMainFriends[];

export interface IMainFriends {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
