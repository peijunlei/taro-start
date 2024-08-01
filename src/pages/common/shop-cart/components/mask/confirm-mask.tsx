import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '@/pages/shop-cart/types';
import './../../css/confirm-mask.less';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import {AtModal} from 'taro-ui';

type IConfirmMaskProps = T.IProps & T.IConfirmMaskProps;

@connect<Partial<IConfirmMaskProps>, T.IConfirmMaskState>(store2Props, actions)
export default class ConfirmMask extends Component<Partial<IConfirmMaskProps>, T.IConfirmMaskState> {
  constructor(props: IConfirmMaskProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {
        useStatus: {
          confirmMask: {isOpen, type, message},
        },
      },
    } = this.props;

    return (
      <View
        className="confirmMask"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        {isOpen ? (
          <AtModal
            isOpened={isOpen}
            title={type === 0 ? '优惠失效提醒' : type === 1 ? '商品失效提醒' : type === 2 ? '提醒' : ''}
            content={message}
            confirmText={type === 0 ? '继续下单' : '确定'}
            cancelText={type === 0 ? '重新下单' : null}
            closeOnClickOverlay={false}
            onClose={async () => {
              await this._maskInit();
            }}
            onConfirm={async () => {
              type === 0 ? await action.toConfirm(true) : await this._maskInit();
            }}
            onCancel={async () => {
              await this._maskInit();
            }}
          />
        ) : null}
      </View>
    );
  }
  _maskInit = async () => {
    const {
      actions: {action},
    } = this.props;
    await action.commonChange('main.useStatus.confirmMask', {
      isOpen: false,
      type: 0,
      message: '',
    });
    // todo 这边合过来的先注释掉
    // await this.props.actions.clean();
    // await this.props.actions.action.commonChange('main.isFromC', true);
    await this.props.actions.init();
    await action.commonChange('main.isLoading', false);
    await action.loadingWML(false);
    // await action.reCalcMarketingAndPrice();
  };
}

//create by moon https://github.com/creasy2010/moon
