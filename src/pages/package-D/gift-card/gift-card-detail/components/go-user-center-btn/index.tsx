import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import api from 'api'

import './index.less';
import '../gift-card-bottom.less';
import config from "@/service/config";
import { cache } from "config";

const isH5 = __TARO_ENV === 'h5';
const ua = navigator.userAgent.toLowerCase();
const isWeixin = ua.indexOf('micromessenger') != -1;
const path = 'pages/package-F/login-middle/index';
const userCenter = '/pages/user-center/index';
const btnText = '返回个人中心';
const envVersion = config.envVersion;
const username = config.gh_Id;
interface IProps {
  giftCardId?: string;
  enterpriseId: string;
  isCommLogin?: boolean;
}
function GoUserCenterBtn(props: IProps) {
  const { enterpriseId, isCommLogin } = props;

  async function handleClick() {
    const token = encodeURIComponent(Taro.getStorageSync(cache.AUTH_TOKEN));
    console.log('isCommLogin', isCommLogin,token)
    if (isH5 && isCommLogin) {
      const res = await api.customerBaseController.getWeixinScheme({
        path,
        envVersion,
        query: `accessToken=${token}`
      })
      if (!res) {
        console.log('获取Url Scheme失败')
        return
      }
      console.log('Url Scheme', res)
      window.location.href = res as unknown as string;
    } else {
      Taro.switchTab({ url: userCenter });
    }
  }
  return (
    <View className="gift_card_bottom">
      <Button className="btn btn-primary" onClick={handleClick}>
        {btnText}
      </Button>
    </View>
  );
}

export default GoUserCenterBtn;