import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerLevelBaseController';

/**
 *
 * 根据客户ID查询客户等级权益相关信息
 *
 */
async function getCustomerLevelRightsInfos(): Promise<CustomerLevelWithRightsByCustomerIdResponse> {
  let result = await sdk.get<CustomerLevelWithRightsByCustomerIdResponse>(
    '/customer/level/rights',

    {},
  );
  return result.context;
}

export default {
  getCustomerLevelRightsInfos,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerLevelWithRightsByCustomerIdResponse»".
 */
export interface BaseResponseCustomerLevelWithRightsByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerLevelWithRightsByCustomerIdResponse;
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
export interface CustomerLevelWithRightsByCustomerIdResponse {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  customerGrowthValue?: number;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 等级权益
   */
  customerLevelRightsVOS?: CustomerLevelRightsVO[];
  customerName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 所需成长值
   */
  growthValue?: number;
  headImg?: string;
  /**
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
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
export interface CustomerLevelRightsVO {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  sort?: number;
  status?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerLevelWithRightsByCustomerIdResponse".
 */
export interface CustomerLevelWithRightsByCustomerIdResponse1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  customerGrowthValue?: number;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 等级权益
   */
  customerLevelRightsVOS?: CustomerLevelRightsVO[];
  customerName?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 所需成长值
   */
  growthValue?: number;
  headImg?: string;
  /**
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
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
 * via the `definition` "CustomerLevelRightsVO".
 */
export interface CustomerLevelRightsVO1 {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  sort?: number;
  status?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
