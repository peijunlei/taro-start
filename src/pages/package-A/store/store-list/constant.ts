export const BASE = 'PackageAStoreStoreList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'PackageAStoreStoreList_commonChange',
  init = 'PackageAStoreStoreList_INIT',
  clean = 'PackageAStoreStoreList_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'PackageAStoreStoreList_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'PackageAStoreStoreList_cleanList',

  /*
        
    */
  queryResult = 'PackageAStoreStoreList_queryResult',
}

//create by moon https://github.com/creasy2010/moon
