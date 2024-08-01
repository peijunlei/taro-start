import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  history: string[];

  keywords: string;

  storeId: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISearchBarProps = {};
export type ISearchBarState = {};

export type ITabProps = {};
export type ITabState = {};

export type IHistoryProps = {};
export type IHistoryState = {};

export type IMainSearchHistorySet = IMainSearchHistory[];

export interface IMainSearchHistory {
  [k: string]: any;
}
export type IMainQueryString = string;
export type IMainKey = string;

//create by moon https://github.com/creasy2010/moon
