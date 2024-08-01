import { View, Text, Input } from '@tarojs/components'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import './sections.less'
import IconFont from '@/wmkit/common/iconfont'
import { store2Props } from '../selectors';
import actions from '../actions';


@connect<Partial<any>, any>(store2Props, actions)
class Sections extends Component<any, any> {
    render() {
        const { main: { activeKey, keyword }, actions } = this.props
        return (
            <View className='wrap'>
                <View className="row">
                    <View className={`item ${activeKey === 'brand' ? 'active' : ''}`} onClick={() => actions.action.changeActiveKey('brand')}>
                        <Text className="text">大牌卡券</Text>
                        <View className='line' />
                    </View>
                    <View className={`item ${activeKey === 'coupon' ? 'active' : ''}`} onClick={() => actions.action.changeActiveKey('coupon')}>
                        <Text className="text">视听权益</Text>
                        <View className='line' />
                    </View>
                </View>
                <View className='search'>
                    <IconFont value='sousuo2' size={12} color='rgba(0,0,0,0.4)' />
                    <Input className='search-input' value={keyword} onInput={e => {
                        actions.action.onSearchInput(e.detail.value)
                    }} placeholder={`搜索${activeKey === 'brand' ? '卡券' : '视听权益'}名称`} placeholderClass='search-holder' />
                </View>
            </View>
        )
    }
}

export default Sections