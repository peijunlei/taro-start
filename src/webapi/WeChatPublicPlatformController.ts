import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'WeChatPublicPlatformController';

/**
 *
 * 获得微信sign
 *
 */
async function getSign(request: IGetSignRequestReq): Promise<TicketResponse> {
  let result = await sdk.post<TicketResponse>(
    '/third/share/weChat/getSign',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getSign,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetSignRequest".
 */
export interface GetSignRequest {
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TicketResponse»".
 */
export interface BaseResponseTicketResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TicketResponse;
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
export interface TicketResponse {
  /**
   * appId
   */
  appId?: string;
  /**
   * 字符串
   */
  nonceStr?: string;
  /**
   * 加密信息
   */
  signature?: string;
  /**
   * 时间戳
   */
  timestamp?: string;
  /**
   * url
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TicketResponse".
 */
export interface TicketResponse1 {
  /**
   * appId
   */
  appId?: string;
  /**
   * 字符串
   */
  nonceStr?: string;
  /**
   * 加密信息
   */
  signature?: string;
  /**
   * 时间戳
   */
  timestamp?: string;
  /**
   * url
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetSignRequestReq".
 */
export interface IGetSignRequestReq {
  url?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
