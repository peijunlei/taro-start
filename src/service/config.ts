/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/6/25
 **/

export interface IConfig {
  env: string;
  host: string;
  // 魔方配置
  magicHost: string;
  magicPage: string;
  renderHost: string;
  ossHost: string;
  pvUvHost: string;
  mobileAmapKey: string;
  wechatAmapKey: string;
  amapWebKey: string;
  securityJsCode: string;
  aMapServiceHost: string;
  wechatDsn: string;
  mobileDsn: string;
  hostEnv: string;
  livePlayerId: string;
  gh_Id: string;
  envVersion: string;
}
// @ts-ignore
let config: IConfig;

if (!__DEV__ && __TARO_ENV === 'h5') {
  config = (window as any).wmConfig;
} else {
  config = __Config__;
}

const globalData = {};
export function setGlobalData(key, val) {
  globalData[key] = val;
}
export function getGlobalData(key) {
  return globalData[key];
}

export default config;
