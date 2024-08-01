import { Command } from '../constant';
import { Dispatch } from 'typings';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
import { cache } from 'config';
import { msg, AMapService } from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    // 查询缓存中的地址信息
    async query(urlAddress, from?: string) {
      Taro.setStorageSync(cache.CACHE_HOME_FLAG, from === 'home')
      const chooseCityTag = Taro.getStorageSync(cache.CACHE_CHOOSE_CITY_TAG);
      //用完就删
      Taro.removeStorageSync(cache.CACHE_CHOOSE_CITY_TAG);
      const address = urlAddress ? JSON.parse(decodeURIComponent(urlAddress)) : '';
      //如果是编辑收货地址 ，如果有经纬度就直接展示,如果之前有选择城市操作则跳过
      if (!chooseCityTag && address) {
        let city, longitude, latitude;
        if (address.latitude && address.latitude !== 'null') {
          //获取地址信息中的城市名称
          latitude = address.latitude;
          longitude = address.longitude;
          const result = await AMapService.geocoder({ latitude, longitude });
          city = result ? result.regeocode.addressComponent.city : '上海市';
          if (city.length === 0) {
            city = result.regeocode.addressComponent.province
          }
        } else {
          const result = await AMapService.getCityCenter(address.cityId);
          city = result.cityName
          latitude = result.latitude;
          longitude = result.longitude;
        }
        console.log('城市信息', city, latitude, latitude);

        if (city) {
          action.commonChange('main.cityName', city);
          this.updateMap(longitude, latitude)
          return;
        }
      }

      let chooseCity
      // 城市选择页面进来的，根据城市来获取行政中心
      if (chooseCityTag) {
        chooseCity = Taro.getStorageSync(cache.CACHE_CURRENT_CITY);
        console.log('---选择城市chooseCity--->', chooseCity);
        action.commonChange('main.cityName', chooseCity.addrName);
        const { longitude, latitude } = await AMapService.getCityCenter(chooseCity.addrName||chooseCity.addrId);
        const homeFlag = Taro.getStorageSync(cache.CACHE_HOME_FLAG)
        if (homeFlag) {
          Taro.setStorageSync(cache.CURRENT_POSITION, { longitude, latitude });
        }
        this.updateMap(longitude, latitude)
      } else {
        // 首页进来，取定位缓存
        chooseCity = Taro.getStorageSync(cache.CACHE_POSITION_CITY);
        let position = Taro.getStorageSync(cache.CURRENT_POSITION);
        if(!position || !chooseCity){
          // 没有走首页定位缓存的情况 重新定位
          const data =await AMapService.getLocation()
          const { cityName, latitude, longitude } = data;
          chooseCity = { addrName: cityName};
          position = { latitude, longitude };
        }
        console.log('---定位城市chooseCity--->', chooseCity);
        console.log('---定位城市position--->', position);
        action.commonChange('main.cityName', chooseCity.addrName);
        this.updateMap(position.longitude, position.latitude)
      }
    },
    updateMap(lng, lat) {
      action.commonChange('main.initLng', lng);
      action.commonChange('main.initLat', lat);
      action.updateGaodeMapFn({ initLng: lng, initLat: lat, });
    },
    //获取就近的poi地址
    async poiNearAddress(value) {
      await action.commonChange('main.nearAddressList', value);
    },

    //搜索的poi地址
    async getNearAddress(value) {
      await action.commonChange('main.searchAddressList', value);
    },

    //是否隐藏地图
    async showMap(value) {
      await action.commonChange('main.isShowMap', value);
    },
    //是否隐藏搜索列表
    async showSearchList(value) {
      await action.commonChange('main.searchShow', value);
    },

    //展示搜索词
    async showSearchWord(value) {
      await action.commonChange('main.searchWord', value);
    },

    async getCity(address) {
      let province = ['省', '自治区', '行政区', '市'];
      let city = ['自治州', '地区', '盟', '市', '自治县', '县'];
      let cacheCity;
      // 自治州>地区>盟>市>自治县>县
      // 普洱市西盟佤族自治县单独判断处理
      province.map((p) => {
        if (!cacheCity && (p == '市' || p == '行政区') && address?.split(p)[1]) {
          cacheCity = address?.split(p)[0] + p;
        }
        city.map((c) => {
          if (address?.split(p)[1]) {
            if (address?.split(p)[1]?.split(c)[1] || address?.split(p)[1]?.split(c)[1] === '') {
              if (!cacheCity && address?.split(p)[1]?.split(c)[0] != '普洱市西') {
                cacheCity = address?.split(p)[1]?.split(c)[0] + c;
              }
            }
          }
        });
      });

      return cacheCity;
    },

    /**
     * 更新 - 高德地图 - 操作
     * @param params
     * @returns
     */
    updateGaodeMapFn(params: {
      /** 纬度 */
      initLng: string | number;
      /** 经度 */
      initLat: string | number;
    }) {
      if (!params || !Object.keys(params).length) return;

      msg.emit('change-location', { ...params });
    },
  };
  return action;
};

//create by moon https://github.com/creasy2010/moon
