import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    async loadBrandList() {
      const result = await api.goodsBaseController.kaGuanBrandList()
      const goodsBrandVOList = result.goodsBrandVOList || []
      action.commonChange([
        { paths: 'main.brandList', value: goodsBrandVOList },
        { paths: 'main.brandListbak', value: goodsBrandVOList },
      ])
    },

    changeActiveKey(next: string) {
      const main = getData().main
      const key = main.activeKey
      if (key === next) return
      action.commonChange([
        { paths: 'main.activeKey', value: next },
        { paths: 'main.keyword', value: '' },
      ])
      if (next == 'coupon') {
        if (!main.couponList) {
          this.loadCouponList()
        }
      } else {
        this.traceResult('')
      }
    },

    async loadCouponList() {
      const result = await api.goodsBaseController.kaGuanCoupon()
      const list = result.esGoods.content || []
      action.commonChange([
        { paths: 'main.couponList', value: list },
        { paths: 'main.couponListbak', value: list }
      ])
    },

    onSearchInput(keyword: string) {
      action.commonChange('main.keyword', keyword)
      this.traceResult(keyword)
    },
    traceResult(keyword) {
      const { activeKey, couponListbak, brandListbak } = getData().main
      if (activeKey === 'brand') {
        const next = brandListbak.filter(e => !keyword ? true : e.brandName.includes(keyword))
        action.commonChange('main.brandList', next)
      } else {
        const next = couponListbak.filter(e => !keyword ? true : e.goodsInfos[0].goodsInfoName.includes(keyword))
        action.commonChange('main.couponList', next)
      }
    }

  };
  return action;
};


function getData(): any {
  return {
    main: getReducerData('CardsBrand'),
  };
}

//create by moon https://github.com/creasy2010/moon
