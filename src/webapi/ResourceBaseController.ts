import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ResourceBaseController';

/**
 *
 * 上传素材
 *
 */
async function uploadFile(
  cateId: IUploadFileCateIdReq,
  resourceType: IUploadFileResourceTypeReq,
  uploadFile: IUploadFileUploadFileReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/common/uploadResource',

    {
      cateId,

      resourceType,

      ...uploadFile,
    },
  );
  return result.context;
}

export default {
  uploadFile,
};

/**
 * 素材分类Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUploadFileCateIdReq".
 */
export type IUploadFileCateIdReq = number;
/**
 * 素材类型
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUploadFileResourceTypeReq".
 */
export type IUploadFileResourceTypeReq = '0' | '1';

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
 * 上传素材
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
