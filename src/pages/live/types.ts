import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isLoadingFlag: boolean;
  visibleMap: Object;

  currentSwiperIndex: number;

  currentLiveTabIndex: number;

  currentTab: number;

  roomInfo: [];

  liveGoodsList: [];

  currentLiveId: number;

  pageNum: number;

  carouselList: [];

  liveRoomReplayVOList: [];

  isScroll: boolean;

  logoList: [];

  isOpen: boolean;

  autoPlay: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IZhiboListItemProps = {};
export type IZhiboListItemState = {};

export type IInfoProps = {};
export type IInfoState = {};

export type ICarouselItemProps = {};
export type ICarouselItemState = {};

export type ICardCarouselProps = {};
export type ICardCarouselState = {};

//create by moon https://github.com/creasy2010/moon
