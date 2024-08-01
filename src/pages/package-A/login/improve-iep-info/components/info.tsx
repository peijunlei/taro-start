import {Image, Input, Picker, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import upload from '@/assets/image/login/upload.png';
import failed from '@/assets/image/login/tip-failed.png';
import success from '@/assets/image/login/success.png';
import close from '@/assets/image/common/close.png';
import {noop} from 'wmkit';

type IInfoProps = T.IProps & T.IInfoProps;
const EnterpriseCheckState = [
  '',
  //待审核
  '您提交的账户信息正在审核中，请耐心等待。',
  //已审核
  '已审核',
  //审核未通过
  '您提交的账户信息审核未通过',
];
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
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
      // main: {openFlag},
      main,
    } = this.props;
    let businessLicenseUrl = main?.businessLicenseUrl;
    let tipMessage = main?.enterpriseCheckState && EnterpriseCheckState[main?.enterpriseCheckState];
    return (
      <View className="info">
        {main?.enterpriseCheckState == '1' && (
          <View className="tipBox">
            <Image className="imageStatus" src={success} />
            <View className="messageStatus">{tipMessage}</View>
          </View>
        )}
        {main?.enterpriseCheckState == '3' && (
          <View className="tipBox">
            <Image className="imageStatus" src={failed} />
            <View className="messageStatus">{tipMessage}</View>
            <View className="resetReason">
              <Text>原因是：</Text>
              <Text className="showRed">{main?.enterpriseCheckTip}</Text>
            </View>
            <View className="resetInfo">请修改信息后重新提交</View>
          </View>
        )}
        <View className="form-item">
          <View className="from-item-name"> 公司性质</View>
          <View className="from-item-input">
            <Picker
              disabled={main?.enterpriseCheckState == '1'}
              className="picker"
              mode="selector"
              value={main?.enterpriseInfoVO?.businessNatureType}
              range={['请选择', '政府机关/事业单位', '国营', '私营', '中外合资', '外资', '其他']}
              onChange={(e) => {
                action.selectCompany(e.detail.value);
              }}
            >
              <View className="picker-view">
                <Input
                  className="int"
                  value={main?.enterpriseInfoVO?.businessNatureTypeName}
                  placeholder="请选择"
                  type="text"
                  disabled
                />
                {/* <Image className="arrow-picker" src={rArrowIcon} /> */}
              </View>
            </Picker>
          </View>
        </View>
        <View className="form-item">
          <View className="from-item-name">公司名称</View>
          <View className="from-item-input">
            <Input
              disabled={main?.enterpriseCheckState == '1'}
              maxlength={60}
              value={main?.enterpriseInfoVO?.enterpriseName}
              onInput={(e) => {
                action.commonChange('main.enterpriseInfoVO.enterpriseName', e.detail.value);
              }}
              placeholder="请按营业执照填写"
            />
          </View>
        </View>
        <View className="form-item">
          <View className="from-item-name">统一社会信用代码</View>
          <View className="from-item-input">
            <Input
              disabled={main?.enterpriseCheckState == '1'}
              value={main?.enterpriseInfoVO?.socialCreditCode}
              onInput={(e) => {
                action.commonChange('main.enterpriseInfoVO.socialCreditCode', e.detail.value);
              }}
              placeholder="即纳税人识别号（税号）"
            />
          </View>
        </View>
        <View className="form-item-img">
          <View className="from-item-name">上传营业执照</View>
          {main?.enterpriseCheckState != '1' && businessLicenseUrl.length == 0 && (
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
                          onClick={async () => {
                            main?.enterpriseCheckState != '1' ? await action._deleteImage(index) : noop;
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
        {/*{main?.openFlag == 1 && (
          <View className="form-item">
            <View className="from-item-name">邀请码</View>
            <View className="from-item-input">
              <Input
                disabled={main?.enterpriseCheckState == '1'}
                value={main?.inviteCode}
                onInput={(e) => {
                  action.commonChange('main.companyInfo.inviteCode', e.detail.value);
                }}
                placeholder="请输入邀请码"
              />
            </View>
          </View>
        )}*/}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
