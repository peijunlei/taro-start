export const BASE = 'PackageACustomerUserCollection_';

export enum Command {
  //通用修改数据方法
  commonChange = 'PackageACustomerUserCollection_commonChange',
  init = 'PackageACustomerUserCollection_INIT',
  clean = 'PackageACustomerUserCollection_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'PackageACustomerUserCollection_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'PackageACustomerUserCollection_cleanList',

  /*
        
    */
  queryResult = 'PackageACustomerUserCollection_queryResult',
}

//create by moon https://github.com/creasy2010/moon
