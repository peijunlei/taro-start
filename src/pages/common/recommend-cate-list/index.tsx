import React from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';
import {noop, VAS} from 'wmkit';
import {goodsRecommendList, goodsRecommendListForUnLogin, clickGoods} from 'api/IntelligentRecommendationController';
// 列表
import List from './components/list';
import './index.less';

// 推荐商品 - 分类列表
export default class RecommendCateList extends React.Component<any, any> {
  static defaultProps = {
    // type坑位类型：0-购物车，1-商品详情，2-商品列表，3-个人中心，4-会员中心，5-收藏商品，6-支付成功页，7-分类页，8-魔方
    // string
    type: '7',
    pageIndex: 0,
    pageSize: 10,
    // 商品为0，类目为1
    recommendType: 1,
    relationCateIdList: [],
    // 当坑位有数据时，隐藏父组件‘没有更多了’提示语等
    setHideModule: noop,
    // 当前页数据数量是否 等于 pageSize
    getCurrentPageDataIsComplete: noop,
    // 重新设定pageIndex
    setPageIndex: noop,
    // 外层style样式
    recommendListCOMStyle: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      // 热门推荐商品坑位 - 数据
      dataSource: [],
      // 热门推荐商品坑位 - 标题
      recommendConfig: {},
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
      this.props.relationCateIdList.length !== prevProps.relationCateIdList.length;
    if (bol) {
      this._getHotGoodsList();
    }
  }

  // 获取 - 热门推荐商品 - 数据
  _getHotGoodsList = async () => {
    let recommendSwitch = await VAS.checkRecommendAuth();
    if (!recommendSwitch) {
      return;
    }
    const {dataSource} = this.state;
    let {
      type,
      pageIndex,
      pageSize,
      recommendType,
      relationCateIdList,
      setHideModule,
      getCurrentPageDataIsComplete,
      setPageIndex,
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
      relationCateIdList,
    };

    if (!dataSource.length && pageIndex > 0) {
      return setPageIndex(0);
    }

    const token = Taro.getStorageSync('authInfo:token');
    const res = token ? await goodsRecommendList(params) : await goodsRecommendListForUnLogin(params);

    try {
      let {goodsCateVOList, recommendPositionConfigurationVO} = res || {};
      goodsCateVOList = goodsCateVOList || [];
      recommendPositionConfigurationVO = recommendPositionConfigurationVO || {};
      const {isOpen} = recommendPositionConfigurationVO;

      let data = [];
      if (isOpen === 1) {
        // 若当前页数据 < pageSize 且 Math.floor(old_pageIndex) === pageIndex，则当前页最新数据替换当前页旧数据
        if (old_pageIndex !== pageIndex && Math.floor(old_pageIndex) === pageIndex) {
          dataSource.splice(pageIndex);
          dataSource.concat(goodsCateVOList);
        }

        data = !pageIndex ? goodsCateVOList : [...dataSource, ...goodsCateVOList];
        // 当 热门推荐商品坑位数据为空 时，返回false，否则为true
        setHideModule(!!data.length);
        getCurrentPageDataIsComplete(goodsCateVOList.length < pageSize);
      } else {
        setHideModule(false);
      }

      this.setState({
        dataSource: data,
        recommendConfig: recommendPositionConfigurationVO,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 改变state
  _getComponentState = (key, value?: any) => {
    this.setState({[key]: value});
  };

  // 埋点
  _clickCates = async (params = {}) => {
    const {type} = this.props;
    const {recommendConfig} = this.state;
    const token = Taro.getStorageSync('authInfo:token');

    if (!token) return;
    let recommendSwitch = await VAS.checkRecommendAuth();
    if (recommendSwitch) {
      await clickGoods({
        ...params,
        // 0-热门，1-相关性
        recommendType: recommendConfig.tacticsType,
        type,
      });
    }
  };

  render() {
    const {dataSource, recommendConfig} = this.state;
    const {recommendListCOMStyle = {}} = this.props;
    // console.log('kkkkkkkkkkkkkkkkkkkkkk', this.state, this.props);

    // 没有拿到热门推荐商品坑位数据，不渲染坑位dom
    if (!dataSource.length || !Array.isArray(dataSource)) return null;

    return (
      <View className="recommend_goods_list" style={recommendListCOMStyle}>
        <View>
          {/* 列表 */}
          <List dataSource={dataSource} title={recommendConfig.title} _clickCates={this._clickCates} />
        </View>
      </View>
    );
  }
}
