import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './tab.less';
import Picture from './picture';
import Profile from './profile';
import Rights from './rights';
import {connect} from 'react-redux';
import actions from '../actions/index';
import {store2Props} from '../selectors';
import {cache} from 'config';
@connect(store2Props, actions)
export default class Index extends Component<any, any> {
  static options = {
    addGlobalClass: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: props.tabIndex ? props.tabIndex : '1',
      ifShow: false,
      ifLogin: false,
      tabs: [
        {key: '1', label: '店铺信息'},
        {key: '2', label: '企业自传资质'},
      ],
    };
  }

  componentWillMount() {
    this.init();
  }

  componentDidShow() {
    this.init();
  }

  render() {
    const tabIndex = this.state.tabIndex;
    const ifShow = this.state.ifShow;

    return (
      <View className="storeProfile__tabsWrap">
        <View className="store-details-container" style={ifShow ? {overflow: 'hidden'} : {overflow: 'auto'}}>
          <View className="tabs">
            {this.state.tabs.map((item, index) => (
              <View
                className={tabIndex === item.key ? 'tab active-tab' : 'tab'}
                // key={item.key}
                key={index}
                onClick={() => {
                  this._changeTab(item.key);
                }}
              >
                {item.label}
                <View className="suffix"></View>
              </View>
            ))}
          </View>

          <View className="tabpanel">
            {tabIndex === '0' && this.state.ifLogin === true && <Rights />}
            {tabIndex === '1' && (
              <Profile
                ifShow={ifShow}
                onChangeIfShow={(ifShow) => {
                  this.setState({ifShow});
                }}
              />
            )}
            {tabIndex === '2' && (
              <Picture
                ifShow={ifShow}
                onChangeIfShow={(ifShow) => {
                  this.setState({ifShow});
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  _changeTab = (key) => {
    if (key === this.state.tabIndex) {
      return;
    }
    this.setState({
      tabIndex: key,
    });
  };

  init = () => {
    const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    if (loginData) {
      this.setState({
        ifLogin: true,
        tabIndex: this.state.tabIndex,
        tabs: [
          {key: '0', label: '会员权益'},
          {key: '1', label: '店铺信息'},
          {key: '2', label: '企业自传资质'},
        ],
      });
    }
  };
}
