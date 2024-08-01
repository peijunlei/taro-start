import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'IndexController';

/**
 *
 * 分页查询移动端首页模块关联spuId的集合
 *
 */
async function getIndexModuleSpus(
  request: IGetIndexModuleSpusRequestReq,
): Promise<IndexModuleSpuIdResponse> {
  let result = await sdk.post<IndexModuleSpuIdResponse>(
    '/index/indexModuleSpuIds',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询首页初始化数据
 *
 */
async function init(request: IInitRequestReq): Promise<IndexResponse> {
  let result = await sdk.post<IndexResponse>(
    '/index/init',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询爆款推荐SPU编号集合
 *
 */
async function listAllForIndexHotSpu(): Promise<
  IndexHotSpuListAllForIndexResponse
> {
  let result = await sdk.post<IndexHotSpuListAllForIndexResponse>(
    '/index/list-all-for-index-hot-spu',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询分类商品列表
 *
 */
async function pageCateGoodsForIndex(
  request: IPageCateGoodsForIndexRequestReq,
): Promise<IndexPageCateGoodsResponse> {
  let result = await sdk.post<IndexPageCateGoodsResponse>(
    '/index/page-cate-goods',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询分类商品列表
 *
 */
async function pageCateGoodsForIndexWithLogin(
  request: IPageCateGoodsForIndexWithLoginRequestReq,
): Promise<IndexPageCateGoodsResponse> {
  let result = await sdk.post<IndexPageCateGoodsResponse>(
    '/index/page-cate-goods-with-login',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getIndexModuleSpus,

  init,

  listAllForIndexHotSpu,

  pageCateGoodsForIndex,

  pageCateGoodsForIndexWithLogin,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexModuleSpuListRequest".
 */
export interface IndexModuleSpuListRequest {
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
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
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
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
   * 批量查询-主键List
   */
  indexModuleSpuIdList?: string[];
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
   * spuId
   */
  spuId?: string;
  token?: string;
  /**
   * 更新id
   */
  updatePerson?: string;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IndexModuleSpuIdResponse»".
 */
export interface BaseResponseIndexModuleSpuIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexModuleSpuIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexModuleSpuIdResponse {
  spuIds?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexModuleSpuIdResponse".
 */
export interface IndexModuleSpuIdResponse1 {
  spuIds?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexRequest".
 */
export interface IndexRequest {
  /**
   * 精准类型
   */
  accurateType?: string;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 终端类型
   * * PUSH: 地推
   * * KYW_APP: 康友为APP
   * * KYW_H5: 康友为H5
   * * KYW_PC: 康友为PC商城
   * * KYW_PC_WEB: 康友为PC官网
   * * YKS_APP: 悦康送APP
   * * YKS_H5: 悦康送H5
   * * YKS_PC: 悦康送PC商城
   * * YKS_PC_WEB: 悦康送PC官网
   */
  terminalType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IndexResponse»".
 */
export interface BaseResponseIndexResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexResponse {
  /**
   * 友为头条列表
   */
  articleInfoForIndexVOList?: ArticleInfoForIndexVO[];
  /**
   * 友课列表
   */
  articleInfoVideoForIndexVOList?: ArticleInfoForIndexVO1[];
  /**
   * 获取新品众测、限时抢购、品牌专区背景图
   */
  indexAdverForIndexVOList?: IndexAdverForIndexVO[];
  /**
   * 动态banner列表
   */
  indexBannerList?: IndexBannerBaseVO[];
  /**
   * 获取品牌专区
   */
  indexBrandForIndexVOList?: IndexBrandForIndexVO[];
  /**
   * 移动端首页分类配置列表结果
   */
  indexCateVOList?: IndexCateForIndexVO[];
  indexFixBannerForIndexVO?: IndexFixBannerForIndexVO;
  /**
   * 获取爆款推荐列表
   */
  indexHotSpuForIndexVOList?: IndexHotSpuForIndexVO[];
  /**
   * 获取商品模块列表（6张图）
   */
  indexModuleForIndexVOList?: IndexModuleForIndexVO[];
  /**
   * 单品滑动列表
   */
  indexSingleSliderForIndexVOList?: IndexSingleSliderForIndexVO[];
  [k: string]: any;
}
export interface ArticleInfoForIndexVO {
  /**
   * 封面图片
   */
  articleCoverSource?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 推荐类型 0商品 1内容
   * * GOODS: 0: 商品
   * * CONTENT: 1: 内容
   */
  articleRecommendType?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 是否置顶（0：否；1：是）
   * * NO: 否
   * * YES: 是
   */
  articleType?: 0 | 1;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 时长
   */
  contentSourceDuration?: string;
  /**
   * 内容状态（0：禁用；1：草稿；2：已发表 3：已提交）
   * * FORBIDDEN: 0：禁用
   * * DRAFT: 1：草稿
   * * PUBLISHED: 2：已发表
   * * SUBMIT: 3：已提交
   */
  contentState?: 0 | 1 | 2 | 3;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
export interface ArticleInfoForIndexVO1 {
  /**
   * 封面图片
   */
  articleCoverSource?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 推荐类型 0商品 1内容
   * * GOODS: 0: 商品
   * * CONTENT: 1: 内容
   */
  articleRecommendType?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 是否置顶（0：否；1：是）
   * * NO: 否
   * * YES: 是
   */
  articleType?: 0 | 1;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 时长
   */
  contentSourceDuration?: string;
  /**
   * 内容状态（0：禁用；1：草稿；2：已发表 3：已提交）
   * * FORBIDDEN: 0：禁用
   * * DRAFT: 1：草稿
   * * PUBLISHED: 2：已发表
   * * SUBMIT: 3：已提交
   */
  contentState?: 0 | 1 | 2 | 3;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
export interface IndexAdverForIndexVO {
  /**
   * adverImage
   */
  adverImage?: string;
  /**
   * App端路由地址
   */
  adverRoute?: string;
  /**
   * 类型：0新品众测，1限时抢购，3品牌专区banner
   */
  adverType?: number;
  /**
   * H5端链接
   */
  adverUrl?: string;
  [k: string]: any;
}
export interface IndexBannerBaseVO {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * 排序
   */
  bannerSort?: number;
  /**
   * App端路由链接
   */
  route?: string;
  /**
   * H5链接
   */
  url?: string;
  [k: string]: any;
}
export interface IndexBrandForIndexVO {
  /**
   * 品牌id
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 品牌logo
   */
  logo?: string;
  [k: string]: any;
}
export interface IndexCateForIndexVO {
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 主键
   */
  indexCateId?: string;
  [k: string]: any;
}
/**
 * 获取固定banner
 */
export interface IndexFixBannerForIndexVO {
  /**
   * 图片链接
   */
  bannerImage?: string;
  /**
   * App路由链接
   */
  bannerRoute?: string;
  /**
   * H5端链接地址
   */
  bannerUrl?: string;
  [k: string]: any;
}
export interface IndexHotSpuForIndexVO {
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  [k: string]: any;
}
export interface IndexModuleForIndexVO {
  /**
   * 主键
   */
  indexModuleId?: string;
  /**
   * 模块封面图
   */
  moduleImage?: string;
  [k: string]: any;
}
export interface IndexSingleSliderForIndexVO {
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexResponse".
 */
export interface IndexResponse1 {
  /**
   * 友为头条列表
   */
  articleInfoForIndexVOList?: ArticleInfoForIndexVO[];
  /**
   * 友课列表
   */
  articleInfoVideoForIndexVOList?: ArticleInfoForIndexVO1[];
  /**
   * 获取新品众测、限时抢购、品牌专区背景图
   */
  indexAdverForIndexVOList?: IndexAdverForIndexVO[];
  /**
   * 动态banner列表
   */
  indexBannerList?: IndexBannerBaseVO[];
  /**
   * 获取品牌专区
   */
  indexBrandForIndexVOList?: IndexBrandForIndexVO[];
  /**
   * 移动端首页分类配置列表结果
   */
  indexCateVOList?: IndexCateForIndexVO[];
  indexFixBannerForIndexVO?: IndexFixBannerForIndexVO;
  /**
   * 获取爆款推荐列表
   */
  indexHotSpuForIndexVOList?: IndexHotSpuForIndexVO[];
  /**
   * 获取商品模块列表（6张图）
   */
  indexModuleForIndexVOList?: IndexModuleForIndexVO[];
  /**
   * 单品滑动列表
   */
  indexSingleSliderForIndexVOList?: IndexSingleSliderForIndexVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoForIndexVO".
 */
export interface ArticleInfoForIndexVO2 {
  /**
   * 封面图片
   */
  articleCoverSource?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 推荐类型 0商品 1内容
   * * GOODS: 0: 商品
   * * CONTENT: 1: 内容
   */
  articleRecommendType?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 是否置顶（0：否；1：是）
   * * NO: 否
   * * YES: 是
   */
  articleType?: 0 | 1;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 时长
   */
  contentSourceDuration?: string;
  /**
   * 内容状态（0：禁用；1：草稿；2：已发表 3：已提交）
   * * FORBIDDEN: 0：禁用
   * * DRAFT: 1：草稿
   * * PUBLISHED: 2：已发表
   * * SUBMIT: 3：已提交
   */
  contentState?: 0 | 1 | 2 | 3;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexAdverForIndexVO".
 */
export interface IndexAdverForIndexVO1 {
  /**
   * adverImage
   */
  adverImage?: string;
  /**
   * App端路由地址
   */
  adverRoute?: string;
  /**
   * 类型：0新品众测，1限时抢购，3品牌专区banner
   */
  adverType?: number;
  /**
   * H5端链接
   */
  adverUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexBannerBaseVO".
 */
export interface IndexBannerBaseVO1 {
  /**
   * 图片
   */
  bannerImage?: string;
  /**
   * 排序
   */
  bannerSort?: number;
  /**
   * App端路由链接
   */
  route?: string;
  /**
   * H5链接
   */
  url?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexBrandForIndexVO".
 */
export interface IndexBrandForIndexVO1 {
  /**
   * 品牌id
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 品牌logo
   */
  logo?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexCateForIndexVO".
 */
export interface IndexCateForIndexVO1 {
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 主键
   */
  indexCateId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexFixBannerForIndexVO".
 */
export interface IndexFixBannerForIndexVO1 {
  /**
   * 图片链接
   */
  bannerImage?: string;
  /**
   * App路由链接
   */
  bannerRoute?: string;
  /**
   * H5端链接地址
   */
  bannerUrl?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexHotSpuForIndexVO".
 */
export interface IndexHotSpuForIndexVO1 {
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexModuleForIndexVO".
 */
export interface IndexModuleForIndexVO1 {
  /**
   * 主键
   */
  indexModuleId?: string;
  /**
   * 模块封面图
   */
  moduleImage?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexSingleSliderForIndexVO".
 */
export interface IndexSingleSliderForIndexVO1 {
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IndexHotSpuListAllForIndexResponse»".
 */
export interface BaseResponseIndexHotSpuListAllForIndexResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexHotSpuListAllForIndexResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexHotSpuListAllForIndexResponse {
  /**
   * 爆款推荐集合
   */
  list?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexHotSpuListAllForIndexResponse".
 */
export interface IndexHotSpuListAllForIndexResponse1 {
  /**
   * 爆款推荐集合
   */
  list?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexCateSpuPageForIndexRequest".
 */
export interface IndexCateSpuPageForIndexRequest {
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 首页分类id
   */
  indexCateId?: string;
  /**
   * 主键
   */
  indexCateSpuId?: string;
  /**
   * 批量查询-主键List
   */
  indexCateSpuIdList?: string[];
  /**
   * 排序
   */
  indexCateSpuSort?: number;
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
   * spuId
   */
  spuId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«IndexPageCateGoodsResponse»".
 */
export interface BaseResponseIndexPageCateGoodsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: IndexPageCateGoodsResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface IndexPageCateGoodsResponse {
  indexCateSpuForIndexVOList?: MicroServicePageIndexCateSpuForIndexVO;
  [k: string]: any;
}
/**
 * 分类商品列表
 */
export interface MicroServicePageIndexCateSpuForIndexVO {
  /**
   * 具体数据内容
   */
  content?: IndexCateSpuForIndexVO[];
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
export interface IndexCateSpuForIndexVO {
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * SKU市场价
   */
  marketPrice?: number;
  /**
   * 商品类型  1 药品  2 非药品
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexPageCateGoodsResponse".
 */
export interface IndexPageCateGoodsResponse1 {
  indexCateSpuForIndexVOList?: MicroServicePageIndexCateSpuForIndexVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«IndexCateSpuForIndexVO»".
 */
export interface MicroServicePageIndexCateSpuForIndexVO1 {
  /**
   * 具体数据内容
   */
  content?: IndexCateSpuForIndexVO[];
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
 * via the `definition` "IndexCateSpuForIndexVO".
 */
export interface IndexCateSpuForIndexVO1 {
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * goodsId
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * SKU市场价
   */
  marketPrice?: number;
  /**
   * 商品类型  1 药品  2 非药品
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
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
 * via the `definition` "IGetIndexModuleSpusRequestReq".
 */
export interface IGetIndexModuleSpusRequestReq {
  /**
   * 创建人id
   */
  createPerson?: string;
  /**
   * 搜索条件:创建时间开始
   */
  createTimeBegin?: string;
  /**
   * 搜索条件:创建时间截止
   */
  createTimeEnd?: string;
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
   * 搜索条件:删除时间开始
   */
  delTimeBegin?: string;
  /**
   * 搜索条件:删除时间截止
   */
  delTimeEnd?: string;
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
   * 批量查询-主键List
   */
  indexModuleSpuIdList?: string[];
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
   * spuId
   */
  spuId?: string;
  token?: string;
  /**
   * 更新id
   */
  updatePerson?: string;
  /**
   * 搜索条件:更新时间开始
   */
  updateTimeBegin?: string;
  /**
   * 搜索条件:更新时间截止
   */
  updateTimeEnd?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInitRequestReq".
 */
export interface IInitRequestReq {
  /**
   * 精准类型
   */
  accurateType?: string;
  /**
   * 内容类型（0：文章（友群、友课）；1：视频（友群、友课）；2：音频）
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * 终端类型
   * * PUSH: 地推
   * * KYW_APP: 康友为APP
   * * KYW_H5: 康友为H5
   * * KYW_PC: 康友为PC商城
   * * KYW_PC_WEB: 康友为PC官网
   * * YKS_APP: 悦康送APP
   * * YKS_H5: 悦康送H5
   * * YKS_PC: 悦康送PC商城
   * * YKS_PC_WEB: 悦康送PC官网
   */
  terminalType?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageCateGoodsForIndexRequestReq".
 */
export interface IPageCateGoodsForIndexRequestReq {
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 首页分类id
   */
  indexCateId?: string;
  /**
   * 主键
   */
  indexCateSpuId?: string;
  /**
   * 批量查询-主键List
   */
  indexCateSpuIdList?: string[];
  /**
   * 排序
   */
  indexCateSpuSort?: number;
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
   * spuId
   */
  spuId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageCateGoodsForIndexWithLoginRequestReq".
 */
export interface IPageCateGoodsForIndexWithLoginRequestReq {
  /**
   * 删除标记，0未删除，1已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 首页分类id
   */
  indexCateId?: string;
  /**
   * 主键
   */
  indexCateSpuId?: string;
  /**
   * 批量查询-主键List
   */
  indexCateSpuIdList?: string[];
  /**
   * 排序
   */
  indexCateSpuSort?: number;
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
   * spuId
   */
  spuId?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
