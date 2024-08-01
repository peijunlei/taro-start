import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {VAS} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    changeIndex(index) {
      this.commonChange('main.index', index);
    },

    // 分类初始化数据 - 处理操作
    async _initOtherHandle(cateId, cateList, _this = 'content', index?) {
      const token = Taro.getStorageSync('authInfo:token');
      const initIndex = typeof index === 'undefined' ? getData().main.index : index;
      const _index = typeof initIndex === 'undefined' ? (!token ? 0 : -1) : initIndex;
      // 智能推荐 - 为你推荐
      cateList = await this._addRecommendMenu(cateList, _this, _index);
      // 过滤掉默认分类
      cateList = cateList.filter((cate) => cate.isDefault === 'NO');
      this.commonChange('main.cateList', cateList);

      //如果传入catId则计算index
      if (cateId == undefined) return;
      let cateFilter = (cate) => {
        if (cate.get('cateId') == cateId) return true;
        if (cate.get('goodsCateList').size != 0 && cate.get('goodsCateList').filter(cateFilter).size != 0) return true;
        return false;
      };
      for (let i = 0; i < cateList.length; i++) {
        if (cateFilter(cateList.i)) {
          this.commonChange('main.index', i);
          break;
        }
      }
    },

    // 分类页推荐频道坑位开启时展示该菜单
    // 登录前，不展示该一级菜单
    async _addRecommendMenu(data, _this, index = -1) {
      let recommendSwitch = await VAS.checkRecommendAuth();
      let _index = typeof index === 'undefined' ? getData().main.index : index;
      let _data = data || [];
      const token = Taro.getStorageSync('authInfo:token');
      if (!token || !recommendSwitch) {
        if (!Array.isArray(_data)) {
          this.changeIndex(_index);
          return data;
        }
        // 判断是否存在 “为你推荐“ 菜单
        const bol = _data.some((item) => item.cateId == -1);
        if (bol) {
          --_index;
        }
        this.changeIndex(!bol && _index == -1 ? 0 : _index);
        _data = _data.filter((item) => item.cateId != -1);
        return _data;
      }
      const {isOpen, title} = (await this._queryOpenStatus()) || {};
      try {
        // 判断是否存在 “为你推荐“ 菜单
        const bol = _data.some((item) => item.cateId == -1);

        // 坑位关闭
        if (!isOpen) {
          if (bol && _index > 0) {
            --_index;
          } else {
            _index = _index == -1 ? 0 : _index;
          }
          _data = _data.filter((item) => item.cateId != -1);
        } else {
          // 坑位开启
          const arr = await this._getRecommendCatesOrBrands(_this);
          const hasData = arr?.goodsCateList.some((item) => item.goodsCateList.length > 0);
          //如果坑位无数据 则不展示坑位
          if (!hasData) {
            if (['menu'].includes(_this)) this.changeIndex(_index);
            return data;
          }
          arr['cateName'] = title || '为你推荐';
          if (!bol) {
            _data.unshift(arr);
            if ((token && index == -1) || (!token && index == 0)) {
              ++_index;
            }
          } else {
            _data[0] = arr;
          }
        }
        this.changeIndex(_index);
        return _data;
      } catch (error) {
        // 当接口报错时，不影响菜单正常切换
        this.changeIndex(index || 0);
        console.log(error);
      }
      return _data;
    },

    // 获取为你推荐 - 推荐分类 / 推荐品牌
    async _getRecommendCatesOrBrands(_this) {
      if (['menu'].includes(_this)) {
        return this._handleRecommendCatesOrBrandsData() || {};
      }

      // type坑位类型：0-购物车，1-商品详情，2-商品列表，3-个人中心，4-会员中心，5-收藏商品，6-支付成功页，7-分类页，8-魔方，9-分类页推荐频道坑位
      // recommendType推荐类型：商品为0，类目为1
      const token = Taro.getStorageSync('authInfo:token');
      const key = token ? 'goodsRecommendList' : 'goodsRecommendListForUnLogin';
      const context = (await api.intelligentRecommendationController[key]({type: '9', recommendType: 1})) || {};

      try {
        let {goodsCateVOList, goodsBrandVOList, recommendPositionConfigurationVO} = context || {};
        goodsCateVOList = goodsCateVOList || [];
        goodsBrandVOList = goodsBrandVOList || [];
        this.commonChange('main.recommendConfig', recommendPositionConfigurationVO || {});
        return this._handleRecommendCatesOrBrandsData(goodsCateVOList, goodsBrandVOList) || {};
      } catch (error) {
        console.log(error);
      }
    },

    // 处理 推荐分类 / 推荐品牌 数据结构
    _handleRecommendCatesOrBrandsData(cates = [], brands = []) {
      const data = {
        cateId: -1,
        cateName: '-',
        isDefault: 'NO',
        goodsCateList: [
          {
            cateId: 1,
            cateName: '推荐分类',
            isDefault: 'NO',
            goodsCateList: [],
          },
          {
            brandId: 2,
            brandName: '推荐品牌',
            isDefault: 'NO',
            goodsCateList: [],
          },
        ],
      };

      cates.forEach((item) => {
        data.goodsCateList[0].goodsCateList.push({...item, goodsCateList: []});
      });

      brands.forEach((item) => {
        data.goodsCateList[1].goodsCateList.push({...item, goodsCateList: []});
      });

      return data;
    },

    // 埋点
    async _clickCates(params = {}) {
      // type坑位类型：0-购物车，1-商品详情，2-商品列表，3-个人中心，4-会员中心，5-收藏商品，6-支付成功页，7-分类页，8-魔方，9-分类页推荐频道坑位
      const {recommendConfig} = getData().main || {};
      await api.intelligentRecommendationController.clickGoods({
        ...params,
        // 0-热门，1-相关性
        recommendType: recommendConfig.tacticsType,
        type: '9',
      });
    },

    async _queryOpenStatus() {
      const context = await api.intelligentRecommendationController.queryOpenStatus();
      return context;
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageAGoodsAllListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
