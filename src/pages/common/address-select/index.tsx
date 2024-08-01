import { View, Text, Image } from '@tarojs/components';
import React, { Component } from 'react';
import './index.less';
import locChk from '@/assets/image/goods/goods-detail/loc-chk.png';
import close from '@/assets/image/common/close.png';
import back from '@/assets/image/common/back.png';
import api from 'api';
import { PlatformAddressVO } from 'api/PlatformAddressController';
import { _ } from 'wmkit'
interface IAddressSelectProps {
  title: string;
  areaIds: any[];
  onBack?: Function;
  onCancel: Function;
  onSelect: Function;
}

export default class AddressSelect extends Component<IAddressSelectProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // 当前选的是第几个tab
      areaTab: 0,
      // 已选的区域[{addrName:'', addrId: ''}]
      selAreas: [null],
      // 列表信息缓存
      areaListArr: [],
    };
    console.log(props.areaIds);
    this.init(props.areaIds);
  }

  static options = { addGlobalClass: true };

  render() {
    const { areaListArr, selAreas, areaTab } = this.state;
    const { title, onBack } = this.props;
    if (areaListArr.length == 0) return <View></View>;
    const backFlag = onBack != undefined;
    return (
      <View className="address-select" catchMove>
        <View className="popup">
          <View className="header">
            {backFlag && <Image className="back" src={back} onClick={() => onBack()} />}
            <Text className="title">{title}</Text>
            <Image className="close" src={close} onClick={() => this.props.onCancel()} />
          </View>
          <View className="select-content">
            <View className="tabs">
              {selAreas.map((area, idx) => (
                <View
                  // key={area ? area.addrId : 0}
                  key={idx}
                  className="tab-item"
                  onClick={() => {
                    this.setState({ areaTab: idx });
                  }}
                >
                  <Text className="text">{area && area.addrName ? area.addrName : '请选择'}</Text>
                  <View className={`line ${areaTab == idx && 'line-sel'}`} />
                </View>
              ))}
            </View>
            <View className="list" style={{ paddingBottom: _.isSafari() ? '36px' : 0 }}>
              {areaListArr[areaTab].map((item: PlatformAddressVO, index) => (
                <View
                  // key={item.addrId}
                  key={index}
                  className="list-item"
                  onClick={() => {
                    this.chooseArea(item);
                  }}
                >
                  {selAreas[areaTab] && selAreas[areaTab].addrId == item.addrId && (
                    <Image className="check" src={locChk} />
                  )}
                  <Text className="fs24 c333">{item.addrName}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }

  init = async (areaIds = []) => {
    if (!(areaIds[0] && areaIds[1] && areaIds[2])) {
      areaIds = [];
    }
    let areaListArr = [],
      selAreas = [null];
    const provinces = await this.getProvince();
    areaListArr.push(provinces);
    if (areaIds[0]) {
      const province = provinces.find((item) => item.addrId === areaIds[0]);
      selAreas = [province];
      const cities = await this.getCity(areaIds[0]);
      areaListArr.push(cities);
    }
    if (areaIds[1]) {
      const city = areaListArr[1].find((item) => item.addrId === areaIds[1]);
      selAreas.push(city);
      const districts = await this.getDistrict(areaIds[1]);
      areaListArr.push(districts);
    }
    if (areaIds[2]) {
      const district = areaListArr[2].find((item) => item.addrId === areaIds[2]);
      selAreas.push(district);
      const streets = await this.getStreet(areaIds[2]);
      areaListArr.push(streets);
    }
    if (areaIds[3] && areaIds[3] != -1) {
      const street = areaListArr[3].find((item) => item.addrId === areaIds[3]);
      selAreas.push(street);
    }

    const state = {
      areaListArr,
      selAreas,
      areaTab: selAreas.length - 1,
    };

    this.setState(state);
  };

  chooseArea = async (item) => {
    let { selAreas, areaListArr, areaTab } = this.state;
    let res = null;
    if (areaTab == 0) {
      res = await this.getCity(item.addrId);
    }
    if (areaTab == 1) {
      res = await this.getDistrict(item.addrId);
    }
    if (areaTab == 2) {
      res = await this.getStreet(item.addrId);
    }
    if (areaTab == 3 || (areaTab == 2 && res.length == 0)) {
      // 当选择到最后一级时
      selAreas[areaTab] = item;
      selAreas = selAreas.slice(0, areaTab + 1);
      this.setState({ selAreas });
      this.props.onSelect(selAreas);
      return;
    }
    areaListArr = areaListArr.slice(0, areaTab + 1);
    areaListArr.push(res);
    areaListArr = areaListArr.concat();
    selAreas = selAreas.slice(0, areaTab);
    selAreas.push(item);
    areaTab++;
    selAreas.push(null);
    selAreas = selAreas.concat();
    this.setState({ selAreas, areaListArr, areaTab });
  };

  getProvince = async () => {
    const provinces = (await api.platformAddressController.getProvince()).platformAddressVOList;
    provinces.forEach((item: any) => {
      if (item.addrId) item.addrId = Number.parseInt(item.addrId as any);
    });
    return provinces;
  };

  getCity = async (addrId) => {
    const cities = (await api.platformAddressController.getCity(addrId)).platformAddressVOList;
    cities.forEach((item: any) => {
      if (item.addrId) item.addrId = Number.parseInt(item.addrId as any);
    });
    return cities;
  };

  getDistrict = async (addrId) => {
    const districts = (await api.platformAddressController.getDistrict(addrId)).platformAddressVOList;
    districts.forEach((item: any) => {
      if (item.addrId) item.addrId = Number.parseInt(item.addrId as any);
    });
    return districts;
  };

  getStreet = async (addrId) => {
    const streets = (await api.platformAddressController.getStreet(addrId)).platformAddressVOList;
    streets.forEach((item: any) => {
      if (item.addrId) item.addrId = Number.parseInt(item.addrId as any);
    });
    return streets;
  };
}
