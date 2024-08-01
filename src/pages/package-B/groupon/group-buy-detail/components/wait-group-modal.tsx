import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './wait-group-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
import WMListView from '@/pages/common/list-view';
import CountDown from '@/pages/common/count-down';
import {WMkit} from 'wmkit';

const defaultAvatar = require('@/assets/image/groupon/default-avatar.png');

import close from '@/assets/image/common/close.png';

type IWaitGroupModalProps = T.IProps & T.IWaitGroupModalProps;

@connect<Partial<IWaitGroupModalProps>, Partial<T.ActionType>>(store2Props, actions)
export default class WaitGroupModal extends Component<Partial<IWaitGroupModalProps>, T.IWaitGroupModalState> {
  constructor(props: IWaitGroupModalProps) {
    super(props);
    this.state = {
      list: [],
      total: 0,
    };
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="waitGroupModal">
        <View className="mask-container">
          <View className="mask-header">
            <Text className="header-text">等待成团</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await action.commonChange('main.waitGroupModal', false);
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <View className="mask-con">
            <View className="group-list">
              <WMListView
                url="/groupon/instance/page"
                params={{
                  grouponActivityId: main.grouponDetails.grouponActivity.grouponActivityId,
                }}
                style={{height: '100%'}}
                dataPath={['grouponInstanceVOS', 'content']}
                getData={(list, total) => {
                  this.setState({
                    list: list,
                    total: total,
                  });
                }}
              >
                {this.state.list.map((item, index) => {
                  //拼团结束时间
                  const endTime = moment(item.endTime);
                  return (
                    <View className="item" key={Math.random()}>
                      <View className="left">
                        <Image className="head" src={item.headimgurl ? item.headimgurl : defaultAvatar} />
                        <View className="info">
                          <Text className="info-name">{this._name(item)}</Text>
                          <View className="date">
                            <Text className="info-time">距结束</Text>
                            <CountDown
                              overHandler={() => {
                                action.commonChange('main.isReady', false);
                                this.props.actions.init(main.grouponNo);
                              }}
                              visibleSecond={true}
                              timeStyle={{color: '#999', margin: 0}}
                              timeOffset={moment(endTime)
                                .diff(moment(main.serverTime), 's')
                                .toFixed(0)}
                            />
                          </View>
                        </View>
                      </View>
                      <View className="right">
                        <View className="l-btn">
                          <Text className="btn-text">
                            还差<Text className="num">{this._num(item)}</Text>人成团
                          </Text>
                        </View>
                        <View
                          onClick={() => {
                            //未登录，跳转至登录页
                            if (!WMkit.isLogin()) {
                              Taro.navigateTo({
                                url: '/pages/package-A/login/wecat-loin/index',
                              });
                            } else {
                              //存储目标团号
                              action.commonChange('main.targetGroupNo', item.grouponNo);
                              //当前弹窗隐藏
                              action.commonChange('main.waitGroupModal', false);
                              //弹出规格弹窗
                              action.commonChange('main.specModal', true);
                            }
                          }}
                          className="r-btn"
                        >
                          立即参团
                        </View>
                      </View>
                    </View>
                  );
                })}
              </WMListView>
            </View>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 名称
   */
  _name = (item) => {
    let text = '';
    if (!item.customerName) {
      text = '用户';
    } else {
      text = item.customerName;
    }
    return `${text}`;
  };

  /**
   * 名称
   */
  _num = (item) => {
    return item.grouponNum - item.joinNum;
  };
}

//create by moon https://github.com/creasy2010/moon
