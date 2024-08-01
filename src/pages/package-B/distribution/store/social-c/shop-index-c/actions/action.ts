import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import {WMkit, msg} from 'wmkit';
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
    async getLoginInfo(customerId) {
      const res = await api.wechatLoginController.getWeappLoinInfo(customerId);
      if (res.token) {
        // a.设置登陆后token以及登陆信息缓存
        Taro.setStorage({
          key: 'authInfo:token',
          data: res.token,
        });
        Taro.setStorage({
          key: cache.LOGIN_DATA,
          data: res,
        });
        WMkit.setIsDistributor();
        await WMkit.mergePurchase(null);
        // c.登陆成功,跳转拦截前的路由
        Taro.showToast({
          title: '登录成功',
          duration: 2000,
        });
      }
    },
    async purchase(id, num, stock) {
      const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
      if (isLogin) {
        if (num > stock) {
          Taro.showToast({
            title: '库存' + stock,
            duration: 2000,
          });
          return;
        } else {
          if (WMkit.isLoginOrNotOpen()) {
            try {
              await api.purchaseBaseController.add({goodsInfoId: id, goodsNum: 1});
              let res = await api.purchaseBaseController.countGoods();
              console.log('res', res);
              msg.emit('shopCart-C-num', res);
              Taro.showToast({
                title: '加入成功',
                duration: 2000,
              });
            } catch (error) {
              Taro.showToast({
                title: error,
                icon: 'none',
                duration: 2000,
              });
            }
            // if (code == 'K-000000') {
            //   Taro.showToast({
            //     title: '加入成功',
            //     duration: 2000,
            //   });
            //   //更新购物车全局数量
            //   // msg.emit('purchaseNum');
            // } else {
            //   Taro.showToast({
            //     title: message,
            //     duration: 2000,
            //   });
            // }
          } else {
            // if (putPurchase(id, num)) {
            //   //更新购物车全局数量
            //   msg.emit('purchaseNum');
            //   Alert({
            //     text: '加入成功!'
            //   });
            // }
          }
        }
      } else {
        await Taro.navigateTo({url: `/pages/package-A/login/login/index`});
      }
    },
    //退出分享链接到商城首页,并更新邀请人和分销渠道缓存(分销渠道变为商城)
    toMainPageAndClearInviteCache() {
      WMkit.toMainPageAndClearInviteCache();
    },
    async page() {
      let {request, goodsList} = getData().main;
      // 获取customerId
      action.commonChange('main.isLoadingList', true);
      let inviteeId = WMkit.inviteeId();
      const res = await api.goodsInfoBaseController.shopSkuListToC({...request, customerId: inviteeId});
      if (request.pageNum == 0) {
        action.commonChange([{paths: 'main.goodsList', value: (res as any).esGoodsInfoPage.content}]);
      } else {
        action.commonChange([{paths: 'main.goodsList', value: goodsList.concat(res.esGoodsInfoPage.content)}]);
      }
      action.commonChange([{paths: 'main.totalPages', value: (res as any).esGoodsInfoPage.totalPages}]);
      action.commonChange([{paths: 'main.currentPageList', value: (res as any).esGoodsInfoPage.content}]);
      action.commonChange([{paths: 'main.goodsBrands', value: res.brands}]);
      action.commonChange('main.isLoadingList', false);
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {request, totalPages} = getData().main;
      if (request.pageNum + 1 == totalPages) return;
      let num = request.pageNum + 1;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.request.pageNum',
          value: num,
        },
      });
      await this.page();
    },
    /**
     * 选择品牌
     */
    async chooseBrands(brandId) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.request.brandIds',
          value: (brandIds) => {
            //牌品集合里是否存在选择的品牌
            if (brandIds.includes(brandId)) {
              //如果存在就过滤掉 找到对应的下标 然后删除
              let index = brandIds.findIndex((id) => id == brandId);
              brandIds.splice(index, 1);
            } else {
              brandIds.push(brandId);
            }
            return brandIds;
          },
        },
      });
    },
    /**
     * 重置选择的分类
     */

    async resetCates() {
      //重置品牌
      action.commonChange('main.request.brandIds', []);
    },

    /**
     * 提交选择分类并查询列表
     */
    async submitChooseCate() {
      //关闭筛选框
      action.commonChange('main.navToolsObj.screenIsShow', false);
      //查询商品列表
      action.commonChange('main.request.pageNum', 0);
      action.page();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageBDistriButionStoreSocialCShopIndexCMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
