export const BASE = 'TabbarChannelGoodsList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'TabbarChannelGoodsList_commonChange',
  init = 'TabbarChannelGoodsList_INIT',
  clean = 'TabbarChannelGoodsList_CLEAN',
  setGoods='TabbarChannelGoodsList_Goods',

  /*
        修改查询条件数据
    */
  modifyRequest = 'TabbarChannelGoodsList_modifyRequest',

  /*
         清空查询结果
     */
  cleanList = 'TabbarChannelGoodsList_cleanList',

  /*
         
     */
  queryResult = 'TabbarChannelGoodsList_queryResult',
}

//create by moon https://github.com/creasy2010/moon
