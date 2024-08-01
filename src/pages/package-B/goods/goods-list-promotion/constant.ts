export const BASE = 'LoginGoodsList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'LoginGoodsListPromotion_commonChange',
  init = 'LoginGoodsListPromotion_INIT',
  clean = 'LoginGoodsListPromotion_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'LoginGoodsListPromotion_modifyRequest',

  /*
         清空查询结果
     */
  cleanList = 'LoginGoodsListPromotion_cleanList',

  /*
         
     */
  queryResult = 'LoginGoodsListPromotion_queryResult',
}

//create by moon https://github.com/creasy2010/moon
