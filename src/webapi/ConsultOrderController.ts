import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ConsultOrderController';

/**
 *
 * 新增咨询订单
 *
 */
async function add(addReq: IAddAddReqReq): Promise<ConsultOrderAddResponse> {
  let result = await sdk.post<ConsultOrderAddResponse>(
    '/consultorder/add',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id取消咨询订单
 *
 */
async function cancelConsultOrder(
  orderId: ICancelConsultOrderOrderIdReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/consultorder/cancelConsultOrder/{orderId}'.replace(
      '{orderId}',
      orderId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id查询咨询订单
 *
 */
async function checkDetail(
  orderId: ICheckDetailOrderIdReq,
): Promise<ConsultOrderByIdResponse> {
  let result = await sdk.get<ConsultOrderByIdResponse>(
    '/consultorder/check/{orderId}'.replace('{orderId}', orderId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据idList批量删除咨询订单
 *
 */
async function deleteByIdList_(
  delByIdListReq: IDeleteByIdList_DelByIdListReqReq,
): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultorder/delete-by-id-list',

    {
      ...delByIdListReq,
    },
  );
  return result.context;
}

/**
 *
 * 导出咨询订单列表
 *
 */
async function exportData(
  encrypted: IExportDataEncryptedReq,
): Promise<unknown> {
  let result = await sdk.get(
    '/consultorder/export/{encrypted}'.replace('{encrypted}', encrypted + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询咨询订单
 *
 */
async function getConsultOrderList(): Promise<ConsultOrderListResponse> {
  let result = await sdk.get<ConsultOrderListResponse>(
    '/consultorder/getConsultOrderList',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询咨询订单
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<ConsultOrderListResponse> {
  let result = await sdk.post<ConsultOrderListResponse>(
    '/consultorder/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 修改咨询订单
 *
 */
async function modify(
  modifyReq: IModifyModifyReqReq,
): Promise<ConsultOrderModifyResponse> {
  let result = await sdk.put<ConsultOrderModifyResponse>(
    '/consultorder/modify',

    {
      ...modifyReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据code查询咨询订单
 *
 */
async function getByOrderCode(
  orderCode: IGetByOrderCodeOrderCodeReq,
): Promise<ConsultOrderByCodeResponse> {
  let result = await sdk.get<ConsultOrderByCodeResponse>(
    '/consultorder/orderCode/{orderCode}'.replace(
      '{orderCode}',
      orderCode + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询咨询订单
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ConsultOrderPageResponse> {
  let result = await sdk.post<ConsultOrderPageResponse>(
    '/consultorder/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询咨询订单
 *
 */
async function getById(
  orderId: IGetByIdOrderIdReq,
): Promise<ConsultOrderByIdResponse> {
  let result = await sdk.get<ConsultOrderByIdResponse>(
    '/consultorder/{orderId}'.replace('{orderId}', orderId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据id删除咨询订单
 *
 */
async function deleteById_(orderId: IDeleteById_OrderIdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/consultorder/{orderId}'.replace('{orderId}', orderId + ''),

    {},
  );
  return result.context;
}

export default {
  add,

  cancelConsultOrder,

  checkDetail,

  deleteByIdList_,

  exportData,

  getConsultOrderList,

  getList,

  modify,

  getByOrderCode,

  getPage,

  getById,

  deleteById_,
};

/**
 * orderId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICancelConsultOrderOrderIdReq".
 */
export type ICancelConsultOrderOrderIdReq = string;
/**
 * orderId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckDetailOrderIdReq".
 */
export type ICheckDetailOrderIdReq = string;
/**
 * encrypted
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IExportDataEncryptedReq".
 */
export type IExportDataEncryptedReq = string;
/**
 * orderCode
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByOrderCodeOrderCodeReq".
 */
export type IGetByOrderCodeOrderCodeReq = string;
/**
 * orderId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetByIdOrderIdReq".
 */
export type IGetByIdOrderIdReq = string;
/**
 * orderId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_OrderIdReq".
 */
export type IDeleteById_OrderIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderAddRequest".
 */
export interface ConsultOrderAddRequest {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultOrderAddResponse»".
 */
export interface BaseResponseConsultOrderAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultOrderAddResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultOrderAddResponse {
  consultOrderVO?: ConsultOrderVO;
  [k: string]: any;
}
/**
 * 已新增的咨询订单信息
 */
export interface ConsultOrderVO {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  consultRecordVO?: ConsultRecordVO;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  [k: string]: any;
}
/**
 * 咨询记录
 */
export interface ConsultRecordVO {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * 医师对象
 */
export interface ConsultDoctorVO {
  /**
   * 调整价格状态 （  0：调升  1:调降）
   */
  adjustFlag?: number;
  /**
   * 调整比例
   */
  adjustRatio?: number;
  /**
   * 医生头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生Id
   */
  doctorId?: number;
  /**
   * 医生姓名
   */
  doctorName?: string;
  /**
   * 医院名称
   */
  hospital?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 个人简介
   */
  intro?: string;
  /**
   * 是否下线(暂停提供服务： 0否，1是)
   * * NO: 否
   * * YES: 是
   */
  isSuspended?: 0 | 1;
  /**
   * 是否收费标志：0否，1是
   * * NO: 否
   * * YES: 是
   */
  payType?: 0 | 1;
  /**
   * 问诊价格
   */
  price?: number;
  /**
   * 医生星级评分，1-5星，可能有0.5的小数
   */
  score?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 专业擅长
   */
  skills?: string;
  /**
   * 职称
   */
  title?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}
export interface ConsultImageDataVO {
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 生成时间
   */
  createTime?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderAddResponse".
 */
export interface ConsultOrderAddResponse1 {
  consultOrderVO?: ConsultOrderVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderVO".
 */
export interface ConsultOrderVO1 {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  consultRecordVO?: ConsultRecordVO;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultRecordVO".
 */
export interface ConsultRecordVO1 {
  consultDoctorVO?: ConsultDoctorVO;
  /**
   * 咨询标志（0免费咨询，1专家咨询）
   * * FREE: 0:免费咨询
   * * EXPERT: 1:专家咨询
   */
  consultFlag?: 0 | 1;
  /**
   * 影像资料
   */
  consultImageDataVOList?: ConsultImageDataVO[];
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询状态（0咨询中，1已关闭）
   * * CONSULTING: 0:咨询中
   * * CLOSED: 1:已关闭
   */
  consultStatus?: 0 | 1;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 用户id(当前登录用户)
   */
  customerId?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生id
   */
  doctorId?: number;
  /**
   * 问诊id
   */
  inquiryId?: number;
  /**
   * 问诊状态(1待分诊，2解答中，3已解答，4已屏蔽，5已关闭)
   * * INIT: 0: 未使用
   * * TO_TRIAGE: 1: 待分诊
   * * IN_ANSWER: 2: 解答中
   * * ANSWERED: 3: 已解答
   * * SHIELD: 4: 已屏蔽
   * * CLOSED: 5: 已关闭
   */
  inquiryStatus?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 最后一句聊天内容
   */
  lastTalk?: string;
  /**
   * 聊天记录id
   */
  messageId?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 病情描述
   */
  question?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 就诊人id(一个登录用户可以添加多个就诊人)
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultDoctorVO".
 */
export interface ConsultDoctorVO1 {
  /**
   * 调整价格状态 （  0：调升  1:调降）
   */
  adjustFlag?: number;
  /**
   * 调整比例
   */
  adjustRatio?: number;
  /**
   * 医生头像
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分(0未删除，1已删除)
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医生Id
   */
  doctorId?: number;
  /**
   * 医生姓名
   */
  doctorName?: string;
  /**
   * 医院名称
   */
  hospital?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 个人简介
   */
  intro?: string;
  /**
   * 是否下线(暂停提供服务： 0否，1是)
   * * NO: 否
   * * YES: 是
   */
  isSuspended?: 0 | 1;
  /**
   * 是否收费标志：0否，1是
   * * NO: 否
   * * YES: 是
   */
  payType?: 0 | 1;
  /**
   * 问诊价格
   */
  price?: number;
  /**
   * 医生星级评分，1-5星，可能有0.5的小数
   */
  score?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 专业擅长
   */
  skills?: string;
  /**
   * 职称
   */
  title?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 执业地点
   */
  workplaces?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultImageDataVO".
 */
export interface ConsultImageDataVO1 {
  /**
   * 咨询记录id
   */
  consultRecordId?: string;
  /**
   * 生成时间
   */
  createTime?: string;
  /**
   * 影像资料描述
   */
  imageDataDesc?: string;
  /**
   * 咨询记录影像资料id
   */
  imageDataId?: number;
  /**
   * 影像资料地址
   */
  imageDataUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse".
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
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultOrderByIdResponse»".
 */
export interface BaseResponseConsultOrderByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultOrderByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultOrderByIdResponse {
  consultOrderVO?: ConsultOrderVO2;
  [k: string]: any;
}
/**
 * 咨询订单信息
 */
export interface ConsultOrderVO2 {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  consultRecordVO?: ConsultRecordVO;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderByIdResponse".
 */
export interface ConsultOrderByIdResponse1 {
  consultOrderVO?: ConsultOrderVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderDelByIdListRequest".
 */
export interface ConsultOrderDelByIdListRequest {
  /**
   * 批量删除-咨询订单idList
   */
  orderIdList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultOrderListResponse»".
 */
export interface BaseResponseConsultOrderListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultOrderListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultOrderListResponse {
  /**
   * 咨询订单列表结果
   */
  consultOrderVOList?: ConsultOrderVO3[];
  [k: string]: any;
}
export interface ConsultOrderVO3 {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  consultRecordVO?: ConsultRecordVO;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderListResponse".
 */
export interface ConsultOrderListResponse1 {
  /**
   * 咨询订单列表结果
   */
  consultOrderVOList?: ConsultOrderVO3[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderListRequest".
 */
export interface ConsultOrderListRequest {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 搜索条件:下单时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:下单时间截止
   */
  createTimeEnd?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 批量查询-咨询订单idList
   */
  orderIdList?: string[];
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
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
   * 搜索条件:付款时间开始
   */
  payTimeBegin?: string;
  /**
   * 搜索条件:付款时间截止
   */
  payTimeEnd?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
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
 * via the `definition` "ConsultOrderModifyRequest".
 */
export interface ConsultOrderModifyRequest {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultOrderModifyResponse»".
 */
export interface BaseResponseConsultOrderModifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultOrderModifyResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultOrderModifyResponse {
  consultOrderVO?: ConsultOrderVO4;
  [k: string]: any;
}
/**
 * 已修改的咨询订单信息
 */
export interface ConsultOrderVO4 {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  consultRecordVO?: ConsultRecordVO;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderModifyResponse".
 */
export interface ConsultOrderModifyResponse1 {
  consultOrderVO?: ConsultOrderVO4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ConsultOrderByCodeResponse»".
 */
export interface BaseResponseConsultOrderByCodeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultOrderByCodeResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultOrderByCodeResponse {
  consultOrderVO?: ConsultOrderVO5;
  [k: string]: any;
}
/**
 * 咨询订单信息
 */
export interface ConsultOrderVO5 {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  consultRecordVO?: ConsultRecordVO;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderByCodeResponse".
 */
export interface ConsultOrderByCodeResponse1 {
  consultOrderVO?: ConsultOrderVO5;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderPageRequest".
 */
export interface ConsultOrderPageRequest {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 搜索条件:下单时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:下单时间截止
   */
  createTimeEnd?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 批量查询-咨询订单idList
   */
  orderIdList?: string[];
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
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
   * 搜索条件:付款时间开始
   */
  payTimeBegin?: string;
  /**
   * 搜索条件:付款时间截止
   */
  payTimeEnd?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
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
 * via the `definition` "BaseResponse«ConsultOrderPageResponse»".
 */
export interface BaseResponseConsultOrderPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ConsultOrderPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ConsultOrderPageResponse {
  consultOrderVOPage?: MicroServicePageConsultOrderVO;
  [k: string]: any;
}
/**
 * 咨询订单分页结果
 */
export interface MicroServicePageConsultOrderVO {
  /**
   * 具体数据内容
   */
  content?: ConsultOrderVO6[];
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
export interface ConsultOrderVO6 {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  consultRecordVO?: ConsultRecordVO;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsultOrderPageResponse".
 */
export interface ConsultOrderPageResponse1 {
  consultOrderVOPage?: MicroServicePageConsultOrderVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ConsultOrderVO»".
 */
export interface MicroServicePageConsultOrderVO1 {
  /**
   * 具体数据内容
   */
  content?: ConsultOrderVO6[];
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
 * via the `definition` "Sort".
 */
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddAddReqReq".
 */
export interface IAddAddReqReq {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteByIdList_DelByIdListReqReq".
 */
export interface IDeleteByIdList_DelByIdListReqReq {
  /**
   * 批量删除-咨询订单idList
   */
  orderIdList?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 搜索条件:下单时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:下单时间截止
   */
  createTimeEnd?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 批量查询-咨询订单idList
   */
  orderIdList?: string[];
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
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
   * 搜索条件:付款时间开始
   */
  payTimeBegin?: string;
  /**
   * 搜索条件:付款时间截止
   */
  payTimeEnd?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
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
 * via the `definition` "IModifyModifyReqReq".
 */
export interface IModifyModifyReqReq {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 取消原因
   */
  cancelReason?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 咨询人年龄
   */
  consultAge?: number;
  /**
   * 咨询人ID
   */
  consultId?: string;
  /**
   * 咨询人名称
   */
  consultName?: string;
  /**
   * 关联的咨询记录id
   */
  consultRecordId?: string;
  /**
   * 咨询人性别（1:男 2:女）
   */
  consultSex?: number;
  /**
   * 咨询人手机号
   */
  consultTelephone?: string;
  /**
   * 搜索条件:下单时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:下单时间截止
   */
  createTimeEnd?: string;
  /**
   * 下单的会员ID
   */
  customerId?: string;
  /**
   * 删除标志  （0：保留  1：删除）
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 医师头像
   */
  doctorAvatar?: string;
  /**
   * 医师诊费
   */
  doctorConsultFee?: number;
  /**
   * 医师编号
   */
  doctorId?: number;
  /**
   * 医师名称
   */
  doctorName?: string;
  /**
   * 医师职称
   */
  doctorPositionalTitle?: string;
  /**
   * 医师技能
   */
  doctorSkill?: string;
  /**
   * 医院编号
   */
  hospitalId?: string;
  /**
   * 医院等级名称
   */
  hospitalLevelName?: string;
  /**
   * 医院名称
   */
  hospitalName?: string;
  /**
   * 咨询订单编号
   */
  orderCode?: string;
  /**
   * 咨询订单id
   */
  orderId?: string;
  /**
   * 批量查询-咨询订单idList
   */
  orderIdList?: string[];
  /**
   * 订单金额（分）
   */
  orderPrice?: number;
  /**
   * 订单状态（0待付款，1已付款，2已取消）
   */
  orderStatus?: number;
  /**
   * 订单类型（0免费，1收费）
   */
  orderType?: number;
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
   * 搜索条件:付款时间开始
   */
  payTimeBegin?: string;
  /**
   * 搜索条件:付款时间截止
   */
  payTimeEnd?: string;
  /**
   * 科室编号
   */
  sectionId?: number;
  /**
   * 科室名称
   */
  sectionName?: string;
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
