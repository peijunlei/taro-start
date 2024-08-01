import React, {useEffect, useState} from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';

import {detail, unloginNewDetail, spuSpec} from 'api/GoodsInfoBaseController';
import {checkGoods, immediateBuy} from 'api/TradeBaseController';

import {WMkit, pvUvStatics} from 'wmkit';
import {mergeData} from '@/wmkit/common/mergedata';

// 零售商品 - 规格弹窗
import RetailChoose2 from '@/pages/common/goods/retail-choose';
// 批发商品 - 规格弹窗
import WholesaleChoose2 from '@/pages/common/goods/wholesale-choose';
/**
 * 事件类型
 *
 * 0：浏览，1：点击，2：加购，3：下单
 */
type IEventType = 0 | 1 | 2 | 3;

interface IComponentProps {
  /**
   * 坑位类型
   *
   * 0-购物车，1-商品详情，2-商品列表，3-个人中心，4-会员中心，5-收藏商品，6-支付成功页，7-分类页，8-魔方
   */
  type: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  /**
   * 推荐坑位管理 - 设置
   */
  recommendConfig: {
    [key: string]: any;
  };
  /**
   * spu商品id
   */
  goodsId: string;
  /**
   * 零售商品 - 规格弹窗是否可见
   */
  retailVisible: boolean;
  /**
   * 批发商品 - 规格弹窗是否可见
   */
  wholesaleVisible: boolean;
  /**
   * sku商品详情
   */
  skuGoosInfos: {
    [key: string]: any;
  };
  /**
   * 获取购物车商品数量
   */
  getShopCartNumCallBack?: Function;
  /**
   * 隐藏某些组件
   */
  fnHideComponentCallBack?: Function;
}

/**
 * 【【营销重构迭代2-crmtest6-H5/小程序】收藏商品列表页、个人中心页以及购物车页的推荐商品模块，点击加购按钮后样式异常】
 * https://www.tapd.cn/69320090/bugtrace/bugs/view?bug_id=1169320090001105567
 *
 * 页面组件外挂 - 智能推荐规格弹窗
 * @param props
 * @returns
 */
const RecommendGoodsListModal: React.FC<IComponentProps> = (props) => {
  /**
   * 零售商品 - 规格弹窗是否可见
   */
  const [retailVisible, setRetailVisible] = useState(false);
  /**
   * 批发商品 - 规格弹窗是否可见
   */
  const [wholesaleVisible, setWholesaleVisible] = useState(false);
  /**
   * 商品详情数据
   */
  const [skuGoosInfos, setSkuGoosInfos] = useState<{[key: string]: any}>({});

  useEffect(() => {
    setRetailVisible(props?.retailVisible);
    setWholesaleVisible(props?.wholesaleVisible);
    setSkuGoosInfos(props?.skuGoosInfos);
  }, [props?.retailVisible, props?.wholesaleVisible, props?.skuGoosInfos]);

  /**
   * 立即购买
   */
  const fnDidConfirm = async (buyGoodsInfos) => {
    if (!Array.isArray(buyGoodsInfos)) return;

    const {type, recommendConfig, goodsId} = props;

    const skuList = buyGoodsInfos.map((item) => {
      return {
        skuId: item?.goodsInfoId,
        num: item?.buyCount,
      };
    });

    try {
      // 立即购买校验前置
      await checkGoods({
        tradeItems: skuList,
        tradeMarketingList: [],
        forceConfirm: false,
      });

      //修复立即购买之前加入购物车操作
      await immediateBuy({
        tradeItemRequests: skuList,
      });

      const params = `type=1&skuId=${goodsId}&type=${type}&recommendType=${recommendConfig?.tacticsType}`;
      Taro.navigateTo({
        url: `/pages/package-C/order/order-confirm/index?${params}`,
      });
    } catch (e) {
      let message = e?.message;
      if (['K080134'].includes(e?.code)) {
        message = '您没有预约购买资格';
      }

      message &&
        Taro.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
        });
    }
  };

  /**
   * 重置 - 操作
   */
  const fnResetState = () => {
    /**
     * 重置state
     */
    setRetailVisible(false);
    setWholesaleVisible(false);
    setSkuGoosInfos({});

    if (__TARO_ENV === 'weapp') {
      setTimeout(() => {
        Taro.showTabBar();
        props?.fnHideComponentCallBack?.(false);
      }, 1000);
    } else {
      Taro.showTabBar();
      props?.fnHideComponentCallBack?.(false);
    }
  };

  /**
   * 获取数据 - sku商品详情
   */
  const fnFindSkuInfo = async (skuId) => {
    // 是否已登录
    const isLogin = WMkit?.isLogin?.();

    let result = {} as any;
    if (isLogin) {
      result = await detail(skuId);
    } else {
      result = await unloginNewDetail(skuId);
    }

    const spec = await spuSpec(result?.goods?.goodsId);
    return mergeData(result, spec, skuGoosInfos?.goodsInfos);
  };

  /**
   * 匹配当前规格
   */
  const fnGetSkuInfo = async (skuId) => {
    const result = await fnFindSkuInfo(skuId);
    setSkuGoosInfos(result);

    return result?.goodsInfos?.find?.((e) => e.goodsInfoId === skuId) || {};
  };

  /**
   * 埋点
   */
  const fnClickGoods = async (eventType: IEventType) => {
    const {type, recommendConfig, goodsId} = props;

    pvUvStatics.buriedPoint({
      goodsId,
      eventType,
      // 0-热门推荐，1-基于商品相关性推荐，2-基于用户兴趣推荐
      recommendType: recommendConfig.tacticsType,
      type: type,
    });
  };

  /**
   * 规格弹窗 - 公共属性
   */
  const choose2Props = () => {
    return {
      list: skuGoosInfos,
      openType: '3',
      goodsBuyTypes: skuGoosInfos?.goods?.goodsBuyTypes,
      onClose: () => {
        fnResetState();
      },
      _didConfirm: (buyGoodsInfos) => fnDidConfirm(buyGoodsInfos),
      getCartNums: (num) => props?.getShopCartNumCallBack?.(num),
      specContainerStyle: {},
      chooseStyle: {
        bottom: 0,
      },
      /**
       * 埋点操作
       */
      _clickGoods: (eventType: IEventType) => {
        fnClickGoods(eventType);
      },
    };
  };

  return (
    <View>
      {props?.children}

      {/* 零售商品 - 规格弹窗 */}
      {retailVisible && skuGoosInfos && Object.keys(skuGoosInfos).length ? (
        <RetailChoose2 getSkuInfo={fnGetSkuInfo} {...choose2Props()} />
      ) : null}

      {/* 批发商品 - 规格弹窗 */}
      {wholesaleVisible && skuGoosInfos && Object.keys(skuGoosInfos).length ? (
        <WholesaleChoose2 {...choose2Props()} />
      ) : null}
    </View>
  );
};

export default RecommendGoodsListModal;
