export const BASE = 'OnlineRepayment_';

export enum Command {
  //通用修改数据方法
  commonChange = 'OnlineRepayment_commonChange',
  init = 'OnlineRepayment_INIT',
  clean = 'OnlineRepayment_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'OnlineRepayment_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'OnlineRepayment_cleanList',

  /*

    */
  queryResult = 'OnlineRepayment_queryResult',
}
