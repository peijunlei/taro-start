import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './account-form.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import grayArrowIcon from '@/assets/image/customer/user-center/arrow.png';
import {cache} from 'config';
import Blank from '@/pages/common/blank';
type IAccountFormProps = T.IProps & T.IAccountFormProps;
const emptyImage = require('@/assets/image/groupon/empty.png');
@connect<Partial<IAccountFormProps>, T.IAccountFormState>(store2Props, actions)
export default class AccountForm extends Component<Partial<IAccountFormProps>, T.IAccountFormState> {
  constructor(props: IAccountFormProps) {
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
      main?.sellerAccounts && (
        <View className="accountForm">
          {main?.sellerAccounts && main?.sellerAccounts.length > 0 ? (
            main?.sellerAccounts.map((item, index) => {
              return (
                <View
                  key={index}
                  className="account-item"
                  onClick={() => {
                    this._selectSellerAccount(main?.tid, item);
                  }}
                >
                  <View className="item-info">
                    <Text className="ac-name">{item.bankName}</Text>
                    <Text className="ac-address">{item.accountName}</Text>
                    <Text className="ac-num">{item.bankNo}</Text>
                  </View>
                  {/* <Image src={grayArrowIcon} className="arrow" /> */}
                </View>
              );
            })
          ) : (
            <Blank img={emptyImage} content="暂无收款账户" />
          )}
        </View>
      )
    );
  }
  /**
   * 选择卖家账号
   */
  _selectSellerAccount = (tid, account) => {
    Taro.setStorageSync(cache.SELLER_ACCOUNT, account);
    // Taro.redirectTo({
    //   url: `/pages/package-C/order/fill-payment/index?tid=${tid}`,
    // });
    Taro.navigateBack();
  };
}

//create by moon https://github.com/creasy2010/moon
