export const BASE = 'LoginGoodsList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'LoginGoodsList_commonChange',
  init = 'LoginGoodsList_INIT',
  clean = 'LoginGoodsList_CLEAN',
  setGoods='LoginGoodsList_Goods',

  /*
        修改查询条件数据
    */
  modifyRequest = 'LoginGoodsList_modifyRequest',

  /*
         清空查询结果
     */
  cleanList = 'LoginGoodsList_cleanList',

  /*
         
     */
  queryResult = 'LoginGoodsList_queryResult',
}

//create by moon https://github.com/creasy2010/moon
