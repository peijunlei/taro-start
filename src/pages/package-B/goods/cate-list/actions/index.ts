import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import Action from './action';
import goodsCateListMain from '../reducers/main';
import StoreCateBaseController from 'api/StoreCateBaseController';
import {pvUvStatics} from 'wmkit';
import {WMkit} from 'wmkit';
import api from 'api';
export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(params) {
      await actions.loadReducer();
      const {storeId} = params;
      actions.action.commonChange('main.storeId', storeId);
      actions.goodsCateList(storeId);
      if (WMkit.isLogin()) {
        let result = await api.storeBaseController.queryStore({storeId});
        /**店铺pv/uv埋点*/
        pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
      } else {
        let result = await api.storeBaseController.queryStoreUnlogin({storeId});
        /**店铺pv/uv埋点*/
        pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
      }
    },

    arrayToObject(array) {
      let obj = {};
      array.map((item) => {
        obj[item.storeCateId] = Object.assign({}, item);
      });
      return obj;
    },
    async goodsCateList(storeId) {
      const storeCateList = await StoreCateBaseController.list({storeId: storeId});
      let childrenList = [];
      let parentList = [];
      let obj = {};
      if (storeCateList) {
        parentList = storeCateList.filter((cate) => cate.cateGrade === 1);
        childrenList = storeCateList.filter((cate) => cate.cateGrade === 2);
        obj = actions.arrayToObject(parentList);

        childrenList.forEach((item) => {
          let {cateParentId} = item;
          if (obj[cateParentId]) {
            if (!obj[cateParentId].children) {
              obj[cateParentId].children = [];
            }
            obj[cateParentId].children.push(item);
          }
        });
        actions.action.commonChange('main.storeCateTree', obj);
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
        goodsCateListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['goodsCateListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
