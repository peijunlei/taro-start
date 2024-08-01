import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StoreBaseController';

/**
 *
 * 查询店铺主页信息(店铺主页用)
 *
 */
async function queryStoreById(storeId: any): Promise<StoreHomeInfoResponse> {
  let result = await sdk.get<StoreHomeInfoResponse>(
    '/store/homeInfo/{storeId}'.replace('{storeId}', storeId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询店铺主页信息(店铺主页用)
 *
 */
async function queryStoreFront(storeId: IQueryStoreFrontStoreIdReq): Promise<StoreHomeInfoResponse> {
  let result = await sdk.get<StoreHomeInfoResponse>(
    '/store/homeInfoFront/{storeId}'.replace('{storeId}', storeId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 进店赠券活动(已登陆)
 *
 */
async function entryCoupons(
  customerId: IEntryCouponsCustomerIdReq,
  storeId: IEntryCouponsStoreIdReq,
): Promise<GetRegisterOrStoreCouponResponse> {
  let result = await sdk.get<GetRegisterOrStoreCouponResponse>(
    '/store/storeCoupons/{storeId}/{customerId}'

      .replace('{customerId}', customerId + '')

      .replace('{storeId}', storeId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询店铺档案信息(包括签约分类,品牌图片信息)
 *
 */
async function queryStoreDocument(request: IQueryStoreDocumentRequestReq): Promise<StoreDocumentResponse> {
  let result = await sdk.post<StoreDocumentResponse>(
    '/store/storeDocument',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询店铺基本信息
 *
 */
async function queryStore(request: IQueryStoreRequestReq): Promise<StoreBaseResponse> {
  let result = await sdk.post<StoreBaseResponse>(
    '/store/storeInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询店铺基本信息
 *
 */
async function queryStoreBySkuId(request: IQueryStoreRequestReq): Promise<StoreBaseResponse> {
  let result = await sdk.post<StoreBaseResponse>(
    '/store/storeInfoBySkuId',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询操作人在店铺的会员等级与折扣信息
 *
 */
async function queryStoreVip(request: IQueryStoreVipRequestReq): Promise<StoreCustSystemResponse> {
  let result = await sdk.post<StoreCustSystemResponse>(
    '/store/storeVip',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询操作人在店铺的会员等级与折扣信息
 *
 */
async function queryStoreVipFront(request: IQueryStoreVipFrontRequestReq): Promise<StoreCustSystemResponse> {
  let result = await sdk.post<StoreCustSystemResponse>(
    '/store/storeVipFront',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 未登录状态下查询店铺基本信息
 *
 */
async function queryStoreUnlogin(request: IQueryStoreUnloginRequestReq): Promise<BossStoreBaseInfoResponse> {
  let result = await sdk.post<BossStoreBaseInfoResponse>(
    '/store/unLogin/storeInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 未登录状态下查询店铺基本信息
 *
 */
async function queryStoreBySkuIdUnlogin(request: IQueryStoreUnloginRequestReq): Promise<BossStoreBaseInfoResponse> {
  let result = await sdk.post<BossStoreBaseInfoResponse>(
    '/store/unLogin/storeInfoBySkuId',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  queryStoreById,

  queryStoreFront,

  entryCoupons,

  queryStoreDocument,

  queryStore,

  queryStoreBySkuId,

  queryStoreVip,

  queryStoreVipFront,

  queryStoreUnlogin,

  queryStoreBySkuIdUnlogin,
};

/**
 * 店铺Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreStoreIdReq".
 */
export type IQueryStoreStoreIdReq = number;
/**
 * 店铺Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreFrontStoreIdReq".
 */
export type IQueryStoreFrontStoreIdReq = number;
/**
 * 客户Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEntryCouponsCustomerIdReq".
 */
export type IEntryCouponsCustomerIdReq = number;
/**
 * 店铺Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEntryCouponsStoreIdReq".
 */
export type IEntryCouponsStoreIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StoreHomeInfoResponse»".
 */
export interface BaseResponseStoreHomeInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StoreHomeInfoResponse;
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
export interface StoreHomeInfoResponse {
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreHomeInfoResponse".
 */
export interface StoreHomeInfoResponse1 {
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GetRegisterOrStoreCouponResponse»".
 */
export interface BaseResponseGetRegisterOrStoreCouponResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GetRegisterOrStoreCouponResponse;
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
export interface GetRegisterOrStoreCouponResponse {
  /**
   * 优惠券列表
   */
  couponList?: GetCouponGroupResponse[];
  /**
   * 描述
   */
  desc?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
export interface GetCouponGroupResponse {
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 优惠券总张数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetRegisterOrStoreCouponResponse".
 */
export interface GetRegisterOrStoreCouponResponse1 {
  /**
   * 优惠券列表
   */
  couponList?: GetCouponGroupResponse[];
  /**
   * 描述
   */
  desc?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetCouponGroupResponse".
 */
export interface GetCouponGroupResponse1 {
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 优惠券总张数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreQueryRequest".
 */
export interface StoreQueryRequest {
  /**
   * 批量全部区域IDs
   */
  allAreaIds?: number[];
  /**
   * 区
   */
  areaIds?: number[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityIds?: number[];
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 大于或等于签约开始时间
   */
  gteContractStartDate?: string;
  /**
   * 关键字范围
   */
  keywords?: string;
  /**
   * 小于或等于签约结束时间
   */
  lteContractEndDate?: string;
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
   * 批量省
   */
  provinceIds?: number[];
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
   * 查询店铺ID
   */
  storeId?: number;
  /**
   * 批量查询店铺ID
   */
  storeIds?: number[];
  /**
   * 商铺名称
   */
  storeName?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StoreDocumentResponse»".
 */
export interface BaseResponseStoreDocumentResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StoreDocumentResponse;
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
export interface StoreDocumentResponse {
  /**
   * 住所
   */
  address?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 品牌经营资质图片
   */
  brandPicList?: string[];
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 类目经营资质图片
   */
  catePicList?: string[];
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 收藏总数
   */
  followCount?: number;
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * spu总数
   */
  goodsCount?: number;
  /**
   * sku总数
   */
  goodsInfoCount?: number;
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  storeEvaluateSumVO?: StoreEvaluateSumVO;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 店铺服务
 */
export interface StoreEvaluateSumVO {
  orderNum?: number;
  scoreCycle?: number;
  storeId?: number;
  storeName?: string;
  sumCompositeScore?: number;
  sumGoodsScore?: number;
  sumId?: number;
  sumLogisticsScoreScore?: number;
  sumServerScore?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreDocumentResponse".
 */
export interface StoreDocumentResponse1 {
  /**
   * 住所
   */
  address?: string;
  /**
   * 详细地址
   */
  addressDetail?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 品牌经营资质图片
   */
  brandPicList?: string[];
  /**
   * 营业执照副本电子版
   */
  businessLicence?: string;
  /**
   * 经营范围
   */
  businessScope?: string;
  /**
   * 营业期限至
   */
  businessTermEnd?: string;
  /**
   * 营业期限自
   */
  businessTermStart?: string;
  /**
   * 类目经营资质图片
   */
  catePicList?: string[];
  /**
   * 市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 收藏总数
   */
  followCount?: number;
  /**
   * 成立日期
   */
  foundDate?: string;
  /**
   * spu总数
   */
  goodsCount?: number;
  /**
   * sku总数
   */
  goodsInfoCount?: number;
  /**
   * 法定代表人
   */
  legalRepresentative?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 注册资本
   */
  registeredCapital?: number;
  /**
   * 店铺小程序码
   */
  smallProgramCode?: string;
  /**
   * 社会信用代码
   */
  socialCreditCode?: string;
  storeEvaluateSumVO?: StoreEvaluateSumVO;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreEvaluateSumVO".
 */
export interface StoreEvaluateSumVO1 {
  orderNum?: number;
  scoreCycle?: number;
  storeId?: number;
  storeName?: string;
  sumCompositeScore?: number;
  sumGoodsScore?: number;
  sumId?: number;
  sumLogisticsScoreScore?: number;
  sumServerScore?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StoreBaseResponse»".
 */
export interface BaseResponseStoreBaseResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StoreBaseResponse;
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
export interface StoreBaseResponse {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  followSum?: number;
  goodsSum?: number;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  storeEvaluateSumVO?: StoreEvaluateSumVO2;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
export interface StoreEvaluateSumVO2 {
  orderNum?: number;
  scoreCycle?: number;
  storeId?: number;
  storeName?: string;
  sumCompositeScore?: number;
  sumGoodsScore?: number;
  sumId?: number;
  sumLogisticsScoreScore?: number;
  sumServerScore?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreBaseResponse".
 */
export interface StoreBaseResponse1 {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  followSum?: number;
  goodsSum?: number;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  storeEvaluateSumVO?: StoreEvaluateSumVO2;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«StoreCustSystemResponse»".
 */
export interface BaseResponseStoreCustSystemResponse {
  /**
   * 结果码
   */
  code: string;
  context?: StoreCustSystemResponse;
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
export interface StoreCustSystemResponse {
  level?: CustomerLevelVO;
  /**
   * 店铺的会员体系
   */
  levelList?: CustomerLevelVO1[];
  store?: StoreBaseInfoResponse;
  [k: string]: any;
}
/**
 * 会员在该店铺的会员等级信息
 */
export interface CustomerLevelVO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
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
export interface CustomerLevelVO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
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
 * 店铺信息
 */
export interface StoreBaseInfoResponse {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCustSystemResponse".
 */
export interface StoreCustSystemResponse1 {
  level?: CustomerLevelVO;
  /**
   * 店铺的会员体系
   */
  levelList?: CustomerLevelVO1[];
  store?: StoreBaseInfoResponse;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerLevelVO".
 */
export interface CustomerLevelVO2 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreBaseInfoResponse".
 */
export interface StoreBaseInfoResponse1 {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«BossStoreBaseInfoResponse»".
 */
export interface BaseResponseBossStoreBaseInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: BossStoreBaseInfoResponse;
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
export interface BossStoreBaseInfoResponse {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  followSum?: number;
  goodsSum?: number;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  storeEvaluateSumVO?: StoreEvaluateSumVO3;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
export interface StoreEvaluateSumVO3 {
  orderNum?: number;
  scoreCycle?: number;
  storeId?: number;
  storeName?: string;
  sumCompositeScore?: number;
  sumGoodsScore?: number;
  sumId?: number;
  sumLogisticsScoreScore?: number;
  sumServerScore?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BossStoreBaseInfoResponse".
 */
export interface BossStoreBaseInfoResponse1 {
  /**
   * 地市
   */
  cityId?: number;
  /**
   * 商家id
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * PLATFORM: 0:平台自营
   * * SUPPLIER: 1:第三方商家
   */
  companyType?: number;
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系方式
   */
  contactMobile?: string;
  /**
   * 联系人名字
   */
  contactPerson?: string;
  followSum?: number;
  goodsSum?: number;
  /**
   * 店铺是否被关注
   */
  isFollowed?: boolean;
  /**
   * 省份
   */
  provinceId?: number;
  /**
   * 扁平化商品信息
   */
  skuIds?: string[];
  storeEvaluateSumVO?: StoreEvaluateSumVO3;
  /**
   * 店铺主键
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺响应状态
   * * OPENING: 0、正常
   * * CLOSED: 1、关店
   * * EXPIRE: 2、过期
   * * NONEXISTENT: 3、不存在
   */
  storeResponseState?: 0 | 1 | 2 | 3;
  /**
   * 店铺店招
   */
  storeSign?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreDocumentRequestReq".
 */
export interface IQueryStoreDocumentRequestReq {
  /**
   * 批量全部区域IDs
   */
  allAreaIds?: number[];
  /**
   * 区
   */
  areaIds?: number[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityIds?: number[];
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 大于或等于签约开始时间
   */
  gteContractStartDate?: string;
  /**
   * 关键字范围
   */
  keywords?: string;
  /**
   * 小于或等于签约结束时间
   */
  lteContractEndDate?: string;
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
   * 批量省
   */
  provinceIds?: number[];
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
   * 查询店铺ID
   */
  storeId?: number;
  /**
   * 批量查询店铺ID
   */
  storeIds?: number[];
  /**
   * 商铺名称
   */
  storeName?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreRequestReq".
 */
export interface IQueryStoreRequestReq {
  /**
   * 批量全部区域IDs
   */
  allAreaIds?: number[];
  /**
   * 区
   */
  areaIds?: number[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityIds?: number[];
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 大于或等于签约开始时间
   */
  gteContractStartDate?: string;
  /**
   * 关键字范围
   */
  keywords?: string;
  /**
   * 小于或等于签约结束时间
   */
  lteContractEndDate?: string;
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
   * 批量省
   */
  provinceIds?: number[];
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
   * 查询店铺ID
   */
  storeId?: number;
  /**
   * 批量查询店铺ID
   */
  storeIds?: number[];
  /**
   * 商铺名称
   */
  storeName?: string;

  skuId?: string;

  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreVipRequestReq".
 */
export interface IQueryStoreVipRequestReq {
  /**
   * 批量全部区域IDs
   */
  allAreaIds?: number[];
  /**
   * 区
   */
  areaIds?: number[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityIds?: number[];
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 大于或等于签约开始时间
   */
  gteContractStartDate?: string;
  /**
   * 关键字范围
   */
  keywords?: string;
  /**
   * 小于或等于签约结束时间
   */
  lteContractEndDate?: string;
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
   * 批量省
   */
  provinceIds?: number[];
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
   * 查询店铺ID
   */
  storeId?: number;
  /**
   * 批量查询店铺ID
   */
  storeIds?: number[];
  /**
   * 商铺名称
   */
  storeName?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreVipFrontRequestReq".
 */
export interface IQueryStoreVipFrontRequestReq {
  /**
   * 批量全部区域IDs
   */
  allAreaIds?: number[];
  /**
   * 区
   */
  areaIds?: number[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityIds?: number[];
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 大于或等于签约开始时间
   */
  gteContractStartDate?: string;
  /**
   * 关键字范围
   */
  keywords?: string;
  /**
   * 小于或等于签约结束时间
   */
  lteContractEndDate?: string;
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
   * 批量省
   */
  provinceIds?: number[];
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
   * 查询店铺ID
   */
  storeId?: number;
  /**
   * 批量查询店铺ID
   */
  storeIds?: number[];
  /**
   * 商铺名称
   */
  storeName?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryStoreUnloginRequestReq".
 */
export interface IQueryStoreUnloginRequestReq {
  /**
   * 批量全部区域IDs
   */
  allAreaIds?: number[];
  /**
   * 区
   */
  areaIds?: number[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  auditState?: 0 | 1 | 2;
  /**
   * 市
   */
  cityIds?: number[];
  /**
   * 商家类型(0、平台自营 1、第三方商家)
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 大于或等于签约开始时间
   */
  gteContractStartDate?: string;
  /**
   * 关键字范围
   */
  keywords?: string;
  /**
   * 小于或等于签约结束时间
   */
  lteContractEndDate?: string;
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
   * 批量省
   */
  provinceIds?: number[];
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

  skuId?: string;
  /**
   * 查询店铺ID
   */
  storeId?: number;
  /**
   * 批量查询店铺ID
   */
  storeIds?: number[];
  /**
   * 商铺名称
   */
  storeName?: string;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: 0 | 1;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
