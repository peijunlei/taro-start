import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'StudyCenterWebController';

/**
 *
 * 我的收藏课程
 *
 */
async function courseCollect(
  request: ICourseCollectRequestReq,
): Promise<ArticleInfoPageResponse> {
  let result = await sdk.get<ArticleInfoPageResponse>(
    '/study/center/web/course/collect',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 我的收藏课程
 *
 */
async function courseCollect(
  request: ICourseCollectRequestReq,
): Promise<ArticleInfoPageResponse> {
  let result = await sdk.post<ArticleInfoPageResponse>(
    '/study/center/web/course/collect',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 我的学习中心信息
 *
 */
async function info(): Promise<CustomerCmsCenterByIdResponse> {
  let result = await sdk.get<CustomerCmsCenterByIdResponse>(
    '/study/center/web/info',

    {},
  );
  return result.context;
}

/**
 *
 * 学习记录
 *
 */
async function learningRecord(
  request: ILearningRecordRequestReq,
): Promise<LearningRecordPageResponse> {
  let result = await sdk.get<LearningRecordPageResponse>(
    '/study/center/web/learn/record',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 学习记录
 *
 */
async function learningRecord(
  request: ILearningRecordRequestReq,
): Promise<LearningRecordPageResponse> {
  let result = await sdk.post<LearningRecordPageResponse>(
    '/study/center/web/learn/record',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 更新学习记录
 *
 */
async function updateLearningRecord(
  articleInfoId: IUpdateLearningRecordArticleInfoIdReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/study/center/web/update/learn/record/{articleInfoId}'.replace(
      '{articleInfoId}',
      articleInfoId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 更新学习时长
 *
 */
async function updateLearningTime(
  duration: IUpdateLearningTimeDurationReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/study/center/web/update/learn/{duration}'.replace(
      '{duration}',
      duration + '',
    ),

    {},
  );
  return result.context;
}

export default {
  courseCollect,

  courseCollect,

  info,

  learningRecord,

  learningRecord,

  updateLearningRecord,

  updateLearningTime,
};

/**
 * articleInfoId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateLearningRecordArticleInfoIdReq".
 */
export type IUpdateLearningRecordArticleInfoIdReq = string;
/**
 * duration
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateLearningTimeDurationReq".
 */
export type IUpdateLearningTimeDurationReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseQueryRequest".
 */
export interface BaseQueryRequest {
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
  content?: ArticleInfoVO[];
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
export interface Sort {
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
  content?: ArticleInfoVO[];
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
 * via the `definition` "Sort".
 */
export interface Sort1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerCmsCenterByIdResponse»".
 */
export interface BaseResponseCustomerCmsCenterByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCmsCenterByIdResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface CustomerCmsCenterByIdResponse {
  customerCmsCenterVO?: CustomerCmsCenterVO;
  [k: string]: any;
}
/**
 * 会员CMS个人中心信息
 */
export interface CustomerCmsCenterVO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员CMS个人中心主键，同时对应 customerID
   */
  customerCmsCenterId?: string;
  /**
   * 会员头像
   */
  customerHeadPicture?: string;
  /**
   * 会员昵称
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
   * 会员关注用户数
   */
  followNum?: number;
  /**
   * 会员友粉数
   */
  funNum?: number;
  /**
   * 会员获赞数
   */
  starNum?: number;
  /**
   * 今日学习时长
   */
  todayDuration?: number;
  /**
   * 累计学习记录数
   */
  totalArticleNum?: number;
  /**
   * 累计学习时长
   */
  totalDuration?: number;
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
 * via the `definition` "CustomerCmsCenterByIdResponse".
 */
export interface CustomerCmsCenterByIdResponse1 {
  customerCmsCenterVO?: CustomerCmsCenterVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCmsCenterVO".
 */
export interface CustomerCmsCenterVO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员CMS个人中心主键，同时对应 customerID
   */
  customerCmsCenterId?: string;
  /**
   * 会员头像
   */
  customerHeadPicture?: string;
  /**
   * 会员昵称
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
   * 会员关注用户数
   */
  followNum?: number;
  /**
   * 会员友粉数
   */
  funNum?: number;
  /**
   * 会员获赞数
   */
  starNum?: number;
  /**
   * 今日学习时长
   */
  todayDuration?: number;
  /**
   * 累计学习记录数
   */
  totalArticleNum?: number;
  /**
   * 累计学习时长
   */
  totalDuration?: number;
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
 * via the `definition` "BaseResponse«LearningRecordPageResponse»".
 */
export interface BaseResponseLearningRecordPageResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LearningRecordPageResponse;
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface LearningRecordPageResponse {
  learningRecordVOPage?: MicroServicePageLearningRecordVO;
  [k: string]: any;
}
/**
 * 学习记录表分页结果
 */
export interface MicroServicePageLearningRecordVO {
  /**
   * 具体数据内容
   */
  content?: LearningRecordVO[];
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
export interface LearningRecordVO {
  articleInfo?: ArticleInfoVO2;
  /**
   * 内容id
   */
  articleInfoId?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 最后学习时间
   */
  strLearnTime?: string;
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
 * 文章详情
 */
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
export interface Sort2 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LearningRecordPageResponse".
 */
export interface LearningRecordPageResponse1 {
  learningRecordVOPage?: MicroServicePageLearningRecordVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«LearningRecordVO»".
 */
export interface MicroServicePageLearningRecordVO1 {
  /**
   * 具体数据内容
   */
  content?: LearningRecordVO[];
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
 * via the `definition` "LearningRecordVO".
 */
export interface LearningRecordVO1 {
  articleInfo?: ArticleInfoVO2;
  /**
   * 内容id
   */
  articleInfoId?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 最后学习时间
   */
  strLearnTime?: string;
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
 * via the `definition` "ICourseCollectRequestReq".
 */
export interface ICourseCollectRequestReq {
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
 * via the `definition` "ILearningRecordRequestReq".
 */
export interface ILearningRecordRequestReq {
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
