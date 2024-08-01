import api from 'api';
// 接口响应成功code
const SUCCESS_CODE = 'K-000000';

/**
 * 数据管理中心
 */
class Store {
  /**
   * 获取 - 城市列表 - 数据
   */
  _platformaddressCityListGroup = async (callBack) => {
    try {
      const res = await api.systemController.platformaddressCityListGroup();
      if (res?.code === SUCCESS_CODE) {
        callBack({
          // 城市列表 - 数据
          cityMap: res?.context?.platformAddressVOGroup || {},
          // 重置城市列表滚动距离
          scrollTop: 0,
        });
      }

      // 开启loading
      setTimeout(() => {
        callBack({
          isShowLoading: false,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new Store();
