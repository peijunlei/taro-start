import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
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
    shareBtn(matterItem, ifShow) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.reload',
          value: false,
        },
      });
      if (Taro.getEnv() === 'WEAPP') {
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.checkedSku',
            value: matterItem.goodsInfo,
          },
        });
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.chooseMatterId',
            value: matterItem.id,
          },
        });
        //隐藏tab
        // Taro.hideTabBar();
        if (ifShow) {
          dispatch({
            type: Command.commonChange,
            payload: {
              paths: 'main.goodsShareVisible',
              value: true,
            },
          });
        }
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.shareModalVisible',
            value: false,
          },
        });
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.addSelfShop',
            value: true,
          },
        });
      } else {
        Taro.navigateTo({
          url: `/pages/package-B/goods/goods-details/index?skuId=${matterItem.goodsInfo.goodsInfoId}`,
        });
      }
    },
    //取消分享
    cancelModal() {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.goodsShareVisible',
          value: false,
        },
      });
      //显示tabbar
      Taro.showTabBar();
    },
    //图文分享
    async pictureShare() {
      let customerName;
      let inviteeId;
      let shareUserId;
      const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
      if (loginData) {
        customerName = loginData.customerDetail.customerName;
        shareUserId = loginData.customerId;
        //如果是分享员登录，直接取customerId作为inviteeId
        if (loginData.customerDetail.isDistributor) {
          inviteeId = loginData.customerDetail.customerId;
        } else {
          //不是分销员，涉及到二次分享的，取缓存里的inviteeId
          inviteeId = Taro.getStorageSync(cache.INVITEE_ID);
        }
      }
      //店铺外分享赚
      try {
        const qrCode = await api.distributionMiniProgramController.distributionMiniProgramQrCode({
          skuId: getData().main.checkedSku.goodsInfoId,
          inviteeId: inviteeId,
          channel: 'mall',
        });
      } catch (e) {
        // Taro.showToast({
        //   title: '功能不可用！',
        //   icon: 'none',
        //   duration: 2000,
        // });
        return;
      }
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.goodsShareVisible',
          value: false,
        },
      });
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.shareModalVisible',
          value: true,
        },
      });

      //更新分享次数
      await api.distributionGoodsMatterController.deleteList({id: getData().main.chooseMatterId});
      //  await dispatch({
      //   type: Command.commonChange,
      //   payload: {
      //     paths: 'main.reload',
      //     value: true,
      //   },
      // });
    },
    //分享后添加我的店铺
    addShareStore() {
      let main = getData().main;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.addSelfShop',
          value: !main.addSelfShop,
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('materialCircleMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
