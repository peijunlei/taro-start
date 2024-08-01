import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FormItem from '@/pages/common/form-item';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      main: {
        invoiceInfo: {
          type,
          companyName,
          identification,
          phoneNo,
          companyAddress,
          account,
          bank,
          projectName,
          contacts,
          phone,
          address,
          flag,
          title,
        },
      },
    } = this.props;
    return (
      <View>
        <View className="invoice-info">
          <FormItem
            labelName="发票类型"
            textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
            placeholder={type ? '增值税专用发票' : '普通发票'}
          />
          {!type && (
            <View>
              <FormItem
                labelName="发票抬头"
                textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                placeholder={title == '' ? '个人' : title}
              />
              {flag != 0 ? (
                <FormItem
                  labelName="纳税人识别号"
                  textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                  placeholder={identification || '无'}
                />
              ) : (
                ''
              )}
            </View>
          )}

          {type && (
            <View>
              <FormItem
                labelName="单位名称"
                textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                placeholder={companyName}
              />
              <FormItem
                labelName="纳税人识别号"
                textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                placeholder={identification}
              />
              <FormItem
                labelName="注册电话"
                textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                placeholder={phoneNo}
              />
              <FormItem
                labelName="注册地址"
                textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                placeholder={companyAddress}
              />
              <FormItem
                labelName="银行基本户号"
                textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                placeholder={account}
              />
              <FormItem
                labelName="开户行"
                textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
                placeholder={bank}
              />
            </View>
          )}
          <FormItem
            labelName="开票项目"
            textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
            placeholder={projectName}
          />
          <FormItem
            labelName="发票收货地址"
            textStyle={{color: '#000000', fontWeight: 500, textAlign: 'right'}}
            placeholder={contacts + ' ' + phone + ' ' + address}
          />
        </View>
      </View>
    );
  }
}
