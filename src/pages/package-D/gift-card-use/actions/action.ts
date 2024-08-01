import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {_, giftCard} from 'wmkit';
import {Const, cache} from 'config';
import {goodsDetailProper} from 'api/GoodsBaseController';
import lodash, {cloneDeep} from 'lodash';
import {getMarketings, showActivityPrice} from '@/wmkit/common/marketing';
import {getActualPurchasePrice} from '@/wmkit/common/actual-purchase-price';
import {add, mul} from '@/wmkit/common/util';
import {cashCardBuy, pickupCardBuy} from 'api/TradeBaseController';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    async addressInit() {
      let defaltAddress = null;
      let list = await api.customerDeliveryAddressBaseController.findAddressList();
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        // 省、市、区（县）、街道（乡）+ 详细地址
        item['addressInfo'] = _.getAddressInfoStr(item as any);
        if (item.isDefaltAddress != 0) {
          defaltAddress = item;
        }
      }
      if (!defaltAddress) {
        defaltAddress = list[0];
      }
      const address = Taro.getStorageSync('mini::shopCardAddress');
      if (Boolean(address) && address.deliveryAddressId) {
        // 是否有效
        const addr = list.find((item) => item.deliveryAddressId === address.deliveryAddressId);
        if (addr) {
          defaltAddress = addr;
        }
        //地址缓存
        Taro.setStorageSync('mini::confirmAddress', address);
        Taro.setStorageSync('mini::shopCardAddress', address);
      }
      // 检验是否需要完善四级地址
      if (defaltAddress && defaltAddress.deliveryAddressId) {
        const result = await api.platformAddressController.verifyAddress({
          provinceId: defaltAddress.provinceId,
          cityId: defaltAddress.cityId,
          areaId: defaltAddress.areaId,
          streetId: defaltAddress.streetId,
          longitude: defaltAddress.longitude,
          latitude: defaltAddress.latitude,
          dangaossAddrId: defaltAddress.dangaossAddrId,
        });
        if (result) {
          defaltAddress.needComplete = true;
        }
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            deliveryAddress: list,
            defaltAddress: defaltAddress || '',
          },
        },
      });
    },
    async _savaLocal() {
      const {
        main: {defaltAddress},
      } = getData();

      //地址缓存
      await Taro.setStorageSync('mini::confirmAddress', defaltAddress);
      await Taro.setStorageSync('mini::shopCardAddress', defaltAddress);
    },

    async getGiftCardUseConfig(userGiftCardId, type, cardStatus) {
      let {pageNum, pageSize} = getData().main;
      let program: any = {
        pageNum,
        pageSize,
      };
      let goodsList = [];
      const searchValue = getData().main.searchValue;
      if (type === '1') {
        program.userGiftCardId = userGiftCardId;
        program.likeGoodsName = searchValue;
      } else {
        program.giftCardId = userGiftCardId;
        program.likeGoodsName = searchValue;
      }
      let result = (type === '1'
        ? await api.GiftCardUseBaseController.queryGiftCard(program)
        : await api.GiftCardUseBaseController.queryGiftCardUnLogin(program)) as any;
      let goodsResult = (type === '1'
        ? await api.GiftCardUseBaseController.queryGoodsInfos(program)
        : await api.GiftCardUseBaseController.queryGoodsInfosUnLogin(program)) as any;

      // 获取商品的skuNos
      const list = (result.giftCard.openGroupType == 0
        ? goodsResult.goodsInfoPage.content
        : goodsResult.goodsGroupList.map((v) => v.goodsInfoList)
      ).flat();
      const skuNos = list.filter((el) => el.goodsType === 8).map((item) => item.goodsInfoNo);
      const goodsIdList = list.map((el) => el.goodsId);

      const restrictedGoodsList = await action.getRestrictedGoodsList(goodsIdList);
      const dgLimitList = await action.getDangaossRestrictedGoodsList(skuNos);
      if (result.giftCard.openGroupType == 0) {
        goodsList = goodsResult.goodsInfoPage.content.map((item) => {
          const restrictedFlag = restrictedGoodsList.find((i) => i.goodsId === item.goodsId)?.restrictedFlag;
          const dangaossRestrictedFlag = dgLimitList.find((i) => i.skuNo === item.goodsInfoNo)?.restrictedFlag;
          const flag = restrictedFlag || dangaossRestrictedFlag;
          return {
            ...item,
            stock: flag ? 0 : item.goodsStatus === 5 ? 9999999 : item.stock,
            goodsStatus: flag ? 99 : item.goodsStatus,
          };
        });
      } else {
        goodsList = goodsResult.goodsGroupList.map((item) => {
          const goodsInfoList = item.goodsInfoList.map((v) => {
            const restrictedFlag = restrictedGoodsList.find((i) => i.goodsId === v.goodsId)?.restrictedFlag;
            const dangaossRestrictedFlag = dgLimitList.find((i) => i.skuNo === v.goodsInfoNo)?.restrictedFlag;
            const flag = restrictedFlag || dangaossRestrictedFlag;
            return {
              ...v,
              stock: flag ? 0 : v.goodsStatus === 5 ? 9999999 : v.stock,
              goodsStatus: flag ? 99 : v.goodsStatus,
              scopeGoodsNum: item.checkNum,
            };
          });
          return {
            ...item,
            goodsInfoList,
          };
        });
      }
      // Taro.setNavigationBarTitle({title: result?.useConfig?.title || ''});
      const giftCardScopeGroupVOList = result?.giftCard?.giftCardScopeGroupVOList;
      // 未开启分组或者分组数量为1时scopeGoodsNum取giftCardScopeGroupVOList的checkNum
      let scopeGoodsNum;
      if (giftCardScopeGroupVOList?.length === 1) {
        scopeGoodsNum = giftCardScopeGroupVOList[0].checkNum;
      } else {
        scopeGoodsNum = result?.giftCard?.scopeGoodsNum;
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            type: type,
            cardStatus: cardStatus,
            useConfig: result?.useConfig || {},
            giftCard: {...result?.giftCard, scopeGoodsNum} || {},
            goodsList: goodsList || [],
            userGiftCardId,
            total: goodsResult.goodsInfoPage?.totalPages || 0,
            selectGoodsList: [],
            selectGroupList: [],
            selectedNum: 0,
            selectedPrice: 0,
            tradeItems: [],
            totalPrice: 0,
            totalBuyPoint: 0,
          },
        },
      });
    },

    async changeSkuNum(newGoodsInfo) {
      await action.commonChange('main.isLoading', true);
      const {
        main: {selectGoodsList, selectedNum, giftCard, selectGroupList, goodsList},
      } = getData();
      let newSelectGoodsList = cloneDeep(selectGoodsList);
      let newSelectGroupList = cloneDeep(selectGroupList);
      let newSelectedNum = 0;
      let index = newSelectGoodsList.findIndex((item) => item.goodsInfoId == newGoodsInfo.goodsInfoId);
      let index1 = newSelectGroupList.findIndex((item) => item == newGoodsInfo.groupId);
      if (index != -1) {
        newSelectGoodsList[index] = newGoodsInfo;
      } else {
        newSelectGoodsList.push(newGoodsInfo);
      }
      if (index1 != -1 && newGoodsInfo.addNum != 0) {
        newSelectGroupList[index1] = newGoodsInfo.groupId;
      } else if (index1 != -1 && newGoodsInfo.addNum == 0) {
        newSelectGroupList.splice(index1, 1);
      } else {
        newSelectGroupList.push(newGoodsInfo.groupId);
      }
      newSelectGoodsList.forEach((item) => {
        newSelectedNum += item.addNum;
      });

      newSelectGoodsList = newSelectGoodsList.filter((item) => {
        return item.addNum > 0;
      });

      dispatch({
        type: Command.init,
        payload: {
          main: {
            selectGoodsList: newSelectGoodsList,
            selectedNum: newSelectedNum,
            selectGroupList: newSelectGroupList,
          },
        },
      });
      const newGoodsInfocp = cloneDeep(newGoodsInfo);
      let isPass = true;
      // 任选不分组情况下，选中商品数量不能超过限制数量
      const {giftCardType, openGroupType, scopeGoodsNum, crossGroupNum} = giftCard;

      // debugger
      if (
        (giftCardType == 2 || giftCardType == 0) &&
        openGroupType == 0 &&
        newSelectedNum > scopeGoodsNum &&
        scopeGoodsNum !== null
      ) {
        setTimeout(() => {
          dispatch({
            type: Command.init,
            payload: {
              main: {
                selectGoodsList: cloneDeep(selectGoodsList),
                selectedNum: cloneDeep(selectedNum),
              },
            },
          });
          selectGoodsList.forEach((item) => {
            if (item.goodsInfoId === newGoodsInfo.goodsInfoId) {
              action.priceCalculation(item);
            } else {
              action.priceCalculation({
                ...newGoodsInfo,
                addNum: 0,
              });
            }
          });
        }, 100);
        await action._showToast(`最多可选${scopeGoodsNum}份商品`);
        isPass = false;
      }
      // 商品选择数量超过商品库存的情况
      let isOver = false;
      // 实际选购数量  = 选购数量 * 每份数量
      const actualNum = mul(newGoodsInfo.addNum, newGoodsInfo.portionNum);
      if (actualNum > newGoodsInfo.stock || newGoodsInfo.goodsStatus === 1) isOver = true;
      else if (newGoodsInfo.cardLimit && actualNum > newGoodsInfo.cardLimit) isOver = true;
      else if (newGoodsInfo.allLimit && actualNum > newGoodsInfo.allLimit) isOver = true;
      if (isOver) {
        setTimeout(() => {
          dispatch({
            type: Command.init,
            payload: {
              main: {
                selectGoodsList: cloneDeep(selectGoodsList),
                selectedNum: cloneDeep(selectedNum),
              },
            },
          });
          selectGoodsList.forEach((item) => {
            if (item.goodsInfoId === newGoodsInfo.goodsInfoId) {
              action.priceCalculation(item);
            } else {
              action.priceCalculation({
                ...newGoodsInfo,
                addNum: 0,
              });
            }
          });
        }, 100);
        await action._showToast('商品库存不足');
        isPass = false;
      }
      // debugger
      // 任选分组情况下，选中商品数量不能超过分组限制
      if (
        (giftCardType == 2 || giftCardType == 0) &&
        openGroupType == 1 &&
        newSelectGroupList.length > crossGroupNum &&
        crossGroupNum !== null
      ) {
        setTimeout(() => {
          dispatch({
            type: Command.init,
            payload: {
              main: {
                selectGoodsList: cloneDeep(selectGoodsList),
                selectedNum: cloneDeep(selectedNum),
                selectGroupList: cloneDeep(selectGroupList),
              },
            },
          });
          selectGoodsList.forEach((item) => {
            if (item.goodsInfoId === newGoodsInfo.goodsInfoId) {
              action.priceCalculation(item);
            } else {
              action.priceCalculation({
                ...newGoodsInfo,
                addNum: 0,
              });
            }
          });
        }, 100);

        await action._showToast(`最多可任选${crossGroupNum}个分组兑换商品`);
        isPass = false;
      }
      // 任选分组情况下，选中商品数量不能超过组内限
      if ((giftCardType == 2 || giftCardType == 0) && openGroupType == 1) {
        let checkNum;
        let selectGroupNum = 0;
        goodsList.forEach((item) => {
          if (item.id === newGoodsInfo.groupId) {
            checkNum = item.checkNum;
          }
        });
        newSelectGoodsList.forEach((item) => {
          if (item.groupId === newGoodsInfo.groupId) {
            selectGroupNum += item.addNum;
          }
        });

        if (selectGroupNum > checkNum && checkNum !== null) {
          setTimeout(() => {
            dispatch({
              type: Command.init,
              payload: {
                main: {
                  selectGoodsList: cloneDeep(selectGoodsList),
                  selectedNum: cloneDeep(selectedNum),
                  selectGroupList: cloneDeep(selectGroupList),
                },
              },
            });
            selectGoodsList.forEach((item) => {
              if (item.goodsInfoId === newGoodsInfo.goodsInfoId) {
                action.priceCalculation(item);
              } else {
                action.priceCalculation({
                  ...newGoodsInfo,
                  addNum: 0,
                });
              }
            });
          }, 100);
          await action._showToast(`当前分组最多可任选${checkNum}份商品`);
          isPass = false;
        }
      }
      if (isPass) action.priceCalculation(newGoodsInfocp);
      setTimeout(async () => {
        await action.commonChange('main.isLoading', false);
      }, 200);
    },
    //获取蛋糕叔叔限售的商品
    async getDangaossRestrictedGoodsList(skuNos: any[]) {
      const {defaltAddress} = getData().main;
      if (skuNos.length === 0) return [];
      const res = await api.tradeBaseController.getShopCartDangaossRestrictedGoods({
        skuNos,
        dangaossAddrId: defaltAddress.dangaossAddrId,
        platformAddrIds: [defaltAddress.provinceId, defaltAddress.cityId, defaltAddress.areaId, defaltAddress.streetId],
      });
      const list = res || [];
      return list;
    },
    //获取限售的商品
    async getRestrictedGoodsList(goodsIdList: any[]) {
      const {defaltAddress} = getData().main;
      const res = await api.tradeBaseController.getRestrictedByGoodsIds({
        goodsIdList,
        consigneeId: defaltAddress.deliveryAddressId,
      });
      const list = res?.goodsRestrictedTemplateVOList || [];
      return list;
    },
    // 价格计算
    async priceCalculation(goodsInfo) {
      // 价格计算开始
      let {tradeItems} = getData().main || {};
      tradeItems = cloneDeep(tradeItems);
      const portionNum = goodsInfo.portionNum;
      const priceType = goodsInfo.priceType;
      const intervalMinPrice = goodsInfo.intervalMinPrice;
      const marketPrice = goodsInfo.marketPrice;
      const exchangePrice = goodsInfo.exchangePrice;
      const buyPoint = goodsInfo.buyPoint;
      const marketingPluginLabels = goodsInfo.marketingPluginLabels;
      // 获取 - 阶梯价
      const stepPrice = fnGetIntervalPrice(goodsInfo);
      // 营销活动
      const marketings = getMarketings(marketingPluginLabels);
      // 活动价
      const price = showActivityPrice(marketings, priceType, intervalMinPrice, marketPrice);
      const {actualPurchasePrice} = getActualPurchasePrice(marketings)(price)({
        isOpenPaymember: false,
        isEnterpriseCustomer: false,
        activityPrice: exchangePrice,
      });
      const program = {
        skuId: goodsInfo.goodsInfoId,
        num: goodsInfo.addNum,
        portionNum,
        pluginType: 0,
        price: exchangePrice || stepPrice || actualPurchasePrice || marketPrice,
        buyPoint: exchangePrice ? 0 : buyPoint,
      };
      tradeItems = [tradeItems, program].flat();
      tradeItems.filter((item) => {
        return item.num > 0;
      });
      tradeItems = removeDuplicateBySkuId(tradeItems).filter((item) => item.num !== 0);
      const totalPrice =
        tradeItems.length > 0
          ? tradeItems
              .map((item) => mul(item.price, item.num)) // 兑换价*数量
              .reduce(function (acr, cur) {
                return add(acr || 0, cur || 0);
              })
          : 0;
      const totalBuyPoint =
        tradeItems.length > 0
          ? tradeItems
              .map((item) => mul(mul(item.buyPoint, item.num), item.portionNum))
              .reduce(function (acr, cur) {
                return add(acr || 0, cur || 0);
              })
          : 0;
      dispatch({
        type: Command.init,
        payload: {
          main: {
            tradeItems: tradeItems,
            totalPrice: totalPrice,
            totalBuyPoint: totalBuyPoint,
          },
        },
      });
      // 价格计算结束
    },

    async searchGoodsList(searchValue) {
      await action.commonChange('main.isLoading', true);
      let {giftCard, userGiftCardId, type} = getData().main;
      let goodsList = [];
      let goodsResult = (type === '1'
        ? await api.GiftCardUseBaseController.queryGoodsInfos({
            userGiftCardId,
            likeGoodsName: searchValue,
          })
        : await api.GiftCardUseBaseController.queryGoodsInfosUnLogin({
            giftCardId: userGiftCardId,
            likeGoodsName: searchValue,
          })) as any;
      const openGroupType = giftCard.openGroupType;
      // 获取商品的skuNos
      const list = (openGroupType == 0
        ? goodsResult.goodsInfoPage.content
        : goodsResult.goodsGroupList.map((v) => v.goodsInfoList)
      ).flat();
      const skuNos = list.filter((el) => el.goodsType === 8).map((item) => item.goodsInfoNo);
      const goodsIdList = list.map((el) => el.goodsId);

      const restrictedGoodsList = await action.getRestrictedGoodsList(goodsIdList);
      const dgLimitList = await action.getDangaossRestrictedGoodsList(skuNos);
      if (giftCard.openGroupType == 0) {
        goodsList = goodsResult.goodsInfoPage.content.map((item) => {
          const restrictedFlag = restrictedGoodsList.find((i) => i.goodsId === item.goodsId)?.restrictedFlag;
          const dangaossRestrictedFlag = dgLimitList.find((i) => i.skuNo === item.goodsInfoNo)?.restrictedFlag;
          const flag = restrictedFlag || dangaossRestrictedFlag;
          return {
            ...item,
            stock: flag ? 0 : item.goodsStatus === 5 ? 9999999 : item.stock,
            goodsStatus: flag ? 99 : item.goodsStatus,
          };
        });
      } else {
        goodsList = goodsResult.goodsGroupList.map((item) => {
          const goodsInfoList = item.goodsInfoList.map((v) => {
            const restrictedFlag = restrictedGoodsList.find((i) => i.goodsId === v.goodsId)?.restrictedFlag;
            const dangaossRestrictedFlag = dgLimitList.find((i) => i.skuNo === v.goodsInfoNo)?.restrictedFlag;
            const flag = restrictedFlag || dangaossRestrictedFlag;
            return {
              ...v,
              stock: flag ? 0 : v.goodsStatus === 5 ? 9999999 : v.stock,
              goodsStatus: flag ? 99 : v.goodsStatus,
              scopeGoodsNum: item.checkNum,
            };
          });
          return {
            ...item,
            goodsInfoList,
          };
        });
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            goodsList: cloneDeep(goodsList) || [],
            searchValue: searchValue,
          },
        },
      });
      await action.commonChange('main.isLoading', false);
    },

    async _showToast(title) {
      await Taro.showToast({
        title,
        icon: 'none',
        duration: 2000,
      });
    },

    // 商品清单弹框
    showSelectedGoodsModal(value) {
      action.commonChange('main.selectedGoodsModal', value);
    },

    // 清空已选商品
    clearSelectedGoods() {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            selectGoodsList: [],
            selectedNum: 0,
            selectGroupList: [],
            selectedPrice: 0,
            tradeItems: [],
            totalPrice: 0,
            totalBuyPoint: 0,
          },
        },
      });
    },

    /**
     * 查询下一页
     */
    async nextPage() {
      let {pageNum, pageSize, total, isLoading, giftCard} = getData().main;
      if (giftCard.openGroupType === 1) return; // 分组情况下不支持分页
      if (pageNum + 1 == total || isLoading) return;
      await action.commonChange('main.isLoading', true);
      let num = pageNum + 1;
      dispatch({
        type: Command.init,
        payload: {
          main: {
            pageNum: num,
          },
        },
      });
      try {
        await this.queryNext();
      } finally {
        await action.commonChange('main.isLoading', false);
      }
    },

    async queryNext() {
      let {pageNum, pageSize, userGiftCardId, goodsList, searchValue, giftCard, type} = getData().main;
      let goodsResult = (type === '1'
        ? await api.GiftCardUseBaseController.queryGoodsInfos({
            userGiftCardId,
            pageNum,
            pageSize,
            likeGoodsName: searchValue,
          })
        : await api.GiftCardUseBaseController.queryGoodsInfosUnLogin({
            giftCardId: userGiftCardId,
            pageNum,
            pageSize,
            likeGoodsName: searchValue,
          })) as any;
      // 获取商品的skuNos
      const list = goodsResult.goodsInfoPage.content;
      const skuNos = list.filter((el) => el.goodsType === 8).map((item) => item.goodsInfoNo);
      const goodsIdList = list.map((el) => el.goodsId);

      const restrictedGoodsList = await action.getRestrictedGoodsList(goodsIdList);
      const dgLimitList = await action.getDangaossRestrictedGoodsList(skuNos);
      const _goodsList = goodsResult.goodsInfoPage.content.map((item) => {
        const restrictedFlag = restrictedGoodsList.find((i) => i.goodsId === item.goodsId)?.restrictedFlag;
        const dangaossRestrictedFlag = dgLimitList.find((i) => i.skuNo === item.goodsInfoNo)?.restrictedFlag;
        const flag = restrictedFlag || dangaossRestrictedFlag;
        return {
          ...item,
          stock: flag ? 0 : item.goodsStatus === 5 ? 9999999 : item.stock,
          goodsStatus: flag ? 99 : item.goodsStatus,
        };
      });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            goodsList: goodsList.concat(_goodsList || []),
          },
        },
      });
    },

    /**
     * 显示或者隐藏模态框
     * @param goodsInfoId
     */
    showOrHideGoodsDetail(goodsInfo = {}) {
      const {goodsInfoId, goodsId, goodsType, thirdBrandId, goodsInfoNo, goodsNo} = goodsInfo as any;
      action.commonChange('main.selectedId', goodsInfoId);
      if (goodsInfoId !== undefined) {
        this.getGoodsDescribe(goodsInfoId);
        this.initRestrictedTemplate(goodsId);
        if (goodsType === 8) {
          this.initDangaoRestricted(goodsNo, goodsInfoNo, thirdBrandId);
        }
      } else {
        action.commonChange([{paths: 'main.descData', value: undefined}]);
      }
    },

    async getGoodsDescribe(goodsInfoId: string) {
      let result = await goodsDetailProper(goodsInfoId);
      action.commonChange([
        {paths: 'main.descData', value: result.goodsDetail + (result.subGoodsDetail || '')},
        {paths: 'main.images', value: result.images || []},
      ]);
    },
    async initRestrictedTemplate(goodsId: string) {
      const {defaltAddress: address} = getData().main;
      const res = (await api.goodsBaseController.getGoodsRestrictedTemplateInfo({
        goodsId,
        provinceId: address.provinceId,
        cityId: address.cityId,
        areaId: address.areaId,
        streetId: address.streetId,
      })) as any;
      action.commonChange([{paths: 'main.goodsRestrictedTemplateVO', value: res.goodsRestrictedTemplateVO}]);
    },
    async initDangaoRestricted(goodsNo: string, skuNo: string, thirdBrandId: string) {
      const {defaltAddress: address} = getData().main;
      const res = (await api.goodsBaseController.getGoodsDangaoRestrictedInfo({
        goodsNo,
        skuNo,
        thirdBrandId,
        dangaossAddrId: address.dangaossAddrId,
        platformAddrIds: address.provinceId
          ? [address.provinceId, address.cityId, address.areaId, address.streetId]
          : null,
      })) as any;
      action.commonChange([{paths: 'main.dangaoRestrictedVO', value: res}]);
    },

    judgeGoOn(selectGoodsList: any[]) {
      // goodstype===6 只能出现一次 不能和其他商品一起出现 num只能为1
      // goodstype===7 只能出现一次 不能和其他商品一起出现 num可以是一种多个

      let isGo = true;
      let goodstype6 = selectGoodsList.filter((item) => item.goodsType === 6);
      let goodstype7 = selectGoodsList.filter((item) => item.goodsType === 7);
      const notGoodstype = selectGoodsList.filter((item) => item.goodsType !== 6 && item.goodsType !== 7);
      if (goodstype6.length === 1 && goodstype7.length === 1) {
        isGo = false;
        action._showToast('卡管直冲商品和卡管卡券商品不能一起下单');
      }
      if (goodstype6.length === 1 && notGoodstype.length > 0) {
        isGo = false;
        action._showToast('卡管直冲商品不能和其他商品一起下单');
      }
      if (goodstype6.length > 1) {
        isGo = false;
        action._showToast('卡管直冲商品只能选择一种');
      }
      if (goodstype7.length === 1 && notGoodstype.length > 0) {
        isGo = false;
        action._showToast('卡管卡券商品不能和其他商品一起下单');
      }
      if (goodstype7.length > 1) {
        isGo = false;
        action._showToast('卡管卡券商品只能选择一种');
      }
      if (goodstype6.length === 1 && (goodstype6[0].addNum ?? goodstype6[0].num) !== 1) {
        isGo = false;
        action._showToast('卡管直冲商品只能选择一件');
      }
      return isGo;
    },
    // 提交订单方法
    async submitOrder() {
      let {
        main: {selectGoodsList, goodsList, giftCard, totalPrice, defaltAddress, userGiftCardId},
      } = getData();
      // debugger
      selectGoodsList = selectGoodsList.map((item) => ({
        ...item,
        addNum: mul(item.addNum, item.portionNum) || item.addNum,
      }));
      let tradeItems = [];
      const {giftCardType, openGroupType, cardRuleTypes, balance} = giftCard;
      if (giftCardType == 0 && cardRuleTypes?.includes(3)) {
        // 不支持补差价
        if (balance < totalPrice) {
          return Taro.showToast({title: '商品金额超出卡余额', icon: 'none'});
        }
      }
      if (giftCardType == 1 && openGroupType == 1) {
        goodsList.forEach((item) => {
          item.goodsInfoList.forEach((item1) => {
            tradeItems.push({
              skuId: item1.goodsInfoId,
              num: item1.portionNum || 1,
              goodsType: item1.goodsType,
            });
          });
        });
      } else if (giftCardType == 1 && openGroupType == 0) {
        tradeItems = goodsList.map((item) => {
          return {
            skuId: item.goodsInfoId,
            num: item.portionNum || 1,
            goodsType: item.goodsType,
          };
        });
      } else {
        if (giftCardType === 2) {
          tradeItems = selectGoodsList.map((item) => {
            return {
              skuId: item.goodsInfoId,
              num: item.addNum,
              groupId: item.groupId,
              portionNum: item.portionNum,
              goodsType: item.goodsType,
            };
          });
        } else {
          tradeItems = selectGoodsList.map((item) => {
            return {
              skuId: item.goodsInfoId,
              num: item.addNum,
              goodsType: item.goodsType,
            };
          });
        }
      }
      if (giftCardType === 2) {
        //不分组
        if (openGroupType === 0) {
          const scopeNum = giftCard.scopeGoodsNum;
          let allNum = tradeItems.reduce((acc, cur) => {
            return acc + _.div(cur.num, cur.portionNum);
          }, 0);
          if (allNum < scopeNum) {
            return Taro.showToast({title: `请至少选择${scopeNum}份商品`, icon: 'none'});
          }
        } else {
          // 分组 -> 跨组 & 不跨组
          const crossGroupType = giftCard.crossGroupType; //0 不跨组 1 跨组

          // 每组应该购买的数量 和 实际每组购买的数量 必需相等,且每一组都必须选择
          const originObj = new Map();
          goodsList.forEach((item) => {
            originObj.set(item.id, {
              checkNum: item.checkNum,
              groupName: item.groupName,
            });
          });
          // 实际每组购买的数量
          const obj = new Map();
          tradeItems.forEach((item) => {
            // 相同gropId的商品数量相加
            obj.set(item.groupId, (obj.get(item.groupId) || 0) + _.div(item.num, item.portionNum));
          });
          if (crossGroupType === 0) {
            // 每一组都必须要选择 且选择的数量必须等于checkNum
            for (let [key, value] of originObj) {
              if (!obj.has(key) || obj.get(key) !== value.checkNum) {
                return Taro.showToast({title: `请选择${value.groupName}组的${value.checkNum}份商品`, icon: 'none'});
              }
            }
          } else if (crossGroupType === 1) {
            const crossGroupNum = giftCard.crossGroupNum; // 可选的分组数量
            // 必须选择crossGroupNum个分组 且选择的数量必须等于checkNum
            if (obj.size !== crossGroupNum) {
              return Taro.showToast({title: `请选择任意${crossGroupNum}个分组中的商品`, icon: 'none'});
            } else {
              for (let [key, value] of obj) {
                if (value !== originObj.get(key).checkNum) {
                  return Taro.showToast({
                    title: `请选择${originObj.get(key).groupName}组的${originObj.get(key).checkNum}份商品`,
                    icon: 'none',
                  });
                }
              }
            }
          }
        }
      }
      // debugger
      const isGo = action.judgeGoOn(tradeItems);
      if (!isGo) return;
      action.clearSelectedGoods();
      try {
        const dangaoObj = {
          dangaossAddrId: defaltAddress.dangaossAddrId,
          platformAddrIds: defaltAddress.provinceId
            ? [defaltAddress.provinceId, defaltAddress.cityId, defaltAddress.areaId, defaltAddress.streetId]
            : null,
        };
        if (giftCardType == 0) {
          const params = {
            tradeItemRequests: tradeItems,
            cashCardId: userGiftCardId,
            ...dangaoObj,
          };
          await cashCardBuy(params);
          Taro.setStorageSync(cache.ORDER_CONFIRM_PARAMS, {...params, type: 'cashCardBuy'});
          Taro.navigateTo({url: '/pages/package-C/order/order-confirm/index'});
        } else if ([1, 2].includes(giftCardType)) {
          const params = {
            goodsInfoIds: tradeItems.map((e) => e.skuId),
            tradeItems,
            userGiftCardId,
            ...dangaoObj,
          };
          await pickupCardBuy(params);
          Taro.setStorageSync(cache.ORDER_CONFIRM_PARAMS, {...params, type: 'pickupCardBuy'});
          Taro.navigateTo({url: '/pages/package-C/order/order-confirm/index'});
        } else {
          throw new Error('unknow giftCardType');
        }
      } catch (e) {
        const {code, message} = e;
        Taro.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
        });
      }
    },
  };

  return action;
};

/**
 * 获取 - 阶梯价
 *
 * 根据阶梯条件 拿到 对应的阶梯价
 */
export const fnGetIntervalPrice = (params: any) => {
  if (!params || !Object.keys(params).length) return;

  const {priceType, addNum, intervalPriceList} = params;
  if (typeof priceType !== 'number' || typeof addNum !== 'number') return;
  if (!Array.isArray(intervalPriceList) || !intervalPriceList.length) return;
  // 只有批发商品才有阶梯价
  if (priceType !== 1) return;

  /**
   * 获取匹配项
   */
  const obj = lodash.findLast(intervalPriceList || [], (item) => addNum >= item?.count);
  return obj?.price;
};

// 定义一个函数，接受一个数组作为参数
function removeDuplicateBySkuId(arr) {
  // 定义一个空对象，用来存储已经出现过的skuId
  let seen = {};
  // 定义一个空数组，用来存储去重后的结果
  let result = [];
  // 遍历原数组，从后往前
  for (let i = arr.length - 1; i >= 0; i--) {
    // 获取当前元素的skuId
    let skuId = arr[i].skuId;
    // 判断当前skuId是否已经出现过
    if (seen[skuId]) {
      // 如果已经出现过，跳过当前元素，继续下一次循环
      // continue;
    } else {
      // 如果没有出现过，把当前元素放入结果数组的开头
      result.unshift(arr[i]);
      // 把当前skuId存入seen对象，标记为已出现
      seen[skuId] = true;
    }
  }
  // 返回结果数组
  return result;
}

function getData(): IAllReducerProps {
  return {
    main: getReducerData('GiftCardUseMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
