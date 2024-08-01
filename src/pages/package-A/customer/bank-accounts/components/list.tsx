import 'taro-ui/dist/style/components/swipe-action.scss';
import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import {AtSwipeAction} from 'taro-ui';
import AccountItem from './account-item';
import defaultImg from '@/assets/image/default/no-bank.png';

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, any> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      list: [],
      flag: true,
    };
  }

  /**

*/
  render() {
    let {
      actions,
      actions: {action},
      main: {list},
    } = this.props;
    return (
      <View className="list">
        {this.state.flag && (
          <WMListView
            url="/customer/accountList"
            method="GET"
            ifPagination={true}
            style={{height: 'calc(100vh - 80px)'}}
            dataPath={[]}
            getData={(list, total) => {
              action.commonChange('main.list', list);
              this.setState({
                list,
                total,
              });
            }}
            noneImg={defaultImg}
            noneContent={'暂无银行账户哦～'}
          >
            {this.state.list.map((account, index) => {
              console.log(account);
              return (
                <View className="wm-swipe-wrap" key={index}>
                  <AtSwipeAction
                    // key={item.deliveryAddressId}
                    // onClick={this.onTap.bind(this, item)}
                    // onOpened={this.handleSingle.bind(this, item.deliveryAddressId)}
                    // isOpened={this.state.openAddress === item.deliveryAddressId}
                    onClick={async () => {
                      await action.deleteCustomerAccount(account.customerAccountId);
                      this.setState(
                        {
                          flag: false,
                        },
                        () => {
                          this.setState({
                            flag: true,
                          });
                        },
                      );
                    }}
                    autoClose={true}
                    options={[
                      {
                        text: '删除',
                        style: {
                          color: '#fff',
                          background: 'linear-gradient(270deg,rgba(255,136,0,1) 0%,rgba(255,77,0,1) 100%)',
                        },
                      },
                    ]}
                  >
                    <AccountItem account={account} />
                  </AtSwipeAction>
                </View>
              );
            })}
          </WMListView>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
