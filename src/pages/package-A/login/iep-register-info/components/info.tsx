import {Image, Input, Picker, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import upload from '@/assets/image/login/upload.png';
import close from '@/assets/image/common/close.png';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  async componentDidMount() {
    let {
      actions: {action},
    } = this.props;
    let {customerAccount, customerPassword, verifyCode} = getCurrentInstance().router.params;
    if (customerAccount && customerPassword && verifyCode) {
      await action.commonChange('main.companyInfo.customerAccount', customerAccount);
      await action.commonChange('main.companyInfo.customerPassword', customerPassword);
      await action.commonChange('main.companyInfo.verifyCode', verifyCode);
    }
  }

  /**

*/
  handleChange(value) {
    this.setState({
      value,
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }
  render() {
    let {
      actions: {action},
      // main: {businessLicenseUrl, openFlag, registerLimitType},
      main,
    } = this.props;
    let {businessLicenseUrl, openFlag, registerLimitType} = this.props?.main;
    return (
      <View className="info">
        <View className="form-item">
          <View className="from-item-name">公司性质</View>
          <View className="from-item-input" style={{marginTop: 0}}>
            <Picker
              className="picker"
              mode="selector"
              value={main?.companyInfo?.businessNatureTypeName}
              range={['政府机关/事业单位', '国营', '私营', '中外合资', '外资', '其他']}
              onChange={(e) => {
                action.selectCompany(e.detail.value);
              }}
            >
              <View className="iep-picker-view">
                {main?.companyInfo?.businessNatureTypeName && (
                  <Text className="iep-text">{main?.companyInfo?.businessNatureTypeName}</Text>
                )}
                {!main?.companyInfo?.businessNatureTypeName && <Text className="iep-graytext">请选择</Text>}
              </View>
            </Picker>
          </View>
        </View>
        <View className="form-item">
          <View className="from-item-name">公司名称</View>
          <View className="from-item-input">
            <Input
              maxlength={60}
              onInput={(e) => {
                action.commonChange('main.companyInfo.enterpriseName', e.detail.value);
              }}
              placeholder="请按营业执照填写"
            />
          </View>
        </View>
        <View className="form-item">
          <View className="from-item-name">统一社会信用代码</View>
          <View className="from-item-input">
            <Input
              maxlength={30}
              onInput={(e) => {
                action.commonChange('main.companyInfo.socialCreditCode', e.detail.value);
              }}
              placeholder="即纳税人识别号（税号）"
            />
          </View>
        </View>
        <View className="form-item-img">
          <View className="from-item-name">上传营业执照</View>
          {businessLicenseUrl.length == 0 && (
            <View className="uploadState">
              <Image
                className="uploadImage"
                onClick={() => {
                  action._chooseImage();
                }}
                src={upload}
              />
            </View>
          )}

          <View className="enclosure-con-box">
            <View className="enclosure-con">
              {businessLicenseUrl.length > 0
                ? businessLicenseUrl.map((v, index) => {
                    return (
                      <View className="enclosure" key={index}>
                        <Image
                          src={v}
                          className="pic"
                          onClick={() => {
                            Taro.previewImage({
                              current: v, // 当前显示图片的http链接
                              urls: businessLicenseUrl, // 需要预览的图片http链接列表
                            });
                          }}
                        />
                        <Image
                          src={close}
                          className="close-pic"
                          onClick={() => {
                            action._deleteImage(index);
                          }}
                        />
                      </View>
                    );
                  })
                : ''}
            </View>
          </View>

          <View className="uploadDesc">仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过2M</View>

          <View className="from-item-input" />
        </View>

        {/*{openFlag == 1 ? (
          <View className="form-item">
            <View className="from-item-name">{registerLimitType == 1 && <i>*</i>}邀请码</View>
            <View className="from-item-input">
              <Input
                onInput={(e) => {
                  action.commonChange('main.companyInfo.inviteCode', e.detail.value);
                }}
                placeholder="请输入邀请码"
              />
            </View>
          </View>
        ) : null}*/}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
