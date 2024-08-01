import {View, Button, Text, Image, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './detail-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import {_} from 'wmkit';
import close from '@/assets/image/distribution/close.png';

type IFriendListProps = T.IProps & T.IFriendListProps;

@connect<Partial<IFriendListProps>, T.IFriendListState>(store2Props, actions)
export default class DetailModal extends Component<Partial<IFriendListProps>, T.IFriendListState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IFriendListProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main: {detailState, detailList},
    } = this.props;

    return (
      <View className="packageBDistributionInviteFriends">
        <View className="salesRuleModal">
          <View className="modalBox">
            <View className="contentBox">
              {/* <Text className="title">业绩统计规则</Text> */}
              <RichText nodes={_.formatRichText(detailList)} />
            </View>
            <Image
              src={close}
              className="close"
              onClick={() => {
                commonChange('main.detailState', !detailState);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
