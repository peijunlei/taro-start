import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ImageBaseController';

/**
 *
 * 上传图片
 *
 */
async function uploadFile(cateId: IUploadFileCateIdReq, uploadFile: IUploadFileUploadFileReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/common/uploadImage',

    {
      cateId,

      ...uploadFile,
    },
  );
  return result.context;
}

export default {
  uploadFile,
};

/**
 * 图片分类Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUploadFileCateIdReq".
 */
export type IUploadFileCateIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«object»".
 */
export interface BaseResponseObject {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: {
    [k: string]: any;
  };
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
 * 上传图片
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUploadFileUploadFileReq".
 */
export interface IUploadFileUploadFileReq {
  [k: string]: any;
}
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export interface Undefined {
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
