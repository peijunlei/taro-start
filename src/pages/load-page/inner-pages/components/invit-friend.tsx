import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './invit-friend.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';

type IInvitFriendProps = T.IProps & T.IInvitFriendProps;

@connect<Partial<IInvitFriendProps>, T.IInvitFriendState>(store2Props, actions)
export default class InvitFriend extends Component<Partial<IInvitFriendProps>, T.IInvitFriendState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IInvitFriendProps) {
    super(props);
  }

  /**

*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {distributeSetting},
    } = this.props;
    // 是否开启社交分销 0：关闭，1：开启
    const openFlag = distributeSetting.openFlag;
    // 是否开启邀请奖励 0：关闭，1：开启
    const inviteFlag = distributeSetting.inviteFlag;
    return (
      <View className="invitFriend">
        {distributeSetting && openFlag == 1 && inviteFlag == 1 && (
          <Image
            src={distributeSetting.inviteEnterImg}
            className="banner"
            onClick={() => {
              Taro.navigateTo({url: '/pages/package-B/distribution/invite-friends/index'});
            }}
          />
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
