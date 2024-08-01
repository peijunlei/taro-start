import { ScrollView, View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import lodash from 'lodash';
//搜索
import Search from './components/search';
//悬浮弹窗
import MenuBox from '@/pages/common/menu-box/index';
//spu列表
import SpuList from './components/spu-list';
//spu大图列表
import BigSpuList from './components/big-spu-list';
//功能导航
import NavTools from './components/nav-tools';
//综合筛选框
import CompositePicker from './components/composite-picker';
//筛选弹框
import ScreenModal from './components/screen-modal';
//批发规格弹窗
import WholesaleChoose from '@/pages/common/goods/wholesale-choose';
//零售规格弹窗
import RetailChoose from '@/pages/common/goods/retail-choose';
//更新购物车角标
import ShopCarNum from './components/shop-cart-num';
//无数据
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/empty/search-empty.png';
//分享赚弹窗
import GoodsShare from '@/pages/common/goods/goods-share';
import ShareModal from '@/pages/common/share-modal';
import WMLoading from '@/pages/common/loading';

import SkeletonSmall from './skeleton/skeleton-small';
import SkeletonBig from './skeleton/skeleton-big';
import { getHashParam } from '@/utils/common-functions';
// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';
import { pvUvStatics } from 'wmkit';
import CateItems from './components/cateItems';

const componentMap = {
  // {/*goodsShowType=1: spu列表 goodsShowType=0: sku列表 imageShowType=0: 小图 imageShowType=1: 大图*/}
  '10': <SpuList />,
  '11': <BigSpuList />,
};
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ChannelGoodsList extends Component<Partial<T.IProps>, any> {
  static defaultProps = {
    id: '',
    isTabbar: false,
  };
  
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  componentDidMount() {
    const current = getCurrentInstance();
    const params = current.router?.params || {};
    console.log('params', params,this.props);
    const { spreadFlag } = params;
    this.props.actions.init(params,this.props);
    Taro.setNavigationBarTitle({ title: spreadFlag ? '推广商品列表' : '商品列表' });
    Taro.getSystemInfo({
      success: (res) => {
        this.setState({
          contentHeight: res.windowHeight - 88,
        });
      },
    });
  }
  componentDidShow() {
    pvUvStatics.myPvUvStatis({});
    this.props.actions.updateShopCartNum();
  }
  componentDidHide() {
    if (__TARO_ENV === 'weapp') {
      const { main } = this.props;
      main.requestTask?.abort();
    }
    this.props.actions.closeModal();
  }
  componentWillUnmount() {
    if (__TARO_ENV === 'weapp') {
      const { main } = this.props;
      main.requestTask?.abort();
    }
    this.props.actions.clean();
  }

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  _onScrollToLower = () => {
    this.props.actions.goodsAction.nextPage();
  };

  state = {
    pageIndex: 0,
    isHideModule: true,
    currentPageDataIsComplete: false,
  };

  // 热门推荐商品坑位
  _getRecommendGoodsList = () => {
    const { pageIndex } = this.state;
    const { goods, total, imageShowType, loadStatus, totalPages, request } = this.props.main || {};
    const { goodsAction } = this.props.actions || {};

    if (!(request.pageNum + 1 === totalPages && loadStatus === 'loaded')) return null;
    return (
      <RecommendGoodsList
        pageIndex={pageIndex}
        type="2"
        recommendListCOMStyle={{
          paddingTop: imageShowType ? 0 : '6px',
          paddingBottom: '30px',
        }}
        getShopCartNumCallBack={goodsAction._getShopCartNum}
        changeCommonModalProps={{
          chooseStyle: {
            bottom: 0,
          },
        }}
        getCurrentPageDataIsComplete={(bol) => this.setState({ currentPageDataIsComplete: bol })}
        setPageIndex={(index) => this.setState({ pageIndex: index })}
        setHideModule={(bol) => this.setState({ isHideModule: bol })}
      />
    );
  };

  // 热门推荐商品坑位 - ScrollView触发事件
  onScrollToLowerGetRecommendGoodsList = lodash.debounce(() => {
    const { goods, total, request, totalPages } = this.props.main || {};
    const { pageNum } = request
    const { currentPageDataIsComplete } = this.state;
    if ((pageNum + 1 === total) || !total) {
      this.setState(({ pageIndex }) => ({
        pageIndex: currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10,
      }));
    }
  }, 1000);

  protected loadingStatus = async (params: Function) => {
    Taro.showLoading();
    await new Promise((resolve) => {
      params();
      resolve();
    });
    Taro.hideLoading();
  };
  renderGoodsList() {
    const { goodsShowType, imageShowType } = this.props.main
    const goodsComponentKey = `${goodsShowType}${imageShowType}`;
    return componentMap[goodsComponentKey] || <SpuList />;
  }
  render() {
    // const { spreadFlag } = getCurrentInstance().router.params;
    const {
      actions: { goodsAction },
      main,
      main: {
        goods,
        menuList,
        isMenuBoxFlag,
        imageShowType,
        total,
        goodsShowType,
        goodsSpecs,
        navToolsObj,
        retailSpecIsShow,
        batchSpecIsShow,
        goodsInfo,
        openType,
        goodsShareVisible,
        iepInfo,
        shareModalVisible,
        addSelfShop,
        loadStatus,
        loadSkeleton,
        flashsaleGoods,
        spreadFlag,
        isOpenWechat,
        request,
        totalPages,
        cateItems,
        isTabbar
      } = {},
    } = this.props;
    const scrollTop = 0;
    const Threshold = 20;
    //@ts-ignore
    const isH5 = __TARO_ENV === 'h5';
    const { isHideModule } = this.state;
    const { level } = getCurrentInstance()?.router?.params || {};
    return (
      main && (
        <View className={`ChannelGoodsList ${!imageShowType ? 'ChannelGoodsList_big' : ''}`}
          style={{height:isTabbar?'calc(100vh - 50px)':'100vh'}}
        >
          {/* 搜索 */}
          <Search loadingStatus={this.loadingStatus} />

          {/* 功能导航 */}
          <NavTools loadingStatus={this.loadingStatus} />
          {/* 频道分类 */}
          <CateItems
            onItemClick={(id: number) => {
              // const ids = main.request.goodsChannelCateIdList
              goodsAction.commonChange('main.request.goodsChannelCateIdList', id === 0 ? [] : [id]);
              goodsAction.query(true, main.goodsShowType);
            }}
            data={cateItems}
            activeIndex={main.request.goodsChannelCateIdList.length === 0 ? 0 : main.request.goodsChannelCateIdList[0]}
          />
          {/* 普通商品列表 */}
          <ScrollView
            className={imageShowType === 1 ? 'goods-list-scroll-view loginGoodsGreyList' : 'goods-list-scroll-view'}
            scrollY
            scrollWithAnimation
            scrollTop={isH5 ? null : goods.length == 0 ? 0.01 : scrollTop}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
            onScrollToLower={() => {
              this._onScrollToLower();
            }}
            // onScroll={(e) => this.onScroll(e)}
            style={
              navToolsObj.arrowFlag || navToolsObj.arrowFlag ? { position: 'fixed', bottom: 0 } : { position: 'relative' }
            } // 打开弹框后fixed阻止iOS回弹
          >
            {this.renderGoodsList()}
            {loadSkeleton && imageShowType === 0 && main.request.pageNum == 0 && <SkeletonSmall />}
            {loadSkeleton && imageShowType === 1 && main.request.pageNum == 0 && <SkeletonBig />}
            {loadStatus === 'loaded' && goods.length == 0 && (
              <Blank
                style={{ paddingTop: 0, position: 'absolute', top: '30%', width: '100%' }}
                content="没有搜到任何商品哦"
                img={noneImg}
              />
            )}
            {loadStatus === 'loaded' && goods.length !== 0 && request.pageNum + 1 === totalPages && (
              <View className="status">没有更多了</View>
            )}
            {goods.length !== 0 && goods.length >= 5 && request.pageNum + 1 !== totalPages && <View className="status">上拉加载更多</View>}
          </ScrollView>
          {loadStatus !== 'loaded' && main.request.pageNum != 0 && <WMLoading />}
          {/* 更新购物角标 */}
          {/* 弹框打开后，将底层列表置为 fixed，阻止ios上上下滑动回弹效果，弹框关闭后还原, 此判断保持购物车图标位置不会因上层fixed而飘移 */}
          <ShopCarNum
            shopCarNum={main.shopCarNum}
            style={navToolsObj.arrowFlag || navToolsObj.arrowFlag ? { position: 'fixed' } : { position: 'absolute' }}
          />

          {/* 综合筛选框 */}
          {navToolsObj.arrowFlag && <CompositePicker />}
          {/* 筛选弹框 */}
          {navToolsObj.screenIsShow && <ScreenModal hasNoCateFilter={level == 'level3'} />}
          {/* spu批发规格弹窗 */}
          {main && batchSpecIsShow && (
            <WholesaleChoose
              list={goodsSpecs} //商品规格数据传进组件内
              openType={openType}
              goodsBuyTypes={goodsSpecs.goods.goodsBuyTypes} //判断下单方式
              getCartNums={(count) => {
                goodsAction.commonChange('main.shopCarNum', count);
              }}
              onClose={() => goodsAction.commonChange('main.batchSpecIsShow', false)} //关闭弹窗
              _didConfirm={(buyGoodsInfos) => {
                goodsAction._didConfirm(buyGoodsInfos);
              }} //立即购买
            />
          )}
          {/* spu零售规格弹窗 */}
          {main && retailSpecIsShow && (
            <RetailChoose
              list={goodsSpecs} //商品规格数据传进组件内
              openType={openType}
              isDangaoss={goodsSpecs.goods.goodsType === 8}
              flashsaleGodos={flashsaleGoods}
              goodsBuyTypes={goodsSpecs.goods.goodsBuyTypes} //判断下单方式
              getCartNums={(count) => {
                goodsAction.commonChange('main.shopCarNum', count);
              }}
              onClose={() => {
                goodsAction.commonChange('main.retailSpecIsShow', false)
                if(main.isTabbar){
                  Taro.showTabBar();
                }
              }} //关闭弹窗
              iepInfo={iepInfo}
              _didConfirm={(buyGoodsInfos) => {
                goodsAction._didConfirm(buyGoodsInfos);
              }} //立即购买
              rushToBuying={(id, num) => goodsAction.rushToBuyingFlashSaleGoodsInfo(id, id, num)} //秒杀 立即抢购
            />
          )}

          {/* 分销分享赚弹框 */}
          {goodsShareVisible && (
            <GoodsShare
              checkedSku={goodsInfo}
              onClose={() => goodsAction.commonChange('main.goodsShareVisible', false)}
              addSelfShop={(val) => goodsAction.commonChange('main.addSelfShop', val)}
              shareModalVisible={() => goodsAction.commonChange('main.shareModalVisible', true)}
              isOpenWechat={isOpenWechat}
            />
          )}
          {shareModalVisible && Object.keys(goodsInfo).length > 0 ? (
            <ShareModal
              closeVisible={() => {
                //显示tab
                Taro.showTabBar();
                //弹窗关闭
                goodsAction.commonChange('main.shareModalVisible', false);
              }}
              addSelfShop={addSelfShop}
              goodsInfo={goodsInfo}
              goods={{}}
              shareType={2}
              shareModalVisible={shareModalVisible}
            />
          ) : null}
        </View>
      )
    );
  }

  onScroll(event) {
    // 这里先随意设置一个值 250 保证执行
    // 滚动滚动条位置 + 滚动区域高度 + 250 大于滚动条高度时执行下一页
    if (event.detail.scrollTop + this.state.contentHeight + 250 > event.detail.scrollHeight) {
      // console.log('eeee  5');
      this._onScrollToLower();
      this.onScrollToLowerGetRecommendGoodsList();
    }
  }
}

//create by moon https://github.com/creasy2010/moon
