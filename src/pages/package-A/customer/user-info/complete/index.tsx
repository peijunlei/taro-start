import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from '../types';
import actions from '../actions';
import {store2Props} from '../selectors';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCCompleteGifts extends Component<Partial<T.IProps>, any> {
  render() {
    let {
      main,
      // main: {flag, growthValues, rewardFlag},
      actions: {action},
    } = this.props;
    return (
      <View
        className={main?.flag == false ? 'picker-container' : 'picker-container show-picker'}
        onClick={(e) => {
          e.stopPropagation();
          action.commonChange('main.flag', false);
        }}
      >
        <View
          className="picker-contents"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View>
            <Image className="img_zeng" src={require('../img/zeng.png')} />
            <View className="picker-view-wrap">
              {!main?.rewardFlag ? (
                <View className="view-wrap">
                  <Text className="top_name">完善账户信息</Text>
                  <Text className="top_fen">赢成长值，积分</Text>
                </View>
              ) : (
                <View className="view-wrap">
                  <Text className="top_name">您已完善账户信息</Text>
                  <Text className="top_fen">
                    {main?.growthValues?.growthValue ? main?.growthValues?.growthValue : 0}成长值{' '}
                    {main?.growthValues?.point ? main?.growthValues?.point : 0}积分即将到账
                  </Text>
                </View>
              )}

              <View className="View-wrap-box">
                <View className="box_" style={{marginRight: '10px'}}>
                  <Image className="img_box" src={require('../img/grow.png')} />
                  <View className="content_box">
                    <Text className="text_1">
                      {main?.growthValues?.growthValue ? main?.growthValues?.growthValue : 0}
                    </Text>
                    <Text className="text_2">成长值</Text>
                  </View>
                </View>
                <View className="box_">
                  <Image className="img_box" src={require('../img/integral.png')} />
                  <View className="content_box">
                    <Text className="text_1">{main?.growthValues?.point ? main?.growthValues?.point : 0}</Text>
                    <Text className="text_2">{main?.rewardFlag ? '积分即将到账' : '积分'}</Text>
                  </View>
                </View>
              </View>

              <View
                className="botton_"
                onClick={() =>
                  main?.rewardFlag
                    ? Taro.navigateTo({url: '/pages/package-A/customer/user/member-center/index'})
                    : action.commonChange('main.flag', !main?.flag)
                }
              >
                {main?.rewardFlag ? '去看看' : '现在就去'}
              </View>
            </View>
          </View>
          <View className="cancel" onClick={() => action.commonChange('main.flag', !main?.flag)}>
            <Image className="close" src={require('../img/close.png')} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
