import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import Action from './action';
import packageAPrizeReceiveMain from '../reducers/main';

import {getDrawrecordById} from 'api/DrawRecordController';
import {addressInfo} from '@/utils/location/area/area';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(id) {
      await actions.loadReducer();
      try {
        let result = await Promise.all([
          //地址初始化
          actions.action._addressInit(),
          //获取奖品领取详情
          getDrawrecordById(id),
        ]);
        const address = result[0];
        const consigneeNumber = address && address.consigneeNumber;
        const phone = consigneeNumber
          ? consigneeNumber.toString().slice(0, 3) + '****' + consigneeNumber.toString().slice(7, 11)
          : '';
        dispatch({
          type: Command.init,
          payload: {
            main: {
              address: result[0],
              prizeInfo: result[1].drawRecordVO,
              prizeId: id,
              phone,
            },
          },
        });
      } catch (e) {
        dispatch({
          type: Command.init,
          payload: {
            main: {
              address: [],
              prizeInfo: {},
            },
          },
        });
      }
    },

    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageAPrizeReceiveMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageAPrizeReceiveMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
