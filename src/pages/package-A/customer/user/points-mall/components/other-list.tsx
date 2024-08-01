import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './list.less';
import './other-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import RoundProgress from './progress';
import {immutable} from 'wmkit';
import moment from 'dayjs';
const defaultImg = require('@/assets/image/goods/goods-list/empty.png');
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
      },
      main = {},
      innerScroll,
    } = this.props;

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

    return (
      main && (
        <WMListView
          url={main.canExchange ? '/pointsMall/pageCanExchange' : '/pointsMall/page'}
          params={
            !main.canExchange
              ? {
                  sortFlag: sortFlag,
                  cateId: main.cateId,
                }
              : {
                  cateId: main.cateId,
                }
          }
          style={{height: '100vh', paddingBottom: '50px', overflowY: 'auto'}}
          dataPath={['pointsGoodsVOPage']}
          noneContent="没有符合您要求的商品~" //为空提示
          noneImg={defaultImg}
          getData={(list, total) => {
            commonChange([
              {
                paths: 'main.list',
                value: list,
              },
            ]);
          }}
          scrollY={innerScroll}
        >
          {main.list?.map((item, index) => {
            return (
              <View key={index}>
                <View
                  className="goods-info-other"
                  key={item.pointsGoodsId}
                  onClick={() =>
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfo.goodsInfoId}&pointsGoodsId=${item.pointsGoodsId}`,
                    })
                  }
                >
                  <Image className="left-img" src={item.goodsInfo.goodsInfoImg || item.goods.goodsImg || defaultImg} />
                  <View className="right-text">
                    <Text className="text1">{item.goodsInfo.goodsInfoName}</Text>
                    <Text className="text2">{item.points} 积分</Text>
                    <Text className="text3">
                      市场价:￥{item.goodsInfo.marketPrice ? item.goodsInfo.marketPrice.toFixed(2) : 0}
                    </Text>
                  </View>
                </View>
              </View>
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
