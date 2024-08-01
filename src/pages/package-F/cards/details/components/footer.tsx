import { View, Image, Text } from '@tarojs/components'
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './footer.less'
import customer from '@/assets/image/goods/goods-detail/customer.png';
import store from '@/assets/image/goods/goods-detail/store.png';

import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import actions from '../actions';
import { isEmpty, throttle } from 'lodash';
const defaultImage =
    'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/pandora-ui/assets/components/images/image-slider/icon-no-img.png';


@connect<Partial<any>, any>(store2Props, actions)
class Footer extends Component<any, any> {
    _choseService = () => {
        let { serviceUrl, enterpriseId, storeInfo, goodsInfo } = this.props.main;
        const pageInfo: any = Taro.getCurrentInstance().page;
        const route = pageInfo.route;
        const skuId = pageInfo?.options?.skuId;
        if (serviceUrl && enterpriseId) {
            // 直接跳转
            if (__TARO_ENV === 'h5') {
                window.location.href = serviceUrl;
            } else {
                wx.openCustomerServiceChat({
                    extInfo: { url: serviceUrl },
                    corpId: enterpriseId,
                    showMessageCard: true,
                    sendMessageTitle: goodsInfo.goodsInfoName,
                    sendMessageImg: goodsInfo.goodsInfoImg || defaultImage,
                    sendMessagePath: `${route}.html?skuId=${skuId}`,
                    success(res) {
                        console.log(res);
                    },
                    fail(res) {
                        console.log(res);
                    },
                });
            }
            return;
        }
        if (__TARO_ENV === 'h5') {
            Taro.navigateTo({
                url: `/pages/package-A/customer/chose-service-webview/index?storeId=${storeInfo.storeId
                    }`,
            });
        } else {
            Taro.setStorageSync(
                'weChatInfo',
                JSON.stringify({
                    sendMessageTitle: goodsInfo.goodsInfoName,
                    sendMessageImg: goodsInfo.goodsInfoImg || defaultImage,
                    sendMessagePath: `${route}.html?skuId=${skuId}`,
                }),
            );
            Taro.navigateTo({
                url: `/pages/package-A/customer/chose-service-webview/index?storeId=${storeInfo.storeId
                    }&showMessageCard=true`,
            });
        }
    };

    _beginBuy = throttle(() => {
        const { goodsType } = this.props.main.goodsInfo.goodsInfo
        if (goodsType === 7) {
            this.props.actions.action.toggleModal(true)
        } else {
            this.props.actions.action.buy()
        }
    }, 300, { leading: true, trailing: false })

    render() {
        const { type, isServiceOpen, goodsInfo } = this.props.main
        if (isEmpty(goodsInfo)) return null
        return (
            <View className='footer'>
                {
                    type === 'coupon' ? (
                        <View className='item' onClick={() => {
                            Taro.switchTab({ url: '/pages/index/index' })
                        }}>
                            <Image src={store} className='icon' mode="aspectFit" />
                            <Text className='text'>首页</Text>
                        </View>
                    ) : null
                }
                {
                    type === 'coupon' && isServiceOpen ? (
                        <View className='item' onClick={() => this._choseService()}>
                            <Image src={customer} className='icon' mode="aspectFit" />
                            <Text className='text'>客服</Text>
                        </View>
                    ) : null
                }
                <View className='buy' onClick={this._beginBuy}>
                    <Text className='buyText'>{type === 'coupon' ? '立即购买' : '立即充值'}</Text>
                </View>
            </View>
        )
    }
}

export default Footer