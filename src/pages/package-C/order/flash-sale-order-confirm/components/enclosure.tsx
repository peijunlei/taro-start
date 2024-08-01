import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '@/pages/package-C/order/flash-sale-order-confirm/css/enclosure.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import close from '../img/close-black.png';

type IEnclosureProps = T.IProps & T.IEnclosureProps;

@connect<Partial<IEnclosureProps>, T.IEnclosureState>(store2Props, actions)
export default class Enclosure extends Component<Partial<IEnclosureProps>, T.IEnclosureState> {
  constructor(props: IEnclosureProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      storeId,
      main: {
        orderList: {enclosures},
      },
    } = this.props;

    const enclosureList = enclosures && enclosures[storeId];

    return (
      <View>
        <View className="enclosure-con">
          {enclosureList &&
            enclosureList.length &&
            enclosureList.map((item, key) => {
              return (
                <View className="enclosure" key={key}>
                  <Image src={item} className="pic" />
                  <Image
                    src={close}
                    className="close-pic"
                    onClick={async () => {
                      await action._deleteImage(storeId, key);
                    }}
                  />
                </View>
              );
            })}
        </View>

        {enclosureList && enclosureList.length && (
          <Text className="enclosure-tips">仅支持jpg、jpeg、png、gif文件，最多上传10张，大小不超过5M</Text>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
