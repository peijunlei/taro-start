import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PopupAdministrationQueryController';

/**
 *
 * 弹窗管理&amp;页面管理列表查询
 *
 */
async function pageManagementAndPopupAdministrationList(
  request: IPageManagementAndPopupAdministrationListRequestReq,
): Promise<PageManagementResponse> {
  let result = await sdk.post<PageManagementResponse>(
    '/popup_administration/page_management_popup_administration',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  pageManagementAndPopupAdministrationList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageManagementRequest".
 */
export interface PageManagementRequest {
  /**
   * 应用页面
   */
  applicationPageName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PageManagementResponse»".
 */
export interface BaseResponsePageManagementResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PageManagementResponse;
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
export interface PageManagementResponse {
  /**
   * 应用页名称
   */
  pageManagementName?: string;
  /**
   * 弹窗管理分页列表
   */
  popupAdministrationVOS?: PopupAdministrationVO[];
  [k: string]: any;
}
export interface PopupAdministrationVO {
  /**
   * 应用页面
   */
  applicationPageName?: string;
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 是否暂停（1：暂停，0：正常）
   * * NO: 否
   * * YES: 是
   */
  isPause?: 0 | 1;
  /**
   * 跳转页
   */
  jumpPage?: string;
  /**
   * 投放频次
   */
  launchFrequency?: string;
  /**
   * 主键id
   */
  popupId?: number;
  /**
   * 弹窗名称
   */
  popupName?: string;
  /**
   * 查询类型
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   * * S_NS: 5：进行中&未开始
   */
  popupStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 弹窗url
   */
  popupUrl?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageManagementResponse".
 */
export interface PageManagementResponse1 {
  /**
   * 应用页名称
   */
  pageManagementName?: string;
  /**
   * 弹窗管理分页列表
   */
  popupAdministrationVOS?: PopupAdministrationVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PopupAdministrationVO".
 */
export interface PopupAdministrationVO1 {
  /**
   * 应用页面
   */
  applicationPageName?: string;
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 是否暂停（1：暂停，0：正常）
   * * NO: 否
   * * YES: 是
   */
  isPause?: 0 | 1;
  /**
   * 跳转页
   */
  jumpPage?: string;
  /**
   * 投放频次
   */
  launchFrequency?: string;
  /**
   * 主键id
   */
  popupId?: number;
  /**
   * 弹窗名称
   */
  popupName?: string;
  /**
   * 查询类型
   * * ALL: 0：全部
   * * STARTED: 1：进行中
   * * PAUSED: 2：暂停中
   * * NOT_START: 3：未开始
   * * ENDED: 4：已结束
   * * S_NS: 5：进行中&未开始
   */
  popupStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 弹窗url
   */
  popupUrl?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageManagementAndPopupAdministrationListRequestReq".
 */
export interface IPageManagementAndPopupAdministrationListRequestReq {
  /**
   * 应用页面
   */
  applicationPageName?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
