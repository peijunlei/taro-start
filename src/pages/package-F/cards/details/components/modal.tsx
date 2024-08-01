import './modal.less'

import { View, Image, Text, Input, Swiper, SwiperItem } from '@tarojs/components'
import React, { Component } from 'react'
import './header.less'
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import actions from '../actions';
import IconFont from '@/wmkit/common/iconfont';
import { Stepper } from '@wanmi/ui-taro';
import { isEmpty } from 'lodash';

@connect<Partial<any>, any>(store2Props, actions)
class Modal extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            didShow: false
        }
    }
    componentDidMount(): void {
        this.setState({
            didShow: true
        })
    }

    onClose = async () => {
        return new Promise(r => {
            this.setState({ didShow: false }, () => {
                setTimeout(() => {
                    this.props.actions.action.toggleModal(false)
                    r(true)
                }, 300)
            })
        })

    }

    render() {
        const { main, actions } = this.props
        if (isEmpty(main)) return null
        const { goodsInfo } = main
        if (isEmpty(goodsInfo)) return null
        const { goodsSpecDetails, goodsSpecs, goodsInfo: { mockSpecDetailIds, stock, preBuyCount }, goodsInfos } = goodsInfo
        const lists = goodsInfos.map(e => e.mockSpecDetailIds[0])
        return (
            <View className='mask'>
                <View className='maskbody' style={{ transform: `translateY(${this.state.didShow ? 0 : '100%'})` }}>
                    <IconFont value='guanbi' color='#000' className='close' size={18} onClick={this.onClose} />
                    <Text className='name'>{goodsSpecs?.[0]?.specName}</Text>
                    <View className='list'>
                        {
                            goodsSpecDetails.map(e => {
                                const isActive = mockSpecDetailIds[0] === e.specDetailId
                                const disable = !lists.includes(e.specDetailId)
                                return (
                                    <View className={`itemWrap ${isActive ? 'active' : ''} ${disable ? 'disable' : ''}`} key={e.specDetailId} onClick={() => {
                                        if (isActive || disable) return
                                        const nextId = goodsInfo.goodsInfos.find(x => x.mockSpecDetailIds[0] === e.specDetailId).goodsInfoId
                                        actions.action.changeSpecDetail(nextId)
                                    }}>
                                        <Text className='item'>{+(e.detailName)}元</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className='buywrap'>
                        <Text className='buylabel'>购买数量</Text>
                        <Stepper min={1} count={preBuyCount} max={stock} getNum={(num, flag) => {
                            actions.action.changeBuyCount(num)
                        }} />
                    </View>
                    <View className='footerx'>
                        <View className='btn' onClick={async () => {
                            await this.onClose()
                            await actions.action.buy()
                        }}>
                            立即购买
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Modal