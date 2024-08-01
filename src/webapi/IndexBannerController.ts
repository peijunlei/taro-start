import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'IndexBannerController';

/**
 *
 * 优惠专区，品牌专区，配置查看
 *
 */
async function getMarketingArea(): Promise<IndexAdverPageResponse> {
  let result = await sdk.post<IndexAdverPageResponse>(
    '/indexbanner/getMarketingArea',

    {},
  );
  return result.context;
}

/**
 *
 * 查询首页启用中且未删除的banner
 *
 */
async function getValidBanner(): Promise<IndexBannerListResponse> {
  let result = await sdk.post<IndexBannerListResponse>(
    '/indexbanner/getValidBanner',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询移动端首页，单品滑动
 *
 */
async function getValidSingleSlider(): Promise<IndexSingleSliderPageResponse> {
  let result = await sdk.post<IndexSingleSliderPageResponse>(
    '/indexbanner/getValidSingleSlider',

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询移动端首页商品模块配置
 *
 */
async function getModule(): Promise<IndexModuleListResponse> {
  let result = await sdk.post<IndexModuleListResponse>(
    '/indexbanner/module',

    {},
  );
  return result.context;
}

export default {
  getMarketingArea,

  getValidBanner,

  getValidSingleSlider,

  getModule,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IndexAdverPageResponse»".
 */
export interface BaseResponseIndexAdverPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexAdverPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexAdverPageResponse {
  indexAdverVOPage?: MicroServicePageIndexAdverVO;
  [k: string]: any;
}
/**
 * 首页广告（新品众测，限时抢购）分页结果
 */
export interface MicroServicePageIndexAdverVO {
  /**
   * 具体数据内容
   */
  content?: IndexAdverVO[];
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
export interface IndexAdverVO {
  /**
   * adverImage
   */
  adverImage?: string;
  /**
   * App端路由地址
   */
  adverRoute?: string;
  /**
   * 标题
   */
  adverTitle?: string;
  /**
   * 类型：0新品众测，1限时抢购，3品牌专区banner
   */
  adverType?: number;
  /**
   * H5端链接
   */
  adverUrl?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 主键
   */
  indexAdverId?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexAdverPageResponse".
 */
export interface IndexAdverPageResponse1 {
  indexAdverVOPage?: MicroServicePageIndexAdverVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«IndexAdverVO»".
 */
export interface MicroServicePageIndexAdverVO1 {
  /**
   * 具体数据内容
   */
  content?: IndexAdverVO[];
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
 * via the `definition` "IndexAdverVO".
 */
export interface IndexAdverVO1 {
  /**
   * adverImage
   */
  adverImage?: string;
  /**
   * App端路由地址
   */
  adverRoute?: string;
  /**
   * 标题
   */
  adverTitle?: string;
  /**
   * 类型：0新品众测，1限时抢购，3品牌专区banner
   */
  adverType?: number;
  /**
   * H5端链接
   */
  adverUrl?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 主键
   */
  indexAdverId?: string;
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
 * via the `definition` "BaseResponse«IndexBannerListResponse»".
 */
export interface BaseResponseIndexBannerListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexBannerListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexBannerListResponse {
  /**
   * 移动端首页banner列表结果
   */
  indexBannerVOList?: IndexBannerVO[];
  [k: string]: any;
}
export interface IndexBannerVO {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * 排序
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 主键
   */
  indexBannerId?: string;
  /**
   * App端路由链接
   */
  route?: string;
  /**
   * 状态：0未启用，1启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  state?: 0 | 1;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * H5链接
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexBannerListResponse".
 */
export interface IndexBannerListResponse1 {
  /**
   * 移动端首页banner列表结果
   */
  indexBannerVOList?: IndexBannerVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexBannerVO".
 */
export interface IndexBannerVO1 {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * 排序
   */
  bannerSort?: number;
  /**
   * 标题
   */
  bannerTitle?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 主键
   */
  indexBannerId?: string;
  /**
   * App端路由链接
   */
  route?: string;
  /**
   * 状态：0未启用，1启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  state?: 0 | 1;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * H5链接
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IndexSingleSliderPageResponse»".
 */
export interface BaseResponseIndexSingleSliderPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexSingleSliderPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexSingleSliderPageResponse {
  indexSingleSliderVOPage?: MicroServicePageIndexSingleSliderVO;
  [k: string]: any;
}
/**
 * 移动端首页，单品滑动分页结果
 */
export interface MicroServicePageIndexSingleSliderVO {
  /**
   * 具体数据内容
   */
  content?: IndexSingleSliderVO[];
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
export interface IndexSingleSliderVO {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 主键
   */
  singleSliderId?: string;
  /**
   * 排序
   */
  singleSliderSort?: number;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Sort2 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexSingleSliderPageResponse".
 */
export interface IndexSingleSliderPageResponse1 {
  indexSingleSliderVOPage?: MicroServicePageIndexSingleSliderVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«IndexSingleSliderVO»".
 */
export interface MicroServicePageIndexSingleSliderVO1 {
  /**
   * 具体数据内容
   */
  content?: IndexSingleSliderVO[];
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
 * via the `definition` "IndexSingleSliderVO".
 */
export interface IndexSingleSliderVO1 {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 主键
   */
  singleSliderId?: string;
  /**
   * 排序
   */
  singleSliderSort?: number;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IndexModuleListResponse»".
 */
export interface BaseResponseIndexModuleListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexModuleListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexModuleListResponse {
  /**
   * 移动端首页商品模块配置列表结果
   */
  indexModuleVOList?: IndexModuleVO[];
  [k: string]: any;
}
export interface IndexModuleVO {
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 主键
   */
  indexModuleId?: string;
  /**
   * 关联SPU信息列表
   */
  indexModuleSpuVOList?: IndexModuleSpuVO[];
  /**
   * 模块封面图
   */
  moduleImage?: string;
  /**
   * 模块标题
   */
  moduleName?: string;
  /**
   * 排序
   */
  moduleSort?: number;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface IndexModuleSpuVO {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * spuId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 首页模块id
   */
  indexModuleId?: string;
  /**
   * indexModuleSort
   */
  indexModuleSort?: number;
  /**
   * 主键
   */
  indexModuleSpuId?: string;
  /**
   * 更新id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexModuleListResponse".
 */
export interface IndexModuleListResponse1 {
  /**
   * 移动端首页商品模块配置列表结果
   */
  indexModuleVOList?: IndexModuleVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexModuleVO".
 */
export interface IndexModuleVO1 {
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 主键
   */
  indexModuleId?: string;
  /**
   * 关联SPU信息列表
   */
  indexModuleSpuVOList?: IndexModuleSpuVO[];
  /**
   * 模块封面图
   */
  moduleImage?: string;
  /**
   * 模块标题
   */
  moduleName?: string;
  /**
   * 排序
   */
  moduleSort?: number;
  /**
   * 更新人id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexModuleSpuVO".
 */
export interface IndexModuleSpuVO1 {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人id
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * spuId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 首页模块id
   */
  indexModuleId?: string;
  /**
   * indexModuleSort
   */
  indexModuleSort?: number;
  /**
   * 主键
   */
  indexModuleSpuId?: string;
  /**
   * 更新id
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
