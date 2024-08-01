import Actions from './actions';
import {FlashSaleActivityVO, FlashSaleCateVO} from 'api/flashSaleController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList: boolean;
  sceneList: FlashSaleActivityVO[];
  activityDate: string;
  activityTime: string;
  activityStatus: string;
  flashBanner: any;
  cateList: FlashSaleCateVO[];
  cateId: number;
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

export type ITypeNavProps = {};
export type ITypeNavState = {};

export type ITimeNavProps = {};
export type ITimeNavState = {
  windowWidth: number;
};

export type IListProps = {};
export type IListState = {};

export type IBannerListProps = {};
export type IBannerListState = {};

export type IProgressProps = {};
export type IProgressState = {};

export type IMainTabIndex = number;
export interface IMainRequest {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
