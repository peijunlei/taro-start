import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import {store2Props} from '../selectors';
import {AtSwipeAction} from 'taro-ui';
import moment from 'dayjs';
import api from 'api';
import WMListView from '@/pages/common/list-view';
import {AppMessageVO} from 'api/MessageController';
import {_} from 'wmkit';
import defaultImg from '@/assets/image/default/no-info.png';
const timeIcon = require('@/assets/image/message/time-icon.png');
const iconFive = require('@/assets/image/message/icon-five.png');

type IListProps = T.IProps & T.IListProps;

let num = -1;
@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  constructor(props: IListProps) {
    super(props);
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;

    return (
      <View className="mess-list-con">
        <View className="time-con">
          <WMListView
            style={{width: 'calc(100vw + 10px)', paddingRight: '10px', height: 'calc(100vh - 108px)'}}
            reload={main?.reload}
            params={{}}
            url={'/appMessage/page'}
            dataPath={['appMessageVOPage']}
            getData={(list: AppMessageVO[], total) => {
              commonChange('main.list', list);
              commonChange('main.total', total);
            }}
            noneContent={'暂无消息哦～'}
            noneImg={defaultImg}
          >
            {main?.list.map((v, index) => {
              let diffDays = moment(v.sendTime).diff(_.TWOWEEKBEFORE, 'days'); //相差几天
              // 如果是两个星期前的日期
              if (diffDays < 0 && num === -1) {
                num = index;
              }
              return (
                <View className="wm-swipe-wrap" key={index}>
                  {num === index && (
                    <View className="mess-top mess-padding">
                      <Image className="time-icon" src={timeIcon} />
                      <Text className="mess-text">两周前的消息</Text>
                    </View>
                  )}
                  <AtSwipeAction
                    autoClose={true}
                    options={options}
                    className="AtSwipeAction-text"
                    onClick={async () => {
                      this._delete(v.appMessageId);
                    }}
                  >
                    <View
                      className="mess-box top-padding"
                      // onClick={async () => {
                      //   await this.readMessage(v.appMessageId, v.isRead);
                      //   await _.pageReplace(JSON.parse(v.routeParam));
                      // }}
                      onClick={() => this._jump(v)}
                    >
                      <Image className="mess-icon" src={v.imgUrl ? v.imgUrl : iconFive} />
                      <View>
                        <View className="mess-con">
                          <Text className="title">{v.title}</Text>
                          <Text className="time-tip">{_.recoverTime(v.sendTime)}</Text>
                        </View>
                        <View className="mess-con">
                          <Text className="content">{v.content}</Text>
                          {v.isRead === 0 && (
                            <View className="item-num-con">
                              <Text className="item-num">1</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </AtSwipeAction>
                </View>
              );
            })}
          </WMListView>
        </View>
      </View>
    );
  }

  _jump = debounce(
    async (v) => {
      await this.readMessage(v.appMessageId, v.isRead);
      await _.pageReplace(JSON.parse(v.routeParam));
    },
    800,
    {leading: true},
  );

  readMessage = async (id, isRead) => {
    if (isRead === 1) {
      return;
    }
    try {
      await api.messageController.setMessageRead(id);
      await this.props.actions.init();
    } catch (e) {}
    await this.props.actions.reload();
  };
  _delete = async (id) => {
    try {
      await api.messageController.deleteById_(id);
    } catch (e) {}
    await this.props.actions.reload();
  };
}

const options = [
  {
    text: '删除',
    style: {
      fontSize: 24,
      color: '#fff !important',
      background: 'linear-gradient(270deg,rgba(255,136,0,1) 0%,rgba(255,77,0,1) 100%)',
    },
  },
];
//create by moon https://github.com/creasy2010/moon
