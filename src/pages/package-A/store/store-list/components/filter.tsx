import {View, ScrollView, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './filter.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMPopupBox from '@/pages/common/popup-box';
import selectedImg from '@/assets/image/store/selected.png';

import WMButton from '@/pages/common/button';
import {addressInit} from '@/utils/getAddressInfo';
import {getGlobalData} from '@/service/config';
addressInit();
const {provinces, cities} = Taro.getStorageSync('mini::addressInfo');
const isIphoneX = getGlobalData('isIphoneX');
type IFilterProps = T.IProps & T.IFilterProps;

@connect<Partial<IFilterProps>, any>(store2Props, actions)
export default class Filter extends Component<Partial<IFilterProps>, T.IFilterState> {
  constructor(props: IFilterProps) {
    super(props);
    this.state = {
      provinces: [],
      citys: [],
      selectedAllCity: [],
      selectedCitys: [],
      selectedProvId: '',
    };
  }

  componentWillUnmount() {
    this.clearRequest();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View
        className="filter"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <WMPopupBox
          ifNeedCloseIcon={false}
          propWindow={false}
          position={'right'}
          visible={main?.filterModalVisible}
          onClose={() => {
            this.clearRequest();
            action.commonChange('main.filterModalVisible', false);
          }}
        >
          <View className="right-modal">
            <View className="filter-item">
              <View className="title">店铺类型</View>
              <View className="btn-wrap">
                <WMButton
                  theme="goast"
                  style={{marginRight: '16rpx'}}
                  onClick={() => {
                    if (main?.request.companyType === 0) {
                      this.changeRequest('companyType', null);
                    } else {
                      this.changeRequest('companyType', 0);
                    }
                  }}
                  checked={main?.request.companyType === 0}
                >
                  平台自营
                </WMButton>
              </View>
            </View>
            <View className="filter-item">
              <View className="title">所在地区</View>
            </View>
            <View className="select-area">
              <ScrollView scrollY className="province-list list">
                <View
                  className={this.state.selectedProvId === 'all' ? 'item item-selected' : 'item prov'}
                  onClick={() => {
                    this.changeAllProv();
                  }}
                >
                  全部
                </View>
                {provinces.map((prov) => (
                  <View
                    className={this.state.selectedProvId === prov.id ? 'item item-selected' : 'item prov'}
                    key={prov.id}
                    onClick={() => {
                      this.getCityByProvId(prov.id);
                    }}
                  >
                    {prov.name}
                  </View>
                ))}
              </ScrollView>
              <ScrollView scrollY className="list">
                {this.state.citys && this.state.citys.length > 0 && (
                  <View
                    className={'item'}
                    onClick={() => {
                      this.changeAllCity();
                    }}
                  >
                    全部
                  </View>
                )}
                {this.state.citys.map((city) => {
                  let flag = this.state.selectedCitys.indexOf(city.id) > -1;
                  return (
                    <View
                      className={flag ? 'item item-selected' : 'item'}
                      key={city.id}
                      onClick={() => {
                        this.changeSelectedCitys(city.id);
                      }}
                    >
                      <Text className={flag ? 'text text-selected' : 'text'}>{city.name}</Text>
                      {flag && (
                        <View className="selected-img">
                          <Image className="img" src={selectedImg} />
                        </View>
                      )}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View className={isIphoneX ? 'footer footer-x' : 'footer'}>
              <View className="btn left-btn">
                <WMButton
                  size="medium"
                  style={{borderRadius: '36px'}}
                  onClick={() => {
                    this.clearRequest();
                  }}
                >
                  重置
                </WMButton>
              </View>
              <View className="btn">
                <WMButton size="medium" style={{borderRadius: '36px'}} theme="primary" onClick={this.searchStore}>
                  确定
                </WMButton>
              </View>
            </View>
          </View>
        </WMPopupBox>
      </View>
    );
  }

  searchStore = () => {
    this.props.actions.action.commonChange('main.filterModalVisible', false);
  };

  changeRequest = (key, value) => {
    this.props.actions.action.commonChange(`main.request.${key}`, value);
  };

  clearRequest = () => {
    this.setState({
      selectedCitys: [],
      selectedProvId: '',
    });
    this.props.actions.action.commonChange([
      {
        paths: 'main.request.allAreaIds',
        value: [],
      },
      {
        paths: 'main.request.companyType',
        value: null,
      },
    ]);
  };

  changeAllProv = () => {
    this.setState({
      citys: [],
      selectedCitys: [],
      selectedProvId: this.state.selectedProvId === 'all' ? '' : 'all',
    });
    this.props.actions.action.commonChange('main.request.allAreaIds', []);
  };

  changeAllCity = () => {
    const {selectedCitys, citys, selectedProvId, selectedAllCity} = this.state;
    let index = selectedAllCity.indexOf(selectedProvId);
    if (index > -1) {
      const list = selectedCitys.filter((item) => item.slice(0, 2) !== selectedProvId.slice(0, 2));
      selectedAllCity.splice(index, 1);
      this.setState({
        selectedCitys: [...list],
        selectedAllCity: [...selectedAllCity],
      });
      this.props.actions.action.commonChange('main.request.allAreaIds', [...list]);
    } else {
      const allCity = citys.map((c) => c.id);
      this.setState({
        selectedAllCity: [...this.state.selectedAllCity, selectedProvId],
        selectedCitys: [...selectedCitys, ...allCity],
      });
      this.props.actions.action.commonChange('main.request.allAreaIds', [...selectedCitys, ...allCity]);
    }
  };

  changeSelectedCitys = (id) => {
    const selectedCitys = this.state.selectedCitys;
    const index = selectedCitys.indexOf(id);
    if (index > -1) {
      let arr = selectedCitys;
      arr.splice(index, 1);
      this.props.actions.action.commonChange('main.request.allAreaIds', [...arr]);
      this.setState({
        selectedCitys: [...arr],
      });
    } else {
      this.props.actions.action.commonChange('main.request.allAreaIds', [...selectedCitys, id]);
      this.setState({
        selectedCitys: [...selectedCitys, id],
      });
    }
  };

  getCityByProvId = (id) => {
    if (this.state.selectedProvId === id) {
      return;
    } else {
      this.setState({
        selectedProvId: id,
        citys: cities[id],
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
