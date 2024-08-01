import Taro from '@tarojs/taro';
export const storage = {
  getStorageSync: Taro.getStorageSync,
  setStorageSync: Taro.setStorageSync,
  removeStorageSync: Taro.removeStorageSync,
  clearStorage: Taro.clearStorage,
};
