import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import PackageCOrderInvoiceInfoMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tid,type) {
      await actions.loadReducer();
      const res = await api.tradeBaseController.invoice(tid,type); //发票信息
      //普票增票通用的状态值
      if(res.type == 0){
        //普通发票
        dispatch({
          type: Command.init,
          payload: {
            main: {
              invoiceInfo:{
                address:res.address,
                contacts:res.contacts,
                phone:res.phone,
                type:false,
                projectName:res.projectName,
                provinceId:res.provinceId,
                cityId:res.cityId,
                areaId:res.areaId,
                title:res.generalInvoice.title?res.generalInvoice.title:'',
                flag:(res as any).generalInvoice.flag?(res as any).generalInvoice.flag:0,
                identification:(res as any).generalInvoice.identification,
              }
            },
          },
        });
      }else{
        //增票
        dispatch({
          type: Command.init,
          payload: {
            main: {
              invoiceInfo:{
                address:res.address,
                contacts:res.contacts,
                phone:res.phone,
                type:true,
                projectName:res.projectName,
                provinceId:res.provinceId,
                cityId:res.cityId,
                areaId:res.areaId,
                companyName:(res as any).specialInvoice.companyName,
                phoneNo:(res as any).specialInvoice.phoneNo,
                bank:(res as any).specialInvoice.bank,
                account:(res as any).specialInvoice.account,
                companyAddress:(res as any).specialInvoice.address,
                identification:(res as any).specialInvoice.identification
              }
            },
          },
        });
      }
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.showAdd',
          value: true,
        },
      });

    },
    /**
     * 重置
     */
     async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        PackageCOrderInvoiceInfoMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['PackageCOrderInvoiceInfoMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
