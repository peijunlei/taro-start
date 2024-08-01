import 'taro-ui/dist/style/components/modal.scss';
import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './deposit-records.less';
import WMListView from '@/pages/common/list-view';
import {produce} from 'immer';
import {_, msg} from 'wmkit';
import api from 'api';
import {AtModal} from 'taro-ui';
import empty from '@/assets/image/default/no-record.png';
export default class Index extends Component {
  constructor(props) {
    super(props);
    msg.on({
      'refresh-deposit-records': () => {
        this.setState({
          refresh: !this.state.refresh,
        });
      },
    });
  }

  state = {
    isOpened: false,
    selectKey: 0,
    drawCashId: '',
    list: [],
    request: {
      auditStatus: null,
      finishStatus: null,
      customerOperateStatus: null,
    },
    refresh: false,
  };

  render() {
    const {selectKey, list, request, isOpened, drawCashId, refresh} = this.state;
    const baseState = this.state;
    return (
      <View className="depositRecords">
        <View className="bar">
          {['全部', '待审核', '已打回', '已完成'].map((item, key) => {
            return (
              <View
                key={key}
                className="nav"
                onClick={() => {
                  this.setState(
                    produce<any, any>(baseState, (draftState) => {
                      draftState.selectKey = key;
                      draftState.request = {
                        customerOperateStatus: key === 0 ? null : 0,
                        auditStatus: key === 0 || key === 3 ? null : key - 1,
                        finishStatus: key === 3 ? 1 : null,
                      };
                    }),
                  );
                }}
              >
                <Text className={key === selectKey ? 'deposit-records-item itemSelected' : 'deposit-records-item'}>
                  {item}
                </Text>
                <View className="active">
                  {key == selectKey ? <View className="activeLine" /> : <View className="noActiveLine" />}
                </View>
              </View>
            );
          })}
        </View>
        <View className="depositRecords-list">
          <WMListView
            reload={refresh}
            ifPagination={true}
            noneImg={empty}
            noneContent={'暂无提现记录哦'}
            url={'/draw/cash/page'}
            style={{height: 'calc(100vh - 48px)'}}
            params={request}
            getData={(list, total) => {
              this.setState({total, list});
            }}
          >
            {list.map((drawCash, index) => {
              const [statusTxt, statusClass] = this._getStatus(drawCash);
              return (
                <View
                  key={index}
                  className="item"
                  onClick={async () => {
                    await Taro.navigateTo({
                      url: `/pages/package-A/customer/balance/deposit/deposit-detail/index?drawCashId=${drawCash.drawCashId}`,
                    });
                  }}
                >
                  <View className="header">
                    <View className="money-con">
                      <Text className="money-icon">¥</Text>
                      <Text className="money-num">{drawCash.drawCashSum.toFixed(2)}</Text>
                    </View>
                    {}
                    <Text className={statusClass}>{statusTxt}</Text>
                  </View>
                  <Text className="code">{drawCash.drawCashNo}</Text>

                  <Text
                    className="code"
                    onClick={() => {
                      this.setState({isOpened: true, drawCashId: drawCash.drawCashId});
                    }}
                  >
                    {_.formatDate(drawCash.applyTime)}
                  </Text>

                  {drawCash.customerOperateStatus == 0 && drawCash.auditStatus == 0 && (
                    <View
                      className="cancel-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({isOpened: true, drawCashId: drawCash.drawCashId});
                      }}
                    >
                      <Text className="cancel-text">取消申请</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </WMListView>
        </View>
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
        reload: true,
      },
    });
  };

  _getStatus = (drawCash) => {
    let statusTxt = '';
    let statusClass = '';
    if (drawCash.customerOperateStatus == 1) {
      statusTxt = '已取消';
      statusClass = 'type-success';
    } else if (drawCash.customerOperateStatus == 0) {
      if (drawCash.auditStatus == 0) {
        statusTxt = '待审核';
        statusClass = 'type-loading';
      } else if (drawCash.auditStatus == 1) {
        statusTxt = '已打回';
        statusClass = 'type-error';
      } else if (drawCash.auditStatus == 2 && drawCash.drawCashStatus == 2) {
        statusTxt = '已完成';
        statusClass = 'type-success';
      } else if (drawCash.auditStatus == 2 && drawCash.drawCashStatus == 1) {
        statusTxt = '待审核';
        statusClass = 'type-loading';
      }
    }
    return [statusTxt, statusClass];
  };
}

//create by moon https://github.com/creasy2010/moon
