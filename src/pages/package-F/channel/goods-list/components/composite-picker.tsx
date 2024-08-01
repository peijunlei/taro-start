import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {msg} from 'wmkit';
import * as T from '../types';
import './composite-picker.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
let closeTimer = null;
type ICompositePickerProps = T.IProps & T.ICompositePickerProps;

@connect<Partial<ICompositePickerProps>, Partial<T.ActionType>>(store2Props, actions)
export default class CompositePicker extends Component<Partial<ICompositePickerProps>, T.ICompositePickerState> {
  constructor(props: ICompositePickerProps) {
    super(props);
    this.state = {
      //综合
      composites: [
        {name: '综合', id: 0},
        {name: '最新', id: 1},
        {name: '评论数', id: 5},
        {name: '好评', id: 6},
        {name: '收藏', id: 7},
      ],
      fadeState: true,
    };
    msg.on({
      'show-composite-picker': () => {
        this.showAnimate();
      },
    });
  }

  componentWillUnmount(): void {
    clearTimeout(closeTimer);
  }

  /**
    综合筛选框
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;

    const {composites, fadeState} = this.state;

    return (
      <View
        className={fadeState ? 'compositePicker fade-in' : 'compositePicker fade-out'}
        onClick={() => {
          this.showAnimate();
          //触发导航箭头动画效果
          msg.emit('change-rote-state');
          closeTimer = setTimeout(() => {
            goodsAction.commonChange('main.navToolsObj.arrowFlag', false);
          }, 300);
        }}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <View className={fadeState ? 'picker-content fade-out-up' : 'picker-content fade-out-down'}>
          {composites.map((item, index) => {
            return (
              <View
                key={index}
                className={item.id === main.navToolsObj.composiId ? 'picker-item active' : 'picker-item'}
                onClick={() => this._changeItem(item.id, item.name)}
              >
                {item.name}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  //展示动画效果
  showAnimate = () => {
    this.setState({
      fadeState: false,
    });
  };

  _changeItem = async (id, name) => {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;
    goodsAction.commonChange([
      {
        paths: 'main.navToolsObj.composiId',
        value: id,
      },
      {
        paths: 'main.navToolsObj.composiName',
        value: name,
      },
      {
        paths: 'main.navToolsObj.arrowFlag',
        value: false,
      },
      {
        paths: 'main.request.sortFlag',
        value: main.request.keywords && id == 0 ? null : id,
      },
    ]);
    activityAction.commonChange('main.goods', []);
    //根据条件查询接口
    await goodsAction.query(true, main.goodsShowType);
  };
}

//create by moon https://github.com/creasy2010/moon
