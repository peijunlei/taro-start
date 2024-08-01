import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import purchaseBaseController from 'api/PurchaseBaseController';
import marketingController from 'api/MarketingController';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {getActionProxy} from '@/redux/action-util';
import GoodsAction from '@/pages/package-B/goods/goods-list-promotion/actions/goodsAction';
import { getClassNameHeight } from '@/utils/common-functions';

export default (dispatch: Dispatch) => {
  let action = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 修改购买数量
     * @param goodsInfoId
     * @param marketingId
     * @param oldNum
     * @param newNum
     * @returns {Promise<void>}
     */
    async changeGoodsNum(goodsInfoId, marketingId, oldNum, newNum) {
      if (newNum > 0) {
        await this.modifyGoodsMarketing(goodsInfoId, marketingId);
      }

      this.calcMarketing(marketingId);
    },

    /**
     * 修改商品选择的营销
     * @param goodsInfoId
     * @param marketingId
     * @returns {Promise<void>}
     */
    async modifyGoodsMarketing(goodsInfoId, marketingId) {
      let token = Taro.getStorageSync('authInfo:token');
      if (token) {
        const result = await purchaseBaseController.modifyGoodsMarketing(goodsInfoId, marketingId);

        this.queryGoodsMarketingList();
      } else {
        // 未登录时,在前端存储,用户针对sku选择的营销活动信息
        if (this.putSkuMarketingCache(goodsInfoId, marketingId)) {
          this.queryGoodsMarketingList();
        }
      }
    },

    /**
     * 未登录时,设置sku 参加的营销活动
     * @param goodsInfoId skuId
     * @param marketingId 营销活动id(满减/满折/满赠)
     */
    putSkuMarketingCache(goodsInfoId, marketingId) {
      try {
        // 未登录时,在前端存储,用户针对sku选择的营销活动信息
        const markCache = Taro.getStorageSync('mini::shopCartMarketing') || [];
        let skuMarketingArr = [...markCache];
        const marIndex = skuMarketingArr.findIndex((mar) => mar.goodsInfoId == goodsInfoId);
        if (marIndex > -1) {
          skuMarketingArr[marIndex] = {goodsInfoId, marketingId};
        } else {
          skuMarketingArr.push({goodsInfoId, marketingId});
        }
        Taro.setStorage({
          key: 'mini::shopCartMarketing',
          data: skuMarketingArr,
        });
        return true;
      } catch (e) {
        return false;
      }
    },

    /**
     * 获取营销信息
     */
    async getMarketingById(marketingId) {
      try {
        let result = await marketingController.getMarketingById(marketingId);
        if (result?.marketingType == '0') {
          action.commonChange('main.title', '满减活动');
        } else if (result?.marketingType == '1') {
          action.commonChange('main.title', '满折活动');
        } else if (result?.marketingType == '2') {
          action.commonChange('main.title', '满赠活动');
        }
        action.commonChange('main.type', result?.marketingType);
        action.commonChange('main.marketing', result);
      } catch (error) {}
    },

    /**
     * 获取购物车商品选择的营销
     * @returns {Promise<void>}
     */
    async queryGoodsMarketingList() {
      let token = Taro.getStorageSync('authInfo:token');
      let result;
      if (token) {
        result = await purchaseBaseController.queryGoodsMarketingList();
      } else {
        result = Taro.getStorageSync('mini::shopCartMarketing');
      }
      if (result != '') {
        let obj = {
          marketingId: result[0].marketingId,
          goodsInfoId: result[0].goodsInfoId,
        };
        action.commonChange('main.goodsMarketing', obj);
      }
    },

    /**
     * 计算购物车中参加同种营销的商品列表/总额/优惠
     *
     * @param marketingId
     * @returns {Promise<void>}
     */
    async calcMarketing(marketingId, goodsInfoId) {
      let token = Taro.getStorageSync('authInfo:token');
      let res;
      try {
        if (token) {
          res = await purchaseBaseController.calcMarketingByMarketingId(marketingId);
        } else {
          const goodsInfoDTOList = Taro.getStorageSync('mini::shopCartSku') || [];
          const goodsInfoIds = goodsInfoDTOList.map((sku) => sku.goodsInfoId);
          const goodsMarketingDTOList = Taro.getStorageSync('mini::shopCartMarketing') || [];

          res = await purchaseBaseController.calcMarketingByMarketingIdFront(marketingId, {
            goodsInfoDTOList,
            goodsInfoIds,
            goodsMarketingDTOList,
          });
        }
      } catch (e) {
        await Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
      }

      if (goodsInfoId) {
        const findIndex = res.goodsInfoList.findIndex((g) => g.goodsInfoId === goodsInfoId);
        if (findIndex < 0) {
          await Taro.showToast({
            title: '商品已失效',
            icon: 'none',
            duration: 2000,
          });
          await action.goodsAction.query(false, marketingId);
        }
      }
      await action.commonChange('main.calc', res);
      // 赠品sku信息
      if (res?.marketingType == 2) {
        await action.commonChange('main.gift', res['giftGoodsInfoResponse']);
      }
    },

    /** 
     * 获取浮窗 - 高度 - 操作
     * */
    async getPickerHeightFn() {
      /** 获取活动板块 - 高度 */
      const activityHeight = await getClassNameHeight(".goods_list_promotion_activity");
      /** 获取筛选条件板块 - 高度 */
      const navToolHeight = await getClassNameHeight(".goods_list_promotion_navTools");
      /** picker高度 */
      const pickerHeight = `calc(100% - ${ activityHeight }px - ${ navToolHeight }px)`;
      action.commonChange('main.pickerHeight', pickerHeight);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsListPromotionMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
