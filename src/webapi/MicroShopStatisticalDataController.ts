import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'MicroShopStatisticalDataController';

/**
 *
 * 用户数据概况
 *
 */
async function customerBaseData(
  request: ICustomerBaseDataRequestReq,
): Promise<MicroShopOwnerBaseDataResponse> {
  let result = await sdk.post<MicroShopOwnerBaseDataResponse>(
    '/microShop/statisticalData/customerBaseData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店个人基础数据统计
 *
 */
async function customerBaseInfo(
  request: ICustomerBaseInfoRequestReq,
): Promise<CustomerDetailResponse> {
  let result = await sdk.post<CustomerDetailResponse>(
    '/microShop/statisticalData/customerBaseInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 用户购买商品品类排名
 *
 */
async function goodsCateRank(
  request: IGoodsCateRankRequestReq,
): Promise<CustomerWebRankDataResponse> {
  let result = await sdk.post<CustomerWebRankDataResponse>(
    '/microShop/statisticalData/goodsCateRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 用户购买商品数量排名
 *
 */
async function goodsCountRank(
  request: IGoodsCountRankRequestReq,
): Promise<CustomerWebRankDataResponse> {
  let result = await sdk.post<CustomerWebRankDataResponse>(
    '/microShop/statisticalData/goodsCountRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 用户购买商品单价排名
 *
 */
async function goodsPriceRank(
  request: IGoodsPriceRankRequestReq,
): Promise<CustomerWebRankDataResponse> {
  let result = await sdk.post<CustomerWebRankDataResponse>(
    '/microShop/statisticalData/goodsPriceRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 用户板块停留时长排名
 *
 */
async function goodsRecordTimeRank(
  request: IGoodsRecordTimeRankRequestReq,
): Promise<CustomerWebRankDataResponse> {
  let result = await sdk.post<CustomerWebRankDataResponse>(
    '/microShop/statisticalData/goodsRecordTimeRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 用户购买商品复购率排名
 *
 */
async function goodsRepurchaseRateRank(
  request: IGoodsRepurchaseRateRankRequestReq,
): Promise<CustomerWebRankDataResponse> {
  let result = await sdk.post<CustomerWebRankDataResponse>(
    '/microShop/statisticalData/goodsRepurchaseRateRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 用户板块浏览次数排名
 *
 */
async function goodsScanCountRank(
  request: IGoodsScanCountRankRequestReq,
): Promise<CustomerWebRankDataResponse> {
  let result = await sdk.post<CustomerWebRankDataResponse>(
    '/microShop/statisticalData/goodsScanCountRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店个人经营数据
 *
 */
async function ownerBaseData(
  request: IOwnerBaseDataRequestReq,
): Promise<CustomerConditionByBaseResponse> {
  let result = await sdk.post<CustomerConditionByBaseResponse>(
    '/microShop/statisticalData/ownerBaseData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店个人分享次数图表数据
 *
 */
async function ownerShareGoodsCountData(
  request: IOwnerShareGoodsCountDataRequestReq,
): Promise<MicroShopOwnerShareGoodsCountDataResponse> {
  let result = await sdk.post<MicroShopOwnerShareGoodsCountDataResponse>(
    '/microShop/statisticalData/ownerShareGoodsCountData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店个人分享售卖商品数量毛利倾向分析数据
 *
 */
async function ownerShareGrossProfitCountData(
  request: IOwnerShareGrossProfitCountDataRequestReq,
): Promise<MicroShopOwnerShareGoodsCountDataResponse> {
  let result = await sdk.post<MicroShopOwnerShareGoodsCountDataResponse>(
    '/microShop/statisticalData/ownerShareGrossProfitCountData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店个人分享倾向分析图表数据
 *
 */
async function ownerShareOrderCountData(
  request: IOwnerShareOrderCountDataRequestReq,
): Promise<MicroShopOwnerShareGoodsCountDataResponse> {
  let result = await sdk.post<MicroShopOwnerShareGoodsCountDataResponse>(
    '/microShop/statisticalData/ownerShareOrderCountData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店个人分享售卖商品数量价格倾向分析数据
 *
 */
async function ownerSharePriceCountData(
  request: IOwnerSharePriceCountDataRequestReq,
): Promise<MicroShopOwnerShareGoodsCountDataResponse> {
  let result = await sdk.post<MicroShopOwnerShareGoodsCountDataResponse>(
    '/microShop/statisticalData/ownerSharePriceCountData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主活跃度排名
 *
 */
async function ownerWebActiveData(
  request: IOwnerWebActiveDataRequestReq,
): Promise<MicroShopOwnerWebRankDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankDataResponse>(
    '/microShop/statisticalData/ownerWebActiveData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主活跃度排名前三后五
 *
 */
async function ownerWebActiveTop3Last5Data(
  request: IOwnerWebActiveTop3Last5DataRequestReq,
): Promise<MicroShopOwnerWebRankHeadTailDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankHeadTailDataResponse>(
    '/microShop/statisticalData/ownerWebActiveTop3Last5Data',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店个人行为数据
 *
 */
async function ownerWebBehaviorData(
  request: IOwnerWebBehaviorDataRequestReq,
): Promise<MicroShopOwnerWebBehaviorDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebBehaviorDataResponse>(
    '/microShop/statisticalData/ownerWebBehaviorData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主复购次数排名
 *
 */
async function ownerWebRepurchaseData(
  request: IOwnerWebRepurchaseDataRequestReq,
): Promise<MicroShopOwnerWebRankDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankDataResponse>(
    '/microShop/statisticalData/ownerWebRepurchaseData',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主复购次数排名前三后五
 *
 */
async function ownerWebRepurchaseTop3Last5Data(
  request: IOwnerWebRepurchaseTop3Last5DataRequestReq,
): Promise<MicroShopOwnerWebRankHeadTailDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankHeadTailDataResponse>(
    '/microShop/statisticalData/ownerWebRepurchaseTop3Last5Data',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店团队下用户数量
 *
 */
async function teamNum(
  request: ITeamNumRequestReq,
): Promise<ReplayTradeTeamNumByCustomerIdResponse> {
  let result = await sdk.post<ReplayTradeTeamNumByCustomerIdResponse>(
    '/microShop/statisticalData/teamNum',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主客单量排名
 *
 */
async function teamSaleNumRank(
  request: ITeamSaleNumRankRequestReq,
): Promise<MicroShopOwnerWebRankDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankDataResponse>(
    '/microShop/statisticalData/teamSaleNumRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主客单量前三后五
 *
 */
async function teamSaleNumTop3Last5(
  request: ITeamSaleNumTop3Last5RequestReq,
): Promise<MicroShopOwnerWebRankHeadTailDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankHeadTailDataResponse>(
    '/microShop/statisticalData/teamSaleNumTop3Last5',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主消费排名
 *
 */
async function teamSaleRank(
  request: ITeamSaleRankRequestReq,
): Promise<MicroShopOwnerWebRankDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankDataResponse>(
    '/microShop/statisticalData/teamSaleRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主消费排名前三后五
 *
 */
async function teamSaleTop3Last5(
  request: ITeamSaleTop3Last5RequestReq,
): Promise<MicroShopOwnerWebRankHeadTailDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankHeadTailDataResponse>(
    '/microShop/statisticalData/teamSaleTop3Last5',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主客单价排名
 *
 */
async function teamSaleUnitPriceRank(
  request: ITeamSaleUnitPriceRankRequestReq,
): Promise<MicroShopOwnerWebRankDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankDataResponse>(
    '/microShop/statisticalData/teamSaleUnitPriceRank',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友店主客单价排名前三后五
 *
 */
async function teamSaleUnitPriceTop3Last5(
  request: ITeamSaleUnitPriceTop3Last5RequestReq,
): Promise<MicroShopOwnerWebRankHeadTailDataResponse> {
  let result = await sdk.post<MicroShopOwnerWebRankHeadTailDataResponse>(
    '/microShop/statisticalData/teamSaleUnitPriceTop3Last5',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  customerBaseData,

  customerBaseInfo,

  goodsCateRank,

  goodsCountRank,

  goodsPriceRank,

  goodsRecordTimeRank,

  goodsRepurchaseRateRank,

  goodsScanCountRank,

  ownerBaseData,

  ownerShareGoodsCountData,

  ownerShareGrossProfitCountData,

  ownerShareOrderCountData,

  ownerSharePriceCountData,

  ownerWebActiveData,

  ownerWebActiveTop3Last5Data,

  ownerWebBehaviorData,

  ownerWebRepurchaseData,

  ownerWebRepurchaseTop3Last5Data,

  teamNum,

  teamSaleNumRank,

  teamSaleNumTop3Last5,

  teamSaleRank,

  teamSaleTop3Last5,

  teamSaleUnitPriceRank,

  teamSaleUnitPriceTop3Last5,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroShopTeamAndOwnerRequest".
 */
export interface MicroShopTeamAndOwnerRequest {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 地推人员关联customerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 时间筛选
   */
  originTag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroShopOwnerBaseDataResponse»".
 */
export interface BaseResponseMicroShopOwnerBaseDataResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroShopOwnerBaseDataResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MicroShopOwnerBaseDataResponse {
  /**
   * 沟通次数
   */
  communicationNum?: number;
  /**
   * 转化率
   */
  conversionRate?: string;
  /**
   * 会员数
   */
  memberNum?: number;
  /**
   * 浏览量
   */
  pageviews?: number;
  /**
   * 复购率
   */
  repurchaseRate?: string;
  /**
   * 微店主订单量
   */
  saleNum?: number;
  /**
   * 微店主销售额
   */
  saleTotal?: number;
  /**
   * 微店主订单量
   */
  saleUnitPrice?: number;
  /**
   * 分享数
   */
  shareGoodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroShopOwnerBaseDataResponse".
 */
export interface MicroShopOwnerBaseDataResponse1 {
  /**
   * 沟通次数
   */
  communicationNum?: number;
  /**
   * 转化率
   */
  conversionRate?: string;
  /**
   * 会员数
   */
  memberNum?: number;
  /**
   * 浏览量
   */
  pageviews?: number;
  /**
   * 复购率
   */
  repurchaseRate?: string;
  /**
   * 微店主订单量
   */
  saleNum?: number;
  /**
   * 微店主销售额
   */
  saleTotal?: number;
  /**
   * 微店主订单量
   */
  saleUnitPrice?: number;
  /**
   * 分享数
   */
  shareGoodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerDetailResponse»".
 */
export interface BaseResponseCustomerDetailResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDetailResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerDetailResponse {
  customerDetailVO?: CustomerDetailVO;
  [k: string]: any;
}
/**
 * 经营店详情
 */
export interface CustomerDetailVO {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 绑定支付宝，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindAlipay?: 0 | 1;
  /**
   * 绑定银行卡，0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
  /**
   * 绑定微信，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindWechat?: 0 | 1;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 星座
   */
  constellation?: string;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   * * CANCEL: 2：注销
   */
  customerStatus?: 0 | 1 | 2;
  customerVO?: null;
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
   * 是否下载app,0:否，1:是
   * * NO: 否
   * * YES: 是
   */
  downloadApp?: 0 | 1;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 是否关注微信公众号，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  focusWechatPublicNumber?: 0 | 1;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 用户头像
   */
  headPicture?: string;
  /**
   * 兴趣爱好
   */
  hobby?: string;
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 发票抬头
   */
  invoice?: string;
  /**
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 职业
   */
  job?: string;
  /**
   * 会员开启定位服务后的纬度
   */
  latitude?: string;
  /**
   * 会员开启定位服务后的经度
   */
  longitude?: string;
  /**
   * 微店主类型
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * EMPLOYEE: 员工
   * * DOCTOR: 医生
   * * NURSE: 护士
   * * pharmacist: 药师
   * * dietitian: 营养师
   * * organization: 组织
   */
  microType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 归属组织
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  /**
   * 归属组织编号
   */
  ownershipGroupCode?: string;
  /**
   * 职业认证
   */
  proCertification?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 推荐人
   */
  refereePerson?: string;
  /**
   * 会员注册的渠道
   * * app: app
   * * pc: pc
   * * h5: h5
   * * little: 小程序
   */
  registChanel?: 0 | 1 | 2 | 3;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 开店时间
   */
  storeTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 微信
   */
  wechat?: string;
  /**
   * 生肖
   */
  zodiac?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailResponse".
 */
export interface CustomerDetailResponse1 {
  customerDetailVO?: CustomerDetailVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailVO".
 */
export interface CustomerDetailVO1 {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 绑定支付宝，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindAlipay?: 0 | 1;
  /**
   * 绑定银行卡，0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
  /**
   * 绑定微信，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindWechat?: 0 | 1;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 星座
   */
  constellation?: string;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   * * CANCEL: 2：注销
   */
  customerStatus?: 0 | 1 | 2;
  customerVO?: null;
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
   * 是否下载app,0:否，1:是
   * * NO: 否
   * * YES: 是
   */
  downloadApp?: 0 | 1;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 是否关注微信公众号，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  focusWechatPublicNumber?: 0 | 1;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 用户头像
   */
  headPicture?: string;
  /**
   * 兴趣爱好
   */
  hobby?: string;
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 发票抬头
   */
  invoice?: string;
  /**
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 职业
   */
  job?: string;
  /**
   * 会员开启定位服务后的纬度
   */
  latitude?: string;
  /**
   * 会员开启定位服务后的经度
   */
  longitude?: string;
  /**
   * 微店主类型
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * EMPLOYEE: 员工
   * * DOCTOR: 医生
   * * NURSE: 护士
   * * pharmacist: 药师
   * * dietitian: 营养师
   * * organization: 组织
   */
  microType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 归属组织
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  /**
   * 归属组织编号
   */
  ownershipGroupCode?: string;
  /**
   * 职业认证
   */
  proCertification?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 推荐人
   */
  refereePerson?: string;
  /**
   * 会员注册的渠道
   * * app: app
   * * pc: pc
   * * h5: h5
   * * little: 小程序
   */
  registChanel?: 0 | 1 | 2 | 3;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 开店时间
   */
  storeTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 微信
   */
  wechat?: string;
  /**
   * 生肖
   */
  zodiac?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVO".
 */
export interface CustomerVO {
  /**
   * 绑定银行卡状态
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建|注册时间
   */
  createTime?: string;
  /**
   * 账户
   */
  customerAccount?: string;
  customerDetail?: CustomerDetailVO2;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 盐值
   */
  customerSaltVal?: string;
  /**
   * 客户类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:供应商客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
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
  distributeChannel?: DistributeChannel;
  /**
   * 是否关注了微信公众号
   * * YES: 是
   * * NO: 否
   */
  followWxFlag?: 0 | 1;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 密码错误次数
   */
  loginErrorCount?: number;
  /**
   * 登录IP
   */
  loginIp?: string;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 登录时间
   */
  loginTime?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 供应商和客户的关联关系
   */
  storeCustomerRelaListByAll?: StoreCustomerRelaVO[];
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
 * 会员的详细信息
 */
export interface CustomerDetailVO2 {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 绑定支付宝，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindAlipay?: 0 | 1;
  /**
   * 绑定银行卡，0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  bindBank?: 0 | 1;
  /**
   * 绑定微信，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  bindWechat?: 0 | 1;
  /**
   * 生日
   */
  birthday?: string;
  /**
   * 实名认证
   * * NO: 否
   * * YES: 是
   * * AUTHENTICATING: 人工认证中
   * * AUTHENTICATEREJECT: 人工认证不通过
   * * AUTHENTICATEACCEPT: 人工认证通过
   */
  certification?: 0 | 1 | 2 | 3 | 4;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 公司信息id
   */
  companyInfoId?: number;
  /**
   * 星座
   */
  constellation?: string;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   * * CANCEL: 2：注销
   */
  customerStatus?: 0 | 1 | 2;
  customerVO?: null;
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
   * 是否下载app,0:否，1:是
   * * NO: 否
   * * YES: 是
   */
  downloadApp?: 0 | 1;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 是否关注微信公众号，0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  focusWechatPublicNumber?: 0 | 1;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 用户头像
   */
  headPicture?: string;
  /**
   * 兴趣爱好
   */
  hobby?: string;
  /**
   * 身份证
   */
  idCard?: string;
  /**
   * 发票抬头
   */
  invoice?: string;
  /**
   * 是否为联系人 0：否  1：是
   * * NO: 否
   * * YES: 是
   */
  isContact?: 0 | 1;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 职业
   */
  job?: string;
  /**
   * 会员开启定位服务后的纬度
   */
  latitude?: string;
  /**
   * 会员开启定位服务后的经度
   */
  longitude?: string;
  /**
   * 微店主类型
   * * ALL: _@ApiEnumPropertyProperty annotation not available_
   * * EMPLOYEE: 员工
   * * DOCTOR: 医生
   * * NURSE: 护士
   * * pharmacist: 药师
   * * dietitian: 营养师
   * * organization: 组织
   */
  microType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 归属组织
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  /**
   * 归属组织编号
   */
  ownershipGroupCode?: string;
  /**
   * 职业认证
   */
  proCertification?: string;
  /**
   * 证件号码
   */
  proCertificationId?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 推荐人
   */
  refereePerson?: string;
  /**
   * 会员注册的渠道
   * * app: app
   * * pc: pc
   * * h5: h5
   * * little: 小程序
   */
  registChanel?: 0 | 1 | 2 | 3;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 角色类型
   * * MEMBER: 会员
   * * MICROOWNER: 微店主
   */
  roleType?: 0 | 1;
  /**
   * 开店时间
   */
  storeTime?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 微信
   */
  wechat?: string;
  /**
   * 生肖
   */
  zodiac?: string;
  [k: string]: any;
}
/**
 * 分销渠道信息
 */
export interface DistributeChannel {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
export interface StoreCustomerRelaVO {
  /**
   * 供应商标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:供应商客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 负责的业务员标识
   */
  employeeId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺等级标识
   */
  storeLevelId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributeChannel".
 */
export interface DistributeChannel1 {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCustomerRelaVO".
 */
export interface StoreCustomerRelaVO1 {
  /**
   * 供应商标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:供应商客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 负责的业务员标识
   */
  employeeId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺等级标识
   */
  storeLevelId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroShopOwnerRequest".
 */
export interface MicroShopOwnerRequest {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "BaseResponse«CustomerWebRankDataResponse»".
 */
export interface BaseResponseCustomerWebRankDataResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerWebRankDataResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerWebRankDataResponse {
  rankDataVoPage?: MicroServicePageRingDiagramVo;
  [k: string]: any;
}
/**
 * 排名分页
 */
export interface MicroServicePageRingDiagramVo {
  /**
   * 具体数据内容
   */
  content?: RingDiagramVo[];
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
export interface RingDiagramVo {
  name?: string;
  value?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerWebRankDataResponse".
 */
export interface CustomerWebRankDataResponse1 {
  rankDataVoPage?: MicroServicePageRingDiagramVo;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«RingDiagramVo»".
 */
export interface MicroServicePageRingDiagramVo1 {
  /**
   * 具体数据内容
   */
  content?: RingDiagramVo[];
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
 * via the `definition` "RingDiagramVo".
 */
export interface RingDiagramVo1 {
  name?: string;
  value?: string;
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
 * via the `definition` "BaseResponse«CustomerConditionByBaseResponse»".
 */
export interface BaseResponseCustomerConditionByBaseResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerConditionByBaseResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerConditionByBaseResponse {
  /**
   * 沟通次数
   */
  communicationNum?: number;
  /**
   * 推荐状况配置信息
   */
  conditionVOS?: ConditionVO[];
  /**
   * 转化率
   */
  conversionRate?: string;
  /**
   * 会员数
   */
  memberNum?: number;
  /**
   * 浏览量
   */
  pageviews?: number;
  /**
   * 方案1
   */
  recommendSchemeVOS1?: RecommendSchemeVO1[];
  /**
   * 方案2
   */
  recommendSchemeVOS2?: RecommendSchemeVO2[];
  /**
   * 方案3
   */
  recommendSchemeVOS3?: RecommendSchemeVO3[];
  /**
   * 复购率
   */
  repurchaseRate?: string;
  /**
   * 微店主订单量
   */
  saleNum?: number;
  /**
   * 微店主销售额
   */
  saleTotal?: number;
  /**
   * 微店主客单价
   */
  saleUnitPrice?: number;
  /**
   * 分享数
   */
  shareGoodsNum?: number;
  /**
   * 转化率
   */
  teamConversionRate?: string;
  /**
   * 友店数
   */
  teamMicroShopNum?: number;
  /**
   * 复购率
   */
  teamRepurchaseRate?: string;
  /**
   * 团队总订单量
   */
  teamSaleNum?: number;
  /**
   * 团队总销售额
   */
  teamSaleTotal?: number;
  /**
   * 团队客单价
   */
  teamSaleUnitPrice?: number;
  [k: string]: any;
}
export interface ConditionVO {
  /**
   * 状况描述
   */
  conditionDescrition?: string;
  /**
   * 主键
   */
  conditionId?: number;
  /**
   * 状况的名称
   */
  conditionName?: string;
  /**
   * 状况条件值选择 0：平均值  1：自定义
   */
  conditionSettingChoose?: number;
  /**
   * 条件值
   */
  conditionSettingValue?: string;
  /**
   * 状况里的标签
   */
  conditionTag?: string;
  /**
   * 关差
   */
  gapRatio?: string;
  /**
   * 关联方案
   */
  recommendSchemeVOS?: RecommendSchemeVO[];
  /**
   * 标签关联方案
   */
  tagRelatePlan?: string;
  /**
   * 微店主基础值
   */
  value?: string;
  [k: string]: any;
}
export interface RecommendSchemeVO {
  /**
   * 新建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 方案关联状况的主键
   */
  schemeConditionId?: number;
  /**
   * 方案的内容
   */
  schemeContext?: string;
  /**
   * 方案的主键
   */
  schemeId?: number;
  /**
   * 方案的名称
   */
  schemeName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface RecommendSchemeVO1 {
  /**
   * 新建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 方案关联状况的主键
   */
  schemeConditionId?: number;
  /**
   * 方案的内容
   */
  schemeContext?: string;
  /**
   * 方案的主键
   */
  schemeId?: number;
  /**
   * 方案的名称
   */
  schemeName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface RecommendSchemeVO2 {
  /**
   * 新建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 方案关联状况的主键
   */
  schemeConditionId?: number;
  /**
   * 方案的内容
   */
  schemeContext?: string;
  /**
   * 方案的主键
   */
  schemeId?: number;
  /**
   * 方案的名称
   */
  schemeName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface RecommendSchemeVO3 {
  /**
   * 新建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 方案关联状况的主键
   */
  schemeConditionId?: number;
  /**
   * 方案的内容
   */
  schemeContext?: string;
  /**
   * 方案的主键
   */
  schemeId?: number;
  /**
   * 方案的名称
   */
  schemeName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerConditionByBaseResponse".
 */
export interface CustomerConditionByBaseResponse1 {
  /**
   * 沟通次数
   */
  communicationNum?: number;
  /**
   * 推荐状况配置信息
   */
  conditionVOS?: ConditionVO[];
  /**
   * 转化率
   */
  conversionRate?: string;
  /**
   * 会员数
   */
  memberNum?: number;
  /**
   * 浏览量
   */
  pageviews?: number;
  /**
   * 方案1
   */
  recommendSchemeVOS1?: RecommendSchemeVO1[];
  /**
   * 方案2
   */
  recommendSchemeVOS2?: RecommendSchemeVO2[];
  /**
   * 方案3
   */
  recommendSchemeVOS3?: RecommendSchemeVO3[];
  /**
   * 复购率
   */
  repurchaseRate?: string;
  /**
   * 微店主订单量
   */
  saleNum?: number;
  /**
   * 微店主销售额
   */
  saleTotal?: number;
  /**
   * 微店主客单价
   */
  saleUnitPrice?: number;
  /**
   * 分享数
   */
  shareGoodsNum?: number;
  /**
   * 转化率
   */
  teamConversionRate?: string;
  /**
   * 友店数
   */
  teamMicroShopNum?: number;
  /**
   * 复购率
   */
  teamRepurchaseRate?: string;
  /**
   * 团队总订单量
   */
  teamSaleNum?: number;
  /**
   * 团队总销售额
   */
  teamSaleTotal?: number;
  /**
   * 团队客单价
   */
  teamSaleUnitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConditionVO".
 */
export interface ConditionVO1 {
  /**
   * 状况描述
   */
  conditionDescrition?: string;
  /**
   * 主键
   */
  conditionId?: number;
  /**
   * 状况的名称
   */
  conditionName?: string;
  /**
   * 状况条件值选择 0：平均值  1：自定义
   */
  conditionSettingChoose?: number;
  /**
   * 条件值
   */
  conditionSettingValue?: string;
  /**
   * 状况里的标签
   */
  conditionTag?: string;
  /**
   * 关差
   */
  gapRatio?: string;
  /**
   * 关联方案
   */
  recommendSchemeVOS?: RecommendSchemeVO[];
  /**
   * 标签关联方案
   */
  tagRelatePlan?: string;
  /**
   * 微店主基础值
   */
  value?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RecommendSchemeVO".
 */
export interface RecommendSchemeVO4 {
  /**
   * 新建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 方案关联状况的主键
   */
  schemeConditionId?: number;
  /**
   * 方案的内容
   */
  schemeContext?: string;
  /**
   * 方案的主键
   */
  schemeId?: number;
  /**
   * 方案的名称
   */
  schemeName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroShopOwnerShareGoodsCountDataResponse»".
 */
export interface BaseResponseMicroShopOwnerShareGoodsCountDataResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroShopOwnerShareGoodsCountDataResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MicroShopOwnerShareGoodsCountDataResponse {
  /**
   * 图表数据
   */
  ringDiagramVoList?: RingDiagramVo2[];
  /**
   * 分享次数
   */
  shareCountTotal?: number;
  [k: string]: any;
}
export interface RingDiagramVo2 {
  name?: string;
  value?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroShopOwnerShareGoodsCountDataResponse".
 */
export interface MicroShopOwnerShareGoodsCountDataResponse1 {
  /**
   * 图表数据
   */
  ringDiagramVoList?: RingDiagramVo2[];
  /**
   * 分享次数
   */
  shareCountTotal?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroShopOwnerWebRankDataResponse»".
 */
export interface BaseResponseMicroShopOwnerWebRankDataResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroShopOwnerWebRankDataResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MicroShopOwnerWebRankDataResponse {
  rankDataVoPage?: MicroServicePageRankDataVo;
  [k: string]: any;
}
/**
 * 排名分页
 */
export interface MicroServicePageRankDataVo {
  /**
   * 具体数据内容
   */
  content?: RankDataVo[];
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
  sort?: Sort2;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface RankDataVo {
  /**
   * 关差
   */
  closeDiff?: string;
  /**
   * 用户ID
   */
  customerId?: string;
  /**
   * 用户名称
   */
  customerName?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 头像
   */
  headPicture?: string;
  /**
   * 电话
   */
  telPhone?: string;
  /**
   * 数值
   */
  value?: string;
  [k: string]: any;
}
export interface Sort2 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroShopOwnerWebRankDataResponse".
 */
export interface MicroShopOwnerWebRankDataResponse1 {
  rankDataVoPage?: MicroServicePageRankDataVo;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«RankDataVo»".
 */
export interface MicroServicePageRankDataVo1 {
  /**
   * 具体数据内容
   */
  content?: RankDataVo[];
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
  sort?: Sort2;
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
 * via the `definition` "RankDataVo".
 */
export interface RankDataVo1 {
  /**
   * 关差
   */
  closeDiff?: string;
  /**
   * 用户ID
   */
  customerId?: string;
  /**
   * 用户名称
   */
  customerName?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 头像
   */
  headPicture?: string;
  /**
   * 电话
   */
  telPhone?: string;
  /**
   * 数值
   */
  value?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroShopOwnerWebRankHeadTailDataResponse»".
 */
export interface BaseResponseMicroShopOwnerWebRankHeadTailDataResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroShopOwnerWebRankHeadTailDataResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MicroShopOwnerWebRankHeadTailDataResponse {
  /**
   * Head3 + tail5
   */
  rankDataVoList?: RankDataVo2[];
  [k: string]: any;
}
export interface RankDataVo2 {
  /**
   * 关差
   */
  closeDiff?: string;
  /**
   * 用户ID
   */
  customerId?: string;
  /**
   * 用户名称
   */
  customerName?: string;
  /**
   * 性别，0：女1：男
   */
  gender?: number;
  /**
   * 头像
   */
  headPicture?: string;
  /**
   * 电话
   */
  telPhone?: string;
  /**
   * 数值
   */
  value?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroShopOwnerWebRankHeadTailDataResponse".
 */
export interface MicroShopOwnerWebRankHeadTailDataResponse1 {
  /**
   * Head3 + tail5
   */
  rankDataVoList?: RankDataVo2[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«MicroShopOwnerWebBehaviorDataResponse»".
 */
export interface BaseResponseMicroShopOwnerWebBehaviorDataResponse {
  /**
   * 结果码
   */
  code: string;
  context?: MicroShopOwnerWebBehaviorDataResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface MicroShopOwnerWebBehaviorDataResponse {
  /**
   * 沟通次数
   */
  communicationDatas?: BehaviorDataVo[];
  /**
   * 停留时长
   */
  lengthofStays?: BehaviorDataVo1[];
  /**
   * 订单来源
   */
  orderSource?: BehaviorDataVo2[];
  /**
   * 浏览量分析
   */
  pageViews?: BehaviorDataVo3[];
  /**
   * 分享数据分析
   */
  shareDatas?: BehaviorDataVo4[];
  [k: string]: any;
}
export interface BehaviorDataVo {
  name?: string;
  value?: string;
  [k: string]: any;
}
export interface BehaviorDataVo1 {
  name?: string;
  value?: string;
  [k: string]: any;
}
export interface BehaviorDataVo2 {
  name?: string;
  value?: string;
  [k: string]: any;
}
export interface BehaviorDataVo3 {
  name?: string;
  value?: string;
  [k: string]: any;
}
export interface BehaviorDataVo4 {
  name?: string;
  value?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroShopOwnerWebBehaviorDataResponse".
 */
export interface MicroShopOwnerWebBehaviorDataResponse1 {
  /**
   * 沟通次数
   */
  communicationDatas?: BehaviorDataVo[];
  /**
   * 停留时长
   */
  lengthofStays?: BehaviorDataVo1[];
  /**
   * 订单来源
   */
  orderSource?: BehaviorDataVo2[];
  /**
   * 浏览量分析
   */
  pageViews?: BehaviorDataVo3[];
  /**
   * 分享数据分析
   */
  shareDatas?: BehaviorDataVo4[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BehaviorDataVo".
 */
export interface BehaviorDataVo5 {
  name?: string;
  value?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReplayTradePageByCustomerIdRequest".
 */
export interface ReplayTradePageByCustomerIdRequest {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ReplayTradeTeamNumByCustomerIdResponse»".
 */
export interface BaseResponseReplayTradeTeamNumByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ReplayTradeTeamNumByCustomerIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ReplayTradeTeamNumByCustomerIdResponse {
  /**
   * 团队下微店主人数
   */
  teamNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ReplayTradeTeamNumByCustomerIdResponse".
 */
export interface ReplayTradeTeamNumByCustomerIdResponse1 {
  /**
   * 团队下微店主人数
   */
  teamNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICustomerBaseDataRequestReq".
 */
export interface ICustomerBaseDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 地推人员关联customerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 时间筛选
   */
  originTag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICustomerBaseInfoRequestReq".
 */
export interface ICustomerBaseInfoRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 地推人员关联customerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 时间筛选
   */
  originTag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGoodsCateRankRequestReq".
 */
export interface IGoodsCateRankRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IGoodsCountRankRequestReq".
 */
export interface IGoodsCountRankRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IGoodsPriceRankRequestReq".
 */
export interface IGoodsPriceRankRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IGoodsRecordTimeRankRequestReq".
 */
export interface IGoodsRecordTimeRankRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IGoodsRepurchaseRateRankRequestReq".
 */
export interface IGoodsRepurchaseRateRankRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IGoodsScanCountRankRequestReq".
 */
export interface IGoodsScanCountRankRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerBaseDataRequestReq".
 */
export interface IOwnerBaseDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 地推人员关联customerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 时间筛选
   */
  originTag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IOwnerShareGoodsCountDataRequestReq".
 */
export interface IOwnerShareGoodsCountDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerShareGrossProfitCountDataRequestReq".
 */
export interface IOwnerShareGrossProfitCountDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerShareOrderCountDataRequestReq".
 */
export interface IOwnerShareOrderCountDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerSharePriceCountDataRequestReq".
 */
export interface IOwnerSharePriceCountDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerWebActiveDataRequestReq".
 */
export interface IOwnerWebActiveDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerWebActiveTop3Last5DataRequestReq".
 */
export interface IOwnerWebActiveTop3Last5DataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerWebBehaviorDataRequestReq".
 */
export interface IOwnerWebBehaviorDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerWebRepurchaseDataRequestReq".
 */
export interface IOwnerWebRepurchaseDataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "IOwnerWebRepurchaseTop3Last5DataRequestReq".
 */
export interface IOwnerWebRepurchaseTop3Last5DataRequestReq {
  /**
   * 开始时间
   */
  createTimeBegin?: string;
  /**
   * 结束时间
   */
  createTimeEnd?: string;
  /**
   * 用户coustomerId
   */
  customerId?: string;
  /**
   * 友店主customerId
   */
  distributorCustomerId?: string;
  /**
   * 最近N天
   */
  limit?: number;
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
 * via the `definition` "ITeamNumRequestReq".
 */
export interface ITeamNumRequestReq {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamSaleNumRankRequestReq".
 */
export interface ITeamSaleNumRankRequestReq {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamSaleNumTop3Last5RequestReq".
 */
export interface ITeamSaleNumTop3Last5RequestReq {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamSaleRankRequestReq".
 */
export interface ITeamSaleRankRequestReq {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamSaleTop3Last5RequestReq".
 */
export interface ITeamSaleTop3Last5RequestReq {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamSaleUnitPriceRankRequestReq".
 */
export interface ITeamSaleUnitPriceRankRequestReq {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITeamSaleUnitPriceTop3Last5RequestReq".
 */
export interface ITeamSaleUnitPriceTop3Last5RequestReq {
  /**
   * 搜索条件:订单创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:订单创建时间截止
   */
  createTimeEnd?: string;
  /**
   * 会员的Id
   */
  customerId?: string;
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
  /**
   * 标志:app：商城 groundpush:地推
   */
  sourceType?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
