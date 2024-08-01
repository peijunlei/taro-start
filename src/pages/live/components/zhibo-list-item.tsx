import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './zhibo-list-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import ZhiboStatus from './zhibo-status';

const play = require('@/assets/image/live/play_back.png'); //回看播放
const avatar = require('@/assets/image/live/avatar.png'); //默认头像图片
const list = require('@/assets/image/live/list.png'); //默认列表图片

type IZhiboListItemProps = T.IProps & T.IZhiboListItemProps;

@connect<Partial<IZhiboListItemProps>, T.IZhiboListItemState>(store2Props, actions)
export default class ZhiboListItem extends Component<Partial<IZhiboListItemProps>, T.IZhiboListItemState> {
  constructor(props: IZhiboListItemProps) {
    super(props);
  }

  config = {
    usingComponents: {
      subscribe: 'plugin-private://wx2b03c6e691cd7370/components/subscribe/subscribe',
    },
  };

  /**

*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main,
      data,
    } = this.props;
    const goods: any = main.liveGoodsList[data.roomId];
    const url = 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + data.roomId;
    const logo =
      main && main.logoList[data.storeId] && main.logoList[data.storeId].storeLogo
        ? main.logoList[data.storeId].storeLogo
        : '';
    return (
      <View
        className="zhiboListItem"
        onClick={async () => {
          await this.handleListItem(url);
        }}
      >
        <View className="itemStatus">
          <ZhiboStatus status={data.liveStatus} startTimeSting={data.startTimeSting} />
        </View>
        <View
          className="itemLeft"
          style={{
            background: 'url(' + (data && data.shareImg ? data.shareImg : list) + ') no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          {data.liveStatus == 4 && <Image src={play} className="itemPlay" />}
        </View>
        <View className="itemRight">
          <View className="itemTitle">{data?.name}</View>
          <View className="user">
            <View className="userAvatar">
              <Image className="avatarImg" src={logo ? logo : avatar} />
            </View>
            <Text className="username">{data.anchorName}</Text>
          </View>
          <View className="itemBottom">
            <View className="itemContent">{goods.length > 0 ? goods[0].name : ''}</View>
            <View className="lists">
              {goods &&
                goods.map((item, index) => {
                  if (index < 3) {
                    return (
                      <View
                        key={index}
                        className="listImgBox"
                        onClick={async (e) => {
                          await this.handleListGoods(e, item);
                        }}
                      >
                        <Image src={item.coverImgUrl ? item.coverImgUrl : list} className="listImg" />
                        <View className="priceBox">
                          <View className="itemPrice">{item.price}</View>
                        </View>
                      </View>
                    );
                  }
                })}
            </View>
            <View className="subscribeBtn">
              <subscribe room-id={[data.roomId]} stopPropagation={true}></subscribe>
            </View>
          </View>
        </View>
      </View>
    );
  }

  //点击商品
  handleListGoods = async (e, item) => {
    e.stopPropagation(); //阻止事件冒泡
    let {
      actions: {action},
      main,
    } = this.props;

    const getOpenStatus = await action.isOpen();
    if (getOpenStatus > 0) {
      Taro.navigateTo({url: '../../' + item.url}); //跳转到详情
    }
  };

  //点击直播间
  handleListItem = async (url) => {
    let {
      actions: {action},
      main,
    } = this.props;

    const getOpenStatus = await action.isOpen();
    if (getOpenStatus > 0) {
      Taro.navigateTo({url: url});
    }
  };
}

//create by moon https://github.com/creasy2010/moon
