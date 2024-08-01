import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  accountInfo: IMainAccountInfo;
  checked: number;
  rejectReason: string;
  minutes: number;
  initialName: string;
  areaIds: [];
  areaInfo: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IAccountInfoProps = {};
export type IAccountInfoState = {
  pickerShow: boolean;
  areaInfo: string;
  gender: Array<string>;
};

export type IMainAccountInfo = {
  uName: string;
  birthDay: string;
  gender: number;
  provinceId: number;
  cityId: number;
  areaId: number;
  streetId: number;
  address: string;
  contact: string;
  phone: string;
  customerId: string;
};

//create by moon https://github.com/creasy2010/moon
