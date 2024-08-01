import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import { getAddressListByLatAndLng, getAddressList } from 'api/MapController';
import { cache } from 'config';
import Taro from '@tarojs/taro';
import config from '@/service/config';
import { AMapService } from 'wmkit';
import { IAllReducerProps } from '../type';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    // 查询缓存中的地址信息
    async query(address, from?: string) {
      Taro.setStorageSync(cache.CACHE_HOME_FLAG, from === 'home')
      //如果是编辑收货地址 ，如果有经纬度就直接展示
      const chooseCityTag = Taro.getStorageSync(cache.CACHE_CHOOSE_CITY_TAG);
      //用完就删
      Taro.removeStorageSync(cache.CACHE_CHOOSE_CITY_TAG);
      console.log('---query address--->', address);
      if (!chooseCityTag && address) {
        let city, longitude, latitude;
        if (address.latitude && address.latitude !== 'null') {
          //获取地址信息中的城市名称
          latitude = address.latitude;
          longitude = address.longitude
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
          action.commonChange('main.initLng', longitude);
          action.commonChange('main.initLat', latitude);
          return;
        }
      }

      let chooseCity
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
        action.commonChange('main.cityName', chooseCity.addrName);
        console.log('---定位城市chooseCity--->', chooseCity);

        const position = Taro.getStorageSync(cache.CURRENT_POSITION);
        this.updateMap(position.longitude, position.latitude)
      }
    },
    updateMap(lng, lat) {
      const center = lng + ',' + lat
      action.commonChange('main.initLng', lng);
      action.commonChange('main.initLat', lat);
      this.poiNearAddress(center);
    },
    //获取就近的poi地址,地图下方的poi
    async poiNearAddress(location) {
      const addList = await getAddressListByLatAndLng({
        location: location,
        mapType: '0',
      });
      await action.commonChange('main.nearAddress', addList.pois);
    },

    //接口得到poi地址
    async getNearAddress(value) {
      const cityName = getData().main.cityName;
      if (value == '' || value == undefined || value == null) {
        await action.commonChange('main.selectNearAddress', []);
      } else {
        const addList = await getAddressList({
          city: cityName || '',
          keywords: value,
          mapType: '0',
        });
        await action.commonChange('main.selectNearAddress', addList?.pois);
      }
    },
    //是否隐藏地图
    async showMap(value) {
      await action.commonChange('main.isShowMap', value);
      await action.commonChange('main.searchShow', !value);
    },
    //展示搜索词
    async showSearchWord(value) {
      await action.commonChange('main.searchWord', value);
    },
    async setCurrentCity() {
      // 页面离开，判断首页是否有缓存地址，如果有的话，则CACHE_CURRENT_CITY缓存城市不更新，如果没有，需要更新
      let userLocation = Taro.getStorageSync(cache.LOCATE_INFO);
      let current_city = userLocation?.addressInfo || '';
      if (current_city.length !== 0) {
        let province = ['省', '自治区', '行政区', '市'];
        let city = ['自治州', '地区', '盟', '市', '自治县', '县'];
        let cacheCity;
        let address = userLocation?.addressInfo;
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

        if (cacheCity) {
          Taro.setStorageSync(cache.CACHE_CURRENT_CITY, { addrName: cacheCity });
        }
      }
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

    async getCityCenter(cityName) {
      console.log('---cityName--->', cityName);
      let url = `https://restapi.amap.com/v3/config/district?keywords=${cityName}&subdistrict=0&key=${config.amapWebKey}`;
      await Taro.request({
        method: 'GET',
        // mode: 'no-cors',
        url: url,
        success: async (res) => {
          let data = res.data;
          console.log('---res--->', data);
          if (data.status == 1) {

            if (data.districts[0] && data.districts[0].center) {
              let center = data.districts[0].center;
              const lng = center.split(',')[0]
              const lat = center.split(',')[1]
              if (center.indexOf(',') > -1) {
                action.commonChange('main.initLng', lng);
                action.commonChange('main.initLat', lat);
                this.poiNearAddress(center);
              }
            }
          }
        },
      });
    },
  };
  return action;
};

function getData():IAllReducerProps {
  return {
    main: getReducerData('SelectAddressMapMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
