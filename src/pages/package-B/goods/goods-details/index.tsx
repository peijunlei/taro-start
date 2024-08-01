import 'taro-ui/dist/style/components/modal.scss';
import {Image, View} from '@tarojs/components';
import Taro, {getCurrentInstance, getCurrentPages} from '@tarojs/taro';
import React, {Component} from 'react';
import {ImageSlider, ImageViewer} from '@wanmi/ui-taro';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//轮播图
import ImgSlides from '@/pages/common/goods/img-slides';
//价格 标题 副标题 收藏
import GoodsInfo from './components/goods-info/goods-info';
//领券
import GoodsCoupon from './components/goods-coupon';
//规格
import GoodsSpec from './components/goods-spec';
// 商品属性-行业特性参数
import GoodsProperty from './components/goods-property';
//预约购买进度
import BuyStatus from './components/buy-status';
//评价
import GoodsEvaluation from './components/goods-evaluation';
//底部
import Bottom from './components/bottom';
//详情
import GoodsDesc from './components/goods-desc';
//组合购
import CombinationGoods from './components/combination-goods';
//秒杀
import Seckill from './components/seckill';
//预约
import PreBuy from './components/preBuy';
//预售
import Presale from './components/presale';
//预售规则及进度
import PresaleStatus from './components/presale-status';
//优惠
import ReducePrice from './components/reduce-price';
//店铺信息
import StoreInfo from './components/store-info';
// 品牌信息
import BrandInfo from './components/brand-info';
//领券弹窗
import CouponModal from './components/coupon-modal';
//促销弹窗
import PromotionModal from './components/promotion-modal';
//批发规格弹窗
import WholesaleChoose from '@/pages/common/goods/wholesale-choose';
// 商品属性-行业特性参数弹框
import GoodsPropertyCharacter from '@/pages/common/goods/goods-property-character';
//零售规格弹窗
import RetailChoose from '@/pages/common/goods/retail-choose';
//积分商品-规格选择弹框
import PointsChoose from '@/pages/common/goods/points-choose';
// 查看大图评价
import BigPicture from './components/big-picture';
import MenuBox from '@/pages/common/menu-box/index';
//分享赚弹窗
import GoodsShare from '@/pages/common/goods/goods-share';
import ShareModal from '@/pages/common/share-modal';
import {_, WMkit, wxShare, pvUvStatics} from 'wmkit';
//右上角分享按钮
import share from '@/assets/image/goods/goods-detail/share2x.png';
import MenuMore from '@/assets/image/common/menu-more.png';
import Skeleton from './skeleton/index';
//预约弹窗
import AppointModal from './components/appoint-modal';
import {getHashParam} from '@/utils/common-functions';
import ChooseAddress from './components/address';

// 推荐商品 - 坑位
import RecommendGoodsListScroll from '@/pages/common/recommend-goods-list-scroll';
import imgUrl from '@/assets/image/logo/200.png';
import { throttle } from 'lodash';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsDetails extends Component<Partial<T.IProps>, any> {
  // config = {
  //   navigationBarTitleText: '商品详情',
  //   disableScroll: true, //禁止ios橡皮筋效果
  // };

  state = {
    bigImageShow: false, //是否查看大图
    isHideComponent: false,
    viewImages: [],
    currentIndex: 0,
  };

  async componentDidMount() {
    if (!getCurrentInstance().router.params) return;

    let {skuId, pointsGoodsId, inviteeId} = getCurrentInstance().router?.params || {};
    if (skuId == undefined) {
      skuId = '';
    }
    if (inviteeId) {
      WMkit.setShareInfoCache(inviteeId, '1');
    }
    await this.throttleRequest(skuId, pointsGoodsId)
  }

  async componentDidShow() {
    Taro.setNavigationBarTitle({title: '商品详情'});
    //添加init方法主要是解决在预约预售条件下从确认订单界面返回页面活动数据不渲染的问题
    const current = getCurrentInstance();
    const {onShow} = current.router;
    let pvuvSkuId;
    let _skuId: string | undefined
    let _pointsGoodsId: string | undefined
    if (__TARO_ENV != 'h5') {
      // 解决taro h5中 didshow偶发的无法获取路由传参的问题
      // 截取 = 与 .之间的字符串
      // const param = getHashParam<{ skuId: string,pointsGoodsId: string }>(onShow.split('.')[0]);
      // const tmpPar = onShow && onShow.match(new RegExp("(?<=\=).+(?=\\.)")) && onShow.match(new RegExp("(?<=\=).+(?=\\.)"))[0];
      // // 截取第一个&之前的部分为skuId，第二部分截取=之后为pointsGoodsId(可选)
      // const skuIdPar = tmpPar && tmpPar.split('&')[0];
      // const pointsGoodsIdPar =  tmpPar && tmpPar.indexOf('pointsGoodsId') > -1 && tmpPar.split('&').length == 2 && tmpPar.split('&')[1].split('=')[1];
      // let { skuId = skuIdPar || '', pointsGoodsId = pointsGoodsIdPar || '' } = current.router.params || {};
      // const {skuId, pointsGoodsId} = param;
      // let { main } = this.props;
      // let SkuId = main && main.skuId ? main.skuId : skuId; // 解决商品详情页选择完规格之后切换到其他应用蒙层下的价格与所选规格价格不符
      // let _pointsGoodsId = main && main.pointsGoodsId ? main.pointsGoodsId : pointsGoodsId;
      // if (SkuId == undefined) {
      //   SkuId = '';
      // }
      const param = getHashParam<{skuId: string; pointsGoodsId: string}>(onShow.split('.')[0]);
      let {skuId, pointsGoodsId} = getCurrentInstance().router.params || {};
      let {skuIdPar = skuId || '', pointsGoodsIdPar = pointsGoodsId || ''} = param;

      _skuId = skuId || skuIdPar;
      pvuvSkuId = _skuId;
      _pointsGoodsId = pointsGoodsId || pointsGoodsIdPar;
    } else {
      // 解决taro h5中 didshow偶发的无法获取路由传参的问题
      // 解决首页进入商品详情-点击商品数-点击商品进入详情-回退两次 页面一直加载；
      const param = getHashParam<{skuId: string; pointsGoodsId: string}>(onShow.split('.')[0]);
      let skuId = param.skuId;
      pvuvSkuId = skuId;
      let pointsGoodsId = param.pointsGoodsId;
      let {main} = this.props;
      let SkuId = main && main.skuId ? main.skuId : skuId; // 解决商品详情页选择完规格之后切换到其他应用蒙层下的价格与所选规格价格不符
      // let _pointsGoodsId = main && main.pointsGoodsId ? main.pointsGoodsId : pointsGoodsId;
      if (SkuId == undefined) {
        SkuId = '';
      }
      _skuId = SkuId
      _pointsGoodsId = pointsGoodsId
    }
    this.throttleRequest(_skuId, _pointsGoodsId)
    this.props.actions.publicAction.queryServerTime();
    await  this.props.actions.publicAction.initAddress();
    await this.props.actions.publicAction.inintGoodsInfo(_skuId, _pointsGoodsId);

    /**商品详情pv/uv埋点*/
    const {goodsInfo, goodsDetail} = this.props.main;
    this.props.actions.publicAction.pvUvStaticsMyPvUvStatis(goodsDetail, goodsInfo, pvuvSkuId);
  }

  throttleRequest = throttle(async (SkuId, pointsGoodsId) => {
    await this.props.actions.init(SkuId, pointsGoodsId);
  }, 300, { leading: true, trailing: false})

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
        showShareItems: ['wechatFriends', 'wechatMoment'],
      });
    }
  }

  async onShareAppMessage(res) {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));

    const pages = getCurrentPages(); //获取加载的页面
    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    const url = currentPage.route; //当前页面url
    const params = getCurrentInstance().router.params;
    const newUrl = await wxShare.changeUrl(res.from, url, params);
    //const newUrl = await wxShare.changeUrl(res.from);
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
      path: newUrl,
    };
  }

  componentWillUnmount() {
    //取页面栈
    const pages = getCurrentPages();

    //取前一个页面路径
    if (pages[pages.length - 2]) {
      let prevPagePath = pages[pages.length - 2].route;
      if (__TARO_ENV === 'h5') {
        prevPagePath = pages[pages.length - 2].path;
      }

      //如果从登录过来，返回登录页前一个页面
      if (prevPagePath.indexOf('pages/package-A/login/login/index') != -1) {
        Taro.navigateBack({
          delta: 2,
        });
      }
    }
    this.props.actions.clean();
  }

  componentDidHide() {
    //点开分享的图片后，长按图片，使图片全屏化后 返回详情页 再次点击图文分享按钮，页面无反应
    //小程序端长按图片，使图片全屏化后执行 clean
    if (__TARO_ENV !== 'h5') {
      setTimeout(() => {
        this.props.actions.clean();
      }, 1000);
    }
  }

  render() {
    let {
      actions: {publicAction, otherAction, changeSpecDetail},
      main,
    } = this.props;
    if (!main) return null;
    const {goodsDetail = {}, goodsInfo = {}, pointsGoodsId = '', goodsProps = {},goodsBrand={}} = main;
    const {bigImageShow, isHideComponent, viewImages = [], currentIndex = 0} = this.state;
    const {goodsId,goodsType} = goodsDetail?.goods || {};
    //分享类型，0：普通分享，1：分享赚(店铺内) ,2：分享赚（店铺外）3:邀新，4：分享店铺
    let shareType;
    //1.inviteId不存在，即普通登录，如果是小B身份，若是分销商品，则为店铺外分享赚，若为普通商品，则为普通分享
    //2.inviteId不存在，即普通登录，如果是小C身份，则为普通分享
    //3.inviteeId存在，不管小B小C，都是店铺外分享，此处主要考虑二次分享
    if (!WMkit.inviteeId() && main) {
      if (WMkit.isDistributor() && goodsInfo.distributionGoodsAudit == '2') {
        shareType = 2;
      } else {
        shareType = 0;
      }
    } else {
      shareType = 2;
    }
    // 积分商品ID
    //@ts-ignore
    let isH5 = __TARO_ENV === 'h5';
    let isWeixin = _.isWeixin();
    //优惠券数组列表
    let couponLabels = [];
    if (goodsDetail?.goodsInfos) {
      couponLabels = goodsDetail.goodsInfos[0].couponLabels.length > 0 ? goodsDetail.goodsInfos[0].couponLabels : [];
    }

    // const saleType = goodsDetail.goods.saleType;
    //当商品允许分销且分销审核通过，视为分销商品，不展示促销和优惠券
    const distributionFlag = goodsInfo.distributionGoodsAudit == '2';
    // 当在小程序分享的时候如果是积分商品就展示积分,当前积分商城实现的效果是不能切换sku的
    const pointsGoods = goodsDetail?.pointsGoods;

    // const grouponFlag = main.goodsInfo.grouponLabel;

    //当前选中商品是否为正在进行的抢购活动
    let flashsaleGoodsFlag = false;
    let flashsalePrice;
    let flashsaleGoods;
    let flashSaleGoodsId;
    const selectdGoodsInfoId = main && main.goodsInfo && main.goodsInfo.goodsInfoId;
    if (main && main.flashsaleGodos && main.flashsaleGodos.length > 0) {
      main.flashsaleGodos.map((v) => {
        if (v.goodsInfoId == selectdGoodsInfoId && v.stock >= v.minNum) {
          flashsaleGoodsFlag = true;
          flashSaleGoodsId = v.id;
          flashsalePrice = v.price;
          flashsaleGoods = v;
        }
      });
    }
    //判断是否为积分价商品
    const isBuyPoint = main && main.goodsInfo && main.goodsInfo.buyPoint;

    //判断是否为积分商品
    const isPointsGoods = main && main.isPointsGoods;

    // 判断是否为预约
    const isAppointment = main && main.appointmentSaleVO && main.appointmentSaleVO.id;

    //判断是否为预售
    const isBooking = main && main.bookingSaleVO && main.bookingSaleVO.id;

    //判断是否为秒杀
    flashsaleGoodsFlag = !isAppointment && !isBooking && flashsaleGoodsFlag && !isPointsGoods && !isBuyPoint;
    let isReady = main && main.isReady;

    return main && isReady && !main.isLoadSkeleton ? (
      <View className="package_B_GoodsDetails package_B_goods-details">
        <View
          className="goods-details-container"
          style={{
            overflow: bigImageShow ? 'hidden' : 'auto',
            height: `calc(100% - ${!isHideComponent ? 61 : 0}px - env(safe-area-inset-bottom))`,
          }}
        >
          <View className="up-box">
            <View className="share-btn">
              {/* 发圈素材 分销商品才展示  积分商城商品如果是分销也展示*/}
              {WMkit.isDistributor() &&
                !isPointsGoods &&
                !isAppointment &&
                !isBooking &&
                !flashsaleGoodsFlag &&
                distributionFlag &&
                !isBuyPoint && (
                  <View style={{flexDirection: 'row'}}>
                    <View
                      className="mater-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        Taro.navigateTo({
                          url: `/pages/package-B/goods/material-circle/index?goodsInfoId=${main.goodsInfo.goodsInfoId}`,
                        });
                      }}
                    >
                      发圈素材
                    </View>
                    <View
                      className="mater-btn"
                      onClick={(e) => {
                        if (isH5) {
                          Taro.showToast({
                            title: '请使用微信浏览器分享',
                            icon: 'none',
                            duration: 2000,
                          });
                        } else {
                          publicAction.commonChange('main.goodsShareVisible', true);
                        }
                      }}
                    >
                      分享赚 ￥{_.addZero(main.goodsInfo.distributionCommission)}
                    </View>
                  </View>
                )}

              {/* 右上角分享按钮  非分销商品和是分销商品的积分商品展示 */}
              {(!distributionFlag ||
                (distributionFlag && !WMkit.isDistributor()) ||
                (isPointsGoods && distributionFlag)) &&
                !isH5 && <Image src={share} className="share-icon" onClick={() => this._isLogin(main.isOpenWechat)} />}
              {/**菜单浮窗 */}
              {main.menuList && main.menuList.length > 0 && (
                <Image
                  src={MenuMore}
                  className="share-icon"
                  onClick={() => publicAction.commonChange('main.isMenuBoxFlag', !main.isMenuBoxFlag)}
                />
              )}
            </View>
            <MenuBox
              menuList={main.menuList}
              handleClose={() => publicAction.commonChange('main.isMenuBoxFlag', false)}
              isMenuBoxFlag={main.isMenuBoxFlag}
            />
            {/*轮播图*/}
            {/* <ImgSlides
              slideImages={main.slideImages}
              goodsVideo={goodsDetail.goods && goodsDetail.goods.goodsVideo}
              bigImageShow={bigImageShow}
              onChangeBigImageShow={(bigImageShow) => {
                this.setState({bigImageShow});
              }}
            /> */}
            <ImageSlider
              slideImages={main.slideImages}
              videoUrl={goodsDetail?.goods && goodsDetail.goods.goodsVideo}
              onClick={(index) => {
                this.setState({currentIndex: index, viewImages: main.slideImages});
              }}
            />
            {/* 秒杀 */}
            {!isBooking && flashsaleGoodsFlag && !isBuyPoint && <Seckill flashsaleGoods={flashsaleGoods} />}

            {/**预约 */}
            {isAppointment && !isBuyPoint && !isPointsGoods && <PreBuy preBuyInfo={main.appointmentSaleVO} />}

            {/**预售 */}
            {Boolean(isBooking) && !isBuyPoint && !isPointsGoods && <Presale presaleInfo={main.bookingSaleVO} />}

            {/* 商品基本信息 */}
            {main && (
              <View className="mb-24">
                <GoodsInfo flashsaleGoodsFlag={flashsaleGoodsFlag} flashsaleGoods={flashsaleGoods} />
                {/* 商品属性-行业特性参数 */}
                {goodsProps?.characterPropertyList?.length > 0 && <GoodsProperty />}
                {/* 领券 */}
                {couponLabels.length > 0 && !flashsaleGoodsFlag && main && main.goodsDetail && (
                  // !main.bookingSaleVO &&
                  <GoodsCoupon />
                )}
                {/* 促销 */}
                {Boolean(
                  !distributionFlag &&
                    !isBooking &&
                    !isAppointment &&
                    main.goodsInfo &&
                    main.goodsInfo.marketingLabels &&
                    main.goodsInfo.marketingLabels.length > 0 &&
                    !flashsaleGoodsFlag,
                ) && <ReducePrice />}
                {/* 规格 */}
                <GoodsSpec />
                {/* 选择地址 */}
                {!WMkit.isVirtualGoods(goodsType) &&  <ChooseAddress />}
                {/**非积分的商品展示组合购 */}
                {!isPointsGoods && <CombinationGoods />}
                {/**抢购进度 */}
                {isAppointment && !isBuyPoint && !isPointsGoods && <BuyStatus />}
                {/**预售进度 */}
                {Boolean(isBooking) && !isBuyPoint && !isPointsGoods && (
                  <PresaleStatus presaleInfo={main.bookingSaleVO} />
                )}
              </View>
            )}
          </View>
          {/* 评价 */}
          {/*{main.isShow && main.top3Evaluate.listResponse && main.top3Evaluate.listResponse.goodsEvaluateVOList.length >= 0 && (*/}
          {main.isShow && <GoodsEvaluation />}
          {/* 店铺信息 */}
          {WMkit.isMall()|| goodsType===8 ? null : <StoreInfo />}
          {true && <BrandInfo goodsBrand={goodsBrand} />}
          {/* 热门推荐商品 */}
          {goodsId ? (
            <RecommendGoodsListScroll
              type="1"
              pageIndex={0}
              pageSize={30}
              relationGoodsIdList={[goodsId]}
              getShopCartNumCallBack={otherAction._getShopCartNum}
              openModalHideComponent={(bol) => this.setState({isHideComponent: bol})}
            />
          ) : null}

          {/* 详情 */}
          <GoodsDesc />
        </View>
        {/* 底部 */}
        {!isHideComponent ? <Bottom /> : null}

        {/* WholesaleChoose RetailChoose PointsChoose 使用同一个less文件*/}
        {/* spu批发规格弹窗 */}
        {main && main.batchSpecIsShow && (
          <WholesaleChoose
            list={goodsDetail} //商品规格数据传进组件内
            goodsBuyTypes={goodsDetail?.goods?.goodsBuyTypes} //判断下单方式
            openType={main.openType} //打开方式
            onClose={() => {
              publicAction.commonChange('main.batchSpecIsShow', false);
              publicAction.commonChange('main.isPay', false);
            }} //关闭弹窗
            getCartNums={(count) => publicAction.commonChange('main.shopCarNum', count)}
            isPay={main.isPay}
            _didConfirm={(buyGoodsInfos) => {
              otherAction._didConfirm(buyGoodsInfos, '');
            }} //立即购买
            _clickGoods={(eventType) =>
              this._clickGoods({
                eventType: eventType, //0：浏览，1：点击，2：加购，3：下单
                goodsId: goodsId,
              })
            }
          />
        )}
        {/* spu零售规格弹窗 */}
        {main && main.retailSpecIsShow && (
          <RetailChoose
            isVop={main?.goodsDetail?.goods?.thirdPlatformType===1}
            isDangaoss={goodsType===8}
            changeSpecDetail={(id) => changeSpecDetail(id)} //切换规格
            goodsBuyTypes={goodsDetail?.goods?.goodsBuyTypes} //判断下单方式
            openType={main.openType} //打开方式
            iepInfo={main?.iepInfo}
            list={goodsDetail} //商品规格数据传进组件内
            flashsaleGodos={main.flashsaleGodos}
            appointmentSaleVO={main.appointmentSaleVO}
            bookingSaleVO={main.bookingSaleVO}
            subscriptionFlag={main.subscriptionFlag}
            serverTime={main.serverTime}
            isPay={main.isPay}
            rushToBuying={(id, num) => otherAction.rushToBuyingFlashSaleGoodsInfo(id, num)} //秒杀 立即抢购
            goodsShare={() => publicAction.commonChange('main.goodsShareVisible', true)} //分销 分享赚
            onClose={() => {
              publicAction.commonChange('main.retailSpecIsShow', false);
              publicAction.commonChange('main.isPay', false);
            }} //关闭弹窗
            getCartNums={(count) => publicAction.commonChange('main.shopCarNum', count)}
            _didConfirm={(buyGoodsInfos, appointmentSaleId) => {
              otherAction._didConfirm(buyGoodsInfos, appointmentSaleId);
            }} //立即购买
            _clickGoods={(eventType) =>
              this._clickGoods({
                eventType: eventType, //0：浏览，1：点击，2：加购，3：下单
                goodsId: goodsId,
              })
            }
            queryPreBuyTime={() => {
              publicAction.queryPreBuyTime(main.goodsInfo.goodsInfoId); //预约倒计时结束回调
            }}
            openSpecModal={() => {
              publicAction.openSpecModal(goodsDetail.goods.saleType, true, 1);
            }}
            onChangCurrentPreBuyStatus={(status) => {
              publicAction.commonChange('main.currentPreBuyStatus', status); //判断是立即预约还是立即抢购
            }}
          />
        )}
        {/*积分商品-规格选择弹框*/}
        {main && main.pointsExchangeVisible && (
          <PointsChoose
            list={goodsDetail} //商品规格数据传进组件内
            address={main.address} //地址
            onClose={() => publicAction.commonChange('main.pointsExchangeVisible', false)} //关闭弹窗
            changeSpecDetail={(skuId, pointsGoodsId) => changeSpecDetail(skuId, pointsGoodsId)}
          />
        )}
        {/* 分销分享赚弹框 */}
        {main && main.goodsShareVisible && (
          <GoodsShare
            checkedSku={main.goodsInfo}
            onClose={() => publicAction.commonChange('main.goodsShareVisible', false)}
            addSelfShop={(val) => publicAction.commonChange('main.addSelfShop', val)}
            shareModalVisible={() => publicAction.commonChange('main.shareModalVisible', true)}
            isOpenWechat={main.isOpenWechat}
          />
        )}
        {main && main.shareModalVisible && Object.keys(main.goodsInfo).length > 0 ? (
          <ShareModal
            // onRefs={(item) => (this.share = item)}
            closeVisible={() => {
              //显示tab
              Taro.showTabBar();
              //弹窗关闭
              publicAction.commonChange('main.shareModalVisible', false);
            }}
            pointsGoodsId={pointsGoodsId}
            pointsGoods={pointsGoods}
            addSelfShop={main.addSelfShop}
            goodsInfo={main.goodsInfo}
            goods={{}}
            isPointsGoods={isPointsGoods}
            //如果是积分商品，同时为分销，不管小B还是小C，积分优先，视为普通分享
            shareType={isPointsGoods ? 0 : shareType}
            shareModalVisible={main.shareModalVisible}
            appointmentSaleVO={main.appointmentSaleVO}
          />
        ) : null}
        {/* 领券弹框 */}
        {main && main.isCouponShow && <CouponModal />}
        {/* 促销弹框 */}
        {main && main.isPromotionShow && <PromotionModal />}
        {/* 评价查看大图 */}
        {main && main.isBigImgShow && <BigPicture />}
        {/* eslint-disable */}
        {/* 预约成功弹窗 */}
        {main && main.isAppointFlag && <AppointModal />}
        {/* eslint-disable */}
        {/* 查看图片 */}
        {viewImages?.length > 0 && (
          <ImageViewer
            current={currentIndex}
            onCancel={() => {
              this.setState({viewImages: []});
            }}
            images={viewImages}
          />
        )}
        {goodsProps?.characterPropertyList?.length > 0 && (
          <GoodsPropertyCharacter
            onClose={() => {
              publicAction.openPropsCharacterModal(false);
            }}
            visible={main?.goodsPropertyModalVisible}
            goodsProperty={goodsProps}
          />
        )}
      </View>
    ) : (
      <Skeleton />
    );
  }
  // 埋点
  _clickGoods = async (params = {}) => {
    const {recommendType, type} = getCurrentInstance().router.params || {};

    pvUvStatics.buriedPoint({
      ...params,
      // 0-热门推荐，1-基于商品相关性推荐，2-基于用户兴趣推荐
      recommendType: recommendType,
      type: type ? type : 1,
    });
  };
  handleClose = () => this.props.publicAction.commonChange('main.isMenuBoxFlag', false);

  _isLogin = (isOpenWechat) => {
    if (!WMkit.isLogin()) {
      Taro.navigateTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
    if (!isOpenWechat) {
      Taro.showToast({
        title: '功能不可用',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    this.props.actions.publicAction.commonChange('main.shareModalVisible', true);
  };
}

//create by moon https://github.com/creasy2010/moon
