import Actions from './actions';
import {CustomerBaseInfoResponse} from 'api/CustomerBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingList:boolean;
  customer: CustomerBaseInfoResponse;
  perfectInfo?: boolean;
  addressInfo: string;
  flag: boolean; //完善有礼弹框
  growthValues: {
    point: number;
    pointFlag: boolean;
    growthFlag: boolean;
    growthValue: number;
  };
  rewardFlag: boolean;
  // 积分是否打开
  pointsIsOpen:boolean
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
  gender: object;
  pickerShow: boolean;
};

//create by moon https://github.com/creasy2010/moon
