import 'taro-ui/dist/style/components/swipe-action.scss';
import {View} from '@tarojs/components';
import Taro, {getStorageSync} from '@tarojs/taro';
import {Button, Modal} from '@wanmi/ui-taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import './components/bottom.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import List from './components/list';
import addIcon from '@/assets/image/common/add-white.png';
import CustomerDeliveryAddressBaseController from 'api/CustomerDeliveryAddressBaseController';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class FinanceEmail extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
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

  componentDidShow() {
    this.props.actions.init();
  }

  constructor(props) {
    super(props);
    this.state = {
      customerEmailId: '',
      flag: true,
    };
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;
    return (
      main && (
        <View className="financeEmail">
          {this.state.flag && <List />}
          <View className="bottom">
            <View className="bottom__info">最多可添加5条财务邮箱</View>
            <Button
              type="primary"
              size="large"
              // style={{height: '36px'}}
              disabled={main.list.length >= 5}
              icon={addIcon}
              onClick={() => {
                this.onAdd();
              }}
            >
              {/* <Image src={addIcon} className="add-icon" /> */}
              新增财务邮箱
            </Button>
          </View>
          {main.visible && (
            <Modal
              type="email"
              visible={main.visible}
              content={main.emailAddress}
              placeholder="输入邮箱帐号"
              onCancel={() => {
                this.onCancel();
              }}
              onOk={(value) => {
                if (main.ifModify) {
                  this.modifyEmail(value);
                } else {
                  this.saveCustomerEmail(value);
                }
              }}
              title={main.ifModify ? '编辑邮箱' : '新增邮箱'}
            />
          )}
        </View>
      )
    );
  }

  onCancel = async () => {
    this.props.actions.action.commonChange('main.visible', false);
    this.props.actions.action.commonChange('main.emailAddress', '');
  };
  onAdd = async () => {
    this.props.actions.action.commonChange('main.ifModify', false);
    this.props.actions.action.commonChange('main.visible', true);
    this.props.actions.action.commonChange('main.emailAddress', '');
  };

  modifyEmail = async (value) => {
    const {
      main: {customerEmailId},
      actions: {
        action: {commonChange},
      },
    } = this.props;
    const {customerId} = getStorageSync('b2b-wechat@login');
    try {
      await CustomerDeliveryAddressBaseController.modifyCouponCate({emailAddress: value, customerEmailId, customerId});
    } catch (e) {
      Taro.showToast({
        title: e.message,
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    Taro.showToast({
      title: '保存成功',
      icon: 'none',
      duration: 1000,
    });
    commonChange('main.visible', false);
    commonChange('main.emailAddress', '');
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
  };

  saveCustomerEmail = async (value) => {
    const {
      main: {list, reload},
      actions: {
        action: {commonChange},
      },
    } = this.props;
    if (list.length >= 5) {
      Taro.showToast({
        title: '最多可添加5条财务邮箱',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    const {customerEmailId} = this.props.main;
    if (!value) {
      Taro.showToast({
        title: '请填写邮箱地址',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    let customerEmail: any = {emailAddress: value};
    if (customerEmailId) {
      customerEmail = {...customerEmail, customerEmailId};
    }
    try {
      await CustomerDeliveryAddressBaseController.addCouponCate(customerEmail);
    } catch (e) {
      Taro.showToast({
        title: e.message,
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    Taro.showToast({
      title: '保存成功',
      icon: 'none',
      duration: 1000,
    });
    commonChange('main.visible', false);
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
  };
}

//create by moon https://github.com/creasy2010/moon
