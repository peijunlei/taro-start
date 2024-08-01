import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {_} from 'wmkit';
import api from 'api';
import lodash from 'lodash';

// 推荐商品 - 坑位
import RecommendGoodsList from '@/pages/common/recommend-goods-list';

import './index.less';

import success from '@/assets/image/common/success.png';

// 挂载connect，用于解决A页面跳转到B页面，B页面返回到A页面时A页面空白（dom节点被卸载了）的问题（骚操作）
@connect<any, any>()
export default class PointsConfirmOrderSuccess extends Component<any, any> {
  async componentWillMount() {
    await this.init();
  }

  componentDidShow() {
    this.init();
  }

  state = {
    pageIndex: 0,
    relationGoodsIdList: [],
    payOrderStatus: -1,
    isHideComponent: false,
    currentPageDataIsComplete: false,
    isHideModule: true,
  } as any;

  render() {
    const {tid, points} = getCurrentInstance().router.params || {};
    const {pageIndex, relationGoodsIdList, payOrderStatus, isHideComponent, isHideModule} = this.state;
    return (
      <View className="points_confirm_order_success">
        <ScrollView
          scrollY
          scrollTop={!isHideModule ? 0 : null}
          scrollWithAnimation
          enableBackToTop={true}
          lowerThreshold={20}
          style={{height: '100vh', background: '#f5f5f5'}}
          onScrollToLower={lodash.debounce(() => {
            this.setState(({pageIndex, currentPageDataIsComplete}) => ({
              pageIndex: currentPageDataIsComplete ? pageIndex + Math.random() * 0.01 : pageIndex + 10,
            }));
          }, 1000)}
        >
          <View style={{height: !isHideModule ? 'calc(100% + 60px)' : 'auto', paddingTop: '40px'}}>
            <View className="returnS-info">
              <Image className="success" src={success} />
              {/* payOrderStatus收款状态：0已收款，1未收款，2待确认 */}
              <Text className="stext" style={{fontWeight: 'bold'}}>
                订单{!payOrderStatus ? '支付' : '提交'}成功
              </Text>
            </View>

            <View>
              <View className="slist">
                <View style={styles.box}>
                  <View className="sitem-text no-bottom">编号：{tid}</View>
                  <View className="sitem sitem-text no-top" style={{marginBottom: '0.17067rem'}}>
                    订单金额：
                    <Text className="price">{points}积分</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 热门商品推荐 */}
            <RecommendGoodsList
              pageIndex={pageIndex}
              type="6"
              recommendListCOMStyle={{
                paddingTop: '16px',
                paddingBottom: '90px',
              }}
              relationGoodsIdList={relationGoodsIdList}
              changeCommonModalProps={{
                chooseStyle: {
                  bottom: 0,
                },
              }}
              getCurrentPageDataIsComplete={(bol) => this.setState({currentPageDataIsComplete: bol})}
              setPageIndex={(index) => this.setState({pageIndex: index})}
              setHideModule={(bol) => this.setState({isHideModule: bol})}
              openModalHideComponent={(bol) => this.setState({isHideComponent: bol})}
            />
          </View>
        </ScrollView>

        {!isHideComponent ? (
          <View className="bt-box">
            <View className="bt-contain">
              <View
                className="bt-item"
                onClick={async () => {
                  await Taro.redirectTo({
                    url: `/pages/package-A/customer/user/points-order-list/index?keywords=`,
                  });
                }}
              >
                查看订单
              </View>
              <View
                className="bt-item"
                onClick={async () => {
                  await Taro.navigateTo({
                    url: '/pages/package-A/customer/user/points-mall/index',
                  });
                }}
              >
                返回首页
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  init = async () => {
    try {
      const {tid} = getCurrentInstance().router.params || {};
      const {goodsIdList, payOrderStatus} = (await api.tradeBaseController.payOrder(tid)) || {};

      this.setState({
        relationGoodsIdList: Array.isArray(goodsIdList) ? goodsIdList : [],
        payOrderStatus,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
const styles = {
  box: {
    marginTop: '0px',
  } as any,
};
//create by moon https://github.com/creasy2010/moon
