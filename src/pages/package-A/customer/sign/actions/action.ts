import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import * as _ from '@/wmkit/common/util';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    /**
     * 签到
     */
    async sign() {
      let {main} = getData();
      let signFlag = main.signFlag;
      let successMessage = '签到成功';
      if (!signFlag) {
        let res = await api.customerSignRecordController.add('wechat');
        const res1 = await api.customerSignRecordController.getCustomerInfo();
        // 本次获取的积分
        const pointsIncrease = res1.signPoint;
        if (main.pointsFlag && main.growthFlag) {
          if (main.growthValue == 0 || main.growthValue == null) {
            successMessage = successMessage + ',恭喜您获得' + pointsIncrease + '积分';
          } else if (main.signPoint == 0 || main.signPoint == null) {
            successMessage = successMessage + ',恭喜您获得' + main.growthValue + '成长值';
          } else {
            successMessage = successMessage + ',恭喜您获得' + pointsIncrease + '积分,' + main.growthValue + '成长值';
          }
        } else if (main.pointsFlag && !main.growthFlag) {
          if (main.signPoint != 0 && main.signPoint != null) {
            successMessage = successMessage + ',恭喜您获得' + pointsIncrease + '积分';
          }
        } else if (!main.pointsFlag && main.growthFlag) {
          if (main.growthValue != 0 && main.growthValue != null) {
            successMessage = successMessage + ',恭喜您获得' + main.growthValue + '成长值';
          }
        }

        let days = main.daysNumArr;
        let signDate = new Date(Date.now());
        days.push(signDate.getDate());
        main.userInfo.signContinuousDays = main.userInfo.signContinuousDays + 1;

        action.commonChange([
          {paths: 'main.signFlag', value: !signFlag},
          {paths: 'main.isOpened', value: true},
          {paths: 'main.toastContent', value: successMessage},
        ]);

        if (!signFlag) {
          try {
            Taro.showToast({
              title: successMessage,
              icon: 'none',
              duration: 3000,
            });
          } catch (error) {}
        }

        //actions.init();
      }
    },
    /**
     * 查询  列表
     */
    async query() {
      const isLogin = WMkit.isLogin();
      if (!isLogin) {
        const res = await Promise.all([
          api.pointsMallController.hotExchange({pageSize: 10}), //获取热门兑换
          api.systemPointsConfigController.query(),
        ]);
        if (!res[1].status) {
          await this.integralVisible();
        }
        dispatch({
          type: Command.init,
          payload: {
            main: {
              hotExchange: res[0].pointsGoodsVOPage.content,
              pointsRule: res[1].remark,
            },
          },
        });

        return false;
      }

      const res = await Promise.all([
        api.pointsMallController.hotExchange({pageSize: 10}), //获取热门兑换
        api.systemPointsConfigController.query(),
      ]);
      if (!res[1].status) {
        await this.integralVisible();
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            hotExchange: res[0].pointsGoodsVOPage.content,
            pointsRule: res[1].remark,
          },
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('signMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
