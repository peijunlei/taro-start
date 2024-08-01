import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro';
import React, { Component, useState, useEffect } from 'react';
import { WebView } from '@tarojs/components';
import api from 'api';
import { XuanKuaType } from 'api/CustomerBaseController';

export default function PageLink() {
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  function handleLoad(e) {
    const nowUrl = e.detail.src;
    console.log('nowUrl',nowUrl)
    if (nowUrl.indexOf('pages/package-C/order/order-tool/order-pay/index') > -1) {
      setShow(false)
      const url = nowUrl.split('mobile')[1]
      Taro.navigateTo({
        url
      })
      return;
    }
  }
  async function getXuanKuaLoginUrl() {
    //获取免登url
    try {
      const { url } = await api.customerBaseController.getXuanKuaUrl(XuanKuaType.MT_TAKEOUT);
      setUrl(url)
      setShow(true)
    } catch (error) {
      Taro.showToast({
        title: error.message,
        icon: 'none'
      })
    }
  }

  useDidShow(() => {
    getXuanKuaLoginUrl()
  })
  if(!show)return null

  return (
    <WebView
      src={url}
      id="myWebView"
      onLoad={handleLoad} />
  )
}

