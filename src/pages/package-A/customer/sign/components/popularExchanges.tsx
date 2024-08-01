import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './popularExchanges.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMButton from '@/pages/common/button';
import arrowIcon from '@/assets/image/common/arrow-right.png';
import ranking1 from '@/assets/image/common/ranking-1.png';
import ranking2 from '@/assets/image/common/ranking-2.png';
import ranking3 from '@/assets/image/common/ranking-3.png';
import defaultImg from '@/assets/image/customer/user-center/default.png';
type IPopularExchangesProps = T.IProps & T.IPopularExchangesProps;

@connect<Partial<IPopularExchangesProps>, T.IPopularExchangesState>(store2Props, actions)
export default class PopularExchanges extends Component<Partial<IPopularExchangesProps>, T.IPopularExchangesState> {
  constructor(props: IPopularExchangesProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="popularExchanges">
        <View className="title">
          热门兑换
          <WMButton theme="primary">
            积分商城
            <Image src={arrowIcon} className="arrow-icon" />
          </WMButton>
        </View>
        <View className="temp">
          <ScrollView className="scroll-list" scrollX>
            <View className="exchange-list">
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
              <View className="item">
                <View className="img-wrap">
                  <Image src={defaultImg} className="img" />
                  <Image src={ranking1} className="ranking" />
                  <Image src={ranking2} className="ranking" />
                  <Image src={ranking3} className="ranking" />
                  <Text className="hot">热</Text>
                </View>
                <View className="bottom-wrap">
                  <View className="name">小猫咪夏季</View>
                  <View className="info">
                    <Text className="num">228</Text>
                    <Text className="grey">积分</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
