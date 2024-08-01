import {Image, ScrollView, Swiper, SwiperItem, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import AdvModal from '@/pages/common/adv-modal/adv-modal';
import {fetchModal, handleUrl, setModalShow, pvUvStatics} from 'wmkit';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import WMListView from '@/pages/common/list-view';
import Price from '@/pages/common/goods/price';
import WMGrouponFooter from '@/pages/common/groupon-bar';
import WMLoading from '@/pages/common/loading';
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/coupon/empty.png';

const smallDefaultImg = require('@/assets/image/common/default2-img.png');
const defaultImg = require('@/assets/image/common/default3-img.png');
const gift = require('@/assets/image/groupon/gift.png');
const search = require('@/assets/image/goods/search.png');
const emptyImage = require('@/assets/image/groupon/empty.png');
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBGrouponGrouponCenter extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    // this.setState({
    //   innerScroll: false,
    //   stopEvent: true,
    //   fixed: false,
    // });
  }

  state = {
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: '',
    stopEvent: true,
    innerScroll: false,
    fixed: false,
  };

  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.updateModalStatus('');
  }

  async updateModalStatus(id) {
    const res = await fetchModal('groupChannel');
    let popupId = null;
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    // console.log('====', res);
    const flagParams = await setModalShow(res, 'groupChannel', popupId);
    // console.log('flagParams', flagParams);
    this.setState(
      {
        isModalFlag: flagParams.showFlag,
        imgUrl: flagParams.imgUrl,
        jumpPage: (flagParams.jumpPage && JSON.parse(flagParams.jumpPage)) || '',
        nextPopupId: flagParams.nextPopupId,
      },
      () => {
        if (this.state.nextPopupId && !this.state.isModalFlag) {
          this.isGo(this.state.nextPopupId);
        }
      },
    );
  }

  async isGo(id) {
    await this.updateModalStatus(id);
  }

  handleClose() {
    this.setState({isModalFlag: false}, async () => {
      if (this.state.nextPopupId) {
        await this.updateModalStatus(this.state.nextPopupId);
      }
    });
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
    this.props.actions.init();
  }

  componentDidShow() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  onPageScroll(e) {
    if (__TARO_ENV !== 'h5') {
      const {innerScroll} = this.state;
      if (innerScroll === false && e.scrollTop >= 472) {
        this.setState({
          innerScroll: true,
        });
      }

      if (innerScroll === true && e.scrollTop < 472) {
        this.setState({
          innerScroll: false,
        });
      }
    }
  }

  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {
      grouponHotList = [],
      grouponAdvert = [],
      grouponCates = [],
      chooseCateId,
      keyWords,
      sticky,
      groupCenterList = [],
      list,
      isLoadingFlag,
      totalPages,
      form,
    } = main;
    console.log('list', list);
    //全部列表不需要分类id等参数
    let params =
      chooseCateId == '-1'
        ? {}
        : {
            grouponCateId: chooseCateId,
            goodsName: keyWords,
            sticky: sticky,
          };

    // 未获取到轮播图时不展示？？？？？
    // if (!(grouponAdvert && grouponAdvert.length > 0)) return <View />;
    return (
      <View>
        <ScrollView
          scrollY
          onScrollToLower={this._onScrollToLower}
          className="group__scroll"
          style={{
            height: 'calc(100vh + env(safe-area-inset-bottom))',
            paddingBottom: 'calc(env(safe-area-inset-bottom))',
          }}
        >
          <View className="groupon-center">
            <View className="top">
              <View
                className="search"
                onClick={() =>
                  Taro.navigateTo({
                    url: '/pages/package-B/goods/search/index?key=groupon',
                  })
                }
              >
                <Image src={search} className="img" />
                <Text className="fs24 c999">爱拼才会赢</Text>
              </View>
              <View className="bgImg" />
            </View>

            {grouponAdvert.length > 0 && (
              <View className="banner-list">
                <Swiper autoplay circular className="banner-swiper">
                  {grouponAdvert.map((item) => {
                    return (
                      <SwiperItem key={item.resourceId}>
                        <View
                          onClick={() => {
                            if (item.linkGoodsInfoId) {
                              Taro.navigateTo({
                                url: `/pages/package-B/goods/group-details/index?skuId=${item.linkGoodsInfoId}`,
                              });
                            }
                          }}
                        >
                          <Image src={item.artworkUrl} className="banner" />
                        </View>
                      </SwiperItem>
                    );
                  })}
                </Swiper>
              </View>
            )}

            {grouponHotList.length > 0 && (
              <View className="hots">
                <View className="title">
                  <Text className="fs28 c333 mr16 bolder">热门推荐</Text>
                  <Text className="fs20 c999">超值团购</Text>
                </View>
                <ScrollView scrollX={true} className="scroll-item">
                  <View className="items">
                    {grouponHotList.map((item) => (
                      <View key={item.grouponActivityId}>
                        <View
                          className="item"
                          onClick={() => {
                            if(item.showFlag == '0'){
                              Taro.showToast({
                                title: '商品不可售！',
                                icon: 'none',
                                duration: 2000,
                              });
                              return;
                            }
                            Taro.navigateTo({
                              url: `/pages/package-B/goods/group-details/index?skuId=${item.goodsInfoId}`,
                            })
                          }}
                        >
                          <Image src={item.goodsImg ? item.goodsImg : smallDefaultImg} className="img2" />
                          <View className="infos">
                            <Text className="content">{item.goodsName}</Text>
                            <Price price={item.grouponPrice} />
                            <View className="tail">
                              <Text className="fs20 c999">{`${item.grouponNum}人团`}</Text>
                              <Text className="fs20 c999">已拼{item.alreadyGrouponNum}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            <View className="title-spell-group">
              <Image src={gift} className="img" />
              <Text className="fs32 c333 bolder">精选拼团</Text>
            </View>
            <ScrollView scrollX className="tabs-spell-group">
              <View className="tabs">
                {grouponCates.map((item) => {
                  const active = chooseCateId ? item.grouponCateId === chooseCateId : item.defaultCate == 1;
                  return (
                    <View
                      key={item.grouponCateId}
                      className={active ? 'item item-active' : 'item'}
                      onClick={() => action.changeTopActive(item.grouponCateId, item.defaultCate)}
                    >
                      <Text className={active ? 'text bold' : 'text'}>{item.grouponCateName}</Text>
                      <View className="rect"></View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View className={'choice'} style={{paddingTop: 8}}>
              {list?.map((item) => (
                <View
                  key={item.goodsInfoId}
                  className="groupon-item"
                  onClick={() => {
                    if(item.showFlag == '0'){
                      Taro.showToast({
                        title: '商品不可售！',
                        icon: 'none',
                        duration: 2000,
                      });
                      return;
                    }
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/group-details/index?skuId=${item.goodsInfoId}`,
                    });
                  }}
                >
                  <Image src={item.goodsImg ? item.goodsImg : defaultImg} className="img" mode="aspectFill" />
                  <View className="tailBorder">
                    <Text className="content">{item.goodsName}</Text>
                    <View className="tail">
                      <View className="left">
                        <Price price={item.grouponPrice} />
                        <Text className="fs20 c999 mt8">{`单买 ￥${item.marketPrice}`}</Text>
                      </View>
                      <View className="right">
                        <View className="nums">
                          <View className="inline">
                            <Text className="fs20 yellow">{item.grouponNum || "0"}</Text>
                            <Text className="fs20 c999">人团</Text>
                          </View>
                          <View className="inline mt8">
                            <Text className="fs20 yellow">{item.alreadyGrouponNum || "0"}</Text>
                            <Text className="fs20 c999">人已拼团</Text>
                          </View>
                        </View>
                        <View
                          className="wm-button-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if(item.showFlag == '0'){
                              Taro.showToast({
                                title: '商品不可售！',
                                icon: 'none',
                                duration: 2000,
                              });
                              return;
                            }
                            Taro.navigateTo({
                              url: `/pages/package-B/goods/group-details/index?skuId=${item.goodsInfoId}`,
                            });
                          }}
                        >
                          <Text className="text">立即参团</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              {list?.length != 0 && form?.pageNum + 1 != totalPages && <View className="status">加载中</View>}
              {!isLoadingFlag && list?.length != 0 && form?.pageNum + 1 == totalPages && (
                <View className="status">没有更多了</View>
              )}
              {!isLoadingFlag && list?.length == 0 && <Blank content="暂无拼团信息哦~" img={emptyImage} />}
              {/*</WMListView>*/}
            </View>
            <AdvModal
              imgUrl={this.state.imgUrl}
              handleUrl={() => handleUrl(this.state.jumpPage)}
              handleClose={() => this.handleClose()}
              isModalFlag={this.state.isModalFlag}
            />
          </View>
        </ScrollView>

        {isLoadingFlag && <WMLoading />}
        <WMGrouponFooter currTab="拼购" />
      </View>
    );
  }

  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };
}

//create by moon https://github.com/creasy2010/moon
