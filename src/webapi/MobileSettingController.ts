import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MobileSettingController';

/**
 *
 * 查询关于我们
 *
 */
async function getAboutUs(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/mobile-setting/get-about-us',

    {},
  );
  return result.context;
}

/**
 *
 * 查询app分享配置
 *
 */
async function getAppShareSetting(): Promise<AppShareSettingGetResponse> {
  let result = await sdk.get<AppShareSettingGetResponse>(
    '/mobile-setting/get-app-share-setting',

    {},
  );
  return result.context;
}

/**
 *
 * 查询APP升级版本配置信息
 *
 */
async function getAppUpgrade(): Promise<AppUpgradeGetResponse> {
  let result = await sdk.get<AppUpgradeGetResponse>(
    '/mobile-setting/get-app-upgrade-setting',

    {},
  );
  return result.context;
}

export default {
  getAboutUs,

  getAppShareSetting,

  getAppUpgrade,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«string»".
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: string;
  /**
   * 错误内容
   */
  errorData?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«AppShareSettingGetResponse»".
 */
export interface BaseResponseAppShareSettingGetResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AppShareSettingGetResponse;
  /**
   * 错误内容
   */
  errorData?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AppShareSettingGetResponse {
  /**
   * android下载包地址
   */
  androidUrl?: string;
  /**
   * app分享描述
   */
  desc?: string;
  /**
   * app下载二维码
   */
  downloadImg?: string;
  /**
   * app下载页面链接
   */
  downloadUrl?: string;
  /**
   * app分享开关
   */
  enabled?: boolean;
  /**
   * app图标
   */
  icon?: string;
  /**
   * ios下载包地址
   */
  iosUrl?: string;
  /**
   * app分享页背景图
   */
  shareImg?: string;
  /**
   * app分享标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppShareSettingGetResponse".
 */
export interface AppShareSettingGetResponse1 {
  /**
   * android下载包地址
   */
  androidUrl?: string;
  /**
   * app分享描述
   */
  desc?: string;
  /**
   * app下载二维码
   */
  downloadImg?: string;
  /**
   * app下载页面链接
   */
  downloadUrl?: string;
  /**
   * app分享开关
   */
  enabled?: boolean;
  /**
   * app图标
   */
  icon?: string;
  /**
   * ios下载包地址
   */
  iosUrl?: string;
  /**
   * app分享页背景图
   */
  shareImg?: string;
  /**
   * app分享标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«AppUpgradeGetResponse»".
 */
export interface BaseResponseAppUpgradeGetResponse {
  /**
   * 结果码
   */
  code: string;
  context?: AppUpgradeGetResponse;
  /**
   * 错误内容
   */
  errorData?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface AppUpgradeGetResponse {
  /**
   * Android下载地址
   */
  androidAddress?: string;
  /**
   * App下载地址
   */
  appAddress?: string;
  /**
   * APP强制更新开关-0 关，不强制更新 1 开，强制更新
   * * NO: 否
   * * YES: 是
   */
  forceUpdateFlag?: number;
  /**
   * 最新版本号
   */
  latestVersion?: string;
  /**
   * 更新描述
   */
  upgradeDesc?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppUpgradeGetResponse".
 */
export interface AppUpgradeGetResponse1 {
  /**
   * Android下载地址
   */
  androidAddress?: string;
  /**
   * App下载地址
   */
  appAddress?: string;
  /**
   * APP强制更新开关-0 关，不强制更新 1 开，强制更新
   * * NO: 否
   * * YES: 是
   */
  forceUpdateFlag?: number;
  /**
   * 最新版本号
   */
  latestVersion?: string;
  /**
   * 更新描述
   */
  upgradeDesc?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
