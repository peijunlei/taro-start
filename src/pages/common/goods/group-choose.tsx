import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './wholesale-choose.less';
import './group-choose.less';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import specCloseIcon from '@/assets/image/goods/goods-list/spec-close.png';
import {toFixed2} from '@/utils/priceFormat';
import {WMkit, _, immutable} from 'wmkit';
import {cache} from 'config';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import {
  createImmutableData,
  calculateSpeInfo,
  changeSpecDetail,
  returnStockFlag,
  changeNum,
  immediateBuy,
} from './group-change';
import CartCount from '@/pages/common/goods/cart-count';
interface IWholesaleChooseP {
  onClose: (e) => any;
  grouponData: any;
  data: any;
  onClose?: Function;
  dataCallBack?: Function;
  openGroupon: boolean;
  grouponNo?: string;
  shareUserId?: string;
  [name: string]: any;
}

export default class GroupChoose extends Component<IWholesaleChooseP, any> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const goods = nextProps.data || {};
    const thisGoods = this.props.data || {};
    if (!immutable.is(immutable.fromJS(goods), immutable.fromJS(thisGoods)) && nextProps.data && nextProps.data.skuId) {
      // 组装层级结构的规格数据
      const dataIm = createImmutableData(nextProps.data);
      // 主要是计算每个规格值是否灰化不可点击, 以及计算得出当前的sku
      this.setState({
        ...dataIm,
        ...calculateSpeInfo(dataIm),
      });
    }
  }

  componentDidMount() {
    // 组装层级结构的规格数据
    const dataIm = createImmutableData(this.props.data);
    // 主要是计算每个规格值是否灰化不可点击, 以及计算得出当前的sku
    this.setState({
      ...dataIm,
      ...calculateSpeInfo(dataIm),
    });
  }

  componentWillUnmount() {}

  render() {
    const {visible, changeSpecVisible, grouponData, openGroupon, onClose} = this.props;
    const {
      goods = immutable.Map(),
      goodsInfo = immutable.Map(),
      goodsInfoCache = immutable.Map(), //缓存之前选择的sku,防止用户取消选中规格时,无信息展示的问题
      goodsSpecs = immutable.List(),
    } = this.state;

    const grouponActivity = grouponData ? immutable.fromJS(grouponData).get('grouponActivity') : immutable.Map();

    const noSpecStockFlag = returnStockFlag(goodsInfo.get('stock'), goodsInfo.get('count'));

    // 划线价
    const lineShowPrice = this._originPriceInfo(goods.get('linePrice'), goodsInfo, goodsInfoCache);

    // 社交电商相关内容显示与否
    const social = goodsInfo.get('distributionGoodsAudit') == 2 ? true : false;
    const isDistributor = WMkit.isShowDistributionButton();
    //禁用分享赚
    const socialDisabled = false;
    /** 检查 - 操作按钮是否禁用 - 操作 */
    const isDisabled = this.checkIsDisabledFn(goodsInfo?.toJS?.());
    const packageGoodsRelsInfo = goodsInfo.get('packageGoodsRelsInfo');

    return (
      <View
        className="spuSpecModal group_choose"
        onClick={(e) => {
          onClose(e);
        }}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          // e.preventDefault();
        }}
      >
        <View
          className="spec-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View
            className="spec-close-wrap"
            onClick={(e) => {
              onClose(e);
            }}
          >
            <Image src={specCloseIcon} className="spec-close-img" />
          </View>
          {/* 商品信息 */}
          <View className="goods-info">
            {/* 图片 */}
            <Image
              src={goodsInfoCache.get('goodsInfoImg') ? goodsInfoCache.get('goodsInfoImg') : noDataIcon}
              className="goods-img"
            />
            <View className="goods-content">
              {/* 规格标题 */}
              {/* <View className="goods-spec-title">{goods ? goods.get('goodsName') : ' '}</View> */}

              <View className="whole-goods-price">
                <Text className="unit">￥</Text>
                <Text className="price">
                  {social
                    ? _.addZero(goodsInfo.get('grouponPrice'))
                    : _.addZero(goodsInfo.get('grouponPrice') || goodsInfoCache.get('grouponPrice'))}
                </Text>
                {!!lineShowPrice && <Text className="old-price">¥{_.addZero(lineShowPrice)}</Text>}
              </View>
              {/* {!social && !isDistributor && (
                  <MarketingLabel
                    marketingLabels={goodsInfo.get('marketingLabels') || goodsInfoCache.get('marketingLabels')}
                    couponLabels={goodsInfo.get('couponLabels') || goodsInfoCache.get('couponLabels')}
                  />
                )} */}
              <MarketingLabel
                grouponLabel={goodsInfo.get('grouponLabel')}
                marketingLabels={goodsInfo.get('marketingLabels') || goodsInfoCache.get('marketingLabels')}
                couponLabels={goodsInfo.get('couponLabels') || goodsInfoCache.get('couponLabels')}
              />
            </View>
          </View>
          {/*滚动区域*/}
          <ScrollView scrollY className="up-content">
            {/* 规格项 集合最多展示4个 每一项规格默认选中第一个选项*/}
            <View className="spec-content">
              {/*sku选择规格*/}
              {goodsSpecs &&
                goodsSpecs.size > 0 &&
                goodsSpecs.toJS().map((spec, index) => {
                  return (
                    <View className="spec-box" id={index} key={index}>
                      {/* 标题 */}
                      <View className="spec-title">{spec.specName}</View>
                      <View className="spec-list">
                        {spec.specDetails.map((det, _index) => {
                          return (
                            <View
                              key={_index}
                              onClick={
                                spec.defaultVal != det.specDetailId && det.disabled
                                  ? () => {}
                                  : () => {
                                      this._changeSpecDetail(
                                        spec.defaultVal == det.specDetailId ? null : det.specDetailId,
                                        index,
                                      );
                                    }
                              }
                              className={
                                spec.defaultVal == det.specDetailId
                                  ? 'spec-item active-item'
                                  : det.disabled
                                  ? 'spec-item invalid-item'
                                  : 'spec-item'
                              }
                            >
                              <Text className="spec-text">{det.detailName}</Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
            </View>

            {packageGoodsRelsInfo && packageGoodsRelsInfo.toJS().length > 0 && (
              <View className="package-goods">
                <View className="title">套餐内已包含</View>
                <View className="goods-list">
                  {packageGoodsRelsInfo.toJS().map((item) => {
                    return (
                      <View
                        className="goods-item"
                        onClick={(e) => {
                          onClose(e);
                          setTimeout(() => {
                            Taro.navigateTo({
                              url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`,
                            });
                          }, 200);
                        }}
                      >
                        <View className="goods-item-img">
                          <Image src={item.goodsInfoImg ? item.goodsInfoImg : noDataIcon} className="item-img" />
                        </View>
                        <View className="item-content">
                          <Text className="content-name">{`${item.goodsInfoName} x${item.packageNum}`}</Text>
                          <Text className="content-spec">{item.specText}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            <View className="no-spec-content">
              {/* 标题 */}
              <View className="no-spec-title">
                <Text className="text">数量</Text>
                <Text className="nums">
                  {goodsInfo.get('count') ? goodsInfo.get('count') + '起订' : ''}
                  {goodsInfo.get('count') && goodsInfo.get('maxCount') ? '，' : ''}
                  {goodsInfo.get('maxCount') ? '可购' + goodsInfo.get('maxCount') : ''}
                </Text>
                <Text className="nums">
                  库存
                  {goodsInfo.get('stock') || 0}
                  {goods.get('goodsUnit')}
                </Text>
              </View>
              {/* 步进器 */}
              {goodsInfo?.size ? (
                <CartCount
                  count={noSpecStockFlag ? 0 : goodsInfo.get('num')}
                  inventory={this._maxNum(goodsInfo)}
                  getNum={(count) => this._changeNum(count, goodsInfo.get('stock'), goodsInfo.get('goodsInfoId'))}
                  min={goodsInfo?.get?.('count') ?? 0}
                />
              ) : null}
            </View>
          </ScrollView>
          {/* 加入购物车按钮 */}
          <View className="spec-add-cart">
            <View className="left-nums">
              已选<Text className="high">{goodsInfo.get('num') || '0'}</Text>
              {goods.get('goodsUnit')}
            </View>
            <View
              className={`group-btn${isDisabled ? ' gray-cart-btn' : ''}`}
              onClick={() => {
                if (isDisabled) return;

                this._immediateBuy(openGroupon);
                if (this.props.onClose) {
                  this.props.onClose();
                }
              }}
            >
              <Text className="price">￥{_.addZero(goodsInfo.get('grouponPrice'))}</Text>
              <Text className="name">{grouponActivity ? grouponActivity.get('grouponNum') : 0}人拼</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 检查 - 操作按钮是否禁用 - 操作
   * @param goodsInfo
   * @returns
   */
  checkIsDisabledFn = (goodsInfo) => {
    if (!goodsInfo || !Object.keys(goodsInfo).length) return true;

    const stock = goodsInfo?.stock || 0;
    const count = goodsInfo?.count || 0;
    const num = goodsInfo?.num || 0;

    /** 起订量count、库存stock、步进器数量num */
    if (stock <= 0) return true;
    if (count > 0 && count > stock) return true;
    if (!num || num < count) return true;

    return false;
  };

  //获取步进器数字
  _getCount = (count) => {
    console.log(count);
  };

  /**
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示sku市场价
   * @private
   */
  _originPriceInfo = (linePrice, goodsInfoIm, goodsInfoCache) => {
    if (linePrice) {
      return linePrice;
    } else {
      return goodsInfoIm.get('marketPrice') || goodsInfoCache.get('marketPrice');
    }
  };

  /**
   * 切换选中前n-1个规格项的规格值
   * @param specDetailId
   * @param index
   * @private
   */
  _changeSpecDetail = (specDetailId, index) => {
    this.setState(changeSpecDetail(this.state, specDetailId, index), () => {
      if (this.props.dataCallBack) {
        this.props.dataCallBack(this.state.goodsInfo.toJS(), this.state.goodsSpecs.toJS());
      }
    });
  };
  // 限定量
  _maxNum = (goodsInfo) => {
    if (goodsInfo.get('maxCount') && goodsInfo.get('maxCount') < goodsInfo.get('stock')) {
      return goodsInfo.get('maxCount');
    } else {
      return goodsInfo.get('stock');
    }
  };

  /**
   * 用户改变sku购买数量
   * @param num 数量
   * @param stock 库存
   * @param goodsInfoId sku标识
   * @private
   */
  _changeNum = (savedNum, stock, goodsInfoId) => {
    savedNum = stock > 0 ? (savedNum < stock ? savedNum : stock) : 0;
    this.setState(changeNum(this.state, {num: savedNum, goodsInfoId}));
  };

  /**
   * 立即购买
   */
  _immediateBuy = async (openGroupon) => {
    //  开团
    if (openGroupon) {
      await immediateBuy(this.state, openGroupon, this.props.grouponNo, this.props.shareUserId);
    } else {
      await immediateBuy(this.state, openGroupon, this.props.grouponNo, this.props.shareUserId);
    }
  };
}
