
import Taro from '@tarojs/taro'
import config from '@/service/config';
const amapHost = 'https://restapi.amap.com/v3'
interface CityInfo {
  cityCode: string;
  cityName: string;
}

const defaultLocation = { latitude: 31.230399, longitude: 121.473701 };
const defaultCityInfo = { cityName: '上海市', cityCode: '310100' }
const defaultData = { ...defaultCityInfo, ...defaultLocation }
/**
 * 根据经纬度获取城市
 * @param params 经纬度
 */
export const geocoder = (params: ILocation) => {
  const { longitude, latitude } = params
  return new Promise<any>((resolve, reject) => {
    Taro.request({
      url: amapHost + '/geocode/regeo',
      data: {
        location: `${longitude},${latitude}`,
        key: config.amapWebKey
      },
      success: (res) => {
        const data = res.data
        if (data && data.status === '1') {
          resolve(data)
        } else {
          resolve(null)
        }
      },
      fail: (res) => {
        resolve(null)
      }
    })
  })
}

/**
 *  获取行政区域中心点
 * @param cityName 城市名
 */
export const getCityCenter = (cityName: string) => {
  return new Promise<ILocation & { cityName: string }>((resolve, reject) => {
    Taro.request({
      url: amapHost + '/config/district',
      data: {
        keywords: cityName,
        subdistrict: 0,
        key: config.amapWebKey
      },
      success: (res) => {
        const data = res.data
        if (data && data.status === '1') {
          const lng = data.districts[0].center.split(',')[0] as number
          const lat = data.districts[0].center.split(',')[1] as number
          const cityName = data.districts[0].name
          resolve({ longitude: lng, latitude: lat, cityName: cityName.replace('城区', '市') })
        } else {
          resolve({ longitude: 0, latitude: 0, cityName: '上海市' })
        }
      },
      fail: (res) => {
        resolve({ longitude: 0, latitude: 0, cityName: '上海市' })
      }
    })
  })
}

/**
 * 获取当前位置
 */
export const getLocation = () => {
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
          const result = await geocoder({ longitude: res.longitude, latitude: res.latitude });
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