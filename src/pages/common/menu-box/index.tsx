import 'taro-ui/dist/style/components/modal.scss';
import {View, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {handleUrl} from 'wmkit';
import './menu-box.less';

export default class MenuBox extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  /**

   */
  render() {
    let {isMenuBoxFlag, menuList} = this.props;
    const token = Taro.getStorageSync('authInfo:token');
    return (
      <View>
        {isMenuBoxFlag && menuList.length > 0 && (
          <View className="menu-box">
            <View
              className="modal-mask"
              catchMove
              onTouchMove={() => this.props.handleClose()}
              onClick={() => this.props.handleClose()}
            ></View>
            <View className="menu-state">
              {menuList.map((v, i) => {
                const {linkInfoPage} = v || {};
                return (
                  <View
                    key={i}
                    onClick={() => {
                      this.props.handleClose();
                      if (token) {
                        handleUrl(JSON.parse(v.linkInfoPage));
                      } else {
                        // 订单需要进登录页面，购物车不需要
                        if (
                          linkInfoPage.includes('likeStore') ||
                          linkInfoPage.includes('follow') ||
                          (linkInfoPage.includes('order') && !linkInfoPage.includes('purchase-order'))
                        ) {
                          Taro.navigateTo({url: `/pages/package-A/login/login/index`});
                        } else {
                          handleUrl(JSON.parse(v.linkInfoPage));
                        }
                      }
                    }}
                    className="menu-state-child"
                  >
                    <Image src={v.imgSrc} className="icon" />
                    <Text className="menu-title">{v.title}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
