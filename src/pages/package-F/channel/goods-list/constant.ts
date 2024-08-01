export const BASE = 'ChannelGoodsList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'ChannelGoodsList_commonChange',
  init = 'ChannelGoodsList_INIT',
  clean = 'ChannelGoodsList_CLEAN',
  setGoods='ChannelGoodsList_Goods',

  /*
        修改查询条件数据
    */
  modifyRequest = 'ChannelGoodsList_modifyRequest',

  /*
         清空查询结果
     */
  cleanList = 'ChannelGoodsList_cleanList',

  /*
         
     */
  queryResult = 'ChannelGoodsList_queryResult',
}

//create by moon https://github.com/creasy2010/moon
