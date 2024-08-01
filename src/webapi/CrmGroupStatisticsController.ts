import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CrmGroupStatisticsController';

/**
 *
 * 查询自定义人群分页
 *
 */
async function queryCustomGroupPage(request: IQueryCustomGroupPageRequestReq): Promise<PageInfoCustomGroupVo> {
  let result = await sdk.post<PageInfoCustomGroupVo>(
    '/group-statistics/customGroup/Page',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询自定义人群的信息
 *
 */
async function queryCustomGroupCustomerInfo(
  customerIds: IQueryCustomGroupCustomerInfoCustomerIdsReq,

  groupId: IQueryCustomGroupCustomerInfoGroupIdReq,

  originTag: IQueryCustomGroupCustomerInfoOriginTagReq,

  pageNum: IQueryCustomGroupCustomerInfoPageNumReq,

  offset: IQueryCustomGroupCustomerInfoPageRequestOffsetReq,

  pageNumber: IQueryCustomGroupCustomerInfoPageRequestPageNumberReq,

  pageSize: IQueryCustomGroupCustomerInfoPageRequestPageSizeReq,

  sortColumn: IQueryCustomGroupCustomerInfoSortColumnReq,

  sortRole: IQueryCustomGroupCustomerInfoSortRoleReq,

  sortType: IQueryCustomGroupCustomerInfoSortTypeReq,

  token: IQueryCustomGroupCustomerInfoTokenReq,

  userId: IQueryCustomGroupCustomerInfoUserIdReq,
): Promise<PageInfoCustomerDetailWithRfmValueVO> {
  let result = await sdk.post<PageInfoCustomerDetailWithRfmValueVO>(
    '/group-statistics/customGroup/customerPage',

    {
      ...customerIds,

      groupId,

      originTag,

      pageNum,

      offset,

      pageNumber,

      pageSize,

      sortColumn,

      sortRole,

      sortType,

      token,

      userId,
    },
  );
  return result.context;
}

/**
 *
 * 查询自定义人群的信息
 *
 */
async function queryCustomGroupInfo(request: IQueryCustomGroupInfoRequestReq): Promise<CustomGroupVo> {
  let result = await sdk.post<CustomGroupVo>(
    '/group-statistics/customGroup/info',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询系统预设的四个人群信息
 *
 */
async function querySystemGroupStatisticsList(): Promise<RfmGroupStatisticsListResponse> {
  let result = await sdk.get<RfmGroupStatisticsListResponse>(
    '/group-statistics/system/four',

    {},
  );
  return result.context;
}

export default {
  queryCustomGroupPage,

  queryCustomGroupCustomerInfo,

  queryCustomGroupInfo,

  querySystemGroupStatisticsList,
};

/**
 * 会员id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoCustomerIdsReq".
 */
export type IQueryCustomGroupCustomerInfoCustomerIdsReq = string[];
/**
 * 人群id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoGroupIdReq".
 */
export type IQueryCustomGroupCustomerInfoGroupIdReq = number;
/**
 * 筛选条件时间标识
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoOriginTagReq".
 */
export type IQueryCustomGroupCustomerInfoOriginTagReq = number;
/**
 * 第几页
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageNumReq".
 */
export type IQueryCustomGroupCustomerInfoPageNumReq = number;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageRequestOffsetReq".
 */
export type IQueryCustomGroupCustomerInfoPageRequestOffsetReq = number;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageRequestPageNumberReq".
 */
export type IQueryCustomGroupCustomerInfoPageRequestPageNumberReq = number;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageRequestPageSizeReq".
 */
export type IQueryCustomGroupCustomerInfoPageRequestPageSizeReq = number;
/**
 * 每页显示多少条
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageSizeReq".
 */
export type IQueryCustomGroupCustomerInfoPageSizeReq = number;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageableOffsetReq".
 */
export type IQueryCustomGroupCustomerInfoPageableOffsetReq = number;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageablePageNumberReq".
 */
export type IQueryCustomGroupCustomerInfoPageablePageNumberReq = number;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoPageablePageSizeReq".
 */
export type IQueryCustomGroupCustomerInfoPageablePageSizeReq = number;
/**
 * 排序字段
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoSortColumnReq".
 */
export type IQueryCustomGroupCustomerInfoSortColumnReq = string;
/**
 * 排序规则 desc asc
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoSortRoleReq".
 */
export type IQueryCustomGroupCustomerInfoSortRoleReq = string;
/**
 * 排序类型
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoSortTypeReq".
 */
export type IQueryCustomGroupCustomerInfoSortTypeReq = string;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoTokenReq".
 */
export type IQueryCustomGroupCustomerInfoTokenReq = string;
/**
 * 登录用户Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupCustomerInfoUserIdReq".
 */
export type IQueryCustomGroupCustomerInfoUserIdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomGroupPageByCustomerIdsRequest".
 */
export interface CustomGroupPageByCustomerIdsRequest {
  customerIds?: string[];
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
 * via the `definition` "BaseResponse«PageInfo«CustomGroupVo»»".
 */
export interface BaseResponsePageInfoCustomGroupVo {
  /**
   * 结果码
   */
  code: string;
  context?: PageInfoCustomGroupVo;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface PageInfoCustomGroupVo {
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: CustomGroupVo[];
  navigateFirstPage?: number;
  navigateLastPage?: number;
  navigatePages?: number;
  navigatepageNums?: number[];
  nextPage?: number;
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  prePage?: number;
  size?: number;
  startRow?: number;
  total?: number;
  [k: string]: any;
}
export interface CustomGroupVo {
  createPerson?: string;
  createTime?: string;
  customGroupDetail?: CustomGroupDetailVo;
  customerCount?: number;
  definition?: string;
  groupName?: string;
  id?: number;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface CustomGroupDetailVo {
  /**
   * 笔单价统计时间
   */
  avgTradeAmountTime?: number;
  /**
   * 会员等级
   */
  customerLevel?: number[];
  /**
   * 会员标签
   */
  customerTag?: number[];
  /**
   * 自定义分组名
   */
  groupName?: string;
  /**
   * 笔单价大于值
   */
  gtAvgTradeAmount?: number;
  /**
   * 会员余额大于值
   */
  gtBalance?: number;
  /**
   * 会员成长值大于值
   */
  gtCustomerGrowth?: number;
  /**
   * 会员积分大于值
   */
  gtPoint?: number;
  /**
   * 累计消费金额大于值
   */
  gtTradeAmount?: number;
  /**
   * 累计消费次数大于值
   */
  gtTradeCount?: number;
  /**
   * 最近一次消费统计时间
   */
  lastTradeTime?: number;
  /**
   * 笔单价小于值
   */
  ltAvgTradeAmount?: number;
  /**
   * 会员余额小于值
   */
  ltBalance?: number;
  /**
   * 会员成长值小于值
   */
  ltCustomerGrowth?: number;
  /**
   * 会员积分小于值
   */
  ltPoint?: number;
  /**
   * 累计消费金额小于值
   */
  ltTradeAmount?: number;
  /**
   * 累计消费次数小于值
   */
  ltTradeCount?: number;
  /**
   * 最近无加购时间
   */
  noRecentCartTime?: number;
  /**
   * 最近无收藏时间
   */
  noRecentFavoriteTime?: number;
  /**
   * 最近无浏览时间
   */
  noRecentFlowTime?: number;
  /**
   * 最近无付款时间
   */
  noRecentPayTradeTime?: number;
  /**
   * 最近无下单时间
   */
  noRecentTradeTime?: number;
  /**
   * 最近有加购时间
   */
  recentCartTime?: number;
  /**
   * 最近有收藏时间
   */
  recentFavoriteTime?: number;
  /**
   * 最近有浏览时间
   */
  recentFlowTime?: number;
  /**
   * 最近有付款时间
   */
  recentPayTradeTime?: number;
  /**
   * 最近有下单时间
   */
  recentTradeTime?: number;
  /**
   * 所在地区
   */
  regionList?: RegionDTO[];
  /**
   * 累计消费金额统计时间
   */
  tradeAmountTime?: number;
  /**
   * 累计消费次数统计时间
   */
  tradeCountTime?: number;
  [k: string]: any;
}
export interface RegionDTO {
  /**
   * 省市id
   */
  regionId?: string;
  /**
   * 省市名称
   */
  regionName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageInfo«CustomGroupVo»".
 */
export interface PageInfoCustomGroupVo1 {
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: CustomGroupVo[];
  navigateFirstPage?: number;
  navigateLastPage?: number;
  navigatePages?: number;
  navigatepageNums?: number[];
  nextPage?: number;
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  prePage?: number;
  size?: number;
  startRow?: number;
  total?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomGroupVo".
 */
export interface CustomGroupVo1 {
  createPerson?: string;
  createTime?: string;
  customGroupDetail?: CustomGroupDetailVo;
  customerCount?: number;
  definition?: string;
  groupName?: string;
  id?: number;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomGroupDetailVo".
 */
export interface CustomGroupDetailVo1 {
  /**
   * 笔单价统计时间
   */
  avgTradeAmountTime?: number;
  /**
   * 会员等级
   */
  customerLevel?: number[];
  /**
   * 会员标签
   */
  customerTag?: number[];
  /**
   * 自定义分组名
   */
  groupName?: string;
  /**
   * 笔单价大于值
   */
  gtAvgTradeAmount?: number;
  /**
   * 会员余额大于值
   */
  gtBalance?: number;
  /**
   * 会员成长值大于值
   */
  gtCustomerGrowth?: number;
  /**
   * 会员积分大于值
   */
  gtPoint?: number;
  /**
   * 累计消费金额大于值
   */
  gtTradeAmount?: number;
  /**
   * 累计消费次数大于值
   */
  gtTradeCount?: number;
  /**
   * 最近一次消费统计时间
   */
  lastTradeTime?: number;
  /**
   * 笔单价小于值
   */
  ltAvgTradeAmount?: number;
  /**
   * 会员余额小于值
   */
  ltBalance?: number;
  /**
   * 会员成长值小于值
   */
  ltCustomerGrowth?: number;
  /**
   * 会员积分小于值
   */
  ltPoint?: number;
  /**
   * 累计消费金额小于值
   */
  ltTradeAmount?: number;
  /**
   * 累计消费次数小于值
   */
  ltTradeCount?: number;
  /**
   * 最近无加购时间
   */
  noRecentCartTime?: number;
  /**
   * 最近无收藏时间
   */
  noRecentFavoriteTime?: number;
  /**
   * 最近无浏览时间
   */
  noRecentFlowTime?: number;
  /**
   * 最近无付款时间
   */
  noRecentPayTradeTime?: number;
  /**
   * 最近无下单时间
   */
  noRecentTradeTime?: number;
  /**
   * 最近有加购时间
   */
  recentCartTime?: number;
  /**
   * 最近有收藏时间
   */
  recentFavoriteTime?: number;
  /**
   * 最近有浏览时间
   */
  recentFlowTime?: number;
  /**
   * 最近有付款时间
   */
  recentPayTradeTime?: number;
  /**
   * 最近有下单时间
   */
  recentTradeTime?: number;
  /**
   * 所在地区
   */
  regionList?: RegionDTO[];
  /**
   * 累计消费金额统计时间
   */
  tradeAmountTime?: number;
  /**
   * 累计消费次数统计时间
   */
  tradeCountTime?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RegionDTO".
 */
export interface RegionDTO1 {
  /**
   * 省市id
   */
  regionId?: string;
  /**
   * 省市名称
   */
  regionName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«PageInfo«CustomerDetailWithRfmValueVO»»".
 */
export interface BaseResponsePageInfoCustomerDetailWithRfmValueVO {
  /**
   * 结果码
   */
  code: string;
  context?: PageInfoCustomerDetailWithRfmValueVO;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface PageInfoCustomerDetailWithRfmValueVO {
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: CustomerDetailWithRfmValueVO[];
  navigateFirstPage?: number;
  navigateLastPage?: number;
  navigatePages?: number;
  navigatepageNums?: number[];
  nextPage?: number;
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  prePage?: number;
  size?: number;
  startRow?: number;
  total?: number;
  [k: string]: any;
}
export interface CustomerDetailWithRfmValueVO {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 平均分
   */
  avgScore?: number;
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
  customerVO?: CustomerVO;
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
 * 会员信息
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
  customerDetail?: CustomerDetailVO;
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
 * via the `definition` "PageInfo«CustomerDetailWithRfmValueVO»".
 */
export interface PageInfoCustomerDetailWithRfmValueVO1 {
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: CustomerDetailWithRfmValueVO[];
  navigateFirstPage?: number;
  navigateLastPage?: number;
  navigatePages?: number;
  navigatepageNums?: number[];
  nextPage?: number;
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  prePage?: number;
  size?: number;
  startRow?: number;
  total?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailWithRfmValueVO".
 */
export interface CustomerDetailWithRfmValueVO1 {
  /**
   * 年龄
   */
  age?: number;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 平均分
   */
  avgScore?: number;
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
  customerVO?: CustomerVO;
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
export interface CustomerVO1 {
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
  customerDetail?: CustomerDetailVO;
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
 * via the `definition` "CustomGroupByIdRequest".
 */
export interface CustomGroupByIdRequest {
  /**
   * id
   */
  id?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomGroupVo»".
 */
export interface BaseResponseCustomGroupVo {
  /**
   * 结果码
   */
  code: string;
  context?: CustomGroupVo2;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomGroupVo2 {
  createPerson?: string;
  createTime?: string;
  customGroupDetail?: CustomGroupDetailVo;
  customerCount?: number;
  definition?: string;
  groupName?: string;
  id?: number;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«RfmGroupStatisticsListResponse»".
 */
export interface BaseResponseRfmGroupStatisticsListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RfmGroupStatisticsListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface RfmGroupStatisticsListResponse {
  /**
   * 系统人群分页查询结果
   */
  rfmGroupStatisticsListResponse?: RfmgroupstatisticsDataVo[];
  [k: string]: any;
}
export interface RfmgroupstatisticsDataVo {
  customerNum?: number;
  groupAdvise?: string;
  groupDefinition?: string;
  groupId?: number;
  groupName?: string;
  id?: number;
  tradeNum?: number;
  uvNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RfmGroupStatisticsListResponse".
 */
export interface RfmGroupStatisticsListResponse1 {
  /**
   * 系统人群分页查询结果
   */
  rfmGroupStatisticsListResponse?: RfmgroupstatisticsDataVo[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RfmgroupstatisticsDataVo".
 */
export interface RfmgroupstatisticsDataVo1 {
  customerNum?: number;
  groupAdvise?: string;
  groupDefinition?: string;
  groupId?: number;
  groupName?: string;
  id?: number;
  tradeNum?: number;
  uvNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryCustomGroupPageRequestReq".
 */
export interface IQueryCustomGroupPageRequestReq {
  customerIds?: string[];
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
 * via the `definition` "IQueryCustomGroupInfoRequestReq".
 */
export interface IQueryCustomGroupInfoRequestReq {
  /**
   * id
   */
  id?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
