import * as sdk from './fetch';

import isMock from './mock-util';

/**
 *
 * 新增拼团分享记录
 *
 */
async function addShare(addReq: IAddShareAddReqReq): Promise<GrouponShareRecordAddResponse> {
  let result = await sdk.post<GrouponShareRecordAddResponse>(
    '/groupon/share/record/add/share',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 新增拼团访问记录
 *
 */
async function addVisit(addReq: IAddVisitAddReqReq): Promise<GrouponShareRecordAddResponse> {
  let result = await sdk.post<GrouponShareRecordAddResponse>(
    '/groupon/share/record/add/visit',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除拼团分享访问记录
 *
 */
async function deleteByIdList_(delByIdListReq: IDeleteByIdListDelByIdListReqReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('GrouponShareRecordController', 'deleteByIdList_')) {
      return Promise.resolve(require('./mock/GrouponShareRecordController.json').unknown || {});
    }
  }

  let result = await sdk.deleteF<unknown>(
    '/groupon/share/record/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出拼团分享访问记录列表
 *
 */
async function exportData(encrypted: IExportDataEncryptedReq): Promise<unknown> {
  let result = await sdk.get(
    '/groupon/share/record/export/{encrypted}'.replace('{encrypted}', encrypted + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询拼团分享访问记录
 *
 */
async function getList(listReq: IGetListListReqReq): Promise<GrouponShareRecordListResponse> {
  if (__DEV__) {
    if (isMock('GrouponShareRecordController', 'getList')) {
      return Promise.resolve(require('./mock/GrouponShareRecordController.json').GrouponShareRecordListResponse || {});
    }
  }

  let result = await sdk.post<GrouponShareRecordListResponse>(
    '/groupon/share/record/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改拼团分享访问记录
 *
 */
async function modify(modifyReq: IModifyModifyReqReq): Promise<GrouponShareRecordModifyResponse> {
  if (__DEV__) {
    if (isMock('GrouponShareRecordController', 'modify')) {
      return Promise.resolve(
        require('./mock/GrouponShareRecordController.json').GrouponShareRecordModifyResponse || {},
      );
    }
  }

  let result = await sdk.put<GrouponShareRecordModifyResponse>(
    '/groupon/share/record/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询拼团分享访问记录
 *
 */
async function getPage(pageReq: IGetPagePageReqReq): Promise<GrouponShareRecordPageResponse> {
  if (__DEV__) {
    if (isMock('GrouponShareRecordController', 'getPage')) {
      return Promise.resolve(require('./mock/GrouponShareRecordController.json').GrouponShareRecordPageResponse || {});
    }
  }

  let result = await sdk.post<GrouponShareRecordPageResponse>(
    '/groupon/share/record/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询拼团分享访问记录
 *
 */
async function getById(id: IGetByIdIdReq): Promise<GrouponShareRecordByIdResponse> {
  if (__DEV__) {
    if (isMock('GrouponShareRecordController', 'getById')) {
      return Promise.resolve(require('./mock/GrouponShareRecordController.json').GrouponShareRecordByIdResponse || {});
    }
  }

  let result = await sdk.get<GrouponShareRecordByIdResponse>(
    '/groupon/share/record/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除拼团分享访问记录
 *
 */
async function deleteById_(id: IDeleteByIdIdReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('GrouponShareRecordController', 'deleteById_')) {
      return Promise.resolve(require('./mock/GrouponShareRecordController.json').unknown || {});
    }
  }

  let result = await sdk.deleteF<unknown>(
    '/groupon/share/record/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  addShare,

  addVisit,

  deleteByIdList_,

  exportData,

  getList,

  modify,

  getPage,

  getById,

  deleteById_,
};

/**
 * encrypted
 *
 */
export type IExportDataEncryptedReq = string;
/**
 * id
 *
 */
export type IGetByIdIdReq = number;
/**
 * id
 *
 */
export type IDeleteByIdIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordAddRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseGrouponShareRecordAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponShareRecordAddResponse;
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
export interface GrouponShareRecordAddResponse {
  grouponShareRecordVO?: GrouponShareRecordVO;
  [k: string]: any;
}
/**
 * 已新增的拼团分享访问记录信息
 */
export interface GrouponShareRecordVO {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordAddResponse1 {
  grouponShareRecordVO?: GrouponShareRecordVO;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordVO1 {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordDelByIdListRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 批量删除-idList
   */
  idList?: number[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponse {
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
 */
export interface GrouponShareRecordListRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 批量查询-idList
   */
  idList?: number[];
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseGrouponShareRecordListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponShareRecordListResponse;
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
export interface GrouponShareRecordListResponse {
  /**
   * 拼团分享访问记录列表结果
   */
  grouponShareRecordVOList?: GrouponShareRecordVO2[];
  [k: string]: any;
}
export interface GrouponShareRecordVO2 {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordListResponse1 {
  /**
   * 拼团分享访问记录列表结果
   */
  grouponShareRecordVOList?: GrouponShareRecordVO2[];
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordModifyRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface BaseResponseGrouponShareRecordModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponShareRecordModifyResponse;
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
export interface GrouponShareRecordModifyResponse {
  grouponShareRecordVO?: GrouponShareRecordVO3;
  [k: string]: any;
}
/**
 * 已修改的拼团分享访问记录信息
 */
export interface GrouponShareRecordVO3 {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordModifyResponse1 {
  grouponShareRecordVO?: GrouponShareRecordVO3;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordPageRequest {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 批量查询-idList
   */
  idList?: number[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface BaseResponseGrouponShareRecordPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponShareRecordPageResponse;
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
export interface GrouponShareRecordPageResponse {
  grouponShareRecordVOPage?: MicroServicePageGrouponShareRecordVO;
  [k: string]: any;
}
/**
 * 拼团分享访问记录分页结果
 */
export interface MicroServicePageGrouponShareRecordVO {
  /**
   * 具体数据内容
   */
  content?: GrouponShareRecordVO4[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface GrouponShareRecordVO4 {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordPageResponse1 {
  grouponShareRecordVOPage?: MicroServicePageGrouponShareRecordVO;
  [k: string]: any;
}
/**
 */
export interface MicroServicePageGrouponShareRecordVO1 {
  /**
   * 具体数据内容
   */
  content?: GrouponShareRecordVO4[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 */
export interface BaseResponseGrouponShareRecordByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponShareRecordByIdResponse;
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
export interface GrouponShareRecordByIdResponse {
  grouponShareRecordVO?: GrouponShareRecordVO5;
  [k: string]: any;
}
/**
 * 拼团分享访问记录信息
 */
export interface GrouponShareRecordVO5 {
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  [k: string]: any;
}
/**
 */
export interface GrouponShareRecordByIdResponse1 {
  grouponShareRecordVO?: GrouponShareRecordVO5;
  [k: string]: any;
}
/**
 */
export interface IAddShareAddReqReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IAddVisitAddReqReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IDeleteByIdListDelByIdListReqReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 批量删除-idList
   */
  idList?: number[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IGetListListReqReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 批量查询-idList
   */
  idList?: number[];
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IModifyModifyReqReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 */
export interface IGetPagePageReqReq {
  /**
   * 店铺ID
   */
  baseStoreId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * SPU id
   */
  goodsId?: string;
  /**
   * SKU id
   */
  goodsInfoId?: string;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * id
   */
  id?: number;
  /**
   * 批量查询-idList
   */
  idList?: number[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  /**
   * 分享渠道：0微信，1朋友圈，2QQ，3QQ空间，4微博，5复制链接，6保存图片
   * * WECHAT: 微信
   * * MOMENTS: 朋友圈
   * * QQ: QQ
   * * QZONE: QQ空间
   * * WEIBO: 微博
   * * COPYURL: 复制链接
   * * SAVEPICTURE: 保存图片
   */
  shareChannel?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 分享人，通过分享链接访问的时候
   */
  shareCustomerId?: string;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 终端：1 H5，2pc，3APP，4小程序
   * * SUPPLIER: 代客下单
   * * H5: H5
   * * PC: PC
   * * APP: APP
   * * MINIPROGRAM: 小程序
   */
  terminalSource?: 0 | 1 | 2 | 3 | 4;
  /**
   * 0分享拼团，1通过分享链接访问拼团
   */
  type?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
