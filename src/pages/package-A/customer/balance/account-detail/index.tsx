import {ScrollView, View} from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import WMListView from '@/pages/common/list-view';
import Blank from '@/pages/common/blank';
import empty from '@/assets/image/default/no-record.png';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LinkedAccount extends Component<Partial<T.IProps>, any> {
  inst = Taro.getCurrentInstance()
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  async componentDidMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    await this.props.actions.init();
  }

  onShareTimeline() {
    // 默认分享内容
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main,
      actions: {action},
    } = this.props;
    const {selectKey, form} = main || {};
    const {enterpriseId = null} = this.inst.router.params;
    return (
      <View className="_page">
        {main ? (
          <View className="packageACustomerAccountDetail">
            <View className="bar">
              {['全部', '收入', '支出'].map((item, key) => {
                return (
                  <View
                    key={key}
                    className="nav"
                    onClick={() => {
                      action.commonChange('main.selectKey', key);
                      action.commonChange('main.form.tabType', key);
                    }}
                  >
                    <View className={key === selectKey ? 'deposit-records-item itemSelected' : 'deposit-records-item'}>
                      {item}
                    </View>
                    <View className="active">
                      {key == selectKey ? <View className="activeLine" /> : <View className="noActiveLine" />}
                    </View>
                  </View>
                );
              })}
            </View>
            <View className="account-detail-list">
              <WMListView
                ifPagination
                noneImg={empty}
                noneContent='您暂时还没有收入支出哦'
                url='/customer/funds/page'
                style={{height: 'calc(100vh - 48px)'}}
                params={{...form,enterpriseId}}
                getData={(list, total) => {
                  action.commonChange('main.funds', list);
                  action.commonChange('main.total', total);
                }}
              >
                {main.funds.map((item, index) => {
                  return <Info item={item} key={index} />;
                })}
              </WMListView>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
