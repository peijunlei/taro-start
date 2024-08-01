import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  id: string;
  activityName: string;
  startTime: string;
  endTime: string;
  /* 0 表示每日抽奖限制 1 表示每人抽奖限制 */
  drawTimesType: 0 | 1;
  /* 剩下抽奖次数 */
  leftDrawCount: number;
  prizeList: IPrize[];
  checkId: number | string;
  prizeId: string | string;
  modalShow: boolean;
  // 大转盘抽奖是否正在转
  startWheelLoading: boolean;
  click: boolean;
  /* 中奖信息 */
  prizeInfo: any;
  tipsNotWin: string;
  maxAwardTip: string;
  activityId: string | number;
  activityContent: string;
  pauseFlag: 0 | 1;
  formType: 0 | 1;
  wheelPrizes: [];
  wheelButtons: [];
  consumePoints: string | number;
  drawType: 0 | 1 | 2 | 3;
  pointsAvailable: 0;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IContentProps = {};
export type IContentState = {};

export type IBottomBtnProps = {};
export type IBottomBtnState = {};

export type IPrizeModalProps = {};
export type IPrizeModalState = {};

export interface IPrize {
  id: string | number;
  activityId: string;
  prizeName: string;
  prizeUrl: string;
}
