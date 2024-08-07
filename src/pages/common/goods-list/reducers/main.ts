import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  isMenuBoxFlag: false,
  menuList: [],
  linkInfoPage: {},
  //商品列表数据
  goods: [],
  //预约活动列表
  appointmentSaleVOList: [],
  //预置搜索词
  preKeyword: '搜索商品',
  //商品信息
  goodsInfo: {},
  //nav-tools相关参数
  navToolsObj: {
    //综合箭头切换
    arrowFlag: false,
    //价格升序降序
    priceSoft: false,
    //composiName
    composiName: '综合',
    //composiId
    composiId: 0,
    //筛选框显示隐藏
    screenIsShow: false,
    //佣金 分销商品列表才展示
    commission: false,
  },
  //商品列表查询参数
  request: {
    storeId: '',
    //关键字
    keywords: '',
    //分类id
    cateId: null,
    //供应商类型
    companyType: '',
    pointsUsageFlag: false,
    //分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
    distributionGoodsAudit: '',
    //分销商品状态，配合分销开关使用
    distributionGoodsStatus: '',
    //批量品牌id
    brandIds: [],
    cateIds: [],
    //多个 属性与对应的属性值id
    propDetails: [],
    //排序
    sortFlag: null,
    //未登录时,前端采购单缓存信息
    esGoodsInfoDTOList: [],
    //分页
    pageNum: 0,
    pageSize: 10,
    //storecate
    storeCateIds: [],
    // 企业购筛选项 = 2
    enterPriseGoodsStatus: '',
    labelIds: [],
    // 是否反查分类
    cateAggFlag: true,
  },
  total: 0,
  totalPages: 0,
  //0:sku列表,1:spu列表
  goodsShowType: null,
  //0:小图,1:大图
  imageShowType: null,
  //批发规格显示隐藏
  batchSpecIsShow: false,
  //零售规格显示隐藏
  retailSpecIsShow: false,
  //商品分类
  goodsCates: [],
  //商品品牌分类
  goodsBrands: [],
  // 商品属性聚合
  goodsPropertyVOS: [],
  //商品规格
  goodsSpecs: {},
  //购物车角标
  shopCarNum: 0,

  ifStore: false,

  //是否显示分享赚、发圈素材、只看分享赚按钮
  isDistributor: false,
  //平台端社交分销开关
  distributionSwitch: 0,
  //是否推广商品列表
  spreadFlag: false,

  //分享赚弹窗
  goodsShareVisible: false,
  shareModalVisible: false,
  addSelfShop: true,

  // 企业购业务信息
  iepInfo: {},
  // 企业购服务开关
  iepSwitch: false,
  //打开方式 1:商品详情底部、2:商品详情规格、3:商品列表、4:购物车
  openType: '3',
  //商品标签
  goodsLabels: [],
  //加载状态 unload 未加载,loading 加载中，loaded 加载完成
  loadStatus: 'unload',
  bookingSaleVOList: [],
  loadSkeleton: true, //展示骨架屏
  // 打开规格弹窗的商品的秒杀信息
  flashsaleGoods: {},
  isOpenWechat: false,
};

export default function main(state = INITIAL_STATE, action: Action): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      //修改查询条件数据
      case Command.modifyRequest:
        immerUtil.assign(draftState.request, payload);
        return draftState;

      //清空查询结果
      case Command.cleanList:
        draftState.goods = [];
        return draftState;

      //
      case Command.queryResult:
        draftState.goods = payload.list;
        draftState.total = payload.total;

        return draftState;

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }

        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}

//create by moon https://github.com/creasy2010/moon
