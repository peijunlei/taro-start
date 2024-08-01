import {Command} from '../constant';
import Taro from '@tarojs/taro';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {cache} from 'config';
import {UploadImage, VAS, WMkit, ValidConst,immutable} from 'wmkit';
import {extraPathsValue} from '@/redux/util';
import {Base64} from '@/utils/common-functions';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //查询分销设置
    async fetchDistributionSetting() {
      const res = (await api.distributionSettingController.findOne()) as any;
      return res.distributionSettingSimVO;
    },
    //上传图片
    async _chooseImage() {
      //选择图片后 会触发didshow函数
      // await action._savaLocal();
      let {businessLicenseUrl} = getData().main;
      if (businessLicenseUrl.length == 10)
        return Taro.showToast({
          title: '最多上传10张照片',
          icon: 'none',
          duration: 2000,
        });
      const {context} = await UploadImage();
      console.log(context[0]);
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.businessLicenseUrl',
          value: (enclosures) => {
            return enclosures.push(context[0]);
          },
        },
      });
    },
    //清空企业用户注册信息
    async removeEnterpriseInfo() {
      await action.commonChange('main.enterpriseInfoVO', {
        enterpriseId: '',
        enterpriseName: '',
        socialCreditCode: '',
        businessNatureType: '',
        businessIndustryType: '',
        businessLicenseUrl: '',
        inviteCode: '',
        customerId: '',
      });
    },
    //删除图片
    async _deleteImage(key) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.businessLicenseUrl',
          value: (enclosures) => {
            enclosures.splice(key, 1);
          },
        },
      });
    },
    //预览图片
    async _previewImage(key) {
      console.log(key);
      let params = {urls: [key]};
      Taro.previewImage(params);
    },
    //选择公司性质
    async selectCompany(e) {
      const companyClass = [
        {value: 1, label: '政府机关/事业单位'},
        {value: 2, label: '国营'},
        {value: 3, label: '私营'},
        {value: 4, label: '中外合资'},
        {value: 5, label: '外资'},
        {value: 6, label: '其他'},
      ];
      console.log(e);
      const currentChoose = companyClass[e].label;
      const currentValue = companyClass[e].value;
      await action.commonChange('main.companyInfo.businessNatureType', currentValue);
      await action.commonChange('main.companyInfo.businessNatureTypeName', currentChoose);
    },
    //企业信息提交
    async submit() {
      let {
        companyInfo: {
          businessNatureType,
          enterpriseName,
          socialCreditCode,
          inviteCode,
          customerAccount,
          customerPassword,
          verifyCode,
        },
        businessLicenseUrl,
      } = getData().main;
      const regex = ValidConst.socialCreditCode;
      console.log('regex', regex.test(socialCreditCode));
      if (!businessNatureType) {
        Taro.showToast({
          title: '请选择公司性质',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!enterpriseName) {
        Taro.showToast({
          title: '请输入公司名称',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regex.test(socialCreditCode)) {
        Taro.showToast({
          title: '请输入正确统一社会信用代码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (businessLicenseUrl.length === 0) {
        Taro.showToast({
          title: '请上传营业执照',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }

      let result = (await api.loginBaseController.prefectEnterpriseInfo({
        businessNatureType: businessNatureType,
        enterpriseName: enterpriseName,
        socialCreditCode: socialCreditCode,
        inviteCode: inviteCode,
        inviteeId: WMkit.inviteeId(),
        customerId: '',
        verifyCode: verifyCode,
        firstRegisterFlag: false,
        customerAccount: customerAccount,
        customerPassword: customerPassword,
        businessLicenseUrl: businessLicenseUrl.toString(),
      })) as any;

      if (result) {
        const base64 = new Base64();
        let result = await api.loginBaseController.login({
          customerAccount: base64.urlEncode(customerAccount),
          customerPassword: base64.urlEncode(customerPassword),
        });
        //清除缓存
        Taro.removeStorageSync(cache.PENDING_AND_REFUSED);
        Taro.removeStorageSync(cache.ACCOUNT_TOKEN);
        //清除企业用户注册信息
        this.removeEnterpriseInfo();
        if (immutable.fromJS(await VAS.fetchIepInfo()).getIn(['iepInfo', 'enterpriseCustomerAuditFlag']) == 1) {
          Taro.showToast({
            title: '提交成功，将会尽快给您审核！',
            icon: 'none',
            duration: 2000,
          });
        }
        Taro.redirectTo({
          url: `/pages/package-A/login/improve-iep-info/index?customerId=${result.customerId}`,
        });

        // await WMkit.showRegisterModel(result.couponResponse, true);
      }
    },
  };

  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageALoginIepRegisterInfoMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
