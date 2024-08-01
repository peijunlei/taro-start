import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {AtTabBar} from 'taro-ui';
import {msg} from 'wmkit';
import api from 'api';
import './ footer.less';
import main from '@/assets/image/tab/main.png';
import mainCurr from '@/assets/image/tab/main-curr.png';
import shopcart from '@/assets/image/tab/shopcart.png';
import shopcartCurr from '@/assets/image/tab/shopcart-curr.png';
import my from '@/assets/image/tab/my.png';
import myCurr from '@/assets/image/tab/my-curr.png';
import ShopIndexC from '@/pages/package-B/distribution/store/social-c/shop-index-c';
import ShopCart from '@/pages/shop-cart';

type footerProps = {
  current: 0 | 1 | 2;
};
export default class Index extends Component<footerProps, any> {
  // componentWillMount() {
  //   msg.emit('shopCart-C');
  // }

  async componentWillMount() {
    const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
    msg.emit('shopCart-C');
    let num = isLogin ? await api.purchaseBaseController.countGoods() : 0;
    // let num =1;
    this.setState({num});
    msg.emit('my-C');
    msg.on({
      'shopCart-C-num': (num) => {
        console.log('shopCart-C-num111', num);
        this.setState({num});
      },
    });
  }

  componentDidShow() {}

  state = {
    num: 0,
    currentState: 0,
  };

  render() {
    const current = this.props.current;
    // @ts-ignore
    return (
      // <View>
      //   <View className="tabBars">
      //     <View className="tabBars-items" onClick={() => this.setState({currentState: 0})}>
      //       <View className="tabBars-icon">
      //         <Image className="tabBars-icon-item" src={this.state.currentState == 0 ? mainCurr : main}/>
      //       </View>
      //       <View className={`tabBars-name ${this.state.currentState == 0 ? 'active' : ''}`}>精选
      //       </View>
      //     </View>
      //     <View className="tabBars-items" onClick={() => this.setState({currentState: 1})}>
      //       <View className="tabBars-icon">
      //         <Image className="tabBars-icon-item" src={this.state.currentState == 1 ? shopcartCurr : shopcart}/>
      //       </View>
      //       <View
      //         className={`tabBars-name ${this.state.currentState == 1 ? 'active' : ''}`}>购物车</View>
      //     </View>
      //     <View className="tabBars-items" onClick={() => this.setState({currentState: 2})}>
      //       <View className="tabBars-icon">
      //         <Image className="tabBars-icon-item" src={this.state.currentState == 2 ? myCurr : my}/>
      //       </View>
      //       <View className={`tabBars-name ${this.state.currentState == 2 ? 'active' : ''}`}>我的</View>
      //     </View>
      //   </View>
      // </View>
      <AtTabBar
        selectedColor={'#FF6600'}
        color={'#999'}
        tabList={[
          {
            title: '店铺精选',
            image: main,
            selectedImage: mainCurr,
          },
          {
            title: '购物车',
            image: shopcart,
            selectedImage: shopcartCurr,
            text: this.state.num > 0 ? String(this.state.num) : null,
            max: 99,
          },
          {
            title: '我的',
            image: my,
            selectedImage: myCurr,
          },
        ]}
        onClick={async (index) => {
          await this._changeCase(index);
        }}
        current={current}
      />
    );
  }

  _changeCase = async (index) => {
    switch (index) {
      case 0:
        await Taro.redirectTo({url: '/pages/package-B/distribution/store/social-c/shop-index-c/index'});
        break;
      case 1:
        await Taro.redirectTo({url: '/pages/package-B/distribution/store/social-c/shop-cart-c/index'});
        break;
      case 2:
        await Taro.redirectTo({url: '/pages/package-B/distribution/store/social-c/shop-my-c/index'});
        break;
      default:
        return false;
    }
  };
}

//create by moon https://github.com/creasy2010/moon
