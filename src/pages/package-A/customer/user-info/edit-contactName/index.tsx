import {View, Text} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import WMFormInput from '@/pages/common/form-input';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class UserInfoEditContactName extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    this.state = {
      customerAccount: '',
      flag: false, //控制是否可以点击保存
    };
  }
  componentDidMount() {
    const key = getCurrentInstance().router.params;
    if (key.customerAccount) {
      this.setState({
        customerAccount: decodeURI(key.customerAccount),
      });
    }
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View className="packageACustomerUserInfoMain">
        <View className="top_2">
          <View className="wan_sh">
            <Text
              className={this.state.flag ? 'text_img3' : 'text_img2'}
              onClick={() => {
                this.state.flag == true ? this.props.actions.action.edit_3(this.state.customerAccount) : {};
              }}
            >
              保存
            </Text>
          </View>
        </View>
        <View className="in_put">
          <WMFormInput
            type="text"
            placeholder="请输入联系人信息"
            value={this.state.customerAccount}
            onChange={(e) => {
              this.setState({
                customerAccount: e,
                flag: true,
              });
            }}
            underline={false}
            maxlength={15}
            clear={true}
          />
        </View>
        <View className="in_put2">
          <View className="bottom_font">2-15个字符限制，允许中英文、数字和特殊字符</View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
