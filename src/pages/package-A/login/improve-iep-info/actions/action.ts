import {Command} from '../constant';
import {cache} from 'config';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import Taro from '@tarojs/taro';
import api from 'api';
import {UploadImage, VAS,immutable} from 'wmkit';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //上传图片
    async _chooseImage() {
      //选择图片后 会触发didshow函数
      // await action._savaLocal();
      const {context} = await UploadImage();
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
    //查询分销设置
    async fetchDistributionSetting() {
      const res = (await api.distributionSettingController.findOne()) as any;
      return res.distributionSettingSimVO;
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
    async switchEnterpriseLogin(context: any) {
      await action.commonChange('main.enterpriseCheckState', context.enterpriseCheckState);
      //赋值会员信息
      await action.commonChange('main.enterpriseInfoVO', context.enterpriseInfoVO);
      await action.commonChange('main.businessLicenseUrl', context.enterpriseInfoVO.businessLicenseUrl.split(','));
      await action.commonChange('main.inviteCode', context.inviteCode);
      await action.commonChange('main.enterpriseCheckTip', context.enterpriseCheckReason);
      this.selectCompany(context.enterpriseInfoVO.businessNatureType);
      // let enterpriseInfoVO = context.context.customerDetail.enterpriseInfoVO;
      // await action.commonChange('main.companyInfo', enterpriseInfoVO);
      // this.initInviteInfo();
      // switch (context.enterpriseCheckState) {
      //   //待审核中 tip初始化  页面置灰   customer信息赋值  注册按钮隐藏
      //   case 1:
      //     break;
      //   //审核不通过 走重新提交流程  tip初始化  customer赋值 reason 赋值
      //   case 3:
      //     await action.commonChange('main.enterpriseCheckTip', context.enterpriseCheckReason);
      //     break;
      //   case 2:
      //     break;
      // }
    },
    //赋值邀请码
    async initInviteInfo() {
      const {code, context} = await api.loginBaseController.getRegisterLimitType();
      await action.commonChange('main.registerLimitType', context);
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
    //选择公司性质
    async selectCompany(e) {
      const companyClass = [
        {value: 0, label: '请选择'},
        {value: 1, label: '政府机关/事业单位'},
        {value: 2, label: '国营'},
        {value: 3, label: '私营'},
        {value: 4, label: '中外合资'},
        {value: 5, label: '外资'},
        {value: 6, label: '其他'},
      ];

      const currentChoose = companyClass[e].label;
      const currentValue = companyClass[e].value;
      await action.commonChange('main.enterpriseInfoVO.businessNatureType', currentValue);
      await action.commonChange('main.enterpriseInfoVO.businessNatureTypeName', currentChoose);
    },
    async submit() {
      let {businessLicenseUrl, enterpriseInfoVO} = getData().main;

      if (enterpriseInfoVO.businessNatureType == 0) {
        Taro.showToast({
          title: '请选择公司性质',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (enterpriseInfoVO.enterpriseName === '') {
        Taro.showToast({
          title: '请输入公司名称',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (enterpriseInfoVO.socialCreditCode === '') {
        Taro.showToast({
          title: '请输入统一社会信用代码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      let result = await api.loginBaseController.registerEnterprise({
        customerId: enterpriseInfoVO.customerId,
        firstRegisterFlag: false,
        inviteCode: enterpriseInfoVO.inviteCode,
        businessNatureType: enterpriseInfoVO.businessNatureType,
        enterpriseName: enterpriseInfoVO.enterpriseName,
        socialCreditCode: enterpriseInfoVO.socialCreditCode,
        businessLicenseUrl: businessLicenseUrl.toString(),
      });
      if (result) {
        //清除缓存
        Taro.removeStorageSync(cache.PENDING_AND_REFUSED);
        //清除企业用户注册信息
        this.removeEnterpriseInfo();
        if (immutable.fromJS(await VAS.fetchIepInfo()).getIn(['iepInfo', 'enterpriseCustomerAuditFlag']) == 1) {
          await Taro.showToast({
            title: '提交成功，将会尽快给您审核！',
            icon: 'none',
            duration: 2000,
          });
        }
        await Taro.switchTab({
          url: `/pages/index/index`,
        });
      }
      console.log(result);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageALoginImproveIepInfoMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
