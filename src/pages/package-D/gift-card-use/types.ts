import Actions from './actions';
import {CheckGoodsInfoVO} from 'api/CouponCodeBaseController';
import {SystemPointsConfigQueryResponse} from 'api/SystemPointsConfigController';
import {CouponCodeVO, TradeConfirmItemVO1, TradeVO} from 'api/TradeBaseController';

export interface IMainReducer {
  images: any[];
  // 加载状态
  isLoading?: boolean;
  // 地址
  defaltAddress: any;
  userGiftCardId: string;
  //礼品卡前端自定义类型 '0' 仅预览 '1'可使用
  type: '0' | '1';
  cardStatus: '0' | '1';
  //  礼品卡样式配置
  useConfig: any;
  // 礼品卡使用
  giftCard: any;
  // 商品列表
  goodsList: any;
  // 选中商品列表
  selectGoodsList: any;
  selectedNum: number;
  selectedPrice: number;
  selectGroupList: any;
  // 选中的商品（模态框弹出的）
  selectedId?: string;
  descData?: string;
  selectedGoodsModal: boolean;
  tradeItems: any;
  totalPrice: number;
  totalBuyPoint: number;
  pageNum: any;
  pageSize: any;
  total: any;
  searchValue: any;
  goodsRestrictedTemplateVO:any;
  dangaoRestrictedVO:any;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type OrderStatusProps = {};
export type OrderStatusState = {};

//create by moon https://github.com/creasy2010/moon
