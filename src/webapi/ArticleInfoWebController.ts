import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'ArticleInfoWebController';

/**
 *
 * 新增 内容信息-友群
 *
 */
async function addGroupon(
  addReq: IAddGrouponAddReqReq,
): Promise<ArticleInfoAddGrouponResponse> {
  let result = await sdk.post<ArticleInfoAddGrouponResponse>(
    '/articleinfo/web/add-groupon',

    {
      ...addReq,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询 内容信息
 *
 */
async function getClassIndexPage(
  request: IGetClassIndexPageRequestReq,
): Promise<ArticleInfoVOPageResponse> {
  let result = await sdk.post<ArticleInfoVOPageResponse>(
    '/articleinfo/web/friendClass/article',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友群首页 友为学院
 *
 */
async function getFriendClassIndexCates(): Promise<
  ArticleInfoCatesWithListResponse
> {
  let result = await sdk.post<ArticleInfoCatesWithListResponse>(
    '/articleinfo/web/friendClass/indexCates',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询 内容信息
 *
 */
async function getFriendDynamicPage(
  request: IGetFriendDynamicPageRequestReq,
): Promise<ArticleInfoVOPageResponse> {
  let result = await sdk.post<ArticleInfoVOPageResponse>(
    '/articleinfo/web/friendDynamic/article',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询 内容信息
 *
 */
async function getIndexPage(
  request: IGetIndexPageRequestReq,
): Promise<ArticleInfoVOPageResponse> {
  let result = await sdk.post<ArticleInfoVOPageResponse>(
    '/articleinfo/web/groupIndex/article',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 友群首页 热门友课
 *
 */
async function getHotArticleInfo(): Promise<ArticleInfoListResponse> {
  let result = await sdk.post<ArticleInfoListResponse>(
    '/articleinfo/web/hot/articleInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 友群首页 热门友群
 *
 */
async function getHotGroupCate(): Promise<GroupCateListResponse> {
  let result = await sdk.post<GroupCateListResponse>(
    '/articleinfo/web/hot/groupCate',

    {},
  );
  return result.context;
}

/**
 *
 * 友群首页 热门友课
 *
 */
async function getHotArticleInfoPage(
  hotArticleInfoRequest: IGetHotArticleInfoPageHotArticleInfoRequestReq,
): Promise<ArticleInfoListResponse> {
  let result = await sdk.post<ArticleInfoListResponse>(
    '/articleinfo/web/hot/list',

    {
      ...hotArticleInfoRequest,
    },
  );
  return result.context;
}

/**
 *
 * 内容分享、浏览次数加1
 *
 */
async function increaseArticleInfoNum(
  request: IIncreaseArticleInfoNumRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/articleinfo/web/increaseArticleInfoNum',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 最新三条资讯--文章/视频
 *
 */
async function getLatestThree(
  listReq: IGetLatestThreeListReqReq,
): Promise<ArticleInfoPageResponse> {
  let result = await sdk.post<ArticleInfoPageResponse>(
    '/articleinfo/web/latestThree',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 列表查询 内容信息
 *
 */
async function getList(
  listReq: IGetListListReqReq,
): Promise<ArticleInfoListResponse> {
  let result = await sdk.post<ArticleInfoListResponse>(
    '/articleinfo/web/list',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询帖子详情信息(未登录)
 *
 */
async function getPostsById(
  id: IGetPostsByIdIdReq,
): Promise<ArticleInfoPostsByIdResponse> {
  let result = await sdk.get<ArticleInfoPostsByIdResponse>(
    '/articleinfo/web/notLogged/posts/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询内容是否点赞是否收藏(未登录)
 *
 */
async function getRelaInfoById(
  id: IGetRelaInfoByIdIdReq,
): Promise<ArticleRelaInfoByArticleInfoIdResponse> {
  let result = await sdk.get<ArticleRelaInfoByArticleInfoIdResponse>(
    '/articleinfo/web/notLogged/rela/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 友群首页 友为学院
 *
 */
async function getOldestCateWithList(): Promise<
  ArticleInfoCateWithListResponse
> {
  let result = await sdk.post<ArticleInfoCateWithListResponse>(
    '/articleinfo/web/oldest/cateWithList',

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询 内容信息
 *
 */
async function getPage(
  pageReq: IGetPagePageReqReq,
): Promise<ArticleInfoPageResponse> {
  let result = await sdk.post<ArticleInfoPageResponse>(
    '/articleinfo/web/page',

    {
      ...pageReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询帖子详情信息(已登录)
 *
 */
async function getPostsLoggedById(
  id: IGetPostsLoggedByIdIdReq,
): Promise<ArticleInfoPostsByIdResponse> {
  let result = await sdk.get<ArticleInfoPostsByIdResponse>(
    '/articleinfo/web/posts/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * es查询文章列表
 *
 */
async function queryArticleInfo(
  request: IQueryArticleInfoRequestReq,
): Promise<EsArticleInfoResponse> {
  let result = await sdk.post<EsArticleInfoResponse>(
    '/articleinfo/web/queryArticleInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 根据id查询内容推荐信息
 *
 */
async function getRecommendInfoById(
  id: IGetRecommendInfoByIdIdReq,
): Promise<ArticleRecommendInfoByArticleInfoIdResponse> {
  let result = await sdk.get<ArticleRecommendInfoByArticleInfoIdResponse>(
    '/articleinfo/web/recommend/info/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 推荐您感兴趣的课程--es查询文章列表
 *
 */
async function queryRecomonInterArticleInfo(
  request: IQueryRecomonInterArticleInfoRequestReq,
): Promise<EsArticleInfoResponse> {
  let result = await sdk.post<EsArticleInfoResponse>(
    '/articleinfo/web/recomonInterClass/queryArticleInfo',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询内容是否点赞是否收藏(已登录)
 *
 */
async function getRelaInfoLoggedById(
  id: IGetRelaInfoLoggedByIdIdReq,
): Promise<ArticleRelaInfoByArticleInfoIdResponse> {
  let result = await sdk.get<ArticleRelaInfoByArticleInfoIdResponse>(
    '/articleinfo/web/rela/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 列表查询 内容信息
 *
 */
async function showListLimit(
  listReq: IShowListLimitListReqReq,
): Promise<ArticleInfoListResponse> {
  let result = await sdk.post<ArticleInfoListResponse>(
    '/articleinfo/web/showListLimit',

    {
      ...listReq,
    },
  );
  return result.context;
}

/**
 *
 * 根据id删除 内容信息
 *
 */
async function deleteById_(id: IDeleteById_IdReq): Promise<unknown> {
  let result = await sdk.deleteF(
    '/articleinfo/web/{id}'.replace('{id}', id + ''),

    {},
  );
  return result.context;
}

export default {
  addGroupon,

  getClassIndexPage,

  getFriendClassIndexCates,

  getFriendDynamicPage,

  getIndexPage,

  getHotArticleInfo,

  getHotGroupCate,

  getHotArticleInfoPage,

  increaseArticleInfoNum,

  getLatestThree,

  getList,

  getPostsById,

  getRelaInfoById,

  getOldestCateWithList,

  getPage,

  getPostsLoggedById,

  queryArticleInfo,

  getRecommendInfoById,

  queryRecomonInterArticleInfo,

  getRelaInfoLoggedById,

  showListLimit,

  deleteById_,
};

/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPostsByIdIdReq".
 */
export type IGetPostsByIdIdReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetRelaInfoByIdIdReq".
 */
export type IGetRelaInfoByIdIdReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetPostsLoggedByIdIdReq".
 */
export type IGetPostsLoggedByIdIdReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetRecommendInfoByIdIdReq".
 */
export type IGetRecommendInfoByIdIdReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetRelaInfoLoggedByIdIdReq".
 */
export type IGetRelaInfoLoggedByIdIdReq = string;
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteById_IdReq".
 */
export type IDeleteById_IdReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoAddGrouponRequest".
 */
export interface ArticleInfoAddGrouponRequest {
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 推荐
   */
  articleRecommends?: string[];
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleInfoAddGrouponResponse»".
 */
export interface BaseResponseArticleInfoAddGrouponResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleInfoAddGrouponResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleInfoAddGrouponResponse {
  articleInfoVO?: ArticleInfoVO;
  [k: string]: any;
}
/**
 * 已新增的 内容信息信息
 */
export interface ArticleInfoVO {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface ArticleCateVO {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 更新时间
   */
  deleteTime?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface CustomerArticleCommentVO {
  /**
   * 评论内容
   */
  articleCommentDetail?: string;
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 评论时间(处理后)
   */
  commentTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 全部回复
   */
  customerArticleReplyVOList?: CustomerArticleReplyVO[];
  /**
   * 会员Id-评论人
   */
  customerId?: string;
  /**
   * 评论人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 评论人头像
   */
  headPicture?: string;
  /**
   * 是否关注该评论用户; 0: 否；1：是
   * * NO: 否
   * * YES: 是
   */
  isFollow?: 0 | 1;
  /**
   * 是否是热门评论，0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isHot?: 0 | 1;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被评论人
   */
  relCustomerId?: string;
  /**
   * 回复数
   */
  replyNum?: number;
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
export interface CustomerArticleReplyVO {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 回复人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复人头像
   */
  headPicture?: string;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 回复人姓名
   */
  relCustomerName?: string;
  /**
   * 回复人头像
   */
  relHeadPicture?: string;
  /**
   * 回复时间(处理后)
   */
  replyTime?: string;
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
 * via the `definition` "ArticleInfoAddGrouponResponse".
 */
export interface ArticleInfoAddGrouponResponse1 {
  articleInfoVO?: ArticleInfoVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoVO".
 */
export interface ArticleInfoVO1 {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
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
 * via the `definition` "ArticleCateVO".
 */
export interface ArticleCateVO1 {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 更新时间
   */
  deleteTime?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改人
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
 * via the `definition` "CustomerArticleCommentVO".
 */
export interface CustomerArticleCommentVO1 {
  /**
   * 评论内容
   */
  articleCommentDetail?: string;
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 评论时间(处理后)
   */
  commentTime?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 全部回复
   */
  customerArticleReplyVOList?: CustomerArticleReplyVO[];
  /**
   * 会员Id-评论人
   */
  customerId?: string;
  /**
   * 评论人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 评论人头像
   */
  headPicture?: string;
  /**
   * 是否关注该评论用户; 0: 否；1：是
   * * NO: 否
   * * YES: 是
   */
  isFollow?: 0 | 1;
  /**
   * 是否是热门评论，0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isHot?: 0 | 1;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被评论人
   */
  relCustomerId?: string;
  /**
   * 回复数
   */
  replyNum?: number;
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
 * via the `definition` "CustomerArticleReplyVO".
 */
export interface CustomerArticleReplyVO1 {
  /**
   * 内容Id
   */
  articleInfoId?: string;
  /**
   * 回复内容
   */
  articleReplyDetail?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 评论id
   */
  customerArticleCommentId?: string;
  /**
   * 回复id
   */
  customerArticleReplyId?: string;
  /**
   * 会员Id-回复人
   */
  customerId?: string;
  /**
   * 回复人姓名
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 回复人头像
   */
  headPicture?: string;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  /**
   * 会员Id-被回复人
   */
  relCustomerId?: string;
  /**
   * 回复人姓名
   */
  relCustomerName?: string;
  /**
   * 回复人头像
   */
  relHeadPicture?: string;
  /**
   * 回复时间(处理后)
   */
  replyTime?: string;
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
 * via the `definition` "EsArticleInfoQueryRequest".
 */
export interface EsArticleInfoQueryRequest {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder[];
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
  [k: string]: any;
}
export interface AggregationBuilder {
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  [k: string]: any;
}
export interface SortBuilder {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AggregationBuilder".
 */
export interface AggregationBuilder1 {
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SortBuilder".
 */
export interface SortBuilder1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleInfoVOPageResponse»".
 */
export interface BaseResponseArticleInfoVOPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleInfoVOPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleInfoVOPageResponse {
  articleInfoVOPage?: PageArticleInfoVO;
  [k: string]: any;
}
/**
 * CMS 内容返回页面
 */
export interface PageArticleInfoVO {
  content?: ArticleInfoVO2[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface ArticleInfoVO2 {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Sort {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoVOPageResponse".
 */
export interface ArticleInfoVOPageResponse1 {
  articleInfoVOPage?: PageArticleInfoVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«ArticleInfoVO»".
 */
export interface PageArticleInfoVO1 {
  content?: ArticleInfoVO2[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
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
 * via the `definition` "BaseResponse«ArticleInfoCatesWithListResponse»".
 */
export interface BaseResponseArticleInfoCatesWithListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleInfoCatesWithListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleInfoCatesWithListResponse {
  /**
   * 分类内容列表
   */
  articleInfoCateWithListResponseList?: ArticleInfoCateWithListResponse[];
  [k: string]: any;
}
export interface ArticleInfoCateWithListResponse {
  articleCateVO?: ArticleCateVO2;
  /**
   *  内容信息列表结果
   */
  articleCateVOVideoList?: ArticleInfoVO3[];
  [k: string]: any;
}
/**
 * 内容分类
 */
export interface ArticleCateVO2 {
  /**
   * 分类层级
   */
  cateGrade?: number;
  /**
   * 文章分类主键
   */
  cateId?: string;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父分类ID
   */
  cateParentId?: string;
  /**
   * 分类层次路径,例1|01|001
   */
  catePath?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 更新时间
   */
  deleteTime?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface ArticleInfoVO3 {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
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
 * via the `definition` "ArticleInfoCatesWithListResponse".
 */
export interface ArticleInfoCatesWithListResponse1 {
  /**
   * 分类内容列表
   */
  articleInfoCateWithListResponseList?: ArticleInfoCateWithListResponse[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoCateWithListResponse".
 */
export interface ArticleInfoCateWithListResponse1 {
  articleCateVO?: ArticleCateVO2;
  /**
   *  内容信息列表结果
   */
  articleCateVOVideoList?: ArticleInfoVO3[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleInfoListResponse»".
 */
export interface BaseResponseArticleInfoListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleInfoListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleInfoListResponse {
  /**
   *  内容信息列表结果
   */
  articleInfoVOList?: ArticleInfoVO4[];
  [k: string]: any;
}
export interface ArticleInfoVO4 {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
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
 * via the `definition` "ArticleInfoListResponse".
 */
export interface ArticleInfoListResponse1 {
  /**
   *  内容信息列表结果
   */
  articleInfoVOList?: ArticleInfoVO4[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GroupCateListResponse»".
 */
export interface BaseResponseGroupCateListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GroupCateListResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface GroupCateListResponse {
  /**
   * 友群分类列表
   */
  list?: GroupCateVO[];
  [k: string]: any;
}
export interface GroupCateVO {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateListResponse".
 */
export interface GroupCateListResponse1 {
  /**
   * 友群分类列表
   */
  list?: GroupCateVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GroupCateVO".
 */
export interface GroupCateVO1 {
  /**
   * 发帖数量
   */
  articleNum?: number;
  /**
   * 粉丝数量
   */
  funNum?: number;
  /**
   * 友群分类介绍
   */
  groupCateDesc?: string;
  /**
   * 友群分类图标
   */
  groupCateIcon?: string;
  /**
   * 友群分类Id
   */
  groupCateId?: string;
  /**
   * 友群分类背景图
   */
  groupCateImage?: string;
  /**
   * 友群分类名称
   */
  groupCateName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "HotArticleInfoRequest".
 */
export interface HotArticleInfoRequest {
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
 * via the `definition` "ArticleInfoIncreaseNumRequest".
 */
export interface ArticleInfoIncreaseNumRequest {
  /**
   * id
   */
  articleInfoId?: string;
  increaseType?: '0' | '1';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoPageRequest".
 */
export interface ArticleInfoPageRequest {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
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
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 发布人-对应C端customerid
   */
  releasePerson?: string;
  /**
   * 搜索条件:发布时间开始
   */
  releaseTimeBegin?: string;
  /**
   * 搜索条件:发布时间截止
   */
  releaseTimeEnd?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
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
   * 点赞总数
   */
  starTotal?: number;
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 更新人
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
 * via the `definition` "BaseResponse«ArticleInfoPageResponse»".
 */
export interface BaseResponseArticleInfoPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleInfoPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleInfoPageResponse {
  articleInfoVOPage?: MicroServicePageArticleInfoVO;
  [k: string]: any;
}
/**
 *  内容信息分页结果
 */
export interface MicroServicePageArticleInfoVO {
  /**
   * 具体数据内容
   */
  content?: ArticleInfoVO5[];
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
export interface ArticleInfoVO5 {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
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
 * via the `definition` "ArticleInfoPageResponse".
 */
export interface ArticleInfoPageResponse1 {
  articleInfoVOPage?: MicroServicePageArticleInfoVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«ArticleInfoVO»".
 */
export interface MicroServicePageArticleInfoVO1 {
  /**
   * 具体数据内容
   */
  content?: ArticleInfoVO5[];
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
 * via the `definition` "ArticleInfoListRequest".
 */
export interface ArticleInfoListRequest {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
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
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 发布人-对应C端customerid
   */
  releasePerson?: string;
  /**
   * 搜索条件:发布时间开始
   */
  releaseTimeBegin?: string;
  /**
   * 搜索条件:发布时间截止
   */
  releaseTimeEnd?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 是否根据浏览量排序
   */
  sortByBrowseTotal?: boolean;
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
   * 点赞总数
   */
  starTotal?: number;
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 更新人
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
 * via the `definition` "BaseResponse«ArticleInfoPostsByIdResponse»".
 */
export interface BaseResponseArticleInfoPostsByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleInfoPostsByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleInfoPostsByIdResponse {
  articleInfoVO?: ArticleInfoVO6;
  /**
   * 帖子用户名称
   */
  customerName?: string;
  /**
   * 帖子用户头像
   */
  headPicture?: string;
  /**
   * 是否关注该帖子用户; 0: 否；1：是
   * * NO: 否
   * * YES: 是
   */
  isFollow?: 0 | 1;
  /**
   * 帖子用户归属组织; 0: 普通用户，1：平台，2：康友为，3：合作商，4：合资公司
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  [k: string]: any;
}
/**
 * 帖子信息
 */
export interface ArticleInfoVO6 {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
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
 * via the `definition` "ArticleInfoPostsByIdResponse".
 */
export interface ArticleInfoPostsByIdResponse1 {
  articleInfoVO?: ArticleInfoVO6;
  /**
   * 帖子用户名称
   */
  customerName?: string;
  /**
   * 帖子用户头像
   */
  headPicture?: string;
  /**
   * 是否关注该帖子用户; 0: 否；1：是
   * * NO: 否
   * * YES: 是
   */
  isFollow?: 0 | 1;
  /**
   * 帖子用户归属组织; 0: 普通用户，1：平台，2：康友为，3：合作商，4：合资公司
   * * PLATFORM: 平台
   * * GROUNDPUSH: 康友为
   * * PARTNER: 合作商
   * * COMPANY: 合资公司
   */
  ownershipGroup?: 0 | 1 | 2 | 3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleRelaInfoByArticleInfoIdResponse»".
 */
export interface BaseResponseArticleRelaInfoByArticleInfoIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleRelaInfoByArticleInfoIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleRelaInfoByArticleInfoIdResponse {
  /**
   * 内容
   */
  articleInfoId?: string;
  /**
   * 登录人是否收藏, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isCollect?: 0 | 1;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleRelaInfoByArticleInfoIdResponse".
 */
export interface ArticleRelaInfoByArticleInfoIdResponse1 {
  /**
   * 内容
   */
  articleInfoId?: string;
  /**
   * 登录人是否收藏, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isCollect?: 0 | 1;
  /**
   * 登录人是否点赞, 0，否；1，是
   * * NO: 否
   * * YES: 是
   */
  isStar?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleInfoCateWithListResponse»".
 */
export interface BaseResponseArticleInfoCateWithListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleInfoCateWithListResponse2;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleInfoCateWithListResponse2 {
  articleCateVO?: ArticleCateVO2;
  /**
   *  内容信息列表结果
   */
  articleCateVOVideoList?: ArticleInfoVO3[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EsArticleInfoResponse»".
 */
export interface BaseResponseEsArticleInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EsArticleInfoResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface EsArticleInfoResponse {
  esArticleInfoPage?: PageEsArticleInfo;
  [k: string]: any;
}
/**
 * CMS 内容返回页面
 */
export interface PageEsArticleInfo {
  content?: EsArticleInfo[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort3;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface EsArticleInfo {
  accurateType?: string;
  articleCoverSource?: string;
  articleDigest?: string;
  articleInfoSearchAuxNest?: ArticleInfoSearchAuxNest;
  articleProperty?: '0' | '1';
  articleRecommendType?: '0' | '1';
  articleSubjectId?: string;
  articleType?: '0' | '1';
  auditPerson?: string;
  auditState?: '0' | '1' | '2';
  auditTime?: string;
  authorType?: '0' | '1';
  browseTotal?: number;
  cateIdList?: string[];
  cateIds?: string;
  channelType?: '0' | '1';
  commentTotal?: number;
  content?: string;
  contentSource?: string;
  contentSourceDuration?: string;
  contentState?: '0' | '1' | '2' | '3';
  contentType?: '0' | '1' | '2';
  coverType?: '0' | '1' | '2';
  createPerson?: string;
  createTime?: string;
  delFlag?: '0' | '1';
  delPerson?: string;
  delTime?: string;
  groupCateId?: string;
  headPicture?: string;
  id?: string;
  parentCateIdList?: string[];
  parentCateIds?: string;
  rejectReason?: string;
  releasePerson?: string;
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  shareTotal?: number;
  starTotal?: number;
  strReleaseTime?: string;
  title?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
export interface ArticleInfoSearchAuxNest {
  articleDigestIk?: string;
  titleIk?: string;
  [k: string]: any;
}
export interface Sort3 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsArticleInfoResponse".
 */
export interface EsArticleInfoResponse1 {
  esArticleInfoPage?: PageEsArticleInfo;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«EsArticleInfo»".
 */
export interface PageEsArticleInfo1 {
  content?: EsArticleInfo[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort3;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsArticleInfo".
 */
export interface EsArticleInfo1 {
  accurateType?: string;
  articleCoverSource?: string;
  articleDigest?: string;
  articleInfoSearchAuxNest?: ArticleInfoSearchAuxNest;
  articleProperty?: '0' | '1';
  articleRecommendType?: '0' | '1';
  articleSubjectId?: string;
  articleType?: '0' | '1';
  auditPerson?: string;
  auditState?: '0' | '1' | '2';
  auditTime?: string;
  authorType?: '0' | '1';
  browseTotal?: number;
  cateIdList?: string[];
  cateIds?: string;
  channelType?: '0' | '1';
  commentTotal?: number;
  content?: string;
  contentSource?: string;
  contentSourceDuration?: string;
  contentState?: '0' | '1' | '2' | '3';
  contentType?: '0' | '1' | '2';
  coverType?: '0' | '1' | '2';
  createPerson?: string;
  createTime?: string;
  delFlag?: '0' | '1';
  delPerson?: string;
  delTime?: string;
  groupCateId?: string;
  headPicture?: string;
  id?: string;
  parentCateIdList?: string[];
  parentCateIds?: string;
  rejectReason?: string;
  releasePerson?: string;
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  shareTotal?: number;
  starTotal?: number;
  strReleaseTime?: string;
  title?: string;
  updatePerson?: string;
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleInfoSearchAuxNest".
 */
export interface ArticleInfoSearchAuxNest1 {
  articleDigestIk?: string;
  titleIk?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ArticleRecommendInfoByArticleInfoIdResponse»".
 */
export interface BaseResponseArticleRecommendInfoByArticleInfoIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ArticleRecommendInfoByArticleInfoIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface ArticleRecommendInfoByArticleInfoIdResponse {
  /**
   * 帖子id
   */
  articleInfoId?: string;
  /**
   * 推荐关联的文章信息
   */
  recommendArticleList?: ArticleInfoVO7[];
  /**
   * 推荐关联的商品信息
   */
  recommendGoodsList?: GoodsVO[];
  [k: string]: any;
}
export interface ArticleInfoVO7 {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 分类信息
   */
  articleCateList?: ArticleCateVO[];
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 审核人
   */
  auditPerson?: string;
  /**
   * 审核状态 (  0:审核中 1：已通过 2：已驳回)
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   */
  auditState?: 0 | 1 | 2;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  flag?: 'TODAY' | 'WEEK' | 'EARLIER';
  /**
   * 发布人(releasePerson)是否被人关注 true 已关注 false 未关注
   */
  followFlag?: boolean;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  groupCateName?: string;
  /**
   * 发布人头像
   */
  headPicture?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  recordDate?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布人姓名
   */
  releasePersonName?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 点赞总数
   */
  starTotal?: number;
  /**
   * 格式化发布时间
   */
  strReleaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 回复数前3的评论
   */
  top3Comments?: CustomerArticleCommentVO[];
  /**
   * 更新人
   */
  updatePerson?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsVO {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 修改上架渠道
   */
  appSaleChannel?: number;
  /**
   * 批准文号
   */
  approvalNumber?: string;
  /**
   * 注意事项
   */
  attentions?: string;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 财务用商品类型：1：医疗器械 2：保健用品 3：功能食品 4：新奇特，5：美妆个护
   * * DEFAULT: 0：不使用
   * * MEDICAL_INSTRUMENT: 1：医疗器械
   * * HEALTH_PRODUCTS: 2：保健用品
   * * FUNCTIONAL_FOOD: 3：功能食品
   * * NEW_STRANGE: 4：新奇特
   * * BEAUTY_MAKEUP: 5：美妆个护
   */
  cateForFinace?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 渠道
   */
  channelId?: string;
  /**
   * 本渠道售价
   */
  channelPrice?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成分
   */
  component?: string;
  /**
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 药品剂型id
   */
  drugFormId?: number;
  drugFormVO?: DrugFormVO;
  /**
   * 药品单双轨：0 单轨，1 双轨
   */
  drugTrack?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 英文名
   */
  englishName?: string;
  /**
   * 性状
   */
  feature?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 通用名
   */
  generalName?: string;
  goodsBrandVO?: GoodsBrandVO;
  goodsCateVO?: GoodsCateVO;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品浏览量
   */
  goodsViewNum?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 功能主治
   */
  indications?: string;
  /**
   * 进项税率
   */
  inputTaxRate?: number;
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 设置商品是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 货号
   */
  itemNo?: string;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 主条码
   */
  mainBarcode?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 商品类型
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  meterUnitVO?: MeterUnitVO;
  /**
   * 最小起订量
   */
  minimumOrderQuantity?: number;
  /**
   * 修改上架渠道
   */
  mobileSaleChannel?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 订货倍数
   */
  orderGoodsMultiple?: number;
  /**
   * 修改上架渠道
   */
  pcSaleChannel?: number;
  /**
   * 拼音助记码
   */
  pinyinInitials?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 产地
   */
  producePlace?: string;
  /**
   * 生产厂家名称
   */
  productorName?: string;
  productorVO?: ProductorVO;
  /**
   * 销售价格
   */
  salePrice?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 销项税率
   */
  salesTaxRate?: number;
  /**
   * 是否支持自提（0: 不支持 1:支持）
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
  /**
   * 保质期（天）
   */
  shelfLife?: number;
  /**
   * 价格最低的skuId
   */
  skuId?: string;
  /**
   * 规格参数
   */
  specParam?: string;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 贮藏条件
   */
  storeCondition?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 税收分类编码
   */
  taxTypeNo?: string;
  /**
   * 是否支持2小时达(0: 不支持 1:支持)
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;
  [k: string]: any;
}
/**
 * 剂型对象
 */
export interface DrugFormVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 剂型id
   */
  drugFormId?: number;
  /**
   * 剂型名称
   */
  drugFormName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 品牌对象
 */
export interface GoodsBrandVO {
  /**
   * 品牌分佣比例最大值
   */
  brandCommissionRatioMax?: number;
  /**
   * 品牌分佣比例最小值
   */
  brandCommissionRatioMin?: number;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 药品 非药品
   */
  brandType?: number;
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名称
   */
  countryName?: string;
  countryVO?: CountryVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 是否开启奖励
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 品牌英文名
   */
  nickName?: string;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 设置具体值的店铺数量
   */
  storeCount?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 国家对象
 */
export interface CountryVO {
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名
   */
  countryName?: string;
  /**
   * 国家的英文名
   */
  countryNameUk?: string;
  /**
   * 主键id
   */
  id?: number;
  [k: string]: any;
}
export interface GoodsCateVO {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: GoodsCateVO1[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCateVO1 {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: GoodsCateVO1[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCatePropVO {
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsPropDetailVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 计量单位
 */
export interface MeterUnitVO {
  /**
   * 计量单位编码
   */
  meterUnitCode?: string;
  /**
   * 计量单位主键
   */
  meterUnitId?: string;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  /**
   * 计量单位状态（启用、禁用；默认启用）
   */
  meterUnitStatus?: number;
  [k: string]: any;
}
/**
 * 生产厂商
 */
export interface ProductorVO {
  /**
   * 电话号码
   */
  contactNumber?: string;
  /**
   * 传真号
   */
  faxNumber?: string;
  /**
   * 邮政编码
   */
  postCode?: string;
  /**
   * 生产生编号
   */
  productorCode?: string;
  /**
   * 生产商Id
   */
  productorId?: number;
  /**
   * 生产商名称
   */
  productorName?: string;
  /**
   * 生产商状态
   */
  productorStatus?: number;
  /**
   * 生产商类型
   */
  productorType?: number;
  /**
   * 生产商网址
   */
  productorWebSite?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ArticleRecommendInfoByArticleInfoIdResponse".
 */
export interface ArticleRecommendInfoByArticleInfoIdResponse1 {
  /**
   * 帖子id
   */
  articleInfoId?: string;
  /**
   * 推荐关联的文章信息
   */
  recommendArticleList?: ArticleInfoVO7[];
  /**
   * 推荐关联的商品信息
   */
  recommendGoodsList?: GoodsVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsVO".
 */
export interface GoodsVO1 {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 修改上架渠道
   */
  appSaleChannel?: number;
  /**
   * 批准文号
   */
  approvalNumber?: string;
  /**
   * 注意事项
   */
  attentions?: string;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 财务用商品类型：1：医疗器械 2：保健用品 3：功能食品 4：新奇特，5：美妆个护
   * * DEFAULT: 0：不使用
   * * MEDICAL_INSTRUMENT: 1：医疗器械
   * * HEALTH_PRODUCTS: 2：保健用品
   * * FUNCTIONAL_FOOD: 3：功能食品
   * * NEW_STRANGE: 4：新奇特
   * * BEAUTY_MAKEUP: 5：美妆个护
   */
  cateForFinace?: 0 | 1 | 2 | 3 | 4 | 5;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 渠道
   */
  channelId?: string;
  /**
   * 本渠道售价
   */
  channelPrice?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成分
   */
  component?: string;
  /**
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 药品剂型id
   */
  drugFormId?: number;
  drugFormVO?: DrugFormVO;
  /**
   * 药品单双轨：0 单轨，1 双轨
   */
  drugTrack?: number;
  /**
   * 药品类型：0 处方，1 OTC(甲类)，2 OTC(乙类)
   * * PRESCRIBE: 0：处方
   * * OTC_A: 1：OTC(甲类)
   * * OTC_B: 2：OTC(乙类)
   */
  drugType?: 0 | 1 | 2;
  /**
   * 英文名
   */
  englishName?: string;
  /**
   * 性状
   */
  feature?: string;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 通用名
   */
  generalName?: string;
  goodsBrandVO?: GoodsBrandVO;
  goodsCateVO?: GoodsCateVO;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品浏览量
   */
  goodsViewNum?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 功能主治
   */
  indications?: string;
  /**
   * 进项税率
   */
  inputTaxRate?: number;
  /**
   * 是否外用
   */
  isExternalUse?: number;
  /**
   * 设置商品是否参与奖励
   */
  isParticipateReward?: number;
  /**
   * 货号
   */
  itemNo?: string;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 限购数量
   */
  limitNum?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 主条码
   */
  mainBarcode?: string;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 商品类型
   * * MATERIEL: 0：物料
   * * OTC: 1：药品
   * * NON_DRUG: 2：非药品
   */
  medicineType?: 0 | 1 | 2;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  meterUnitVO?: MeterUnitVO;
  /**
   * 最小起订量
   */
  minimumOrderQuantity?: number;
  /**
   * 修改上架渠道
   */
  mobileSaleChannel?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 订货倍数
   */
  orderGoodsMultiple?: number;
  /**
   * 修改上架渠道
   */
  pcSaleChannel?: number;
  /**
   * 拼音助记码
   */
  pinyinInitials?: string;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 生产厂家
   */
  produceCompany?: string;
  /**
   * 产地
   */
  producePlace?: string;
  /**
   * 生产厂家名称
   */
  productorName?: string;
  productorVO?: ProductorVO;
  /**
   * 销售价格
   */
  salePrice?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 销项税率
   */
  salesTaxRate?: number;
  /**
   * 是否支持自提（0: 不支持 1:支持）
   * * NO: 否
   * * YES: 是
   */
  selfMentionType?: 0 | 1;
  /**
   * 保质期（天）
   */
  shelfLife?: number;
  /**
   * 价格最低的skuId
   */
  skuId?: string;
  /**
   * 规格参数
   */
  specParam?: string;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 贮藏条件
   */
  storeCondition?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 税收分类编码
   */
  taxTypeNo?: string;
  /**
   * 是否支持2小时达(0: 不支持 1:支持)
   * * NO: 否
   * * YES: 是
   */
  twoHoursExpress?: 0 | 1;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 用法用量
   */
  usageDesc?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DrugFormVO".
 */
export interface DrugFormVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除区分：0 未删除，1 已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 剂型id
   */
  drugFormId?: number;
  /**
   * 剂型名称
   */
  drugFormName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVO".
 */
export interface GoodsBrandVO1 {
  /**
   * 品牌分佣比例最大值
   */
  brandCommissionRatioMax?: number;
  /**
   * 品牌分佣比例最小值
   */
  brandCommissionRatioMin?: number;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 药品 非药品
   */
  brandType?: number;
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名称
   */
  countryName?: string;
  countryVO?: CountryVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 是否开启奖励
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 合资公司分佣比例
   */
  jointVenturesCommissionRatio?: number;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 微店主分佣比例
   */
  microShopCommissionRatio?: number;
  /**
   * 品牌英文名
   */
  nickName?: string;
  /**
   * 合作商分佣比例
   */
  partnerCommissionRatio?: number;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 设置具体值的店铺数量
   */
  storeCount?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CountryVO".
 */
export interface CountryVO1 {
  /**
   * 国家编码
   */
  countryCode?: string;
  /**
   * 国家名
   */
  countryName?: string;
  /**
   * 国家的英文名
   */
  countryNameUk?: string;
  /**
   * 主键id
   */
  id?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCateVO".
 */
export interface GoodsCateVO2 {
  /**
   * 基础标识
   */
  baseTag?: string;
  /**
   * cate_commission_ratio_max
   */
  cateCommissionRatioMax?: number;
  /**
   * cate_commission_ratio_min
   */
  cateCommissionRatioMin?: number;
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分类标识
   */
  cateTag?: string;
  /**
   * 分类的类别
   */
  cateType?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: GoodsCateVO1[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * is_participate_reward
   * * NO: 否
   * * YES: 是
   */
  isParticipateReward?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCatePropVO".
 */
export interface GoodsCatePropVO1 {
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropDetailVO".
 */
export interface GoodsPropDetailVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MeterUnitVO".
 */
export interface MeterUnitVO1 {
  /**
   * 计量单位编码
   */
  meterUnitCode?: string;
  /**
   * 计量单位主键
   */
  meterUnitId?: string;
  /**
   * 计量单位名称
   */
  meterUnitName?: string;
  /**
   * 计量单位状态（启用、禁用；默认启用）
   */
  meterUnitStatus?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ProductorVO".
 */
export interface ProductorVO1 {
  /**
   * 电话号码
   */
  contactNumber?: string;
  /**
   * 传真号
   */
  faxNumber?: string;
  /**
   * 邮政编码
   */
  postCode?: string;
  /**
   * 生产生编号
   */
  productorCode?: string;
  /**
   * 生产商Id
   */
  productorId?: number;
  /**
   * 生产商名称
   */
  productorName?: string;
  /**
   * 生产商状态
   */
  productorStatus?: number;
  /**
   * 生产商类型
   */
  productorType?: number;
  /**
   * 生产商网址
   */
  productorWebSite?: string;
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
 * via the `definition` "IAddGrouponAddReqReq".
 */
export interface IAddGrouponAddReqReq {
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 推荐
   */
  articleRecommends?: string[];
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 对应C端customerid
   */
  releasePerson?: string;
  /**
   * 发布时间
   */
  releaseTime?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetClassIndexPageRequestReq".
 */
export interface IGetClassIndexPageRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder[];
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetFriendDynamicPageRequestReq".
 */
export interface IGetFriendDynamicPageRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder[];
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetIndexPageRequestReq".
 */
export interface IGetIndexPageRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder[];
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetHotArticleInfoPageHotArticleInfoRequestReq".
 */
export interface IGetHotArticleInfoPageHotArticleInfoRequestReq {
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
 * via the `definition` "IIncreaseArticleInfoNumRequestReq".
 */
export interface IIncreaseArticleInfoNumRequestReq {
  /**
   * id
   */
  articleInfoId?: string;
  increaseType?: '0' | '1';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetLatestThreeListReqReq".
 */
export interface IGetLatestThreeListReqReq {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
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
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 发布人-对应C端customerid
   */
  releasePerson?: string;
  /**
   * 搜索条件:发布时间开始
   */
  releaseTimeBegin?: string;
  /**
   * 搜索条件:发布时间截止
   */
  releaseTimeEnd?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
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
   * 点赞总数
   */
  starTotal?: number;
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 更新人
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
 * via the `definition` "IGetListListReqReq".
 */
export interface IGetListListReqReq {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
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
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 发布人-对应C端customerid
   */
  releasePerson?: string;
  /**
   * 搜索条件:发布时间开始
   */
  releaseTimeBegin?: string;
  /**
   * 搜索条件:发布时间截止
   */
  releaseTimeEnd?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 是否根据浏览量排序
   */
  sortByBrowseTotal?: boolean;
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
   * 点赞总数
   */
  starTotal?: number;
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 更新人
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
 * via the `definition` "IGetPagePageReqReq".
 */
export interface IGetPagePageReqReq {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
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
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 发布人-对应C端customerid
   */
  releasePerson?: string;
  /**
   * 搜索条件:发布时间开始
   */
  releaseTimeBegin?: string;
  /**
   * 搜索条件:发布时间截止
   */
  releaseTimeEnd?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
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
   * 点赞总数
   */
  starTotal?: number;
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 更新人
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
 * via the `definition` "IQueryArticleInfoRequestReq".
 */
export interface IQueryArticleInfoRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder[];
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryRecomonInterArticleInfoRequestReq".
 */
export interface IQueryRecomonInterArticleInfoRequestReq {
  /**
   * 聚合参数
   */
  aggs?: AggregationBuilder[];
  /**
   * 标签id
   */
  articleCateTagId?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
  /**
   * 内容属性（0：友群；1：友课）
   * * ARTICLEGROUPON: 0：友群
   * * ARTICLECOURSE: 1：友课
   */
  articleProperty?: 0 | 1;
  /**
   * 专题id
   */
  articleSubjectId?: string;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 聚合参数
   * * ARTICLE: 0：文章
   * * VIDEO: 1：视频
   * * VOICE: 2：音频
   */
  contentType?: 0 | 1 | 2;
  /**
   * id
   */
  id?: string;
  /**
   * id列表
   */
  idList?: string[];
  /**
   * 搜索关键字
   */
  keyword?: string;
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder[];
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  parentCateIdList?: string[];
  cateIdList?: string[];
  channelType?: '0' | '1';
  accurateType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IShowListLimitListReqReq".
 */
export interface IShowListLimitListReqReq {
  /**
   * 精准类型（全部、康友为商城、悦康送商城、地推；商城分为：APP、小程序、H5、PC官网......)
   */
  accurateType?: string;
  /**
   * 封面图片(多图逗号分隔)
   */
  articleCoverSource?: string;
  /**
   * 摘要
   */
  articleDigest?: string;
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
   * 发布者(0:会员； 1:平台；)
   * * CUSTOMEER: 0：会员
   * * PLATFORM: 1：平台
   */
  authorType?: 0 | 1;
  /**
   * 浏览量
   */
  browseTotal?: number;
  /**
   * 二级分类ids（列表筛选）
   */
  cateIds?: string;
  /**
   * 渠道类型（0:全部; 1:精准)
   * * NO: 否
   * * YES: 是
   */
  channelType?: 0 | 1;
  /**
   * 评论总数
   */
  commentTotal?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 视频，音频地址
   */
  contentSource?: string;
  /**
   * 视频，音频时长
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
   * 封面类型（0：不限；1：单图；2：三图；）
   * * UNLIMITED: 0：不限
   * * SINGLE: 1：单图
   * * THREE: 2：三图
   */
  coverType?: 0 | 1 | 2;
  /**
   * 创建人
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
   * 删除标识,0:未删除1:已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
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
   * 友群分类id
   */
  groupCateId?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 批量查询-idList
   */
  idList?: string[];
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
   * 一级分类ids（列表筛选）
   */
  parentCateIds?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 发布人-对应C端customerid
   */
  releasePerson?: string;
  /**
   * 搜索条件:发布时间开始
   */
  releaseTimeBegin?: string;
  /**
   * 搜索条件:发布时间截止
   */
  releaseTimeEnd?: string;
  /**
   * 分享次数
   */
  shareTotal?: number;
  /**
   * 是否根据浏览量排序
   */
  sortByBrowseTotal?: boolean;
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
   * 点赞总数
   */
  starTotal?: number;
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
  /**
   * 标题
   */
  title?: string;
  token?: string;
  /**
   * 更新人
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

//create by moon https://github.com/creasy2010/moon
