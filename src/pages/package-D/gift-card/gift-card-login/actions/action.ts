import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import {cache} from 'config';
import {activateGiftCard} from 'api/GiftCardController';
const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
let globalTimer;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async fetchGiftCardDetailInfo(id) {
      try {
        action.commonChange('main.isReady', true);
        // @ts-ignore
        const {giftCardLoginConfigVO} = await api.giftCardController.getGiftCardDetail(id);
        Taro.setNavigationBarTitle({title: giftCardLoginConfigVO.title});
        action.commonChange([
          {paths: 'main.isReady', value: false},
          {paths: 'main.id', value: id},
          {paths: 'main.cardLoginForm', value: giftCardLoginConfigVO},
        ]);
      } catch (e) {
        action.commonChange('main.isReady', false);
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
      }
    },

    // 激活卡
    async login() {
      let {
        // 卡号
        cardNo,
        // 卡密
        cardPwd,
        // 手机号
        phoneNum,
        // 验证码
        code,
        // 辅助信息
        auxiliaryInformation,
        id,
      } = getData().main;
      const program = {
        cardNo,
        cardPwd,
        phoneNum,
        code,
        auxiliaryInformation,
        enterpriseId: '-1',
        cardId: id,
      };
      const {giftCardBlessingConfigVO} = await api.giftCardController.getGiftCardBlessing(id);
      const enableFlag = giftCardBlessingConfigVO.enableFlag;
      try {
        let context = await api.loginBaseController.goGiftCardLogin(program);
        // a.设置登陆后token以及登陆信息缓存
        await Taro.setStorage({
          key: 'authInfo:token',
          data: context.token,
        });
        await Taro.setStorage({
          key: cache.LOGIN_DATA,
          data: context,
        });
        // c.登陆成功,跳转拦截前的路由
        Taro.showToast({
          title: '登录成功',
          duration: 2000,
        });
        Taro.removeStorageSync('mini::shopCardAddress');
        Taro.removeStorageSync('mini::confirmAddress');
        //卡券独立登录相应的缓存，这个缓存会在访问首页个人中心时被移除
        Taro.setStorage({
          key: cache.SINGER_CARD_LOGIN,
          data: true,
        });
        // 如果开启了祝福页
        if (enableFlag === 1) {
          Taro.redirectTo({
            url: `/pages/package-D/gift-card/gift-card-bless/index?id=${id}`,
          });
        } else {
          Taro.redirectTo({
            url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${context.userGiftCardId}&preview=false`,
          });
        }
      } catch (e) {
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
      }
    },

    /**
     * 发送验证码事件
     */
    async sendCode() {
      let {phoneNum} = getData().main;

      if (phoneNum == '') {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(phoneNum)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        await api.loginBaseController.sendLoginCode(phoneNum);
        Taro.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000,
        });
      } catch (error) {
        return false;
      }

      return true;
    },

    cleanTimer() {
      if (globalTimer) {
        clearTimeout(globalTimer);
      }
    },

    /**
     * 跳转至”适用商品“列表页面 - 操作
     * @returns
     */
    onGoGiftCardListPromotionClick() {
      const {giftCardType, giftCardId, userGiftCardId, cardStatus, isReady} = getData().main;
      if (isReady) return;

      /** 开启loading */
      action.commonChange('main.isReady', true);

      const params = {
        giftCardType,
        giftCardId,
        userGiftCardId,
        cardStatus,
      };

      let params_str = '';
      Object.entries(params).forEach(([key, value], index, arr) => {
        if (index === 0) {
          params_str += '?';
        }

        params_str += `${key}=${value}`;

        if (index < arr.length - 1) {
          params_str += '&';
        }
      });

      Taro.navigateTo({
        url: `/pages/package-D/gift-card-use/index?userGiftCardId=${userGiftCardId}`,
        complete() {
          setTimeout(() => {
            /** 关闭loading */
            action.commonChange('main.isReady', false);
          }, 360);
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('GiftCardLoginMain'),
  };
}
