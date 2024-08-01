import Taro, {getStorageSync} from '@tarojs/taro';
import {$$alert} from '@/utils/common-functions';
import api from 'api';

export const addressInit = async () => {
  const address = getStorageSync('mini::addressInfo');
  if (!address) {
    const {provinces, cities, areas} = await api.platformAddressController.initAddressJson();
    Taro.setStorageSync('mini::addressInfo', {
      provinces,
      cities,
      areas,
    });
  }
};

export const getAddressInfo = async (provinceId, cityId, areaId) => {
  await addressInit();
  const {provinces, cities, areas} = Taro.getStorageSync('mini::addressInfo');

  let provName = '',
    cityName = '',
    areaName = '';
  if (provinceId) {
    provinces.map((prov) => {
      if (prov.id === provinceId + '') {
        provName = prov.name;
      }
    });
  }
  if (provinceId && cityId) {
    let parent = cities[provinceId];
    parent?.map((city) => {
      if (city.id === cityId + '') {
        cityName = city.name;
      }
    });
  }
  if (cityId && areaId) {
    let parent = areas[cityId];
    parent?.map((area) => {
      if (area.id === areaId + '') {
        areaName = area.name;
      }
    });
  }
  return [provName, cityName, areaName].join('');
};
