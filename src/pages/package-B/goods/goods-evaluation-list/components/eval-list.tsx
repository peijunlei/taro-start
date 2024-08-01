import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {StarRate} from '@wanmi/ui-taro';
import React, {Component} from 'react';

import * as T from '../types';
import './eval-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Star from '@/pages/common/goods/star';
import headIcon from '@/assets/image/goods/goods-detail/head.png';
import good from '@/assets/image/goods/evaluate/good.png';
import veryGood from '@/assets/image/goods/evaluate/very-good.png';
import WMListView from '@/pages/common/list-view';
import Blank from '@/pages/common/blank';
import {WMkit} from 'wmkit';
import moment from 'dayjs';
import BigPicture from './big-picture';
import _ from 'lodash';
import {mul} from '@/utils/priceFormat';
import noInfoImg from '@/assets/image/default/no-info.png';
type IEvalListProps = T.IProps & T.IEvalListProps;

@connect<Partial<IEvalListProps>, Partial<T.ActionType>>(store2Props, actions)
export default class EvalList extends Component<Partial<IEvalListProps>, T.IEvalListState> {
  _cateRefs = [];
  constructor(props: IEvalListProps) {
    super(props);
    this.state = {
      reload: false,
      openFlag: [],
      arr: [],
      screenHeight: 0,
    };
  }

  static defaultProps = {
    main: {},
  };

  componentDidMount() {
    Taro.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.setState({
          screenHeight: res.screenHeight,
        });
      },
    });
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    let {arr, screenHeight} = this.state;

    let url = '/goodsDetailEvaluate/evaluatePage';
    if (WMkit.isLogin()) {
      url = '/goodsDetailEvaluate/evaluatePageLogin';
    }

    //获取节点信息
    if (main?.list && main?.list.length > 0) {
      setTimeout(() => {
        this.setHeight((array) => {
          //判断数组是否相等
          if (!_.isEqual(arr, array)) {
            this.setState({
              arr: array,
            });
          }
        });
      }, 0);
    }

    //企业购的判断
    // @ts-ignore
    const {iepInfo = {}} = main?.iepInfo || {};
    //企业名称
    const {enterpriseCustomerName, enterpriseCustomerLogo} = iepInfo ||{};
    const iepLogo = enterpriseCustomerLogo ? JSON.parse(enterpriseCustomerLogo) : [];

    return (
      main && (
        <View className="evalList">
          {main.goodsId && (
            <WMListView
              url={url}
              style={{height: 'calc(100vh)', background: '#f5f5f5'}}
              dataPath={['goodsEvaluateVOPage']}
              params={{goodsId: main.goodsId}}
              getData={(list, total) => {
                action.commonChange('main.list', list);
                action.commonChange('main.total', total);
              }}
              reload={this.state.reload}
              noneContent={'该商品暂无评论'}
              noneImg={noInfoImg}
              noMoreStyle={{background: '#f5f5f5'}}
            >
              {main.list.map((v, k) => {
                const isEnterpriseCustomer = this._iepHandle(v);
                console.log(v.isPraise,'v.isPraise')
                return (
                  v.isShow == 1 && (
                    <View key={v.evaluateId}>
                      <View
                        className="eval-item"
                        onClick={() =>
                          Taro.navigateTo({
                            url: WMkit.isLogin()
                              ? `/pages/package-A/customer/evaluate-drying/index?storeId=${v.storeId}&orderId=${v.orderNo}&goodsInfoId=${v.goodsInfoId}&evaluateType=2`
                              : '/pages/package-A/login/login/index',
                          })
                        }
                      >
                        {/* 评价用户信息 */}
                        <View className="eval-user-info">
                          <View className="left">
                            <Image src={v.isAnonymous == 0 ? v.headimgurl || headIcon : headIcon} className="head" />
                            <View className="info">
                              <View className="iepBox">
                                <Text className="name">{v.isAnonymous == 0 ? v.customerName : '匿名'}</Text>
                                {isEnterpriseCustomer && (
                                  <View className="iepCustomerName">
                                    {iepLogo && (
                                      <Image
                                        src={iepLogo && iepLogo.length > 0 ? iepLogo[0].url : ''}
                                        className="picture"
                                      />
                                    )}
                                    {enterpriseCustomerName}
                                  </View>
                                )}
                              </View>
                              {/* 星级评价 */}
                              <StarRate size="small" rating={v.evaluateScore} />
                            </View>
                          </View>
                          <Text className="time">{moment(v.evaluateTime).format('YYYY-MM-DD ')}</Text>
                        </View>
                        {/* 标题 */}
                        <View
                          className={
                            this.state.openFlag.includes(k)
                              ? 'eval-title all-title'
                              : arr.includes(k)
                              ? 'eval-title height64'
                              : 'eval-title'
                          }
                          id={`the-id${k}`}
                          ref={(dom) => {
                            this._cateRefs[k] = dom;
                          }}
                        >
                          {v.evaluateContent}
                        </View>
                        {arr.includes(k) ? (
                          <View
                            className="open-words"
                            onClick={(e) => {
                              e.stopPropagation();
                              this.openWords(k);
                            }}
                          >
                            {this.state.openFlag.includes(k) ? '收起' : '展开'}
                          </View>
                        ) : null}

                        {/* 评价图片 */}
                        {v.evaluateImageList && (
                          <View className="eval-pictures">
                            {v.evaluateImageList.map((item, index) => {
                              return (
                                <View className="imgBox" key={index}>
                                  {/* <Image
                                src={item.artworkUrl}
                                className="picture"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.openBigImg(v, index);
                                }}
                              /> */}
                                  <View
                                    className="picture"
                                    style={{
                                      background: 'url(' + item.artworkUrl + ')',
                                      backgroundSize: 'cover',
                                      backgroundPosition: '50% 50%',
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      this.openBigImg(v, index);
                                    }}
                                  />
                                </View>
                              );
                            })}
                          </View>
                        )}
                        {/* 点赞 */}
                        <View className="dian-zan" onClick={() => {}}>
                          <View className="l-content">
                            <Text className="text">{v.specDetails ? v.specDetails : ''}</Text>
                            {/* <Text className=""></Text> */}
                          </View>
                          <View
                            className="r-content"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (!main.loading) {
                                // action.addCustomerGoodsEvaluatePraise(v.evaluateId, k);
                                if (!WMkit.isLogin()) {
                                  Taro.navigateTo({
                                    url: '/pages/package-A/login/login/index',
                                  });
                                } else {
                                  action.addCustomerGoodsEvaluatePraise(v.evaluateId, k);
                                }
                              }
                            }}
                          >
                            <Text className="num">{v?.goodNum?.toString() || 0}</Text>
                            {/*比较诡异的bug存在于如果v.goodNum等于0，不能正常显示*/}
                            <Image src={v.isPraise ? veryGood : good} className="zan" />
                          </View>
                        </View>
                        {v.evaluateAnswer && <View className="evaluateAnswer">掌柜回复：{v.evaluateAnswer}</View>}
                      </View>
                      {/* {k == main.list.filter((item) => item.isShow == 1).length - 1 ? (
                      <View className="no-more">没有更多了</View>
                    ) : null} */}
                    </View>
                  )
                );
              })}
              {/*{main.list && main.list.filter((item) => item.isShow == 1).length > 0 && (*/}
              {/*  <View className="no-more">没有更多了</View>*/}
              {/*)}*/}
              {main.list && main.list.length > 0 && main.list.filter((item) => item.isShow == 1).length === 0 && (
                <Blank content={'该商品暂无评论'} />
              )}
            </WMListView>
          )}
          {main.isBigImgShow && <BigPicture />}
        </View>
      )
    );
  }
  //查看全部评价
  openWords = (i) => {
    let {openFlag} = this.state;
    let newOpenFlag = [...openFlag];
    if (newOpenFlag.includes(i)) {
      let index = newOpenFlag.findIndex((v) => v == i);
      newOpenFlag.splice(index, 1);
    } else {
      newOpenFlag.push(i);
    }
    this.setState({
      openFlag: newOpenFlag,
    });
  };

  openBigImg = (item, index) => {
    let {actions} = this.props;
    actions.action.commonChange('main.currentImg', index);
    actions.action.commonChange('main.bigEvalItem', item);
    actions.action.commonChange('main.isBigImgShow', true);
  };

  //获取节点信息
  setHeight = (callBack) => {
    //@ts-ignore
    let isH5 = __TARO_ENV === 'h5';
    let _this = this;
    let {main} = this.props;
    let arr = [].concat(this.state.arr);
    let isHeight = mul(0.048, this.state.screenHeight);
    main.list.forEach((v, k) => {
      //h5跟小程序获取节点元素信息 方式不同
      if (isH5) {
        const H5 = Taro.createSelectorQuery();
        H5.select(`#the-id${k}`)
          .boundingClientRect((rect) => {
            if (rect && !arr.includes(k)) {
              if (Math.round(rect.height) > Math.round(isHeight)) {
                arr.push(k);
                callBack(arr);
              }
            }
          })
          .exec();
      } else {
        const query = _this._cateRefs[k] || {};
        if (typeof query.boundingClientRect === 'function') {
          query.boundingClientRect().exec((res) => {
            if (res[0] && !arr.includes(k)) {
              if (Math.round(res[0].height) > Math.round(isHeight)) {
                arr.push(k);
                callBack(arr);
              }
            }
          });
        }
      }
    });
  };

  /**
   * 判断是否是企业会员
   * @param value
   * @private
   */
  _iepHandle = (value) => {
    // let checkEnterpriseEnable = true;
    // if (checkEnterpriseEnable) {
    const customerLabelList = value.customerLabelList;
    return customerLabelList && customerLabelList.indexOf('enterprise-customer') > -1;
    // } else {
    //   return false;
    // }
  };
}

//create by moon https://github.com/creasy2010/moon
