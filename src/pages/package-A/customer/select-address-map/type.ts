import Actions from './actions';
export interface IMainReducer {
  isReady: boolean;
  nearAddress: any[];
  isShowMap: boolean;
  selectNearAddress: any[];
  searchShow: boolean;
  initLng: number; // 初始化地图经度 北京市中心经度
  initLat: number; // 初始化地图纬度 北京市中心纬度
  cityName: string; //缓存城市
}

export interface IMainCreditInfo {
  [k: string]: any;
}

export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};
export type ActionType = ReturnType<typeof Actions>;
//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IAddressListProps = {};
export type IAddressListState = {};

export type ISelectMapProps = {};
export type ISelectMapState = {};

export type ISeachHeaderProps = {};
export type ISeachHeaderState = {};
