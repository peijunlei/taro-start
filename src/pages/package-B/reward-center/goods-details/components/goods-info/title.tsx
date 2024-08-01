import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '../less/title.less';
import * as T from '../../types';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';

type ITitleProps = T.IProps & T.ITitleProps;

@connect<Partial<ITitleProps>, T.ITitleState>(store2Props, actions)
export default class Title extends Component<Partial<ITitleProps>, T.ITitleState> {
  constructor(props: ITitleProps) {
    super(props);
  }

  /**
    标题副标题
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail},
    } = this.props;
    return (
      <View className="title-box">
        <View className="title">{goodsDetail?.goods?.goodsName}</View>
        {goodsDetail.goods.goodsSubtitle && <View className="sub-title">{goodsDetail.goods.goodsSubtitle}</View>}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
