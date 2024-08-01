import {View, Button, Text, Image} from '@tarojs/components';
import React, {Component} from 'react';
import {AtModal} from 'taro-ui';

import * as T from '../types';
import './skeleton-big.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
import msLogo from '@/assets/image/goods/goods-detail/ms-logo.png';
import {_} from 'wmkit';
import 'taro-ui/dist/style/components/modal.scss';
import WMLoading from '@/pages/common/loading';
type IBigSpuListProps = T.IProps & T.IBigSpuListProps;

@connect<Partial<IBigSpuListProps>, T.IBigSpuListState>(store2Props, actions)
export default class BuyStatus extends Component<Partial<IBigSpuListProps>, T.IBigSpuListState> {
  constructor(props: IBigSpuListProps) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  /**
    预约
*/
  render() {
    let skeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <View className="goods-list-skeContainer-big">
        <View className="skeList-big">
          {skeList.map((item) => {
            return (
              <View className="skeItem-big" key={item}>
                <View className="skeItemTop-big"></View>
                <View className="skeItemBottom-big">
                  <View className="skeColor-big skeItemTitle-big"></View>
                  <View className="skeColor-big skeItemTitle-big"></View>
                  <View className="skeItemLineBox-big">
                    <View className="skeColor-big skeSqure1-big"></View>
                    <View className="skeColor-big skeSqure2-big"></View>
                  </View>
                  <View className="skeColor-big skeItemSpec-big"></View>
                  <View className="skeItemLineBox-big" style={{marginBottom: 0}}>
                    <View className="skeColor-big skeSqure3-big"></View>
                    <View className="skeColor-big skeSqure3-big"></View>
                    <View className="skeColor-big skeSqure3-big"></View>
                  </View>
                  <View className="skeItemLineBox1-big">
                    <View className="skeColor-big skeSqure4-big"></View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <WMLoading />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
