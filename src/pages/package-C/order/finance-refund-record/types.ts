import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  refundOrderResponseList: any;

  pointsIsOpen: IMainPointsIsOpen;
  returnFlowState: IMainReturnFlowState;
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

export interface IMainRefundRecord {}
export type IMainPointsIsOpen = boolean;
export type IMainReturnFlowState = String;

//create by moon https://github.com/creasy2010/moon
