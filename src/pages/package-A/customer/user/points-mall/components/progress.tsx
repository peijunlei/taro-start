import {ComponentClass} from 'react';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {View, Canvas, Text} from '@tarojs/components';
import './progress.less';

type PageOwnProps = {};

type PageState = {};

type PageStateProps = {
  data: string;
  color: string;
  progress: SVGAnimatedNumberList;
};
type PageDispatchProps = {
  show: () => void;
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface RoundProgress {
  props: IProps;
}
let windowWidth; // 可使用窗口宽度
let windowHeight; // 可使用窗口高度
let ratio; // 根据尺寸动态计算 1px换算成多少rpx
class RoundProgress extends Component<any, any> {
  static defaultProps = {
    data: '心理资本',
    color: '#7D79F3',
    progress: 0,
  };

  //绘制背景
  drawProgressbg() {
    Taro.getSystemInfo({
      success: (res) => {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
        // 屏幕宽度 375px = 750rpx，1px=2rpx
        // 1px = （750 / 屏幕宽度）rpx；
        // 1rpx = （屏幕宽度 / 750）px;
        ratio = 750 / windowWidth;
      },
    });
    console.log(windowWidth + '======' + windowHeight + '======ratio:' + 40 / ratio);
    const ctx = Taro.createCanvasContext('canvasProgressbg', this);
    ctx.setLineWidth(2); // 设置圆环的宽度
    ctx.setStrokeStyle('#E6E6E6'); // 设置圆环的颜色
    ctx.setLineCap('round'); // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(46 / ratio, 46 / ratio, 39 / ratio, 0, 2 * Math.PI, false); //x,y,半径,开始,结束
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  }
  /**
   * 画progress进度
   */
  drawCircle(step) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = Taro.createCanvasContext('canvasProgress', this);
    // 设置圆环的宽度
    context.setLineWidth(3);
    // 设置圆环的颜色
    context.setStrokeStyle('#FF6600');
    // 设置圆环端点的形状
    context.setLineCap('round');
    //开始一个新的路径
    context.beginPath();
    //参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(46 / ratio, 46 / ratio, 39 / ratio, -Math.PI / 2, step * 2 * Math.PI - Math.PI / 2, false);
    //对当前路径进行描边
    context.stroke();
    //开始绘制
    context.draw();
  }

  render() {
    return (
      <View className="points-mall-coupon">
        {/* <Canvas className="progress_bg" canvasId="canvasProgressbg">  </Canvas>
        <Canvas className="progress_canvas" canvasId="canvasProgress">  </Canvas> */}
        <View className="progress_text">
          <Text className="progress_info1">已抢</Text>
          <Text className="progress_info"> {this.props.data}</Text>
        </View>
      </View>
    );
  }
}

export default RoundProgress as ComponentClass<PageOwnProps, PageState>;
