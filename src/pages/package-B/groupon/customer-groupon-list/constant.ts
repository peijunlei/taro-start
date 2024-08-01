export const BASE = 'CustomerGrouponList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'CustomerGrouponList_commonChange',
  init = 'CustomerGrouponList_INIT',
  clean = 'CustomerGrouponList_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'CustomerGrouponList_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'CustomerGrouponList_cleanList',

  /*
        
    */
  queryResult = 'CustomerGrouponList_queryResult',
}

//create by moon https://github.com/creasy2010/moon
