import Actions from './actions';
import {
  GrouponDetailWithGoodsVO,
  GoodsVO,
  GoodsInfoVO,
  GrouponInstanceWithCustomerInfoVO,
} from 'api/GoodsBaseController';
import {GrouponCenterVO} from 'api/GrouponCenterController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  grouponDetails: GrouponDetailWithGoodsVO;

  goods: GoodsVO;

  goodsInfos: GoodsInfoVO[];

  grouponDetailOptStatus: number;

  grouponNo: string;

  serverTime: IMainServerTime;

  specModal: IMainSpecModal;

  waitGroupModal: IMainWaitGroupModal;

  groupShareModal: IMainGroupShareModal;

  joinPeopleModal: IMainJoinPeopleModal;

  targetGroupNo: string;

  grouponInstanceList: GrouponInstanceWithCustomerInfoVO[];

  goodsShareVisible: boolean;

  isOpenWechat: boolean;

  shareUserId: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IGroupProps = {};
export type IGroupState = {};

export type IGoodsDetailProps = {};
export type IGoodsDetailState = {};

export type IDetailBottomProps = {};
export type IDetailBottomState = {};

export type IGoodsShareProps = {};
export type IGoodsShareState = {};

export type IPlayWayProps = {};
export type IPlayWayState = {};

export type IGoodsListProps = {
  scrollY: boolean;
  onScrollToUpper: Function;
};

export type IGoodsListState = {
  list: GrouponCenterVO[];
  total: number;
};

export type IJoinPeopleModalProps = {};
export type IJoinPeopleModalState = {};

export type IWaitGroupModalProps = {};
export type IWaitGroupModalState = {
  list: GrouponInstanceWithCustomerInfoVO[];
  total: number;
};

export type IMainGrouponDetailOptStatus = number;
export type IMainGrouponNo = string;
export type IMainServerTime = number;
export type IMainSpecModal = boolean;
export type IMainWaitGroupModal = boolean;
export type IMainGroupShareModal = boolean;
export type IMainJoinPeopleModal = boolean;
export type IMainTargetGroupNo = string;

//create by moon https://github.com/creasy2010/moon
