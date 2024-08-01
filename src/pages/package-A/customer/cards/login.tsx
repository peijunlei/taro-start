import React, { useEffect, useRef, useState } from 'react';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Image, Input, Button } from "@tarojs/components";
import { useSetState, WMkit, msg } from 'wmkit';
import api from 'api';
import config from '@/service/config';

import './index.less'
import { cache } from 'config';

import BgIcon from '@/assets/image/customer/oriental-exchange/oriental-bg.png';
import pwdIcon from '@/assets/image/customer/oriental-exchange/pwd.png';
import vCodeIcon from '@/assets/image/customer/oriental-exchange/v-code.png';
import cardIcon from '@/assets/image/customer/oriental-exchange/card.png';
import phoneIcon from '@/assets/image/customer/oriental-exchange/phone.png';
import kefuIcon from '@/assets/image/customer/oriental-exchange/kefu.png';
import SendCode from '@/pages/common/send-code';

const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
const regexPass = /^[A-Za-z0-9]{6,16}$/;
const verificationCode = /^\d{6}$/;

export default function Index() {
  const [cardNo, setCardNo] = useState('')
  const [pwd, setPwd] = useState('')
  const [phone, setPhone] = useState('')
  const [vCode, setVcode] = useState('')

  async function handleSubmit() {
    if (!cardNo) {
      Taro.showToast({
        title: '请输入卡号',
        icon: 'none',
        duration: 2000,
      });
      return
    }
    if (!pwd) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    if (!phone) {
      Taro.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
      });
      return false;
    } else if (!regexTel.test(phone)) {
      Taro.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    if (!vCode) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000,
      });
      return false;
    } else if (!verificationCode.test(vCode)) {
      Taro.showToast({
        title: '验证码格式有误',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    // 登录
    const params = {
      customerAccount: phone,
      verificationCode: vCode,
      cardNo,
      cardPwd: pwd
    }
    try {
      const context = await api.loginBaseController.exchangeCardLogin(params) as any
      if (!context) return
      handleJump(context)
    } catch (error) {
      Taro.showToast({ title: error.message, icon: 'none' })
    }
  }

  /**
   * 处理登录成功后的跳转逻辑
   * 跳这张卡所属企业的余额页面（独立企业），非独立企业跳平台余额页面
   */
  async function handleJump(context: any) {
    // //登陆成功逻辑
    
    //  跳转拉起小程序的中间页
    Taro.navigateTo({
      url: `/pages/package-B/launch-mini/index`,
    });
  }
  async function sendCode() {
    if (!phone) {
      Taro.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
      });
      return false;
    } else if (!regexTel.test(phone)) {
      Taro.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    //验证码
    try {
      await api.loginBaseController.fetchExchangeCardVcode(phone);
      Taro.showToast({
        title: '验证码发送成功',
        icon: 'none',
        duration: 2000,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
  }, [])
  return (
    <View className='oriental-exchange'>
      <View>
        <Image src={BgIcon} className='bg' />
      </View>
      <View className='content'>
        <View className='cell'>
          <Image src={cardIcon} className='icon' />
          <Input
            className='ipt'
            placeholder='请输入卡号'
            value={cardNo}
            onInput={(e) => {
              const value = e.detail.value
              setCardNo(value)
            }}
          />
        </View>
        <View className='cell'>
          <Image src={pwdIcon} className='icon' />
          <Input
            className='ipt'
            placeholder='请输入密码'
            value={pwd}
            password
            onInput={(e) => {
              const value = e.detail.value
              setPwd(value)
            }}
          />
        </View>
        <View className='cell'>
          <Image src={phoneIcon} className='icon' />
          <Input
            className='ipt'
            placeholder='请输入手机号'
            type='number'
            maxlength={11}
            value={phone}
            onInput={(e) => {
              const value = e.detail.value
              setPhone(value)
            }}
          />
        </View>
        <View className='cell'>
          <Image src={vCodeIcon} className='icon' />
          <Input
            className='ipt'
            placeholder='请输入验证码'
            type='number'
            maxlength={6}
            value={vCode}
            onInput={(e) => {
              const value = e.detail.value
              setVcode(value)
            }}
          />
          <SendCode
            type="grey"
            onClick={sendCode}
          />
        </View>
        <View className='save-btn' onClick={handleSubmit}>登录</View>
      </View>
      <View className='kefu' onClick={() => Taro.navigateTo({ url: '/pages/package-A/customer/chose-service-webview/index' })}>
        <Image src={kefuIcon} className='img' />
      </View>
    </View >

  )
}
