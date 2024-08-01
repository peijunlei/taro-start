import {View, Button, Text, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './words.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

type IWordsProps = T.IProps & T.IWordsProps;

@connect<Partial<IWordsProps>, T.IWordsState>(store2Props, actions)
export default class Words extends Component<Partial<IWordsProps>, T.IWordsState> {
  constructor(props: IWordsProps) {
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
      <View className="words">
        <RichText nodes={_.formatRichText(main?.words)} />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
