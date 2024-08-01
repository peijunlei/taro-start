import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  // 礼品卡id
  id: string;
  // 卡号
  cardNo: string;
  // 卡密
  cardPwd: string;
  // 手机号
  phoneNum: string;
  // 验证码
  code: string;
  // 辅助信息
  auxiliaryInformation: string;
  cardLoginForm: any;
  cardBlessingForm: any;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IGiftCardInfoProps = {};
export type IGiftCardInfoState = {};

export type IGiftCardToolProps = {};
export type IGiftCardToolState = {};

export type IGiftCardBottomProps = {};
export type IGiftCardBottomState = {};
