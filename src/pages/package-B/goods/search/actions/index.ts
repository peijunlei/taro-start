import {ifLogin} from '@/utils/common-functions';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import Action, {getData} from './action';
import {handleUrl} from 'wmkit';
import packageAGoodsSearchMain from '../reducers/main';
import SearchHistoryBaseController from 'api/SearchHistoryBaseController';
import StoreHistoryBaseController from 'api/StoreHistoryBaseController';
import PopularSearchController from 'api/popular-search-terms-query-controller';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(key, keywords) {
      await actions.loadReducer();
      await actions.action.commonChange('main.isLoadingFlag', true);
      if (key) {
        await actions.action.commonChange('main.key', key);
      }

      if (getData()?.main?.key == 'goods') {
        await actions.action.setPrewords();
        await this.getHotHistory();
      }

      if (key == 'distributeGoods') {
        await actions.action.commonChange('main.preKeywords', '');
      }
      if (keywords) {
        await actions.action.commonChange('main.keywords', decodeURI(keywords));
      }

      await this.getHistory();
      await actions.action.commonChange('main.isLoadingFlag', false);
    },

    async getHistory() {
      const key = getData()?.main?.key;
      let history = [];
      if (!ifLogin()) {
        if (key == 'goods') {
          actions.action.commonChange('main.history', Taro.getStorageSync('historyKeyList'));
        } else if (key == 'supplier') {
          actions.action.commonChange('main.history', Taro.getStorageSync('historyStoreKeyList'));
        }
        return;
      }

      //goodsSocial 为 分销员小店主页跳转过来的
      if (key === 'goods' || key === 'goodsSocial') {
        history = await SearchHistoryBaseController.query();
      } else if (key === 'supplier') {
        history = await StoreHistoryBaseController.query();
      } else if (key === 'distribute') {
        history = await SearchHistoryBaseController.queryDistribute();
      } else if (key === 'groupon') {
        history = await SearchHistoryBaseController.queryGrouponHistory();
      } else if (key === 'distributeGoods') {
        history = await SearchHistoryBaseController.queryDistributeGoodsHistory();
      }
      actions.action.commonChange('main.history', history.reverse());
    },

    async getHotHistory() {
      const result = await PopularSearchController.listPopularSearchTerms();
      actions.action.commonChange('main.hotHistory', result.popularSearchTermsVO);
    },

    async addHistory(keyword) {
      if (!ifLogin()) {
        return;
      }
      if (!keyword) {
        return;
      }
      const key = getData().main.key;
      const param = {keyword};
      if (key === 'goods' || key === 'goodsSocial') {
        await SearchHistoryBaseController.add(param);
      } else if (key === 'supplier') {
        await StoreHistoryBaseController.add(param);
      } else if (key === 'distribute') {
        await SearchHistoryBaseController.addDistribute(param);
      } else if (key === 'groupon') {
        await SearchHistoryBaseController.addGrouponHistory(param);
      } else if (key === 'distributeGoods') {
        await SearchHistoryBaseController.addDistributeGoodsHistory(param);
      }
    },

    async clearHistory() {
      const key = getData().main.key;
      if (!ifLogin()) {
        if (key == 'goods') {
          Taro.setStorageSync('historyKeyList', []);
          actions.action.commonChange('main.history', []);
        } else if (key == 'supplier') {
          Taro.setStorageSync('historyStoreKeyList', []);
          actions.action.commonChange('main.history', []);
        }
        return;
      }

      if (key === 'goods' || key === 'goodsSocial') {
        await SearchHistoryBaseController.delete_();
      } else if (key === 'supplier') {
        await StoreHistoryBaseController.delete_();
      } else if (key === 'distribute') {
        await SearchHistoryBaseController.deleteDistribute_();
      } else if (key === 'groupon') {
        await SearchHistoryBaseController.deleteGrouponHistory_();
      } else if (key === 'distributeGoods') {
        await SearchHistoryBaseController.clearDistributeGoodsHistory_();
      }
      actions.action.commonChange('main.history', []);
    },

    async search(relatedLandingPage?) {
      let {key = '', keywords = '', preKeywords = ''} = getData().main;
      keywords = keywords.trim(); //去除前后空格
      let skuId = '';
      PopularSearchController.addKeywords(keywords);
      //如果热门搜索设置了落地页则执行
      if (relatedLandingPage) {
        handleUrl(JSON.parse(relatedLandingPage.replace(/\'/g, '\\"').replace(/\\/g, '')));
      } else {
        actions.action.commonChange('main.keywords', '');
        if (keywords && ifLogin()) {
          actions.addHistory(keywords);
        }
        //未登录时保存搜索记录
        if (keywords && !ifLogin() && key === 'goods') {
          let historyKeyList = Taro.getStorageSync('historyKeyList') || [];
          historyKeyList.unshift(keywords);
          Taro.setStorageSync('historyKeyList', Array.from(new Set(historyKeyList)));
        }
        if (keywords && !ifLogin() && key === 'supplier') {
          let historyKeyList = Taro.getStorageSync('historyStoreKeyList') || [];
          historyKeyList.unshift(keywords);
          Taro.setStorageSync('historyStoreKeyList', Array.from(new Set(historyKeyList)));
          console.log('Taro.getStorageSync', Taro.getStorageSync('historyStoreKeyList'));
        }
        let url = '';
        keywords = keywords?.replace('%', encodeURI('%'));
        if (key === 'goods') {
          if (skuId) {
            url = `/pages/package-B/goods/goods-details/index?skuId=${skuId}`;
          } else {
            if (!keywords && preKeywords) {
              url = `/pages/package-B/goods/goods-list/index?keywords=${preKeywords}`;
            } else {
              url = `/pages/package-B/goods/goods-list/index?keywords=${keywords}`;
            }
          }
        } else if (key === 'supplier') {
          url = `/pages/package-A/store/store-list/index?keywords=${keywords}`;
        } else if (key === 'distribute') {
          //跳转分销员选品页面
          url = `/pages/package-B/distribution/shop/shop-goods/index?keywords=${keywords}`;
        } else if (key === 'distributeGoods') {
          url = `/pages/package-B/goods/goods-list/index?spreadFlag=${true}&keywords=${keywords}`;
        } else if (key === 'goodsSocial') {
          url = `/pages/package-B/distribution/store/social-c/shop-index-c/index?keywords=${keywords}`;
        } else if (key === 'groupon') {
          url = `/pages/package-B/groupon/groupon-search-list/index?keywords=${keywords}`;
        }
        Taro.redirectTo({
          url,
        });
      }
    },

    /**
     * 重置
     */
    async clean() {
      actions.action.commonChange('main.keywords', '');
      actions.action.commonChange('main.preKeywords', '');
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageAGoodsSearchMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageAGoodsSearchMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
