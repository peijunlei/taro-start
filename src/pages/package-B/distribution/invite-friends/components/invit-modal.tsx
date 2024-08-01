import {View, Button, Text, Image, RichText, Canvas} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './invit-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import api from 'api';
import {cache} from "config";
import whiteBg from '@/assets/image/distribution/white-bg.png';
import closeIcon from '@/assets/image/common/coupon-close.png';
type IInvitModalProps = T.IProps & T.IInvitModalProps;

// @ts-ignore
@connect<Partial<IInvitModalProps>, T.IInvitModalState>(store2Props, actions)
export default class InvitModal extends Component<Partial<IInvitModalProps>, T.IInvitModalState> {
  static options = {
    addGlobalClass: true,
  };

  constructor(props: IInvitModalProps) {
    super(props);
    Taro.getSystemInfo({
      success: (res) => {
        // @ts-ignore
        this.state = {
          tempFilePath: '',
          contentHeight: 0,
          thinkList: [],
          contentTitle: '',
          myStoreText: '',
          storeGoodsText: '',
          buyNowText: '长按识别小程序码',
          canvasUrl: '',
          qrCode: '', //小程序码https图片路径
          accessToken: '',
          skuId: '',
          //背景图片
          goodsInfoImg: '',
          //规格
          specText: '',
          //分享类型
          shareType: 0,
          //邀请人会员ID
          inviteeId: '',
          token: '',
          x: 0, //左边文本图片X轴位置,
          y: 0, //boxY轴位置
          cx: '',
          cy: '',
          normalPageX: (res.windowWidth - res.windowWidth * 0.7467) / 2, //左边文本图片X轴位置
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          boxWidth: res.windowWidth * 0.7467, //分享图片box宽度
          boxHeight: res.windowWidth * 1.17, //分享图片box高度
          boxPageY: res.windowWidth * 0.081, //boxY轴位置
          storeGoodsTextPageY: 64 + res.windowWidth * 0.752 + 20 + 25, //’我的店铺 欢迎浏览‘Y轴位置
          codeWidth: res.windowWidth * 0.165, //小程序码图片宽度
          codeHeight: res.windowWidth * 0.165, //小程序码图片高度
          codePageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 40, //小程序码Y轴位置
          whiteBg: whiteBg, //白色背景
        };
      },
    });
  }

  async componentDidMount() {
    let {
      main: {shareImg},
    } = this.props;
    this.props.actions.action.commonChange('main.isLoadingFlag', true);

    //将商品图片的网络资源转化为临时文件
    const res = await Taro.downloadFile({url: shareImg});
    this.setState(
      {
        goodsInfoImg: res.tempFilePath,
      },
      () => {
        //获取logo
        //this._getLogo();
        //生成小程序码
        this.getQrCode();
      },
    );
  }

  /**
   */
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main: {invitState},
    } = this.props;

    //this.getTempFile(shareImg);
    return (
      <View
        className="mask"
        style={{height: this.state.windowHeight}}
        catchMove
        onClick={(e) => {
          // e.stopPropagation();
          commonChange('main.invitState', !invitState);
        }}
      >
        <View className="mask-box">
          <View
            className="mask-content"
            onClick={(e) => {
              // e.stopPropagation()
            }}
          >
            <Canvas canvasId="myCanvas1" className="myCanvas1" onLongTap={() => this._savePic()}></Canvas>
            {/* <Image
              src="{{goodsInfoImg}}"
              onLoad={(e) => {
                this.checkwh(e);
              }}

            /> */}
          </View>
          <View className="mask-close" onClick={() => commonChange('main.invitState', !invitState)}>
            <Image src={closeIcon} className="mask-close-img" />
          </View>
        </View>
      </View>
    );
  }

  //获取logo
  _getLogo = async () => {
    const res = await api.systemController.findBaseConfig();
    const {pcIco, storeId} = res;
    // 存储当前品牌商城ID
    // localStorage.setItem(cache.STORE_ID, storeId);
    Taro.setStorageSync(cache.STORE_ID, storeId);
    const logo = pcIco ? JSON.parse(pcIco)[0].url : '';
    if (logo) {
      //网络资源都要转为临时文件
      const result = await Taro.downloadFile({url: logo});
      this.setState({
        goodsInfoImg: result.tempFilePath,
      });
    }
  };
  //自定义
  _getData = () => {
    let that = this;

    let i = 0;
    let lineNum = 1;
    let thinkStr = '';
    let thinkList = [];
    for (let item of that.state.contentTitle) {
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
    that.setState({
      thinkList: thinkList,
    });
    that.createNewImg(lineNum);
  };

  //画矩形，也是整块画布的大小，宽度是屏幕宽度，高度是微信小程序可视区域的高度。
  drawSquare = (ctx, height) => {
    let that = this;
    ctx.rect(that.state.windowWidth * 0.7467, that.state.boxPageY, that.state.boxWidth, height);
    ctx.setFillStyle('#fff');
    ctx.fill();
  };

  // 根据文字多少动态计算高度，然后依次画出矩形，文字，横线和小程序码。
  createNewImg = (lineNum) => {
    let that = this;
    let ctx = Taro.createCanvasContext('myCanvas1', this.$scope);

    // let ctx = Taro.createCanvasContext("myCanvas1");
    let cW = this.state.windowWidth;
    let contentHeight = that.state.boxHeight;
    that.drawSquare(ctx, contentHeight);
    that.setState({
      contentHeight: contentHeight,
    });
    //商品图片
    ctx.drawImage(that.state.goodsInfoImg, 0, 0, this.state.boxWidth, this.state.boxHeight);

    //填充小程序码背景
    let code_width = that.state.codeWidth + 10; //绘制的头像宽度
    let code_heigth = that.state.codeHeight + 10; //绘制的头像高度
    let code_x = (that.state.boxWidth - code_width) / 2; //绘制的头像在画布上的X轴位置
    let code_y = contentHeight - code_heigth - 40; //绘制的头像在画布上的Y轴位置
    ctx.save();
    ctx.beginPath();
    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    ctx.arc(code_width / 2 + code_x, code_heigth / 2 + code_y, code_width / 2, 0, Math.PI * 2, false);
    ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
    ctx.drawImage(this.state.whiteBg, code_x, code_y, code_width, code_heigth); // 推进去图片，必须是https图片
    // 填充小程序码
    ctx.drawImage(that.state.qrCode, code_x + 5, code_y + 5, that.state.codeWidth, that.state.codeHeight);
    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 还可以继续绘制
    // 填充长按立即购买文本
    ctx.setFillStyle('#fff');
    ctx.font = 'normal normal 12px sans-serif';
    let buyNowWidth = ctx.measureText(that.state.buyNowText).width;
    ctx.fillText(that.state.buyNowText, (that.state.boxWidth - buyNowWidth) / 2, contentHeight - 20);

    ctx.draw(); //绘制到canvas
  };

  // 保存图片
  _savePic = () => {
    let that = this;
    Taro.canvasToTempFilePath(
      {
        x: 0,
        y: 0,
        width: that.state.windowWidth * 2,
        height: that.state.windowHeight * 2,
        canvasId: 'myCanvas1',
        success: (res) => {
          //util.savePicToAlbum(res.tempFilePath);
          var tempFilePath = res.tempFilePath;
          this.setState(
            {
              canvasUrl: tempFilePath,
            },
            () => {
              if (tempFilePath !== '') {
                Taro.previewImage({
                  current: this.state.canvasUrl, // 当前显示图片的http链接
                  urls: [this.state.canvasUrl], // 需要预览的图片http链接列表
                });
              }
            },
          );
        },
      },
      this.$scope,
    );
  };

  //生成商品码，此处要分分享类型，0：普通分享，1：分享赚(店铺内) ,2：分享赚（店铺外）3:邀新，4：分享店铺
  getQrCode = async () => {
    let {
      actions: {
        action: {commonChange},
      },
      main: {shareImg, inviteeId, isDistributor},
    } = this.props;
    console.log('立即邀请inviteeId===>', inviteeId)
    try {
      const qrCode = await api.distributionMiniProgramController.distributionMiniProgramQrCode({
        tag: 'register',
        inviteeId: inviteeId,
      });
      //成功获取到
      if (qrCode) {
        //转成临时文件
        let res = await Taro.downloadFile({url: qrCode});
        this.setState(
          {
            qrCode: res.tempFilePath,
          },
          () => {
            //开始绘图
            this._getData();
            commonChange('main.isLoadingFlag', false);
          },
        );
      } else {
        commonChange('main.isLoadingFlag', false);
        commonChange('main.invitState', false);
        Taro.showToast({
          title: '功能不可用',
          icon: 'none',
          duration: 2000,
        });
      }
    } catch (e) {
      setTimeout(() => {
        commonChange('main.isLoadingFlag', false);
      }, 3000);
      commonChange('main.invitState', false);
      Taro.showToast({
        title: '功能不可用',
        icon: 'none',
        duration: 2000,
      });
    }
  };
  checkwh = (e) => {
    let that = this;
    let w = e.detail.width;
    let h = e.detail.height;
    let cH = that.state.boxHeight;
    let cW = that.state.boxWidth;
    var dw = cW / w; //canvas与图片的宽高比
    var dh = cH / h;
    // 裁剪图片中间部分
    if ((w > cW && h > cH) || (w < cW && h < cH)) {
      if (dw > dh) {
        that.setState({
          x: 0,
          y: (h - cH / dw) / 2,
          cx: w,
          cy: cH / dw,
        });
      } else {
        that.setState({
          x: (w - cW / dh) / 2,
          y: 0,
          cx: cW / dh,
          cy: h,
        });
      }
    }
    // 拉伸图片
    else {
      if (w < cW) {
        that.setState({
          x: 0,
          y: (h - cH / dw) / 2,
          cx: w,
          cy: cH / dw,
        });
      } else {
        that.setState({
          x: (w - cW / dh) / 2,
          y: 0,
          cx: cW / dh,
          cy: h,
        });
      }
    }
  };
}

//create by moon https://github.com/creasy2010/moon
