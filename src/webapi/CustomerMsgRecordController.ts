import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerMsgRecordController';

/**
 *
 * 分页查询会员我的消息记录
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<CustomerMsgRecordPageResponse> {
  let result = await sdk.post<CustomerMsgRecordPageResponse>(
    '/customermsgrecord/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

export default {
  getPage,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerMsgRecordPageRequest".
 */
export interface CustomerMsgRecordPageRequest {
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
   * CMS我的消息记录
   */
  customerMsgRecordId?: string;
  /**
   * 批量查询-CMS我的消息记录List
   */
  customerMsgRecordIdList?: string[];
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 消息子类型（0内容 1评论 2回复 3关注）
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   * * FOLLOW: 3：关注
   */
  msgSubType?: 0 | 1 | 2 | 3;
  /**
   * 消息类型（0点赞 1关注 2回复）
   * * STAR: 0：点赞
   * * FOLLOW: 1：关注
   * * REPLY: 2：回复
   * * CANCEL_STAR: 3：取消点赞
   * * CANCEL_FOLLOW: 4：取消关注
   */
  msgType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 操作人会员Id-XX（ref）赞了你
   */
  refCustomerId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
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
   * 我的内容
   */
  sourceContent?: string;
  /**
   * 回复内容
   */
  targetContent?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerMsgRecordPageResponse»".
 */
export interface BaseResponseCustomerMsgRecordPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerMsgRecordPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerMsgRecordPageResponse {
  customerMsgRecordVOPage?: MicroServicePageCustomerMsgRecordVO;
  [k: string]: any;
}
/**
 * 会员我的消息记录分页结果
 */
export interface MicroServicePageCustomerMsgRecordVO {
  /**
   * 具体数据内容
   */
  content?: CustomerMsgRecordVO[];
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
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface CustomerMsgRecordVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 转换后的创建时间
   */
  createTimeStr?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * CMS我的消息记录
   */
  customerMsgRecordId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 消息子类型（0内容 1评论 2回复 3关注）
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   * * FOLLOW: 3：关注
   */
  msgSubType?: 0 | 1 | 2 | 3;
  /**
   * 消息类型（0点赞 1关注 2回复）
   * * STAR: 0：点赞
   * * FOLLOW: 1：关注
   * * REPLY: 2：回复
   * * CANCEL_STAR: 3：取消点赞
   * * CANCEL_FOLLOW: 4：取消关注
   */
  msgType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 操作人头像 会员Id-XX（ref）赞了你
   */
  refCustomerHeadImg?: string;
  /**
   * 操作人会员Id-XX（ref）赞了你
   */
  refCustomerId?: string;
  /**
   * 操作人姓名 会员Id-XX（ref）赞了你
   */
  refCustomerName?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 我的内容
   */
  sourceContent?: string;
  /**
   * 回复内容
   */
  targetContent?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerMsgRecordPageResponse".
 */
export interface CustomerMsgRecordPageResponse1 {
  customerMsgRecordVOPage?: MicroServicePageCustomerMsgRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«CustomerMsgRecordVO»".
 */
export interface MicroServicePageCustomerMsgRecordVO1 {
  /**
   * 具体数据内容
   */
  content?: CustomerMsgRecordVO[];
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
  sort?: Sort;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerMsgRecordVO".
 */
export interface CustomerMsgRecordVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 转换后的创建时间
   */
  createTimeStr?: string;
  /**
   * 会员Id
   */
  customerId?: string;
  /**
   * CMS我的消息记录
   */
  customerMsgRecordId?: string;
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 消息子类型（0内容 1评论 2回复 3关注）
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   * * FOLLOW: 3：关注
   */
  msgSubType?: 0 | 1 | 2 | 3;
  /**
   * 消息类型（0点赞 1关注 2回复）
   * * STAR: 0：点赞
   * * FOLLOW: 1：关注
   * * REPLY: 2：回复
   * * CANCEL_STAR: 3：取消点赞
   * * CANCEL_FOLLOW: 4：取消关注
   */
  msgType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 操作人头像 会员Id-XX（ref）赞了你
   */
  refCustomerHeadImg?: string;
  /**
   * 操作人会员Id-XX（ref）赞了你
   */
  refCustomerId?: string;
  /**
   * 操作人姓名 会员Id-XX（ref）赞了你
   */
  refCustomerName?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
  /**
   * 我的内容
   */
  sourceContent?: string;
  /**
   * 回复内容
   */
  targetContent?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
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
   * CMS我的消息记录
   */
  customerMsgRecordId?: string;
  /**
   * 批量查询-CMS我的消息记录List
   */
  customerMsgRecordIdList?: string[];
  /**
   * 删除标识，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 消息子类型（0内容 1评论 2回复 3关注）
   * * CONTENT: 0：内容
   * * COMMENT: 1：评论
   * * REPLY: 2：回复
   * * FOLLOW: 3：关注
   */
  msgSubType?: 0 | 1 | 2 | 3;
  /**
   * 消息类型（0点赞 1关注 2回复）
   * * STAR: 0：点赞
   * * FOLLOW: 1：关注
   * * REPLY: 2：回复
   * * CANCEL_STAR: 3：取消点赞
   * * CANCEL_FOLLOW: 4：取消关注
   */
  msgType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 筛选条件时间标识
   */
  originTag?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  /**
   * 操作人会员Id-XX（ref）赞了你
   */
  refCustomerId?: string;
  /**
   * 关联业务主键（内容id、评论id、回复id）
   */
  refId?: string;
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
   * 我的内容
   */
  sourceContent?: string;
  /**
   * 回复内容
   */
  targetContent?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
