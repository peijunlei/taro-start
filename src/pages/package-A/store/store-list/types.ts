import Actions from './actions';
import {StoreVO} from 'api/StoreController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  request: IMainRequest;

  total: IMainTotal;

  list: StoreVO[];
  filterModalVisible: boolean;

  customerId: string;
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
export type IListState = {};

export type IHeadProps = {};
export type IHeadState = {};

export type IFilterProps = {};
export type IFilterState = {
  provinces: any;
  citys: any;
  selectedCitys: any;
  selectedProvId: string;
  selectedAllCity: any;
};

export type IStoreItemProps = {};
export type IStoreItemState = {};
export interface IMainRequest {
  pageNum?: number;
  pageSize?: number;
  allAreaIds: any;
  companyType: number;
  keywords: string;
}
export type IMainTotal = number;

//create by moon https://github.com/creasy2010/moon
