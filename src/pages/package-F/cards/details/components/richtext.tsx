import React, { Component } from 'react'
import { RichText as RT, View, Text } from '@tarojs/components'
import './richtext.less'

import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import actions from '../actions';
import { isEmpty } from 'lodash';

const empty = '<div style="color: #999;font-size: 13px; width: 100%; text-align: center;">暂无数据</div>'


@connect<Partial<any>, any>(store2Props, actions)
class RichText extends Component<any, any> {
    renderCoupon = () => {
        const goodsInfo = this.props.main?.goodsInfo
        const activeKey = this.props.main?.activeKey
        return (
            <>
                <View className='rt'>
                    <View className='row' id="node0">
                        <Text onClick={() => this.props.actions.action.changeActiveKey("0")} className={`text ${activeKey === '0' ? 'active' : ''}`}>兑换流程</Text>
                        <Text onClick={() => this.props.actions.action.changeActiveKey("1")} className={`text ${activeKey === '1' ? 'active' : ''}`}>须知</Text>
                    </View>
                    <RT className='rtnode' nodes={goodsInfo.goods.goodsDetail || empty} />
                </View>
                <View className='rt' id="node1">
                    <View className='row'>
                        <Text className='text notice'>须知</Text>
                    </View>
                    <RT className='rtnode' nodes={goodsInfo.goods.goodsNotice || empty} />
                </View>
                {/* <View className='rt'>
                    <View className='row'>
                        <Text className='text notice'>核销须知</Text>
                    </View>
                    <RT className='rtnode' nodes={goodsInfo.goods.goodsVerifyNotice || empty} />
                </View> */}
            </>
        )
    }

    renderZhiChong = () => {
        const goodsInfo = this.props.main?.goodsInfo
        return (
            <View className='rt spec clean'>
                <Text className='spu'>购买须知</Text>
                <RT className='rtnode' nodes={goodsInfo.goods.goodsDetail || empty} />
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

export default RichText