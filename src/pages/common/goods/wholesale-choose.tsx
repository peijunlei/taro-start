import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './wholesale-choose.less';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import specCloseIcon from '@/assets/image/goods/goods-list/spec-close.png';
import rArrowIcon from '@/assets/image/common/arrow-white.png';
import { toFixed2 } from '@/utils/priceFormat';
import purchaseBaseController from 'api/PurchaseBaseController';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import CartCount from '@/pages/common/goods/cart-count';
//更新购物车角标
import { getShopCartNum, immutable } from 'wmkit';
import { getGlobalData } from '@/service/config';
import lodash from 'lodash';

let close = null;
let cartNum = 0;
interface IWholesaleChooseP {
  onClose: (e) => any;
  list: any;
  //加入购物车数据数量
  getCartNums?: (e) => any;
  [name: string]: any;
}

interface IWholesaleChooseS {
  minPrice: number;
  maxPrice: number;
  minPoint: number;
  maxPoint: number;
  newGoodsSpecs: any;
  savedBuyGoodsInfos: any;
  buyGoodsInfos: any;
  showIntervalFlag: boolean;
  selfIntervalPrices: any;
  lineShowPrice: number;
  fadeState: boolean;
  stop: boolean;
}
export default class WholesaleChoose extends Component<IWholesaleChooseP, IWholesaleChooseS> {
  static defaultProps = {
    list: {
      goods: {},
      goodsInfos: [
        {
          stock: 0,
          marketingLabels: [],
        },
      ],
      goodsIntervalPrices: [
        {
          type: null,
        },
      ],
    },
    goodsBuyTypes: '0',
    chooseStyle: {
      bottom: 0,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      minPrice: 0,
      maxPrice: 0,
      minPoint: 0,
      maxPoint: 0,
      //新组装后的数据
      newGoodsSpecs: [],
      //存储曾经购买过的数量 以及 购买的金额
      savedBuyGoodsInfos: [],
      //当前准备购买的数量 以及 购买的金额
      buyGoodsInfos: [],
      //显示阶梯价格弹框
      showIntervalFlag: false,
      selfIntervalPrices: [],
      lineShowPrice: 0,
      // 黑色蒙层淡入淡出效果
      fadeState: true,
      stop: true,
    };
  }

  componentDidMount() {
    //数据重新组合
    this._dataRegroup(this.props.list);
    //获取最高价 最低价
    this._getMinMaxPrice(this.props.list.goods, this.props.list.goodsInfos);
    //划线价
    this.setState({
      lineShowPrice: this._originPriceInfo(this.props.list.goods.linePrice, this.props.list.goodsInfos),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      //数据重新组合
      this._dataRegroup(nextProps.list);
      //获取最高价 最低价
      this._getMinMaxPrice(nextProps.list.goods, nextProps.list.goodsInfos);
      //划线价
      this.setState({
        lineShowPrice: this._originPriceInfo(this.props.list.goods.linePrice, this.props.list.goodsInfos),
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(close);
  }

  render() {
    const { list, onClose, openType, specContainerStyle, chooseStyle } = this.props;
    const {
      minPrice,
      maxPrice,
      minPoint,
      maxPoint,
      newGoodsSpecs,
      buyGoodsInfos,
      showIntervalFlag,
      selfIntervalPrices,
      lineShowPrice,
    } = this.state;
    // 当前规格页已购买几件
    const goodsCount = buyGoodsInfos.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    const goodsUnit = list.goods.goodsUnit;
    let goodsLabels = list.goods && list.goods.goodsLabelList ? list.goods.goodsLabelList : [];
    goodsLabels = goodsLabels.filter((v) => v.labelVisible);
    goodsLabels = goodsLabels.sort((a, b) => {
      return a.labelSort - b.labelSort;
    });
    return (
      <View
        style={chooseStyle}
        className={this.state.fadeState ? 'spuSpecModal fade-in' : 'spuSpecModal fade-out'}
        onClick={(e) => {
          this.showAnimate();
          close = setTimeout(() => {
            onClose(e);
          }, 200);
        }}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          if (this.state.stop) {
            e.preventDefault();
          }
          // e.preventDefault();
        }}
      >
        <View
          className={this.state.fadeState ? 'spec-container fade-in-up' : 'spec-container fade-in-down'}
          style={specContainerStyle || {}}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Image
            src={specCloseIcon}
            className="spec-close"
            onClick={(e) => {
              this.showAnimate();
              close = setTimeout(() => {
                onClose(e);
              }, 200);
            }}
          />
          {/* 商品信息 */}
          <View className="goods-info" onClick={() => this.setState({ showIntervalFlag: false })}>
            {/* 图片 */}
            <View>
              <Image src={list.goods.goodsImg ? list.goods.goodsImg : noDataIcon} className="goods-img" />
              {/* <View>{ list.goods.goodsName }</View> */}
            </View>
            <View className="goods-content">
              {/* 规格标题 */}
              {/* <View className="goods-spec-title">{list.goods.goodsName ? list.goods.goodsName : null}</View> */}
              {list.goods.priceType == 1 && list.goods.allowPriceSet == 0 ? (
                /* 不允许独立设价 */
                <ScrollView
                  scrollX
                  onTouchStart={() =>
                    this.setState({
                      stop: false,
                    })
                  }
                  onTouchEnd={() =>
                    this.setState({
                      stop: true,
                    })
                  }
                  className="scroll-view"
                  style={{ height: 'auto' }}
                >
                  <View className="no-price-box">
                    {this._showSpuIntervalPrices().map((item, index) => {
                      return (
                        <View className="no-goods-price" id={index} key={index}>
                          <View className="up-price">
                            <Text className="unit1">￥</Text>
                            <Text className="price1">{toFixed2(item.price)}</Text>
                          </View>
                          <View className="down-nums">
                            ≥{item.count}
                            {goodsUnit}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              ) : (
                /* 允许独立设置价格 */
                <View className="whole-goods-price">
                  {(minPoint > 0 || maxPoint > 0) && (
                    <Text className="price-point">
                      {minPoint == maxPoint ? minPoint : minPoint + '~' + maxPoint}
                      <Text className="point-title">积分</Text>+
                    </Text>
                  )}

                  <Text className="unit">￥</Text>
                  <Text className="price">
                    {minPrice == maxPrice
                      ? toFixed2(minPrice || 0)
                      : toFixed2(minPrice || 0) + '~' + toFixed2(maxPrice || 0)}
                  </Text>
                  {!!lineShowPrice && <Text className="old-price">￥{toFixed2(lineShowPrice)}</Text>}
                </View>
              )}

              {/* 阶梯价 折扣 */}
              {list.goods.priceType == 1 && (
                <View className="vip-content">
                  <View className="l-tag">
                    <Text className="tag-text">阶梯价</Text>
                  </View>
                  {/* <View className="vip-info">
                      <View className="svip">
                        <Text className="svip-text">SVIP</Text>
                      </View>
                      <View className="dist">
                        <Text className="dist-text">8.5折</Text>
                      </View>
                    </View> */}
                </View>
              )}

              {newGoodsSpecs && newGoodsSpecs.length != 0 && (
                <View className="goods-label-box">
                  <MarketingLabel
                    noWhiteCover
                    marketingLabels={immutable.fromJS(list.goodsInfos[0].marketingLabels)}
                    couponLabels={immutable.fromJS(list.goodsInfos[0].couponLabels)}
                    goodsLabel={immutable.fromJS(goodsLabels)}
                  />
                </View>
              )}
            </View>
          </View>
          {/*滚动区域*/}
          <ScrollView scrollY className="up-content">
            {/* 规格项 集合最多展示4个 每一项规格默认选中第一个选项*/}
            {newGoodsSpecs.length > 0 ? (
              <View className="spec-content" onClick={() => this.setState({ showIntervalFlag: false })}>
                {newGoodsSpecs.map((item, index) => {
                  if (index == newGoodsSpecs.length - 1) {
                    return;
                  }
                  return (
                    <View className="spec-box" id={index} key={index}>
                      {/* 标题 */}
                      <View className="spec-title">{item.specName}</View>
                      <View className="spec-list">
                        {item.specDetails &&
                          item.specDetails.length > 0 &&
                          item.specDetails.map((v) => {
                            return (
                              <View
                                className={`spec-item ${item.defaultVal == v.specDetailId ? 'active-item' : ''}`}
                                onClick={() => this._chooseSpecDet(index, v.specDetailId)}
                                key={v.specDetailId}
                              >
                                <Text className="spec-text">{v.detailName}</Text>
                              </View>
                            );
                          })}
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : null}

            {/* 最后一个规格项 带步进器*/}
            {newGoodsSpecs.length > 0 ? (
              <View className="last-spec-content">
                {/* 标题 */}
                <View className="last-spec-title">{newGoodsSpecs[newGoodsSpecs.length - 1].specName}</View>
                {newGoodsSpecs[newGoodsSpecs.length - 1].specDetails &&
                  newGoodsSpecs[newGoodsSpecs.length - 1].specDetails.map((item, i) => {
                    return (
                      <View className="last-spec-box" id={i} key={item.goodsInfoId}>
                        <View className="l-content">
                          {/* 规格内容 */}
                          <Text className="last-spec-text">{item.detailName}</Text>
                          {/* 价格 减折 */}
                          <View className="price-coupon">
                            <View className="l-price">
                              <Text className="unit">￥</Text>
                              {/* <Text className="price">{item.price}</Text> */}
                              <Text className="price">
                                {this._calculateGoodsMaxPrice(item, item.intervalPrices)}
                                {/*{this._calculateGoodsPrice(item, item.intervalPrices).toFixed(2)}*/}
                              </Text>
                            </View>

                            <View className="step-box">
                              {/* 优惠 */}
                              <MarketingLabel
                                noWhiteCover
                                marketingLabels={immutable.fromJS(item.marketingLabels)}
                                couponLabels={immutable.fromJS(item.couponLabels)}
                              />
                              {/* 阶梯价 */}
                              {list.goods.priceType == 1 && list.goods.allowPriceSet == 1 && (
                                <View
                                  className="show-step"
                                  onClick={() => this._showSkuIntervalPrices(item.intervalPrices)}
                                >
                                  <Text className="show-step-text">阶梯价</Text>
                                  <Image src={rArrowIcon} className="step-icon" />
                                </View>
                              )}

                              {/* 阶梯价弹窗 */}
                              {showIntervalFlag && (
                                <View
                                  className="step-price-modal"
                                  onClick={() => this.setState({ showIntervalFlag: false })}
                                >
                                  <ScrollView className="view-box" scrollX>
                                    {selfIntervalPrices
                                      .sort((a, b) => a.count - b.count)
                                      .map((v, i) => {
                                        return (
                                          <View className="no-goods-price" id={i} key={i}>
                                            <View className="up-price">
                                              <Text className="unit1">￥</Text>
                                              <Text className="price1">{toFixed2(v.price)}</Text>
                                            </View>
                                            <View className="down-nums">
                                              ≥{v.count}
                                              {goodsUnit}
                                            </View>
                                          </View>
                                        );
                                      })}
                                  </ScrollView>
                                </View>
                              )}
                            </View>
                          </View>
                        </View>
                        {/* 步进器 */}
                        <View>
                          <View className="stock-unit">
                            库存{item.stock > 9999 ? '9999+' : item.stock}
                            {item.unit}
                          </View>
                          <CartCount
                            count={item.num}
                            inventory={item.stock}
                            getNum={(count) => {
                              this._getCount(count, i, item.goodsInfoId, item.price);
                            }}
                          />
                        </View>
                      </View>
                    );
                  })}
              </View>
            ) : null}

            {/* 如果不存在规格*/}
            {newGoodsSpecs.length == 0 ? (
              <View className="no-spec-content">
                {/* 标题 */}
                <View className="no-spec-title">
                  <Text className="text">数量</Text>
                  <Text className="nums">
                    库存{list.goodsInfos[0].stock} {list.goods.goodsUnit}
                  </Text>
                </View>
                {/* 步进器 */}
                <CartCount
                  count={0}
                  inventory={list.goodsInfos[0].stock}
                  getNum={(count) =>
                    this._getCount(count, 0, list.goodsInfos[0].goodsInfoId, list.goodsInfos[0].salePrice)
                  }
                />
              </View>
            ) : null}
          </ScrollView>

          {/* 加入购物车按钮 */}
          {openType == '1'
            ? this.renderGoodsDetailButtom()
            : openType == '3'
              ? this.renderGoodListButtom()
              : this.renderSpecButtom()}
        </View>
      </View>
    );
  }

  //商品列表点击规格，只展示加入购物车
  renderGoodListButtom = () => {
    const { list, onClose, goodsBuyTypes } = this.props;
    const { buyGoodsInfos } = this.state;
    // 当前规格页已购买几件
    const goodsCount = buyGoodsInfos.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    //goodsBuyTypes下单方式 0：加入购物车 1：立即购买

    return (
      <View className="spec-add-cart">
        <View className="left-nums">
          已选<Text className="high">{goodsCount + ''}</Text>
          {list.goods.goodsUnit}
        </View>
        <View className="two-btn">
          <View
            className={goodsCount > 0 ? 'spec-add-cart-btn' : 'spec-add-cart-btn gray-cart-btn'}
            onClick={(e) => {
              if (goodsCount == 0) {
                return;
              }
              this._addCart();
              this.showAnimate();
              close = setTimeout(() => {
                onClose(e);
              }, 200);
            }}
          >
            加入购物车
          </View>
        </View>
      </View>
    );
  };

  //商品详情页点击规格底部按钮
  renderSpecButtom = () => {
    const { list, onClose, goodsBuyTypes } = this.props;
    const { buyGoodsInfos } = this.state;
    // 当前规格页已购买几件
    const goodsCount = buyGoodsInfos.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    //goodsBuyTypes下单方式 0：加入购物车 1：立即购买

    return (
      <View className="spec-add-cart">
        <View className="left-nums">
          已选<Text className="high">{goodsCount + ''}</Text>
          {list.goods.goodsUnit}
        </View>

        <View className="two-btn">
          {goodsBuyTypes.indexOf('0') > -1 && (
            <View
              className={goodsCount > 0 ? 'spec-add-cart-btn' : 'add-cart-btn gray-cart-btn'}
              onClick={(e) => {
                if (goodsCount == 0) {
                  return;
                }
                this._addCart();
                this.showAnimate();
                close = setTimeout(() => {
                  onClose(e);
                }, 200);
              }}
            >
              加入购物车
            </View>
          )}
          {goodsBuyTypes.indexOf('1') > -1 && (
            <View
              className={goodsCount > 0 ? 'spec-pay-btn' : 'add-cart-btn gray-cart-btn'}
              onClick={(e) => {
                if (goodsCount == 0) {
                  return;
                }
                this._pay();
                this.showAnimate();
                close = setTimeout(() => {
                  onClose(e);
                }, 200);
              }}
            >
              立即购买
            </View>
          )}
        </View>
      </View>
    );
  };
  //计算sku阶梯价格
  _calculateGoodsPrice(sku: any, intervalPrices: any) {
    if (!intervalPrices) {
      return sku.price || 0.0;
    }
    //算所有满足当前商品数量的阶梯价格集合
    const priceList = intervalPrices.filter((price) => price.count <= sku.num);
    //缺货状态下 求阶梯价最小值
    if (sku.stock == 0 && intervalPrices.length > 0) {
      return intervalPrices.sort((a, b) => a.price - b.price)[0].price || 0.0;
    }
    if (priceList.length > 0) {
      //算出阶梯价
      return priceList.sort((a, b) => a.price - b.price)[0].price || 0.0;
    } else {
      //算出原价
      return sku.price || 0.0;
    }
  }
  _calculateGoodsMaxPrice(sku: any, intervalPrices: any) {
    const intervalPrices_item = lodash.findLast(intervalPrices || [], (item) => sku?.num >= item?.count);
    return toFixed2(intervalPrices_item?.price ?? sku?.price ?? 0);
  }
  //商品详情底部点击
  renderGoodsDetailButtom = () => {
    const { list, onClose, isPay } = this.props;
    const { buyGoodsInfos } = this.state;
    // 当前规格页已购买几件
    const goodsCount = buyGoodsInfos.reduce((sumCount, info) => sumCount + info.buyCount, 0);

    return (
      <View className="spec-add-cart">
        <View className="left-nums">
          已选<Text className="high">{goodsCount + ''}</Text>
          {list.goods.goodsUnit}
        </View>
        <View className="two-btn">
          {isPay && (
            <View
              className={goodsCount > 0 ? 'pay-btn' : 'add-cart-btn gray-cart-btn'}
              onClick={(e) => {
                if (goodsCount == 0) {
                  return;
                }
                this._pay();
                this.showAnimate();
                close = setTimeout(() => {
                  onClose(e);
                }, 200);
              }}
            >
              确定
            </View>
          )}
          {!isPay && (
            <View
              className={goodsCount > 0 ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
              onClick={(e) => {
                if (goodsCount == 0) {
                  return;
                }
                this._addCart();
                this.showAnimate();
                close = setTimeout(() => {
                  onClose(e);
                }, 200);
              }}
            >
              确定
            </View>
          )}
        </View>
      </View>
    );
  };

  //立即购买
  _pay = async () => {
    let { buyGoodsInfos } = this.state;
    let token = Taro.getStorageSync('authInfo:token');
    //如果已经登录
    if (token) {
      this.props._didConfirm(buyGoodsInfos);
    } else {
      Taro.navigateTo({
        url: '/pages/package-A/login/login/index',
      });
    }
  };

  /**
   * 数据重新组合
   * @param goods
   * @private
   */
  _dataRegroup = (content) => {
    const {
      goods, //商品信息
      goodsSpecDetails, //规格值集合
      goodsSpecs, //商品规格项集合
      goodsInfos, //sku信息
    } = content;
    let newGoodsSpecs = [];
    //以规格项的数组长度为基准 重新组装数据
    if (goodsSpecs) {
      let lastIndex = goodsSpecs.length - 1;
      goodsSpecs.forEach((spec, index) => {
        newGoodsSpecs.push({
          //给新组装后的数据添加值
          defaultVal: spec.defaultVal, //默认选中第一个规格值
          specName: spec.specName, //规格名称
          goodsId: spec.goodsId, //商品id
          specId: spec.specId, //规格id
          specDetailIds: spec.specDetailIds, //规格值id集合
          specDetails: this._getSpecDetails(
            //规格值详情
            spec.specDetailIds, //规格值id
            goodsSpecDetails, //规格值集合
            index, //当前的下标
            lastIndex, //最后一项规格项下标
            goods, //商品信息
            goodsInfos, //sku信息
            goodsSpecs, //规格项详情
          ), // 获取规格值详情
        });
      });
    }
    this.setState({
      //新组装后的数据
      newGoodsSpecs,
    });
  };

  /**
   * 获取规格值详情
   * @param specDetailIds //规格值id集合
   * @param goodsSpecDetails 规格值集合
   * @param index     //当前下标
   * @param lastIndex  //最后一项规格项下标
   * @param goods  //商品信息
   * @param goodsInfos  //sku信息
   * @param goodsSpecs  //规格项详情
   * @private
   */
  _getSpecDetails = (specDetailIds, goodsSpecDetails, index, lastIndex, goods, goodsInfos, goodsSpecs) => {
    let details = [];
    if (index != lastIndex) {
      specDetailIds.forEach((id) => {
        //筛选出符合要求的对象（规格值集合中等于当前id的规格值）
        let item = goodsSpecDetails.find((val) => val.specDetailId === id);
        //判断每一项规格值是否置灰不可点
        let newItem = this.isDisabled(item, goodsSpecs, goodsInfos);
        details.push(newItem);
      });
    } else {
      //判断如果是最后一项规格项
      details = this._getLastSpecDetails(specDetailIds, goods, goodsInfos, goodsSpecs, goodsSpecDetails);
    }
    return details;
  };

  /**
   * 判断每一项规格值是否置灰不可点
   * @param specDetailsItem //规格值
   * @param goodsSpecs //规格项详情
   * @param goodsInfos //sku信息
   * @private
   */
  isDisabled = (specDetailsItem, goodsSpecs, goodsInfos) => {
    //新增一个字段，默认所有的规格值全部置灰
    specDetailsItem.disabled = true;
    let checkedVal;
    let infos;
    goodsSpecs.forEach((e, index) => {
      if (index < goodsSpecs.length - 1) {
        if (e.specId == specDetailsItem.specId) {
          checkedVal = specDetailsItem.specDetailId; //当前需要判断是否灰化的规格值
        } else {
          checkedVal = e.defaultVal; //有可能不存在:null(即取消选中规格值的时候)
        }
        if (checkedVal) {
          //如果存在选中值,才进行筛选,若不存在(即该规格项未选中任意规格值),则不筛选
          infos = goodsInfos.filter((item) => {
            let filterFlag = false;
            item.mockSpecDetailIds.forEach((goodSpeDet) => {
              if (checkedVal == goodSpeDet) {
                //规格项相同,规格值相同
                filterFlag = true;
                return;
              }
            });
            return filterFlag;
          });
        }
      }
    });
    //若能够筛选出sku,则说明该规格值能够切换,则去除灰化
    if (infos && infos.length > 0) {
      specDetailsItem.disabled = false; //去除灰化
    }
    return specDetailsItem;
  };

  /**
   * 获取最后一个规格项的所有规格值的内容
   * @param goodsSpecs
   * @param goodsInfos
   * @private
   */
  _getLastSpecDetails = (specDetailIds, goods, goodsInfos, goodsSpecs, goodsSpecDetails) => {
    let details = []; //返回的结果
    let mockSpecDetailIds = []; //需要匹配的id集合
    let buyGoodsInfos = []; //当前购买的数量 价格
    const { savedBuyGoodsInfos } = this.state;
    //规格详情
    let specDetail = [];
    //将下标不是最后一项的默认规格id筛选出来
    goodsSpecs.forEach((e, i) => {
      if (i != goodsSpecs.length - 1) {
        mockSpecDetailIds.push(e.defaultVal);
      }
    });

    //已最后一项规格值的id数组进行循环 去goodsInfos下面捞数据 拼接数组
    specDetailIds.forEach((id, index) => {
      let arr = [...mockSpecDetailIds];
      arr.push(id);
      let item = goodsInfos.find((v) => JSON.stringify(v.mockSpecDetailIds) == JSON.stringify(arr)); //判断两个数组是否相等
      specDetail.push(item);
      //在规格里查找库存不为零的第一个index设为stockId
      let stockId = specDetail.findIndex((item) => item.stock > 0);
      if (item) {
        //如果存在 捞数据取到之前购买的价格 数量
        let saveBuyItem = savedBuyGoodsInfos.find((v) => v.goodsInfoId == item.goodsInfoId);
        //判断经购买过的数量 以及 购买的金额是否存在
        if (savedBuyGoodsInfos.length > 0 && saveBuyItem) {
          details.push({
            goodsInfoId: item.goodsInfoId, //Skuid
            price: saveBuyItem.price, //价格
            couponLabels: item.couponLabels, //优惠券信息
            stock: item.stock, //库存
            unit: goods.goodsUnit, //单位
            num: saveBuyItem.buyCount, //步进器数字
            detailName: goodsSpecDetails.find((item) => item.specDetailId == id).detailName, //名称
            marketingLabels: item.marketingLabels,
            intervalPrices: this.getIntervalPrices(item), //获取intervalPrices阶梯价
          });
          //当前购买的数量 价格
          buyGoodsInfos.push(saveBuyItem);
          this.setState({
            buyGoodsInfos,
          });
        } else {
          //满足该条件不允许独立设价 展示阶梯价
          let price = item.salePrice;
          if (goods.priceType == 1 && goods.allowPriceSet == 0) {
            this._showSpuIntervalPrices().forEach((e) => {
              if (e.count == 1) {
                price = e.price;
              }
            });
          }
          //设置步进器为1时候的buyGoodsInfos（当前购买商品的数量，id，价格），可以放进下边的if里
          let itemGoods = {
            buyCount: 1,
            goodsInfoId: item.goodsInfoId,
            price: price,
          };
          //当index等于库存不为零的第一个商品的index，步进器置为1
          if (index == stockId) {
            details.push({
              goodsInfoId: item.goodsInfoId, //Skuid
              price: price, //价格
              couponLabels: item.couponLabels, //优惠券信息
              stock: item.stock, //库存
              unit: goods.goodsUnit, //单位
              num: 1, //步进器数字
              detailName: goodsSpecDetails.find((item) => item.specDetailId == id).detailName, //名称
              marketingLabels: item.marketingLabels,
              intervalPrices: this.getIntervalPrices(item), //获取intervalPrices阶梯价
            });
            buyGoodsInfos.push(itemGoods);
            this.setState({
              buyGoodsInfos,
            });
          } else {
            //当index等于库存为零或者是库存大于0的非第一个商品的index，步进器置为0
            details.push({
              goodsInfoId: item.goodsInfoId, //Skuid
              price: price, //价格
              couponLabels: item.couponLabels, //优惠券信息
              stock: item.stock, //库存
              unit: goods.goodsUnit, //单位
              num: 0, //步进器数字
              detailName: goodsSpecDetails.find((item) => item.specDetailId == id).detailName, //名称
              marketingLabels: item.marketingLabels,
              intervalPrices: this.getIntervalPrices(item), //获取intervalPrices阶梯价
            });
          }
        }
      }
    });
    return details;
  };

  /**
   * 获取阶梯价
   * @param goodsIntervalPrices
   * @param goodsInfos
   * @private
   */
  getIntervalPrices = (item) => {
    const {
      list: { goodsIntervalPrices },
    } = this.props;
    let prices = [];
    if (goodsIntervalPrices.length > 0) {
      goodsIntervalPrices.forEach((e) => {
        if (item.intervalPriceIds.includes(e.intervalPriceId)) {
          prices.push({
            id: e.intervalPriceId,
            price: e.price,
            count: e.count,
          });
        }
      });
    } else {
      prices.push({
        id: 0,
        price: item.salePrice,
        count: 1,
      });
    }
    return prices;
  };

  /**
   * 获取最低,最高价 获取积分
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getMinMaxPrice = (goods, goodsInfos) => {
    let minPrice = 0;
    let maxPrice = 0;
    let minPoint = 0;
    let maxPoint = 0;
    if (goods.priceType == 1) {
      //是否有按订货量区间设价
      goodsInfos.forEach((info, index) => {
        if (index == 0) {
          minPrice = info.intervalMinPrice;
          maxPrice = info.intervalMaxPrice;
        } else {
          minPrice = info.intervalMinPrice < minPrice ? info.intervalMinPrice : minPrice;
          maxPrice = info.intervalMaxPrice > maxPrice ? info.intervalMaxPrice : maxPrice;
        }
      });
    } else {
      goodsInfos.forEach((info, index) => {
        if (index == 0) {
          minPrice = info.salePrice;
          maxPrice = info.salePrice;
          minPoint = info.buyPoint;
          maxPoint = info.buyPoint;
        } else {
          minPrice = info.salePrice < minPrice ? info.salePrice : minPrice;
          maxPrice = info.salePrice > maxPrice ? info.salePrice : maxPrice;
          minPoint = info.buyPoint < minPrice ? info.buyPoint : minPoint;
          maxPoint = info.buyPoint > maxPoint ? info.buyPoint : maxPoint;
        }
      });
    }
    this.setState({
      minPrice: minPrice,
      maxPrice: maxPrice,
      minPoint: minPoint,
      maxPoint: maxPoint,
    });
  };

  /**
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示最高市场价
   * @private
   */
  _originPriceInfo = (linePrice, goodsInfos) => {
    let token = Taro.getStorageSync('authInfo:token');
    if (linePrice) {
      return linePrice;
    } else {
      // if (token) {
      //   // 已登录时,找出最高的市场价
      //   let maxMarketPrice = null;
      //   goodsInfos.forEach((info, index) => {
      //     if (index == 0) {
      //       maxMarketPrice = info.marketPrice;
      //     } else {
      //       maxMarketPrice = info.marketPrice > maxMarketPrice ? info.marketPrice : maxMarketPrice;
      //     }
      //   });
      //   return maxMarketPrice;
      // } else {
      return null;
      // }
    }
  };

  /**
   * 选择规格值
   * @param goods
   * @param goodsInfos
   * @private
   */
  _chooseSpecDet = (index, id) => {
    const { list } = this.props;
    let newList = { ...list };
    newList.goodsSpecs[index].defaultVal = id;
    //每切换一次规格值 就清除当前购买的信息
    this.setState(
      {
        buyGoodsInfos: [],
        // savedBuyGoodsInfos: []
      },
      () => {
        //重新组合数据
        this._dataRegroup(newList);
      },
    );
  };

  /**
   * 步进器记录
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getCount = (count, index, goodsInfoId, price) => {
    let { newGoodsSpecs } = this.state;
    let cutGoodsSpecs = [...newGoodsSpecs];
    if (count < 0) {
      return;
    }
    count = parseInt(count);
    if(!count) {
      price = 0;
    }

    const {
      list: { goods },
    } = this.props;
    //满足该条件不允许独立设价 展示阶梯价
    let newPrice = price;
    if (goods.priceType == 1 && goods.allowPriceSet == 0) {
      this._showSpuIntervalPrices().forEach((e) => {
        if (e.count == count) {
          newPrice = e.price;
        }
      });
    }

    if (cutGoodsSpecs.length > 0) {
      cutGoodsSpecs[cutGoodsSpecs.length - 1].specDetails[index].num = count;
      cutGoodsSpecs[cutGoodsSpecs.length - 1].specDetails[index].price = newPrice;
    }
    //存储曾经购买过的数量 以及 购买的金额
    this._saveGoodsInfo(count, goodsInfoId, price);
    //存储当前购买的数量 以及 购买的金额
    this._buyGoodsInfo(count, goodsInfoId, price);
    this.setState({
      newGoodsSpecs: cutGoodsSpecs,
    });
  };

  /**
   * 存储曾经购买过的数量 以及 购买的金额
   * @param count
   * @param goodsInfoId
   * @param price
   * @private
   */
  _saveGoodsInfo = (buyCount, goodsInfoId, price) => {
    this.setState({
      savedBuyGoodsInfos: this.filterData(this.state.savedBuyGoodsInfos, goodsInfoId, price, buyCount),
    });
  };

  /**
   * 存储当前购买的数量 以及 购买的金额
   * @param count
   * @param goodsInfoId
   * @param price
   * @private
   */
  _buyGoodsInfo = (buyCount, goodsInfoId, price) => {
    this.setState({
      buyGoodsInfos: this.filterData(this.state.buyGoodsInfos, goodsInfoId, price, buyCount),
    });
  };

  /**
   * 筛选数据
   * @param saveGoodsInfo
   * @param goodsInfoId
   * @param price
   * @param buyCount
   * @private
   */
  filterData = (list, goodsInfoId, price, buyCount) => {
    let saveGoodsInfo = [...list];
    //判断该规格值信息是否存在
    let index = saveGoodsInfo.findIndex((item) => item.goodsInfoId == goodsInfoId);
    if (index > -1) {
      saveGoodsInfo[index].buyCount = buyCount;
      saveGoodsInfo[index].price = price;
    } else {
      saveGoodsInfo.push({ goodsInfoId, price, buyCount });
    }
    //判断步进器是否为0
    if (buyCount == 0) {
      saveGoodsInfo.splice(index, 1);
    }

    return saveGoodsInfo;
  };

  /**
   * 不允许独立设价 展示阶梯价格
   * @param goodsIntervalPrices
   * @private
   */
  _showSpuIntervalPrices = () => {
    const {
      list: { goodsIntervalPrices },
    } = this.props;
    //将type为0的数据筛选出来
    const price = goodsIntervalPrices.filter((item) => item.type == 0);
    return price;
  };

  /**
   * 加入购物车
   * @param savedBuyGoodsInfos //曾经购买过的
   * @param buyGoodsInfos//当前购买过的
   * @private
   */
  _addCart = async () => {
    const {_clickGoods} = this.props;
    let {buyGoodsInfos, newGoodsSpecs, } = this.state;
    let token = Taro.getStorageSync('authInfo:token');
    typeof _clickGoods === 'function' && _clickGoods(2); // 埋点 0：浏览，1：点击，2：加购，3：下单
    let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? Taro.getStorageSync('mini::shopCartSku') : [];

    if(Array.isArray(buyGoodsInfos) && buyGoodsInfos.length && Array.isArray(newGoodsSpecs) && newGoodsSpecs.length) {
      newGoodsSpecs.forEach(item => {
        item?.specDetails?.forEach?.(item02 => {
          buyGoodsInfos?.forEach?.(item03 => {
            if(item02?.goodsInfoId === item03?.goodsInfoId) {
              const intervalPrices_item = lodash.findLast(item02?.intervalPrices || [], (item) => item03?.buyCount >= item?.count);
              item03['price'] = intervalPrices_item?.price ?? item03['price'] ?? 0;
            }
          })
        })
      })
    }

    //如果已经登录
    if (token) {
      try {
        await purchaseBaseController.batchAdd({ goodsInfos: buyGoodsInfos });
        Taro.showToast({
          title: '加入成功',
          icon: 'none',
          duration: 2000,
        });
      } catch (error) {
        Taro.showToast({
          title: error,
          icon: 'none',
          duration: 2000,
        });
      }
    } else {
      //遍历当前购买过的商品
      buyGoodsInfos.forEach((e) => {
        //判断之前当前购买过的商品在购物车中有没有存在，如果存在购买的数量相加 如果不存在 重新增加一条数据
        let index = purchaseData.findIndex((item) => item.goodsInfoId == e.goodsInfoId);
        if (index > -1) {
          purchaseData[index].goodsNum = e.buyCount + purchaseData[index].goodsNum;
        } else {
          purchaseData.push({ goodsInfoId: e.goodsInfoId, goodsNum: e.buyCount });
        }
      });
      Taro.showToast({
        title: '加入成功',
        icon: 'none',
        duration: 2000,
      });
      //存到本地缓存
      Taro.setStorage({
        key: 'mini::shopCartSku',
        data: purchaseData,
      });
    }
    let num = await getShopCartNum();
    typeof this.props.getCartNums === 'function' && this.props.getCartNums(num);
  };

  /**
   * 显示阶梯价格弹框
   * @param intervalPrices 阶梯价
   * @private
   */
  _showSkuIntervalPrices = (selfIntervalPrices) => {
    this.setState({ showIntervalFlag: true, selfIntervalPrices });
  };
  /**
   * 展示动画效果
   */
  showAnimate = () => {
    this.setState({
      fadeState: false,
    });
  };
}
