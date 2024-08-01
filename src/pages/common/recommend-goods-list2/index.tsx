import React from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';
import {VAS, noop, pvUvStatics} from 'wmkit';

import {goodsRecommendList, goodsRecommendListForUnLogin} from 'api/IntelligentRecommendationController';
import {detail, unLoginDetail, spuSpec} from 'api/GoodsInfoBaseController';

import {mergeData} from '@/wmkit/common/mergedata';
// 标题
import Title from './../recommend-goods-list/components/title';
// 列表
import List from './../recommend-goods-list/components/list';
import './../recommend-goods-list/index.less';

// 推荐商品 - 坑位列表
export default class RecommendGoodsList extends React.Component<any, any> {
  static defaultProps = {
    // type坑位类型：0-购物车，1-商品详情，2-商品列表，3-个人中心，4-会员中心，5-收藏商品，6-支付成功页，7-分类页，8-魔方
    // string
    isFromC: false,
    type: '1',
    pageIndex: 0,
    pageSize: 10,
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
    /**
     * 向上层组件抛数据
     */
    recommendStateCallBack: noop,
    // 是否开启loading
    setIsLoading: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      // 热门推荐商品坑位 - 数据
      dataSource: [],
      // 热门推荐商品坑位 - 标题
      recommendConfig: {},
      // 数据是否到底（即：全部查完了）
      noMore: false,
      goodsId: '',
    };
  }

  componentDidMount() {
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
    const {dataSource, recommendConfig} = this.state;
    let {
      type,
      pageIndex,
      pageSize,
      recommendType,
      relationGoodsIdList,
      setHideModule,
      getCurrentPageDataIsComplete,
      setPageIndex,
      isFromC,
      setIsLoading,
    } = this.props;
    const old_pageIndex = pageIndex;
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

    // fix bug ID1078653
    if (isFromC && !token) return;

    let recommendSwitch = await VAS.checkRecommendAuth();
    if (!recommendSwitch) {
      return;
    }

    setIsLoading?.(true);
    // finally()方法在小程序基础库版本大于2.16.3时支持
    const res = await (token ? goodsRecommendList(params) : goodsRecommendListForUnLogin(params)).finally(() => {
      setTimeout(() => {
        setIsLoading?.(false);
      }, 1000);
    });

    try {
      let {goodsVOList, recommendPositionConfigurationVO} = res || {};
      goodsVOList = goodsVOList || [];
      recommendPositionConfigurationVO = recommendPositionConfigurationVO || {};
      const {isOpen} = recommendPositionConfigurationVO;

      // 当上一次获取的tacticsType 和 当前获取的tacticsType不相等时，强制重置pageIndex
      // 推荐策略tacticsType：0-热门推荐，1-基于商品相关性推荐，2-基于用户兴趣推荐
      /**
       * 基于用户兴趣推荐时，
       * 未登录情况下，展示热门推荐内容，
       * 已登录情况下，展示基于用户兴趣推荐
       */
      if (
        typeof recommendConfig.tacticsType !== 'undefined' &&
        recommendConfig.tacticsType !== recommendPositionConfigurationVO.tacticsType
      ) {
        this.props.recommendStateCallBack({
          recommendConfig: recommendPositionConfigurationVO,
        });

        return this.setState(
          {
            recommendConfig: recommendPositionConfigurationVO,
          },
          () => {
            setPageIndex(0);
          },
        );
      }

      let data = [];
      if (isOpen === 1) {
        // 若当前页数据 < pageSize 且 Math.floor(old_pageIndex) === pageIndex，则当前页最新数据替换当前页旧数据
        if (old_pageIndex !== pageIndex && Math.floor(old_pageIndex) === pageIndex) {
          if (goodsVOList.length) {
            dataSource.splice(pageIndex);
          }
        }

        data = !pageIndex ? goodsVOList : [...dataSource, ...goodsVOList];
        // 当 热门推荐商品坑位数据为空 时，返回false，否则为true
        setHideModule(!!data.length);
        getCurrentPageDataIsComplete(goodsVOList.length < pageSize);
      } else {
        setHideModule(false);
      }

      this.setState({
        dataSource: data,
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

  // '+' 加入购物车
  _spuAddCartFunc = async (skuId = '', goodsId = '') => {
    //记录goodsId
    this.setState({goodsId: goodsId}, () => {
      this._clickGoods({
        eventType: 1, //0：浏览，1：点击，2：加购，3：下单
      });
    });
    const {openModalHideComponent} = this.props;
    try {
      const res = await this._findSkuInfo(skuId);

      // 商品规格里面添加一个默认值
      if (Array.isArray(res?.goodsSpecs) && res?.goodsSpecs?.length) {
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
      this._getComponentState('chosenSpu', res);
      openModalHideComponent(true);

      this.props.recommendStateCallBack({
        goodsId,
        wholesaleVisible: saleType === 0,
        retailVisible: saleType === 1,
        skuGoosInfos: res,
      });
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
    this.setState({[key]: value});
  };

  // 点击商品，进入商品详情页
  _goGoodsDetails = async (goodsInfo = {} as any) => {
    const {type} = this.props;
    const {recommendConfig} = this.state;

    this.props.recommendStateCallBack({
      goodsId: goodsInfo?.goodsId,
    });

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
    Taro.navigateTo({
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

  render() {
    const {dataSource, recommendConfig, noMore} = this.state;
    const {recommendListCOMStyle = {}, recommendGoodsListSpuStyle} = this.props;

    // 没有拿到热门推荐商品坑位数据，不渲染坑位dom
    if (!dataSource.length || !Array.isArray(dataSource)) return null;

    return (
      <View className="recommend_goods_list" style={recommendListCOMStyle}>
        <View>
          {/* 坑位标题 */}
          <Title title={recommendConfig.title} />
          {/* 列表 */}
          <List
            dataSource={dataSource}
            _spuAddCartFunc={this._spuAddCartFunc}
            _goGoodsDetails={this._goGoodsDetails}
            recommendGoodsListSpuStyle={recommendGoodsListSpuStyle}
          />
          {/* 底部 */}
          <View className="status">{!noMore ? '上拉加载更多' : '没有更多了'}</View>
        </View>
      </View>
    );
  }
}
