import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import {AtSwipeAction} from 'taro-ui';
import modifyIcon from '@/assets/image/common/modify.png';

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
    const {
      actions: {
        action: {commonChange, deleteFinanceEmail},
      },
      main: {list, reload},
    } = this.props;

    return (
      <View className="list">
        {this.state.flag && (
          <WMListView
            scrollY={false}
            url="/customer/emailList"
            method="GET"
            dataPath={[]}
            getData={(list, total) => {
              commonChange('main.list', list);
              commonChange('main.total', total);
            }}
            reload={reload}
          >
            {list.map((customerEmail, index) => {
              return (
                <View className="email-wrap" key={index}>
                  <AtSwipeAction
                    autoClose={true}
                    onClick={async () => {
                      await deleteFinanceEmail(customerEmail.customerEmailId);
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
                    <View className="account-item">
                      <Text className="text">{customerEmail.emailAddress}</Text>
                      <Image
                        src={modifyIcon}
                        className="modify-icon"
                        onClick={() => {
                          this.modify(customerEmail.customerEmailId, customerEmail.emailAddress);
                        }}
                      />
                    </View>
                  </AtSwipeAction>
                </View>
              );
            })}
          </WMListView>
        )}
      </View>
    );
  }

  modify = (customerEmailId, emailAddress) => {
    const {
      actions: {
        action: {commonChange},
      },
    } = this.props;
    commonChange('main.visible', true);
    commonChange('main.ifModify', true);
    commonChange('main.customerEmailId', customerEmailId);
    commonChange('main.emailAddress', emailAddress);
  };
}

//create by moon https://github.com/creasy2010/moon
