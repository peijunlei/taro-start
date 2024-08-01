import {DistributionGoodsMatterPageVO} from 'api/DistributionGoodsMatterController';
import {DistributionCustomerVO} from 'api/DistributionController';
import Actions from './actions';
import main from '../user-center/reducers/main';
import {number} from 'prop-types';

export interface IMainReducer {
  isLoading?: boolean;
  matterType: IMainMatterType;
  isReady: IMainIsReady;

  imageModal: IMainImageModal;

  imageList: IMainImageListSet;

  chooseImageIndex: IMainChooseImageIndex;

  shareVisible: IMainShareVisible;

  goodsShareVisible: IMainGoodsShareVisible;

  shareModalVisible: IMainShareModalVisible;

  visibleMap: IMainVisibleMap;

  currentMatterList: IMainCurrentMatterListSet;

  moments: IMainMoments;

  currentMatterId: IMainCurrentMatterId;

  checkedSku: IMainCheckedSku;

  addSelfShop: IMainAddSelfShop;

  momentSuccess: IMainMomentSuccess;

  customer: IMainCustomer;

  noticeNum: IMainNoticeNum;

  preferentialNum: IMainPreferentialNum;

  buttonType: number;

  chooseMatterId: string;

  pageNum: number;

  isOpenWechat: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ITopProps = {};
export type ITopState = {};

export type IListProps = {};

export type IListState = {
  list: Array<DistributionGoodsMatterPageVO>;
  total: number;
};

export type ISharePopProps = {};
export type ISharePopState = {};

export type IImageModalProps = {};
export type IImageModalState = {
  windowWidth: number;
};

export type IGoodsShareProps = {};
export type IGoodsShareState = {};

export type ICardCarouselProps = {};
export type ICardCarouselState = {};

export type IZhiboListProps = {};
export type IZhiboListState = {};

export type IZhiboListItemProps = {};
export type IZhiboListItemState = {};

export type ICarouselItemProps = {};
export type ICarouselItemState = {};

export type IZhiboStatusProps = {};
export type IZhiboStatusState = {};

export type IMaterialCircleTabsProps = {};
export type IMaterialCircleTabsState = {};

export type IMatericalItemProps = DistributionGoodsMatterPageVO;
export type IMaterialItemProps = {
  matterItem: DistributionGoodsMatterPageVO;
  onSpread: Function;
  main: IMainReducer;
};
export type IMaterialItemState = {
  scrollHeigt: number;
  key: string;
  overflowY: string;
  height: string;
};

export type IMainIsReady = boolean;
export type IMainMatterType = number;
export type IMainImageModal = boolean;
export type IMainImageListSet = IMainImageList[];

export interface IMainImageList {
  [k: string]: any;
}
export type IMainChooseImageIndex = number;
export type IMainShareVisible = boolean;
export type IMainGoodsShareVisible = boolean;
export type IMainShareModalVisible = boolean;
export type IMainVisibleMap = Object;
export type IMainCurrentMatterListSet = IMainCurrentMatterList[];

export interface IMainCurrentMatterList {
  [k: string]: any;
}
export type IMainMoments = boolean;
export type IMainCurrentMatterId = string;
export interface IMainCheckedSku {
  [k: string]: any;
}
export type IMainAddSelfShop = boolean;
export type IMainMomentSuccess = boolean;
export type IMainCustomer = DistributionCustomerVO;
export type IMainNoticeNum = number;
export type IMainPreferentialNum = number;

//create by moon https://github.com/creasy2010/moon
