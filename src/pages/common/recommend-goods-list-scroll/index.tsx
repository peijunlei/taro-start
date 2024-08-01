import React from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';
import {VAS, noop, pvUvStatics} from 'wmkit';
import WholesaleChoose2 from '@/pages/common/goods/wholesale-choose';
import RetailChoose2 from '@/pages/common/goods/retail-choose';
import {checkGoods, immediateBuy} from 'api/TradeBaseController';
import {goodsRecommendList, goodsRecommendListForUnLogin} from 'api/IntelligentRecommendationController';
import {detail, unLoginDetail, spuSpec} from 'api/GoodsInfoBaseController';
import lodash from 'lodash';

// 标题
import Title from './components/title';
// 走马灯列表
import ImgSlides from './components/img-slides';
import './index.less';
import {mergeData} from '@/wmkit/common/mergedata';

// 推荐商品 - 走马灯坑位列表
export default class RecommendGoodsListScroll extends React.Component<any, any> {
  static defaultProps = {
    // type坑位类型：0-购物车，1-商品详情，2-商品列表，3-个人中心，4-会员中心，5-收藏商品，6-支付成功页，7-分类页，8-魔方
    // string
    type: '0',
    pageIndex: 0,
    pageSize: 30,
    // 商品为0，类目为1
    recommendType: 0,
    relationGoodsIdList: [],
    // 当坑位有数据时，隐藏父组件‘没有更多了’提示语等
    setHideModule: noop,
    // 当前页数据数量是否 等于 pageSize
    getCurrentPageDataIsComplete: noop,
    // 重新设定pageIndex
    setPageIndex: noop,
    // 外层style样式
    recommendListCOMStyle: {},
    // 获取购物车商品数量
    getShopCartNumCallBack: noop,
    // 用于覆盖WholesaleChoose，RetailChoose的props
    changeCommonModalProps: {},
    // 用于覆盖recommend_goods_list_spu样式
    recommendGoodsListSpuStyle: {},
    // 打开Modal隐藏某些组件
    openModalHideComponent: noop,
    goodsId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      wholesaleVisible: false,
      retailVisible: false,
      chosenSpu: {},
      iepInfo: {},

      // 热门推荐商品坑位 - 数据
      dataSource: [],
      // 热门推荐商品坑位 - 标题
      recommendConfig: {},
      // 数据是否到底（即：全部查完了）
      noMore: false,
    };
  }

  componentDidMount() {
    this._getIepInfo();
    this._getHotGoodsList();
  }

  componentDidUpdate(prevProps) {
    const bol =
      this.props.type !== prevProps.type ||
      this.props.pageIndex !== prevProps.pageIndex ||
      this.props.pageSize !== prevProps.pageSize ||
      this.props.recommendType !== prevProps.recommendType ||
      this.props.relationGoodsIdList.length !== prevProps.relationGoodsIdList.length;
    if (bol) {
      this._getHotGoodsList();
    }
  }

  // 获取 - 热门推荐商品 - 数据
  _getHotGoodsList = async () => {
    const {dataSource} = this.state;
    let {type, pageIndex, pageSize, recommendType, relationGoodsIdList, setPageIndex} = this.props;
    // 当currentPageDataIsComplete为tru时， pageIndex + 0.01用于迷惑componentDidUpdate判断条件，实际应用通过Math.floor下取整
    // 用途：若当前页数据为空时，继续往下翻页则会继续请求当前页数据，直到当前页数据不为空时
    pageIndex = Math.floor(pageIndex);
    const params = {
      type,
      pageIndex,
      pageSize,
      recommendType,
      relationGoodsIdList,
    };

    if (!dataSource.length && pageIndex > 0) {
      return setPageIndex(0);
    }

    const token = Taro.getStorageSync('authInfo:token');
    let recommendSwitch = await VAS.checkRecommendAuth();
    if (!recommendSwitch) {
      return;
    }
    const res = token ? await goodsRecommendList(params) : await goodsRecommendListForUnLogin(params);

    try {
      let {goodsVOList, recommendPositionConfigurationVO} = res || {};
      goodsVOList = goodsVOList || [];
      recommendPositionConfigurationVO = recommendPositionConfigurationVO || {};

      this.setState({
        dataSource: lodash.chunk(goodsVOList, 6) || [],
        recommendConfig: recommendPositionConfigurationVO,
        noMore: goodsVOList.length < pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 获取sku的信息
  _findSkuInfo = async (skuId) => {
    const token = Taro.getStorageSync('authInfo:token');
    const res = token ? await detail(skuId) : await unLoginDetail(skuId);
    const spec = await spuSpec(res.goods.goodsId);
    const {chosenSpu} = this.state;
    return mergeData(res, spec, chosenSpu?.goodsInfos);
  };

  _getSkuInfo = async (skuId) => {
    const result = await this._findSkuInfo(skuId);
    this._getComponentState('chosenSpu', result);
    return result.goodsInfos?.find((e) => e.goodsInfoId === skuId);
  };

  // '+' 加入购物车
  _spuAddCartFunc = async (skuId = '', goodsId = '') => {
    //记录goodsId
    this.setState(
      {
        goodsId: goodsId,
      },
      () => {
        this._clickGoods({
          eventType: 1, //0：浏览，1：点击，2：加购，3：下单
        });
      },
    );
    const {openModalHideComponent} = this.props;
    try {
      const res = await this._findSkuInfo(skuId);

      // // 商品规格里面添加一个默认值
      if (res.goodsSpecs && res?.goodsSpecs?.length) {
        const {mockSpecDetailIds} = res.goodsInfos[0] || {};
        if (!Array.isArray(mockSpecDetailIds)) return;
        res.goodsSpecs.forEach((item) => {
          mockSpecDetailIds.forEach((id) => {
            if (item.specDetailIds.includes(id)) {
              // 默认选中第一个规格值
              item.defaultVal = id;
            }
          });
        });
      }
      const {saleType} = res.goods || {};
      Taro.hideTabBar();
      this._getComponentState(saleType === 1 ? 'retailVisible' : 'wholesaleVisible');
      this._getComponentState('chosenSpu', res);
      openModalHideComponent(true);
    } catch (error) {
      error?.message &&
        Taro.showToast({
          title: error?.message,
          icon: 'none',
          duration: 2000,
        });
    }
  };

  // 改变state
  _getComponentState = (key, value?: any) => {
    if (['wholesaleVisible', 'retailVisible'].includes(key)) {
      this.setState({[key]: !this.state[key]});
    } else {
      this.setState({[key]: value});
    }
  };

  // 获取 - 企业购信息
  _getIepInfo = async () => {
    const res = await VAS.fetchIepInfo();
    this.setState({
      iepInfo: res || {},
    });
  };

  // 点击商品，进入商品详情页
  _goGoodsDetails = async (goodsInfo = {} as any) => {
    const {type} = this.props;
    const {recommendConfig} = this.state;
    //记录goodsId
    this.setState(
      {
        goodsId: goodsInfo.goodsId,
      },
      () => {
        this._clickGoods({
          eventType: 1, //0：浏览，1：点击，2：加购，3：下单
        });
      },
    );
    Taro.redirectTo({
      url: `/pages/package-B/goods/goods-details/index?skuId=${goodsInfo.goodsInfoId}&type=${type}&recommendType=${recommendConfig.tacticsType}`,
    });
  };

  // 埋点
  _clickGoods = async (
    params = {} as {
      goodsId?: string;
      eventType: number;
    },
  ) => {
    const {type} = this.props;
    const {recommendConfig, goodsId} = this.state;
    if (!params?.goodsId) {
      params.goodsId = goodsId;
    }

    pvUvStatics.buriedPoint({
      ...params,
      // 0-热门推荐，1-基于商品相关性推荐，2-基于用户兴趣推荐
      recommendType: recommendConfig.tacticsType,
      type,
    });
  };

  // 立即购买
  _didConfirm = async (buyGoodsInfos) => {
    const {type} = this.props;
    const {recommendConfig, goodsId} = this.state;
    try {
      const skuList = buyGoodsInfos.map((item) => {
        return {
          skuId: item.goodsInfoId,
          num: item.buyCount,
        };
      });

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

      await Taro.navigateTo({
        url: `/pages/package-C/order/order-confirm/index?type=1&skuId=${goodsId}&type=${type}&recommendType=${recommendConfig.tacticsType}`,
      });
    } catch (e) {
      if (e.code == 'K080134') {
        return Taro.showToast({
          title: '您没有预约购买资格',
          icon: 'none',
          duration: 2000,
        });
      }

      Taro.showToast({
        title: e.message,
        icon: 'none',
        duration: 2000,
      });
    }
  };

  render() {
    const {wholesaleVisible, chosenSpu, retailVisible, iepInfo, dataSource, recommendConfig} = this.state;
    const {
      recommendListCOMStyle = {},
      getShopCartNumCallBack,
      openModalHideComponent,
      changeCommonModalProps,
      recommendGoodsListSpuStyle,
    } = this.props;

    // 没有拿到热门推荐商品坑位数据，不渲染坑位dom
    if (!dataSource.length || !Array.isArray(dataSource)) return null;

    let commonModalProps = {
      list: chosenSpu, // 商品规格数据传进组件内
      openType: '3',
      goodsBuyTypes: chosenSpu?.goods?.goodsBuyTypes, // 判断下单方式
      onClose: () => {
        this.fnResetState(() => {
          openModalHideComponent(false);
        });
      }, // 关闭弹窗
      _didConfirm: (buyGoodsInfos) => this._didConfirm(buyGoodsInfos), // 立即购买
      getCartNums: (num) => getShopCartNumCallBack(num),
      specContainerStyle: {},
      chooseStyle: {
        bottom: __TARO_ENV === 'h5' ? '50px' : 0,
      },
    };
    commonModalProps = {...commonModalProps, ...changeCommonModalProps};

    return (
      <View className="recommend_goods_list_scroll" style={recommendListCOMStyle}>
        <View>
          {/* 坑位标题 */}
          <Title title={recommendConfig.title} />
          {/* 列表 */}
          <ImgSlides
            dataSource={dataSource}
            _spuAddCartFunc={this._spuAddCartFunc}
            _goGoodsDetails={this._goGoodsDetails}
            recommendGoodsListSpuStyle={recommendGoodsListSpuStyle}
          />
        </View>

        {/* spu批发规格弹窗 */}
        {wholesaleVisible && chosenSpu && Object.keys(chosenSpu).length ? (
          <WholesaleChoose2
            {...commonModalProps}
            _clickGoods={(eventType) =>
              this._clickGoods({
                eventType: eventType, //0：浏览，1：点击，2：加购，3：下单
              })
            }
          />
        ) : null}

        {/* spu零售规格弹窗 */}
        {retailVisible && chosenSpu && Object.keys(chosenSpu).length ? (
          <RetailChoose2
            getSkuInfo={this._getSkuInfo}
            iepInfo={iepInfo}
            {...commonModalProps}
            _clickGoods={(eventType) =>
              this._clickGoods({
                eventType: eventType, //0：浏览，1：点击，2：加购，3：下单
              })
            }
          />
        ) : null}
      </View>
    );
  }

  /**
   * 重置state
   */
  fnResetState = (callBack?) => {
    this.setState(
      {
        wholesaleVisible: false,
        retailVisible: false,
        chosenSpu: {},
      },
      () => {
        callBack?.();
        if (__TARO_ENV === 'weapp') {
          setTimeout(() => {
            Taro.showTabBar();
          }, 1000);
        } else {
          Taro.showTabBar();
        }
      },
    );
  };
}
