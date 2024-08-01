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
    async _getGoodsInfoDetail(appointmentSaleId, num, skuId) {
      let param = {appointmentSaleId, num, skuId};
      let goodsInfo = {
        goodImage: '',
        goodName: '',
        goodIntro: '',
        goodPrice: '',
        goodStaus: '积极抢购中',
      };
      let result: any = await api.AppointmentSaleBaseController.getAppointmentSaleInfo(param);
      let goodsInfoVO = result.appointmentSaleVO.appointmentSaleGood.goodsInfoVO;
      goodsInfo.goodPrice = goodsInfoVO.marketPrice;
      goodsInfo.goodImage = goodsInfoVO.goodsInfoImg;
      goodsInfo.goodName = goodsInfoVO.goodsInfoName;
      goodsInfo.goodIntro = goodsInfoVO.specText;
      action.commonChange('main.goodsInfo', goodsInfo);
    },

    /**
     * 是否获取抢购资格定时任务查询
     * @param appointmentSaleId
     */
    async getFlashSaleGoodsQualifications(appointmentSaleId, num, skuId) {
      let res;
      this.timer = setInterval(async () => {
        if (WMkit.isLogin()) {
          try {
            res = await api.AppointmentSaleBaseController.getAppointmentSaleGoodsQualifications({
              appointmentSaleId,
              num,
              skuId,
            });
            Taro.navigateTo({
              url: '/pages/package-C/order/order-confirm/index?type=1',
            });
            //暂停定时任务
            clearInterval(this.timer);
          } catch (error) {
            clearInterval(this.timer);
            setTimeout(() => {
              Taro.navigateTo({
                url: `/pages/package-B/goods/goods-details/index?skuId=${skuId}`,
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
