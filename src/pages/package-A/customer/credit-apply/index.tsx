import 'taro-ui/dist/style/components/modal.scss';
import {View} from '@tarojs/components';
import {Button} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import ApplyCredit from './components/applyCredit';
import CreditResult from './components/credit-result';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CreditApply extends Component<Partial<T.IProps>, any> {
  componentWillMount() {}

  onShareTimeline() {
    // 默认分享内容
  }

  componentDidMount() {
    let {isChangeFlag} = Taro.getCurrentInstance().router.params || {};
    this.props.actions.init(isChangeFlag ? isChangeFlag : 0);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    if (!this.props.main) return;
    let {
      actions: {action},
      main,
      main: {auditStatus, isLoadingFlag, isEdit, applyInfo, isChangeFlag, alias},
    } = this.props;
    console.log(isEdit, auditStatus);
    let title = isChangeFlag && (auditStatus == 1 || auditStatus == null || auditStatus == 0)
                ?'变更额度'
                : (auditStatus == 0 || auditStatus == 1 || auditStatus == 2)
                ?`${alias}审核`
                : (auditStatus == 3)
                ?'变更额度'
                :`${alias}申请`;
    Taro.setNavigationBarTitle({
      // title: `${alias}${(auditStatus === 0 || auditStatus === 1 || auditStatus === 3) && !isEdit ? '审核' : '申请'}`,
      title:title
    });
    return (
      isLoadingFlag && (
        <View className="creditApply">
          {isChangeFlag == 1 && auditStatus == '2' && !isEdit && (
            <View>
              <ApplyCredit />
            </View>
          )}
          {(auditStatus == '0' || auditStatus == '1' || auditStatus == '2' || auditStatus == '3') && !isEdit ? (
            <CreditResult />
          ) : (
            <ApplyCredit />
          )}

          {auditStatus == '1' && !isEdit && (
            <View className="credit-submit">
              {
                <Button
                  onClick={async () => {
                    await action.commonChange('main.isEdit', true);
                  }}
                >
                  修改
                </Button>
              }
            </View>
          )}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
