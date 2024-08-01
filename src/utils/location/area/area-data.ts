import Taro from '@tarojs/taro';
import {$$alert} from '@/utils/common-functions';
import {findCityCode} from './area';
let _AreaMap = {
  provinces: null,
  areas: null,
  cities: null,
};

export function loadData(provinceCode, cityCode, areaCode) {
  // if (!(_AreaMap.provinces && _AreaMap.areas && _AreaMap.cities)) {
  const {provinces, areas, cities} = Taro.getStorageSync('mini::addressInfo');
  _AreaMap.provinces = provinces;
  _AreaMap.cities = cities[provinceCode];
  _AreaMap.areas = areas[cityCode];
  // }
}

export async function untilDataLoaded(): Promise<boolean> {
  await Promise.all([getProvincesAsync(), getAreasAsync(), getCitiesAsync()]);
  return true;
}

export function getProvinces() {
  return getKey('provinces');
}

export function getAreas() {
  return getKey('areas');
}

export function getCities() {
  return getKey('cities');
}

export async function getProvincesAsync() {
  return getKeyAsyc('provinces');
}

export async function getAreasAsync() {
  return getKeyAsyc('areas');
}

export async function getCitiesAsync() {
  return getKeyAsyc('cities');
}

function getKey(key: 'provinces' | 'areas' | 'cities') {
  if (_AreaMap[key]) {
    return _AreaMap[key];
  } else {
    throw new Error('请等待地址数据加载完成');
  }
}

async function getKeyAsyc(key: 'provinces' | 'areas' | 'cities') {
  while (!_AreaMap[key]) {
    await _sleep(200);
  }
  return _AreaMap[key];
}

function _sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
