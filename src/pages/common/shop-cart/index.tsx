import 'taro-ui/dist/style/components/modal.scss';
import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { connect } from 'react-redux';
import '@/pages/common/style/swipe.scss';
import { fetchModal, msg, setModalShow, WMkit, pvUvStatics } from 'wmkit';
import * as T from '@/pages/shop-cart/types';
import actions from '@/pages/shop-cart/actions';
import { store2Props } from '@/pages/shop-cart/selectors';
// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';
import WMLoading from '@/pages/common/loading';
import { cache } from 'config';
import { Modal } from '@wanmi/ui-taro';
import AddressSelect from '@/pages/common/address-select';
import lodash from 'lodash';
import RetailChoose from '@/pages/common/goods/retail-choose';

import LoginHeader from './components/login-header';
import StoreItem from './components/store/store-item';
import MoneyFooter from './components/money-footer';
import Mask from './components/mask/mask';
import PackageMask from './components/mask/package-mask';
import ConfirmMask from './components/mask/confirm-mask';
import PurchaseAdvModal from './components/purchase-adv-modal';
import './index.less';

//@ts-ignore
const isH5 = __TARO_ENV === 'h5';

//@ts-ignore
actions().actions.loadReducer();
// 只绑定一次msg.on
let bindMsg = (self) => {
  msg.on({
    'shopCart-C': async () => {
      await self._shopCartCInit();
    },
  });
  bindMsg = () => { };
};

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCShopCart extends React.Component<Partial<T.IProps>, any> {
  // 自定义checkbox样式
  static externalClasses = ['wanmi-checkbox'];

  constructor(props) {
    super(props);
    bindMsg(this);
  }

  static defaultProps = {
    main: {
      isReady: false,
      //是否为分销员购物车
      isFromC: false,
      //接口元数据
      purInfo: {},
      //store信息是否加载完
      isStoreInit: false,
      coupon: {
        goodsInfoIds: [],
      },
      goods: {
        chooseMarketingSkuId: '',
        selectedMarketingGifts: [],
        checkselectedMarketingGift: [],
        marketing: [],
        setMessage: [],
        checkStore: [],
        checkSku: [],
        storeMarketing: [],
        goodsMarketing: [],
        giftGoodsInfos: [],
        skuMarketingDict: [],
      },

      useStatus: {
        isMaskOpen: false,
        maskType: 0,
        confirmMask: {
          isOpen: false,
          type: 0,
          message: '',
        },
        isEmpty: false, //购物车是否为空
        isEdit: false, //是否是编辑状态
        isLogin: false, //是否已登录
      },
      packageMaskData: {
        isPackageMaskOpen: false,
      },
      messNum: 0,
    },
    changeCommonModalProps: {},
    shopCartMaskStyle: {},
    // 是否是二级购物车
    isSecondShopCart: false,
  };

  state = {
    isHideComponent: false,
    isHideModule: true,
    currentPageDataIsComplete: false,
    pageNum: 1,
    pageIndex: 0,
  };

  // 改变reducers
  _changeReducers = (key, value) => {
    this.props.actions?.action?.commonChange?.(`main.${key}`, value);
  };

  onScrollToLower = () => {
    const { currentPageDataIsComplete } = this.state;
    const { pageIndex } = this.props.main || {};
    return lodash.debounce(() => {
      this._changeReducers('pageIndex', currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10);
      this.setState({
        pageIndex: this.state.pageIndex + 10,
      });
    }, 1000);
  };

  render() {
    let {
      main,
      actions: { action },
      changeCommonModalProps,
      shopCartMaskStyle,
      isSecondShopCart,
    } = this.props;
    const {
      isReady,
      useStatus,
      purInfo,
      retailSpecIsShow,
      sku,
      isFromC,
      pageArea,
      isLoading,
      isLoadingWML,
      visible,
      address,
      pickerShow,
      currentAddress,
      packageMaskData
    } = (main as any) || {};
    const { isMaskOpen, isEmpty, confirmMask } = useStatus || {};
    const { isPackageMaskOpen } = packageMaskData || {};
    const { stores = [] } = purInfo || {};
    let showStoreIndex = [];
    const { relationGoodsIdList } = this.props.main || {};
    let pageNumber = relationGoodsIdList?.length ? pageArea.size : this.state.pageNum;
    for (let i = 1; i <= pageNumber; i++) {
      showStoreIndex = showStoreIndex.concat(pageArea?.get(i)?.area);
    }
    const { isHideComponent, isHideModule } = this.state;
    return (
      <View
        className={
          isMaskOpen || retailSpecIsShow || confirmMask?.isOpen ? 'packageCShopCart fixed' : 'packageCShopCart'
        }
        style={isSecondShopCart ? { height: 'calc(100vh)' } : {}}
      >
        {/* 购物车小加载 */}
        <View>
          {isLoading && <WMLoading />}
        </View>
        {/*登陆选项 and 购物车为空*/}
        <LoginHeader
          actions={this.props.actions}
          main={main}
          renderRecommendGoodsList={this._renderRecommendGoodsList}
          onScrollToLower={this.onScrollToLower()}
          isHideModule={isHideModule}
          _getShopCartHeight={this._getShopCartHeight}
        />
        <PurchaseAdvModal />
        {!isEmpty && stores && Boolean(stores.length) && (
          <ScrollView
            className="scroll-view"
            scrollY
            scrollWithAnimation
            lowerThreshold={20}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            style={{ height: this._getShopCartHeight(), background: '#f5f5f5', position: 'fixed', marginTop: '44px' }}
            onScrollToLower={this.onScrollToLower()}
          >
            <View
              className={['shop-cart-con', !isFromC ? '' : 'shop-cartC-con'].join(' ')}
              style={isEmpty ? { padding: 0 } : ''}
              onTouchEnd={() => {
                if (isHideModule) return;
                this.onScrollToLower()();
              }}
            >
              {/*店铺*/}
              <View>
                {stores &&
                  Boolean(stores.length) &&
                  stores.map((item, key) => {
                    const { storeCouponFlag } = this._getStore(item, key);
                    return (
                      showStoreIndex &&
                      showStoreIndex.includes(key) && (
                        <StoreItem
                          index={key}
                          len={stores.length}
                          key={key}
                          myStore={item}
                          storeCouponFlag={storeCouponFlag}
                          onSkuChange={this.handleSkuChange}
                          isSecondShopCart={isSecondShopCart}
                        />
                      )
                    );
                  })}

                {!isEmpty && !isHideModule ? (
                  <View className="status">没有更多了</View>
                ) : null}
              </View>

              {/* 热门商品推荐展示坑位 */}
              {this._renderRecommendGoodsList()}
            </View>
          </ScrollView>
        )}

        {/*底部 Price*/}
        {!isEmpty && !isHideComponent && <MoneyFooter isSecondShopCart={isSecondShopCart} />}

        {/* spu零售规格弹窗 */}
        {retailSpecIsShow && (
          <RetailChoose
            iepInfo={main.iepInfo}
            openType="4"
            list={main.goodsDetail} //商品规格数传进组件内
            source="1"
            onClose={() => {
              action.commonChange('main.retailSpecIsShow', false);
              !isFromC && Taro.showTabBar();
            }} //关闭弹窗
            getCartNums={(count) => action._changeSkuNum(sku, count)}
            onConfirm={this.handleConfirm}
            goodsBuyTypes=""
            isSecondShopCart={isSecondShopCart}
            chooseStyle={changeCommonModalProps.chooseStyle}
          />
        )}
        {pickerShow && (
          <AddressSelect
            title="请选择"
            areaIds={[
              currentAddress.provinceId,
              currentAddress.cityId,
              currentAddress.areaId,
              currentAddress.streetId ? currentAddress.streetId : -1,
            ]}
            onCancel={() => action.commonChange('main.pickerShow', !pickerShow)}
            onSelect={(selAreas) => {
              this.props.actions.action.commonChange(
                `main.currentAddress.areaIds`,
                selAreas.map((item) => item.addrId),
              );
              const areaInfo = selAreas.reduce((a, b: any) => `${a}${b.addrName} `, '');
              this.props.actions.action.commonChange('main.areaInfo', areaInfo);
              action.commonChange('main.pickerShow', !pickerShow);
            }}
          />
        )}

        {/*结算校验 弹窗*/}
        <ConfirmMask />

        {/*弹窗遮罩*/}
        {isMaskOpen && <Mask shopCartMaskStyle={shopCartMaskStyle} isSecondShopCart={isSecondShopCart} />}
        {isPackageMaskOpen && <PackageMask />}
        <Modal
          type="warning"
          visible={visible}
          onOk={() => {
            action.commonChange('main.visible', false);
            Taro.navigateTo({
              url: `/pages/package-A/customer/receive-address-edit/index?addressId=${address.deliveryAddressId
                }&mode=1&localKey=${'shopCardAddress'}`,
            });
          }}
          onCancel={() => {
            action.commonChange('main.visible', false);
          }}
          content="收货地址需完善，请重新填写"
          confirmText="立即完善"
          showCancel={false}
        />
        {/* 购物车小加载 */}
        {/* {isLoadingWML && <WMLoading />} */}
      </View>
    );
  }

  // 热门商品推荐展示坑位
  _renderRecommendGoodsList = (props = {}) => {
    const {
      actions: { action },
      isSecondShopCart,
    } = this.props;
    const { relationGoodsIdList, pageIndex } = this.props.main || {};
    return (
      <RecommendGoodsList
        pageIndex={pageIndex}
        type="0"
        relationGoodsIdList={relationGoodsIdList}
        recommendListCOMStyle={{
          paddingTop: 0,
        }}
        getShopCartNumCallBack={() => {
          this.setState({ isHideComponent: false }, () => {
            action.pageInit();
          });
        }}
        changeCommonModalProps={{
          chooseStyle: {
            bottom: isSecondShopCart ? 0 : process.env.TARO_ENV === 'h5' ? '50px' : 0,
          },
        }}
        recommendGoodsListSpuStyle={{ paddingLeft: 0, paddingRight: 0 }}
        getCurrentPageDataIsComplete={(bol) => this.setState({ currentPageDataIsComplete: bol })}
        setPageIndex={(index) => this._changeReducers('pageIndex', index)}
        setHideModule={(bol) => this.setState({ isHideModule: bol })}
        openModalHideComponent={(bol) => this.setState({ isHideComponent: bol })}
        {...props}
      />
    );
  };

  //确认选中
  handleConfirm = (goodsSpecInfo) => {
    const {
      actions: { action },
    } = this.props;
    action.retailChoose(goodsSpecInfo);
  };

  //点击规格查询sku详情
  handleSkuChange = (sku, goodsInfoId) => {
    const {
      actions: { action },
    } = this.props;
    action.findSpuDetails(sku.goodsInfoId); // 第二个参数是加载动画的时间
    action.commonChange('main.sku', sku);
    action.commonChange('main.goodsInfoId', goodsInfoId);
  };

  _shopCartCInit = async () => {
    const { isFromC } = this.props;
    await this.props.actions.action.commonChange('main.isFromC', isFromC || false);
    await this._changeReducers('useStatus.isEmpty', false);
    await this.props.actions.init();
  };

  _shopCartInit = async () => {
    // 从小店返回商城后，清空购物车、设置isFromC=false
    if (this.props.main.isFromC) {
      await this.props.actions.clean();
      await this.props.actions.action.commonChange('main.isFromC', false);
    }
    await this.props.actions.init();
  };

  _getStore = (store, key) => {
    const {
      main: {
        purInfo: { storeCouponMap },
      },
    } = this.props;

    const storeCouponFlag = store?.storeId && storeCouponMap && storeCouponMap[store.storeId];

    return { storeCouponFlag };
  };

  _getShopCartHeight = () => {
    /**
     * isHideComponent - 是否隐藏底部结算栏
     * isSecondShopCart - 是否为二级购物车
     * isFromC - 是否为分销员购物车
     */
    const { isHideComponent } = this.state;
    const { isSecondShopCart } = this.props;
    const { useStatus, isFromC } = this.props.main || {};
    // 提示登录栏 / 地址栏 - 高度
    const loginHeader_height = '44px';
    // 导航栏 - 高度
    const tabBar_height = `${__TARO_ENV === 'h5' ? 50 : 0}px`;
    // 结算栏 - 高度
    const moneyFooter_height = '59px';
    // 安全区域 - 高度
    const safe_area_inset_bottom = 'env(safe-area-inset-bottom)';

    // 空购物车
    if (useStatus?.isEmpty) {
      if (isSecondShopCart) {
        return `calc(100vh - ${loginHeader_height} - ${safe_area_inset_bottom})`;
      } else {
        return `calc(100vh - ${tabBar_height} - ${loginHeader_height} - ${safe_area_inset_bottom})`;
      }
    } else {
      if (isSecondShopCart) {
        if (!isHideComponent) {
          return `calc(100vh - ${loginHeader_height} - ${moneyFooter_height} - ${safe_area_inset_bottom})`;
        } else {
          return `calc(100vh - ${loginHeader_height} - ${safe_area_inset_bottom})`;
        }
      }

      if (__TARO_ENV === 'h5' || isFromC) {
        if (isHideComponent) {
          return `calc(100vh - ${tabBar_height} - ${loginHeader_height} - ${safe_area_inset_bottom})`;
        }
        return `calc(100vh - ${tabBar_height} - ${loginHeader_height} - ${moneyFooter_height} - ${safe_area_inset_bottom})`;
      }

      return isHideComponent
        ? `calc(100vh - ${loginHeader_height})`
        : `calc(100vh - ${loginHeader_height} - ${tabBar_height} - ${moneyFooter_height})`;
    }
  };
}

//create by moon https://github.com/creasy2010/moon
