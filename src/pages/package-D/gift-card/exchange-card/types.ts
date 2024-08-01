import Actions from './actions';

export interface IMainReducer {
  enterpriseId?: string;
  isReady: boolean;
  // 卡号
  giftCardNo: string;
  // 兑换码
  exchangeCode: string;
  // 失败弹窗
  failModal: boolean;
  // 失败提示信息
  failMsg: string;
  // 确认弹窗
  confirmModal: boolean;
  // 成功
  successModal: boolean;
  // 卡片信息
  cardInfo: any;
  // 兑换后的卡id
  cardId: string;
  // 卡详情
  giftCardDetailVO: any;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IModalProps = {};
export type IModalState = {};
