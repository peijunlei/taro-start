import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './forbidden-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';

type IToolImgProps = T.IProps & T.IToolImgProps;
const COUPON_TYPE = {
  0: '通用券',
  1: '优惠券',
  2: '运费券',
};

@connect<Partial<IToolImgProps>, T.IToolImgState>(store2Props, actions)
export default class ForbiddenModal extends Component<Partial<IToolImgProps>, T.IToolImgState> {
  constructor(props: IToolImgProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {
        action: {commonChange, nativeTo},
      },
      main = {},
    } = this.props;
    const {pointsCoupon, couponInfo = {}} = main;
    return (
      <View
        className="ForbiddenModal"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          commonChange([{paths: 'main.couponVisible', value: false}]);
        }}
      >
        <View
          className="modalBox"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="normal title">兑换商品</View>

          <View className="normal">
            <View className="goods-info1">
              <View className="left">
                <Text className="left1">
                  ￥<Text className="left2">{couponInfo ? couponInfo.denomination : ''}</Text>
                </Text>
                <Text className="left3">{this._buildFullBuyPrice(couponInfo)}</Text>
              </View>
              <View className="right">
                <View className="right_lefts">
                  <View className="right_left">
                    <View className={couponInfo.couponType == 0 ? 'coupons' : 'coupon'}>
                      {COUPON_TYPE[couponInfo.couponType]}
                    </View>
                    <Text className="couponT">{this._buildStorename(couponInfo)}</Text>
                  </View>
                  {couponInfo.couponType != 2 && <Text className="couponText">{this._buildScope(couponInfo)}可用</Text>}
                  <Text className="couponText">{this._buildRangDay(couponInfo)}</Text>
                  <Text className="couponFen">
                    {pointsCoupon?.get('points')}
                    <Text className=" couponFen couponFens">积分</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="normal jiFen">
            消耗 <Text className="jiFenNumber">{pointsCoupon?.get('points')}</Text> 积分
          </View>

          <View className="btBox">
            <View
              className="bt"
              onClick={() => {
                nativeTo();
                commonChange([
                  {
                    paths: 'main.couponVisible',
                    value: false,
                  },
                ]);
              }}
            >
              取消
            </View>
            <View
              className="bt btn"
              onClick={() => {
                nativeTo();
                commonChange([
                  {
                    paths: 'main.couponVisible',
                    value: false,
                  },
                  {
                    paths: 'main.visible',
                    value: true,
                  },
                  {
                    paths: 'main.pointsCouponId',
                    value: pointsCoupon?.get('pointsCouponId'),
                  },
                ]);
              }}
            >
              立即兑换
            </View>
          </View>
        </View>
      </View>
    );
  }
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
  /***
   * 生效时间
   */
  _buildRangDay = (coupon) => {
    return coupon.rangeDayType === 1
      ? `领取后${coupon.effectiveDays}天内有效`
      : `${moment(coupon.startTime).format('YYYY-MM-DD')}至${moment(coupon.endTime).format('YYYY-MM-DD')}`;
  };
}
