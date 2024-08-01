import * as sdk from './fetch';

const controllerName = 'WechatSetController';

/**
 *
 * 获取微信设置开关
 *
 */
async function status(terminalType: IStatusTerminalTypeReq): Promise<StatusgetRes> {
  let result = await sdk.get<StatusgetRes>(
    '/third/wechat/status/{terminalType}'.replace('{terminalType}', terminalType + ''),

    {},
  );
  return result.context;
}

export default {
  status,
};

/**
 * 内容
 */
export type StatusgetRes = '0' | '1';
/**
 * 类型终端
 *
 */
export type IStatusTerminalTypeReq = string;
/**
 * 内容
 *
 */
export type StatusgetRes1 = '0' | '1';

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  context?: StatusgetRes;
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

//create by moon https://github.com/creasy2010/moon
