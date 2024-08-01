import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './goods-share.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

const share = require('@/assets/image/distribution/share.png');

type IGoodsShareProps = T.IProps & T.IGoodsShareProps;

@connect<Partial<IGoodsShareProps>, T.IGoodsShareState>(store2Props, actions)
export default class GoodsShare extends Component<Partial<IGoodsShareProps>, T.IGoodsShareState> {
  constructor(props: IGoodsShareProps) {
    super(props);
  }

  /**
    分享赚step1
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      main.goodsShareVisible && (
        <View className="goodsShare">
          <View className="mask"></View>
          <View className="menuContainer">
            <View className="header ">
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text className="price">分享给好友</Text>
              </View>
            </View>

            <View className="shareBox">
              <Image
                src={share}
                className="icon"
                onClick={() => {
                  if (!main.isOpenWechat) {
                    Taro.showToast({
                      title: '功能不可用',
                      icon: 'none',
                      duration: 2000,
                    });
                  } else {
                    action.commonChange('main.goodsShareVisible', false);
                    action.commonChange('main.groupShareModal', true);
                  }
                }}
              ></Image>
              <Text className="text">图文分享</Text>
            </View>

            <View
              className="btn"
              onClick={() => {
                action.commonChange('main.goodsShareVisible', false);
              }}
            >
              <Text className="btntext">取消分享</Text>
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
