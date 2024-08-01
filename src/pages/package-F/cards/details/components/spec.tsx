import { View, Text, Image } from '@tarojs/components'
import React, { Component } from 'react'
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
import './spec.less'

import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import actions from '../actions';
import { isEmpty } from 'lodash';
import {log} from "util";


@connect<Partial<any>, any>(store2Props, actions)
class Spec extends Component<any, any> {
    renderCoupon = () => {
        const goodsInfo = this.props.main?.goodsInfo
        return (
            <View className='spec' onClick={() => {
                this.props.actions.action.toggleModal(true)
            }}>
                <View className='wrap' >
                    <Text className='specName'>选择兑换面值</Text>
                    <Text className='available'>{goodsInfo.goodsInfos.length || 0}种面值可选</Text>
                </View>
                <Image src={moreIcon} className="more" mode="aspectFit" />
            </View>
        )
    }

    renderZhiChong = () => {
        const goodsInfo = this.props.main?.goodsInfo
        const goodsInfoId = goodsInfo.goodsInfo.goodsInfoId
        const { goodsSpecs, goodsSpecDetails } = goodsInfo
        const specName = goodsSpecs[0].specName
        const map = goodsSpecDetails.reduce((pre, item) => {
            pre[item.specDetailId] = item.detailName
            return pre
        }, {})

      console.log('map',map)
        return (
            <>
                <View className='spec clean top'>
                    <Text className="spu">充值类型</Text>
                    <View className='goods'>
                        <View className='item active'>
                            <Text className='text'>{goodsInfo.goods.goodsName}</Text>
                        </View>
                    </View>
                </View>
                <View className='spec clean'>
                    <Text className="spu">充值面额</Text>
                    <View className='goods'>
                        {
                            goodsInfo.goodsInfos.map(item => {
                              console.log("item========>",JSON.stringify(item));
                                const id = item.mockSpecDetailIds[0]
                                const isActive = item.goodsInfoId === goodsInfoId
                                return (
                                    <View className={`item item2 ${isActive ? 'active' : ''}`} key={id}
                                        onClick={() => {
                                            if (isActive) return
                                            this.props.actions.action.changeSpecDetail(item.goodsInfoId)
                                        }}>
                                        <Text className='text' style={{textAlign:"center",lineHeight:'20px'}}>{map[id]}</Text>
                                        {/*<Text className='sku'>{map[id]}元</Text>*/}
                                        <Text className='sku'>{item.marketPrice}元</Text>

                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </>
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

export default Spec
