import 'taro-ui/dist/style/components/modal.scss';
import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from './types';
import './deposit-item.less';
import FormItem from '@/pages/common/form-item';
import defaultCustomer from '@/assets/image/customer/user-center/default-wechat.png';
import api from 'api';
import {CustomerDrawCashVO3} from 'api/CustomerDrawCashController';
import {_} from 'wmkit';
import {AtModal} from 'taro-ui';

type IDepositItemProps = T.IProps & T.IDepositItemProps;

export default class Index extends Component<Partial<IDepositItemProps>, T.IDepositItemState> {
  constructor(props: IDepositItemProps) {
    super(props);
  }

  async componentWillMount() {
    const drawCashId = getCurrentInstance().router.params.drawCashId;
    const {customerDrawCashVO} = await api.customerDrawCashController.detail(drawCashId);
    this.setState({customerDrawCashVO});
  }

  state = {
    isOpened: false,
    customerDrawCashVO: {},
  } as {
    isOpened: boolean;
    customerDrawCashVO: CustomerDrawCashVO3;
  };

  render() {
    const {
      isOpened,
      customerDrawCashVO: {drawCashId},
    } = this.state;
    const vo = this.state.customerDrawCashVO;
    const [statusTxt, statusColor] = this._getStatus(vo);
    return (
      <View className="depositItem">
        <View className="info">
          <FormItem
            textStyle={{fontSize: '14px', fontWeight: 'bold', textAlign: 'right', color: '#FF6600'}}
            labelName="提现状态"
            placeholder={statusTxt}
          />
        </View>

        <View className="info">
          <FormItem
            labelName="提现方式"
            placeholder={vo.drawCashChannel === 0 ? '微信钱包' : '支付宝'}
            textStyle={{fontWeight: 'bold', fontSize: '12px', textAlign: 'right', color: '#333'}}
          />
          <FormItem
            labelName="提现单号"
            placeholder={vo.drawCashNo}
            textStyle={{fontWeight: 'bold', fontSize: '12px', textAlign: 'right', color: '#333'}}
          />
          <FormItem
            labelName="申请时间"
            placeholder={_.formatChnDate(vo.applyTime)}
            textStyle={{fontWeight: 'bold', fontSize: '12px', textAlign: 'right', color: '#333'}}
          />

          <View className="accout-item">
            <Text className="labelName">提现账户</Text>
            <View className="accout-box">
              <Text className="acount-name">{vo.drawCashAccountName}</Text>
              {/* <Image className="acount-img" src={vo.headimgurl ? vo.headimgurl : defaultCustomer}/> */}
            </View>
          </View>

          {/*<FormItem
            labelName="联系人号码"
            placeholder={'2134124124'}
            textStyle={{textAlign: 'right', fontWeight: 500}}
          />
*/}
          <FormItem
            labelName="提现金额"
            placeholder={`¥${vo.drawCashSum}`}
            textStyle={{fontWeight: 'bold', fontSize: '12px', textAlign: 'right', color: '#333'}}
          />
          <FormItem
            labelName="申请备注"
            placeholder={vo.drawCashRemark ? vo.drawCashRemark : '无'}
            textStyle={{fontSize: '12px', textAlign: 'right', color: '#333'}}
          />

          {vo.auditStatus === 1 && (
            <FormItem
              labelName="驳回原因"
              placeholder={vo.rejectReason}
              textStyle={{fontWeight: 'bold', fontSize: '12px', textAlign: 'right', color: '#333'}}
            />
          )}
        </View>

        {vo.customerOperateStatus === 0 && vo.auditStatus === 0 && (
          <View
            className="deposit-cancel-con"
            onClick={() => {
              this.setState({isOpened: true});
            }}
          >
            <View className="cancel-btn">
              <Text className="text">取消申请</Text>
            </View>
          </View>
        )}

        {isOpened && (
          <AtModal
            className="deposit-records-modal"
            title={'是否确认取消当前提现申请'}
            content={''}
            isOpened={isOpened}
            confirmText={'确定'}
            cancelText={'再想想'}
            onConfirm={async () => {
              await this._onConfirm(drawCashId);
              await Taro.redirectTo({
                url: `/pages/package-A/customer/balance/deposit/deposit-records/index`,
              });
            }}
            onCancel={() => {
              this.setState({isOpened: false});
            }}
            onClose={() => this.setState({isOpened: false})}
          />
        )}
      </View>
    );
  }

  _onConfirm = async (drawCashId) => {
    await api.customerDrawCashController.cancel(drawCashId);
    this.setState({
      isOpened: false,
      request: {
        auditStatus: null,
        finishStatus: null,
        customerOperateStatus: null,
      },
    });
  };

  _getStatus = (drawCash) => {
    let statusTxt = '';
    let statusColor = '';
    if (drawCash.customerOperateStatus == 1) {
      statusTxt = '已取消';
      statusColor = '#999';
    } else if (drawCash.customerOperateStatus == 0) {
      if (drawCash.auditStatus == 0) {
        statusTxt = '待审核';
        statusColor = '#FF6600';
      } else if (drawCash.auditStatus == 1) {
        statusTxt = '已打回';
        statusColor = '#FF0022';
      } else if (drawCash.auditStatus == 2 && drawCash.drawCashStatus == 2) {
        statusTxt = '已完成';
        statusColor = '#999';
      } else if (drawCash.auditStatus == 2 && drawCash.drawCashStatus == 1) {
        statusTxt = '待审核';
        statusColor = '#FF6600';
      }
    }
    return [statusTxt, statusColor];
  };
}

//create by moon https://github.com/creasy2010/moon
