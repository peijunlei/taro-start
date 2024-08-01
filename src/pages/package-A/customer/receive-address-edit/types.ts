import Actions from './actions';

export interface IMainReducer {
  needComplete: boolean;
  isReady?: boolean;
  isLoading?: boolean;
  pickerShow: boolean;
  //收货地址列表
  consigneeName: '';
  consigneeNumber: '';
  deliveryAddress: '';
  houseNum:string;
  isDefaltAddress: 0;
  deliveryAddressId: string;
  areaInfo: string; //编辑时保存省市区的字段
  areaIds: any[];
  provinceId: string;
  cityId: string;
  areaId: string;
  maskShow:boolean;
  latitude:string;
  longitude:string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {
  pickerShow: boolean;
};

//create by moon https://github.com/creasy2010/moon
