import React, {useEffect, useState} from 'react';
import {View, Text, Image} from '@tarojs/components';
import {Button} from '@wanmi/ui-taro';
import {getHashParam} from '@/utils/common-functions';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import './index.less';
import qQServiceController from 'api/QQServiceController';
import propsCloseIcon from './img/icon.png';

const VirtualGoodsReturn = () => {
  Taro.setNavigationBarTitle({title: '申请售后'});
  const [isHasOwnService, setIsHasOwnService] = useState<boolean>();
  const [isHasService, setIsHasService] = useState<boolean>(false);
  const [storeId, setStoreId] = useState<number>();
  // 判断是否是配置客服
  const hasOwnService = async () => {
    let type: any = 1;
    let storeId = getCurrentInstance().router.params.storeId ? Number(getCurrentInstance().router.params.storeId) : 0;
    setStoreId(storeId);
    const res = await Promise.all([
      // 商家
      qQServiceController.weChatDetail(storeId),
      qQServiceController.qqDetail(storeId, type),
      // 平台
      qQServiceController.weChatDetail(0),
      qQServiceController.qqDetail(0, type),
    ]);
    if (res[0]?.weChatOnlineServerRop?.status === 1 || res[1]?.qqOnlineServerRop?.status === 1) {
      setIsHasOwnService(true);
    } else if (res[2]?.weChatOnlineServerRop?.status === 1 || res[3]?.qqOnlineServerRop?.status === 1) {
      setIsHasService(true);
    }
  };

  useEffect(() => {
    // ThemeDom.handleDomStyle();
    hasOwnService();
  }, []);

  const clickHandle = () => {
    if (isHasOwnService) {
      Taro.navigateTo({
        url: `/pages/package-A/customer/chose-service-webview/index?storeId=${storeId}`,
      });
    } else {
      if (isHasService) {
        Taro.navigateTo({
          url: `/pages/package-A/customer/chose-service-webview/index`,
        });
      }
    }
  };
  return (
    <View className="_page virtual-return">
      <View className="return-text">
        <View className="return-icon">
          <Image src={propsCloseIcon} className="icon" />
        </View>
        <Text className="text-cls">该商品暂不支持申请退款</Text>
        <Text className="text-cls">如有疑问，请联系商家协商处理</Text>
      </View>
      <View className="btn-cls">
        <Button size="large" onClick={clickHandle} disabled={!isHasOwnService && !isHasService}>
          联系商家
        </Button>
      </View>
    </View>
  );
};

export default VirtualGoodsReturn;
