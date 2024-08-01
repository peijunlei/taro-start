import {View, Input, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './cart-count.less';
import reduce from '@/assets/image/common/reduce.png';
import reduceg from '@/assets/image/common/reduceg.png';
import add from '@/assets/image/common/add.png';
import addg from '@/assets/image/common/addg.png';
import lo from 'lodash';
import {Stepper} from '@wanmi/ui-taro';

export interface ICartCountProps {
  disabled:boolean;
  count: any;
  getNum: Function;
  handleValue?: Function;
  shopCarSmallLoading?: (type: boolean) => any;
  inventory?: any;
  min?: any;
}

export interface ICartCountState {
  number: any;
}

export default class CartCount extends Component<Partial<ICartCountProps>, ICartCountState> {
  getNum: Function;
  handleValue: Function;
  shopCarSmallLoading: Function;
  static defaultProps = {
    min: 0,
  };
  constructor(props: ICartCountProps) {
    super(props);
    this.state = {
      number: props.count,
    };
    if (this.props.getNum) {
      this.getNum = lo.debounce((...params) => this.props.getNum(...params), 200);
    }
    if (this.props.handleValue) {
      this.handleValue = this.props.handleValue
      this.handleValue = lo.debounce((...params) => this.props.handleValue(...params), 20);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.count != this.props.count) {
      this.setState({
        number: nextProps.count,
      });
    }
  }

  render() {
    const {min, inventory,disabled} = this.props;
    const {number} = this.state;
    return <Stepper min={min} count={number} max={inventory} getNum={(num, flag) => this.getNum(num, flag)} disabled={disabled} handleValue={({ type, currentValue, nextValue }) => this.handleValue && this.handleValue({ type, currentValue, nextValue })} />;
    return (
      <View className="cart-count" onClick={(e) => e.stopPropagation()}>
        {this.state.number == this.props.min || this.state.number == '' ? (
          <View className="cart-count-size">
            <View className="cart-count-icon">
              <Image className="reduce" src={reduce} />
            </View>
          </View>
        ) : (
          <View className="cart-count-size">
            {/**可点击区域 */}
            <View
              className="cart-count-click-area"
              onClick={this.state.number ? this._reduce : (e) => e.stopPropagation()}
            />
            <View className="cart-count-icon">
              <Image className="reduce" src={reduceg} />
            </View>
          </View>
        )}
        {this.props.inventory ? ( //库存存在的话,支持input输入
          <Input
            className="input"
            // style={{width: this.state.number.toString().length * 8 + 'px'}}
            value={this.state.number}
            type="number"
            onClick={(e) => e.stopPropagation()}
            onInput={this._change}
            onBlur={this._onBlur}
            maxlength={7}
          />
        ) : (
          <Input className="int" value={this.state.number} type="text" disabled />
        )}
        {this.props.inventory === null ||
        (this.props.inventory !== undefined && this.state.number == this.props.inventory) ? (
          <View className="cart-count-size">
            <View className="cart-count-icon">
              <Image className="add" src={addg} />
            </View>
          </View>
        ) : (
          <View className="cart-count-size">
            {/**可点击区域 */}
            <View className="cart-count-click-area" onClick={this._add} />
            <View className="cart-count-icon">
              <Image className="add" src={add} />
            </View>
          </View>
        )}
      </View>
    );
  }
  _onBlur = (e) => {
    const val = e.target.value;
    if (!val || val === '-') {
      this.setState({number: 1});
      this.getNum(1);
    }
  };
  _change = (e) => {
    let num = e.target.value == '' || e.target.value == '-' ? '' : Number(e.target.value);
    if (num > this.props.inventory) {
      this.getNum(this.props.inventory);
      return this.props.inventory;
    } else if (num == '' || num <= 0) {
      this.getNum('');
      this.setState({number: ''});
      return '';
    } else {
      this.setState({number: e.target.value});
      this.getNum(e.target.value);
      return e.target.value;
    }
  };

  _getCount = (num) => {};

  _reduce = (e) => {
    e.stopPropagation();
    let index = this.state.number;
    if (index >= this.props.min) {
      index--;
      this.setState({number: index});
      this.getNum(index, false);
    } else {
      this.setState({number: ''});
    }
    // 开启小加载
    this.props.shopCarSmallLoading && this.props.shopCarSmallLoading(true);
  };

  _add = (e) => {
    e.stopPropagation();
    let index = this.state.number;
    if (this.props.inventory) {
      //判断库存是否有传入
      if (index < this.props.inventory) {
        //如果传入 加号可点击的最大值不能超过传进来的值
        index++;
        this.setState({number: index});
        this.getNum(index, true);
      }
    } else {
      index++;
      this.setState({number: index});
      this.getNum(index, true);
    }
    this.props.shopCarSmallLoading && this.props.shopCarSmallLoading(true);
  };
}
