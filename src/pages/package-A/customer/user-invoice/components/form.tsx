import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {Input, UploadImage} from '@wanmi/ui-taro';
import React, {Component} from 'react';
import {WMkit} from 'wmkit';
import * as T from '../types';
import './form.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMFormInput from '@/pages/common/form-input';
import plus from '@/assets/image/order/plus.png';
import config from '@/service/config';

type IFormProps = T.IProps & T.IFormProps;

@connect<Partial<IFormProps>, T.IFormState>(store2Props, actions)
export default class InvoiceForm extends Component<Partial<IFormProps>, T.IFormState> {
  constructor(props: IFormProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {
        action: {commonChange},
        _chooseImage,
        newUploadImg,
      },
      main,
    } = this.props;
    if (!main) {
      return;
    }
    let {invoiceForm, isEdit} = main;
    if (invoiceForm.checkState == null) {
      isEdit = true;
    }
    const taxpayerIdentificationImg =
      invoiceForm.taxpayerIdentificationImg === '' || invoiceForm.taxpayerIdentificationImg === null
        ? ''
        : JSON.parse(invoiceForm.taxpayerIdentificationImg)[0].url;
    const businessLicenseImg =
      invoiceForm.businessLicenseImg === '' || invoiceForm.businessLicenseImg === null
        ? ''
        : JSON.parse(invoiceForm.businessLicenseImg)[0].url;

    return (
      <View className="form">
        <Input
          label="单位全称"
          placeholder="请输入正确的单位全称"
          type="text"
          onInput={(e) => {
            commonChange('main.invoiceForm.companyName', e.detail.value);
            commonChange('main.saveCustomerInvoiceForm.companyName', e.detail.value);
          }}
          maxlength={50}
          defaultValue={invoiceForm.companyName}
          disabled={!isEdit}
        />
        <Input
          label="纳税人识别号"
          placeholder="请输入正确的纳税人识别号"
          maxlength={20}
          type="text"
          onInput={(e) => {
            commonChange('main.invoiceForm.taxpayerNumber', e.detail.value);
            commonChange('main.saveCustomerInvoiceForm.taxpayerNumber', e.detail.value);
          }}
          defaultValue={invoiceForm.taxpayerNumber}
          disabled={!isEdit}
        />
        <Input
          label="注册电话"
          placeholder="请输入正确的注册电话"
          maxlength={20}
          type="text"
          onInput={(e) => {
            commonChange('main.invoiceForm.companyPhone', e.detail.value);
            commonChange('main.saveCustomerInvoiceForm.companyPhone', e.detail.value);
          }}
          defaultValue={invoiceForm.companyPhone}
          disabled={!isEdit}
        />
        <Input
          label="注册地址"
          placeholder="请输入正确的注册地址"
          maxlength={60}
          type="text"
          onInput={(e) => {
            commonChange('main.invoiceForm.companyAddress', e.detail.value);
            commonChange('main.saveCustomerInvoiceForm.companyAddress', e.detail.value);
          }}
          defaultValue={invoiceForm.companyAddress}
          disabled={!isEdit}
        />
        <Input
          label="银行基本户号"
          placeholder="请输入正确的银行基本户号"
          type="text"
          maxlength={30}
          onInput={(e) => {
            commonChange('main.invoiceForm.bankNo', e.detail.value);
            commonChange('main.saveCustomerInvoiceForm.bankNo', e.detail.value);
          }}
          defaultValue={invoiceForm.bankNo}
          disabled={!isEdit}
        />
        <Input
          label="开户行"
          placeholder="请输入正确的开户行"
          maxlength={50}
          type="text"
          onInput={(e) => {
            commonChange('main.invoiceForm.bankName', e.detail.value);
            commonChange('main.saveCustomerInvoiceForm.bankName', e.detail.value);
          }}
          defaultValue={invoiceForm.bankName}
          disabled={!isEdit}
        />
        <View className="upload">
          <View className="upload-title">
            <Text>营业执照复印件</Text>
            <Image
              className="license"
              src={require('@/assets/image/common/wenhao2.png')}
              onClick={() => commonChange('main.isShowLicense', true)}
            />
          </View>
          {isEdit ? (
            <UploadImage
              maxNum={1}
              defaultList={businessLicenseImg ? [businessLicenseImg] : []}
              url={`${WMkit.prefixUrl(config.host)}/common/uploadResource?resourceType=IMAGE`}
              onChange={(context) => {
                newUploadImg(context, 'businessLicenseImg');
              }}
            />
          ) : (
            // <View className="enclosure">
            //   <Image
            //     onClick={async () => {
            //       await _chooseImage('businessLicenseImg');
            //     }}
            //     className="plus"
            //     src={businessLicenseImg || plus}
            //   />
            //   {businessLicenseImg && (
            //     <Image
            //       src={close}
            //       className="close-pic"
            //       onClick={() => {
            //         commonChange('main.invoiceForm.businessLicenseImg', '');
            //         commonChange('main.saveCustomerInvoiceForm.businessLicenseImg', '');
            //       }}
            //     />
            //   )}
            // </View>
            <View className="enclosure">
              <Image className="plus" src={businessLicenseImg || plus} />
            </View>
          )}
          {/* <Text className="tips"> 仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过5M</Text> */}
        </View>
        <View className="upload">
          <Text className="upload-title">一般纳税人认证资格复印件</Text>
          {isEdit ? (
            <UploadImage
              maxNum={1}
              defaultList={taxpayerIdentificationImg ? [taxpayerIdentificationImg] : []}
              url={`${WMkit.prefixUrl(config.host)}/common/uploadResource?resourceType=IMAGE`}
              onChange={(context) => {
                newUploadImg(context, 'taxpayerIdentificationImg');
              }}
            />
          ) : (
            // <View className="enclosure">
            //   <Image
            //     onClick={async () => {
            //       await _chooseImage('taxpayerIdentificationImg');
            //     }}
            //     className="plus"
            //     src={taxpayerIdentificationImg || plus}
            //   />
            //   {taxpayerIdentificationImg && (
            //     <Image
            //       src={close}
            //       className="close-pic"
            //       onClick={() => {
            //         commonChange('main.invoiceForm.taxpayerIdentificationImg', '');
            //         commonChange('main.saveCustomerInvoiceForm.taxpayerIdentificationImg', '');
            //       }}
            //     />
            //   )}
            // </View>
            <View className="enclosure">
              <Image className="plus" src={taxpayerIdentificationImg || plus} />
            </View>
          )}
          {/* <Text className="tips"> 仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过5M</Text> */}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
