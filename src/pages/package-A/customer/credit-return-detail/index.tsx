import 'taro-ui/dist/style/components/modal.scss';
import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {_} from 'wmkit';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import ReturnDetail from './components/returnDetail';
import moment from 'dayjs';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class creditReturnDetail extends Component<Partial<T.IProps>, any> {
  componentWillMount() {}

  onShareTimeline() {
    // 默认分享内容
  }

  componentDidMount() {
    let {id} = Taro.getCurrentInstance().router.params || {};
    this.props.actions.init(id);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
     main && <View className="creditIn">
        <View className="order-state">
          <ReturnDetail
            title="当前状态"
            DetailState={main?.creditDetailInfo?.usedStatus == 1 ? '使用中' : '已结束'}
          ></ReturnDetail>
        </View>
        <ReturnDetail
          title="授信额度"
          DetailState={_.addZero(main?.creditDetailInfo?.creditAmount)}
          isMoney={true}
        ></ReturnDetail>
        <ReturnDetail
          title="恢复时间"
          DetailState={moment(main?.creditDetailInfo?.startTime).format('YYYY-MM-DD')}
        ></ReturnDetail>
        <ReturnDetail
          title="到期时间"
          DetailState={moment(main?.creditDetailInfo?.endTime).format('YYYY-MM-DD')}
        ></ReturnDetail>
      </View>
    );
  }
}
