import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {Component, Config} from '@tarojs/taro';

import * as T from '../types';
import './error-info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import notData from '@/assets/image/goods/goods-detail/desc-img.png';
type IErrorInfoProps = T.IProps & T.IErrorInfoProps;

@connect<Partial<IErrorInfoProps>, T.IErrorInfoState>(store2Props, actions)
export default class errorInfo extends Component<Partial<IErrorInfoProps>, T.IErrorInfoState> {
  constructor(props: IErrorInfoProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="error-info">
        <Image src={notData} className="img" />
        <View className="status">积分商城已关闭,请返回主页!</View>
        <View
          className="go-home"
          onClick={() =>
            Taro.switchTab({
              url: '/pages/index/index',
            })
          }
        >
          去首页
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
