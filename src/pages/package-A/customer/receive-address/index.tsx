import 'taro-ui/dist/style/components/swipe-action.scss';
import {Button, Image, ScrollView, Text, View} from '@tarojs/components';
import Taro, {removeStorageSync as _removeStorageSync, getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Blank from '@/pages/common/blank';
import {AtSwipeAction} from 'taro-ui';

import remind from '@/assets/image/common/remind.png';
import {msg, WMkit} from 'wmkit';
import WMLoading from '@/pages/common/loading';
import {Modal} from '@wanmi/ui-taro';
import AddressSelect from '@/pages/common/address-select';
import { cache } from 'config';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ReceiveAddress extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    this.state = {
      openAddress: '',
      visible: false,
      item: {},
    };
    /* >>>>>>>>>hack for H5 start<<<<<<<<< */
    /* H5 navigateBack后未触发react生命周期，使用监听手动更新列表 */
    // msg.on({
    //   'address-refresh': async () => {
    //     if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    //       const {mode, localKey} = getCurrentInstance().router.params;
    //       await this.props.actions.init(mode, localKey);
    //     }
    //   },
    // });
    /* >>>>>>>>>hack for H5 end<<<<<<<<< */
  }
  async componentDidMount() {}
  async componentDidShow() {
    const {mode, localKey} = getCurrentInstance().router.params;
    Taro.removeStorageSync(cache.SELECT_ADDRESS);
    Taro.removeStorageSync(cache.CODE_ARR);
    Taro.removeStorageSync(cache.SELECT_HOUSE_NUM);
    await this.props.actions.init(mode, localKey);
  }

  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    // const {mode, localKey} = getCurrentInstance().router.params;
    // await this.props.actions.init(mode, localKey);
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

  componentWillUnmount() {
    this.props.actions.clean();
    if (WMkit.isShop()) {
      msg.emit('shopCart-C');
    }
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      main: {addressList, showAdd, isLoadingList, pickerShow, currentAddress},
      actions: {action},
    } = this.props;
    const isShop = WMkit.isShop();
    let inviteeId = WMkit.inviteeId();
    return (
      <View className="receive-address__wrapper">
        {isLoadingList && <WMLoading />}
        {addressList && addressList.length == 0 && (
          <View className="go">
            <Blank
              content="暂无收货地址信息哦"
              img={require('@/assets/image/customer/address/null.png')}
              imgStyle={{width: '208rpx', height: '208rpx'}}
            />
            <View
              className="go_top"
              onClick={() => {
                Taro.navigateTo({url: `/pages/package-A/customer/receive-address-edit/index?addressId=${-1}`});
              }}
            >
              去添加
            </View>
          </View>
        )}
        {addressList && addressList.length != 0 && (
          <ScrollView
            scrollY
            className="list"
            style={{
              height: 'calc(100vh + env(safe-area-inset-bottom))',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 70px)',
            }}
          >
            <View>
              {addressList.length > 0 &&
                addressList.map((item, index) => (
                  <View className="wm-swipe-wrap" key={index}>
                    <AtSwipeAction
                      key={item.deliveryAddressId}
                      onClick={this.onTap.bind(this, item)}
                      onOpened={this.handleSingle.bind(this, item.deliveryAddressId)}
                      isOpened={this.state.openAddress === item.deliveryAddressId}
                      onClosed={() => this.setState({openAddress: ''})}
                      autoClose
                      options={[
                        {
                          text: '设为默认',
                          style: {
                            color: '#333333',
                            width: '80px',
                            padding: 0,
                            margin: 0,
                            fontSize: '12px!important',
                            background: 'linear-gradient(270deg,rgba(250,250,250,1) 0%,rgba(235,235,235,1) 100%)',
                          },
                          className: 'c333',
                        },
                        {
                          text: '删除',
                          style: {
                            color: '#ffffff',
                            width: '80px',
                            margin: 0,
                            fontSize: '14px!important',
                            background: 'linear-gradient(270deg,rgba(255,136,0,1) 0%,rgba(255,77,0,1) 100%)',
                          },
                        },
                      ]}
                    >
                      <View className="top">
                        <View
                          className="top_1"
                          onClick={async () => {
                            await action._saveAddress(item);
                          }}
                        >
                          <View className="top_2">
                            <Text className="name">{item.consigneeName}</Text>
                            <Text className="phone">{item.consigneeNumber}</Text>
                            {item.isDefaltAddress == 1 && <View className="mo-ren">默认</View>}
                          </View>
                          <View style={{justifyContent: 'space-between'}}>
                            <Text className="top_3">{item.addressInfo || item.deliveryAddress}</Text>
                            {item.needComplete && (
                              <View className="remindTip">
                                <Image src={remind} className="remindIcon"></Image>
                                <Text className="remindText">请完善收货地址</Text>
                              </View>
                            )}
                          </View>
                        </View>
                        <View
                          className="edit_1"
                          onClick={async () => {
                            await action._editAddress(item);
                          }}
                          // onClick={() =>
                          //   Taro.navigateTo({
                          //     url: `/pages/package-A/customer/receive-address-edit/index?addressId=${item.deliveryAddressId}`,
                          //   })
                          // }
                        >
                          <Image src={require('@/assets/image/customer/address/edit.png')} className="edit" />
                        </View>
                      </View>
                    </AtSwipeAction>
                  </View>
                ))}
            </View>
            <View className="status status-address">没有更多了</View>
          </ScrollView>
        )}
        <View className="btn_box">
          <View className="register-btn">
            <Text className="infos">最多可添加20条收货地址</Text>
            <Button
              //disabled={showAdd}
              className="btn btn-primary"
              onClick={() => {
                if (showAdd) {
                  Taro.showToast({
                    title: '最多可以添加20条收货地址',
                    icon: 'none',
                  });
                  return;
                }
                Taro.navigateTo({url: `/pages/package-A/customer/receive-address-edit/index?addressId=${-1}`});
              }}
            >
              <Image src={require('@/assets/image/customer/address/add.png')} className="add" />
              新增收货地址
            </Button>
          </View>
        </View>
        {pickerShow && (
          <AddressSelect
            title="请选择"
            areaIds={[
              currentAddress.provinceId,
              currentAddress.cityId,
              currentAddress.areaId,
              currentAddress.streetId ? currentAddress.streetId : -1,
            ]}
            onCancel={() => action.commonChange('main.pickerShow', !pickerShow)}
            onSelect={(selAreas) => {
              this.props.actions.action.commonChange(
                `main.currentAddress.areaIds`,
                selAreas.map((item) => item.addrId),
              );
              const areaInfo = selAreas.reduce((a, b: any) => `${a}${b.addrName} `, '');
              this.props.actions.action.commonChange('main.areaInfo', areaInfo);
              action.commonChange('main.pickerShow', !pickerShow);
            }}
          />
        )}
        <Modal
          visible={this.state.visible}
          title="删除收货地址"
          content="您确认要删除所选收货地址？"
          onCancel={() =>
            this.setState({
              visible: false,
            })
          }
          onOk={this.onConfirm}
        />
      </View>
    );
  }

  /**
   * 确认删除
   */
  onConfirm = async () => {
    const {
      actions: {action},
    } = this.props;
    const {item} = this.state;
    action.deleteAddress(item.deliveryAddressId);
    const address = Taro.getStorageSync('mini::confirmAddress');
    const shopCardAddress = Taro.getStorageSync('mini::shopCardAddress');
    if (address && item.deliveryAddressId === address.deliveryAddressId) {
      _removeStorageSync('mini::confirmAddress');
    }
    if (shopCardAddress && item.deliveryAddressId === shopCardAddress.deliveryAddressId) {
      _removeStorageSync('mini::shopCardAddress');
    }
    this.setState({visible: false});
  };

  /**
   * 点击选中行
   */
  onTap = async (item, e) => {
    const {
      actions: {action},
    } = this.props;
    if (e.text === '设为默认') {
      await action.setDefault(item.deliveryAddressId);
    } else if (e.text === '删除') {
      this.setState({
        visible: true,
        item,
      });
    }
    this.setState({
      openAddress: '',
    });
  };

  handleSingle = (id) => {
    this.setState({
      openAddress: id,
    });
  };
}

//create by moon https://github.com/creasy2010/moon
