export const BASE = 'PackageBDistributionShopShopGoodsMain';

export enum Command {
  //通用修改数据方法
  commonChange = 'PackageBDistributionShopShopGoodsMain_commonChange',
  init = 'PackageBDistributionShopShopGoodsMain_INIT',
  clean = 'PackageBDistributionShopShopGoodsMain_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'PackageBDistributionShopShopGoodsMain_modifyRequest',

  /*
         清空查询结果
     */
  cleanList = 'PackageBDistributionShopShopGoodsMain_cleanList',

  /*
         
     */
  queryResult = 'PackageBDistributionShopShopGoodsMain_queryResult',
}

//create by moon https://github.com/creasy2010/moon
