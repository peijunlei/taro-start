import Taro, { getCurrentPages, useDidHide, useShareAppMessage, useDidShow } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, WebView } from '@tarojs/components';
import config from '@/service/config';
import { _, WMkit, wxShare, msg, pvUvStatics, AMapService } from 'wmkit';
import { cache } from 'config';
import api from 'api';

const getCurrentInstance = Taro.getCurrentInstance;

interface CityInfo {
  cityCode: string;
  cityName: string;
}

const defaultLocation = { latitude: 31.230399, longitude: 121.473701 };
const defaultCityInfo = { cityName: '上海市', cityCode: '310100' }
const defaultData = { ...defaultCityInfo, ...defaultLocation }
const defaultCity = { addrName: '上海市', addrId: '310100' }
// 获取当前位置
const getLocation = () => {
  return new Promise<CityInfo & ILocation>((resolve, reject) => {
    if (__TARO_ENV === 'h5') {
      AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          noIpLocate: 1,
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          GeoLocationFirst: true, // 默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位
        });
        geolocation.getCurrentPosition((status: any, result: any) => {
          console.log('定位信息：', result);
          if (status == 'complete') {
            let city = result ? result.addressComponent.city : defaultCityInfo.cityName;
            let cityCode = result ? result.addressComponent.adcode.slice(0, 4) + '00' : defaultCityInfo.cityCode;
            if (city.length === 0) {
              city = result.addressComponent.province
            }
            resolve({
              longitude: result.position.lng,
              latitude: result.position.lat,
              cityCode,
              cityName: city,
            })
          } else {
            resolve(defaultData)
          }
        });
      });
    } else {
      Taro.getLocation({
        type: 'gcj02',
        success: async (res) => {
          const result = await AMapService.geocoder({ longitude: res.longitude, latitude: res.latitude });
          if (!result) {
            return resolve(defaultData)
          }
          let city = result ? result.regeocode.addressComponent.city : defaultCityInfo.cityName;
          let cityCode = result ? result.regeocode.addressComponent.adcode.slice(0, 4) + '00' : defaultCityInfo.cityCode;
          if (city.length === 0) {
            city = result.regeocode.addressComponent.province
          }
          resolve({
            longitude: res.longitude,
            latitude: res.latitude,
            cityCode,
            cityName: city,
          })
        },
        fail: (res) => {
          resolve(defaultData)
        }
      })
    }
  });
};

function Index() {
  const [loading, setLoading] = useState(true)
  const [storeId, setStoreId] = useState('')
  const [enterpriseId, setEnterpriseId] = useState('')
  const [token, setToken] = useState('')
  const [location, setLocation] = useState<ILocation>(defaultLocation)
  const [cityInfo, setCity] = useState<CityInfo>({
    cityName: '定位中...',
    cityCode: ''
  })
  const { latitude, longitude } = location
  let url =
    storeId != undefined && storeId != '-1'
      ? `${WMkit.prefixUrl(
        config.magicHost,
      )}/mini/index/${storeId}?token=${token}&inviteeId=${WMkit.inviteeId()}&storeType=mall&isH5=${__TARO_ENV}&enterpriseId=${enterpriseId}&lng=${longitude}&lat=${latitude}&city=${encodeURI(cityInfo.cityName)}&areaId=${cityInfo.cityCode}`
      : `${WMkit.prefixUrl(
        config.magicHost,
      )}/mini/index?token=${token}&inviteeId=${WMkit.inviteeId()}isH5=${__TARO_ENV}&enterpriseId=${enterpriseId}&lng=${longitude}&lat=${latitude}&city=${encodeURI(cityInfo.cityName)}&areaId=${cityInfo.cityCode}`;

  const fetchConfigOrder = () => {
    let url = `${WMkit.prefixUrl(config.renderHost)}/magic/d2cStore/000000/weixin/index`;
    let storeId = Taro.getStorageSync(cache.STORE_ID);
    if (storeId != undefined && storeId != '-1') {
      url = `${url}?storeId=${storeId}`;
    }
    Taro.request({
      method: 'GET',
      // mode: 'no-cors',
      url: url,
      success: (res) => {
        if (_.isWeixin()) {
          // 获取分享配置,如果存在的话
          const shareInfo = res.data.data.shareInfo;
          if (!!shareInfo && Object.keys(shareInfo).length > 0) {
            let { title, desc, imgSrc } = shareInfo;
            // 根据配置自定义分享内容
            wxShare.initShare(title, desc, imgSrc ? imgSrc : '', 0);
          }
        }
      },
    });
  };

  async function initIndex() {
    let storeId;
    let token = Taro.getStorageSync('authInfo:token');
    await api.systemController.findBaseConfig().then((res) => {
      const { pcIco } = res;
      const icon = pcIco ? JSON.parse(pcIco)[0].url : '';
      if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
        let linkEle = document.getElementById('icoLink') as any;
        linkEle.href = icon;
        linkEle.type = 'image/x-icon';
      }
      // 存储当前品牌商城ID
      // localStorage.setItem(cache.STORE_ID, storeId);
      Taro.setStorageSync(cache.STORE_ID, res.storeId);
      storeId = res.storeId;
    });
    setLoading(false)
    //埋点
    pvUvStatics.myPvUvStatis({});

    if (WMkit.needLogin()) {
      WMkit.changeTabBarText();
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }
    Taro.removeStorageSync(cache.SINGER_CARD_LOGIN);
    //返回自己店铺 刷新页面
    if (Taro.getStorageSync(cache.MAIN_RELOAD)) {
      Taro.removeStorageSync(cache.MAIN_RELOAD);
    }

    if (window && window.location) {
      let url = window.location.pathname;
      if (url == '/') {
        //从域名直接进入全站商城，默认清空邀请人id和分销渠道
        Taro.removeStorageSync(cache.INVITEE_ID);
        Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
      }
    }

    //避免h5一直刷新
    //取缓存中的是否开启分销
    //查询分销是否开启，并存入缓存
    //如果状态不同，更新tabbar
    const preIsOpen = Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR);
    const isOpen = await WMkit.isOpenDistributor();
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    // 当前登录的账号所属的企业id
    let enterpriseId = loginData.lastLoginEnterpriseId === '-1' ? '' : loginData.lastLoginEnterpriseId;
    if (__TARO_ENV === 'h5') {
      const eId = sessionStorage.getItem(cache.CHANNEL_ENTERPRISE_ID)
      if (!WMkit.isLogin() && eId) {
        enterpriseId = eId;
      }
    }

    //对比分销员资格
    let isChangedistributorFlag = false;
    if (WMkit.isLogin()) {
      const preDistributorFlag = Taro.getStorageSync(cache.DISTRIBUTOR_FLAG);
      await WMkit.setIsDistributorFlag();
      const distributorFlag = Taro.getStorageSync(cache.DISTRIBUTOR_FLAG);
      isChangedistributorFlag = preDistributorFlag != distributorFlag;
    }

    // 是否开启直播
    const preIsOpenLive = Taro.getStorageSync(cache.IS_OPEN_LIVE);
    const isOpenLive = await WMkit.isLiveOpen();
    // 获取上次tabbar是否家在成功
    const needReload = Taro.getStorageSync(cache.NEED_TABBAR_RELOAD);

    if (preIsOpen != isOpen || isChangedistributorFlag || needReload || preIsOpenLive != isOpenLive) {
      WMkit.changeTabBarText();
    }
    // 不能隐藏此代码,隐藏会导致首页无法刷新,不知道为什么
    if (__TARO_ENV === 'h5') {
      setTimeout(() => {
        // 执行magic-box中的init()方法
        const iframes: any = document.getElementsByTagName('iframe');
        // H5端向壳子里面发送消息，传递token
        if (iframes && iframes[0] && iframes[0].contentWindow) {
          iframes[0].contentWindow.postMessage({ token: encodeURIComponent(token) }, '*');
        }
      }, 300);
    }
    setStoreId(storeId)
    setToken(token)
    setEnterpriseId(enterpriseId || '')
  }
  async function initLocation() {
    const { longitude, latitude, cityCode, cityName } = await getLocation();
    console.log(cityName);
    setLocation({ longitude, latitude });
    setCity({ cityCode, cityName });
    // 存储当前经纬度并获取城市信息
    Taro.setStorageSync(cache.CURRENT_POSITION, { latitude, longitude });
    Taro.setStorageSync(cache.CACHE_POSITION_CITY, { addrName: cityName, addrId: cityCode });
  }

  function getCacheCity() {
    const cacheCity = Taro.getStorageSync(cache.CACHE_POSITION_CITY);
    if (cacheCity && cacheCity.addrId !== cityInfo.cityCode) {
      setCity({
        cityName: cacheCity.addrName,
        cityCode: cacheCity.addrId
      })
    }
  }
  function getLocationAuth() {
    Taro.showModal({
      title: '是否授权当前位置',
      content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
      success: (res) => {
        if (res.confirm) {
          initLocation()
        } else {
          setLocation(defaultLocation)
          setCity(defaultCityInfo)
          // 存储当前经纬度并获取城市信息
          Taro.setStorageSync(cache.CURRENT_POSITION, defaultLocation);
          Taro.setStorageSync(cache.CACHE_POSITION_CITY, defaultCity);
        }
      }
    })
  }
  // @ts-ignore 
  useShareAppMessage(async (res) => {
    if (WMkit.isLogin()) {
      api.storeShareRecordController.add({
        storeId: -1,
        companyInfoId: -1,
        indexType: 0,
      });
    }
    const pages = getCurrentPages(); //获取加载的页面
    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    const url = currentPage.route; //当前页面url
    const params = getCurrentInstance().router?.params;
    const newUrl = await wxShare.changeUrl(res.from, url, params);
    //const newUrl = await wxShare.changeUrl(res.from);
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));

    return {
      // 什么也不写
      title: wechatShareInfo?.title,
      imageUrl: wechatShareInfo?.imgUrl[0].url,
      path: newUrl,
    };
  })
  useDidHide(() => {
  })
  useDidShow(() => {
    initIndex()
    getCacheCity()
    Taro.setStorageSync(cache.CACHE_HOME_FLAG, false)
  })
  useEffect(() => {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    _.addressInit();
    fetchConfigOrder() // 分享初始化调一次就行了
  }, [])
  useEffect(() => {
    if (__TARO_ENV === 'h5') {
      getLocationAuth()
    } else {
      initLocation()
    }
  }, [])
  if (loading) return null
  return (
    <View style={{ height: 'calc(100vh - 50px)' }}>
      <WebView
        id='mainIndexWebview'
        src={url}
        onLoad={(e) => {
          msg.emit('webviewLoaded');
        }}
      />
    </View>
  )

}
export default Index;
