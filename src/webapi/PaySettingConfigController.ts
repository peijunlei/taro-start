import * as sdk from './fetch';

const controllerName = 'PaySettingConfigController';

/**
 *
 * 查询线下支付是否开启
 *
 */
async function getOfflinePaySetting(): Promise<any> {
  let result = await sdk.get<any>(
    '/sysconfig/paysetting/get-offline-pay-setting',

    {},
  );
  return result.context;
}

export default {
  getOfflinePaySetting,
};
