import {Image, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import '@/pages/common/style/swipe.scss';
// import '../center/components/list.less';
import './index.less';
import {AtSwipeAction} from 'taro-ui';
import {connect} from 'react-redux';
import * as T from './types';
import {store2Props} from './selectors';
import actions from './actions';
import {AppMessageVO} from 'api/MessageController';
import moment from 'dayjs';
import WMListView from '@/pages/common/list-view';
import {_} from 'wmkit';
import api from 'api';

const timeIcon = require('@/assets/image/message/time-icon.png');
const iconFive = require('@/assets/image/message/icon-five.png');
import defaultImg from '@/assets/image/default/no-info.png';
let num = -1;

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerMessagePushList extends Component<Partial<T.IProps>, any> {
  async onPullDownRefresh() {
    let messageType = getCurrentInstance().router.params.messageType;
    await Taro.setNavigationBarTitle({
      title: messageType === '1' ? '服务通知' : '优惠促销',
    });
    await this.props.actions.reload(messageType);
    num = -1;
    Taro.stopPullDownRefresh();
  }

  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    let messageType = getCurrentInstance().router.params.messageType;
    await Taro.setNavigationBarTitle({
      title: messageType === '1' ? '服务通知' : '优惠促销',
    });
    await this.props.actions.init(messageType);
    num = -1;
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  async componentWillUnmount() {
    await this.props.actions.clean();
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;

    return (
      <View className="mess-push-list">
        <View className="mess-list-con" style={{marginTop: '0'}}>
          <View className="time-con">
            <WMListView
              reload={main && main.reload}
              url={'/appMessage/page'}
              params={{messageType: getCurrentInstance().router.params.messageType, pageSize: 15}}
              dataPath={['appMessageVOPage']}
              getData={(list: AppMessageVO[], total) => {
                if (list) {
                  commonChange('main.list', list);
                  commonChange('main.total', total);
                }
              }}
              noneImg={defaultImg}
              noneContent={'暂无消息哦～'}
            >
              {main &&
                main.list &&
                main.list.map((m, index) => {
                  let diffDays = moment(m.sendTime).diff(_.TWOWEEKBEFORE, 'days'); //相差几天
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
                        onClick={async () => {
                          this._delete(m.appMessageId);
                        }}
                      >
                        <View
                          className="mess-box top-padding"
                          onClick={async () => {
                            await this.readMessage(m.appMessageId, m.isRead);
                            await _.pageReplace(JSON.parse(m.routeParam));
                          }}
                        >
                          <Image className="mess-icon" src={m.imgUrl ? m.imgUrl : iconFive} />
                          <View>
                            <View className="mess-con">
                              <Text className="title">{m.title}</Text>
                              <Text className="time-tip">{_.recoverTime(m.sendTime)}</Text>
                            </View>
                            <View className="mess-con">
                              <Text className="content">{m.content}</Text>
                              {m.isRead === 0 && (
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
      </View>
    );
  }

  readMessage = async (id, isRead) => {
    if (isRead === 1) {
      return;
    }
    try {
      await api.messageController.setMessageRead(id);
    } catch (e) {}
    await this.props.actions.reload(getCurrentInstance().router.params.messageType);
  };

  _delete = async (id) => {
    try {
      await api.messageController.deleteById_(id);
    } catch (e) {}
    await this.props.actions.reload(getCurrentInstance().router.params.messageType);
  };
}

const options = [
  {
    text: '删除',
    style: {
      background: 'linear-gradient(270deg,rgba(255,136,0,1) 0%,rgba(255,77,0,1) 100%)',
      color: '#fff',
    },
  },
];
