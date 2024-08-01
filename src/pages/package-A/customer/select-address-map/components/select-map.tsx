import React, { Component } from 'react';
import { View, Map, CoverView, CoverImage } from '@tarojs/components';
import './select-map.less';
import markIcon from '../img/mark.png';
import bottom from '../img/bottom.png';
import { store2Props } from '../selectors';
import actions from '../actions/index';
import { connect } from 'react-redux';
import * as T from '../type';
import Taro from '@tarojs/taro';
import { msg } from 'wmkit';
import { cache } from 'config';
import { debounce, throttle } from 'lodash';

let bindMsg = (self) => {
  msg.on({
    'change-map-location': async () => {
      console.log('---_createMap--->');
      await self.getCenterMap();
    },
  });
  bindMsg = () => { };
};

type ISelectMapProps = T.IProps & T.ISelectMapProps;
@connect<Partial<ISelectMapProps>, Partial<T.ActionType>>(store2Props, actions)
export default class SelectMap extends Component<Partial<T.ActionType>, any> {
  constructor(props) {
    super(props);
    // bindMsg(this);
  }
  longitude: number = 0;
  latitude: number = 0;
  mapCtx = Taro.createMapContext('map');



  getCenterMap() {
    let {
      actions: { action },
    } = this.props;
    //高德地图获取地址信息
    const that = this;
    const map = this.mapCtx
    map.getCenterLocation({
      success(res) {
        console.log(that.longitude === res.longitude);

        // 判断坐标一致，不用重复请求数据
        // 函数一直刷新，longitude不一样导致地图自己一直移动错位，现在判断只要经纬度有一个一样就不再刷新数据
        if (that.longitude === res.longitude || that.latitude === res.latitude) {
          return false;
        }
        that.latitude = res.latitude;
        that.longitude = res.longitude;
        action.poiNearAddress(res.longitude + ',' + res.latitude);
        action.query(res);
      },
    });
  }

  onMapChange = (e) => {
    let {
      actions: { action },
    } = this.props;
    if (e.type === 'end') {
      const res = e.detail.centerLocation
      // 判断坐标一致，不用重复请求数据
      if (this.longitude === res.longitude || this.latitude === res.latitude) {
        return false;
      }
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      action.poiNearAddress(res.longitude + ',' + res.latitude);
      // action.query(res);
    }
  }
  render() {
    let {
      main,
      actions: { action },
    } = this.props;
    const initLng = main.initLng;
    const initLat = main.initLat;

    return (
      <View id="map-container" className="map-container-cls">
        <Map
          id="map"
          className="weapp-map"
          longitude={initLng}
          latitude={initLat}
          onRegionChange={debounce(this.onMapChange, 500)}
          showLocation
          scale={18}
        >
          {
            main.isShowMap &&
            <CoverView className="coverloc">
              <CoverImage src={markIcon} className="coverlocpng" />
            </CoverView>
          }
        </Map>
      </View>
    );
  }
}
