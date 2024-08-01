import Actions from './actions';
import {CustomerLevelWithRightsByCustomerIdResponse} from 'api/PersonalCenterController';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingFlag: boolean;
  userInfo: CustomerLevelWithRightsByCustomerIdResponse; //用户信息
  gradeList: []; //等级列表
  hotExchange: any; //积分兑换
  nextGradeInfo: {
    growthValue?: number;
    customerLevelName?: string;
  }; //下一个等级
  isLastOne: false; //是否是最后一个
  notGetGradeList: any; //当前后面所有的等级。不与上面数据合并
  nowPossessGradeInfo: {
    customerLevelRightsVOS?: any;
    customerLevelId?: any;
  }; //当前的等级信息
  pointsAvailable: number; //积分 值
  pointsIsOpen: boolean; //积分是否打开
  //商品评价相关信息是否展示
  isShow: boolean;

  //会员最爱买 分页请求数据
  form?: {
    keywords: string;
    brandIds: any;
    sortFlag: number;
    esGoodsInfoDTOList: any;
    stockFlag: number;
    pageSize: number;
    pageNum: number;
  };
  buyList?: any;
  flag: boolean; //积分规则开关
  pointsRule: string; //积分规则
  total: number;
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
