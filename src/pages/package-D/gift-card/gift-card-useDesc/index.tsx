/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:18:48
 * @LastEditors: 何善万 heshanwan@qianmi.com
 * @LastEditTime: 2022-12-15 10:38:10
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, {getCurrentInstance, } from '@tarojs/taro';
import {View, Text, Image, Input, RichText} from '@tarojs/components';
import React, {Component, Fragment, useEffect, useState} from 'react';
import {getHashParam} from '@/utils/common-functions';

import WMLoading from '@/pages/common/loading';
import {_} from 'wmkit';

import {getUserGiftCardDetail} from 'api/GiftCardController';


import './index.less';

export default function GiftCardUseDesc(props){
  const [useDesc, setUseDesc] = useState('')
  useEffect(() => {
    const current = getCurrentInstance();
    const {onShow} = current.router;
    // 解决taro h5中 didshow偶发的无法获取路由传参的问题
    // 解决首页进入商品详情-点击商品数-点击商品进入详情-回退两次 页面一直加载；
    const param = getHashParam<{id: string}>(onShow.split('.')[0]);
    (async function fn(){
      try {
        const {userGiftCardInfoVO} =  await getUserGiftCardDetail(param?.id) as any;
        setUseDesc(userGiftCardInfoVO.useDesc)
        } catch (error) {
          Taro.showToast({title: error});
    }
  })()
  }, [])
return (
  <View className="gift-card-use-desc _page">
      <RichText nodes={_.formatRichText(useDesc)} />
   </View>
  )

}

