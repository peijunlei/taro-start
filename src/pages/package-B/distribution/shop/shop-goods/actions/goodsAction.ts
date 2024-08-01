import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import goodsBaseController from 'api/GoodsBaseController';
import goodsInfoBaseController from 'api/GoodsInfoBaseController';
import configController from 'api/ConfigController';
import purchaseBaseController from 'api/PurchaseBaseController';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import { WMkit } from 'wmkit';
//更新购物车角标
//加入购物车的商品数量
let cartNum = 0;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     *
     普通条件查询可以走,commonChange
     */
    async modifySearch(
      param,
      options: {
        isQuery: boolean;
        isResetPage: boolean;
      } = {isQuery: true, isResetPage: false},
    ) {
      dispatch({type: Command.modifyRequest, payload: param});
      let {goodsShowType} = getData().main;
      //修改完直接查询;
      if (options.isQuery) {
        await this.query(options.isResetPage);
      }
    },

    /**
     * 查询下一页
     */
    async nextPage() {
      let {request, goodsShowType, loadStatus, goods, total} = getData().main;
      if (goods.length == total) return;
      await action.commonChange('main.isLoadingList', true);
      await action.commonChange('main.delayLoading', false);
      if (loadStatus === 'loading') {
        return;
      } else {
        action.commonChange('main.loadStatus', 'loading');
      }
      // request.pageNum = request.pageNum + 1;
      dispatch({type: Command.modifyRequest, payload: {pageNum: request.pageNum + 1}});

      let token = Taro.getStorageSync('authInfo:token');
      //商品列表查询结果
      let result;
      if (token) {
        //已登录 0:sku列表,1:spu列表
        goodsShowType === 0 ? (result = await this.findSkuGoods()) : (result = await this.findSpuGoods());
      } else {
        //未登录 0:sku列表,1:spu列表
        goodsShowType === 0 ? (result = await this.noLoginSkuFindGoods()) : (result = await this.noLoginSpuFindGoods());
      }

      dispatch({
        type: Command.init,
        payload: {
          main: {
            goods:
              goodsShowType === 0
                ? [...goods, ...result.esGoodsInfoPage.content]
                : [...goods, ...result.esGoods.content], //商品列表
          },
        },
      });
      await action.commonChange('main.isLoadingList', false);
      action.commonChange('main.loadStatus', 'loaded');
      await setTimeout(() => {
        action.commonChange('main.delayLoading', true);
      }, 200);
    },

    /**
     * 以当前查询条件查询
     */
    async query(isResetPage: boolean = false, type?) {
      let {request, isReady} = getData().main;
      if (type != 'refresh') await action.commonChange('main.isLoadingList', true);
      await action.commonChange('main.delayLoading', false);
      //  有关键词 综合sortFlag传null   无关键词 综合sortFlag传0
      if (!request.keywords) {
        action.commonChange('main.request.sortFlag', request.sortFlag ? request.sortFlag : 0);
      } else {
        action.commonChange('main.request.sortFlag', request.sortFlag ? request.sortFlag : null);
      }
      if (isResetPage) {
        await dispatch({type: Command.modifyRequest, payload: {pageNum: 0}});
      }
      //商品列表查询结果
      let result;
      result = await this.findSkuGoods();
      // 品牌，分类和属性，不再重复更新
      //页面加载的第一次查询商品品牌
      if (request.pageNum === 0 && !isReady) {
        //获取商品品牌分类
        action.commonChange([
          {paths: 'main.goodsBrands', value: result.brands},
          {paths: 'main.goodsCates', value: result.cateList},
          {paths: 'main.goodsPropertyVOS', value: result.goodsPropertyVOS},
          {paths: 'main.brandMap', value: result.brandMap || {}},
        ]);
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            total: result.esGoodsInfoPage.totalElements,
            goods: result.esGoodsInfoPage.content, //商品列表
            goodsLabels: result.goodsLabelVOList || [], //商品标签
          },
        },
      });
      await action.commonChange('main.isLoadingList', false);
      await setTimeout(() => {
        action.commonChange('main.delayLoading', true);
      }, 200);
    },

    //分销员添加分销商品
    async addCommodityDistribution(goodsId: string, goodsInfoId: string, storeId: string, index) {
      let form = {
        goodsId: goodsId,
        goodsInfoId: goodsInfoId,
        storeId: storeId,
      };
      const res = await api.distributorGoodsInfoController.add(form);
      if (res) {
        Taro.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 2000,
        });
        action.commonChange(['main', 'goods', index, 'goodsInfo', 'joinDistributior'], 1);
      } else {
        Taro.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000,
        });
      }
    },

    //查询店铺已经添加的分销商品数
    async getCountsByCustomerId(storeId: string) {
      const res = await api.distributorGoodsInfoController.count();
      return res;
    },

    //删除分销商品
    async delCommodityDistribution(goodsInfoId: string, index: number) {
      const res = await api.distributorGoodsInfoController.deleteF({goodsInfoId});
      if (res) {
        Taro.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
        });
        action.commonChange(['main', 'goods', index, 'goodsInfo', 'joinDistributior'], 0);
        // action.query();
      } else {
        Taro.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000,
        });
      }
    },

    /**
     * 商品维度 goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
     */
    async goodsShowType() {
      let retult = await configController.listConfigs();
      return retult;
    },

    /**
     * 未登录时查询spu维度商品
     */
    async noLoginSpuFindGoods() {
      let {request} = getData().main;
      let retult = await goodsBaseController.spuListFront(request);
      return retult;
    },

    /**
     * 登录时查询spu维度商品
     */
    async findSpuGoods() {
      let {request} = getData().main;
      let retult = await goodsBaseController.goodslist(request);
      return retult;
    },

    /**
     * 登录时查询sku维度商品
     */
    async findSkuGoods() {
      let {request} = getData().main;
      let retult = await goodsInfoBaseController.addDistributorGoods(request);
      return retult;
    },

    /**
     * 查询商品分类
     */
    async findGoodsCates() {
      let {
        request: {cateId},
      } = getData().main;
      let goodsCates = await goodsInfoBaseController.listByCateId(cateId);
      goodsCates.forEach((e) => {
        //新增属性集合
        e.detailIds = [];
        //新增是否查看全部分类 默认展示6个
        e.findAllCateType = false;
        //每一个商品属性里增加其它选项
        e.goodsPropDetails.push({detailId: 0, propId: e.propId, detailName: '其它'});
      });
      action.commonChange('main.goodsCates', goodsCates);
    },

    /**
     * 是否查看全部分类
     */
    async findAllCates(propId, type) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.goodsCates',
          value: (goodsCates) => {
            //选中的分类集合
            goodsCates.forEach((e) => {
              if (e.propId == propId) {
                e.findAllCateType = type;
              }
            });
            return goodsCates;
          },
        },
      });
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

    // 批量
    async chooseBrandsBatch(ids) {
      let {request} = getData().main;
      // 合并并去重
      // action.commonChange('main.request.brandIds', [...new Set(request.brandIds.concat(ids))]);
      action.commonChange('main.request.brandIds', ids);
    },

    /**
     * 选择分类
     * @param cateId
     */
    async chooseCates(cateId) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: WMkit.isMall() ? 'main.request.storeCateIds' : 'main.request.cateIds',
          value: (cateIds) => {
            //牌品集合里是否存在选择的品牌
            if (cateIds.includes(cateId)) {
              //如果存在就过滤掉 找到对应的下标 然后删除
              let index = cateIds.findIndex((id) => id == cateId);
              cateIds.splice(index, 1);
            } else {
              cateIds.push(cateId);
            }
            return cateIds;
          },
        },
      });
    },

    /**
     * 选择属性
     */
    async chooseProperty(propId, key) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.request.propDetails',
          value: (propDetails) => {
            // 属性集合里面包含选中的属性值
            if (propDetails.filter((v) => v.propId == propId && v.detailIds?.includes(key)).length > 0) {
              //如果存在就过滤掉 找到对应的下标 然后删除
              let index = propDetails.findIndex((v) => v.detailIds.includes(key));
              let index1 = propDetails[index].detailIds.findIndex((v) => v == key);
              propDetails[index].detailIds.splice(index1, 1);
              // 该项删除
              if (propDetails[index].detailIds.length == 0) {
                propDetails.splice(index, 1);
              }
            } else {
              const index = propDetails.findIndex((v) => v?.propId == propId);
              // 存在该属性
              if (index > -1) {
                propDetails[index].detailIds = propDetails[index].detailIds.concat([key]);
              } else {
                propDetails.push({propId: propId, detailIds: [].concat([key])});
              }
            }
          },
        },
      });
    },

    /**
     * 选择标签
     */
    async chooseLabels(labelId) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.request.labelIds',
          value: (labelIds) => {
            //牌品集合里是否存在选择的品牌
            if (labelIds.includes(labelId)) {
              //如果存在就过滤掉 找到对应的下标 然后删除
              let index = labelIds.findIndex((id) => id == labelId);
              labelIds.splice(index, 1);
            } else {
              labelIds.push(labelId);
            }
            return labelIds;
          },
        },
      });
    },

    /**
     * 选择分类
     */
    async chooseCate(propId, detailId) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.goodsCates',
          value: (goodsCates) => {
            //选中的分类集合
            goodsCates.forEach((e) => {
              //属性集合里是否存在选择的属性
              if (e.detailIds.includes(detailId)) {
                if (e.propId == propId) {
                  //如果存在就过滤掉 找到对应的下标 然后删除
                  let index = e.detailIds.findIndex((id) => id == detailId);
                  e.detailIds.splice(index, 1);
                }
              } else {
                //判断是哪个分类id下的属性
                if (e.propId == propId) {
                  e.detailIds.push(detailId);
                }
              }
            });
            return goodsCates;
          },
        },
      });
    },

    /**
     * 重置选择的分类
     */

    async resetCates() {
      action.commonChange([
        //重置商城服务
        {paths: 'main.request.companyType', value: ''},
        {paths: 'main.request.hideSelectedDistributionGoods', value: false},
        //重置品牌
        {paths: 'main.request.brandIds', value: []},
        // 重置分类
        {paths: 'main.request.cateIds', value: []},
        {paths: 'main.request.storeCateIds', value: []},
        // 重置属性
        {paths: 'main.request.propDetails', value: []},
        //重置标签
        {paths: 'main.request.labelIds', value: []},
      ]);
      //重置商品分类
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.goodsCates',
          value: (goodsCates) => {
            //选中的分类集合
            goodsCates.forEach((e) => {
              e.detailIds = [];
            });
            return goodsCates;
          },
        },
      });
    },

    /**
     * 提交选择分类并查询列表
     */
    async submitChooseCate() {
      action.commonChange([
        //关闭筛选框
        {paths: 'main.navToolsObj.screenIsShow', value: false},
        {paths: 'main.goods', value: []},
      ]);
      //查询商品列表
      action.query(true);
    },

    /**
     * sku直接添加购物车
     */
    async skuAddShopCart(goodsInfoId, count) {
      let token = Taro.getStorageSync('authInfo:token');
      //获取缓存到本地的购物车数据
      let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? Taro.getStorageSync('mini::shopCartSku') : [];
      if (token) {
        try {
          await purchaseBaseController.add({goodsInfoId, goodsNum: count});
          cartNum = cartNum + 1;
        } catch (error) {
          Taro.showToast({
            title: error,
            icon: 'none',
            duration: 2000,
          });
        }
      } else {
        //判断之前当前购买过的商品在购物车中有没有存在，如果存在购买的数量相加 如果不存在 重新增加一条数据
        let index = purchaseData.findIndex((item) => item.goodsInfoId == goodsInfoId);
        if (index > -1) {
          purchaseData[index].goodsNum = count;
        } else {
          purchaseData.push({goodsInfoId, goodsNum: count});
        }
        cartNum = purchaseData.length;
        //存到本地缓存
        Taro.setStorage({
          key: 'mini::shopCartSku',
          data: purchaseData,
        });
      }
      Taro.showToast({
        title: '加入成功',
        icon: 'none',
        duration: 2000,
      });
      //更新购物车角标
      action.commonChange('main.shopCarNum', cartNum);
    },

    /**
     * 查询spu规格
     */
    async findSpuSpecData(skuId) {
      let token = Taro.getStorageSync('authInfo:token');
      let result = null;
      //判断是否登录
      if (token) {
        result = await goodsBaseController.detail(skuId);
      } else {
        result = await goodsBaseController.unLoginDetail(skuId);
      }
      //商品规格里面添加一个默认值
      if (result.goodsSpecs) {
        result.goodsSpecs.forEach((e) => {
          result.goodsInfos[0].mockSpecDetailIds.forEach((id) => {
            if (e.specDetailIds.includes(id)) {
              //默认选中第一个规格值
              e.defaultVal = id;
            }
          });
        });
      }

      //获取商品规格数据
      action.commonChange('main.goodsSpecs', result);
      //打开spu规格弹窗
      await this.openSpecModal(result.goods.saleType);
    },

    /**
     * 打开spu规格弹窗
     */
    async openSpecModal(saleType) {
      if (saleType == 0) {
        //批发规格弹窗
        action.commonChange('main.batchSpecIsShow', true);
      } else {
        //零售规格弹窗
        action.commonChange('main.retailSpecIsShow', true);
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('PackageBDistributionShopShopGoodsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
