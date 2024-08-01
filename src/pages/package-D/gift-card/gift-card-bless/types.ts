import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  // 礼品卡id
  id: string;
  userGiftCardId: string;
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
