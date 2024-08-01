import {View, ScrollView, Text} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
// import classNames from 'classnames';
import {fetch} from 'api/fetch';
import config from '@/service/config';
import _, {debounce, throttle} from 'lodash';
import Blank from '../blank';
import './index.less';
import {CommonEventFunction} from '@tarojs/components/types/common';
import defaultImg from '@/assets/image/default/no-content.png';
import {WMkit} from 'wmkit';
import WMLoading from '@/pages/common/loading';

// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';
import Empty from '@/pages/package-A/customer/my-coupon/components/empty';

interface IWMListViewProps {
  params?: any; //搜索参数,不用带pageNum,pageSize
  style?: any; //scroll-view样式
  noMoreStyle?: any; //没有更多了样式
  height?: any; //用于指定高度,不填写默认100vh
  noneImg?: string; //为空图片
  noneContent?: string; //为空提示
  isLoadingFlag: boolean;
  url: string; //接口url
  dataPath?: Array<string>; //取数据的路径，从context到content的路径（无需包含context,content）
  dataPreProcessing?: Function; //数据预处理，获取list之后如果需要部分添加修改可以写在这里，返回list
  getData: Function; //回调获取list和total，自行放入父组件的list，自行map
  otherProps?: Array<Array<string>>;
  reload?: boolean; //用于强制listview刷新s
  method?: 'POST' | 'OPTIONS' | 'GET' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  ifPagination?: boolean; //是否需要分页
  scrollY?: boolean; // y方向滚动
  onScrollToUpper?: (event: CommonEventFunction) => any; // 滚动到顶部
  showMore: boolean;
  showText?: boolean;
  isShowRecommendGoodsList?: boolean;
  type?: string;
  recommendListCOMStyle?: any;
  isLoadingMore: boolean;
  changeCommonModalProps: any;
}

interface IWMListViewState {
  list: Array<any>;
  total: number;
  loading: boolean;
  loaded: boolean;
  isEmpty: boolean;
  pageNum: number;
  pageSize: number;
  params: any;
  reload: boolean;
  url: string;
  otherPropsObject: any;
  pageIndex: number;
  relationGoodsIdList: Array<string>;
  isLoadingFlag: boolean;
  delayLoading: boolean;
  isHideModule: boolean;
  currentPageDataIsComplete: boolean;
}

export default class WMListView extends Component<IWMListViewProps, IWMListViewState> {
  constructor(props: IWMListViewProps) {
    super(props);
    this.state = {
      url: '',
      list: [],
      otherPropsObject: {},
      total: 0,
      pageNum: 0,
      pageSize: 15,
      loading: false,
      loaded: false,
      isEmpty: false,
      params: {},
      reload: false,
      isLoadingFlag: true,
      delayLoading: false,
      pageIndex: 0,
      relationGoodsIdList: [],
      isHideModule: true,
      currentPageDataIsComplete: false,
    };
  }

  static defaultProps = {
    height: '100vh',
    params: {},
    method: 'POST',
    reload: false,
    ifPagination: true,
    scrollY: true,
    onScrollToUpper: (e) => {},
    showMore: false,
    showText: false,
    noneImg: defaultImg,
    noneContent: '暂无内容',
    isShowRecommendGoodsList: false,
    type: '5',
    recommendListCOMStyle: {},
    changeCommonModalProps: {},
  };

  componentWillMount() {
    const {url, params} = this.props;
    this.setState(
      {
        url,
        params,
      },
      () => {
        this.init();
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    // console.log('this.state.url', nextProps);
    if (nextProps.url !== this.state.url) {
      this.setState(
        {
          pageNum: 0,
          url: nextProps.url,
          loaded: false,
        },
        () => {
          this.init();
        },
      );
    } else if (nextProps.reload !== this.state.reload) {
      this.setState(
        {
          pageNum: 0,
          reload: nextProps.reload,
          loaded: false,
        },
        () => {
          this.init();
        },
      );
    } else if (!_.isEqual(this.state.params, nextProps.params)) {
      this.setState(
        {
          pageNum: 0,
          loaded: false,
          params: nextProps.params,
        },
        () => {
          this.init();
        },
      );
    }
  }

  render() {
    let {
      isEmpty,
      loaded,
      loading,
      isLoadingFlag,
      delayLoading,
      pageIndex,
      list,
      total,
      relationGoodsIdList,
      isHideModule,
    } = this.state;
    const {
      noneContent,
      noneImg,
      emptyStyle,
      height,
      style,
      ifPagination,
      showMore,
      showText,
      noMoreStyle,
      isLoadingMore = true,
      isShowRecommendGoodsList,
      type,
      recommendListCOMStyle,
      changeCommonModalProps,
    } = this.props;
    console.log('isEmptyisEmpty', isEmpty, loaded);
    return (
      <View>
        <ScrollView
          className="wm-list-view"
          scrollY={this.props.scrollY}
          style={{height, ...style}}
          lowerThreshold={100}
          onScrollToLower={() => {
            this.scrollToLower();
            this.onScrollToLowerRecommendGoodsList();
          }}
          onScrollToUpper={this.props.onScrollToUpper}
        >
          <View>
            {this.props.children}
            {loaded && isEmpty && <Blank img={noneImg} style={emptyStyle} content={noneContent} />}
            {showText && !isLoadingFlag && (
              <View>
                <Text style={{textAlign: 'center', color: '#A8A8A8'}}>当前时段暂无秒杀商品</Text>
              </View>
            )}
            {!isEmpty && !isLoadingFlag && isLoadingMore && delayLoading && !isHideModule ? (
              <View>
                {!showMore && loaded ? (
                  <View className="no-more" style={{...noMoreStyle}}>
                    没有更多了
                  </View>
                ) : (
                  <View className="no-more" style={{...noMoreStyle}}>
                    加载中
                  </View>
                )}
              </View>
            ) : null}
          </View>

          {/* 热门商品推荐 */}
          {isShowRecommendGoodsList && list.length === total ? (
            <RecommendGoodsList
              pageIndex={pageIndex}
              type={type}
              relationGoodsIdList={relationGoodsIdList}
              recommendListCOMStyle={{
                paddingTop: '16px',
                ...recommendListCOMStyle,
              }}
              changeCommonModalProps={changeCommonModalProps}
              getCurrentPageDataIsComplete={(bol) => this.setState({currentPageDataIsComplete: bol})}
              setPageIndex={(index) => this.setState({pageIndex: index})}
              setHideModule={(bol) => this.setState({isHideModule: bol})}
            />
          ) : null}
        </ScrollView>
        {isLoadingFlag && <WMLoading />}
      </View>
    );
  }

  onScrollToLowerRecommendGoodsList = _.debounce(() => {
    if (!this.state.loaded) return;
    this.setState(({pageIndex}) => ({
      pageIndex: this.state.currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10,
    }));
  }, 1000);

  // 添加防抖
  scrollToLower = debounce(
    () => {
      const {isLoadingMore = true} = this.props;
      if (!isLoadingMore) return;
      this.setState(
        {
          pageNum: this.state.pageNum + 1,
        },
        async () => {
          await this.query();
        },
      );
    },
    1000,
    {leading: true},
  );

  init = () => {
    this.setState(
      {
        list: [],
        total: 0,
        pageNum: 0,
        pageSize: this.state.params.pageSize || 15,
        loaded: false,
        isEmpty: false,
        isLoadingFlag: true,
      },
      () => {
        this.query();
      },
    );
  };

  //查询方法
  query = async () => {
    let _this = this;
    let content = [];
    let total = 0;
    let otherPropsObject = this.state.otherPropsObject;
    const {method, dataPath = [], otherProps} = this.props;
    const {url, pageNum, pageSize} = this.state;
    if (this.state.loading || this.state.loaded) {
      return false;
    }
    this.setState(
      {
        isLoadingFlag: true,
        loading: true,
        delayLoading: false,
      },
      async () => {
        //接口调用
        const {context} = await fetch({
          method: method,
          host: WMkit.prefixUrl(),
          url: url,
          data:
            method === 'POST'
              ? {
                  ...(_this.state.params || {}),
                  pageNum,
                  pageSize,
                  keywords: decodeURI(
                    getCurrentInstance().router.params?.keywords || this.state.params.keywords
                      ? getCurrentInstance().router.params?.keywords || this.state.params.keywords
                      : '',
                  ),
                  goodsName: decodeURI(
                    getCurrentInstance().router.params?.keywords || this.state.params.keywords
                      ? getCurrentInstance().router.params?.keywords || this.state.params.keywords
                      : '',
                  ),
                }
              : {...(this.state.params || {})},
        });
        this.setState({
          loading: false,
        });
        setTimeout(() => {
          this.setState({
            isLoadingFlag: false,
          });
        }, 100);
        console.log('context', context);
        if (!context) {
          this.setState({
            list: [],
            total: 0,
            loaded: true,
            isEmpty: true,
          });
          this.props.getData([], 0);
          return;
        }
        //数据处理
        if (dataPath && dataPath.length !== 0) {
          content =
            _.result(context, _.join([...dataPath, 'content'], '.')) ||
            _.result(context, _.join([...dataPath], '.')) ||
            [];
          //后端个别接口 返回数据长度的字段不是total
          total =
            dataPath[0] == 'goodsEvaluateVOPage'
              ? _.result(context, _.join([...dataPath, 'numberOfElements'], '.'))
              : _.result(context, _.join([...dataPath, 'total'], '.')) ||
                _.result(context, _.join([...dataPath, 'totalElements'], '.'));
        } else {
          //@ts-ignore
          content = context.content || context || [];
          //@ts-ignore
          total = context.total || context.totalElements || (Array.isArray(context) && context.length) || 0;
        }

        if (otherProps && otherProps.length > 0) {
          otherProps.map((path = [], key) => {
            const res: Array<any> = _.result(context, _.join([...path], '.')) || [];
            if (otherPropsObject[key]) {
              otherPropsObject[key] = [...otherPropsObject[key], ...res];
            } else {
              otherPropsObject[key] = res;
            }
          });
        }
        let list = [...this.state.list, ...content];
        const {dataPreProcessing, getData} = this.props;

        if (dataPreProcessing) {
          //@ts-ignore
          list = await dataPreProcessing(list, ...(otherPropsObject = []));
        }

        this._getRelationGoodsIdList(list);
        this.setState({
          otherPropsObject,
          list,
          total,
          loaded: total === list.length || total === 0,
          isEmpty: total === 0,
        });
        // console.log('list',list)
        //返回数据
        getData(list, total, otherPropsObject);
        setTimeout(() => {
          this.setState({
            delayLoading: true,
          });
        }, 100);
      },
    );
  };

  _getRelationGoodsIdList = (data = []) => {
    if (!Array.isArray(data)) return;
    this.setState({
      relationGoodsIdList: data.map((item) => item.goodsId) || [],
    });
  };
}

//create by moon https://github.com/creasy2010/moon
