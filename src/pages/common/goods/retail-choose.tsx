import { Image, Text, View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component, Fragment } from 'react';
import './wholesale-choose.less';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import specCloseIcon from '@/assets/image/goods/goods-list/spec-close.png';
import { toFixed2 } from '@/utils/priceFormat';
import purchaseBaseController from 'api/PurchaseBaseController';
import MarketingLabel from '@/pages/common/goods/marketing-label';
//更新购物车角标
import { _, getShopCartNum, WMkit, immutable } from 'wmkit';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
moment.extend(isSameOrBefore);
import CountDown from '@/pages/common/count-down';
import NowSpellGroup from '@/pages/common/goods/now-spell-group';
import CartCount from '@/pages/common/goods/cart-count';
import { cache } from 'config';
let cutBuyGoodsInfos = [];
let close = null;
import { Price } from '@wanmi/ui-taro';
import cn from 'classnames';
interface IWholesaleChooseP {
  onClose: (e) => any;
  list: any;
  //加入购物车数据数量
  getCartNums?: (e) => any;
  flashsaleGoodsFlag?: boolean;
  flashsaleGodos?: any;
  flashsaleGoods?: any;
  dataCallBack?: (e) => any;
  rushToBuying?: (id, num) => any;
  changeSpecDetail?: (id) => any;
  goodsShare?: () => any;
  iepInfo?: any;
  [name: string]: any;
  //打开方式 1:商品详情底部、2:商品详情规格、3:商品列表、4:购物车
  openType: string;
  isDangaoss?: boolean;
}

interface IWholesaleChooseS {
  minPrice: number;
  maxPrice: number;
  marketPrice: number;
  newGoodsSpecs: any;
  maxNum: number;
  minNum: number;
  flashStock: number;
  salesVolume: number;
  savedBuyGoodsInfos: any;
  buyGoodsInfos: any;
  lineShowPrice: number;
  flashsaleGoodsFlag: boolean;
  flashsalePrice: number;
  flashsaleId: string;
  enterPriseAuditState: number;
  enterPrisePrice: string;
  goodsSpecInfo: any;
  goodsInfo: any;
  appointmentId: any;
  distributionGoodsAudit: any;
  distributionCommission: any;
  flashsaleGodos: any;
  bottomShow: boolean;
  fadeState: boolean;
  stop: boolean;
  visible: boolean;
  isVop: boolean;
}

//spu零售规格弹窗
export default class WholesaleChoose extends Component<IWholesaleChooseP, IWholesaleChooseS> {
  static defaultProps = {
    list: {
      goodsInfos: [],
    },
    chooseStyle: {
      bottom: 0,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      minPrice: 0,
      maxPrice: 0,
      marketPrice: 0,
      //新组装后的数据
      newGoodsSpecs: [],
      //存储曾经购买过的数量 以及 购买的金额
      savedBuyGoodsInfos: [],
      //当前准备购买的数量 以及 购买的金额
      buyGoodsInfos: [],
      lineShowPrice: 0,
      //是不是秒杀
      flashsaleGoodsFlag: false,
      //秒杀价格
      flashsalePrice: null,
      //秒杀商品id
      flashsaleId: '',
      //秒杀max
      maxNum: null,
      //秒杀min
      minNum: null,
      //秒杀库存
      flashStock: null,
      //秒杀已售:
      salesVolume: null,
      //分享赚金额
      distributionCommission: '',
      //数量
      goodsSpecInfo: {
        //数量
        stock: 0,
        //单位
        unit: '',
        //价格
        price: 0,
        //id
        goodsInfoId: '',
        //步进器数字0
        num: 0,
        goodsInfoImg: '',
        buyPoint: 0,
        grossMargin: 0,
        leastCount: 1
      },
      //企业购商品的判断
      enterPriseAuditState: null,
      //企业购商品价格
      enterPrisePrice: '',
      goodsInfo: {},
      appointmentId: '',
      distributionGoodsAudit: null,
      flashsaleGodos: {},
      bottomShow: true,
      stop: true,
      // 黑色蒙层淡入淡出效果
      fadeState: true,
      visible: true,
    };
  }

  componentDidMount() {
    //数据重新组合
    this._dataRegroup(this.props.list);
    this.setState({
      lineShowPrice: this._originPriceInfo(this.props.list.goods.linePrice, this.props.list.goodsInfos[0]),
      goodsInfo: this.props.list.goodsInfos[0],
      bottomShow: true,
      fadeState: true,
    });
  }

  componentWillUnmount() {
    clearTimeout(close);
  }

  render() {
    const {
      list,
      onClose,
      iepInfo,
      source,
      openType,
      appointmentSaleVO,
      isSecondShopCart,
      distriGoods,
      specContainerStyle,
      chooseStyle,
      isDangaoss,
      isVop
    } = this.props;
    let {
      minPrice,
      maxPrice,
      marketPrice,
      newGoodsSpecs,
      buyGoodsInfos,
      goodsSpecInfo,

      flashsaleGoodsFlag,
      flashsalePrice,
      flashsaleId,
      enterPriseAuditState,
      enterPrisePrice,
      distributionCommission,
    } = this.state;
    console.log('goodsSpecInfo', goodsSpecInfo);
    let bookingSaleVO = null;

    let appointmentSale = null;
    // 当前规格页已购买几件
    const goodsCount = buyGoodsInfos.reduce((sumCount, info) => sumCount + info.buyCount, 0);

    const isDistributor = WMkit.isShowDistributionButton();
    // iep属性
    // const { isIepAuth: iepSwitch, iepInfo: info = {} } = iepInfo;
    // 默认为企业价
    const enterprisePriceName = iepInfo ? iepInfo.iepInfo?.enterprisePriceName : '';

    //企业购商品的判断
    let iepGoodsShowFlag = iepInfo ? iepInfo.isIepAuth && enterPriseAuditState == 2 && !flashsaleGoodsFlag : '';

    let goodsInfoId = goodsSpecInfo.goodsInfoId;
    if (!goodsInfoId) {
      goodsInfoId = list.goodsInfos && list.goodsInfos.length > 0 ? list.goodsInfos[0].goodsInfoId : '';
    }

    //找出当中选中的sku信息
    const checkGoodsInfo =
      list.goodsInfos.find((goodsInfo) => goodsInfoId != '' && goodsInfo.goodsInfoId == goodsInfoId) || {};
    // 社交电商相关内容显示与否
    let social = checkGoodsInfo.distributionGoodsAudit == 2 ? true : false;

    //全款预售商品，划线价为商品的市场价
    let lineShowPrice = 0;

    //预约
    let isShowAppointment = false;
    //预售
    let isShowBooking = false;
    let buyPoint = checkGoodsInfo ? checkGoodsInfo.buyPoint : null;
    let isbuyPoint = buyPoint != null && buyPoint > 0;
    // 非积分商品
    if (!isbuyPoint) {
      if (checkGoodsInfo && checkGoodsInfo.bookingSaleVO) {
        bookingSaleVO = checkGoodsInfo.bookingSaleVO;
        // 全款预售支付尾款阶段不影响其他营销活动
        isShowBooking = this.isPresaleStatus(checkGoodsInfo.bookingSaleVO);
        if (isShowBooking && checkGoodsInfo.bookingSaleVO.bookingType == 0) {
          lineShowPrice = checkGoodsInfo.marketPrice;
        }
      }
      if (checkGoodsInfo && checkGoodsInfo.appointmentSaleVO) {
        isShowAppointment = true;
        lineShowPrice = checkGoodsInfo.marketPrice;
      }

      if (checkGoodsInfo && checkGoodsInfo.appointmentSaleVO) {
        appointmentSale = checkGoodsInfo.appointmentSaleVO;
      }
    }

    //预约预售进行中不显示企业价
    if (isShowBooking || isShowAppointment) {
      iepGoodsShowFlag = false;
    }

    // 购物车弹窗 秒杀商品显示普通商品信息
    flashsaleGoodsFlag = flashsaleGoodsFlag && !isbuyPoint && !isShowBooking && !isShowAppointment;
    if (flashsaleGoodsFlag) {
      lineShowPrice = checkGoodsInfo.marketPrice;
    }
    // 秒杀优先级》分销
    social = !flashsaleGoodsFlag && social;
    const lineShowPriceShow = lineShowPrice;
    const login = Taro.getStorageSync(cache.LOGIN_DATA);

    let price =
      //  全款预售
      bookingSaleVO &&
        bookingSaleVO.bookingSaleGoods &&
        bookingSaleVO.bookingType == 0 &&
        this.isPresaleStatus(bookingSaleVO)
        ? _.addZero(
          bookingSaleVO.bookingSaleGoods.bookingPrice >= 0
            ? bookingSaleVO.bookingSaleGoods.bookingPrice
            : checkGoodsInfo.marketPrice,
        )
        : //定金预售
        bookingSaleVO && bookingSaleVO.bookingSaleGoods && this.isPresaleStatus(bookingSaleVO)
          ? _.addZero(checkGoodsInfo.marketPrice)
          : appointmentSale && appointmentSale.appointmentSaleGood
            ? _.addZero(appointmentSale.appointmentSaleGood.price >= 0 ? appointmentSale.appointmentSaleGood.price : 500)
            : flashsaleGoodsFlag
              ? _.addZero(flashsalePrice)
              : this.state.distributionGoodsAudit == '2'
                ? _.addZero(checkGoodsInfo.marketPrice)
                : //   : checkGoodsInfo.enterPriseAuditState == '2'
                // ?_.addZero(checkGoodsInfo.enterPrisePrice)
                iepInfo?.iepSwitch && login?.enterpriseCheckState === 2
                  ? _.addZero(checkGoodsInfo.marketPrice)
                  : (checkGoodsInfo.salePrice || checkGoodsInfo.salePrice === 0) ?
                    _.addZero(checkGoodsInfo.salePrice)
                    : _.addZero(checkGoodsInfo.intervalMaxPrice ? checkGoodsInfo.intervalMaxPrice : checkGoodsInfo.marketPrice);

    //是否为拼团
    // let isGrouponFlag = false;
    // if (checkGoodsInfo && immutable.fromJS(checkGoodsInfo.grouponLabel)) {
    //   isGrouponFlag = true;
    // }

    let packageGoodsRelsInfo = checkGoodsInfo.packageGoodsRelsInfo || [];
    return (
      this.state.visible && (
        <View
          className={this.state.fadeState ? 'spuSpecModal fade-in' : 'spuSpecModal fade-out'}
          style={chooseStyle}
          onClick={(e) => {
            this.showAnimate();
            close = setTimeout(() => {
              onClose(e);
            }, 200);
          }}
        // catchMove
        // onTouchMove={(e) => {
        //   e.stopPropagation();
        //   if (this.state.stop) {
        //     e.preventDefault();
        //   }
        //   // e.preventDefault();
        // }}
        >
          <View
            className={this.state.fadeState ? 'spec-container fade-in-up' : 'spec-container fade-in-down'}
            style={specContainerStyle || {}}
            onClick={(e) => {
              e.stopPropagation();
            }}
          //当isSecondShopCart 传值 === false 时 展示 paddingBottom
          // style={isSecondShopCart === true && __TARO_ENV === 'h5' && {paddingBottom: '18%'}}
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
              <Image src={goodsSpecInfo.goodsInfoImg ? goodsSpecInfo.goodsInfoImg : noDataIcon} className="goods-img" />
              <View className="goods-content">
                {/* 规格标题 */}
                {/* <View className="goods-spec-title">{list.goods.goodsName ? list.goods.goodsName : null}</View> */}
                <View className="whole-goods-price">
                  <Price
                    price={goodsSpecInfo.buyPoint ? goodsSpecInfo.price : price}
                    priceSize="large"
                    decimalSize="large"
                    plusSize="large"
                    buyPoint={goodsSpecInfo.buyPoint}
                    linePrice={lineShowPriceShow}
                  />
                  {checkGoodsInfo.enterPriseAuditState == '2' &&
                    (goodsSpecInfo.buyPoint == null || goodsSpecInfo.buyPoint == 0) &&
                    !isShowBooking &&
                    !isShowAppointment &&
                    !flashsaleGoodsFlag &&
                    this.state.distributionGoodsAudit != '2' &&
                    enterprisePriceName && (
                      <View className="iepGoodsPrice">
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                          <Text className="unitqyj">￥</Text>
                          <Text className="qygPrice">{_.addZero(checkGoodsInfo.enterPrisePrice)}</Text>
                        </View>
                        <View className="marketing">
                          <Text className="marketing-text">{enterprisePriceName}</Text>
                        </View>
                      </View>
                    )}
                  {!isbuyPoint &&
                    !isShowBooking &&
                    !isShowAppointment &&
                    !flashsaleGoodsFlag &&
                    isDistributor &&
                    this.state.distributionGoodsAudit == '2' &&
                    !WMkit.inviteeId() && <Text className="make">赚{_.addZero(distributionCommission)}</Text>}
                </View>
                {/*秒杀不能用券，其他都可以,秒杀详情的时候展示秒杀标签，预约预售的情况不展示 */}
                {checkGoodsInfo && (
                  <MarketingLabel
                    marketingLabels={
                      !isShowBooking && !isShowAppointment
                        ? immutable.fromJS(checkGoodsInfo.marketingLabels)
                        : immutable.fromJS([])
                    }
                    grouponLabel={
                      checkGoodsInfo.grouponLabel ? immutable.fromJS(checkGoodsInfo.grouponLabel) : immutable.fromJS({})
                    }
                    couponLabels={immutable.fromJS(checkGoodsInfo.couponLabels)}
                    isSocial={social}
                    noWhiteCover
                  />
                )}
              </View>
            </View>
            {/*滚动区域*/}
            <ScrollView
              scrollY
              className="up-content"
              style={{
                height: newGoodsSpecs.length ? '300px' : '160px',
                paddingBottom: newGoodsSpecs.length ? '40px' : '0px !important',
              }}
            >
              {/* 积分+市场价不显示拼团 */}
              {/*distriGoods为true,表示是从开店礼包-商品详情进入，不展示拼团信息*/}
              {checkGoodsInfo && !distriGoods && <NowSpellGroup goodsDetail={list} skuId={goodsInfoId} />}
              {/* 规格项 集合最多展示4个 每一项规格默认选中第一个选项*/}
              {newGoodsSpecs.length > 0 ? (
                <View className="spec-content">
                  {newGoodsSpecs.map((item, index) => {
                    return (
                      <View className="spec-box" id={index} key={index}>
                        {/* 标题 */}
                        <View className="spec-title">{item.specName}</View>
                        {/*distriGoods为true,表示是从开店礼包-商品详情进入，只展示选中规格，其余规格不展示*/}
                        <View className="spec-list">
                          {distriGoods &&
                            item.specDetails &&
                            item.specDetails.length > 0 &&
                            item.specDetails.map((v) => {
                              const specDetailId = v.specDetailId;
                              if (item.defaultVal == v.specDetailId) {
                                return (
                                  <View
                                    className={
                                      cn('spec-item',{
                                        'active-item': item.defaultVal == v.specDetailId,
                                        'invalid-item tag': v.disabled
                                      })
                                    }
                                    onClick={() => {
                                      if (v.disabled) {
                                        return false;
                                      }
                                      this._chooseSpecDet(index, v.specDetailId);
                                    }}
                                    key={specDetailId}
                                  >
                                    <Text className="spec-text">{v.detailName}</Text>
                                  </View>
                                );
                              }
                            })}
                          {!distriGoods &&
                            item.specDetails &&
                            item.specDetails.length > 0 &&
                            item.specDetails.map((v) => {
                              const specDetailId = v.specDetailId;
                              return (
                                <View
                                  className={
                                    cn('spec-item',{
                                      'active-item': item.defaultVal == v.specDetailId,
                                      'invalid-item tag': v.disabled
                                    })
                                  }
                                  onClick={() => {
                                    if (v.disabled) {
                                      return false;
                                    }
                                    this._chooseSpecDet(index, v.specDetailId);
                                  }}
                                  key={specDetailId}
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

              {packageGoodsRelsInfo.length > 0 && (
                <View className="package-goods">
                  <View className="title">套餐内已包含</View>
                  <ScrollView scrollX>
                    <View className="goods-list">
                      {packageGoodsRelsInfo.map((item) => {
                        return (
                          <View
                            className="goods-itemx"
                            onClick={(e) => {
                              onClose(e);
                              setTimeout(() => {
                                Taro.redirectTo({
                                  url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`,
                                });
                              }, 200);
                            }}
                          >
                            <View className="goods-item-img">
                              <Image src={item.goodsInfoImg ? item.goodsInfoImg : noDataIcon} className="item-img" />
                            </View>
                            <View className="item-content">
                              <Text className="content-name">
                                {item.goodsInfoName}
                                <Text className="count">{`x${item.packageNum}`}</Text>
                              </Text>
                              <Text className="content-spec">{item.specText}</Text>
                              {item.goodsStatus === 1 && (
                                <View className="goods-no-stock">
                                  <View className="no-stock-text">缺货</View>
                                </View>
                              )}
                              {item.goodsStatus === 2 && (
                                <View className="goods-no-stock">
                                  <View className="no-stock-text">失效</View>
                                </View>
                              )}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              )}

              {/*如果从奖励中心-开店礼包-商品详情，则不显示步进器*/}
              {!distriGoods && (
                <View>
                  <View className="no-spec-content">
                    {/* 标题 */}
                    <View className="no-spec-title">
                      <Text className="text">数量</Text>
                      <Text className="nums">
                        库存{goodsSpecInfo.stock} {isDangaoss ? '' : goodsSpecInfo.unit}
                      </Text>
                    </View>
                    {/* 步进器 */}
                    {goodsSpecInfo.goodsInfoId && (
                      <CartCount
                        count={goodsSpecInfo.num}
                        inventory={this._numberInputMax()}
                        min={goodsSpecInfo.stock <= 0 ? 0 : 1}
                        getNum={(count) =>
                          this._getCount(count, 0, this.state.goodsSpecInfo.goodsInfoId, goodsSpecInfo.price)
                        }
                      />
                    )}
                  </View>
                  {
                    isVop && goodsSpecInfo.num<goodsSpecInfo.leastCount&& <View className='least-num'>起订量：{goodsSpecInfo.leastCount}</View>
                  }
                </View>

              )}
            </ScrollView>

            {/* 购物车显示确认选中 */}
            {source == '1' ? (
              this.renderCarButtom()
            ) : (
                //加入购物车按钮
                <View className="spec-add-cart">
                  {/* <View className="left-nums">
                已选<Text className="high">{goodsCount}</Text>
                {list.goods.goodsUnit}
              </View> */}

                  {/*根据是从商品列表进来的还是商品详情进来展示后台配置按钮*/}
                  {/* // 立即抢购底部按钮 */}
                  {flashsaleGoodsFlag &&
                    !isbuyPoint &&
                    !checkGoodsInfo.appointmentSaleVO &&
                    // 不是预售待支付尾款时和不是预售支付尾款时
                    !this.isPresaleStatus(checkGoodsInfo.bookingSaleVO) ? (
                      this.renderFlashSaleButtom()
                    ) : /* 是小b且分销商品非秒杀展示情况 */
                    WMkit.isDistributor() &&
                      !flashsaleGoodsFlag &&
                      checkGoodsInfo &&
                      checkGoodsInfo.distributionGoodsAudit === '2' ? (
                        this.renderDistributorButtom()
                      ) : (
                        <Fragment>
                          {/* 商品详情点击规格 */}
                          {openType == '2' && this.renderSpecButtom()}

                          {/* 、商品列表 */}
                          {openType == '3' && this.renderGoodListButtom()}

                          {/* 商品详情底部点击 */}
                          {openType == '1' && this.renderGoodsDetailButtom()}

                          {/* 预约底部 */}
                          {openType == '5' && this.renderAppointmentButtom()}

                          {/* 预售底部 */}
                          {openType == '6' && this.renderBookingButtom()}
                        </Fragment>
                      )}
                </View>
              )}
          </View>
        </View>
      )
    );
  }

  //购物车显示底部按钮
  renderCarButtom = () => {
    const { onClose } = this.props;
    const { buyGoodsInfos, goodsSpecInfo } = this.state;
    // 当前规格页已购买几件
    let goodsCount = buyGoodsInfos.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    if (goodsSpecInfo.grossMargin < 0) goodsCount = 0
    return (
      <View className="spec-add-cart">
        <View className="left-nums" />
        <View
          className={goodsCount > 0 ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
          onClick={(e) => {
            if (goodsCount === 0) return
            this._confirm();
            this.showAnimate();
            close = setTimeout(() => {
              onClose(e);
            }, 200);
          }}
        >
          确定
        </View>
      </View>
    );
  };

  //立即抢购底部按钮
  renderFlashSaleButtom = () => {
    const { buyGoodsInfos, goodsSpecInfo, flashsaleId } = this.state;
    // 当前规格页已购买几件
    let goodsCount = buyGoodsInfos.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    if (goodsSpecInfo.grossMargin < 0) goodsCount = 0
    return (
      <View
        className={goodsCount > 0 ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
        onClick={(e) => {
          if (goodsSpecInfo.grossMargin < 0) return
          this.props.rushToBuying(flashsaleId, goodsSpecInfo.num);
        }}
      >
        立即抢购
      </View>
    );
  };

  //是小b且分销商品非秒杀展示情况
  renderDistributorButtom = () => {
    const { onClose, isPay, goodsBuyTypes, openType } = this.props;
    const { buyGoodsInfos, goodsSpecInfo } = this.state;
    const datas = buyGoodsInfos.length > 0 ? buyGoodsInfos : cutBuyGoodsInfos;
    // 当前规格页已购买几件
    let goodsCount = datas.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    if (goodsSpecInfo.grossMargin < 0) goodsCount = 0
    //goodsBuyTypes下单方式 0：加入购物车 1：立即购买
    return openType == '2' ? (
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
    ) : (
        <View className="two-btn">
          {!isPay && goodsBuyTypes.indexOf('0') > -1 && (
            <View
              className={goodsCount > 0 ? 'pay-btn' : 'add-cart-btn gray-cart-btn'}
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
          {isPay && goodsBuyTypes.indexOf('1') > -1 && (
            <View
              className={goodsCount > 0 ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
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
        </View>
      );
  };

  //预售底部
  renderBookingButtom = () => {
    const { onClose, bookingSaleVO } = this.props;
    const { buyGoodsInfos } = this.state;
    const datas = buyGoodsInfos.length > 0 ? buyGoodsInfos : cutBuyGoodsInfos;
    // 当前规格页已购买几件
    const goodsCount = datas.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    // 按钮是否已经渲染好
    const { bottomShow } = this.state;
    return this.isPresaleStatus(bookingSaleVO) ? (
      <View className="two-btn">
        {bookingSaleVO.bookingType == 0 ? (
          <View
            className={goodsCount > 0 && bottomShow ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
            onClick={(e) => {
              if (goodsCount == 0 || !bottomShow) {
                return;
              }
              this._pay();
              this.showAnimate();
              close = setTimeout(() => {
                onClose(e);
              }, 200);
            }}
          >
            全款预定
          </View>
        ) : (
            <View
              className={goodsCount > 0 && bottomShow ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
              onClick={(e) => {
                if (goodsCount == 0 || !bottomShow) {
                  return;
                }
                this._pay();
                this.showAnimate();
                close = setTimeout(() => {
                  onClose(e);
                }, 200);
              }}
            >
              支付定金
            </View>
          )}
      </View>
    ) : (
        //如果没有预约则展示点击规格
        this.renderSpecButtom()
      );
  };

  //预约底部
  renderAppointmentButtom = () => {
    const {
      onClose,
      appointmentSaleVO,
      subscriptionFlag,
      openSpecModal,
      serverTime,
      queryPreBuyTime,
      onChangCurrentPreBuyStatus,
    } = this.props;
    const { buyGoodsInfos } = this.state;
    const datas = buyGoodsInfos.length > 0 ? buyGoodsInfos : cutBuyGoodsInfos;
    // 当前规格页已购买几件
    const goodsCount = datas.reduce((sumCount, info) => sumCount + info.buyCount, 0);

    return (
      <View className="two-btn">
        {appointmentSaleVO && appointmentSaleVO.id && this.isBuyStatus(appointmentSaleVO) ? (
          this.isBuyStatus(appointmentSaleVO) == '抢购中' ? (
            <View
              className={goodsCount > 0 ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
              onClick={(e) => {
                this._pay();
                this.showAnimate();
                close = setTimeout(() => {
                  onClose(e);
                }, 200);
              }}
            >
              立即抢购
            </View>
          ) : this.isBuyStatus(appointmentSaleVO) == '预约中' ? (
            !subscriptionFlag ? (
              <View
                className={goodsCount > 0 ? 'add-cart-btn' : 'add-cart-btn gray-cart-btn'}
                onClick={(e) => {
                  if (goodsCount == 0) {
                    return;
                  }
                  onChangCurrentPreBuyStatus(0);
                  this._pay();
                  this.showAnimate();
                  close = setTimeout(() => {
                    onClose(e);
                  }, 200);
                }}
              >
                立即预约
              </View>
            ) : (
                <View className="add-cart-btn gray-cart-btn single-btn-pre">已预约</View>
              )
          ) : (
                <View className="add-cart-btn gray-cart-btn single-btn-pre">
                  <View>
                    {appointmentSaleVO && !moment(appointmentSaleVO.snapUpStartTime).isSameOrBefore(new Date()) && (
                      <CountDown
                        allowFontScaling={false}
                        numberOfLines={1}
                        groupFlag={false}
                        prelistFlag
                        showTimeDays
                        endHandle={() => {
                          queryPreBuyTime();
                        }}
                        timeOffset={moment(appointmentSaleVO && appointmentSaleVO.snapUpStartTime)
                          .diff(moment(serverTime), 's')
                          .toFixed(0)}
                      />
                    )}
                  </View>
                  <View className="buyText">后开抢</View>
                </View>
              )
        ) : (
            //如果没有预约则展示点击规格
            this.renderSpecButtom()
          )}
      </View>
    );
  };

  //商品列表
  renderGoodListButtom = () => {
    const { onClose } = this.props;
    const { buyGoodsInfos, goodsSpecInfo } = this.state;

    const datas = buyGoodsInfos.length > 0 ? buyGoodsInfos : cutBuyGoodsInfos;

    // 当前规格页已购买几件
    let goodsCount = datas.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    if (goodsSpecInfo.grossMargin < 0) goodsCount = 0
    return (
      <View className="two-btn">
        <View
          className={goodsCount > 0 ? 'spec-add-cart-btn' : 'add-cart-btn gray-cart-btn'}
          onClick={(e) => {
            if (goodsCount == 0) {
              return;
            }
            this._addCart();
            this.setState(
              {
                fadeState: false,
              },
              () => {
                setTimeout(() => {
                  onClose(e);
                }, 500);
              },
            );
          }}
        >
          加入购物车
        </View>
      </View>
    );
  };

  //商品详情页点击规格底部按钮
  renderSpecButtom = () => {
    const { onClose, goodsBuyTypes, isVop } = this.props;
    const { buyGoodsInfos, goodsSpecInfo } = this.state;
    const datas = buyGoodsInfos.length > 0 ? buyGoodsInfos : cutBuyGoodsInfos;
    // 当前规格页已购买几件
    let goodsCount = datas.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    if (goodsSpecInfo.grossMargin < 0) goodsCount = 0

    //goodsBuyTypes下单方式 0：加入购物车 1：立即购买

    return (
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
              if (goodsCount < goodsSpecInfo.leastCount && isVop) {
                Taro.showToast({
                  title: `当前规格起订量${goodsSpecInfo.leastCount}${goodsSpecInfo.unit}`,
                  icon: 'none',
                  duration: 2000,
                });
                return
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
    );
  };

  //判断当前的预约状态
  isBuyStatus = (status) => {
    if (!status) return;
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;

    let isAppointmentStart = appointmentStartTime ? moment(appointmentStartTime).isBefore(new Date()) : null;
    let isAppointmentEnd = appointmentEndTime ? moment(new Date()).isBefore(appointmentEndTime) : null;

    let isSnapUpStartTime = snapUpStartTime ? moment(snapUpStartTime).isBefore(new Date()) : null;
    let isSnapUpEndTime = snapUpEndTime ? moment(new Date()).isBefore(snapUpEndTime) : null;

    let result = '';
    if (isAppointmentStart && isAppointmentEnd) result = '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
    return result;
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    if (!item) return false;
    const { bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }

    //定金支付起止时间内,定金预售，bookingType传值有问题，为null
    if (bookingType == 1 || bookingType == null) {
      isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
    }
    return isBetween;
  };

  //商品详情底部点击
  renderGoodsDetailButtom = (Infos = []) => {
    const { onClose, isPay,isVop } = this.props;
    const { buyGoodsInfos, goodsSpecInfo } = this.state;
    const datas = buyGoodsInfos.length > 0 ? buyGoodsInfos : Infos;
    // 当前规格页已购买几件
    let goodsCount = datas.reduce((sumCount, info) => sumCount + info.buyCount, 0);
    if (goodsSpecInfo.grossMargin < 0) goodsCount = 0

    return (
      <View className="two-btn">
        {isPay && (
          <View
            className={goodsCount > 0 ? 'pay-btn' : 'add-cart-btn gray-cart-btn'}
            onClick={(e) => {
              if (goodsCount == 0) {
                return;
              }
              if (goodsCount < goodsSpecInfo.leastCount&&isVop) {
                Taro.showToast({
                  title: `当前起订量${goodsSpecInfo.leastCount}${goodsSpecInfo.unit}`,
                  icon: 'none',
                  duration: 2000,
                });
                return
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
    );
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
    let mockSpecDetailIds = []; //需要匹配的id集合
    let buyGoodsInfos = []; //当前购买的数量 价格
    const { savedBuyGoodsInfos } = this.state;
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

      //以下是为了提高用户体验,让用户在当前选中的规格值情况下,灰化对应的不可点击的规格值
      newGoodsSpecs = this.isDisabled(newGoodsSpecs, goodsInfos);
    }
    //去goodsInfos里面匹配 获取数量 单位
    let goodsInfoItem =
      mockSpecDetailIds.length > 0
        ? goodsInfos.find((item) => JSON.stringify(item.mockSpecDetailIds) == JSON.stringify(mockSpecDetailIds))
        : goodsInfos[0];

    //获取最高价 最低价
    goodsInfoItem && this._getMinMaxPrice(goodsInfoItem);

    //如果存在 捞数据取到之前购买的价格 数量
    let saveBuyItem = savedBuyGoodsInfos.find((v) => v.goodsInfoId == goodsInfoItem.goodsInfoId);

    //判断秒杀状态
    let currentFlag = false;
    let { flashsaleGodos } = this.props;
    let flashsaleItem;
    if (flashsaleGodos && JSON.stringify(flashsaleGodos) != '{}') {
      flashsaleItem = flashsaleGodos.find((v) => {
        return v.goodsInfoId == goodsInfoItem.goodsInfoId && v.stock >= v.minNum;
      });
      if (flashsaleItem) {
        this.setState({
          flashsaleGoodsFlag: true,
          flashsalePrice: flashsaleItem.price,
          flashsaleId: flashsaleItem.id,
          maxNum: flashsaleItem.maxNum,
          minNum: flashsaleItem.minNum,
          flashStock: flashsaleItem.stock,
          salesVolume: flashsaleItem.salesVolume,
        });
        currentFlag = true;
      } else {
        this.setState({
          flashsaleGoodsFlag: false,
          flashsalePrice: null,
          flashsaleId: '',
          maxNum: null,
          minNum: null,
          flashStock: null,
          salesVolume: null,
        });
      }
    }
    // spu主图，当sku无图片的时候，显示spu主图的第一个
    const { images } = this.props.list;
    if (savedBuyGoodsInfos.length > 0 && saveBuyItem) {
      //当前购买的数量 价格
      buyGoodsInfos.push(saveBuyItem);

      this.setState({
        goodsSpecInfo: {
          grossMargin: goodsInfoItem.grossMargin,
          leastCount: goodsInfoItem.count,
          stock: currentFlag ? flashsaleItem.stock : goodsInfoItem.stock,
          unit: goods.goodsUnit,
          price: saveBuyItem.price,
          goodsInfoId: goodsInfoItem.goodsInfoId,
          num: saveBuyItem.buyCount, //步进器数字
          goodsInfoImg:
            !goodsInfoItem.goodsInfoImg && images && images.length > 0
              ? images[0].artworkUrl
              : goodsInfoItem.goodsInfoImg,
          buyPoint: goodsInfoItem.buyPoint,
        },
        buyGoodsInfos,
        enterPriseAuditState: goodsInfoItem.enterPriseAuditState,
        enterPrisePrice: goodsInfoItem.enterPrisePrice,
      });
    } else {
      this.setState(
        {
          goodsSpecInfo: {
            grossMargin: goodsInfoItem.grossMargin,
            leastCount: goodsInfoItem.count,
            stock: currentFlag ? flashsaleItem.stock : goodsInfoItem.stock,
            unit: goods.goodsUnit,
            price: goodsInfoItem.salePrice,
            goodsInfoId: goodsInfoItem.goodsInfoId,
            num: 0,
            goodsInfoImg:
              !goodsInfoItem.goodsInfoImg && images && images.length > 0
                ? images[0].artworkUrl
                : goodsInfoItem.goodsInfoImg,
            buyPoint: goodsInfoItem.buyPoint,
          },
          enterPriseAuditState: goodsInfoItem.enterPriseAuditState,
          enterPrisePrice: goodsInfoItem.enterPrisePrice,
        },
        () => {
          const stock = currentFlag ? flashsaleItem.stock : goodsInfoItem.stock;
          const count = stock > 0 ? 1 : 0;
          this._getCount(count, 0, goodsInfoItem.goodsInfoId, goodsInfoItem.price);
        },
      );
    }
    this.setState({
      newGoodsSpecs,
    });

    const { changeSpecDetail } = this.props;
    // 一瞬间置为false
    this.setState(
      {
        bottomShow: false,
      },
      async () => {
        (await changeSpecDetail) && changeSpecDetail(goodsInfoItem.goodsInfoId);
        this.setState({
          bottomShow: true,
        });
      },
    );
    // //执行完了以后再设为true,防止渲染来不及触发引起错误的点击事件
    // setTimeout(() => {
    // }, 500);
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
    specDetailIds.forEach((id) => {
      //筛选出符合要求的对象
      let item = goodsSpecDetails.find((val) => val.specDetailId === id);
      const goodsInfo = goodsInfos.find((e) => e.mockSpecDetailIds.includes(id));
      details.push({ ...item, grossMargin: goodsInfo?.grossMargin, count: goodsInfo?.count });
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
  isDisabled = (goodsSpecs, goodsInfos) => {
    let defaultValArr = []; //临时存储每个规格项默认选中值
    //1.遍历spu所有规格项
    if (goodsSpecs && goodsSpecs.length > 0) {
      goodsSpecs.map((spe) => {
        let defaultVal = spe.defaultVal;
        defaultValArr.push(defaultVal);

        /**以下是为了提高用户体验,让用户在当前选中的规格值情况下,灰化对应的不可点击的规格值*/
        //2.遍历当前规格项的所有规格值,找出需要灰化的规格值
        spe.specDetails.map((sdet) => {
          sdet.disabled = true; //默认灰化
          let leftList = goodsInfos; //匹配规格项值后剩余的sku,通过判断此List数量来决定是否灰化该规格值
          let checkedVal;

          //3.遍历所有规格项,拿当前需要判断灰化的规格值与其他规格项的选中规格值进行搭配-->筛选出剩余sku
          goodsSpecs.forEach((spec) => {
            if (spec.specId == spe.specId) {
              checkedVal = sdet.specDetailId; //当前需要判断是否灰化的规格值
            } else {
              checkedVal = spec.defaultVal; //有可能不存在:null(即取消选中规格值的时候)
            }

            //4.筛选出当前规格项每个规格值 与 其他规格项的默认规格值 匹配的sku们
            if (checkedVal) {
              //如果存在选中值,才进行筛选,若不存在(即该规格项未选中任意规格值),则不筛选
              leftList = leftList.filter((good) => {
                let filterFlag = false;
                good.mockSpecDetailIds.forEach((goodSpeDet) => {
                  if (checkedVal == goodSpeDet) {
                    //规格项相同,规格值相同
                    filterFlag = true;
                    return;
                  }
                });
                return filterFlag&&good.stock>0;
              });
            }
          });

          //5.若能够筛选出sku,则说明该规格值能够切换,则去除灰化
          if (leftList && leftList.length > 0) {
            sdet.disabled = false; //去除灰化
          }
          if (sdet.grossMargin < 0) sdet.disabled = true;
          return sdet;
        });

        return spe;
      });
    }
    return goodsSpecs;
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
    this.setState({
      buyGoodsInfos: [],
      flashsaleGoodsFlag: false,
      flashsalePrice: null,
      flashsaleId: null,
      maxNum: null,
      minNum: null,
    });
    //重新组合数据
    this._dataRegroup(newList);
  };

  /**
   * 步进器记录
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getCount = (count, index, goodsInfoId, price) => {
    price = this.state.minPrice;
    let {
      newGoodsSpecs,
      goodsSpecInfo: { stock, unit, goodsInfoImg, buyPoint, grossMargin, leastCount },
    } = this.state;
    let cutGoodsSpecs = [...newGoodsSpecs];
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

    //步进器相关参数、
    this.setState({
      goodsSpecInfo: {
        grossMargin,
        leastCount,
        stock,
        unit,
        goodsInfoId,
        price,
        num: count,
        goodsInfoImg,
        buyPoint,
      },
    });

    //存储曾经购买过的数量 以及 购买的金额
    this._saveGoodsInfo(count, goodsInfoId, price);
    //存储当前购买的数量 以及 购买的金额
    this._buyGoodsInfo(count, goodsInfoId, price);
    this.setState({
      newGoodsSpecs: cutGoodsSpecs,
    });
  };

  /**
   * 限售量
   */
  _numberInputMax = () => {
    const { goodsSpecInfo, maxNum, flashStock, flashsaleGoodsFlag, salesVolume } = this.state;
    let max = 0;
    if (flashsaleGoodsFlag && flashStock - salesVolume > 0) {
      max = flashStock - salesVolume > maxNum ? maxNum : flashStock - salesVolume;
    } else {
      max = goodsSpecInfo.stock < 0 ? 0 : goodsSpecInfo.stock || 0;
    }
    return max;
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
    const { openType } = this.props;
    const buyGoodsInfos = this.filterData(this.state.buyGoodsInfos, goodsInfoId, price, buyCount);
    cutBuyGoodsInfos = buyGoodsInfos;
    this.setState({
      buyGoodsInfos,
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
   * 获取最低,最高价
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getMinMaxPrice = (goodsInfo) => {
    //当商品允许分销且分销审核通过，视为分销商品
    // const distributionFlag = this.props.list.goodsInfos[0].distributionGoodsAudit == '2';
    const distributionFlag = goodsInfo.distributionGoodsAudit == '2';
    //判断是否有预售价格，有预售价格显示预售价，没有和之前逻辑一样
    let appointmentSaleVO = goodsInfo.appointmentSaleVO;

    let appointmentId = '';
    if (appointmentSaleVO) {
      appointmentId = appointmentSaleVO.id;
    }

    let appointmentSalePrice = '';
    let bookingSalePrice = '';

    appointmentSalePrice = goodsInfo.appointmentPrice; //预约价格
    bookingSalePrice = goodsInfo.bookingPrice; //预售价格

    this.setState({
      minPrice:
        goodsInfo.buyPoint > 0
          ? goodsInfo.salePrice
          : appointmentSalePrice
            ? appointmentSalePrice
            : bookingSalePrice
              ? bookingSalePrice
              : distributionFlag
                ? goodsInfo.marketPrice
                : goodsInfo.salePrice,
      appointmentId,
      distributionGoodsAudit: goodsInfo.distributionGoodsAudit,
      distributionCommission: goodsInfo.distributionCommission,
      marketPrice: goodsInfo.marketPrice,
    });
  };

  /**
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在 不展示
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示sku市场价
   * @private
   */
  _originPriceInfo = (linePrice, goodsInfoIm) => {
    let token = Taro.getStorageSync('authInfo:token');
    if (linePrice) {
      return linePrice;
    } else {
      return null;
    }
  };

  /**
   * 确认选中
   */
  _confirm = async () => {
    this.props.onConfirm(this.state.goodsSpecInfo);
  };

  //立即购买
  _pay = async () => {
    let { buyGoodsInfos, appointmentId } = this.state;

    let token = Taro.getStorageSync('authInfo:token');
    //如果已经登录
    if (token) {
      this.props._didConfirm(buyGoodsInfos, appointmentId);
    } else {
      Taro.navigateTo({
        url: '/pages/package-A/login/login/index',
      });
    }
  };

  /**
   * 加入购物车
   * @param savedBuyGoodsInfos //曾经购买过的
   * @param buyGoodsInfos//当前购买过的
   * @private
   */
  _addCart = async () => {
    const { _clickGoods } = this.props;
    let { buyGoodsInfos } = this.state;
    const datas = buyGoodsInfos.length > 0 ? buyGoodsInfos : cutBuyGoodsInfos;
    let token = Taro.getStorageSync('authInfo:token');
    typeof _clickGoods === 'function' && _clickGoods(2); // 埋点 0：浏览，1：点击，2：加购，3：下单
    let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? Taro.getStorageSync('mini::shopCartSku') : [];
    //如果已经登录
    if (token) {
      try {
        await purchaseBaseController.batchAdd({ goodsInfos: datas });
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
      datas.forEach((e) => {
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
   * 全款预售商品预售价不为空，划线价取市场价
   */
  _getLinePriceForBookingSale = (goodsInfo) => {
    let price = null;
    if (
      goodsInfo &&
      goodsInfo.bookingSaleVO &&
      goodsInfo.bookingSaleVO.bookingType == 0 &&
      this.isPresaleStatus(goodsInfo.bookingSaleVO) &&
      !goodsInfo.buyPoint &&
      (goodsInfo.bookingSaleVO.bookingSaleGoods.bookingPrice ||
        goodsInfo.bookingSaleVO.bookingSaleGoods.bookingPrice > 0)
    ) {
      price = goodsInfo.marketPrice;
    }
    return price;
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
