import {Canvas, Image, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {PureComponent} from 'react';
import * as T from './types';
import './index.less';
import api from 'api';
import {cache} from 'config';
import {_} from 'wmkit';
// import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import close from '@/assets/image/distribution/close.png';
import {avatar, nodata} from './defaultAvatar';
// import defaultAvatar from '@/assets/image/customer/user-center/default.png';

export default class ShareModal extends PureComponent<T.SharePopProps, T.SharePopState> {
  constructor(props: T.SharePopProps) {
    super(props);
    let goodsInfo = this.props.goodsInfo;
    if (!goodsInfo) {
      return;
    }
    let customerName;
    let inviteeId;
    let shareUserId;
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    if (loginData) {
      customerName = loginData.customerDetail.customerName;
      shareUserId = loginData.customerId;
      //如果是分享员登录，直接取customerId作为inviteeId
      if (loginData.customerDetail.isDistributor) {
        inviteeId = loginData.customerDetail.customerId;
      } else {
        //不是分销员，涉及到二次分享的，取缓存里的inviteeId
        inviteeId = Taro.getStorageSync(cache.INVITEE_ID);
      }
    }
    Taro.getSystemInfo({
      success: (res) => {
        let price = this.props.shareType == 3 ? goodsInfo.grouponPrice : goodsInfo.marketPrice;
        //判断是否为积分价商品
        const isBuyPoint = goodsInfo && goodsInfo.buyPoint;
        //判断是否为积分商品
        const isPointsGoods = this.props.isPointsGoods;
        // 是否预约商品
        const appointmentSaleVO = this.props.appointmentSaleVO;
        const isAppointment = appointmentSaleVO && appointmentSaleVO.id;
        if (isAppointment && !isBuyPoint && !isPointsGoods) {
          price = appointmentSaleVO.appointmentSaleGood.price;
        }
        this.state = {
          noDataIcon: '',
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          offset: (res.windowWidth + res.windowWidth * 0.72) / 2, //box整体偏移X轴位置
          normalPageX: 0, //左边文本图片X轴位置
          boxWidth: res.windowWidth * 0.747, //分享图片box宽度
          boxheight: res.windowWidth * 1.125, //分享图片box高度
          boxPageY: 0, //boxY轴位置
          logoWidth: res.windowWidth * 0.1067, //logo宽度
          logoHeight: res.windowWidth * 0.1067, //logo高度
          logoPageY: res.windowWidth * 0.064, //logoY轴位置
          imgWidth: res.windowWidth * 0.65, //商品图片宽度
          imgHeight: res.windowWidth * 0.72, //商品图片高度
          imgPageY: res.windowWidth * 0.2, //商品图片Y轴位置
          codeWidth: res.windowWidth * 0.165, //小程序码图片宽度
          codeHeight: res.windowWidth * 0.164, //小程序码图片高度
          codePageY: res.windowWidth * 0.874 + 20, //小程序码Y轴位置
          avatarPageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 15, //头像Y轴位置
          titlePageY: res.windowWidth * 0.874 + 40, //标题Y轴位置
          specPageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 82, //规格Y轴位置
          pricePageY: res.windowWidth * 1.1, //价格Y轴位置
          timePageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 118, //秒杀Y轴位置
          logo: '',
          contentHeight: 0,
          thinkList: [],
          footer: '',
          lineHeight: 30,
          contentTitle: goodsInfo.goodsInfoName,
          price: price,
          buyPoint: goodsInfo.buyPoint && goodsInfo.buyPoint > 0 ? goodsInfo.buyPoint : '',
          delPrice: Boolean(goodsInfo.buyCount > 0 && goodsInfo.buyPoint > 0),
          canvasUrl: '',
          qrCode: '', //小程序码https图片路径
          skuId: goodsInfo.goodsInfoId,
          spuId: goodsInfo.goodsId,
          //商品图片
          goodsInfoImg: '',
          //规格
          specText: this.props.specText,
          //分享类型
          shareType: 0,
          //邀请人会员ID
          inviteeId: inviteeId,
          grouponNo: this.props.grouponNo,
          //分享人id
          shareUserId: shareUserId,
          customerName: customerName,
          avatar: '',
          buttonType: this.props.buttonType,
          shareModalVisible: props.shareModalVisible,
          //判断机型 0 ios 1 android
          system: 0,
        };
      },
    });
  }

  async componentDidMount() {
    const path = await this.getLocalUri(avatar, 'avatar_local.png');
    const path2 = await this.getLocalUri(nodata, 'nodata_local.png');
    this.setState(
      {
        avatar: path,
        noDataIcon: path2,
      },
      async () => {
        await this._init();
        await Taro.getSystemInfo({
          success: (res) => {
            if (res.system.indexOf('Android') !== -1) {
              this.setState({
                system: 1,
              });
            }
          },
        });
      },
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shareModalVisible !== this.props.shareModalVisible) {
      this.setState(
        {
          shareModalVisible: this.props.shareModalVisible,
        },
        () => {
          this.props.shareModalVisible && this._init();
        },
      );
    }
    if (this.props.onRefs) {
      this.props.onRefs(this);
    }
  }


  getLocalUri = async (img: string, name: string): Promise<string> => {
    return new Promise((r) => {
      const fs = Taro.getFileSystemManager();
      var codeimg = Taro.env.USER_DATA_PATH + '/' + name;
      fs.writeFile({
        filePath: codeimg,
        data: img,
        encoding: 'base64',
        success: () => {
          r(codeimg);
        },
        fail: () => {
          r('');
        },
      });
    });
  };

  _init = async () => {
    let goodsInfo = this.props.goodsInfo;
    // Taro.showLoading();
    if (!goodsInfo.goodsInfoImg && this.props.goods) {
      goodsInfo.goodsInfoImg = this.props.goods.goodsImg;
    }
    if (goodsInfo.goodsInfoImg) {
      //将商品图片的网络资源转化为临时文件
      const res = await Taro.downloadFile({url: goodsInfo.goodsInfoImg});
      this.setState(
        {
          goodsInfoImg: res.tempFilePath,
        },
        async () => {
          //是否添加店铺
          if (this.props.addSelfShop) {
            await api.distributorGoodsInfoController.add({
              goodsInfoId: goodsInfo.goodsInfoId,
              goodsId: goodsInfo.goodsId,
              storeId: goodsInfo.storeId,
            });
          }
          //获取头像
          //生成小程序码
          await this._getQrcode();
        },
      );
      await this._getLogo();
    } else {
      //直接生成头像和小程序码
      await this._getLogo();
      //生成小程序码
      await this._getQrcode();
    }
    this._addGoodsShareRecord();
    if (this.props.grouponNo) {
      this._addGrouponShareRecord();
    }
  };

  async componentWillUnmount() {
    setTimeout(() => {
      Taro.hideLoading();
    }, 3000);
  }

  /**
   分享到微信/朋友圈弹窗
   */
  render() {
    const {buttonType, windowHeight, shareModalVisible, canvasUrl} = this.state;
    const {closeVisible} = this.props;
    if (!shareModalVisible) return null;
    return (
      <View
        className="wm-common-mask"
        style={
          buttonType == 0
            ? {height: windowHeight, zIndex: -1, top: -windowHeight + 'px'}
            : {height: windowHeight, zIndex: 999}
        }
        onClick={() => {
          typeof closeVisible === 'function' && closeVisible();
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Canvas
          // style={{display: 'block'}}
          canvasId="myCanvas"
          // disableScroll={true}
          className="myCanvas"
          onLongTap={() => {
            if (this.state.system == 0) {
              this._savePic();
            }
          }} //onlongpress 被替换掉
        />
        <View
          className="surplus"
          style={{display: this.state.system == 0 ? 'none' : 'block'}}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('--------onTouchStart');
            this.timer = setTimeout(() => {
              this._savePic();
            }, 500);
          }}
        />
        {canvasUrl && <Image src={this.state.canvasUrl} className="canvasImg" showMenuByLongpress={true} />}
        {canvasUrl && (
          <View
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              typeof closeVisible === 'function' && closeVisible();
              this.setState({
                canvasUrl: '',
              });
            }}
          >
            <Image src={close} className="img" />
          </View>
        )}
      </View>
    );
  }
  timer;

  _getQrcode = async () => {
    let shareType = this.props.shareType;
    let goodsInfo = this.props.goodsInfo;
    let params;
    let url;
    let qrCode;
    //普通分享
    try {
      if (shareType == 0) {
        //如果是积分商品
        if (this.props.isPointsGoods) {
          // 积分商品id
          let {pointsGoodsId} = this.props;
          qrCode = await api.distributionMiniProgramController.distributionMiniProgramQrCode({
            skuId: goodsInfo.goodsInfoId,
            pointsGoodsId: pointsGoodsId,
            shareUserId: this.state.shareUserId,
          });
        } else {
          //普通商品
          qrCode = await api.configController.getSkuQrCode(goodsInfo.goodsInfoId);
        }
      } else if (shareType == 3) {
        //邀请参团
        qrCode = await api.grouponBaseController.inviteAddGroup(this.props.grouponNo);
      } else if (shareType == 1) {
        //店铺内分享赚,要传spuID
        qrCode = await api.distributionMiniProgramController.distributionMiniProgramQrCode({
          channel: 'shop',
          skuId: goodsInfo.goodsInfoId,
          inviteeId: this.state.inviteeId,
          spuId: goodsInfo.goodsId,
        });
      } else if (shareType == 2) {
        //店铺外分享赚
        qrCode = await api.distributionMiniProgramController.distributionMiniProgramQrCode({
          skuId: goodsInfo.goodsInfoId,
          inviteeId: this.state.inviteeId,
          channel: 'mall',
        });
      }

      // Taro
    } catch (e) {
      Taro.showToast({
        title: '功能不可用',
        icon: 'none',
        duration: 2000,
      });
      setTimeout(() => {
        Taro.hideLoading();
      }, 3000);
      if (this.props.closeVisible) {
        this.props.closeVisible();
      }
      return;
    }
    //成功获取到
    if (qrCode) {
      //转成临时文件
      let res = await Taro.downloadFile({url: qrCode});
      this.setState(
        {
          qrCode: res.tempFilePath,
        },
        async () => {
          //开始绘图
          await this._getData();
          await Taro.hideLoading();
        },
      );
    } else {
      Taro.showToast({
        title: '功能不可用',
        icon: 'none',
        duration: 2000,
      });
      setTimeout(() => {
        Taro.hideLoading();
      }, 3000);
      if (this.props.closeVisible) {
        this.props.closeVisible();
      }
    }
  };

  _addGoodsShareRecord = () => {
    let goodsInfo = this.props.goodsInfo;
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    api.goodsShareRecordController.add({
      storeId: goodsInfo.storeId,
      companyInfoId: goodsInfo.companyInfoId,
      customerId: loginData.customerDetail.customerId,
      goodsId: goodsInfo.goodsId,
      goodsInfoId: goodsInfo.goodsInfoId,
    });
  };

  _addGrouponShareRecord = () => {
    let goodsInfo = this.props.goodsInfo;
    let grouponActivityId = this.props.grouponActivityId;
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    api.grouponShareRecordController.addShare({
      storeId: goodsInfo.storeId,
      companyInfoId: goodsInfo.companyInfoId,
      customerId: loginData.customerDetail.customerId,
      goodsId: goodsInfo.goodsId,
      goodsInfoId: goodsInfo.goodsInfoId,
      grouponActivityId: grouponActivityId,
      terminalSource: 4,
    });
  };

  //获取logo
  _getLogo = async () => {
    const res = await api.customerBaseController.findCustomerCenterInfo();
    let logo = res.headImg ? res.headImg : null;
    if (logo) {
      //如果是第三方头像则需要将域名替换成https://wx.qlogo.cn
      // if (logo.indexOf('https://thirdwx.qlogo.cn')!=-1) {
      //   //logo ='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg'
      //  logo=logo.toString().replace('https://thirdwx.qlogo.cn', 'https://wx.qlogo.cn');
      // }
      //网络资源都要转为临时文件
      const result = await Taro.downloadFile({url: logo});
      await this.setState(
        {
          avatar: result.tempFilePath,
        },
      );
    }
  };

  _getData = () => {
    let i = 0;
    let lineNum = 1;
    let thinkStr = '';
    let thinkList = [];
    for (let item of this.state.contentTitle) {
      if (item === '\n') {
        thinkList.push(thinkStr);
        thinkList.push('a');
        i = 0;
        thinkStr = '';
        lineNum += 1;
      } else if (i === 21) {
        thinkList.push(thinkStr);
        i = 1;
        thinkStr = item;
        lineNum += 1;
      } else {
        thinkStr += item;
        i += 1;
      }
    }
    thinkList.push(thinkStr);
    this.setState(
      {
        thinkList: thinkList,
      },
      () => this._createNewImg(lineNum, thinkList),
    );
  };

  // 根据文字多少动态计算高度，然后依次画出矩形，文字，横线和小程序码。
  _createNewImg = async (lineNum, thinkList) => {
    let ctx = Taro.createCanvasContext('myCanvas', this.$scope);
    let contentHeight = this.state.boxheight;
    this.drawSquare(ctx, contentHeight);
    this.setState({
      contentHeight: contentHeight,
    });
    let height = 100;
    for (let i = 0; i < thinkList.length; i++) {
      let item = thinkList[i];
      this.drawFont(ctx, item, height);
      height += this.state.lineHeight;
    }
    //绘制圆角矩形的各个边
    ctx.rect(0, this.state.boxPageY, this.state.boxWidth, this.state.windowWidth * 0.49);
    ctx.beginPath();
    ctx.moveTo(this.state.boxWidth, this.state.windowWidth * 0.49);
    ctx.lineTo(0, this.state.windowWidth * 0.49);
    ctx.lineTo(0, 8);
    // 左上角圆弧
    ctx.arc(8, 8, 8, Math.PI, (Math.PI * 3) / 2);
    ctx.lineTo(this.state.boxWidth - 8, 0);
    //右上角圆弧
    ctx.arc(this.state.boxWidth - 8, 8, 8, (Math.PI * 3) / 2, Math.PI * 2);
    ctx.closePath();
    //渐变背景
    let grd = ctx.createLinearGradient(0, 0, 280, 184);
    grd.addColorStop(0, '#FF8400');
    grd.addColorStop(1, '#FF4D00');
    ctx.setFillStyle(grd);
    // ctx.fillRect(0, this.state.boxPageY, this.state.boxWidth, this.state.windowWidth * 0.49);
    ctx.fill();
    ctx.save();
    //头像
    ctx.beginPath();
    ctx.arc(
      this.state.windowWidth * 0.053 + this.state.logoWidth / 2,
      this.state.logoPageY + this.state.logoHeight / 2,
      this.state.logoWidth / 2,
      0,
      2 * Math.PI,
    );
    // ctx.arc(this.state.windowWidth * 0.053 + (this.state.logoWidth / 2), this.state.logoPageY + (this.state.logoHeight / 2), this.state.logoWidth / 2, 0, 2 * Math.PI);
    ctx.setStrokeStyle('#fff');
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(
      //'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
      //res.path,
      this.state.avatar,
      this.state.windowWidth * 0.053,
      this.state.logoPageY,
      this.state.logoWidth,
      this.state.logoHeight,
    );
    // await new Promise(resolve => {
    //  Taro.getImageInfo({
    //     src: this.state.avatar,//服务器返回的图片地址
    //   }).then(
    //     res=>{
    //       ctx.drawImage(
    //
    //         //'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
    //         //res.path,
    //         this.state.goodsInfoImg,
    //
    //         this.state.windowWidth * 0.053,
    //
    //         this.state.logoPageY,
    //
    //         this.state.logoWidth,
    //
    //         this.state.logoHeight,
    //
    //       );
    //       resolve()
    //     }
    //  )
    //
    //
    // })
    ctx.restore();
    // ctx.beginPath();
    // ctx.arc(this.state.windowWidth * 0.053 + (this.state.logoWidth / 2), this.state.logoPageY + (this.state.logoHeight / 2), this.state.logoWidth / 2, 0, 2 * Math.PI);
    // ctx.setStrokeStyle('#fff');
    // ctx.stroke();
    // 填充小程序码
    ctx.drawImage(
      this.state.qrCode,
      this.state.windowWidth * 0.53,
      this.state.codePageY - 20,
      this.state.codeWidth,
      this.state.codeHeight,
    );
    if (this.state.customerName) {
      //分销员昵称
      ctx.setFillStyle('#FFF');
      ctx.setFontSize(10);
      ctx.fillText('by', this.state.windowWidth * 0.181, this.state.windowWidth * 0.1);
      ctx.setFillStyle('#FFF');
      ctx.font = 'normal bolder 10px sans-serif';
      ctx.setFontSize(10);
      ctx.fillText(
        `"${this.state.customerName}"`,
        this.state.windowWidth * 0.181 + ctx.measureText('by').width,
        this.state.windowWidth * 0.1,
      );
      ctx.setFillStyle('#FFF');
      ctx.setFontSize(10);
      ctx.fillText(
        '的分享',
        this.state.windowWidth * 0.181 + ctx.measureText(`by"${this.state.customerName}"`).width,
        this.state.windowWidth * 0.1,
      );
      // ctx.fillText(
      //   `by"${this.state.customerName}"的分享`,
      //   this.state.windowWidth * 0.181,
      //   this.state.windowWidth * 0.1,
      // );
      //下一行
      ctx.setFillStyle('#FFF');
      ctx.font = 'normal bold 16px sans-serif';
      ctx.setFontSize(16);
      ctx.fillText('这个东西很不错哦', this.state.windowWidth * 0.181, this.state.windowWidth * 0.15);
    }
    //绘制头像
    // ctx.drawImage('../../static/images/avatar.jpg', this.state.normalPageX, this.state.avatarPageY, 25, 25);
    // let avatarurl_width = 25; //绘制的头像宽度
    // let avatarurl_heigth = 25; //绘制的头像高度
    // let avatarurl_x = this.state.normalPageX; //绘制的头像在画布上的X轴位置
    // let avatarurl_y = this.state.avatarPageY; //绘制的头像在画布上的Y轴位置
    // 填充价格符号￥
    ctx.setFillStyle('#FF6600');
    let buyPointText = '';
    // 先判断是不是积分商品
    if (this.props.isPointsGoods) {
      ctx.font = 'normal bolder 16px sans-serif';
      ctx.fillText(this.props.pointsGoods.points, this.state.windowWidth * 0.055, this.state.pricePageY - 15);
      buyPointText = '积分';
      //ctx.measureText会以当前ctx.font的size维度计算
      const buyPointLength = ctx.measureText(this.props.pointsGoods.points.toString()).width;
      ctx.font = 'normal bolder 12px sans-serif';
      ctx.fillText(buyPointText, buyPointLength + this.state.windowWidth * 0.06, this.state.pricePageY - 15);
    } else if (this.state.buyPoint && this.state.buyPoint != '') {
      ctx.font = 'normal bolder 16px sans-serif';
      ctx.fillText(this.state.buyPoint, this.state.windowWidth * 0.055, this.state.pricePageY - 15);
      buyPointText = '积分+';
      //ctx.measureText会以当前ctx.font的size维度计算
      const buyPointLength = ctx.measureText(this.state.buyPoint.toString()).width;
      ctx.font = 'normal bolder 12px sans-serif';
      ctx.fillText(buyPointText + '￥', buyPointLength + this.state.windowWidth * 0.06, this.state.pricePageY - 15);
    } else {
      ctx.font = 'normal bolder 12px sans-serif';
      //需要考虑到 ￥的问题,所以向前缩进了2
      ctx.fillText('￥', this.state.windowWidth * 0.055 - 2, this.state.pricePageY - 15);
    }
    // 填充价格文字
    ctx.font = 'normal bolder 16px sans-serif';
    // 判断是积分商品还是积分价商品，积分商品只展示积分
    if (this.props.isPointsGoods && this.props.pointsGoods.points != 0) {
    } else if (this.state.buyPoint && this.state.buyPoint != '') {
      ctx.fillText(
        this._getPrice(_.addZero(this.state.price)),
        this.state.windowWidth * 0.05 + ctx.measureText(this.state.buyPoint.toString() + buyPointText + '￥').width - 8,
        this.state.pricePageY - 15,
      );
    } else {
      ctx.fillText(
        _.addZero(this.state.price),
        this.state.windowWidth * 0.053 + ctx.measureText('￥').width - 5,
        this.state.pricePageY - 15,
      );
    }
    // 计算价格符号￥ + 价格文字宽度
    // let priceWidth = ctx.measureText(this.state.buyPoint + buyPointText + '￥' + _.addZero(this.state.price)).width;
    let priceWidth = ctx.measureText(
      this.state.buyPoint + buyPointText + '￥' + this._getPrice(_.addZero(this.state.price)),
    ).width;
    if (this.props.isPointsGoods) {
      priceWidth = ctx.measureText(this.state.buyPoint + buyPointText).width;
    }
    //设置规格集
    let specText = this.props.goodsInfo.specText ? this.props.goodsInfo.specText : '';
    ctx.setFillStyle('rgba(0,0,0,0.4)');
    ctx.font = 'normal normal 10px PingFangSC-Regular';
    //console.log(this.props.goodsInfo.specText)
    ctx.fillText(specText, this.state.windowWidth * 0.055, this.state.pricePageY - 30 - 4);
    //不展示画线价
    if (this.state.delPrice) {
      // 填充划线价文字
      ctx.setFillStyle('#999');
      ctx.font = 'normal normal 10px sans-serif';
      ctx.fillText('¥' + this.state.delPrice, this.state.windowWidth * 0.055 + priceWidth, this.state.pricePageY - 15);
      // 计算划线价宽度
      let delPriceWidth = ctx.measureText('¥' + this.state.delPrice).width;
      // 填充划线价横线
      ctx.beginPath();
      ctx.moveTo(priceWidth + 2 + this.state.windowWidth * 0.055, this.state.pricePageY - 18);
      ctx.lineTo(priceWidth + delPriceWidth + 2 + this.state.windowWidth * 0.055, this.state.pricePageY - 18);
      ctx.setStrokeStyle('#999');
      ctx.stroke();
      ctx.closePath();
    }
    // // 填充小程序码
    // ctx.drawImage(
    //   this.state.qrCode,
    //   this.state.windowWidth * 0.53,
    //   this.state.codePageY - 20,
    //   this.state.codeWidth,
    //   this.state.codeHeight,
    // );
    // 填充长按立即购买文本
    ctx.setFillStyle('#999');
    ctx.font = 'normal normal 9px sans-serif';
    ctx.fillText('长按立即购买', this.state.windowWidth * 0.54, this.state.codePageY - 20 + this.state.codeWidth + 10);
    console.log('this.state', ctx);
    //商品图片
    //绘制圆角矩形的各个边
    ctx.beginPath();
    //右下角圆弧，弧度从0到1/2PI
    ctx.arc(
      this.state.windowWidth * 0.048 + this.state.imgWidth - 6,
      this.state.imgPageY + this.state.imgWidth - 6,
      6,
      0,
      Math.PI / 2,
    );
    //下边线
    ctx.lineTo(this.state.windowWidth * 0.048 + 6, this.state.imgPageY + this.state.imgWidth);
    //左下角圆弧
    ctx.arc(this.state.windowWidth * 0.048 + 6, this.state.imgPageY + this.state.imgWidth - 6, 6, Math.PI / 2, Math.PI);
    //左边线
    ctx.lineTo(this.state.windowWidth * 0.048, this.state.imgPageY + 6);
    //从左上角，弧度从PI到3/2PI
    ctx.arc(this.state.windowWidth * 0.048 + 6, this.state.imgPageY + 6, 6, Math.PI, (Math.PI * 3) / 2);
    //矩形上边线
    ctx.lineTo(this.state.windowWidth * 0.048 + this.state.imgWidth - 6, this.state.imgPageY);
    //右上角圆弧，弧度从3/2PI到2PI
    ctx.arc(
      this.state.windowWidth * 0.048 + this.state.imgWidth - 6,
      this.state.imgPageY + 6,
      6,
      (Math.PI * 3) / 2,
      2 * Math.PI,
    );
    //矩形右边线
    ctx.lineTo(this.state.windowWidth * 0.048 + this.state.imgWidth, this.state.imgPageY + this.state.imgWidth - 6);
    ctx.closePath();
    ctx.setFillStyle('#fff');
    ctx.fill();
    ctx.clip();
    ctx.drawImage(
      this.state.goodsInfoImg ? this.state.goodsInfoImg : this.state.noDataIcon,
      this.state.windowWidth * 0.048,
      this.state.imgPageY,
      this.state.imgWidth,
      this.state.imgWidth,
    );
    ctx.draw(false, () => {
      //回调时可能没有真正画完
      setTimeout(() => {
        //生成图片
        Taro.canvasToTempFilePath(
          {
            x: 0,
            y: 0,
            width: this.state.windowWidth * 2,
            height: this.state.windowHeight * 2,
            canvasId: 'myCanvas',
            success: (res) => {
              var tempFilePath = res.tempFilePath;
              this.setState({canvasUrl: tempFilePath});
            },
          },
          this.$scope,
        );
      }, 800);
    }); //绘制到canvas
  };

  //画矩形，也是整块画布的大小，宽度是屏幕宽度，高度根据内容多少来动态设置。
  drawSquare = (ctx, height) => {
    let that = this;
    ctx.rect(0, 0, this.state.boxWidth, this.state.boxheight - 30, 8);
    //绘制圆角矩形的各个边
    that.drawRoundRectPath(ctx, this.state.boxWidth, height, 8);
    ctx.setFillStyle('#fff');
    ctx.fill();
  };

  drawRoundRectPath = (cxt, width, height, radius) => {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
    //矩形下边线
    cxt.lineTo(radius, height);
    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
    //矩形左边线
    cxt.lineTo(0, radius);
    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
    //上边线
    cxt.lineTo(width - radius, 0);
    //右上角圆弧
    cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
    //右边线
    cxt.lineTo(width, height - radius);
    cxt.closePath();
  };

  // 设置文字大小，并填充颜色。
  drawFont = (ctx, contentTitle, height) => {
    let str = this.state.contentTitle;
    let firstline;
    let secondline;
    //一行显示14个字，超过一行时
    if (str.length > 14) {
      //第一行截取前14个字符
      firstline = str.substring(0, 14);
      //两行都显示不下
      if (str.length > 28) {
        secondline = str.substr(14, 14) + '...';
      } else {
        //第二行取剩下的
        secondline = str.substr(14, str.length - 14);
      }
    } else {
      //一行就能显示时候
      firstline = str;
    }
    ctx.setFontSize(12);
    ctx.setFillStyle('#000');
    ctx.fillText(firstline, this.state.windowWidth * 0.055, this.state.titlePageY - 25);
    if (secondline) {
      ctx.setFontSize(12);
      ctx.setFillStyle('#333');
      ctx.fillText(secondline, this.state.windowWidth * 0.055, this.state.titlePageY - 10);
    }
    if (this.state.specText) {
      ctx.setFontSize(12);
      ctx.setFillStyle('#999999');
      ctx.fillText(this.state.specText, this.state.windowWidth * 0.055, this.state.specPageY - 14);
    }
  };

  /**
   * 保存图文分享至本地
   */
  _savePicLocal = () => {
    let canvasTemp = [];
    Taro.canvasToTempFilePath(
      {
        x: 0,
        y: 0,
        canvasId: 'myCanvas',
        success: (res) => {
          canvasTemp.push(res.tempFilePath);
          Promise.all(_.savePicToAlbumPromise(canvasTemp))
            .then((res) => {
              // Taro.showToast({
              //   title: '保存成功',
              // });
            })
            .catch((err) => {
              Taro.showToast({
                title: '保存失败',
              });
            });
        },
      },
      this.$scope,
    );
  };

  _savePic = () => {
    console.log('--------------changan');
    const {setIsRefresh} = this.props;
    console.log(setIsRefresh, '-------------setIsRefresh');
    Taro.canvasToTempFilePath(
      {
        x: 0,
        y: 0,
        width: this.state.windowWidth * 2,
        height: this.state.windowHeight * 2,
        canvasId: 'myCanvas',
        success: (res) => {
          //util.savePicToAlbum(res.tempFilePath);
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath, '-------tempFilePath');
          this.setState(
            {
              canvasUrl: tempFilePath,
            },
            () => {
              if (tempFilePath !== '') {
                Taro.previewImage({
                  current: this.state.canvasUrl, // 当前显示图片的http链接
                  urls: [this.state.canvasUrl], // 需要预览的图片http链接列表
                  complete(res) {
                    console.log('complete-----', typeof setIsRefresh);
                    // 是否触发componentDidShow
                    typeof setIsRefresh === 'function' && setIsRefresh();
                  },
                  fail: (err) => {
                    console.log(err);
                  },
                })
                  .then(() => {
                    console.log('---------then');
                  })
                  .catch((...val) => {
                    console.log(val, '---------------val');
                  });
              }
            },
          );
        },
      },
      this.$scope,
    );
  };
  // 金额过长后省略，截取价格使积分(包含单位文字等)+价格长度为10

  _getPrice = (price) => {
    if (this.state.buyPoint) {
      const pointSize = this.state.buyPoint ? this.state.buyPoint.toString().length : 0;
      const shotPrice = price.toString().slice(0, 6 - pointSize > 0 ? 6 - pointSize : 1);
      // console.log(pointSize + price.toString().length);
      return pointSize + price.toString().length > 6 ? shotPrice + '...' : shotPrice;
    }
    return price.toString().slice(0, 10);
  };
}
