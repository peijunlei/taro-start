import React, { useEffect } from 'react';
import { View, Text, Image } from "@tarojs/components";
import { useSetState, WMkit } from 'wmkit';
import { MyContext } from './context';
import { DataProps } from './types';
import api from 'api'
import defaultAvatar from '@/assets/image/customer/user-center/default.png'
import Taro, { useRouter, navigateTo } from '@tarojs/taro';
import { cache } from 'config';

import './index.less'
export default function Index() {
  const { id } = useRouter().params
  const [state, setState] = useSetState<DataProps>({
    grantAmount: 0,
    grantCustomerImg: '',
    grantCustomerName: '',
    grantMsg: '',
    grantState: 0,
    drawCustomerId: '',
    grantCompanyId: ''
  })
  const { grantAmount, grantCustomerImg, grantCustomerName, grantMsg, grantState, drawCustomerId, grantCompanyId } = state
  const customerId = Taro.getStorageSync(cache.LOGIN_DATA)?.customerId;
  // 自己领取
  const isSelfReceive = drawCustomerId === customerId
  async function init() {
    const res = await api.customerFundsController.getCustomergrantinfoById(id) as any
    const data = res.customerGrantInfoVO as DataProps
    setState(data)
  }
  async function handleReceive() {
    if (!WMkit.isLogin()) return Taro.navigateTo({ url: '/pages/package-A/login/login/index' })
    try {
      await api.customerFundsController.receiveRedPacket(id) as any
      init()
      Taro.showToast({ title: '领取成功' })
    } catch (error) {
      if (error.code === 'K-0101098') {
        Taro.showToast({ title: '你来晚了，当前红包已被领取', icon: 'none' })
      } else {
        Taro.showToast({ title: error.message, icon: 'none' })
      }
    }
  }

  // 跳转至我的账户
  async function handleJump() {
    const {enterpriseInfoVOList} = await api.customerBaseController.getEnterpriseInfoByCustomerId();
    const id = (enterpriseInfoVOList||[]).find(v=>v.enterpriseId===grantCompanyId)?.enterpriseId || '-1'
    try {
      await api.customerBaseController.changeLoginEnterpriseId(id);
    } catch (e) {
      Taro.showToast({
        title: e.message,
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    let loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    // 当前登录的账号所属的企业id
    loginData.lastLoginEnterpriseId = id;
    Taro.setStorageSync(cache.LOGIN_DATA, loginData);
    // 当前登录的企业与红包的不是一个企业
    if (grantCompanyId !== id) {
      Taro.navigateTo({ url: `/pages/package-A/customer/balance/home/index?enterpriseId=-1` })
    } else {
      Taro.navigateTo({ url: '/pages/package-A/customer/balance/home/index' })
    }
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <MyContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <View className='give-gift-red-packet'>
        <View className='container'>
          <View className='head'>
            <Image src={grantCustomerImg || defaultAvatar} className='img' />
            <View className='nickName'>
              {grantCustomerName}发出
            </View>
          </View>
          <View className='remark'>
            {grantMsg}
          </View>
          <View className='balance'>
            <Text className='amount'>{grantAmount.toFixed(2)}</Text>
            <Text className='unit'>元</Text>
          </View>
        </View>
        <View className='btn-status'>
          {/* 未领取 || 别人领取的 */}
          {
            (grantState === 0 || (grantState === 1 && !isSelfReceive)) &&
            <View className='btn receive' onClick={() => handleReceive()} >
              {'领取红包'}
            </View>
          }
          {
            //  已领取并且是自己领取
            (grantState === 1 && isSelfReceive) && <View className='btn received' onClick={handleJump}>
              {'已领取到账户，去查看'}
            </View>
          }
          {
            grantState === 2 &&
            <View className='btn expired'>
              {'红包过期未领取，已退回'}
            </View>
          }
        </View>

      </View>
    </MyContext.Provider>
  )
}