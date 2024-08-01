import {ScrollView, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//搜索
import Search from './components/search';
//悬浮弹窗
import MenuBox from '@/pages/common/menu-box/index';
//spu列表
import SpuList from './components/spu-list';
//spu大图列表
import BigSpuList from './components/big-spu-list';
//sku列表
import SkuList from './components/sku-list';
//sku大图列表
import BigSkuList from './components/big-sku-list';
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
import {getHashParam} from '@/utils/common-functions';
// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';
import { msg } from 'wmkit';

/**
 * 分销功能与直播功能均关闭时，tabbar展示的商品列表
 */
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class TabBarGoodsList extends Component<Partial<T.IProps>, any> {
  // componentDidMount() {
  //   const {spreadFlag} = getCurrentInstance().router.params;

  //   Taro.setNavigationBarTitle({title: spreadFlag ? '推广商品列表' : '商品列表'});
  //   this.props.actions.init(getCurrentInstance().router.params);
  // }
  static defaultProps = {
    hasTabbar: false,
  };
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  componentDidMount() {
    console.log('componentDidMount',this.props)
    msg.on({
      'refreshGoodsList':()=>{
        const current = getCurrentInstance();
        const {onShow} = current.router;
        const param = getHashParam<any>(onShow.split('.')[0]);
        this.props.actions.init(getCurrentInstance().router.params || param);
      }
    })
    const current = getCurrentInstance();
    const {onShow} = current.router;
    const param = getHashParam<any>(onShow.split('.')[0]);
    this.props.actions.init(getCurrentInstance().router.params || param);

    const {spreadFlag} = getCurrentInstance().router.params||{};

    Taro.setNavigationBarTitle({title: spreadFlag ? '推广商品列表' : '商品列表'});
  }
  componentDidShow() {
    this.props.actions.updateShopCartNum();
    const current = getCurrentInstance();
    const {onShow} = current.router;
    const param = getHashParam<any>(onShow.split('.')[0]);
    // this.props.actions.init(getCurrentInstance().router.params || param);
    const {spreadFlag} = getCurrentInstance().router.params;
    Taro.setNavigationBarTitle({title: spreadFlag ? '推广商品列表' : '商品列表'});
  }

  componentDidHide() {
    this.props.actions.closeModal();
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps?.main?.loadStatus !== 'loaded') {
  //     return false;
  //   }
  //   return true;
  // }

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  _onScrollToLower = () => {
    const {
      main: {goods, total},
    } = this.props;
    this.props.actions.goodsAction.nextPage();
  };

  state = {
    pageIndex: 0,
    isRecommendEmpty: true,
  };

  // 热门推荐商品坑位
  _getRecommendGoodsList = () => {
    const {pageIndex} = this.state;
    const {goods, total, imageShowType} = this.props.main || {};
    const {goodsAction} = this.props.actions || {};

    if (!(goods.length && total && goods.length === total)) return null;
    return (
      <RecommendGoodsList
        pageIndex={pageIndex}
        type="2"
        wrapStyle={{
          paddingTop: imageShowType ? '6px' : '16px',
          paddingBottom: '30px',
        }}
        getShopCartNumCallBack={goodsAction._getShopCartNum}
        isSetSpecContainerStyle={false}
        changeCommonModalProps={{
          chooseStyle: {
            bottom: 0,
          },
        }}
        setIsRecommendEmpty={(bol) => this.setState({isRecommendEmpty: bol})}
      />
    );
  };

  protected loadingStatus = async (params: Function) => {
    Taro.showLoading();
    await new Promise((resolve) => {
      params();
      resolve();
    });
    Taro.hideLoading();
  };

  render() {
    // const { spreadFlag } = getCurrentInstance().router.params;
    const {
      actions: {goodsAction},
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
        totalPages
      } = {},
      hasTabbar,
    } = this.props;
    const scrollTop = 0;
    const Threshold = 20;
    //@ts-ignore
    const isH5 = __TARO_ENV === 'h5';
    const {isRecommendEmpty} = this.state;
    return (
      main && (
        <View className="loginGoodsList" style={hasTabbar && __TARO_ENV == 'h5' ? {height: 'calc(100vh - 50px)'} : {}}>
          {/* 搜索 */}
          <Search loadingStatus={this.loadingStatus} />
          {/* 悬浮弹窗 */}
          <MenuBox
            handleClose={() => goodsAction.commonChange('main.isMenuBoxFlag', false)}
            menuList={menuList}
            isMenuBoxFlag={isMenuBoxFlag}
          />

          {/* 功能导航 */}
          <NavTools />

          {spreadFlag ? (
            /*----- 推广商品列表----*/
            <ScrollView
              className={imageShowType === 1 ? 'goods-list-scroll-view loginGoodsGreyList' : 'goods-list-scroll-view'}
              scrollY
              scrollWithAnimation
              scrollTop={isH5 ? null : goods.length == 0 ? 0.01 : scrollTop}
              lowerThreshold={Threshold}
              upperThreshold={Threshold}
              onScrollToLower={() => {
                this._onScrollToLower();
                if (goods.length && total && goods.length === total) {
                  this.setState(({pageIndex}) => ({
                    pageIndex: pageIndex + 10,
                  }));
                }
              }}
              style={
                navToolsObj.arrowFlag || navToolsObj.arrowFlag ? {position: 'fixed', bottom: 0} : {position: 'relative'}
              } // 打开弹框后fixed阻止iOS回弹
            >
              {/* imageShowType=0: 小图 imageShowType=1: 大图*/}
              {imageShowType === 0 ? <SkuList /> : <BigSkuList />}
              {loadSkeleton && imageShowType === 0 && main.request.pageNum==0 && <SkeletonSmall />}
              {loadSkeleton && imageShowType === 1 && main.request.pageNum==0 && <SkeletonBig />}
              {loadStatus === 'loaded' && goods.length === 0 && (
                <Blank
                  style={{paddingTop: 0, position: 'absolute', top: '30%', width: '100%'}}
                  content="没有搜到任何商品哦"
                  img={noneImg}
                />
              )}
              {loadStatus === 'loaded' && goods.length !== 0 && request.pageNum+1 === totalPages && isRecommendEmpty && (
                <View className="status">没有更多了</View>
              )}
              {goods.length !== 0 && goods.length>=10 && request.pageNum+1 !== totalPages && <View className="status">上拉加载更多</View>}

              {/* 热门商品推荐 */}
              {this._getRecommendGoodsList()}
            </ScrollView>
          ) : (
            /*----- 普通商品列表----*/
            <ScrollView
              className={imageShowType === 1 ? 'goods-list-scroll-view loginGoodsGreyList' : 'goods-list-scroll-view'}
              scrollY
              scrollWithAnimation
              scrollTop={isH5 ? null : goods.length == 0 ? 0.01 : scrollTop}
              lowerThreshold={Threshold}
              upperThreshold={Threshold}
              // onScrollToUpper={this._onScrollToUpper}
              onScrollToLower={() => {
                this._onScrollToLower();
                if (goods.length && total && goods.length === total) {
                  this.setState(({pageIndex}) => ({
                    pageIndex: pageIndex + 10,
                  }));
                }
              }}
              style={
                navToolsObj.arrowFlag || navToolsObj.arrowFlag ? {position: 'fixed', bottom: 0} : {position: 'relative'}
              } // 打开弹框后fixed阻止iOS回弹
            >
              {/*goodsShowType=1: spu列表 goodsShowType=0: sku列表 imageShowType=0: 小图 imageShowType=1: 大图*/}
              {goodsShowType === 1 && imageShowType === 0 && <SpuList />}
              {goodsShowType === 0 && imageShowType === 0 && <SkuList />}
              {goodsShowType === 1 && imageShowType === 1 && <BigSpuList />}
              {goodsShowType === 0 && imageShowType === 1 && <BigSkuList />}
              {loadSkeleton && imageShowType === 0 && main.request.pageNum==0 && <SkeletonSmall />}
              {loadSkeleton && imageShowType === 1 && main.request.pageNum==0 && <SkeletonBig />}
              {loadStatus === 'loaded' && goods.length == 0 && (
                <Blank
                  style={{paddingTop: 0, position: 'absolute', top: '30%', width: '100%'}}
                  content="没有搜到任何商品哦"
                  img={noneImg}
                />
              )}
              {loadStatus === 'loaded' && goods.length !== 0 && request.pageNum+1 === totalPages && isRecommendEmpty && (
                <View className="status">没有更多了</View>
              )}
              {goods.length !== 0 && goods.length>=10 && request.pageNum+1 !== totalPages && <View className="status">上拉加载更多</View>}

              {/* 热门商品推荐 */}
              {this._getRecommendGoodsList()}
            </ScrollView>
          )}
          {loadStatus !== 'loaded' && main.request.pageNum != 0 && <WMLoading />}
          {/* 更新购物角标 */}
          {/* 弹框打开后，将底层列表置为 fixed，阻止ios上上下滑动回弹效果，弹框关闭后还原, 此判断保持购物车图标位置不会因上层fixed而飘移 */}
          <ShopCarNum
            style={navToolsObj.arrowFlag || navToolsObj.arrowFlag ? {position: 'fixed'} : {position: 'absolute'}}
          />

          {/* 综合筛选框 */}
          {navToolsObj.arrowFlag && <CompositePicker />}
          {/* 筛选弹框 */}
          {navToolsObj.screenIsShow && <ScreenModal />}
          {/* spu批发规格弹窗 */}
          {main && batchSpecIsShow && (
            <WholesaleChoose
              chooseStyle={{bottom: process.env.TARO_ENV === 'h5' && hasTabbar ? '50px' : 0}}
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
              chooseStyle={{bottom: process.env.TARO_ENV === 'h5' && hasTabbar ? '50px' : 0}}
              list={goodsSpecs} //商品规格数据传进组件内
              openType={openType}
              flashsaleGodos={flashsaleGoods}
              goodsBuyTypes={goodsSpecs.goods.goodsBuyTypes} //判断下单方式
              getCartNums={(count) => {
                goodsAction.commonChange('main.shopCarNum', count);
              }}
              onClose={() => goodsAction.commonChange('main.retailSpecIsShow', false)} //关闭弹窗
              iepInfo={iepInfo}
              _didConfirm={(buyGoodsInfos) => {
                goodsAction._didConfirm(buyGoodsInfos);
              }} //立即购买
              rushToBuying={(id, num) => goodsAction.rushToBuyingFlashSaleGoodsInfo(id, num)} //秒杀 立即抢购
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
}

//create by moon https://github.com/creasy2010/moon
