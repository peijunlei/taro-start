import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit, immutable} from 'wmkit';
import api from 'api';
/**
 * 将数据转换成immutable对象
 * 将扁平的规格信息组装成层级结构
 * 根据当前sku设置规格项的默认选中值
 */
export const createImmutableData = ({skuId, goodsInfos, goods, goodsSpecs, goodsSpecDetails, images}) => {
  //1.获取当前sku标识
  const goodsInfoId = skuId;
  const goodsIm = immutable.fromJS(goods);

  //2.初始化购买数量,并获取当前sku详情
  let goodsInfo = immutable.fromJS({});
  let goodsInfosIm = immutable.fromJS(goodsInfos);
  goodsInfosIm = goodsInfosIm.map((single) => {
    //初始化购买数量为起订量,没有起订量的话默认我1
    single = single.set(
      'num',
      returnStockFlag(single.get('stock'), single.get('count')) ? 0 : single.get('count') || 1,
    );
    if (single.get('addedFlag') === 1) {
      goodsInfo = single;
    }
    return single;
  });

  //3.规格项与规格值详情匹配-1对多的结构
  let goodsSpecsIm = immutable.fromJS(goodsSpecs);
  let goodsSpecDetailsIm = immutable.fromJS(goodsSpecDetails);
  if (goodsSpecDetailsIm && goodsSpecDetailsIm.size > 0) {
    //规格值存在,才进行封装
    goodsSpecsIm = goodsSpecsIm.map((spe) => {
      return spe.set(
        'specDetails',
        goodsSpecDetailsIm.filter((det) => {
          return spe.get('specId') == det.get('specId');
        }),
      );
    });
    //4.根据当前sku信息,标记每个规格项的默认选中值
    goodsSpecsIm = goodsSpecsIm.map((spe) => {
      //遍历该规格项对应的所有规格值
      spe.get('specDetails') &&
        spe.get('specDetails').forEach((det) => {
          goodsInfo.get('mockSpecDetailIds').forEach((mockSpeDet) => {
            //找出当前sku对应spu每个规格项的规格值-(记录默认值)
            // if (mockSpeDet == det.get('specDetailId')) {
            //   spe = spe.set('defaultVal', mockSpeDet);
            //   return;
            // }
          });
        });
      return spe;
    });
  }

  //5.封装成选中spu
  const spuIm = {
    goodsInfo: goodsInfo,
    goodsInfos: goodsInfosIm,
    goods: goodsIm,
    goodsSpecs: goodsSpecsIm,
    goodsSpecDetails: goodsSpecDetailsIm,
    images,
  };

  return spuIm;
};

/**
 * 计算是否缺货
 *
 * @private
 */
export const returnStockFlag = (stock, minCount) => {
  //认定缺货的状态 >>> 库存小于等于0 或者 最少订货量大于库存(最少订货量量存在的时候)
  if (isNaN(stock) || isNaN(minCount)) {
    return true;
  }
  return stock <= 0 || (minCount ? minCount > stock : false);
};

/**
 * 计算并赋值新的规格项列表信息(主要是计算每个规格值是否灰化不可点击, 以及计算得出当前的sku)
 * @returns {any}
 */
export const calculateSpeInfo = ({goodsInfo, goodsInfoCache = immutable.Map(), goodsInfos, goodsSpecs, images}) => {
  let defaultValArr = immutable.List(); //临时存储每个规格项默认选中值

  //1.遍历spu所有规格项
  if (goodsSpecs && goodsSpecs.size > 0) {
    goodsSpecs = goodsSpecs.map((spe) => {
      let defaultVal = spe.get('defaultVal');
      defaultValArr = defaultValArr.push(defaultVal);

      /**以下是为了提高用户体验,让用户在当前选中的规格值情况下,灰化对应的不可点击的规格值*/
      //2.遍历当前规格项的所有规格值,找出需要灰化的规格值
      spe = spe.set(
        'specDetails',
        spe.get('specDetails').map((sdet) => {
          sdet = sdet.set('disabled', true); //默认灰化
          let leftList = goodsInfos.filter((item) => {
            return item.get('addedFlag') == 1;
          }); //匹配规格项值后剩余的sku,通过判断此List数量来决定是否灰化该规格值
          let checkedVal;

          //3.遍历所有规格项,拿当前需要判断灰化的规格值与其他规格项的选中规格值进行搭配-->筛选出剩余sku
          goodsSpecs.forEach((spec) => {
            if (spec.get('specId') == spe.get('specId')) {
              checkedVal = sdet.get('specDetailId'); //当前需要判断是否灰化的规格值
            } else {
              checkedVal = spec.get('defaultVal'); //有可能不存在:null(即取消选中规格值的时候)
            }

            //4.筛选出当前规格项每个规格值 与 其他规格项的默认规格值 匹配的sku们
            if (checkedVal) {
              //如果存在选中值,才进行筛选,若不存在(即该规格项未选中任意规格值),则不筛选
              leftList = leftList.filter((good) => {
                let filterFlag = false;
                good.get('mockSpecDetailIds').forEach((goodSpeDet) => {
                  if (checkedVal == goodSpeDet) {
                    //规格项相同,规格值相同
                    filterFlag = true;
                    return;
                  }
                });
                return filterFlag;
              });
            }
          });

          //5.若能够筛选出sku,则说明该规格值能够切换,则去除灰化
          if (leftList && leftList.size > 0) {
            sdet = sdet.set('disabled', false); //去除灰化
          }
          return sdet;
        }),
      );
      return spe;
    });
  }
  //6.若匹配所有规格值后,只剩余1个sku,则得到准确的需要展示的sku信息,若大于1,则说明用户未选中所有规格项
  //  !info.get('mockSpecDetailIds')是为了照顾无规格的商品
  const leftSkuList = goodsInfos.filter(
    (info) =>
      !info.get('mockSpecDetailIds') || info.get('mockSpecDetailIds').every((dId) => defaultValArr.contains(dId)),
  );
  if (leftSkuList && leftSkuList.size == 1) {
    goodsInfo = leftSkuList.get(0);
    //获取sku,并设置显示的图片
    if (!goodsInfo.get('goodsInfoImg') && images && images.length) {
      goodsInfoCache = goodsInfo.set('goodsInfoImg', images[0].artworkUrl || images[0]);
    } else {
      goodsInfoCache = goodsInfo;
    }
  } else {
    goodsInfo = immutable.Map();
  }
  return {goodsSpecs, goodsInfo, goodsInfoCache};
};

/**
 * 改变前几个规格项的规格值
 * @param specDetailId
 * @param index
 */
export const changeSpecDetail = (chosenSpu, specDetailId, index) => {
  let {goodsSpecs} = chosenSpu;
  chosenSpu.goodsSpecs = goodsSpecs.set(index, goodsSpecs.get(index).set('defaultVal', specDetailId)); //更改第index个规格项的选中值
  return {...calculateSpeInfo(chosenSpu)};
};

/**
 * 修改某个sku购买数量
 * @param chosenSpu
 * @param {any} num
 * @param {any} goodsInfoId
 * @returns {any}
 */
export const changeNum = (chosenSpu, {num, goodsInfoId}) => {
  //1.修改单个商品的购买数量
  let goodsInfo = chosenSpu.goodsInfo;

  goodsInfo = goodsInfo.set('num', num); //修改购买数量

  //2.之前准备购买的所有sku个数信息(sku标识,个数),用于切换回相同规格的时候能够回显采购数量
  let goodsInfos = chosenSpu.goodsInfos;
  goodsInfos = goodsInfos.map((info) => {
    if (info.get('goodsInfoId') == goodsInfoId) {
      info = info.set('num', num); //若购买数量大于0,则修改购买数量,以及修改价格
    }
    return info;
  });

  return {goodsInfo, goodsInfos};
};

/**
 * 立即购买
 * @param chosenSpu
 * @returns {Promise<any>}
 */
export const immediateBuy = async (chosenSpu, openGroupon, grouponNo, shareUserId) => {
  let buyGoodsInfo = chosenSpu.goodsInfo;
  if (buyGoodsInfo && buyGoodsInfo.get('goodsInfoId')) {
    if (WMkit.isLogin()) {
      // 验证
      let params: any = {
        goodsInfoId: buyGoodsInfo.get('goodsInfoId'),
        buyCount: buyGoodsInfo.get('num'),
        openGroupon: openGroupon,
        shareUserId: shareUserId,
      };
      if (grouponNo) {
        params = {
          goodsInfoId: buyGoodsInfo.get('goodsInfoId'),
          buyCount: buyGoodsInfo.get('num'),
          openGroupon: openGroupon,
          grouponNo: grouponNo,
          shareUserId: shareUserId,
        };
      }
      await api.grouponBaseController.vaildateGrouponStatusForOpenOrJoin(params);
      await api.tradeBaseController.grouponBuy(params);
      Taro.navigateTo({
        url: '/pages/package-C/order/order-confirm/index',
      });
    } else {
      Taro.navigateTo({
        url: '/pages/package-A/login/login/index',
      });
    }
  } else {
    Taro.showToast({
      title: '请先选择采购商品！',
      icon: 'none',
      duration: 2000,
    });
  }
};
