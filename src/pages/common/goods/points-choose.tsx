import {Image, ScrollView, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './wholesale-choose.less';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import specCloseIcon from '@/assets/image/goods/goods-list/spec-close.png';
import api from 'api';
//更新购物车角标
import {_} from 'wmkit';
import CartCount from '@/pages/common/goods/cart-count';
let close = null;
interface IPointsChooseP {
  onClose: (e) => any;
  list: any;
  address: any;
  //加入购物车数据数量
  getCartNums?: (e) => any;

  [name: string]: any;
}

interface IPointsChooseS {
  minPrice: number;
  maxPrice: number;
  newGoodsSpecs: any;
  savedBuyGoodsInfos: any;
  buyGoodsInfos: any;
  showIntervalFlag: boolean;
  selfIntervalPrices: any;
  lineShowPrice: number;
  pointsGoods: any;
  fadeState: boolean;
}

export default class PointsChoose extends Component<IPointsChooseP, IPointsChooseS> {
  static defaultProps = {
    address: {},
    list: {
      pointsGoods: {
        goodsInfo: {
          marketPrice: null,
        },
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      minPrice: 0,
      maxPrice: 0,
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
      pointsGoods: {},
      // 黑色蒙层淡入淡出效果
      fadeState: true,
    };
  }

  componentDidMount() {
    //数据重新组合
    this._dataRegroup(this.props.list, false);
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
      this._dataRegroup(nextProps.list, false);
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
    const {list, onClose} = this.props;
    const {newGoodsSpecs, buyGoodsInfos, pointsGoods} = this.state;
    // 当前规格页已购买几件
    const goodsCount = buyGoodsInfos
      .filter((b) => b.goodsInfoId === pointsGoods.goodsInfoId)
      .reduce((sumCount, info) => sumCount + info.buyCount, 0);
    const goodsInfos = list.goodsInfos.filter((item) => {
      return item.goodsId == list.goods.goodsId;
    });
    return (
      <View
        className={this.state.fadeState ? 'spuSpecModal fade-in' : 'spuSpecModal fade-out'}
        onClick={(e) => {
          this.showAnimate();
          close = setTimeout(() => {
            onClose(e);
          }, 200);
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
          // e.preventDefault();
        }}
      >
        <View
          className={this.state.fadeState ? 'spec-container fade-in-up' : 'spec-container fade-in-down'}
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
          <View className="goods-info">
            {/* 图片 */}
            <Image src={list.goods.goodsImg ? list.goods.goodsImg : noDataIcon} className="goods-img" />
            <View className="goods-content">
              {/* 规格标题 */}
              <View className="jiFen">
                <Text className="num_points">
                  {list.pointsGoods.points}
                  <Text className="num_points_2">积分</Text>
                  <Text className="mkt-price">
                    ￥{_.addZero(list.pointsGoods.goodsInfo.marketPrice ? list.pointsGoods.goodsInfo.marketPrice : 0)}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {/*滚动区域*/}
          <ScrollView scrollY className="up-content">
            {/* 规格项 集合最多展示4个 每一项规格默认选中第一个选项*/}
            {newGoodsSpecs.length > 0 ? (
              <View className="spec-content">
                {newGoodsSpecs.map((item, index) => {
                  return (
                    <View className="spec-box" key={index} id={index}>
                      {/* 标题 */}
                      <View className="spec-title">{item.specName}</View>
                      <View className="spec-list">
                        {item.specDetails &&
                          item.specDetails.length > 0 &&
                          item.specDetails.map((v) => {
                            return (
                              <View
                                className={
                                  item.defaultVal == v.specDetailId
                                    ? 'spec-item active-item'
                                    : v.disabled
                                    ? 'spec-item invalid-item'
                                    : 'spec-item'
                                }
                                onClick={() => {
                                  if (v.disabled) {
                                    return;
                                  }
                                  this._chooseSpecDet(index, v.specDetailId);
                                }}
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

            {goodsInfos[0]?.packageGoodsRelsInfo?.length > 0 && (
              <View className="package-goods">
                <View className="title">套餐内已包含</View>
                <ScrollView scrollX>
                  <View className="goods-list">
                    {goodsInfos[0]?.packageGoodsRelsInfo.map((item) => {
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
                </ScrollView>
              </View>
            )}

            {/* 如果不存在规格*/}
            <View className="no-spec-content">
              {/* 标题 */}
              <View className="no-spec-title">
                <Text className="text">数量</Text>
                <Text className="nums">
                  库存{pointsGoods.stock}
                  {list.goods.goodsUnit}
                </Text>
              </View>
              {/* 步进器 */}
              <CartCount
                count={goodsCount ? goodsCount : 0}
                min={pointsGoods.stock ? 1 : 0}
                inventory={pointsGoods.stock}
                getNum={(count) =>
                  this._getCount(
                    count,
                    0,
                    this.state.pointsGoods.goodsInfoId || list.pointsGoods.goodsInfoId,
                    list.pointsGoods.points,
                  )
                }
              />
            </View>
          </ScrollView>
          {/* 加入购物车按钮 */}
          <View className="spec-add-cart">
            <View className="left-nums">
              已选<Text className="high">{goodsCount ? goodsCount : '0'}</Text>
              {list.goods.goodsUnit}
            </View>
            <View
              className={goodsCount > 0 ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
              onClick={(e) => {
                if (goodsCount == 0) {
                  return;
                }
                this._add();
                this.showAnimate();
                close = setTimeout(() => {
                  onClose(e);
                }, 200);
              }}
            >
              立即兑换
            </View>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 数据重新组合
   * @param goods
   * @private
   */
  _dataRegroup = (content, isChange) => {
    const {
      goods, //商品信息
      goodsSpecDetails, //规格值集合
      goodsSpecs, //商品规格项集合
      goodsInfos, //sku信息
      pointsGoods,
      pointsGoodsList,
    } = content;
    let newGoodsSpecs = [];
    let mockSpecDetailIds = []; //需要匹配的id集合
    //以规格项的数组长度为基准 重新组装数据
    if (goodsSpecs) {
      let lastIndex = goodsSpecs.length - 1;
      goodsSpecs.forEach((spec, index) => {
        newGoodsSpecs.push({
          defaultVal: spec.defaultVal, //默认选中第一个规格值
          specName: spec.specName, //规格名称
          goodsId: spec.goodsId, //商品id
          specId: spec.specId, //规格id
          specDetailIds: spec.specDetailIds, //规格值id集合
          specDetails: this._getSpecDetails(
            spec.specDetailIds,
            goodsSpecDetails,
            index, //当前的下标
            lastIndex, //最后一项规格项下标
            goods,
            goodsInfos,
            goodsSpecs,
          ), // 获取规格值详情
        });
        mockSpecDetailIds.push(spec.defaultVal);
      });
    }
    pointsGoods.num = this.returnStockFlag(pointsGoods.stock) ? 0 : 1; //初始化购买数量为1
    this.setState(
      {
        newGoodsSpecs,
        pointsGoods,
      },
      () => {
        const stock = pointsGoods.goodsInfo.stock;
        const count = stock != 0 ? 1 : 0;
        this._getCount(count, 0, pointsGoods.goodsInfoId, pointsGoods.points);
      },
    );
    //去goodsInfos里面匹配 获取数量 单位
    let goodsInfoItem =
      mockSpecDetailIds.length > 0
        ? goodsInfos.find((item) => JSON.stringify(item.mockSpecDetailIds) == JSON.stringify(mockSpecDetailIds))
        : goodsInfos[0];
    let pointsGoodsItem = pointsGoodsList.find((item) => item.goodsInfoId == goodsInfoItem.goodsInfoId);
    const {changeSpecDetail} = this.props;
    isChange && changeSpecDetail && changeSpecDetail(goodsInfoItem.goodsInfoId, pointsGoodsItem.pointsGoodsId);
  };
  /**
   * 计算是否缺货
   * @private
   */
  returnStockFlag = (stock) => {
    //认定缺货的状态 >>> 库存小于等于0
    if (isNaN(stock)) {
      return true;
    }
    return stock <= 0;
  };

  /**
   * 获取规格值详情
   * @param specDetailIds
   * @param goodsSpecDetails
   * @param index     //当前下标
   * @param lastIndex  //最后一项规格项下标
   * @private
   */
  _getSpecDetails = (specDetailIds, goodsSpecDetails, index, lastIndex, goods, goodsInfos, goodsSpecs) => {
    let details = [];
    {
      /*
    if (index != lastIndex) {
      specDetailIds.forEach((id) => {
        //筛选出符合要求的对象
        let item = goodsSpecDetails.find((val) => val.specDetailId === id);
        //判断每一项规格值是否置灰不可点
        let newItem = this.isDisabled(item, goodsSpecs, goodsInfos);
        details.push(newItem);
        console.log(newItem);
      });
    } else {
      //判断如果是最后一项规格项
      details = this._getLastSpecDetails(specDetailIds, goods, goodsInfos, goodsSpecs, goodsSpecDetails);
    }
    */
    }
    specDetailIds.forEach((id) => {
      //筛选出符合要求的对象
      let item = goodsSpecDetails.find((val) => val.specDetailId === id);
      //判断每一项规格值是否置灰不可点
      let newItem = this.isDisabled(item, goodsSpecs, goodsInfos);
      details.push(newItem);
      // console.log(newItem);
    });

    return details;
  };

  /**
   * 判断每一项规格值是否置灰不可点
   * @param specDetailsItem
   * @param goodsSpecs
   * @param goodsInfos
   * @private
   */
  isDisabled = (specDetailsItem, goodsSpecs, goodsInfos) => {
    //新增一个字段，默认所有的规格值全部置灰
    specDetailsItem.disabled = true;
    let leftList = goodsInfos;
    let checkedVal;
    goodsSpecs.forEach((e, index) => {
      if (e.specId == specDetailsItem.specId) {
        checkedVal = specDetailsItem.specDetailId; //当前需要判断是否灰化的规格值
      } else {
        checkedVal = e.defaultVal; //有可能不存在:null(即取消选中规格值的时候)
      }
      if (checkedVal) {
        //如果存在选中值,才进行筛选,若不存在(即该规格项未选中任意规格值),则不筛选
        leftList = leftList.filter((item) => {
          let filterFlag = false;
          item.mockSpecDetailIds.forEach((goodSpeDet) => {
            if (checkedVal === goodSpeDet) {
              //规格项相同,规格值相同
              filterFlag = true;
              return;
            }
          });
          return filterFlag;
        });
      }
    });
    //若能够筛选出sku,则说明该规格值能够切换,则去除灰化
    if (leftList && leftList.length > 0) {
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
    const {savedBuyGoodsInfos} = this.state;
    //将下标不是最后一项的默认规格id筛选出来
    goodsSpecs.forEach((e, i) => {
      if (i != goodsSpecs.length - 1) {
        mockSpecDetailIds.push(e.defaultVal);
      }
    });

    //已最后一项规格值的id数组进行循环 去goodsInfos下面捞数据 拼接数组
    specDetailIds.forEach((id) => {
      let arr = [...mockSpecDetailIds];
      arr.push(id);
      let item = goodsInfos.find((v) => JSON.stringify(v.mockSpecDetailIds) == JSON.stringify(arr)); //判断两个数组是否相等
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
            specDetailId: goodsSpecDetails.find((item) => item.specDetailId == id).specDetailId,
            marketingLabels: item.marketingLabels,
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

          details.push({
            goodsInfoId: item.goodsInfoId, //Skuid
            price: price, //价格
            couponLabels: item.couponLabels, //优惠券信息
            stock: item.stock, //库存
            unit: goods.goodsUnit, //单位
            num: 0, //步进器数字
            detailName: goodsSpecDetails.find((item) => item.specDetailId == id).detailName, //名称
            specDetailId: goodsSpecDetails.find((item) => item.specDetailId == id).specDetailId,
            marketingLabels: item.marketingLabels,
          });
        }
      } else {
        let item = goodsSpecDetails.find((val) => val.specDetailId === id);
        item.disabled = true;
        details.push(item);
      }
    });
    return details;
  };

  /**
   * 获取最低,最高价
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getMinMaxPrice = (goods, goodsInfos) => {
    let minPrice = 0;
    let maxPrice = 0;
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
        } else {
          minPrice = info.salePrice < minPrice ? info.salePrice : minPrice;
          maxPrice = info.salePrice > maxPrice ? info.salePrice : maxPrice;
        }
      });
    }
    this.setState({
      minPrice: minPrice,
      maxPrice: maxPrice,
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
      if (token) {
        // 已登录时,找出最高的市场价
        let maxMarketPrice = null;
        goodsInfos.forEach((info, index) => {
          if (index == 0) {
            maxMarketPrice = info.marketPrice;
          } else {
            maxMarketPrice = info.marketPrice > maxMarketPrice ? info.marketPrice : maxMarketPrice;
          }
        });
        return maxMarketPrice;
      } else {
        return null;
      }
    }
  };

  /**
   * 选择规格值
   * @param goods
   * @param goodsInfos
   * @private
   */
  _chooseSpecDet = (index, id) => {
    const {list} = this.props;
    let newList = {...list};
    newList.goodsSpecs[index].defaultVal = id;
    //每切换一次规格值 就清除当前购买的信息
    this.setState({
      buyGoodsInfos: [],
    });
    //重新组合数据
    this._dataRegroup(newList, true);
  };

  /**
   * 步进器记录
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getCount = (count, index, goodsInfoId, price) => {
    let {newGoodsSpecs, pointsGoods} = this.state;
    let cutGoodsSpecs = [...newGoodsSpecs];
    if (count < 0) {
      return;
    }
    count = parseInt(count);
    const {
      list: {goods},
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
    pointsGoods.num = count;

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
      pointsGoods,
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
    const {buyGoodsInfos} = this.state;
    this.setState({
      buyGoodsInfos: this.filterData(buyGoodsInfos, goodsInfoId, price, buyCount),
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
    let index = saveGoodsInfo.findIndex((item) => item.goodsInfoId === goodsInfoId);
    if (index > -1) {
      saveGoodsInfo[index].buyCount = buyCount;
      saveGoodsInfo[index].price = price;
    } else {
      saveGoodsInfo.push({goodsInfoId, price, buyCount});
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
      list: {goodsIntervalPrices},
    } = this.props;

    if (!goodsIntervalPrices) return [];
    //将type为0的数据筛选出来
    const price = goodsIntervalPrices.filter((item) => item.type == 0);
    return price;
  };

  /**
   * 立即兑换
   * @param params 积分商品Id和购买数量
   * @private
   */
  _add = async () => {
    let {pointsGoods} = this.state;
    const {address} = this.props;
    const params = {
      consigneeId:address.deliveryAddressId,
      pointsGoodsId: pointsGoods.pointsGoodsId,
      num: pointsGoods.num,
    };
    const stringParams = JSON.stringify(params);
    try {
      await api.pointsTradeControl.exchange(params);
      //校验通过 跳转到积分订单下单页
      await Taro.redirectTo({
        url: `/pages/package-A/customer/user/points-confirm/index?params=${stringParams}`,
      });
    } catch (e) {
      if(e.code == 'K-080157'){
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
        return
      }
      // Taro.showModal({
      //   title: '操作失败',
      //   content: '',
      // }).then(async (res) => {
      //   if (res.confirm) {
      //     Taro.navigateTo({
      //       url: '/pages/package-A/customer/user/points-mall/index',
      //     });
      //   }
      // });
    }
  };

  /**
   * 显示阶梯价格弹框
   * @param intervalPrices 阶梯价
   * @private
   */
  _showSkuIntervalPrices = (selfIntervalPrices) => {
    this.setState({showIntervalFlag: true, selfIntervalPrices});
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
