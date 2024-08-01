import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMButton from '@/pages/common/button';
import {Checkbox} from '@wanmi/ui-taro';

type IBottomProps = T.IProps & T.IBottomProps;

@connect<Partial<IBottomProps>, T.IBottomState>(store2Props, actions)
export default class Bottom extends Component<Partial<IBottomProps>, T.IBottomState> {
  constructor(props: IBottomProps) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  /**
    底部操作
*/
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main: {ifSelectAll, list, selectedList},
    } = this.props;

    return (
      <View className="bottom">
        <Checkbox
          label="全选"
          checked={ifSelectAll}
          onClick={() => {
            let bool = ifSelectAll;
            commonChange([
              {
                paths: 'main.selectedList',
                value: bool ? [] : list.map((store) => store.storeId),
              },
              {
                paths: 'main.ifSelectAll',
                value: !bool,
              },
            ]);
          }}
        />
        <WMButton
          disabled={selectedList.length === 0}
          disableFull={false}
          onClick={() => {
            this.cancelAtt();
          }}
        >
          取消关注
        </WMButton>
      </View>
    );
  }

  cancelAtt = () => {
    const {
      main: {selectedList, reload},
      actions: {
        cancelAttention,
        init,
        action: {commonChange},
      },
    } = this.props;
    if (selectedList.length === 0) {
      Taro.showToast({title: '请选择需要取消关注的店铺', icon: 'info'});
      return;
    }

    Taro.showModal({
      title: '取消关注',
      content: '确定要取消关注所选店铺？',
      success: function(res) {
        if (res.confirm) {
          cancelAttention()
            .then(() => {
              Taro.showToast({
                title: '取消关注成功',
                icon: 'success',
              });
              init();
              commonChange('main.reload', !reload);
            })
            .catch(() => {
              Taro.showToast({
                title: '取消关注失败，请重试',
                icon: 'none',
              });
            });
        }
      },
    });
  };
}

//create by moon https://github.com/creasy2010/moon
