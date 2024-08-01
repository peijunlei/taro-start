import {View, Button, Text, Canvas, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './share-modal.less';
import api from 'api';
import whiteBg from '@/assets/image/distribution/white-bg.png';
import closeIcon from '@/assets/image/common/coupon-close.png';

export default class extends Component<any, any> {
  constructor(props: any) {
    super(props);
    let {baseInfo, headImg, inviteeId} = this.props;
    Taro.getSystemInfo({
      success: (res) => {
        this.state = {
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          boxWidth: res.windowWidth * 0.7467, //分享图片box宽度
          boxHeight: res.windowWidth * 1.17, //分享图片box高度
          thinkList: [],
          contentTitle: '严选家 每日坚果 乐享生活',
          // storeName: '小猪佩奇的店铺',
          saleMan: '达人店主',
          myStoreText: '我的店铺 欢迎浏览',
          storeGoodsText: '店铺所有商品特价',
          buyNowText: '长按识别小程序码',
          boxPageY: res.windowWidth * 0.081, //boxY轴位置
          storeGoodsTextPageY: 64 + res.windowWidth * 0.752 + 20 + 25, //’我的店铺 欢迎浏览‘Y轴位置
          codeWidth: res.windowWidth * 0.165, //小程序码图片宽度
          codeHeight: res.windowWidth * 0.165, //小程序码图片高度
          storeName:
            `${
              baseInfo.customerName.length == 11 && baseInfo.customerName.indexOf('****') != -1
                ? '*' + baseInfo.customerName.split('****')[1]
                : baseInfo.customerName
            }` + `的${baseInfo.shopName}`,
          inviteeId,
          headImg,
          whiteBg: whiteBg,
        };
      },
    });
  }

  async componentDidMount() {
    const {baseInfo, headImg, inviteeId} = this.props;
    await Taro.showLoading();
    //将商品图片的网络资源转化为临时文件
    const res = await Taro.downloadFile({url: baseInfo.shopShareImg});
    this.setState(
      {
        shopShareImg: res.tempFilePath,
      },
      async () => {
        //获取logo
        if (headImg.indexOf('default.png')) {
          this.setState({headImg: res.tempFilePath});
        } else if (headImg.indexOf('https') == -1) {
          const res = await Taro.downloadFile({url: headImg.replace(/http/g, 'https')});
          this.setState({headImg: res.tempFilePath});
        }
        //生成小程序码
        await this._getQrcode();
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shareModalVisible != this.props.shareModalVisible) {
      this.setState({
        shareModalVisible: nextProps.shareModalVisible,
      });
    }
  }

  /**
   分享到微信/朋友圈弹窗
   */
  render() {
    return (
      <View className="mask" style={{height: this.state.windowHeight}} onClick={(e) => this.handleClose(e)}>
        <View className="mask-box">
          <View
            catchMove
            className="mask-content"
            onClick={(e) => {
              // e.stopPropagation()
            }}
          >
            <Canvas canvasId="myCanvas" className="myCanvas" onLongTap={() => this._savePic()}></Canvas>
          </View>
          <View className="mask-close" onClick={(e) => this.handleClose(e)}>
            <Image src={closeIcon} className="mask-close-img" />
          </View>
        </View>
      </View>
    );
  }

  handleClose = (e) => {
    e.stopPropagation();
    this.setState({
      shareModalVisible: false,
    });
    if (this.props.closeVisible) {
      this.props.closeVisible();
    }
  };

  _getQrcode = async () => {
    let shareType = this.props.shareType;
    let goodsInfo = this.props.goodsInfo;
    let params;
    let url;
    let qrCode;

    try {
      qrCode = await api.distributionMiniProgramController.distributionMiniProgramQrCode({
        tag: 'shop',
        inviteeId: this.props.inviteeId,
      });
    } catch (e) {
      Taro.showToast({title: '功能不可用'});
      setTimeout(() => {
        Taro.hideLoading();
      }, 3000);
      if (this.props.closeVisible) {
        this.props.closeVisible();
      }
    }

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
          Taro.hideLoading();
        },
      );
    } else {
      Taro.showToast({title: '功能不可用'});
      setTimeout(() => {
        Taro.hideLoading();
      }, 3000);
      if (this.props.closeVisible) {
        this.props.closeVisible();
      }
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
    this.setState({
      thinkList: thinkList,
    });
    this._createNewImg(lineNum);
  };

  // 根据文字多少动态计算高度，然后依次画出矩形，文字，横线和小程序码。
  _createNewImg = (lineNum) => {
    let ctx = Taro.createCanvasContext('myCanvas', this.$scope);
    let contentHeight = this.state.boxHeight;
    let headImg = this.state.headImg;
    let cW = this.state.windowWidth;
    this.drawSquare(ctx, contentHeight);
    this.setState({
      contentHeight: contentHeight,
    });
    // let height = 100;
    // for (let item of this.state.thinkList) {
    //   if (item !== 'a') {
    //     this.drawFont(ctx, item, height);
    //     height += this.state.lineHeight;
    //   }
    // }

    // 削减圆角边框
    ctx.beginPath();
    //从右下角顺时针绘制，弧度从0到1/2PI
    ctx.arc(this.state.boxWidth - 8, this.state.boxHeight - 8, 8, 0, Math.PI / 2);

    //矩形下边线
    ctx.lineTo(8, this.state.boxHeight);

    //左下角圆弧，弧度从1/2PI到PI
    ctx.arc(8, this.state.boxHeight - 8, 8, Math.PI / 2, Math.PI);

    //矩形左边线
    ctx.lineTo(0, 8);

    //左上角圆弧，弧度从PI到3/2PI
    ctx.arc(8, 8, 8, Math.PI, (Math.PI * 3) / 2);

    //上边线
    ctx.lineTo(this.state.boxWidth - 8, 0);

    //右上角圆弧
    ctx.arc(this.state.boxWidth - 8, 8, 8, (Math.PI * 3) / 2, Math.PI * 2);

    //右边线
    ctx.lineTo(this.state.boxWidth, this.state.boxHeight - 8);
    ctx.closePath();
    ctx.fill();
    ctx.clip();

    //背景图片
    ctx.drawImage(this.state.shopShareImg, 0, 0, this.state.boxWidth, this.state.boxHeight);

    const aa = () => {
      ctx.font = 'normal normal 14px sans-serif'; //ctx.font会影响测量字体的宽度
      let storeName =
        this.state.storeName.length > 15 ? this.state.storeName.substring(0, 15) + '...' : this.state.storeName;
      const storeNameWidth = ctx.measureText(storeName).width;

      // --绘制文本背景
      // 创建渐变区域
      const grd = ctx.createLinearGradient(28, 22, 24 + storeNameWidth + 8, 42);
      // const grd = ctx.createLinearGradient(0,0,0,0);

      grd.addColorStop(0, 'rgba(0,0,0,.05)');
      grd.addColorStop(1, 'rgba(0,0,0,.3)');
      // 绘制并填充一个圆角矩形
      this.fillRoundRect(ctx, 28, 22, storeNameWidth + 32, 20, 10, grd);

      //--绘制文本内容
      ctx.setFillStyle('#FFF');
      //填充店铺名称文本
      ctx.fillText(storeName, 52, 36);
      const storeNameWidth2 = ctx.measureText('中二居居居的店铺').width;
    };
    aa();

    //绘制头像
    //ctx.drawImage('../../static/images/avatar.jpg', that.data.avatarPageX, that.data.avatarPageY, 25, 25);
    let avatarurl_width = 32; //绘制的头像宽度
    let avatarurl_heigth = 32; //绘制的头像高度
    let avatarurl_x = 12; //绘制的头像在画布上的X轴位置
    let avatarurl_y = 14; //绘制的头像在画布上的Y轴位置
    ctx.save();
    ctx.beginPath();
    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    ctx.arc(
      avatarurl_width / 2 + avatarurl_x,
      avatarurl_heigth / 2 + avatarurl_y,
      avatarurl_width / 2,
      0,
      Math.PI * 2,
      false,
    );
    ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
    ctx.drawImage(headImg, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 还可以继续绘制

    // aa()

    //计算达人文本宽度
    // ctx.font = 'normal normal 10px sans-serif';
    // let saleManWidth = ctx.measureText(this.state.saleMan).width;
    // let saleManHeight = ctx.measureText(this.state.saleMan).height;
    //填充小程序码背景
    let code_width = this.state.codeWidth + 10; //绘制的头像宽度
    let code_heigth = this.state.codeHeight + 10; //绘制的头像高度
    let code_x = (this.state.boxWidth - code_width) / 2; //绘制的头像在画布上的X轴位置
    let code_y = contentHeight - code_heigth - 40; //绘制的头像在画布上的Y轴位置
    ctx.save();
    ctx.beginPath();
    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    // ctx.arc(code_width / 2 + code_x, code_heigth / 2 + code_y, code_width / 2, 0, Math.PI * 2, false);
    ctx.arc(code_width / 2 + code_x, code_heigth / 2 + code_y, code_width / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
    // ctx.drawImage(this.state.whiteBg, code_x, code_y); // 推进去图片，必须是https图片
    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 还可以继续绘制

    // 填充小程序码
    ctx.drawImage(this.state.qrCode, code_x + 5, code_y + 5, this.state.codeWidth, this.state.codeHeight);
    // 填充长按立即购买文本
    ctx.setFillStyle('#FFF');
    ctx.font = 'normal normal 12px sans-serif';
    let buyNowWidth = ctx.measureText(this.state.buyNowText).width;
    ctx.fillText(this.state.buyNowText, (this.state.boxWidth - buyNowWidth) / 2, contentHeight - 20);

    ctx.draw(); //绘制到canvas
  };

  //画矩形，也是整块画布的大小，宽度是屏幕宽度，高度根据内容多少来动态设置。
  drawSquare = (ctx, height) => {
    let that = this;
    ctx.rect(that.state.windowWidth * 0.7467, that.state.boxPageY, that.state.boxWidth, height);
    ctx.setFillStyle('#F7F1EB');
    ctx.fill();
  };

  // 设置文字大小，并填充颜色。
  drawFont = (ctx, contentTitle, height) => {
    let that = this;
  };

  /**该方法用来绘制一个有填充色的圆角矩形
   *@param cxt:canvas的上下文环境
   *@param x:左上角x轴坐标
   *@param y:左上角y轴坐标
   *@param width:矩形的宽度
   *@param height:矩形的高度
   *@param radius:圆的半径
   *@param fillColor:填充颜色
   **/
  fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) {
      return false;
    }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    this.drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || '#000'; //若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
  }

  drawRoundRectPath(cxt, width, height, radius) {
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
  }

  _savePic = () => {
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
}
