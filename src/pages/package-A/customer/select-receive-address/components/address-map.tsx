import React, { Component } from 'react';
import { View, Map, ScrollView, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import markIcon from '../img/mark.png';
import { connect } from 'react-redux';
import actions from '../actions';
import { store2Props } from '../selectors';
import { msg } from 'wmkit';
import './address-map.less';


let bindMsg = (self) => {
  msg.on({
    'change-location': async ({ initLng, initLat }) => {
      console.log('---_createMap--->');
      await self._createMap(initLng, initLat);
    },
  });
  bindMsg = () => { };
};

@connect(store2Props, actions)
export default class DeliveryMap extends Component<any, any> {
  constructor(props) {
    super(props);
    bindMsg(this);
  }
  _createMap = (initLng, initLat) => {
    console.log('---initLng--->', initLng);
    console.log('---initLat--->', initLat);
    const map = new AMap.Map('map-container', {
      zoom: 16,
      scrollWheel: false,
      center: [initLng, initLat], //中心点坐标
    });
    //当前坐标点平移
    // map.panBy(0, 1);
    //地图移动显示地图中心点附近信息
    const mapMove = () => {
      const centerMarker = map.getCenter(); //获取当前地图中心位置
      centerSearch(centerMarker); //根据地图中心点查附近地点
    };

    const centerSearch = (centerMarker) => {
      const { poiNearAddress } = this.props.actions.action;
      AMap.service(['AMap.PlaceSearch'], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: '汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施',
          pageSize: 40, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: '全国', // 兴趣点城市
          autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围；
          extensions: 'all', //获取POI详细信息
        });
        //根据地图中心点查附近地点
        placeSearch.searchNearBy('', [centerMarker.lng, centerMarker.lat], 200, (status, result) => {
          if (status == 'complete') {
            //将查询到的地点赋值
            poiNearAddress(result.poiList.pois);
          }
        });
      });
    };

    //绑定地图移动事件
    map.on('moveend', mapMove);
    //绑定地图缩放事件
    map.on('zoomend', mapMove);
    //初始化地图和附近地址信息列表
    mapMove();
  };
  render() {
    let { main } = this.props;
    if (!main) return null;
    return (
      <View>
        <View style={{ position: 'relative' }}>
          <View id="map-container" className="map-container-cls"></View>
          <View className="coverloc">
            <Image src={markIcon} className="coverlocpng" />
          </View>
        </View>
        {/* 附近地址信息列表 */}
        {/* {main.isShowMap && <AddressList addressList={main?.nearAddressList} isNearAddressList />} */}
      </View>
    );
  }
}
