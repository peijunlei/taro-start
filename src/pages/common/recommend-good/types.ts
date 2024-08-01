import Actions from './actions';
import {CustomerCenterResponse} from 'api/CustomerBaseController';
import {CustomerFundsStatisticsResponse} from 'api/CustomerFundsController';
import {DistributionCustomerSimVO, DistributionSettingSimVO} from 'api/DistributionController';
import {CountInviteCustomerResponse} from 'api/InviteCustomerRecordController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  noticeNum: number;
  customerInfo: CustomerCenterResponse;
  customerBalance: CustomerFundsStatisticsResponse;
  inviteCustomer: CountInviteCustomerResponse;
  distribute: {
    //分销设置信息
    distributeSetting: DistributionSettingSimVO;
    //邀请人信息
    inviteInfo: DistributionCustomerSimVO;
  };
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

export type IHotProps = {};
export type IHotState = {};

//create by moon https://github.com/creasy2010/moon
