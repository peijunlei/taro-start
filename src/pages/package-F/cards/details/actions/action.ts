import { Command } from '../constant';
import Taro from '@tarojs/taro'
import { Dispatch } from 'typings';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import { WMkit } from 'wmkit';
import lodash, { throttle } from 'lodash'
import { _ } from 'wmkit';

let timespan = 0
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    init(params) {
      const { type, id } = params
      this.commonChange('main.type', type);
      this.getGoodsDetail(id)
      if (type === 'coupon') {
        Taro.setNavigationBarTitle({ title: '卡管卡券商品详情页' })
      } else {
        Taro.setNavigationBarTitle({ title: '卡管直冲商品详情页' })
      }
    },

    async getGoodsDetail(id) {
      const token = Taro.getStorageSync('authInfo:token');
      const fn = token ? 'detail' : 'unLoginDetail'
      const result = await api.goodsBaseController[fn](id);
      const p = await api.goodsBaseController.goodsDetailProper(id)
      result.goods.goodsDetail = _.formatRichText(p.goodsDetail)
      result.goods.goodsNotice = _.formatRichText(result.goods.goodsNotice)
      result.goodsInfo = result.goodsInfos.find(e => e.goodsInfoId === id) || result.goodsInfos[0]
      result.goodsInfo.preBuyCount = 1
      const storeInfo = await api.storeBaseController.queryStoreBySkuId({ skuId: id })
      const service = await this.queryService(storeInfo)
      action.commonChange([
        { paths: 'main.goodsInfo', value: result },
        { paths: 'main.storeInfo', value: storeInfo },
        { paths: 'main.enterpriseId', value: service.enterpriseId },
        { paths: 'main.serviceUrl', value: service.serviceUrl },
        { paths: 'main.isServiceOpen', value: service.isServiceOpen },
      ])
      timespan = +new Date()
    },

    async queryService(storeInfo) {
      //查询客服信息
      let type: any = 1;
      let isServiceOpen = false;
      let enterpriseId = '';
      let serviceUrl = '';
      const res = await Promise.all([
        api.qQServiceController.qqDetail(storeInfo.storeId, type),
        api.qQServiceController.weChatDetail(storeInfo.storeId),
      ]);
      if (WMkit.isLogin() && res[0]?.qqOnlineServerRop?.status === 1) {
        isServiceOpen = true;
      }
      if (res[1]?.weChatOnlineServerRop?.status === 1) {
        isServiceOpen = true;
        if (res[1].weChatOnlineServerRop.groupStatus === 0) {
          enterpriseId = res[1].weChatOnlineServerRop.enterpriseId;
          serviceUrl = res[1].weChatOnlineServerRop.serviceUrl;
        }
      }

      return {
        enterpriseId,
        serviceUrl,
        isServiceOpen
      }
    },

    changeSpecDetail: lodash.throttle(async (skuId) => {
      const now = +new Date()
      // 1分时间内，先用缓存
      if (now - timespan < 60 * 1000) {
        const { goodsInfo } = getData().main
        const sku = goodsInfo.goodsInfos.find(e => e.goodsInfoId === skuId)
        action.commonChange('main.goodsInfo', {
          ...goodsInfo,
          goodsInfo: {
            ...sku,
            preBuyCount: 1
          },
        })
      } else {
        await action.getGoodsDetail(skuId)
      }

    }, 250, { leading: true, trailing: false }),

    changeActiveKey: (key: "0" | '1') => {
      const { activeKey, nodeTop } = getData().main
      if (activeKey === key) return
      action.commonChange('main.activeKey', key)
      if (__TARO_ENV === 'h5') {
        const node = document.getElementById("node" + key)
        node.scrollIntoView(true)
      } else {
        action.commonChange('main.scrollIntoView', "#node" + key)
        setTimeout(() => {
          action.commonChange('main.scrollIntoView', undefined)
        }, 100);
      }
    },

    toggleModal: (show) => {
      action.commonChange('main.showModal', show)
    },

    changeNumber: (value: string) => {
      action.commonChange('main.rechargeNumber', value)
    },

    changeBuyCount(count) {
      const main = getData().main
      const goodsInfo = main.goodsInfo
      action.commonChange('main.goodsInfo', {
        ...goodsInfo,
        goodsInfo: {
          ...goodsInfo.goodsInfo,
          preBuyCount: count,
        }
      })
    },

    buy: throttle(async () => {
      try {
        action.toggleModal(false)
        action.commonChange('main.showLoading', true)
        const main = getData().main
        const type = main.type
        if (type === 'zhichong') {
          if (!main.rechargeNumber) {
            Taro.showToast({ title: '请输入充值号码', icon: 'none', duration: 2000 })
            return
          }

          const accountType = main.goodsInfo.goodsInfo.accountType ?? 1
          if (accountType != 0) {
            const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
            const regexQQ = /^[1-9]{1}[0-9]{4,9}$/;
            const reg = accountType == 1 ? regexTel : regexQQ
            if (!reg.test(main.rechargeNumber)) {
              Taro.showToast({ title: `请输入正确的${accountType == 1 ? '手机号' : 'QQ号'}`, icon: 'none', duration: 2000 })
              return
            }
          }
        }
        const goodsInfo = main.goodsInfo.goodsInfo
        await api.tradeBaseController.checkGoods({
          forceConfirm: false,
          tradeMarketingList: [],
          tradeItems: [
            {
              skuId: goodsInfo.goodsInfoId,
              num: goodsInfo.preBuyCount
            }
          ]
        })
        await api.tradeBaseController.immediateBuy({
          kaGuanGoodsCommit: true,
          kaGuanZhiChongNumber: main.rechargeNumber,
          tradeItemRequests: [
            {
              skuId: goodsInfo.goodsInfoId,
              num: goodsInfo.preBuyCount || 1,
              spuId: goodsInfo.goodsId
            }
          ]
        })
        await Taro.navigateTo({ url: '/pages/package-C/order/order-confirm/index?type=1' });
      } catch (e) {
        let message = e?.message;
        message && Taro.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
        });
      } finally {
        action.commonChange('main.showLoading', false)
      }
    }, 300, { leading: true, trailing: false }),
  };
  return action;
};

function getData(): any {
  return {
    main: getReducerData('CardsDetails'),
  };
}

//create by moon https://github.com/creasy2010/moon
