import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import goodsBaseController from 'api/GoodsBaseController';
import goodsInfoBaseController from 'api/GoodsInfoBaseController';
import configController from 'api/ConfigController';
import purchaseBaseController from 'api/PurchaseBaseController';
import tradeBaseController from 'api/TradeBaseController';

import { extraPathsValue } from '@/redux/util';
import * as immerUtil from '@/redux/immer-util';
import Taro from '@tarojs/taro';
import api from 'api';
//更新购物车角标
import { getShopCartNum, WMkit } from 'wmkit';
import { cache } from 'config';
import config from '@/service/config';
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
      } = { isQuery: true, isResetPage: false },
    ) {
      let { loadStatus, goodsShowType } = getData().main;
      if (loadStatus === 'loading') {
        return;
      } else {
        action.commonChange('main.loadStatus', 'loading');
      }
      dispatch({ type: Command.modifyRequest, payload: param });
      //修改完直接查询;
      if (options.isQuery) {
        await this.query(options.isResetPage, goodsShowType);
      }
      action.commonChange([{ paths: 'main.loadStatus', value: 'loaded' }]);
    },

    /**
     * 查询下一页
     */
    async nextPage(force?: boolean) {
      let { request, goodsShowType, loadStatus, totalPages } = getData().main;
      if (request.pageNum + 1 == totalPages) {
        return
      }
      if (loadStatus === 'loading' && !force) {
        return;
      } else {
        await action.commonChange('main.loadStatus', 'loading');
      }
      //商品维度 goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
      //商品列表查询
      await dispatch({ type: Command.modifyRequest, payload: { pageNum: request.pageNum + 1 } });

      await this.query(false, goodsShowType);
    },

    /**
     * 以当前查询条件查询
     */
    async query(isResetPage: boolean = false, goodsShowType, type?) {
      if (!getData().main) return
      let {
        spreadFlag,
        request,
        appointmentSaleVOList,
        bookingSaleVOList,
        isReady,
        fromThirdCate,
      } = getData().main;
      if (type != 'refresh') await action.commonChange('main.loadSkeleton', true);
      //  有关键词 综合sortFlag传null   无关键词 综合sortFlag传0
      if (!request.keywords) {
        action.commonChange('main.request.sortFlag', request.sortFlag ? request.sortFlag : 0);
      } else {
        action.commonChange('main.request.sortFlag', request.sortFlag ? request.sortFlag : null);
      }
      if (isResetPage) {
        await dispatch({ type: Command.modifyRequest, payload: { pageNum: 0 } });
      }
      const pageNum = getData().main.request.pageNum
      const token = Taro.getStorageSync(cache.AUTH_TOKEN);

      //未登录情况下同步购物车数量
      const shopCartSku = Taro.getStorageSync('mini::shopCartSku');
      let countMap = {};
      shopCartSku &&
        shopCartSku.forEach((sku) => {
          countMap[sku.goodsInfoId] = sku.goodsNum + (countMap[sku.goodsInfoId] || 0);
        });
      let skuRequest = countMap && Object.entries(countMap);
      let newShopCartSku = [];
      skuRequest &&
        skuRequest.forEach((sku) => {
          newShopCartSku.push({ goodsInfoId: sku[0], goodsNum: sku[1] });
        });
      if (!token) {
        action.commonChange('main.request.esGoodsInfoDTOList', newShopCartSku || []);
      }

      //商品列表查询结果
      let result;
      try {
        if (token && !spreadFlag) {
          //已登录 0:sku列表,1:spu列表
          result = await this.findSpuGoods();
        } else if (spreadFlag) {
          //action.commonChange无法更改当前request的值，需重新获取
          const request = getData().main.request
          result = await goodsInfoBaseController.addDistributorGoods(request);
        } else {
          //未登录 0:sku列表,1:spu列表
          result = await this.noLoginSpuFindGoods()
        }
      } catch (e) {
        action.commonChange('main.loadSkeleton', false);
        //
      }

      const {
        appointmentSaleVOList: appointmentList = [],
        bookingSaleVOList: bookingList = [],
        esGoods: { content: esGoods = [], totalElements: total, totalPages: esTotalPages } = { content: [], totalElements: 0, totalPages: 0 },
        esGoodsInfoPage: { content: esGoodsInfoPage = [], totalElements, totalPages } = {
          content: [],
          totalElements: 0,
          totalPages: 0,
        },
        brands,
        cateList,
        goodsPropertyVOS,
        brandMap,
      } = result;
      esGoods.forEach((v) => {
        const gs = v.goodsStatus
        if (gs === 5) {
          v.goodsInfos.forEach((v2) => {
            v2.goodsStatus = 5;
            v2.stock = 9999999
          })
        }
      })
      esGoodsInfoPage.forEach((v) => {
        const gs = v.goodsInfo.goodsStatus
        if (gs === 5) {
          v.goodsInfo.stock = 9999999
        }
      })
      const showFlag = goodsShowType === 0 || spreadFlag;
      let goodsPropertyList = goodsPropertyVOS || [];
      if (fromThirdCate && goodsPropertyList?.length > 0) {
        goodsPropertyList = goodsPropertyVOS.sort((a, b) => {
          if (a.sort == 0) {
            return a.propId - b.propId;
          } else {
            return a.sort - b.sort;
          }
        });
      }
      // 品牌，分类和属性，不再重复更新
      //页面加载的第一次查询商品品牌
      let allGoods = []
      let totalPage = 0
      if (!getData().main) return
      const goods = getData().main.goods
      if (pageNum === 0) {
        const newGoods = showFlag ? esGoodsInfoPage : esGoods
        allGoods = newGoods
        totalPage = showFlag ? totalPages : esTotalPages
        action.commonChange([
          { paths: 'main.goodsShowType', value: goodsShowType },
          { paths: 'main.goodsBrands', value: brands||[] },
          { paths: 'main.goodsPropertyVOS', value: goodsPropertyList },
          { paths: 'main.appointmentSaleVOList', value: appointmentList || [] },
          { paths: 'main.bookingSaleVOList', value: bookingList || [] },
          { paths: 'main.goods', value: showFlag ? esGoodsInfoPage : esGoods },
          { paths: 'main.total', value: showFlag ? totalElements : total },
          { paths: 'main.goodsLabels', value: result.goodsLabelVOList || [] },
          { paths: 'main.totalPages', value: totalPage },
          { paths: 'main.goodsCates', value: cateList },
          { paths: 'main.brandMap', value: brandMap || {} },
        ]);
      } else {
        const newGoods = showFlag ? [...goods, ...esGoodsInfoPage] : [...goods, ...esGoods]
        allGoods = newGoods
        totalPage = showFlag ? totalPages : esTotalPages
        action.commonChange([
          {
            paths: 'main.appointmentSaleVOList',
            value: appointmentList ? [...appointmentSaleVOList, ...appointmentList] : [...appointmentSaleVOList],
          },
          {
            paths: 'main.bookingSaleVOList',
            value: bookingList ? [...bookingSaleVOList, ...bookingList] : [...bookingSaleVOList],
          },
          { paths: 'main.total', value: showFlag ? totalElements : total },
          { paths: 'main.goods', value: newGoods },
          { paths: 'main.totalPages', value: totalPage },
          { paths: 'main.goodsLabels', value: result.goodsLabelVOList || [] },
        ]);
      }
      // const purchaseData = Taro.getStorageSync('mini::shopCartSku') || [];
      //更新购物车角标
      if (token) {
        getShopCartNum().then((num) => {
          action.commonChange('main.shopCarNum', num);
        });
      } else {
        action.commonChange('main.shopCarNum', newShopCartSku.length);
      }

      if (allGoods.length < 5 && totalPage !== 0 && pageNum + 1 < totalPage) {
        this.nextPage(true)
        return
      }
      action.commonChange([
        { paths: 'main.loadSkeleton', value: false },
        { paths: 'main.loadStatus', value: 'loaded' },
        { paths: 'main.isReady', value: true },
      ]);

    },
    async commonFetch(url: string) {
      let { request } = getData().main;
      let host = `${WMkit.prefixUrl(config.host)}`;
      let contentType = 'application/json; charset=utf-8';
      let token = { data: '' };
      token.data = Taro.getStorageSync('authInfo:token') || Taro.getStorageSync(cache.ACCOUNT_TOKEN);
      const channelType = WMkit.channelType() ? WMkit.channelType() : '1';
      const distributeChannel = {
        channelType: parseInt(channelType),
        inviteeId: WMkit.inviteeId() || null,
      };
      const header = {
        'Content-Type': contentType,
        terminal: __TARO_ENV == 'h5' ? 'H5' : 'MINIPROGRAM',
        Authorization: 'Bearer ' + token.data || '', //SSO登录信息校验，必传
        'distribute-channel': JSON.stringify(distributeChannel),
      };
      // let retult = await goodsBaseController.goodslist(await this._dealRequestParam(request));
      const data = await this._dealRequestParam(request)
      const requestTask = Taro.request({
        url: host + url,
        data,
        header,
        method: 'POST',
      })
      action.commonChange('main.requestTask', requestTask);
      const res = await requestTask
      return res.data.context
    },
    /**
     * 查询渠道商品配置
     */
    async findChannelGoodsConfig(id: string) {
      let retult = await configController.findChannelGoodsConfig(id) as any
      Taro.setNavigationBarTitle({
        title: retult?.goodsChannelActivityVO.goodsChannelActivityName
      })
      const list = [{ id: 0, picUrl: null, cateName: '全部' }]
      action.commonChange('main.cateItems', list.concat(retult?.goodsChannelActivityVO.channelCateList));

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
      let retult = await action.commonFetch('/goods/spuListFront')
      return retult;
    },

    /**
     * 登录时查询spu维度商品
     */
    async findSpuGoods() {
      let retult = await action.commonFetch('/goods/spus')
      return retult;
    },

    /**
     * 未登录时查询sku维度商品
     */
    async noLoginSkuFindGoods() {
      // let retult = await goodsInfoBaseController.skuListFront(await this._dealRequestParam(request));
      let retult = await action.commonFetch('/goods/skuListFront')
      return retult;
    },

    /**
     * 登录时查询sku维度商品
     */
    async findSkuGoods() {
      // let retult = await goodsInfoBaseController.list(await this._dealRequestParam(request));
      let retult = await action.commonFetch('/goods/skus')
      return retult;
    },

    /**
     * 查询商品分类
     */
    async findGoodsCates() {
      let {
        request: { cateId },
      } = getData().main;
      let goodsCates = await goodsInfoBaseController.listByCateId(cateId);
      goodsCates.forEach((e) => {
        //新增属性集合
        e.detailIds = [];
        //新增是否查看全部分类 默认展示6个
        e.findAllCateType = false;
        //每一个商品属性里增加其它选项
        e.goodsPropDetails.push({ detailId: 0, propId: e.propId, detailName: '其它' });
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
      let { request } = getData().main;
      // 合并并去重
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
      dispatch({
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
                propDetails.push({ propId: propId, detailIds: [].concat([key]) });
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
     * 选择尺寸
     */
    async chooseSizes(labelId) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.request.specNameList',
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
      //重置商城服务
      action.commonChange('main.request.companyType', '');
      action.commonChange('main.request.distributionGoodsAudit', '');
      action.commonChange('main.request.enterPriseGoodsStatus', '');
      action.commonChange('main.request.pointsUsageFlag', '');
      //重置品牌
      action.commonChange('main.request.brandIds', []);
      // 重置分类
      action.commonChange('main.request.cateIds', []);
      action.commonChange('main.request.storeCateIds', []);
      // 重置属性
      action.commonChange('main.request.propDetails', []);
      //重置标签
      action.commonChange('main.request.labelIds', []);
      //重置尺寸
      action.commonChange('main.request.specNameList', []);
      // 只看分享赚置灰
      action.commonChange('main.request.distributionGoodsStatus', '');
    },

    /**
     * 提交选择分类并查询列表
     */
    async submitChooseCate() {
      let { goodsCates, goodsShowType, loadStatus } = getData().main;
      if (loadStatus === 'loading') {
        return;
      } else {
        action.commonChange('main.loadStatus', 'loading');
      }
      action.commonChange('main.request.cateId', '');
      //关闭筛选框
      action.commonChange('main.navToolsObj.screenIsShow', false);
      action.commonChange('main.goods', []);
      //查询商品列表
      await action.query(true, goodsShowType);
      action.commonChange('main.loadStatus', 'loaded');
    },

    /**
     * sku直接添加购物车
     */
    async skuAddShopCart(goodsInfoId, count, flag?) {
      let token = Taro.getStorageSync('authInfo:token');
      //获取缓存到本地的购物车数据
      let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? Taro.getStorageSync('mini::shopCartSku') : [];
      if (token) {
        try {
          if (count == 0) {
            await purchaseBaseController.delete_({ goodsInfoIds: [goodsInfoId] });
          } else {
            if (flag == false) {
              const res = await purchaseBaseController.info({ goodsInfoIds: [goodsInfoId] });
              if (res && res.goodsInfos) {
                let list = res.goodsInfos.filter((item) => {
                  return item.goodsInfoId == goodsInfoId;
                });
                if (list.length > 0) {
                  let goodsNum = list[0].buyCount - 1;
                  await purchaseBaseController.edit({ goodsInfoId, goodsNum: goodsNum });
                }
              }
            } else if (flag == undefined) {
              await purchaseBaseController.add({ goodsInfoId, goodsNum: count });
            } else {
              await purchaseBaseController.add({ goodsInfoId, goodsNum: 1 });
            }
          }
          cartNum = await getShopCartNum();
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
          if (count == 0) {
            purchaseData.splice(index, 1);
          } else {
            purchaseData[index].goodsNum = count;
          }
        } else {
          purchaseData.push({ goodsInfoId, goodsNum: count });
        }
        // 重复的sku，数量相加
        let countMap = {};
        purchaseData &&
          purchaseData.forEach((sku) => {
            countMap[sku.goodsInfoId] = sku.goodsNum + (countMap[sku.goodsInfoId] || 0);
          });
        let skuRequest = countMap && Object.entries(countMap);
        let newShopCartSku = [];
        skuRequest &&
          skuRequest.forEach((sku) => {
            newShopCartSku.push({ goodsInfoId: sku[0], goodsNum: sku[1] });
          });
        cartNum = newShopCartSku.length;
        //存到本地缓存
        Taro.setStorage({
          key: 'mini::shopCartSku',
          data: newShopCartSku,
        });
      }
      // Taro.showToast({
      //   title: '加入成功',
      //   icon: 'none',
      //   duration: 2000,
      // });
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
      // 20240118 商品列表展示的是价格最低的sku规格，但是弹窗默认选中的规格默认第一个，没有对应上做修改。
      if (result.goodsSpecs) {
        result.goodsSpecs.forEach((e) => {
          let goodsInfo = result.goodsInfos.find(item => item.goodsInfoId === skuId)
          // 20240305 商品列表展示的是价格最低的sku规格，但是此sku规格失效在详情接口中被过滤，逻辑处理参考商品详情。
          if (!goodsInfo) {
            goodsInfo = result.goodsInfos.find((item) => {
              return item.addedFlag === 1;
            });
          }
          if (goodsInfo) {
            goodsInfo.mockSpecDetailIds.forEach((id) => {
              if (e.specDetailIds.includes(id)) {
                //默认选中第一个规格值
                e.defaultVal = id;
              }
            });
          }
          // result.goodsInfos[0].mockSpecDetailIds.forEach((id) => {
          //   if (e.specDetailIds.includes(id)) {
          //     //默认选中第一个规格值
          //     e.defaultVal = id;
          //   }
          // });
        });
      }
      const goodsStatus = result.goods.goodsStatus
      result.goodsInfos.forEach(v => {
        if (goodsStatus === 5) {
          v.goodsStatus = goodsStatus
          v.stock = 9999999
        }
      })
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

    //加入购物车
    async _addCart(buyGoodsInfos) {
      //如果已经登录
      await purchaseBaseController.batchAdd({ goodsInfos: buyGoodsInfos });
      let num = await getShopCartNum();
      await action.commonChange('main.shopCarNum', num);
    },

    /**
     * 立刻抢购
     */
    async rushToBuyingFlashSaleGoodsInfo(flashSaleGoodsId, selectdGoodsInfoId, num) {
      if (WMkit.isLogin()) {
        Taro.navigateTo({
          url: `/pages/package-C/order/flash-sale-order-confirm/index?flashSaleGoodsId=${flashSaleGoodsId}&selectdGoodsInfoId=${selectdGoodsInfoId}&num=${num}`,
        });
      } else {
        //显示登录弹框
        Taro.navigateTo({
          url: `/pages/package-A/login/login/index?`,
        });
      }
    },

    /**
     *  立即购买
     * @param buyGoodsInfos
     */
    async _didConfirm(buyGoodsInfos) {
      try {
        let skuList = [];
        buyGoodsInfos.forEach((item) => {
          skuList.push({
            skuId: item.goodsInfoId,
            num: item.buyCount,
          });
        });

        //立即购买校验前置
        await tradeBaseController.checkGoods({
          tradeItems: skuList,
          tradeMarketingList: [],
          forceConfirm: false,
        });

        //修复立即购买之前加入购物车操作
        await tradeBaseController.immediateBuy({
          tradeItemRequests: skuList,
        });

        await Taro.navigateTo({ url: '/pages/package-C/order/order-confirm/index?type=1' });
      } catch (e) {
        if (e.code == 'K-180001') {
          Taro.showToast({
            title: '您没有预约购买资格',
            icon: 'none',
            duration: 2000,
          });
          return;
        }

        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
      }
    },

    /**
     * 店铺分类选择标签时不传递名称查询
     * @param param
     */
    _dealRequestParam(param) {
      const chooseCity = Taro.getStorageSync(cache.CACHE_POSITION_CITY);
      let enterpriseId = null
      if(__TARO_ENV==='h5'){
        enterpriseId = sessionStorage.getItem(cache.CHANNEL_ENTERPRISE_ID)||null
      }
      const requestParam = { cateAggFlag: true, areaId: chooseCity.addrId,enterpriseId };
      immerUtil.assign(requestParam, param);
      const { storeCateIds } = requestParam;
      if (storeCateIds && storeCateIds.length > 0) {
        requestParam.keywords = '';
      }
      return requestParam;
    },

    // 获取 - 购物车商品数量
    _getShopCartNum(num) {
      this.commonChange('main.shopCarNum', num || 0);
    },

    /**
     * 查询仅看有货开关，当后台仅看有货开关关闭时，筛选面板上显示“仅看有货”选项
     * @returns {Promise<void>}
     */
    async findOnlyHasStock() {
      let outOfStockFlag = await goodsBaseController.findGoodsOutOfStockFlag();

      this.commonChange('main.outOfStockFlag', outOfStockFlag.outOfStockShow);
    },
    /**
     * 选择仅看有货
     */
    chooseOutOfStock(stockShow) {
      action.commonChange([
        {
          paths: 'main.request.stockFlag',
          value: stockShow,
        },
        {
          paths: 'main.request.isOutOfStockShow',
          value: stockShow,
        },
      ]);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('channelGoodsListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
