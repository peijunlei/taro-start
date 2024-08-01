import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CouponList from './coupon-list';
import OtherList from './other-list';
import WMListView from '@/pages/common/list-view';
import RoundProgress from './progress';
import moment from 'dayjs';
import {WMkit, immutable} from 'wmkit';
const defaultImg = require('@/assets/image/common/default-img.png');
type IFriendListProps = T.IProps & T.IFriendListProps;
const COUPON_TYPE = {
  0: '通用券',
  1: '优惠券',
  2: '运费券',
};

@connect<Partial<IFriendListProps>, T.IFriendListState>(store2Props, actions)
export default class FriendList extends Component<Partial<IFriendListProps>, T.IFriendListState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IFriendListProps) {
    super(props);
  }
  render() {
    let {
      actions: {
        action: {commonChange, setSort, nativeTo},
      },
      main = {},
      innerScroll,
    } = this.props;
    let tipMsg = !main?.pointsCouponListFlag ? '没有符合您要求的商品~' : '没有符合您要求的优惠券~';
    // 排序字段
    const type = main.sortType?.type;
    // 排序方式：升序 降序
    const sort = main.sortType?.sort;
    let sortFlag = null;
    if (type == 'points' && sort == 'asc') {
      sortFlag = 0;
    } else if (type == 'points' && sort == 'desc') {
      sortFlag = 1;
    } else if (type == 'price' && sort == 'asc') {
      sortFlag = 2;
    } else if (type == 'price' && sort == 'desc') {
      sortFlag = 3;
    }
    const isLogin = WMkit.isLogin();
    return (
      main && (
        <View className="pointsMall__friendList">
          <View className="pointsMall__box">
            <ScrollView scrollX>
              <View className="bar">
                <View
                  className="nav"
                  onClick={() => {
                    commonChange('main.cateId', null);
                    commonChange('main.pointsCouponListFlag', false);
                  }}
                >
                  <Text
                    className={
                      main.cateId == null && main.pointsCouponListFlag == false
                        ? 'points-mall-tab-item itemSelected'
                        : 'points-mall-tab-item'
                    }
                  >
                    全部
                  </Text>
                  <View className="active">
                    {main.cateId == null && main.pointsCouponListFlag == false ? (
                      <View className="activeLine" />
                    ) : (
                      <View className="noActiveLine" />
                    )}
                  </View>
                </View>
                <View
                  className="nav"
                  onClick={() => {
                    commonChange('main.pointsCouponListFlag', true);
                    commonChange('main.cateId', null);
                  }}
                >
                  <Text
                    className={main.pointsCouponListFlag ? 'points-mall-tab-item itemSelected' : 'points-mall-tab-item'}
                  >
                    优惠券
                  </Text>
                  <View className="active">
                    {main.pointsCouponListFlag ? <View className="activeLine" /> : <View className="noActiveLine" />}
                  </View>
                </View>
                {main.cateList?.map((tabItem, index) => {
                  return (
                    <View
                      // key={tabItem.key}
                      key={index}
                      className="nav"
                      onClick={() => {
                        commonChange('main.cateId', tabItem.cateId);
                        commonChange('main.pointsCouponListFlag', false);
                      }}
                    >
                      <Text
                        className={
                          main.cateId === tabItem.cateId ? 'points-mall-tab-item itemSelected' : 'points-mall-tab-item'
                        }
                      >
                        {tabItem.cateName}
                      </Text>
                      <View className="active">
                        {main.cateId == tabItem.cateId ? (
                          <View className="activeLine" />
                        ) : (
                          <View className="noActiveLine" />
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View className="box2">
              <View
                className={main.canExchange ? 'bt active' : 'bt'}
                onClick={() => {
                  if (!isLogin) {
                    Taro.navigateTo({
                      url: `/pages/package-A/login/login/index?source=integralShopping`,
                    });
                    return;
                  }
                  commonChange('main.canExchange', true);
                  commonChange('main.sortType', {type: '', sort: ''});
                }}
              >
                我能兑换
              </View>

              <View
                className={type == 'points' ? 'bt active' : 'bt'}
                onClick={() => {
                  setSort('points');
                }}
              >
                积分价
                {type == 'points' ? (
                  <Image
                    src={require('../img/two-arr.png')}
                    className={sort == 'asc' ? 'bt_img transform-i' : 'bt_img'}
                  />
                ) : (
                  <Image src={require('../img/two-arr-grey.png')} className="bt_img" />
                )}
              </View>
              <View
                className={type == 'price' ? 'bt active' : 'bt'}
                onClick={() => {
                  setSort('price');
                }}
              >
                市场价
                {type == 'price' ? (
                  <Image
                    src={require('../img/two-arr.png')}
                    className={sort == 'asc' ? 'bt_img transform-i' : 'bt_img'}
                  />
                ) : (
                  <Image src={require('../img/two-arr-grey.png')} className="bt_img" />
                )}
              </View>
            </View>
          </View>

          {main.pointsCouponListFlag ? (
            <CouponList innerScroll={innerScroll} />
          ) : (
            <OtherList innerScroll={innerScroll} />
          )}
        </View>
      )
    );
  }

  /***
   * 生效时间
   */
  _buildRangDay = (coupon) => {
    return coupon.rangeDayType === 1
      ? `领取后${coupon.effectiveDays}天内有效`
      : `${moment(coupon.startTime).format('YYYY-MM-DD')}至${moment(coupon.endTime).format('YYYY-MM-DD')}`;
  };
  /***
   * 满减金额
   */
  _buildFullBuyPrice = (coupon) => {
    return coupon.fullBuyType === 0 ? '无门槛' : `满${coupon.fullBuyPrice}可用`;
  };
  /**
   * 优惠券使用店铺名称（暂时只有平台券）
   */
  _buildStorename = (coupon) => {
    let text = '';
    if (coupon.platformFlag === 1) {
      text = '全平台可用';
    }
    return `${text}`;
  };
  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon) => {
    let text = '';
    let scopeType = '';
    if (coupon.scopeType == 0) {
      scopeType = '商品：';
      text = '全部商品';
    } else if (coupon.scopeType == 1) {
      scopeType = '品牌：';
      text = '仅限';
      coupon.scopeNames.forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.scopeType == 2) {
      scopeType = '品类：';
      text = '仅限';
      coupon.get('scopeNames').forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.scopeType == 3) {
      scopeType = '分类：';
      text = '仅限';
      coupon.scopeNames.forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else {
      scopeType = '商品：';
      text = '部分商品';
    }
    return `${text}`;
  };
  _exchangedEvent = (pointsCoupon) => {
    let latestPointsCouponInfoList = immutable.fromJS(this.props?.main?.latestPointsCouponInfoList);
    const index = latestPointsCouponInfoList.findIndex(
      (info) => info.get('pointsCouponId') == pointsCoupon.get('pointsCouponId'),
    );
    if (index > -1) {
      pointsCoupon = pointsCoupon
        .set('exchangeCount', latestPointsCouponInfoList.get(index).get('exchangeCount'))
        .set('sellOutFlag', latestPointsCouponInfoList.get(index).get('sellOutFlag'));
    }
    return pointsCoupon;
  };
  /**
   * 立即兑换弹窗
   */
  _fetchCoupon = async (pointsCoupon, couponInfo) => {
    let {
      actions: {
        action: {isPayPwdValid, commonChange},
      },
    } = this.props;
    try {
      await isPayPwdValid(pointsCoupon, couponInfo); //已经设置支付密码了
    } catch (e) {
      return false;
    }
    return true;
  };
}

//create by moon https://github.com/creasy2010/moon
