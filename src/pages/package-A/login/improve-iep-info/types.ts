import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  enterpriseCheckState: string;
  enterpriseInfoVO: {
    customerId: string;
    inviteCode: string;
    businessNatureType: number;
    businessNatureTypeName: string;
    enterpriseName: string;
    socialCreditCode: string;
    businessLicenseUrl: string;
  };
  businessLicenseUrl: [];
  inviteCode: string;
  companyInfo: any;
  registerLimitType: string;
  enterpriseCheckTip: string;
  customerId: string;
  openFlag: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {};

//create by moon https://github.com/creasy2010/moon
