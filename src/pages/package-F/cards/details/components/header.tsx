import { View, Image, Text, Input, Swiper, SwiperItem } from '@tarojs/components'
import React, { Component } from 'react'
import no from '@/assets/image/cards/no.png'
import yes from '@/assets/image/cards/yes.png'
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import './header.less'
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import actions from '../actions';
import { isEmpty } from 'lodash'


@connect<Partial<any>, any>(store2Props, actions)
class Header extends Component<any, any> {
    renderCoupon = () => {
        const goodsInfo = this.props.main?.goodsInfo
        const images = []
        const currentGoodsInfo = goodsInfo.goodsInfo
        if (goodsInfo.goods.goodsImg) images.push(goodsInfo.goods.goodsImg)
        if (goodsInfo.goodsInfo.goodsInfoImg) images.push(goodsInfo.goodsInfo.goodsInfoImg)
        return (
            <View className='header'>
                <Swiper circular
                    indicatorDots={false}
                    className='cover'
                    autoplay>
                    {images.map((img, i) => (
                        <SwiperItem key={i} >
                            <Image src={img} className='coverImage' mode="scaleToFill" />
                        </SwiperItem>
                    ))}
                </Swiper>
                <Text className='titleName'>{currentGoodsInfo.goodsInfoName}</Text>
                {/* <View className='rules'>
                    <Text className='name'>服务</Text>
                    <Image src={no} className='icon offset' mode="aspectFit" />
                    <Text className='name offset2'>不支持退换</Text>
                    <Image src={yes} className='icon offset' mode="aspectFit" />
                    <Text className='name offset2'>可多次核销</Text>
                    <Image src={yes} className='icon offset' mode="aspectFit" />
                    <Text className='name offset2'>可叠加使用</Text>
                </View> */}
            </View>
        )
    }

    renderZhiChong = () => {
        const goodsInfo = this.props.main?.goodsInfo
        const img = goodsInfo.goodsInfo.goodsInfoImg || goodsInfo.goods.goodsImg
        const accountType = goodsInfo.goodsInfo.accountType ?? 1

        return (
            <View className='header'>
                <View className='wrap'>
                    <Image src={img || noDataIcon} className='zhiCover' mode="aspectFill" />
                    <View className='zhiCover' style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} />
                </View>
                <View className='coverFront'>
                    <View className='row'>
                        <Image src={img || noDataIcon} className='goodsImage' mode="aspectFit" />
                        <Text className='goodsName'>{goodsInfo.goods.goodsName}</Text>
                    </View>
                    <View className='account'>
                        <Text className='accountText'>充值帐户</Text>
                        <View className='wraps'>
                            <Input className='number' type='idcard' onInput={e => {
                                this.props.actions.action.changeNumber(e.detail.value)
                            }} placeholderClass='number-holder' placeholder={`请输入${accountType == 0 ? '账号' : accountType == 1 ? '手机号码' : 'QQ号'}`} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const goodsInfo = this.props.main?.goodsInfo
        if (isEmpty(goodsInfo)) return null
        const { type } = this.props.main
        if (type === 'coupon') return this.renderCoupon()
        return this.renderZhiChong()
    }
}

export default Header