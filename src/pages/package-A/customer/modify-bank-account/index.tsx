import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import {Toast} from '@wanmi/ui-taro';
import {Input, Button} from '@wanmi/ui-taro';
import React, {Component} from 'react';

import './index.less';
import WMFormInput from '@/pages/common/form-input';
import WMButton from '@/pages/common/button';
import api from 'api';
import actions from '@/pages/package-A/customer/linked-account/actions';

export default class ModifyBankAccount extends Component<any, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    let customerAccountId = getCurrentInstance().router.params.customerAccountId;
    if (customerAccountId != null && customerAccountId != '') {
      Taro.setNavigationBarTitle({
        title: '编辑银行账户',
      });
    } else {
      Taro.setNavigationBarTitle({
        title: '新增银行账户',
      });
    }
    this.init(getCurrentInstance().router.params);
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  constructor(props) {
    super(props);
    this.state = {
      customerAccountId: '',
      customerBankName: '',
      customerAccountName: '',
      customerAccountNo: '',
      customerId: '',
      showToast: false,
      icon: '',
      title: '',
    };
  }

  render() {
    const {customerBankName, customerAccountName, customerAccountNo} = this.state;
    return (
      <View className="modify-account">
        <Input
          type="text"
          label="开户行"
          placeholder={'请输入您的开户行名称'}
          defaultValue={customerBankName}
          onInput={(e) => {
            this.setState({customerBankName: e.detail.value});
          }}
          underline={true}
          maxlength={50}
        />
        <Input
          type="text"
          label="账户名称"
          placeholder={'请输入您的账户名称'}
          defaultValue={customerAccountName}
          onInput={(e) => {
            this.setState({customerAccountName: e.detail.value});
          }}
          underline={true}
          maxlength={50}
        />
        <Input
          type="number"
          label="账号"
          placeholder={'请输入您的账号'}
          defaultValue={customerAccountNo}
          onInput={(e) => {
            this.setState({customerAccountNo: e.detail.value});
          }}
          underline={true}
          maxlength={30}
        />

        <View className="bottom">
          <Button size="large" type="primary" onClick={() => this.saveAccount()}>
            保存
          </Button>
        </View>
        <Toast
          icon={this.state.icon}
          content={this.state.title}
          isOpen={this.state.showToast}
          time={2000}
          onTipDisappear={() => {
            this.setState({showToast: false});
            this.state.icon === 'success' && Taro.redirectTo({url: '/pages/package-A/customer/bank-accounts/index'});
          }}
        />
      </View>
    );
  }

  init = async (params) => {
    const {customerAccountId} = params;
    let result = await api.customerAccountBaseController.findById(customerAccountId);
    this.setState({customerBankName: result.customerBankName});
    this.setState({customerAccountName: result.customerAccountName});
    this.setState({customerAccountNo: result.customerAccountNo});
    this.setState({customerAccountId: result.customerAccountId});
  };

  saveAccount = async () => {
    const {customerAccountId, customerBankName, customerAccountName, customerAccountNo} = this.state;
    if (!customerBankName) {
      this.setState({
        showToast: true,
        title: '请填写开户行信息',
        icon: '',
      });
      return;
    }
    if (!customerAccountName) {
      this.setState({
        showToast: true,
        title: '请填写账户名称',
        icon: '',
      });
      return;
    }
    if (!customerAccountNo) {
      this.setState({
        showToast: true,
        title: '请填写账号信息',
        icon: '',
      });
      return;
    }
    let customerAccount = new Object();
    customerAccount['customerBankName'] = customerBankName;
    customerAccount['customerAccountName'] = customerAccountName;
    customerAccount['customerAccountNo'] = customerAccountNo;
    if (customerAccountId != '') {
      customerAccount['customerAccountId'] = customerAccountId;
    }
    if (customerAccountId) {
      // 编辑
      try {
        (await api.customerAccountBaseController.editCustomerAccount(customerAccount)) as any;
      } catch (e) {
        this.setState({
          showToast: true,
          title: e.message,
          icon: '',
        });
        return;
      }
    } else {
      // 新增
      try {
        (await api.customerAccountBaseController.addCustomerAccount(customerAccount)) as any;
      } catch (e) {
        this.setState({
          showToast: true,
          title: e.message,
          icon: '',
        });
        return;
      }
    }
    this.setState({
      showToast: true,
      icon: 'success',
      title: '保存成功',
    });
    // this.setState({
    //   title: '保存成功',
    //   icon: '',
    //   duration: 2000,
    // });
  };
}

//create by moon https://github.com/creasy2010/moon
