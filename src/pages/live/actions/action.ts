import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    changeAutoPlay(flag) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.autoPlay',
          value: flag,
        },
      });
    },

    async changeText(id) {
      const oldVisilbleMap = (getReducerData('materialCircleMain') as any).visibleMap;
      const oldVisible = (getReducerData('materialCircleMain') as any).visibleMap[id];
      const obj = {};
      obj[id] = !oldVisible;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.visibleMap',
          value: Object.assign(oldVisilbleMap, obj),
        },
      });
    },

    async query() {
      await this.isOpen();

      let {
        pageNum,
        roomInfo,
        liveGoodsList,
        liveRoomReplayVOList,
        logoList,
        currentLiveTabIndex,
        isOpen,
      } = getData().main;

      if (!isOpen) return;

      const param = {
        pageNum: pageNum,
        pageSize: 10,
        liveStatus: currentLiveTabIndex >= 0 ? currentLiveTabIndex : null,
      };
      let roomInfoList = await api.liveRoomController.getPage(param);

      action.commonChange('main.roomInfo', roomInfo.concat(roomInfoList.liveRoomVOPage.content));
      action.commonChange('main.liveGoodsList', {...roomInfoList.liveGoodsList, ...liveGoodsList});
      action.commonChange('main.liveRoomReplayVOList', {...roomInfoList.liveRoomReplayVOList, ...liveRoomReplayVOList});
      action.commonChange('main.logoList', {...roomInfoList.storeVO, ...logoList});
      action.commonChange('main.currentTab', 0);
      Taro.hideLoading()
    },

    //当前轮播下标
    changeCurrentItem(e) {
      action.commonChange('main.currentSwiperIndex', e.target.current);
    },

    //切换直播tab
    async handleLiveTab(index) {
      const isOpenRes = await api.liveRoomController.isLiveOpen();
      const isOpenStatus = isOpenRes.configVOList[0].status;

      if (isOpenStatus == 0) {
        action.commonChange('main.isOpen', false);
        action.commonChange('main.currentTab', 1);
        return;
      }

      action.commonChange('main.isLoading', true);
      //取main
      let {pageNum, currentLiveTabIndex} = getData().main;
      const param = {
        pageNum: 0,
        pageSize: 10,
        liveStatus: index >= 0 ? index : null,
      };

      let roomInfoList = await api.liveRoomController.getPage(param);

      action.commonChange('main.roomInfo', roomInfoList.liveRoomVOPage.content);
      action.commonChange('main.liveGoodsList', roomInfoList.liveGoodsList);
      action.commonChange('main.liveRoomReplayVOList', roomInfoList.liveRoomReplayVOList);
      action.commonChange('main.logoList', roomInfoList.storeVO);
      action.commonChange('main.currentLiveTabIndex', index);
      action.commonChange('main.pageNum', 0);
      action.commonChange('main.isLoading', false);
      action.commonChange('main.currentTab', 0);
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {pageNum} = getData().main;
      let num = pageNum + 1;
      action.commonChange('main.pageNum', num);
      await this.query();
    },
    /**
     * 查询直播功能是否开启
     */
    async isOpen() {
      const isOpenRes = await api.liveRoomController.isLiveOpen();
      const isOpenStatus = isOpenRes.configVOList[0].status;

      if (isOpenStatus == 0) {
        action.commonChange('main.isOpen', false);
        action.commonChange('main.currentTab', 1);
      } else {
        action.commonChange('main.isOpen', true);
        action.commonChange('main.currentTab', 0);
      }

      return isOpenStatus;
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('liveMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
