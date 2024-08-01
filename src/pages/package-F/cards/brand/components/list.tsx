import { ScrollView, View, Image, Text } from '@tarojs/components'
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './list.less'
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import actions from '../actions';


@connect<Partial<any>, any>(store2Props, actions)
class List extends Component<any, any>{

    renderItem = (item: POJO) => {
        return (
            <View className="item" key={item.brandId}
                onClick={() => {
                    Taro.navigateTo({
                        url: `/pages/package-B/goods/goods-list/index?keywords=${item.brandName}&brandIds=${JSON.stringify([item.brandId])}&pageSource=brand`
                    })
                }}
            >
                <Image src={item.logo || noDataIcon} className='logo' mode='aspectFit' />
                <Text className='text'>{item.brandName}</Text>
            </View>
        )
    }

    renderVip = (item: POJO) => {
        const goodsInfoId = item.goodsInfos?.[0]?.goodsInfoId
        const img = item.goodsInfos?.[0]?.goodsInfoImg
        const name = item.goodsInfos?.[0]?.goodsInfoName
        return (
            <View className="item vip" key={goodsInfoId}
                onClick={() => {

                    Taro.navigateTo({
                        url: `/pages/package-F/cards/details/index?id=${goodsInfoId}&type=zhichong`
                    })
                }}
            >
                <Image src={img || noDataIcon} className='logo' mode='aspectFit' />
                <Text className='text'>{name}</Text>
                <View className='btn'>立即兑换</View>
            </View>
        )
    }

    render() {
        const { main: { activeKey, brandList, couponList } } = this.props
        const isBrand = activeKey === 'brand'
        const ds = isBrand ? brandList : couponList
        if (!ds?.length) {
            return (
                <View className='no-data'>
                    <Text className='no-data-text'>{ds == undefined ? '正在请求数据...' : '暂无数据...'}</Text>
                </View>
            )
        }
        return (
            <ScrollView className='scroll' enhanced>
                <View className='scrollWrap' key={activeKey}>
                    {ds.map(item => {
                        return isBrand ? this.renderItem(item) : this.renderVip(item)
                    })}
                </View>
            </ScrollView>
        )
    }
}

export default List