import { Dispatch } from 'typings';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { _, msg, WMkit, immutable } from 'wmkit';
import { extraPathsValue } from '@/redux/util';
import { MarketingViewVO2, PurchaseListResponse, PurchaseMarketingCalcVO2 } from 'api/PurchaseBaseController';
import lo from 'lodash';
import Taro from '@tarojs/taro';
import { Decimal } from 'decimal.js';

import { Command } from '../constant';
import { IAllReducerProps } from '../types';
import actions from './index';
import { logout } from '@/wmkit/common/util';
import { cache } from 'config';

export default (dispatch: Dispatch) => {
  let action = {
    async loadingWML(type) {
      await action.commonChange('main.isLoading', type);
    },
    async pageInit() {
      let purInfo: any = { goodsInfos: [] },
        isEmpty = false;
      if (WMkit.isLogin()) {
        const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
        // 登录情况
        const {
          main: { defaltAddress },
        } = getData();
        let areaId = null;
        let address = null;
        const customerId = loginData.customerId;
        const deliveryAddressId = defaltAddress.deliveryAddressId;
        if (defaltAddress) {
          areaId = defaltAddress.areaId;
          address = {
            provinceId: defaltAddress.provinceId,
            cityId: defaltAddress.cityId,
            areaId: defaltAddress.areaId,
            streetId: defaltAddress.streetId,
            customerId,
            deliveryAddressId
          };
        }
        try {
          const results = await Promise.all([
            api.purchaseBaseController.purchaseInfo({ areaId: areaId, address: address }),
            api.purchaseBaseController.getStoreCouponExist(),
          ]);
          purInfo = results[0];
          purInfo.storeCouponMap = results[1].map;
          purInfo.selfBuying = WMkit.isDistributorLogin();
          purInfo = action.calcMarketingAndPrice(purInfo);
          isEmpty = purInfo.goodsInfos.length === 0;
        } catch (e) {
          if (e.code === 'K-999995') {
            WMkit.clearLoginCache();
            isEmpty = true;
            // Taro.showModal({
            //   content: '暂无访问商城权限，请退出后重新登录！',
            //   showCancel: false,
            //   success: function (res) {
            //     if (res.confirm) {
            //       logout();
            //     }
            //   },
            // });
          }
        }
      } else {
        // 未登录情况
        const localSku = Taro.getStorageSync('mini::shopCartSku');
        isEmpty = localSku === '' || localSku.length === 0;
        if (!isEmpty) {
          Taro.setStorageSync('mini:shopCartSkuCopy', localSku || []);
          purInfo = await api.purchaseBaseController.frontPurchaseInfo({
            goodsInfoIds: localSku.map((i) => i.goodsInfoId),
          });
          let countMap = {};
          localSku.forEach((sku) => (countMap[sku.goodsInfoId] = sku.goodsNum));
          purInfo.goodsInfos.forEach((goodsInfo) => (goodsInfo.buyCount = countMap[goodsInfo.goodsInfoId]));
          purInfo = action.calcMarketingAndPrice(purInfo);
        }
        // await action._setNewLocalSks(purInfo.goodsInfos);
        // await action._setNewLocalMarketing(purInfo.goodsMarketings);
      }

      //判断选中的sku是否还存在
      let checkSku = action._filterCheckSku(purInfo, getData().main.goods.checkSku);
      let goodsInfoIds = [];
      purInfo.goodsInfos.forEach((goodsInfo) => {
        goodsInfoIds.push(goodsInfo.goodsInfoId);
        if (goodsInfo.goodsStatus === 5) {
          goodsInfo.stock = 9999999
        }
        if (goodsInfo.grossMargin < 0) {
          goodsInfo.goodsStatus = 4
        }
      });
      let flag = goodsInfoIds.some((id) => {
        return checkSku.includes(id);
      });
      if (!flag) {
        action.commonChange('main.goods.checkSku', []);
      }

      let relationGoodsIdList = [];
      // 以店铺为维度进行分页
      let totalSkuMap =
        purInfo.stores &&
        purInfo.stores.reduce((totalMap, store, index) => {
          let total = 0;
          let storeGoodsIds = store.goodsIds;
          let storeSkuNum = storeGoodsIds.reduce((pre, cur) => {
            purInfo.goodses.map((se) => {
              // 找出每个店铺各个spu下面有效的SKU，计算出长度
              if (se.goodsId == cur) {
                const skuItems = purInfo.goodsInfos.filter(
                  (sku) => se.goodsInfoIds.includes(sku.goodsInfoId) && sku.goodsStatus !== 2,
                );
                pre.set(se.goodsId, skuItems.length);
              }
            });
            return pre;
          }, new Map());
          for (let value of storeSkuNum.values()) {
            total = total + value;
          }
          totalMap.set(index, total);
          return totalMap;
        }, new Map());
      // 分页处理
      let result = totalSkuMap && skuPagination(totalSkuMap);
      if (result && result.get(result.size)?.index == result.get(result.size - 1)?.index) {
        result.delete(result.size);
      }
      result && formatArea(result);
      try {
        const { goodses } = purInfo || {};
        if (Array.isArray(goodses)) {
          relationGoodsIdList = goodses.map((item) => item.goodsId) || [];
        }
      } catch (error) {
        console.log(error);
      }

      if (isEmpty) {
        this.commonChange('main.pageIndex', Math.random() * 0.01);
      }

      action._markettingInit(purInfo);
      action.commonChange([
        { paths: 'main.isLoading', value: false },
        { paths: 'main.purInfo', value: purInfo },
        { paths: 'main.useStatus.isEmpty', value: isEmpty },
        { paths: 'main.isReady', value: true },
        { paths: 'main.customerInfo', value: { pointsAvailable: purInfo.pointsAvailable } },
        { paths: 'main.goods.checkSku', value: checkSku },
        // 分页信息
        { paths: 'main.pageArea', value: result },
        { paths: 'main.relationGoodsIdList', value: relationGoodsIdList },
      ]);
      //
      const goodsIdList = purInfo.goodsInfos.map((el) => el.goodsId);
      const skuNos = purInfo.goodsInfos.filter((el) => el.goodsType === 8).map((el) => el.goodsInfoNo);
      //
      Promise.all([action.getRestrictedGoodsList(goodsIdList), action.getDangaossRestrictedGoodsList(skuNos)]).then((result) => {
        const restrictedGoodsList = result[0];
        const dangaossRestrictedGoodsList = result[1];
        const goodsInfos = getData().main.purInfo.goodsInfos;
        // sku维度 设置是否可售的标识
        const newData = goodsInfos.map((item) => {
          const restrictedFlag = restrictedGoodsList.find((i) => i.goodsId === item.goodsId)?.restrictedFlag;
          const dangaossRestrictedFlag = dangaossRestrictedGoodsList.find((i) => i.skuNo === item.goodsInfoNo)?.restrictedFlag;
          const flag = restrictedFlag || dangaossRestrictedFlag;
          return {
            ...item,
            restrictedFlag: flag,
            goodsStatus: flag ? 99 : item.goodsStatus,
          }
        });
        action.commonChange('main.purInfo.goodsInfos', newData);
      })
    },
    //获取限售的商品
    async getRestrictedGoodsList(goodsIdList: any[]) {
      const {
        defaltAddress,
      } = getData().main;
      const res = await api.tradeBaseController.getRestrictedByGoodsIds({
        goodsIdList,
        consigneeId: defaltAddress.deliveryAddressId,
      });
      const list = res?.goodsRestrictedTemplateVOList || [];
      return list;
    },
    //获取蛋糕叔叔限售的商品
    async getDangaossRestrictedGoodsList(skuNos: any[]) {
      const {
        defaltAddress,
      } = getData().main;
      if (skuNos.length === 0) return [];
      const res = await api.tradeBaseController.getShopCartDangaossRestrictedGoods({
        skuNos,
        dangaossAddrId: defaltAddress.dangaossAddrId,
        platformAddrIds: [
          defaltAddress.provinceId,
          defaltAddress.cityId,
          defaltAddress.areaId,
          defaltAddress.streetId
        ]
      });
      const list = res || [];
      return list;
    },
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 计算满足的营销、价格
     */
    calcMarketingAndPrice(purInfo: PurchaseListResponse) {
      // 计算storeMarketingMap
      // 按店铺分组商品，根据商品营销计算店铺下的营销(先计算出营销、再计算营销相关信息)
      let discountPrice = 0;
      let storeMarketingMap = {};
      purInfo.goodsInfos.forEach((item) => {
        if (item.priceType === 1) {
          item.salePrice = action._calculateGoodsPrice(item, purInfo.goodsIntervalPrices);
        }
      });
      let storeGoodsInfos = lo.groupBy(purInfo.goodsInfos, 'storeId');
      const storeGoodses = lo.groupBy(purInfo.goodses, 'storeId');
      const mainData = getData().main;
      const checkSku: string[] = action._filterCheckSku(purInfo, mainData.goods.checkSku);
      let selectedMarketingGifts: any[] = mainData.goods.selectedMarketingGifts;
      Object.keys(storeGoodsInfos).forEach((storeId) => {
        const marketingList: MarketingViewVO2[] = [];
        const goodsInfos = storeGoodsInfos[storeId];
        const goodses = storeGoodses[storeId];
        goodsInfos.forEach((goodsInfo) => {
          if (goodsInfo?.goodsStatus === 2) return;

          let goodsMarketing = purInfo.goodsMarketings.filter((i) => i.goodsInfoId === goodsInfo.goodsInfoId)[0];
          if (goodsMarketing) {
            const match = marketingList.find((i) => i.marketingId === goodsMarketing.marketingId);
            const goods = goodses.filter((i) => i.goodsId === goodsInfo.goodsId)[0];
            const goodsItem = immutable.fromJS(goods).set('goodsInfoIds', [goodsInfo.goodsInfoId]);
            if (match) {
              // 商品选择的营销，已经在店铺营销列表中
              match.goodsInfos.push(goodsInfo);
              match.goodses.push(goodsItem.toJS());
            } else {
              // 商品选择的营销，还不在店铺营销列表中
              const marketing = purInfo.goodsMarketingMap[goodsInfo.goodsInfoId].find(
                (i) => i.marketingId === goodsMarketing.marketingId,
              );
              if (marketing) {
                marketing.goodses = [goodsItem.toJS()];
                marketing.goodsInfos = [goodsInfo];
                marketingList.push(marketing);
              }
            }
          }
        });

        // 去除店铺下不存在的营销的赠品
        const marketingIds = marketingList.map((i) => i.marketingId);
        selectedMarketingGifts = selectedMarketingGifts.filter((i) => {
          if (i.storeId !== Number(storeId)) return true;
          return marketingIds.includes(i.marketingId);
        });

        const marketings = marketingList.map((item) => {
          let marketing: PurchaseMarketingCalcVO2 = {};
          let mktDiscountPrice = 0;
          marketing.marketingId = item.marketingId;
          marketing.marketingType = item.marketingType;
          marketing.subType = item.subType;
          marketing.storeId = item.storeId;
          marketing.goodses = item.goodses;
          marketing.lack = 0;
          const checkGoodsInfos = item.goodsInfos.filter((i) => checkSku.includes(i.goodsInfoId));
          let totalPrice = checkGoodsInfos.reduce((a, b) => a + b.salePrice * b.buyCount, 0);
          let totalCount = checkGoodsInfos.reduce((a, b) => a + b.buyCount, 0);
          // 排序等级
          let levelList = item.fullReductionLevelList || item.fullDiscountLevelList || item.fullGiftLevelList || [];
          if ([0, 2, 4].includes(item.subType)) {
            levelList.sort((a, b) => a.fullAmount - b.fullAmount);
          } else {
            levelList.sort((a, b) => a.fullCount - b.fullCount);
          }
          switch (item.marketingType) {
            case 0:
              //满减优惠
              if (item.subType === 0) {
                // 满金额减，匹配优惠等级
                marketing.fullReductionLevel = lo.findLast(
                  item.fullReductionLevelList,
                  (level) => totalPrice >= level.fullAmount,
                );
                if (!marketing.fullReductionLevel) {
                  marketing.fullReductionLevel = item.fullReductionLevelList[0];
                  marketing.lack = Number(marketing.fullReductionLevel.fullAmount - totalPrice).toFixed(2);
                }
              }
              if (item.subType === 1) {
                // 满数量减，匹配优惠等级
                marketing.fullReductionLevel = lo.findLast(
                  item.fullReductionLevelList,
                  (level) => totalCount >= level.fullCount,
                );
                if (!marketing.fullReductionLevel) {
                  marketing.fullReductionLevel = item.fullReductionLevelList[0];
                  marketing.lack = marketing.fullReductionLevel.fullCount - totalCount;
                }
              }
              marketing.discount = marketing.fullReductionLevel.reduction;
              if (marketing.lack === 0) mktDiscountPrice += marketing.discount;
              break;
            case 1:
              //满折优惠
              if (item.subType === 2) {
                // 满金额折，匹配优惠等级
                marketing.fullDiscountLevel = lo.findLast(
                  item.fullDiscountLevelList,
                  (level) => totalPrice >= level.fullAmount,
                );
                if (!marketing.fullDiscountLevel) {
                  marketing.fullDiscountLevel = item.fullDiscountLevelList[0];
                  marketing.lack = Number(marketing.fullDiscountLevel.fullAmount - totalPrice).toFixed(2);
                }
              }
              if (item.subType === 3) {
                // 满数量折，匹配优惠等级
                marketing.fullDiscountLevel = lo.findLast(
                  item.fullDiscountLevelList,
                  (level) => totalCount >= level.fullCount,
                );
                if (!marketing.fullDiscountLevel) {
                  marketing.fullDiscountLevel = item.fullDiscountLevelList[0];
                  marketing.lack = marketing.fullDiscountLevel.fullCount - totalCount;
                }
              }
              marketing.discount = marketing.fullDiscountLevel.discount;
              if (marketing.lack === 0) mktDiscountPrice += lo.multiply(1 - marketing.discount, totalPrice);
              break;
            case 2:
              //满赠优惠
              let productIds = [];
              if (item.subType === 4) {
                // 满金额赠，匹配优惠等级
                for (let i = 0; i < item.fullGiftLevelList.length; i++) {
                  const fullGiftLevel = item.fullGiftLevelList[i];
                  if (totalPrice < fullGiftLevel.fullAmount) break;
                  marketing.fullGiftLevel = fullGiftLevel;
                  productIds.push(...fullGiftLevel.fullGiftDetailList.map((_i) => _i.productId));
                }
                if (!marketing.fullGiftLevel) {
                  marketing.fullGiftLevel = item.fullGiftLevelList[0];
                  marketing.lack = Number((marketing.fullGiftLevel.fullAmount - totalPrice).toFixed(2));
                }
              }
              if (item.subType === 5) {
                // 满数量赠，匹配优惠等级
                for (let i = 0; i < item.fullGiftLevelList.length; i++) {
                  const fullGiftLevel = item.fullGiftLevelList[i];
                  if (totalCount < fullGiftLevel.fullCount) break;
                  marketing.fullGiftLevel = fullGiftLevel;
                  productIds.push(...fullGiftLevel.fullGiftDetailList.map((_i) => _i.productId));
                }
                if (!marketing.fullGiftLevel) {
                  marketing.fullGiftLevel = item.fullGiftLevelList[0];
                  marketing.lack = marketing.fullGiftLevel.fullCount - totalCount;
                }
              }
              // 去除不满足level的已选赠品
              marketing.fullGiftLevelList = item.fullGiftLevelList;
              selectedMarketingGifts = selectedMarketingGifts.filter((i) => {
                if (i.marketingId !== marketing.marketingId) return true;
                return i?.giftLevelId <= marketing?.fullGiftLevel?.giftLevelId && productIds.includes(i.goodsInfoId);
              });
              break;
            case 3:
              // 打包一口价
              item.buyoutPriceLevelList.sort((a, b) => a.choiceCount - b.choiceCount);
              marketing.buyoutPriceLevel = lo.findLast(
                item.buyoutPriceLevelList,
                (level) => totalCount >= level.choiceCount,
              );
              checkGoodsInfos.sort((a, b) => b.salePrice - a.salePrice);
              if (!marketing.buyoutPriceLevel) {
                marketing.buyoutPriceLevel = item.buyoutPriceLevelList[0];
                marketing.lack = marketing.buyoutPriceLevel.choiceCount - totalCount;
              } else {
                let choiceCount = marketing.buyoutPriceLevel.choiceCount;
                // 计算打包商品原价
                const calcOriginPrice = (count) => {
                  let originPrice = 0;
                  for (let i = 0; i < checkGoodsInfos.length; i++) {
                    const goodsInfo = checkGoodsInfos[i];
                    if (goodsInfo.buyCount < count) {
                      count -= goodsInfo.buyCount;
                      originPrice += goodsInfo.buyCount * goodsInfo.salePrice;
                    } else {
                      originPrice += count * goodsInfo.salePrice;
                      count = 0;
                    }
                    if (count === 0) break;
                  }
                  return originPrice;
                };
                if (item.buyoutPriceLevelList.length > 1) {
                  // 超过一个级别
                  const discount = calcOriginPrice(choiceCount) - marketing.buyoutPriceLevel.fullAmount;
                  if (discount < 0) break;
                  mktDiscountPrice += discount;
                } else {
                  // 仅一个级别
                  const times = Math.floor(totalCount / choiceCount);
                  const discount = calcOriginPrice(choiceCount * times) - marketing.buyoutPriceLevel.fullAmount * times;
                  if (discount < 0) break;
                  mktDiscountPrice += discount;
                }
              }
              break;
            case 4:
              // 第二件半价优惠活动
              const level = item.halfPriceSecondPieceLevel[0];
              marketing.halfPriceSecondPieceLevel = level;
              if (totalCount >= level.number) {
                checkGoodsInfos.sort((a, b) => a.salePrice - b.salePrice);
                let halfCount = Math.floor(totalCount / level.number);
                let originPrice = 0;
                for (let i = 0; i < checkGoodsInfos.length; i++) {
                  const goodsInfo = checkGoodsInfos[i];
                  if (goodsInfo.buyCount < halfCount) {
                    halfCount -= goodsInfo.buyCount;
                    originPrice += goodsInfo.buyCount * goodsInfo.salePrice;
                  } else {
                    originPrice += halfCount * goodsInfo.salePrice;
                    halfCount = 0;
                  }
                  if (halfCount === 0) break;
                }
                mktDiscountPrice += originPrice * (1 - level.discount / 10);
              } else {
                marketing.lack = level.number - totalCount;
              }
              break;
          }
          if (mktDiscountPrice >= totalPrice) mktDiscountPrice = totalPrice;
          discountPrice += mktDiscountPrice;
          marketing.totalAmount = totalPrice;
          marketing.totalCount = totalCount;
          delete item.goodsInfos;
          return marketing;
        });
        marketings.sort((a, b) => a.marketingType - b.marketingType);
        storeMarketingMap[storeId] = marketings;
      });

      // 计算金额
      const totalPrice = purInfo.goodsInfos
        .filter((i) => checkSku.includes(i.goodsInfoId))
        .reduce((a, b) => a + b.salePrice * b.buyCount, 0);
      discountPrice = lo.round(discountPrice, 2) > totalPrice ? totalPrice : lo.round(discountPrice, 2);
      const tradePrice = totalPrice - discountPrice;

      // 计算积分
      const totalBuyPoint = purInfo.goodsInfos
        .filter((i) => checkSku.includes(i.goodsInfoId))
        .reduce((a, b) => a + (b.buyPoint || 0) * b.buyCount, 0);

      // 分销返利
      const totalCommission = purInfo.goodsInfos
        .filter((i) => checkSku.includes(i.goodsInfoId) && i.distributionGoodsAudit === 2)
        .reduce((a, b) => {
          return a.add(new Decimal(b.distributionCommission || 0).mul(new Decimal(b.buyCount)));
        }, new Decimal(0));

      purInfo.storeMarketingMap = storeMarketingMap;
      purInfo.totalPrice = totalPrice;
      purInfo.discountPrice = discountPrice;
      purInfo.tradePrice = tradePrice;
      purInfo.totalBuyPoint = totalBuyPoint;
      purInfo.distributeCommission = parseFloat(totalCommission.toFixed(2));
      // fixme commonChange的位置可以再调下
      action.commonChange('main.goods.selectedMarketingGifts', selectedMarketingGifts);
      return purInfo;
    },

    _filterCheckSku(purInfo, checkSku) {
      return purInfo.goodsInfos
        .filter((i) => ![2,4,99].includes(i.goodsStatus) && checkSku.includes(i.goodsInfoId))
        .map((i) => i.goodsInfoId);
    },

    /**
     * 重新计算满足的营销、价格
     */
    async reCalcMarketingAndPrice() {
      action.loadingWML(false);
      const purInfo = this.calcMarketingAndPrice(immutable.fromJS(getData().main.purInfo).toJS());
      action.commonChange([
        { paths: 'main.purInfo.storeMarketingMap', value: purInfo.storeMarketingMap },
        { paths: 'main.purInfo.totalPrice', value: purInfo.totalPrice },
        { paths: 'main.purInfo.discountPrice', value: purInfo.discountPrice },
        { paths: 'main.purInfo.tradePrice', value: purInfo.tradePrice },
        { paths: 'main.purInfo.totalBuyPoint', value: purInfo.totalBuyPoint },
        { paths: 'main.purInfo.distributeCommission', value: purInfo.distributeCommission },
      ]);
      this._markettingInit(purInfo);
    },

    //计算sku阶梯价格
    _calculateGoodsPrice(sku: any, intervalPrices: any) {
      if (!intervalPrices) {
        return sku.salePrice || 0.0;
      }
      //取出当前商品阶梯价
      const prices = intervalPrices.filter((intervalPrice) => intervalPrice.goodsInfoId === sku.goodsInfoId);
      //算所有满足当前商品数量的阶梯价格集合
      const priceList = prices.filter((price) => price.count <= sku.buyCount);
      //缺货状态下 求阶梯价最小值
      if (sku.goodsStatus !== 0 && prices.length > 0) {
        return prices.sort((a, b) => a.price - b.price)[0].price || 0.0;
      }

      if (prices.length > 0 && priceList.length > 0) {
        //算出阶梯价
        return priceList.sort((a, b) => a.price - b.price)[0].price || 0.0;
      } else {
        //算出原价
        return sku.salePrice || 0.0;
      }
    },

    //判断是否登录
    // async _isLogin() {
    //   const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
    //   await action.commonChange('main.useStatus.isLogin', isLogin);
    //   return isLogin;
    // },

    //合并登录前,登陆后的购物车信息
    async _mergeCart() {
      const localSku = Taro.getStorageSync('mini::shopCartSku');

      if (localSku && localSku.length > 0) {
        await api.purchaseBaseController.mergePurchase({
          purchaseMergeDTOList: localSku,
        });
        await Taro.removeStorageSync('mini::shopCartSku');
        await Taro.removeStorageSync('mini::shopCartMarketing');
      }
    },

    async _savaLocal() {
      const {
        main: { defaltAddress },
      } = getData();

      //地址缓存
      await Taro.setStorageSync('mini::confirmAddress', defaltAddress);
      await Taro.setStorageSync('mini::shopCardAddress', defaltAddress);
    },

    //全选操作
    async _checkAllSkus(checked) {
      const {
        main: {
          purInfo: { goodsInfos },
        },
      } = getData();
      action.loadingWML(true);
      //正常可选的商品
      let correctGoodsInfos = actions(dispatch).actions.getCollecrtGoods(goodsInfos);
      // 选中
      if (checked) {
        //塞数据
        const allSkus = correctGoodsInfos.reduce((a, b) => (a.push(b.goodsInfoId), a), []);
        action.commonChange([{ paths: 'main.goods.checkSku', value: allSkus }]);
      } else {
        action.commonChange([{ paths: 'main.goods.checkSku', value: [] }]);
      }
      setTimeout(() => action.reCalcMarketingAndPrice(), 200);
    },

    //选中SKU
    async _checkSku(skuId, checked) {
      const {
        main: {
          goods: { checkSku },
        },
      } = getData();
      action.loadingWML(true);
      // 选中
      if (checked) {
        let newCheckSku = checkSku.slice(0);
        newCheckSku.push(skuId);
        action.commonChange('main.goods.checkSku', newCheckSku);
      } else {
        // 未选中
        let newCheckSku = checkSku.filter((v) => v != skuId);
        action.commonChange('main.goods.checkSku', newCheckSku);
      }
      // action.loadingWML(true);
      // 宏任务，放到最后执行
      setTimeout(() => action.reCalcMarketingAndPrice(), 200);

      // dispatch({
      //   type: Command.commonChange,
      //   payload: {
      //     paths: 'main.goods.checkSku',
      //     value: () => {
      //       const index = checkSku.indexOf(skuId);
      //       ~index ? checkSku.splice(index, 1) : checkSku.push(skuId);
      //       return checkSku;
      //     },
      //   },
      // });
    },

    //选中SPU
    async _checkSpu(skuSimpleList) {
      const {
        main: {
          useStatus: { isEdit },
          goods: { checkSku },
        },
      } = getData();
      const bool = actions(dispatch).actions._getSpuCheck(skuSimpleList, checkSku);
      skuSimpleList.forEach(async ({ sku: { goodsInfoId, goodsStatus } }) => {
        //过滤失效 缺货的
        if ((isEdit && goodsStatus !== 2) || goodsStatus === 0) {
          bool ? await action._checkSku(goodsInfoId) : await action._setUnCheck(goodsInfoId);
        }
      });
      await action.reCalcMarketingAndPrice();
    },

    //修改SKU的数量
    async _changeSkuNum(skuId, skuNum) {
      action.loadingWML(false);
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.purInfo.goodsInfos',
          value: async (goodsInfos) => {
            goodsInfos.map((item) => {
              if (item.goodsInfoId === skuId) {
                item.buyCount = skuNum;
              }
            });
          },
        },
      });
      await action.reCalcMarketingAndPrice();
      if (WMkit.isLogin()) {
        await api.purchaseBaseController.edit({
          goodsInfoId: skuId,
          goodsNum: skuNum,
          verifyStock: 0,
          updateTimeFlag: 0,
        });
      } else {
        await action._setNewLocalSks(getData().main.purInfo.goodsInfos);
      }
    },

    //删除SKU
    async _deleteSku(skuId) {
      const isArr = Array.isArray(skuId);
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.purInfo.goodsInfos',
          value: (() => {
            const _goodsInfos =
              getData().main.purInfo.goodsInfos.filter((item) => {
                // 保留未删商品(考虑单个删除、批量删除)
                return !(item.goodsInfoId === skuId || (isArr && skuId.includes(item.goodsInfoId)));
              }) || [];
            const relationGoodsIdList = _goodsInfos.map((item) => item.goodsId) || [];
            this.commonChange([
              { paths: 'main.relationGoodsIdList', value: relationGoodsIdList },
              { paths: 'main.pageIndex', value: 0 },
            ]);
            return _goodsInfos;
          })(),
        },
      });
      if (WMkit.isLogin()) {
        await api.purchaseBaseController.delete_({ goodsInfoIds: isArr ? skuId : [skuId] });
      } else {
        await action._setNewLocalSks(getData().main.purInfo.goodsInfos);
        await action._delPurchase(isArr ? skuId : [skuId]);
        await this.pageInit();
      }

      isArr ? await action.commonChange('main.goods.checkSku', []) : await action._deleteCheck(skuId);

      await action.reCalcMarketingAndPrice();
      const goodsInfos = getData().main.purInfo.goodsInfos;
      if (goodsInfos && goodsInfos.length == 0) {
        action.commonChange('main.useStatus.isEmpty', true);
        Taro.removeStorageSync('purchase:info');
      }
      msg.emit('shopCart-C-num', goodsInfos.length);
    },

    //移入收藏夹
    async _addFollow(goodsInfoIds) {
      const isLogin = WMkit.isLogin();
      if (isLogin) {
        await api.purchaseBaseController.addFollow({ goodsInfoIds });
        await Taro.showToast({
          title: `移入收藏夹成功`,
          icon: 'none',
          duration: 2000,
        });
        await action._deleteSku(goodsInfoIds);
        await action.commonChange('main.useStatus.isEdit', false);
      } else {
        await Taro.navigateTo({ url: '/pages/package-A/login/login/index' });
      }
    },

    //清空失效商品
    async _cleanInvalidGoods() {
      const goodsInfos = getData().main.purInfo.goodsInfos;
      // 所有失效商品的goodsInfoId
      const invalidGoods = (goodsInfos || []).filter(({ goodsStatus }) => goodsStatus === 2);
      const skuIds = invalidGoods.map((sku) => sku.goodsInfoId);
      const bool = WMkit.isLogin();
      action.loadingWML(true);
      if (bool) {
        const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
        const {
          main: { defaltAddress },
        } = getData();
        let areaId = null;
        let address = null;
        const customerId = loginData.customerId;
        if (defaltAddress) {
          areaId = defaltAddress.areaId;
          address = {
            provinceId: defaltAddress.provinceId,
            cityId: defaltAddress.cityId,
            areaId: defaltAddress.areaId,
            streetId: defaltAddress.streetId,
            customerId,
            deliveryAddressId: defaltAddress.deliveryAddressId
          };
        }
        await api.purchaseBaseController.clearLoseGoods_({ areaId, address, loseGoodsInfoIdList: skuIds })
      } else {
        await action._cleanInvalidGoodsNoLogin();
      }
      const goods = goodsInfos.filter(({ goodsStatus }) => goodsStatus !== 2);
      action.commonChange('main.purInfo.goodsInfos', goods);
      action.loadingWML(false);
      // 先简单处理，重新调下init方法
      await this.pageInit();
    },

    //未登录清空失效商品操作
    async _cleanInvalidGoodsNoLogin() {
      const { purInfo } = getData().main || {};
      // 所有失效商品的goodsInfoId
      const invalidGoods = purInfo?.goodsInfos?.filter(({ goodsStatus }) => goodsStatus === 2);
      if (invalidGoods) {
        const skuIds = invalidGoods.map((sku) => sku.goodsInfoId);
        if (await !action._delPurchase(skuIds)) {
          return;
        }
      }
    },

    //从购物车缓存中删除信息, 同时删除该商品选择的营销活动信息
    async _delPurchase(goodsInfoIds) {
      try {
        if (goodsInfoIds && goodsInfoIds.length > 0) {
          let purArr = Taro.getStorageSync('mini::shopCartSku');
          if (purArr) {
            // 过滤出 待删除ids中不存在的购物车信息
            purArr = purArr.filter((sku) => !goodsInfoIds?.includes?.(sku?.goodsInfoId));
            Taro.setStorageSync('mini::shopCartSku', purArr);
          }

          let marArr = Taro.getStorageSync('mini::shopCartMarketing');
          if (marArr) {
            // 过滤出 待删除ids中不存在的商品营销信息
            marArr = marArr.filter((sku) => !goodsInfoIds?.includes?.(sku?.goodsInfoId));
            Taro.setStorageSync('mini::shopCartMarketing', marArr);
          }
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    //选中店铺
    async _checkStore(spuIds, storeId, checked) {
      action.loadingWML(true);
      const {
        main: {
          purInfo: { goodsInfos },
          goods: { checkSku },
        },
      } = getData();
      // 店铺中的商品
      let storeGoodsInfos = [];
      storeGoodsInfos = goodsInfos.filter((item) => {
        return spuIds.includes(item.goodsId);
      });
      //店铺中正常的商品
      let correctGoodsInfos = actions(dispatch).actions.getCollecrtGoods(storeGoodsInfos);
      // 聚合出skuId
      let skuIds = correctGoodsInfos.map((v) => {
        return v.goodsInfoId;
      });
      // 选中
      if (checked) {
        // await dispatch({
        //   type: Command.commonChange,
        //   payload: {
        //     paths: 'main.goods.checkSku',
        //     value: async (_checkSku) => {
        //       // 拼接再去重
        //       Array.prototype.push.apply(_checkSku, skuIds);
        //       // const index = checkSku.indexOf(goodsInfoId);
        //       // if (~index) {
        //       //   checkSku.splice(index, 1);
        //       // }
        //       const newArr = Array.from(new Set(_checkSku))
        //       return Array.from(new Set(_checkSku));
        //     },
        //   }
        // });
        const newGoodsArray = [...checkSku];
        Array.prototype.push.apply(newGoodsArray, skuIds);
        action.commonChange('main.goods.checkSku', Array.from(new Set(newGoodsArray)));
      } else {
        // 删除
        let newCheckSku = checkSku.filter((v) => !skuIds.includes(v));
        action.commonChange('main.goods.checkSku', newCheckSku);
      }
      // const bool = actions(dispatch).actions._getStoreCheck(spuIds, checkSku, goodsInfos);
      // //店铺中正常的商品x
      // let correctGoodsInfos = actions(dispatch).actions.getCollecrtGoods(storeGoodsInfos);
      // correctGoodsInfos.forEach(async (item) => {
      //   bool ? await action._checkSku(item.goodsInfoId) : await action._setUnCheck(item.goodsInfoId);
      // });
      //action.reCalcMarketingAndPrice()
      // 宏任务，放在最后执行，上面的commonChange发生变化之后页面就render，不需要让commonChange合并
      setTimeout(() => action.reCalcMarketingAndPrice(), 300);
    },

    //check特殊情况处理
    async _setUnCheck(goodsInfoId) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.goods.checkSku',
          value: (checkSku) => {
            checkSku.includes(goodsInfoId) || checkSku.push(goodsInfoId);
            return checkSku;
          },
        },
      });
    },

    async _deleteCheck(goodsInfoId) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.goods.checkSku',
          value: (checkSku) => {
            const index = checkSku.indexOf(goodsInfoId);
            if (~index) {
              checkSku.splice(index, 1);
            }
            return checkSku;
          },
        },
      });
    },

    async removeSku(goodsInfos) {
      //讲选中的缺货的sku去除
      const overGoodsInfos = goodsInfos.filter(({ goodsStatus }) => goodsStatus === 1);
      overGoodsInfos.forEach(async ({ goodsInfoId }) => {
        await action._deleteCheck(goodsInfoId);
      });
      //去除不可结算的sku
      const notAllowCount = goodsInfos.filter(({ goodsInfoId }) => !actions(dispatch).actions.allowClick(goodsInfoId));
      notAllowCount.forEach(async ({ goodsInfoId }) => {
        await action._deleteCheck(goodsInfoId);
      });
      action.reCalcMarketingAndPrice();
    },

    //更新sku数据
    async _setNewLocalSks(goodsInfos) {
      //将后端过滤后的信息 覆盖 前端缓存,保持数据一致
      const data = goodsInfos.map((info) => {
        return {
          goodsInfoId: info.goodsInfoId,
          goodsNum: info.buyCount,
          invalid: info.goodsStatus == 2,
        };
      });
      Taro.setStorageSync('mini::shopCartSku', data || []);
    },

    //更新营销缓存
    async _setNewLocalMarketing(data) {
      Taro.setStorageSync('mini::shopCartMarketing', data || []);
    },

    // 用户在购物车修改营销活动的时候需要判断是否是否已经选了赠品，如果列表有赠品显示的话再去选择非满赠活动需要清除列表中的相关赠品
    async _handleListGift(marketingId, marketingList) {
      let { selectedMarketingGifts } = getData().main.goods;

      // 先判断有没有选择过赠品
      if (selectedMarketingGifts && selectedMarketingGifts.length > 0) {
        // 定义变量存储营销活动展示列表中满赠活动的marketingId
        let marketingListId;

        let isExitFullGift = marketingList.some((item) => {
          if (item.marketingType == 2) {
            marketingListId = item.marketingId;
            return true;
          }
        });

        // 当选择不是非赠品的营销活动时在已选择赠品数组selectedMarketingGifts中过滤掉当前物品营销活动中的赠品
        if (isExitFullGift && marketingId !== marketingListId) {
          let newSelectedMarketing = selectedMarketingGifts.filter((item) => {
            return item.marketingId !== marketingListId;
          });
          action.commonChange('main.goods.selectedMarketingGifts', newSelectedMarketing || []);
        }
      }
    },

    //用户在购物车中选择sku准备参加的营销活动
    async _chooseSkuMarketing(goodsInfoId, marketingId) {
      // 修改营销
      let goodsMarketings = getData().main.purInfo.goodsMarketings;
      goodsMarketings = goodsMarketings.map((goodsMarketing) => {
        if (goodsMarketing.goodsInfoId === goodsInfoId) {
          goodsMarketing = { goodsInfoId, marketingId };
        }
        return goodsMarketing;
      });
      const purInfo = immutable.fromJS(getData().main.purInfo).toJS();
      // 商品换促销。重新排序，操作的商品排在最上面
      const { goodses, stores, goodsInfos } = purInfo;
      // 取出当前选中活动关联的商品（选中的goodsInfoId排在最上面，下面紧跟营销关联的商品）
      const skuIds = goodsMarketings.map((goodsMarketing) => {
        // 随便赋了个值。没有实际意义
        let skuId = '-1';
        if (goodsMarketing.marketingId === marketingId) {
          skuId = goodsMarketing.goodsInfoId;
        }
        return skuId;
      });
      // 在源数据中把换促销的商品先删除。然后通过unshift放在数组中的头部。
      const goods: any = lo.remove(goodses, (_goods: any) => _goods.goodsInfoIds.some((id) => id == goodsInfoId))[0];
      // marketingId关联的商品也要在源数据中先删除，在unshift放在数组中的头部。
      const newGoods = lo.remove(goodses, (_goods: any) => _goods.goodsInfoIds.some((id) => skuIds.includes(id)));
      // goods下有多个sku，切换的sku要排在第一
      if (goods.goodsInfoIds.length > 1) {
        const id = lo.remove(goods.goodsInfoIds, (_id) => _id === goodsInfoId)[0];
        goods.goodsInfoIds.unshift(id);
      }
      goodses.unshift(...newGoods);
      goodses.unshift(goods);
      // 同样。店铺也要改变源数据顺序
      const store = lo.remove(stores, (_store: any) => _store.storeId == goods.storeId)[0];
      stores.unshift(store);
      // goodsInfo和goods同理。
      const goodsInfo = lo.remove(goodsInfos, (_goodsInfo: any) => _goodsInfo.goodsInfoId == goodsInfoId)[0];
      const newGoodsInfo = lo.remove(goodsInfos, (_goodsInfo: any) => skuIds.includes(_goodsInfo.goodsInfoId));
      goodsInfos.unshift(...newGoodsInfo);
      goodsInfos.unshift(goodsInfo);

      await action.commonChange([
        { paths: 'main.purInfo.goodses', value: goodses },
        { paths: 'main.purInfo.stores', value: stores },
        { paths: 'main.purInfo.goodsInfos', value: goodsInfos },
        { paths: 'main.purInfo.goodsMarketings', value: goodsMarketings },
      ]);
      await action.reCalcMarketingAndPrice();

      // 请求接口
      const bool = WMkit.isLogin();
      bool
        ? await api.purchaseBaseController.modifyGoodsMarketing(goodsInfoId, marketingId, 0)
        : await action._putSkuMarketingCache(goodsInfoId, marketingId);
    },

    //本地营销修改操作
    async _putSkuMarketingCache(goodsInfoId, marketingId) {
      try {
        // 未登录时,在前端存储,用户针对sku选择的营销活动信息
        const skuMarketingArr = Taro.getStorageSync('mini::shopCartMarketing') || [];
        const marIndex = skuMarketingArr.findIndex((mar) => mar.goodsInfoId == goodsInfoId);
        if (marIndex > -1) {
          skuMarketingArr[marIndex] = { goodsInfoId, marketingId };
        } else {
          skuMarketingArr.push({ goodsInfoId, marketingId });
        }
        await action._setNewLocalMarketing(skuMarketingArr);
        return true;
      } catch (e) {
        return false;
      }
    },

    //领劵初始化
    async _couponInit(storeSpus) {
      const {
        main: {
          purInfo: { goodsInfos },
        },
      } = getData();

      const goodsInfoIds = goodsInfos
        .filter((sku) => sku.goodsStatus !== 2 && storeSpus.includes(sku.goodsId))
        .map((sku) => sku.goodsInfoId);

      action.commonChange([
        { paths: 'main.useStatus.isMaskOpen', value: true },
        { paths: 'main.useStatus.maskType', value: 4 },
        { paths: 'main.coupon.goodsInfoIds', value: goodsInfoIds },
      ]);
      action.loadingWML(false);
    },

    //领劵初始化
    async _packageInit(list) {
      action.commonChange([
        { paths: 'main.packageMaskData.isPackageMaskOpen', value: true },
        { paths: 'main.packageMaskData.packageList', value: list || [] },
      ]);
      action.loadingWML(false);
    },

    //去下单
    async toConfirm(flag: boolean = false) {
      await action.commonChange('main.canClick', false);
      WMkit.isLogin()
        ? await action._didConfirm(flag)
        : await Taro.navigateTo({
          url: '/pages/package-A/login/login/index',
        });
    },

    async _didConfirm(flag: boolean) {
      const {
        main: {
          purInfo: { goodsInfos },
          purInfo,
          purInfos: { bookingSaleVOList },
          goods,
          goods: { checkSku, storeMarketing, goodsMarketing, skuMarketingDict, selectedMarketingGifts },
          defaltAddress,
        },
      } = getData();
      action.loadingWML(true);
      // 校验是否需要完善地址
      // if (defaltAddress && defaltAddress.deliveryAddressId) {
      //   const _flag = await actions(dispatch).actions.isTrueAddress(defaltAddress);
      //   if (_flag) {
      //     return false;
      //   }
      // }

      // Taro.showLoading();
      let newCheckSku = [];

      //过滤是否有预售商品
      checkSku.map((key, index) => {
        if (bookingSaleVOList.length > 0) {
          bookingSaleVOList.map((k) => {
            if (k.bookingSaleGoods.goodsInfoId != key) {
              newCheckSku.push(key);
            }
          });
        }
      });

      //如果没有预售活动则使用原来逻辑
      if (newCheckSku.length == 0) newCheckSku = checkSku;

      let skuList = [];
      let appointmentSaleVOList = purInfo.appointmentSaleVOList as any;
      goodsInfos.forEach((item) => {
        if (newCheckSku.includes(item.goodsInfoId) && [0, 5].includes(item.goodsStatus)) {
          //如果购物车中有预约商品则skuList添加一个入参
          let isAppointment = false; //判断是否存在预约活动
          if (appointmentSaleVOList.length > 0) {
            appointmentSaleVOList.map((index) => {
              if (index.appointmentSaleGood.goodsInfoId == item.goodsInfoId) {
                isAppointment = true;
                skuList.push({
                  skuId: item.goodsInfoId,
                  num: item.buyCount,
                  isAppointmentSaleGoods: true,
                  appointmentSaleId: index.id,
                });
              }
            });
          }

          if (!isAppointment) {
            skuList.push({
              skuId: item.goodsInfoId,
              num: item.buyCount,
            });
          }
        }
      });
      let tradeMarketingList = [];
      skuList.forEach((sku) => {
        let goodsInfoId = sku.skuId;

        // 商品参与的营销列表
        let goodsMarketings = goodsMarketing[goodsInfoId];
        if (goodsMarketings && goodsMarketings.length) {
          // 商品当前使用的营销
          let marketing = skuMarketingDict[goodsInfoId].filter((_goodsMarketing) => _goodsMarketing.checked)[0];

          // 营销请求参数列表，一个营销一条数据
          let tradeMarketings = tradeMarketingList.filter(
            (tradeMarketing) => tradeMarketing['marketingId'] === marketing.marketingId,
          );

          if (tradeMarketings.length > 0) {
            tradeMarketings[0]['skuIds'].push(goodsInfoId);
          } else {
            let marketingLevelId = '';
            let giftSkuIds = [];
            // 满赠营销
            if (marketing.marketingType === 2) {
              // 获取领取赠品的等级及领取的赠品
              selectedMarketingGifts.forEach((selectedMarketingGift) => {
                if (selectedMarketingGift.marketingId === marketing.marketingId) {
                  marketingLevelId = selectedMarketingGift.giftLevelId;
                  giftSkuIds.push(selectedMarketingGift.goodsInfoId);
                }
              });
            } else if (marketing.marketingType === 0) {
              // 满减
              storeMarketing[marketing.storeId].forEach((v) => {
                // 满足满减营销
                if (v.marketingId === marketing.marketingId && v.lack === 0) {
                  marketingLevelId = v.fullReductionLevel ? v.fullReductionLevel.reductionLevelId : '';
                }
              });
            } else if (marketing.marketingType === 1) {
              // 满折
              storeMarketing[marketing.storeId].forEach((v) => {
                // 满足满折营销
                if (v.marketingId === marketing.marketingId && v.lack === 0) {
                  marketingLevelId = v.fullDiscountLevel ? v.fullDiscountLevel.discountLevelId : '';
                }
              });
            } else if (marketing.marketingType == 3) {
              storeMarketing[marketing.storeId].forEach((v) => {
                // 满足满减营销 满足满折营销
                if (v.marketingId === marketing.marketingId && v.lack === 0) {
                  marketingLevelId = v.buyoutPriceLevel.reductionLevelId;
                }
              });
              // 打包一口价
              // storeMarketing[marketing.storeId].forEach((v) => {
              //   // 满足满减营销 满足满折营销
              //   if (v.marketingId === marketing.marketingId && v.lack === 0) {
              //     marketingLevelId = v.fullReductionLevel.reductionLevelId;
              //   }
              // });
            } else if (marketing.marketingType == 4) {
              storeMarketing[marketing.storeId].forEach((v) => {
                //第二件半价
                if (v.marketingId === marketing.marketingId && v.lack === 0) {
                  marketingLevelId = v.halfPriceSecondPieceLevel.id;
                }
              });
            }

            if (marketingLevelId !== '') {
              let tradeMarketing = {
                marketingId: marketing.marketingId,
                marketingLevelId: marketingLevelId,
                skuIds: [goodsInfoId],
                giftSkuIds: giftSkuIds,
              };

              tradeMarketingList.push(tradeMarketing);
            }
          }
        }
      });
      //提前关闭lodoing框 不然会吞掉异常的吐司
      Taro.hideLoading();
      // let areaId = getData().main.defaltAddress.areaId;
      const address = getData().main.defaltAddress
      const params = {
        areaId: address.areaId,
        platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null,
        dangaossAddrId: address.dangaossAddrId,
        tradeItems: skuList,
        tradeMarketingList,
        forceConfirm: flag,
      }
      try {
        await api.tradeBaseController.confirm(params);
        //可跳转
        let jump = true;
        // try {
        //   await api.tradeBaseController.getPurchaseItems();
        // } catch (e) {
        //   const {code, message} = e;
        //   // 商品失效
        //   if(code==='K-050117'){
        //     action.loadingWML(false);
        //     action.commonChange('main.useStatus.confirmMask', {
        //       isOpen:true,
        //       type: 1,
        //       message,
        //     });
        //     return
        //   }
        //   if (code !== 'K-050312') {
        //     action.loadingWML(false);
        //     setTimeout(() => {
        //       action.commonChange('main.canClick', true);
        //     }, 800);
        //     Taro.navigateTo({url: '/pages/package-C/order/order-confirm/index'});
        //   } else {
        //     jump = false;
        //   }
        // }
        if (jump) {
          action.loadingWML(false);
          setTimeout(() => {
            action.commonChange('main.canClick', true);
          }, 800);
          Taro.setStorageSync(cache.ORDER_CONFIRM_PARAMS, { ...params, type: 'confirm' })
          Taro.navigateTo({ url: '/pages/package-C/order/order-confirm/index' });
        }
      } catch (e) {
        action.loadingWML(false);
        const { code, message } = e;
        if (code !== 'K-999997') {
          await action.commonChange('main.useStatus.confirmMask', {
            isOpen:
              code === 'K-999999' ||
                code === 'K-050205' ||
                code === 'K-180001' ||
                code === 'K-050117' ||
                code === 'K-050116' ||
                code === 'K-130013' ||
                code === 'K-050317'
                ? true
                : false,
            type:
              code === 'K-999999' ? 0 : code === 'K-050205' || code === 'K-050117' ? 1 : code === 'K-180001' ? 2 : 3,
            message,
          });
        }
      }
    },

    //赠品信息处理 逻辑从H5那搬过来的
    async _markettingInit(purInfo) {
      // 赠品详细信息，格式{goodsInfoId: goodsInfo}
      let giftGoodsInfos = immutable.fromJS({});
      let storeMarketingMap =
        (purInfo.storeMarketingMap && immutable.fromJS(purInfo.storeMarketingMap)) || immutable.fromJS({});
      let goodsMarketingMap =
        (purInfo.goodsMarketingMap && immutable.fromJS(purInfo.goodsMarketingMap)) || immutable.fromJS({});
      let goodsMarketings = (purInfo.goodsMarketings && immutable.fromJS(purInfo.goodsMarketings)) || immutable.List();

      goodsMarketingMap.forEach((marketings, key) => {
        marketings.forEach((marketing) => {
          if (marketing.getIn(['goodsList', 'goodsInfos'])) {
            marketing.getIn(['goodsList', 'goodsInfos']).forEach((goodsInfo) => {
              // 商品单位
              let goodsUnit = '';
              if (!giftGoodsInfos.get(goodsInfo.get('goodsInfoId'))) {
                giftGoodsInfos = giftGoodsInfos.set(
                  marketing.get('marketingId') + '_' + goodsInfo.get('goodsInfoId'),
                  goodsInfo,
                );
              }
            });
          }
        });
      });

      // sku营销
      let skuMarketingDict = immutable.fromJS({});

      goodsMarketingMap.forEach((marketings, key) => {
        skuMarketingDict = skuMarketingDict.set(key, immutable.fromJS([]));
        marketings.forEach((marketing, marketingIndex) => {
          let title = '';
          let checked = goodsMarketings.some(
            (goodsMarketing) =>
              goodsMarketing.get('goodsInfoId') === key &&
              goodsMarketing.get('marketingId') === marketing.get('marketingId'),
          );

          // 满赠
          if (marketing.get('marketingType') === 2) {
            marketing.get('fullGiftLevelList').forEach((level, index) => {
              if (index === 0) {
                title += '满';
              } else {
                title += '，';
              }

              // 满金额
              if (marketing.get('subType') === 4) {
                title += level.get('fullAmount') + '元';
              } else if (marketing.get('subType') === 5) {
                // 满数量
                title += level.get('fullCount') + '件';
              }
            });

            title += '获赠品，赠完为止';
          } else if (marketing.get('marketingType') === 0) {
            marketing.get('fullReductionLevelList').forEach((level, index) => {
              if (index === 0) {
                title += '满';
              } else {
                title += '，';
              }

              // 满金额
              if (marketing.get('subType') === 0) {
                title += level.get('fullAmount') + '元';
              } else if (marketing.get('subType') === 1) {
                // 满数量
                title += level.get('fullCount') + '件';
              }

              title += '减' + level.get('reduction') + '元';
            });
          } else if (marketing.get('marketingType') === 1) {
            marketing.get('fullDiscountLevelList').forEach((level, index) => {
              if (index === 0) {
                title += '满';
              } else {
                title += '，';
              }

              // 满金额
              if (marketing.get('subType') === 2) {
                title += level.get('fullAmount') + '元';
              } else if (marketing.get('subType') === 3) {
                // 满数量
                title += level.get('fullCount') + '件';
              }

              title += '享' + _.mul(level.get('discount'), 10) + '折';
            });
          } else if (marketing.get('marketingType') === 3) {
            marketing.get('buyoutPriceLevelList').forEach((level, index) => {
              if (index === 0) {
                title += '';
              } else {
                title += '，';
              }
              // 满数量
              title += level.get('choiceCount') + '件';

              title += +level.get('fullAmount') + '元';
            });
          } else if (marketing.get('marketingType') === 4) {
            marketing.get('halfPriceSecondPieceLevel').forEach((level, index) => {
              if (level.get('number') > 0 && level.get('discount') == 0) {
                title = `买' + ${level.get('number') - 1} + '送1`;
              } else if (level.get('number') > 0 && level.get('discount') > 0) {
                title = '第' + level.get('number') + '件' + level.get('discount') + '折';
              }
            });
          }

          skuMarketingDict = skuMarketingDict.set(
            key,
            skuMarketingDict.get(key).push(marketing.set('checked', checked).set('alllevelDesc', title)),
          );
        });
      });

      // 组装数据 有营销活动时：{[店铺ID：[{营销活动}]]} 没有营销活动时：{[店铺ID：[{SPU商品}]]}
      let item = immutable.fromJS({});
      // spu按照店铺ID分组
      const storeGoodses = lo.groupBy(purInfo.goodses, 'storeId');
      purInfo.stores &&
        purInfo.stores.forEach((store) => {
          // 店铺ID
          const storeId = store.storeId;
          // 店铺包含的营销活动
          const marketings = storeMarketingMap.get(storeId.toString()) || immutable.fromJS({});
          // 店铺的spu信息
          const goodses: Array<any> = immutable.fromJS(storeGoodses[storeId]).toJS();
          if (marketings.isEmpty()) {
            // 判断店铺是否关联营销活动
            // 没有营销活动则 [店铺ID：[{SPU商品}]]
            item = item.set(storeId, goodses);
          } else {
            // 有营销活动。遍历spu
            goodses.forEach((goods) => {
              goods.goodsInfoIds.forEach((goodsinfoId) => {
                // 找出当前spu关联的营销活动
                const marketing = marketings
                  .filter((i) => i.get('goodses').some((spu) => spu.get('goodsInfoIds').includes(goodsinfoId)))
                  .toList();
                // 取出当前数组中店铺的组装数据
                const storeGoodsAndMarketing = item.get(storeId);
                if (marketing.size > 0) {
                  // 判断当前商品是否关联营销活动
                  // 有营销活动
                  if (storeGoodsAndMarketing) {
                    // 判断当前组装数据中是否有店铺信息
                    // 有则追加 [storeId：[marketing, marketing]]
                    storeGoodsAndMarketing.push(marketing.get(0).toJS());
                  } else {
                    // 无则set新数据 [storeId：[marketing]】
                    item = item.set(storeId, marketing.toJS());
                  }
                  // 因为营销活动中包含了spu。防止goodses重复遍历，此处剔除营销活动包含的spu
                  goodses.forEach((goodsItem) => {
                    if (marketing.getIn([0, 'goodses']).some((i) => i.get('goodsId') == goodsItem.goodsId)) {
                      if (goodsItem.goodsInfoIds.count < 2) {
                        if (goodsItem.goodsId == goods.goodsId) {
                          return false;
                        }
                        const l = lo.remove(goodses, (i) => i.goodsId == goodsItem.goodsId);
                      } else {
                        const l = lo.remove(
                          goodsItem.goodsInfoIds,
                          (a) =>
                            a !== goodsinfoId &&
                            marketing.getIn([0, 'goodses']).some((i) => i.get('goodsInfoIds').includes(a)),
                        );
                      }
                    }
                  });
                } else {
                  const goodsItem = immutable.fromJS(goods).set('goodsInfoIds', [goodsinfoId]).toJS();
                  // 没有营销活动
                  if (storeGoodsAndMarketing) {
                    // 判断当前组装数据中是否有店铺信息
                    // 有则追加 [storeId：[goodsItem, goodsItem]]
                    storeGoodsAndMarketing.push(goodsItem);
                  } else {
                    // 无则set新数据 [storeId：[goodsItem]]
                    item = item.set(storeId, [goodsItem]);
                  }
                  return false;
                }
              });
            });
          }
        });
      action.commonChange([
        { paths: 'main.goods.storeMarketing', value: storeMarketingMap.toJS() },
        { paths: 'main.goods.goodsMarketing', value: goodsMarketingMap.toJS() },
        { paths: 'main.goods.skuMarketingDict', value: skuMarketingDict.toJS() },
        { paths: 'main.goods.giftGoodsInfos', value: giftGoodsInfos.toJS() },
        { paths: 'main.storeMarketingGroup', value: item.toJS() },
      ]);
    },
    /**
     * 查询spu详情
     */
    async findSpuDetails(skuId) {
      const { defaltAddress } = getData().main
      let result = null;
      let token = Taro.getStorageSync('authInfo:token');
      //判断是否登录
      if (token) {
        try {
          result = await api.goodsBaseController.detailForShopCart(skuId, defaltAddress.deliveryAddressId || null);
        } catch (error) { }
      } else {
        try {
          result = await api.goodsBaseController.unLoginDetailForShopCart(skuId);
        } catch (error) { }
      }

      if (result) {
        //拼接规格值  照搬H5
        if (result.goodsSpecDetails) {
          result.goodsInfos.forEach((e) => {
            //遍历该规格项对应的所有规格值
            let specStr = result.goodsSpecDetails
              .filter((specDetail) => e.mockSpecDetailIds.includes(specDetail.specDetailId))
              .map((spec) => {
                return spec.detailName;
              })
              .join(' ');
            e.specText = specStr;
          });
        }

        //筛选出单条sku信息
        let goodsInfo = result.goodsInfos.find((item) => {
          return item.goodsInfoId == skuId;
        });

        //如果根据这个sku没找到对应商品，取第一个非失效SKU
        if (!goodsInfo) {
          goodsInfo = result.goodsInfos.find((item) => {
            return item.addedFlag === 1;
          });
        }

        //商品规格里面添加一个默认值
        if (result.goodsSpecs) {
          result.goodsSpecs.forEach((e) => {
            goodsInfo.mockSpecDetailIds.forEach((id) => {
              if (e.specDetailIds.includes(id)) {
                //默认选中第一个规格值
                e.defaultVal = id;
              }
            });
          });
        }

        dispatch({
          type: Command.init,
          payload: {
            main: {
              goodsDetail: result, //商品列表
              goodsInfo, //单挑sku信息
            },
          },
        });
        // 购物车小加载
        action.loadingWML(true);
        setTimeout(async () => {
          action.commonChange('main.retailSpecIsShow', true);
          action.loadingWML(false);
        }, 300);
      }
    },

    /**
     * 切换规格
     */
    async retailChoose(goodsSpecInfo) {
      let token = Taro.getStorageSync('authInfo:token');
      let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? await Taro.getStorageSync('mini::shopCartSku') : [];

      const {
        main: { sku, goodsInfoId, goodsDetail },
      } = getData();

      //切换的规格是当前的规格则不操作
      if (goodsInfoId == goodsSpecInfo.goodsInfoId) {
        return;
      }
      const buyGoodsInfos = [
        {
          goodsInfoId: goodsSpecInfo.goodsInfoId,
          price: goodsSpecInfo.price,
          buyCount: goodsSpecInfo.num,
        },
      ];
      const storeCouponMap = getData().main.purInfo.storeCouponMap;
      if (token) {
        // 调整添加sku和删除sku的顺序，让用户无感切换商品规格
        await api.purchaseBaseController.batchAdd({ goodsInfos: buyGoodsInfos });
        await action._deleteSku(goodsInfoId);
        // 先简单处理，重新调下init方法
        await this.pageInit();
      } else {
        //未登录状态下切换规格
        let goodsInfoIds = await goodsDetail.goodsInfos.map((item) => item.goodsInfoId);
        let currentIndex = await purchaseData.filter(
          (item) => item.goodsInfoId == goodsInfoIds.filter((index) => item.goodsInfoId == index),
        );
        //遍历当前spu下的所有skuids
        currentIndex.forEach((e) => {
          //根据当前的skuid找到存在本地的对应信息 根据goodsInfoId找到数组中对应的数据并替换
          let index = purchaseData.findIndex((item) => item.goodsInfoId == goodsInfoId);
          //修改skuid
          if (index >= 0) {
            purchaseData[index].goodsInfoId = goodsSpecInfo.goodsInfoId;
          }
        });
        //存到本地缓存
        await Taro.setStorage({
          key: 'mini::shopCartSku',
          data: purchaseData,
        });
        // 先简单处理，重新调下init方法
        await this.pageInit();
      }
      // 保留storeCouponMap字段
      action.commonChange('main.purInfo.storeCouponMap', storeCouponMap);
    },
  };
  return action;
};

export function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCShopCartMain'),
  };
}

export function skuPagination(skuMap) {
  let initialMap = new Map().set(1, { size: 0, index: 0 });
  return [...skuMap].reduce((pre, cur, index) => {
    if (cur[1] + pre.get(pre.size).size >= 6) {
      pre.set(pre.size, { size: pre.get(pre.size).size + cur[1], index: index });
      pre.set(pre.size + 1, { size: 0, index: index });
    } else {
      pre.set(pre.size, { size: pre.get(pre.size).size + cur[1], index: index });
    }
    return pre;
  }, initialMap);
}

export function formatArea(result) {
  for (let entries of result) {
    // 第一个
    let num2 = entries[1].index;
    if (entries[0] > 1) {
      let num1 = result.get(entries[0] - 1).index;
      result.get(entries[0]).area = formatArray(num1, num2);
    } else {
      result.get(entries[0]).area = formatArray(-1, num2);
    }
  }
}

export function formatArray(num1, num2) {
  if (num1 >= num2) {
    return false;
  }
  let res = [];
  for (let i = num1 + 1; i <= num2; i++) {
    res.push(i);
  }
  return res;
}

//create by moon https://github.com/creasy2010/moon
