import Actions from './actions';
import {CustomerLevelVO, StoreDocumentResponse} from 'api/StoreBaseController';
import {StoreLevelByCustomerIdAndStoreIdResponse, StoreLevelVO2} from 'api/StoreLevelBaseController';
import {CustomerLevelWithRightsByCustomerIdResponse} from 'api/CustomerLevelBaseController';

export interface IMainReducer {
  store: StoreDocumentResponse;
  level: CustomerLevelVO;
  levelList: CustomerLevelVO | StoreLevelVO2;
  userInfo: CustomerLevelWithRightsByCustomerIdResponse | StoreLevelByCustomerIdAndStoreIdResponse;
  growthValueIsOpen: boolean;
  erweimaState: boolean;
  isShow: boolean;
  showImages: {images: any[]; idx: number};
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IRightsProps = {};
export type IRightsState = {};

export type IPictureProps = {};
export type IPictureState = {};

export type IProfileProps = {};
export type IProfileState = {
  ifShow: boolean;
};

//create by moon https://github.com/creasy2010/moon
