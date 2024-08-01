import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {WMkit} from 'wmkit';
import Taro from '@tarojs/taro';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 获取抢购商品详情
     * @param goodsInfoId
     * @private
     */
    async _getGoodsInfoDetail(flashSaleGoodsId) {
      let param = {flashSaleGoodsId: flashSaleGoodsId};
      let goodsInfo = {
        goodImage: '',
        goodName: '',
        goodIntro: '',
        goodPrice: '',
        goodStaus: '积极抢购中',
      };
      let result: any = await api.flashSaleController.getFlashSaleInfo(param);

      let goodsInfoRes: any = await api.goodsInfoBaseController.detail(result.goodsInfoId);
      goodsInfo.goodPrice = result.price;
      goodsInfo.goodImage = goodsInfoRes.goods.goodsImg;
      goodsInfo.goodName = goodsInfoRes.goodsInfo.goodsInfoName;
      goodsInfo.goodIntro = goodsInfoRes.goodsInfo.specText;

      action.commonChange('main.goodsInfo', goodsInfo);
    },

    /**
     * 是否获取抢购资格定时任务查询
     * @param flashSaleGoodsId
     */
    async getFlashSaleGoodsQualifications(flashSaleGoodsId, flashSaleGoodsNum) {
      let res;
      this.timer = setInterval(async () => {
        if (WMkit.isLogin()) {
          try {
            res = await api.flashSaleController.getFlashSaleGoodsQualifications({
              flashSaleGoodsId: flashSaleGoodsId,
              flashSaleGoodsNum: flashSaleGoodsNum,
            });
            if (res.flashSaleGoodsId != null) {
              Taro.redirectTo({
                url: '/pages/package-C/order/flash-sale-order-confirm/index',
              });
              //暂停定时任务
              clearInterval(this.timer);
            }
          } catch (error) {
            clearInterval(this.timer);
            setTimeout(() => {
              Taro.navigateTo({
                url: '/pages/package-B/flash-sale/spike-home/index',
              });
            }, 1000);
          }
        } else {
          //暂停定时任务
          clearInterval(this.timer);
        }
      }, 1000);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('goodsBuyInMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
