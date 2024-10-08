import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  cateList: [];

  index: IMainIndex;
  pageIndex: number;
  scrollTop: number;
  recommendConfig: any;
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

export type IListProps = {};
export type IListState = {
  [name: string]: any;
};

export type ILeftMenuProps = {};
export type ILeftMenuState = {};

export type IMainCateListSet = IMainCateList[];

export interface IMainCateList {
  [k: string]: any;
}
export type IMainIndex = number;

//create by moon https://github.com/creasy2010/moon
