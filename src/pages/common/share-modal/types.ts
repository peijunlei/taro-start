export interface SharePopProps {
  goodsInfo: IObject;
  addSelfShop: boolean;
  shareType: number;
  shareModalVisible: boolean;
  closeVisible: Function;
  grouponNo?: string;
  inviteeId?: string;
  spuId?: string;
  specText?: string;
  goods?: IObject;
  customerName?: string;
  isPointsGoods?: boolean;
  pointsGoods?: IObject;
  pointsGoodsId?: string;
  appointmentSaleVO?: IObject;
  onRefs: Function;
  buttonType: number;
  setIsRefresh: Function;
  grouponActivityId?: string;
}

export interface IObject {
  [k: string]: any;
}

export interface SharePopState {
  windowWidth: number;
  windowHeight: number;
  offset: number;
  //左边文本图片X轴位置
  normalPageX: number;
  //分享图片box宽度
  boxWidth: number;
  //分享图片box高度
  boxheight: number;
  //boxY轴位置
  boxPageY: number;
  //logo宽度
  logoWidth: number;
  //logo高度
  logoHeight: number;
  //logoY轴位置
  logoPageY: number;
  //商品图片宽度
  imgWidth: number;
  //商品图片高度
  imgHeight: number;
  //商品图片Y轴位置
  imgPageY: number;
  //小程序码图片宽度
  codeWidth: number;
  //小程序码图片高度
  codeHeight: number;
  //小程序码Y轴位置
  codePageY: number;
  //头像Y轴位置
  avatarPageY: number;
  //标题Y轴位置
  titlePageY: number;
  //规格Y轴位置
  specPageY: number;
  //价格Y轴位置
  pricePageY: number;
  //秒杀Y轴位置
  timePageY: number;
  logo: string;
  contentHeight: number;
  thinkList: Array<any>;
  footer: string;
  lineHeight: number;
  contentTitle: string;
  price: string;
  buyPoint: string;
  delPrice: string;
  canvasUrl: string;
  qrCode: string; //小程序码https图片路径
  skuId: string;
  spuId: string;
  //商品图片
  goodsInfoImg: string;
  //规格
  specText: string;
  //分享类型
  shareType: 0;
  //邀请人会员ID
  inviteeId: string;
  grouponNo: string;
  //分享人id
  shareUserId: string;
  //显示隐藏
  shareModalVisible: boolean;
  //客户名称
  customerName: string;
  avatar: string;
  buttonType: number;
  noDataIcon: string;
}
