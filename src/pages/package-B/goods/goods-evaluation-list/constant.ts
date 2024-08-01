export const BASE = 'LoginGoodsEvaluationList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'LoginGoodsEvaluationList_commonChange',
  init = 'LoginGoodsEvaluationList_INIT',
  clean = 'LoginGoodsEvaluationList_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'LoginGoodsEvaluationList_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'LoginGoodsEvaluationList_cleanList',

  /*
        
    */
  queryResult = 'LoginGoodsEvaluationList_queryResult',
}

//create by moon https://github.com/creasy2010/moon
