import React, { useEffect, useRef } from 'react';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Image, Input, Button } from "@tarojs/components";
import { useSetState } from 'wmkit';
import { MyContext } from './context';
import { DataProps } from './types';
import arrow from '@/assets/image/customer/user-center/arrow.png';
import api from 'api';
import config from '@/service/config';
import PosterModal from './components/PosterModal';

import './index.less'
import { cache } from 'config';
const defaultRemark = "TA向你砸来一个红包"
export default function Index() {
  const iptRef = useRef(null)
  const [state, setState] = useSetState<DataProps>({
    laoding: false,
    balance: 0,
    remark: defaultRemark,
    amount: 0,
    visible: false,
    redPacketInfo: null
  })
  const { balance, remark, amount, visible, redPacketInfo } = state
  async function getStatistics() {
    const res = await api.customerFundsController.statistics() as any
    setState({
      amount: res?.accountBalanceTotal
    })
  }
  async function handleSubmit() {
    if (amount === 0) return Taro.showToast({ title: '账户余额不足', icon: 'none' })
    if (!Number(balance)) {
      if (Number(balance) === 0) {
        Taro.showToast({ title: '转赠金额不能为0', icon: 'none' })
        setState({balance:0})
      } else {
        Taro.showToast({ title: '请输入转赠金额', icon: 'none' })
      }
      return
    }
    // if (!remark) {
    //   Taro.showToast({ title: '请输入转赠寄语', icon: 'none' })
    //   return
    // }
    try {
      Taro.showLoading()
      const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
      const res = await api.customerFundsController.addCustomergrantinfo({ grantAmount: balance, grantMsg: remark || defaultRemark, enterpriseId: loginData.lastLoginEnterpriseId || null }) as any
      setState({ redPacketInfo: res.customerGrantInfoVO, balance: 0, visible: true })
      getStatistics()
      Taro.hideLoading()
    } catch (e) {
      Taro.showToast({ title: e.message, icon: 'none' })
      Taro.hideLoading()
    }

  }
  function handleShare() {
    const url = `${window.location.origin}/mobile/pages/package-A/customer/give-gift-red-packet/index?id=${redPacketInfo?.id}`
    Taro.setClipboardData({
      data: url
    }).then((res) => {
      Taro.showToast({
        title: '已复制',
        icon: 'none',
      });
    });
  }

  const maxAmount = amount
  useShareAppMessage(res => {
    if (res.from === 'button') {
      return {
        title: redPacketInfo.grantMsg,
        imageUrl: 'https://ori-wanmi-dev.oss-cn-hangzhou.aliyuncs.com/mini/assets/image/customer/give-gift/share_cover.png',
        path: `/pages/package-A/customer/give-gift-red-packet/index?id=${redPacketInfo.id}`
      }
    }
  })

  useEffect(() => {
    getStatistics()
  }, [])
  return (
    <MyContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <View className='give-gift'>
        <View className='head bg'>
          <View className='title'>余额转赠</View>
        </View>
        <View className='container'>
          <View className='balance cell'>
            <View className='left'>
              可用余额 (元）
            </View>
            <View className='text'>
              {maxAmount + ''}
            </View>
          </View>

          <View className='balance cell'>
            <View className='left'>
              转赠金额（元）
          </View>
            <View className='input'>
              <Input
                // type='number'
                value={balance ? balance.toString() : undefined}
                // maxlength={balance >= maxAmount ? maxAmount.toString().length : 140}
                maxlength={balance >= maxAmount ? maxAmount.toString().length : balance?.toString().includes('.') ? balance?.toString().match(/^\d+/)[0].length + 3 : 140}
                className="point-input"
                placeholder="请输入转赠金额数"
                onInput={(e) => {
                  let val = e.detail.value;
                  // 移除输入值中的负号
                  val = val.replace(/-/g, '')
                  // 使用正则表达式匹配输入值是否符合要求：只允许数字和最多两位小数
                  const regex = /^\d+(\.\d{0,2})?$/;
                  const isValidInput = regex.test(val);
                  
                  if (!isValidInput) {
                    // 如果输入不符合要求，则将输入框的值重置为符合要求的格式
                    const validValue = val.match(/^\d+(\.\d{0,2})?/);
                    val = validValue ? validValue[0] : '';
                  }
                  console.log(val);
                  
                  const point = Number(val) >= maxAmount ? maxAmount : (val);
                  setState({ balance: point });
                }}
              />
            </View>
          </View>
          <View className='remark cell'>
            <View className='left'>
              转赠寄语
          </View>
            <View className='input'>
              <Input
                maxlength={25}
                value={remark}
                placeholder={defaultRemark}
                className="remark-input"
                onInput={(e) => {
                  setState({ remark: e.detail.value })
                }}
              />
            </View>
          </View>
          <View className='btn' onClick={handleSubmit}>
            生成红包并转赠
          </View>
          <View className='view'>
            <Text className='text' onClick={() => Taro.navigateTo({ url: `/pages/package-A/customer/give-gift-record/index` })}>
              查看转赠记录
            </Text>
            <Image src={arrow} className='arrow-right' />
          </View>
        </View>
        <PosterModal
          visible={visible}
          data={redPacketInfo}
          onClose={() => setState({ visible: false })}
          onShare={handleShare}
        />
      </View>

    </MyContext.Provider >
  )
}
