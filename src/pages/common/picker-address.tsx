import Taro, {getStorageSync} from '@tarojs/taro';
import React, {Component} from 'react';
import {Input, Picker, View} from '@tarojs/components';
import './picker-address.less';

let dataList = getStorageSync('mini::addressInfo');

interface IAddressPickerP {
  editAddress?: any[];
  onHandleToggleShow: (e) => any;

  [name: string]: any;
}

class PickerAddress extends Component<IAddressPickerP, any> {
  constructor(props) {
    super(props);
    this.state = {
      province: '', //省
      city: '', //市
      area: '', //区
      cityAreaList: [], //省市区数组
    };
  }

  componentDidShow() {}
  //1.选取其中一个省市区初始化组件样式
  //首先将json数据中的其中一个省市区存入全局数组对象中
  //在全局中进行初始化组件变量定义
  provinceList = []; //省
  cityList = []; //市
  areaList = []; //区
  index = null; //多列选择器第1列选中的value值下标
  selectIndex = [0, 0, 0];

  componentDidMount() {
    dataList = Taro.getStorageSync('mini::addressInfo');
    // 初始化市区
    // 省
    let pIndex = 0;
    let cIndex = 0;
    let aIndex = 0;
    //有回显数据就取数据
    if (this.props.editAddress[0] && this.props.editAddress[1] && this.props.editAddress[2]) {
      dataList = getStorageSync('mini::addressInfo');
      // 初始化省市区
      let pIndex = 0;
      let cIndex = 0;
      let aIndex = 0;
      for (let i = 0; i < dataList.provinces.length; i++) {
        this.provinceList.push(dataList.provinces[i]);
      }
      //有回显数据就取数据
      if (
        this.props.editAddress &&
        this.props.editAddress[0] &&
        this.props.editAddress[1] &&
        this.props.editAddress[2]
      ) {
        //初始化省市区
        pIndex = dataList.provinces.findIndex((item) => item.id === this.props.editAddress[0].toString());
        let a, c;
        for (var item in dataList.cities) {
          if (item === this.props.editAddress[0].toString()) {
            c = dataList.cities[item];
            break;
          }
        }
        for (var item in dataList.areas) {
          if (item === this.props.editAddress[1].toString()) {
            a = dataList.areas[item];
            break;
          }
        }
        //根据组件需要省市区数组下标
        cIndex = c.findIndex((item) => item.id === this.props.editAddress[1].toString());
        aIndex = a.findIndex((item) => item.id === this.props.editAddress[2].toString());
        this.cityList = c;
        this.areaList = a;
        this.selectIndex.length = 0;
        this.selectIndex.push(pIndex, cIndex, aIndex);
        //修改省市区显示
        let cityAreaList = [];
        cityAreaList.push(this.provinceList);
        cityAreaList.push(this.cityList);
        cityAreaList.push(this.areaList);
        this.setState({
          cityAreaList: cityAreaList,
        });
      }
    } else {
      for (let i = 0; i < dataList.provinces.length; i++) {
        this.index = 0;
        this.provinceList.push(dataList.provinces[i]);
      }
      //市
      if (dataList.cities) {
        for (let key in dataList.cities) {
          if (key == dataList.provinces[pIndex].id) {
            this.cityList.push(dataList.cities[key][0]);
          }
        }
      } else {
        this.cityList = [];
      }
      //区
      if (dataList.areas) {
        for (let key in dataList.areas) {
          //如果区存在
          if (key == this.cityList[cIndex].id) {
            this.areaList = dataList.areas[key];
          }
        }
      } else {
        this.areaList = [];
      }
      //修改省市区显示
      let cityAreaList = [];
      cityAreaList.push(this.provinceList);
      cityAreaList.push(this.cityList);
      cityAreaList.push(this.areaList);
      this.setState({
        cityAreaList: cityAreaList,
      });
    }
  }

  componentWillReceiveProps() {
    this.provinceList = []; //省
    this.cityList = []; //市
    this.areaList = []; //区
    dataList = getStorageSync('mini::addressInfo');
    // 初始化省市区
    let pIndex = 0;
    let cIndex = 0;
    let aIndex = 0;
    for (let i = 0; i < dataList.provinces.length; i++) {
      this.provinceList.push(dataList.provinces[i]);
    }
    //有回显数据就取数据
    if (this.props.editAddress && this.props.editAddress[0] && this.props.editAddress[1] && this.props.editAddress[2]) {
      //初始化省市区
      pIndex = dataList.provinces.findIndex((item) => item.id === this.props.editAddress[0].toString());
      let a, c;
      for (var item in dataList.cities) {
        if (item === this.props.editAddress[0].toString()) {
          c = dataList.cities[item];
          break;
        }
      }
      for (var item in dataList.areas) {
        if (item === this.props.editAddress[1].toString()) {
          a = dataList.areas[item];
          break;
        }
      }
      //根据组件需要省市区数组下标
      cIndex = c.findIndex((item) => item.id === this.props.editAddress[1].toString());
      aIndex = a.findIndex((item) => item.id === this.props.editAddress[2].toString());
      this.cityList = c;
      this.areaList = a;
      this.selectIndex.length = 0;
      this.selectIndex.push(pIndex, cIndex, aIndex);
      //修改省市区显示
      let cityAreaList = [];
      cityAreaList.push(this.provinceList);
      cityAreaList.push(this.cityList);
      cityAreaList.push(this.areaList);
      this.setState({
        cityAreaList: cityAreaList,
      });
    }
  }

  // 当省变化时对应的市变化，当市变化对应的区变化
  handleColChange = (e) => {
    if (e.detail.column == 0) {
      this.selectIndex = [e.detail.value, 0, 0];
    } else if (e.detail.column == 1) {
      this.selectIndex[1] = e.detail.value;
      this.selectIndex[2] = 0;
    }
    if (dataList.provinces) {
      if (e.detail.column == 0) {
        //判断第1列value值省发生了变化
        this.index = e.detail.value;
        this.cityList = [];
        if (this.index > 33) {
          this.index = this.index - 34;
        }
        for (let key in dataList.cities) {
          if (key == dataList.provinces[this.index].id) {
            this.cityList = dataList.cities[key];
          }
        }
        if (dataList.areas) {
          //存在区
          this.areaList = []; //将市区内容置空
          for (let key in dataList.areas) {
            //如果区存在
            if (key == this.cityList[0].id) {
              this.areaList = dataList.areas[key];
            }
          }
          this.state.cityAreaList.splice(1, 2, this.cityList, this.areaList); //替换原来的市数组，触发页面更新
          this.setState({
            cityAreaList: this.state.cityAreaList,
          });
        } else {
          this.cityList = [];
          this.areaList = [];
          this.state.cityAreaList.splice(1, 2, this.cityList, this.areaList);
          this.setState({
            cityAreaList: this.state.cityAreaList,
          });
        }
      }

      if (e.detail.column == 1) {
        //判断第2列value值变化
        if (dataList.areas) {
          this.areaList = []; //将区置空
          for (let key in dataList.areas) {
            //如果区存在
            if (key == this.cityList[e.detail.value].id) {
              this.areaList = dataList.areas[key];
            }
          }
        } else {
          this.areaList = [];
        }
        this.state.cityAreaList.splice(2, 1, this.areaList); //替换原来的区数组
        this.setState({
          cityAreaList: this.state.cityAreaList,
        });
      }
    } else {
      this.cityList = [];
      this.areaList = [];
      this.state.cityAreaList.splice(1, 2, this.cityList, this.areaList);
      this.setState({
        cityAreaList: this.state.cityAreaList,
      });
    }
  };

  onAreaChange = (e) => {
    let p = this.state.cityAreaList[0][e.detail.value[0]];
    let c = e.detail.value[1] ? this.state.cityAreaList[1][e.detail.value[1]] : this.state.cityAreaList[1][0];
    let a = e.detail.value[2] ? this.state.cityAreaList[2][e.detail.value[2]] : this.state.cityAreaList[2][0];
    this.setState(
      {
        province: p,
        city: c,
        area: a,
        isCityArea: true,
      },
      () => {
        this.props.onHandleToggleShow({
          areaInfo: p.name + c.name + a.name,
          provincesId: p.id,
          citiesId: c.id,
          areasId: a.id,
          value: e.detail.value,
        });
      },
    );
  };

  render() {
    return (
      <View className="carinfo">
        <View className="car-info">
          <View className="form-info">
            <Picker
              mode="multiSelector"
              range={this.state.cityAreaList}
              rangeKey="name"
              onChange={(e) => this.onAreaChange(e)}
              onColumnChange={(e) => setTimeout(() => this.handleColChange(e), 100)}
              value={this.selectIndex}
            >
              <Input
                // onChange={this.handleInput}
                className="picker-int"
                id="driving-area"
                type="text"
                // value={this.state.province + this.state.city + this.state.area}
                disabled
              />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

export default PickerAddress;
