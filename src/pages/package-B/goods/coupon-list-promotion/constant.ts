export const BASE = 'LoginGoodsList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'LoginGoodsListCoupon_commonChange',
  init = 'LoginGoodsListCoupon_INIT',
  clean = 'LoginGoodsListCoupon_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'LoginGoodsListCoupon_modifyRequest',

  /*
         清空查询结果
     */
  cleanList = 'LoginGoodsListCoupon_cleanList',

  /*
         
     */
  queryResult = 'LoginGoodsListCoupon_queryResult',
}

//create by moon https://github.com/creasy2010/moon
