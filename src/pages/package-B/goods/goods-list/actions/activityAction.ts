import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
import { WMkit } from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //查询预置搜索词
    async queryPrekeywords() {
      const result = await api.PresetSearchTermsQueryController.listPresetSearchTerms();
      action.commonChange(
        'main.preKeyword',
        result.presetSearchTermsVO.length > 0 && result.presetSearchTermsVO[0].presetSearchKeyword,
      );
    },
    //跳转到详情页
    loadPages(item, isAppointmentArry, isShowBooking, goodsType) {
      if (goodsType === 6) {
        Taro.navigateTo({
          url: `/pages/package-F/cards/details/index?id=${item.goodsInfoId}&type=zhichong`
        })
        return
      } else if (goodsType === 7) {
        Taro.navigateTo({
          url: `/pages/package-F/cards/details/index?id=${item.goodsInfoId}&type=coupon`
        })
        return
      }
      //当商品允许分销且分销审核通过，视为分销商品，不展示促销和优惠券
      const distributionFlag = item.distributionGoodsAudit == '2';
      const grouponFlag = item.grouponLabel;

      let buyPoint = item.buyPoint;
      let isbuyPoint = buyPoint != null && buyPoint > 0;
      //普通商品详情
      let url = `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`;
      let flashSale = Array.isArray(item.marketingLabels)
        ? item.marketingLabels.map((val) => {
          return val.marketingType == 5;
        })
        : [];
      if (flashSale.includes(true)) {
        //秒杀进入普通详情页
        url = `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`;
      } else if (!distributionFlag && grouponFlag && isAppointmentArry.length == 0 && !isShowBooking && !isbuyPoint) {
        //满足条件跳转到拼团详情
        url = `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`;
      }
      Taro.navigateTo({
        url: url,
      });
    },
    /*
     * --bug=1061475 --user=李洪波 【UI】店铺商品列表 https://www.tapd.cn/22259351/s/1577966
     * */
    async getMenuList() {
      try {
        const result = await api.HoverNavMobileController.getByMain(1);
        action.commonChange([
          { paths: 'main.linkInfoPage', value: result.hoverNavMobileVO.linkInfoPage },
          { paths: 'main.menuList', value: result.hoverNavMobileVO.navItems.filter(item => item.title !== '关注店铺') },
        ]);
      } catch (e) { }
    },
    //发圈素材
    async getDistributor(goodsInfo) {
      const result = await WMkit.getDistributorStatus();
      if (result.distributionEnable) {
        Taro.navigateTo({
          url: `/pages/package-B/goods/material-circle/index?goodsInfoId=${goodsInfo.goodsInfoId}`,
        });
      } else {
        let reason = result.forbiddenReason;
        //店铺关闭或者分销员禁用时弹窗
        // msg.emit('bStoreCloseVisible', {
        //   visible: true,
        //   reason: reason
        // });
      }
    },

    /**
     * 查询抢购信息
     * @param goodsId
     * @private
     */
    async _initFlashSaleGoods(goodsId) {
      const flashsaleGoodsList = await api.flashsaleGoodsController.isInProgress(goodsId);
      await action.commonChange('main.flashsaleGoods', flashsaleGoodsList.flashSaleGoodsVOS);
    },

    //分享赚
    async shareModal(goodsInfo) {
      action.commonChange([
        { paths: 'main.goodsInfo', value: goodsInfo },
        { paths: 'main.goodsShareVisible', value: true },
      ]);
    },

    /**
     *  查询平台端-社交分销总开关状态
     * @returns {Promise<void>}
     */
    async queryOpenFlag() {
      const res = await api.distributionController.queryOpenFlag();
      action.commonChange('main.distributionSwitch', res);
    },

    /**
     * 获取用户地址id
     * 默认地址 > 缓存地址 > 第一个地址
     */
    async getDeliveryAddressId() {
      let deliveryAddressId = null
      const context = await api.customerDeliveryAddressBaseController.findAddressList();
      if (context.length === 0) {
        return deliveryAddressId
      } else {
        const defaultAddress = context.find((item) => item.isDefaltAddress === 1);
        if (defaultAddress) {
          deliveryAddressId = defaultAddress.deliveryAddressId
        } else {
          // 缓存的地址
          const selectAddr = Taro.getStorageSync('mini::confirmAddress');
          if (selectAddr && selectAddr.deliveryAddressId) {
            // 是否可用
            const isAvailable = context.some((item) => item.deliveryAddressId === selectAddr.deliveryAddressId);
            if (isAvailable) {
              deliveryAddressId = selectAddr.deliveryAddressId
            } else {
              // 取第一个地址
              deliveryAddressId = context[0].deliveryAddressId
            }
          }
        }
      }
      return deliveryAddressId
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
