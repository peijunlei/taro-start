import Actions from './actions';
import {CustomerBaseInfoResponse} from 'api/CustomerBaseController';
// import { undefinedArray } from 'api/StoreFollowBaseController';
// import { SystemGrowthValueOpenResponse } from 'api/SystemGrowthValueConfigController';
// import { BossGoodsEvaluateResponse } from 'api/SystemPointsConfigController';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  customer: CustomerBaseInfoResponse;
  goodsFollow: number;
  storeFollow: number;
  growthValueIsOpen: boolean;
  pointsIsOpen: IPointsIsOpen;
  evaluateIsOpen: IEvaluateIsOpen;
  accountBalanceTotal: number;
  unUseCount: number;
  signFlag: boolean;
  isLogin: boolean;
  messNum: number;
  orderCount: {};
  isServiceOpen: boolean;
  aliUrl: string;
  alias: string; //授信显示别名
  balanceAlias: string; //余额显示别名
  usableAmount: number; //可用额度
  enabled: string; //授信是否申请||授信是否申请通过
  isOpen: boolean;
  isWechatOpen: boolean;
  wechatInfo: any;
  changeRecordId: string;
  enterpriseList: Array<any>;
  currentEnterpriseInfo: {[name: string]: any};
  enterpriseId: string;
  giftCardNum: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IMenberCenterProps = {};
export type IMenberCenterState = {};
export type ICenterOrderProps = {};
export type ICenterOrderState = {};
export type IMyAssetsProps = {};
export type IMyAssetsState = {};
export type ICommonToolsProps = {};
export type ICommonToolsState = {};
export type IDeliverySliderProps = {};
export type IDeliverySliderState = {};
export type IMyCountProps = {};
export type IMyCountState = {};
export type IMainGoodsFollow = number;
// export type IGrowthValueIsOpen = boolean;
export type IPointsIsOpen = boolean;
export type IEvaluateIsOpen = boolean;

//create by moon https://github.com/creasy2010/moon
