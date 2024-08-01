import React, { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import './index.less';
import config from '@/service/config';

const isH5 = __TARO_ENV === 'h5';
const ua = navigator.userAgent.toLowerCase();
const isWeixin = ua.indexOf('micromessenger') != -1;
const username = config.gh_Id;
const envVersion = config.envVersion;
const logo = 'https://wanmi-test.oss-cn-hangzhou.aliyuncs.com/f5fe9463f1b89e8115d96313b19d30c6.png'
const Index = () => {
  const [path, setPath] = useState<string>('/pages/user-center/index.html')

  const route = useRouter()

  useEffect(() => {
    const to = route.params?.to
    if (to) {
      const next = decodeURIComponent(to)
      setPath(`${next}.html`)
    }
  }, []);

  const queryMiniInfo = async () => {

  };

  const jumpToMini = () => {
    Taro.switchTab({
      url: '/pages/user-center/index',
    });
  };

  const renderOpenMini = () => {
    if (isWeixin) {
      return (
        <wx-open-launch-weapp id="launch-btn" username={username} path={path}>
          <script type="text/wxtag-template">
            <button
              style={{
                marginTop: '28px',
                fontSize: '18px',
                width: '215px',
                textAlign: 'center',
                color: '#fff',
                lineHeight: '36px',
                borderRadius: '18px',
                background: `#07c160`,
                border: 'none',
                outline: 'none',
              }}
            >
              打开小程序
            </button>
          </script>
        </wx-open-launch-weapp>
      );
    }
    return <Text className="normal-text">请在微信浏览器中打开此页面</Text>;
  };

  return (
    <View className="_page mini_launch">
      <Image src={logo} className="mini" />
      {
        isH5 ? (
          renderOpenMini()
        ) : (
            <Text className="open-launch-mini-text" onClick={jumpToMini}>
              打开小程序
            </Text>
          )
      }
    </View>
  );
};

export default Index;
