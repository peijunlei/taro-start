import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/wait-group-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import defaultImg from '@/assets/image/goods/goods-detail/head.png';
import moment from 'dayjs';
import WMListView from '@/pages/common/list-view';
import close from '@/assets/image/common/close.png';
type IWaitGroupModalProps = T.IProps & T.IWaitGroupModalProps;

@connect<Partial<IWaitGroupModalProps>, T.IWaitGroupModalState>(store2Props, actions)
export default class WaitGroupModal extends Component<Partial<IWaitGroupModalProps>, T.IWaitGroupModalState> {
  constructor(props: IWaitGroupModalProps) {
    super(props);
  }

  componentDidMount() {}

  /**
    等待成团弹窗
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;

    return (
      <View
        className="waitGroupModal"
        onClick={async () => {
          await publicAction.commonChange([{paths: 'main.isWaitGroup', value: false}]);
        }}
      >
        <View
          className="mask-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="mask-header">
            <Text className="header-text">等待成团</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await publicAction.commonChange([{paths: 'main.isWaitGroup', value: false}]);
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
                  grouponActivityId: main.grouponActivity.grouponActivityId,
                }}
                style={{height: '100%'}}
                dataPath={['grouponInstanceVOS', 'content']}
                getData={(list, total) => {
                  publicAction.commonChange('main.waitGroupList', list);
                }}
              >
                {main.waitGroupList.map((item, index) => {
                  //拼团结束时间
                  const endTime = moment(item.endTime);
                  return (
                    <View className="item" id={index} key={index}>
                      <View className="left">
                        <Image className="head" src={this._img(item)} />
                        <View className="info">
                          <Text className="info-name">{this._name(item)}</Text>
                          <View className="date">
                            <Text className="info-time">距结束</Text>
                            <CountDown
                              allowFontScaling={false}
                              numberOfLines={1}
                              visibleSecond={true}
                              timeStyle={{color: '#999', margin: 0}}
                              serverTime={main.serverTime}
                              endTime={endTime}
                              timeOffset={moment(endTime)
                                .diff(moment(main.serverTime), 's')
                                .toFixed(0)}
                            />
                          </View>
                        </View>
                      </View>
                      <View className="right">
                        <View className="l-btn">
                          <Text className="btn-text">还差</Text>
                          <Text className="num">{this._num(item)}</Text>
                          <Text className="btn-text">人成团</Text>
                        </View>
                        <View
                          className="r-btn"
                          onClick={() => {
                            Taro.navigateTo({
                              url: `/pages/package-B/groupon/group-buy-detail/index?grouponId=${item.grouponNo}`,
                            });
                          }}
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
   * 头像
   */
  _img = (item) => {
    let text = '';
    if (!item.headimgurl) {
      text = defaultImg;
    } else {
      text = item.headimgurl;
    }
    return `${text}`;
  };

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
