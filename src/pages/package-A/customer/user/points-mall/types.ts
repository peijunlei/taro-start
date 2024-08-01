import Actions from './actions';
import {CustomerLevelWithRightsByCustomerIdResponse} from 'api/PersonalCenterController';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
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
  pointsIsOpen: boolean; //积分是否打开

  pointsAvailable: number; //积分 值
  cateList: any; //积分商品分类
  canExchange: boolean; //我能兑换
  pointsCouponListFlag: boolean; // 积分优惠券列表展示
  list: any; //正常List
  listCou: any; //优惠券List
  cateId: any; //选中的积分商品分类
  sortType: {
    //排序选项
    type: string;
    sort: string;
  };
  latestPointsCouponInfoList: any; // 兑换优惠券后查询到的最新信息
  visible: boolean; //支付密码弹框展示
  payPwd: string; //支付密码
  couponVisible: boolean; //优惠券兑换弹框
  //存储优惠券弹框需要的字段信息
  pointsCoupon: any;
  couponInfo: any;
  payErrorTime: number;
  pointsCouponId: string; // 即将兑换的积分优惠券id
  flag: boolean; //积分规则开关
  pointsRule: string; //积分规则
  integralVisible: boolean; //是否开启积分商城开关
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
export type IErrorInfoProps = {};
export type IErrorInfoState = {};
export type IFriendListProps = {};
export type IFriendListState = {};
export type IToolImgProps = {};
export type IToolImgState = {};
export type IPasswordMaskProps = {};
export type IPasswordMaskState = {};
//create by moon https://github.com/creasy2010/moon
