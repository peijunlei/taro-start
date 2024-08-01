import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Button} from '@wanmi/ui-taro';
import * as T from '../types';
import './nav.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type INavProps = T.IProps & T.INavProps;

@connect<Partial<INavProps>, T.INavState>(store2Props, actions)
export default class Nav extends Component<Partial<INavProps>, T.INavState> {
  constructor(props: INavProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {selectKey} = main;
    return (
      <View className="Nav">
        <View className="bar">
          {['使用记录', '还款记录'].map((item, key) => {
            return (
              <View
                key={key}
                className="nav"
                onClick={() => {
                  action.commonChange('main.selectKey', key);
                }}
              >
                <Text className={key == selectKey ? 'credit-records-item itemSelected' : 'credit-records-item'}>
                  {item}
                </Text>
                <View className="active">
                  {key == selectKey ? <View className="activeLine" /> : <View className="noActiveLine" />}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
