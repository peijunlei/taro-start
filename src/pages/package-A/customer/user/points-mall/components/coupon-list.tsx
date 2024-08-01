import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import RoundProgress from './progress';
import {immutable} from 'wmkit';
import moment from 'dayjs';
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
        action: {commonChange, setSort},
        innerScroll,
      },
      main,
    } = this.props;
    // 排序字段
    const type = main.sortType.type;
    // 排序方式：升序 降序
    const sort = main.sortType.sort;
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

    return (
      main && (
        <WMListView
          url={main.canExchange ? '/pointsMall/pageCanExchangeCoupon' : '/pointsMall/pageCoupon'}
          params={
            !main.canExchange && {
              sortFlag: sortFlag,
            }
          }
          style={{height: '50vh', paddingBottom: '50px'}}
          dataPath={['pointsCouponVOPage']}
          noneContent="没有符合您要求的优惠券~" //为空提示
          getData={(list, total) => {
            commonChange([
              {
                paths: 'main.listCou',
                value: list,
              },
            ]);
          }}
          scrollY={innerScroll}
        >
          {main.listCou.map((item, index) => {
            let pointsCoupon = this._exchangedEvent(immutable.fromJS(item));
            let pg = ((pointsCoupon.get('exchangeCount') / pointsCoupon.get('totalCount')) * 100).toFixed(0);
            return (
              item && (
                <View className="goods-info-box" key={index}>
                  <View className="goods-info1">
                    <View className="left">
                      <Text className="left1">
                        ￥<Text className="left2">{item.couponInfoVO.denomination}</Text>
                      </Text>
                      <Text className="left3">{this._buildFullBuyPrice(item.couponInfoVO)}</Text>
                    </View>
                    <View className="right">
                      <View className="right_lefts">
                        <View className="right_left">
                          <View className={item.couponInfoVO.couponType == 0 ? 'coupons' : 'coupon'}>
                            {COUPON_TYPE[item.couponInfoVO.couponType]}
                          </View>
                          <Text className="couponT">{this._buildStorename(item.couponInfoVO)}</Text>
                        </View>
                        {item.couponInfoVO.couponType != 2 && (
                          <Text className="couponText">{this._buildScope(item.couponInfoVO)}可用</Text>
                        )}
                        <Text className="couponText">{this._buildRangDay(item.couponInfoVO)}</Text>
                        <Text className="couponFen">
                          {pointsCoupon.get('points')}
                          <Text className=" couponFen couponFens">积分</Text>
                        </Text>
                      </View>

                      {pointsCoupon.get('sellOutFlag') ? (
                        <View style={{alignItems: 'center'}}>
                          <View className="gray-state">已抢光</View>
                        </View>
                      ) : (
                        <View style={{alignItems: 'center'}}>
                          {!(main.couponVisible || main.visible) ? (
                            <RoundProgress data={pg + '%'} progress={pg} color="#FF6600" />
                          ) : (
                            <View className="roundView" />
                          )}
                          <View
                            className="couponDui"
                            onClick={(e) => {
                              e.stopPropagation();
                              this._fetchCoupon(pointsCoupon, item.couponInfoVO);
                            }}
                          >
                            立即兑换
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              )
            );
          })}
        </WMListView>
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
      coupon.scopeNames.forEach((value) => {
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
    let latestPointsCouponInfoList = immutable.fromJS(this.props.main.latestPointsCouponInfoList);
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
