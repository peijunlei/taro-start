export const BASE = 'PackageAStoreStoreAttention_';

export enum Command {
  //通用修改数据方法
  commonChange = 'PackageAStoreStoreAttention_commonChange',
  init = 'PackageAStoreStoreAttention_INIT',
  clean = 'PackageAStoreStoreAttention_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'PackageAStoreStoreAttention_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'PackageAStoreStoreAttention_cleanList',

  /*
        
    */
  queryResult = 'PackageAStoreStoreAttention_queryResult',
}

//create by moon https://github.com/creasy2010/moon
