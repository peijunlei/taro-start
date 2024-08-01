import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SmallShopCustomerRelController';

/**
 *
 * 分页查询微店主关联会员
 *
 */
async function page(
  request: IPageRequestReq,
): Promise<MicroServicePageSmallShopCustomerRelVO> {
  let result = await sdk.post<MicroServicePageSmallShopCustomerRelVO>(
    '/smallshopcustomerrel/page',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  page,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SmallShopCustomerRelFrontPageRequest".
 */
export interface SmallShopCustomerRelFrontPageRequest {
  /**
   * 会员池类型 0：零购客户 1：未达标客户 2：沉睡客户 3：待激活客户
   * * ZEROBUYMEMBER: 0：零购客户
   * * UNDERSTANDARMEMBER: 1：未达标客户
   * * SLEEPMEMBER: 2：沉睡客户
   * * TOACTIVATEMEMBER: 3：待激活客户
   */
  customerRelType?: 0 | 1 | 2 | 3;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroServicePage«SmallShopCustomerRelVO»»".
 */
export interface BaseResponseMicroServicePageSmallShopCustomerRelVO {
  /**
   * 结果码
   */
  code: string;
  context?: MicroServicePageSmallShopCustomerRelVO;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MicroServicePageSmallShopCustomerRelVO {
  /**
   * 具体数据内容
   */
  content?: SmallShopCustomerRelVO[];
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
export interface SmallShopCustomerRelVO {
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 会员池类型 0：零购客户 1：未达标客户 2：沉睡客户 3：待激活客户
   * * ZEROBUYMEMBER: 0：零购客户
   * * UNDERSTANDARMEMBER: 1：未达标客户
   * * SLEEPMEMBER: 2：沉睡客户
   * * TOACTIVATEMEMBER: 3：待激活客户
   */
  customerRelType?: 0 | 1 | 2 | 3;
  /**
   * RFM会员类型 0:高价值会员 1:重点唤回会员 :持续深耕会员 3.重点挽留会员 4:潜力会员 5:新会员 6:一般维持会员 7:流失会员
   * * HIGHVALUEMEMBER: 0:高价值会员
   * * FOCUSRECALLMEMBER: 1:重点唤回会员
   * * DEEPCAREMEMBER: 2:持续深耕会员
   * * ASKTOSTAYMEMBER: 3.重点挽留会员
   * * POTENTIALMEMBER: 4:潜力会员
   * * NEWMEMBER: 5:新会员
   * * GENERALKEEPMEMBER: 6:一般维持会
   * * LOSTMEMBER: 7:流失会员
   */
  customerRfmType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * arup评分
   */
  gradeArup?: string;
  /**
   * RFM综合评分
   */
  gradeRfm?: string;
  /**
   * 会员头像
   */
  imgUrl?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«SmallShopCustomerRelVO»".
 */
export interface MicroServicePageSmallShopCustomerRelVO1 {
  /**
   * 具体数据内容
   */
  content?: SmallShopCustomerRelVO[];
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
 * via the `definition` "SmallShopCustomerRelVO".
 */
export interface SmallShopCustomerRelVO1 {
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 会员池类型 0：零购客户 1：未达标客户 2：沉睡客户 3：待激活客户
   * * ZEROBUYMEMBER: 0：零购客户
   * * UNDERSTANDARMEMBER: 1：未达标客户
   * * SLEEPMEMBER: 2：沉睡客户
   * * TOACTIVATEMEMBER: 3：待激活客户
   */
  customerRelType?: 0 | 1 | 2 | 3;
  /**
   * RFM会员类型 0:高价值会员 1:重点唤回会员 :持续深耕会员 3.重点挽留会员 4:潜力会员 5:新会员 6:一般维持会员 7:流失会员
   * * HIGHVALUEMEMBER: 0:高价值会员
   * * FOCUSRECALLMEMBER: 1:重点唤回会员
   * * DEEPCAREMEMBER: 2:持续深耕会员
   * * ASKTOSTAYMEMBER: 3.重点挽留会员
   * * POTENTIALMEMBER: 4:潜力会员
   * * NEWMEMBER: 5:新会员
   * * GENERALKEEPMEMBER: 6:一般维持会
   * * LOSTMEMBER: 7:流失会员
   */
  customerRfmType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * arup评分
   */
  gradeArup?: string;
  /**
   * RFM综合评分
   */
  gradeRfm?: string;
  /**
   * 会员头像
   */
  imgUrl?: string;
  /**
   * 微店长会员标识UUID
   */
  releCustomerId?: string;
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
 * via the `definition` "IPageRequestReq".
 */
export interface IPageRequestReq {
  /**
   * 会员池类型 0：零购客户 1：未达标客户 2：沉睡客户 3：待激活客户
   * * ZEROBUYMEMBER: 0：零购客户
   * * UNDERSTANDARMEMBER: 1：未达标客户
   * * SLEEPMEMBER: 2：沉睡客户
   * * TOACTIVATEMEMBER: 3：待激活客户
   */
  customerRelType?: 0 | 1 | 2 | 3;
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
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
