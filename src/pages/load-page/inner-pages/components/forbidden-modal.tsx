import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../../types';
import './forbidden-modal.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
const tipsIcon = require('@/assets/image/distribution/tipsIcon.png');

type IToolImgProps = T.IProps & T.IToolImgProps;

@connect<Partial<IToolImgProps>, T.IToolImgState>(store2Props, actions)
export default class ForbiddenModal extends Component<Partial<IToolImgProps>, T.IToolImgState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IToolImgProps) {
    super(props);
  }

  /**

*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {
        action: {commonChange},
      },
      main: {forbiddenShow, distributor},
      isShow,
    } = this.props;

    return (
      isShow && (
        <View
          className="ForbiddenModal"
          onClick={async (e) => {
            e.preventDefault();
            commonChange('main.forbiddenShow', !forbiddenShow);
          }}
        >
          <View className="modalBox">
            <View className="contentBox">
              <Image src={tipsIcon} className="tipIcon" />
              <Text className="title">您的店铺已经被禁用</Text>
              <Text className="tip-info">禁用状态无法享受分销权益，不可推广商品赚返利，且不可管理店铺</Text>
              <Text className="resson">禁用原因：{distributor.forbiddenReason}</Text>
            </View>
            <View
              className="modal-bt"
              onClick={(e) => {
                e.stopPropagation();
                commonChange('main.forbiddenShow', !forbiddenShow);
              }}
            >
              确定
            </View>
          </View>
        </View>
      )
    );
  }
}
