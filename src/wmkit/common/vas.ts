import Taro from '@tarojs/taro';
import {cache, VASConst} from 'config';
import {immutable} from 'wmkit';
import api from 'api';
/**
 * iep增值服务鉴权
 */
export const checkIepAuth = async () => {
  return await fetchVASStatus(VASConst.IEP);
};

/**
 * 智能推荐增值服务鉴权
 */
export const checkRecommendAuth = async () => {
  return await fetchVASStatus(VASConst.RECOMMEND);
};

/**
 * 查询iep配置信息
 * 例:
 * {
 *    import { VAS } from 'wmkit';
 *    import { VASConst } from 'config';
 *    const res = await VAS.fetchIepInfo();
 * }
 */
export async function fetchIepInfo() {
  const isIepAuth = await checkIepAuth();
  let result = {isIepAuth: isIepAuth, iepInfo: {enterprisePriceName: '企业价'}};
  if (isIepAuth) {
    const res = (await api.iepSettingQueryController.findCacheForCustomer()) as any;
    // if (res.code === config.SUCCESS_CODE) {
    const info = res.iepSettingVO;
    result.iepInfo = info;
    // }
  }
  return result;
}

/**
 * 查询iep配置信息
 * 例:
 * {
 *    import { VAS } from 'wmkit';
 *    import { VASConst } from 'config';
 *    const res = await VAS.fetchIepInfo();
 * }
 */
export async function fetchIepInfoForGoodsDetail(isIepAuth) {
  let result = {isIepAuth: isIepAuth, iepInfo: {enterprisePriceName: '企业价'}};
  if (isIepAuth) {
    const res = (await api.iepSettingQueryController.findCacheForCustomer()) as any;
    // if (res.code === config.SUCCESS_CODE) {
    const info = res.iepSettingVO;
    result.iepInfo = info;
    // }
  }
  return result;
}

/**
 * 查询所有增值服务
 */
export async function fetchAllVAS() {
  let data = Taro.getStorageSync(cache.VALUE_ADDED_SERVICES);
  if (data) {
    const services = JSON.parse(data);
    return services;
  } else {
    const res = (await api.vASSettingController.queryAllVAS()) as any;
    // if (res.code === config.SUCCESS_CODE) {
    const services = res.services;
    await Taro.setStorageSync(cache.VALUE_ADDED_SERVICES, JSON.stringify(services));
    return services;
    // } else {
    //   return null;
    // }
  }
}

/**
 * 查询指定服务的状态
 * 例:
 * {
 *    import { VAS } from 'wmkit';
 *    import { VASConst } from 'config';
 *    const res = await VAS.fetchVASStatus(VASConst.IEP);
 * }
 */
export async function fetchVASStatus(serviceName) {
  let services = await fetchAllVAS();
  if (services) {
    const service = immutable.fromJS(services).find((f) => f.get('serviceName') == serviceName);
    if (service) {
      return service.get('serviceStatus');
    } else {
      return false;
    }
  } else {
    return false;
  }
}
