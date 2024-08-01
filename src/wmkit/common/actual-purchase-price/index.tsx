import { MarketingTypeEnum } from '@/wmkit/common/marketing';
import { WMkit } from 'wmkit';
export const getActualPurchasePrice =
  (marketings: Array<IMarketings>) =>
    (price: number) =>
      (
        params?: Partial<{
          /** 是否开通付费会员 */
          isOpenPaymember: boolean;
          /** 是否为企业会员 */
          isEnterpriseCustomer: boolean;
          activityPrice: number;
        }>,
      ) => {
        const showPrice = price || 0;
        let actualPurchasePrice = showPrice;
        const marketingPluginLabelsItem = {} as Partial<IMarketings>;

        if (WMkit?.isLogin?.()) {
          const marketings_new =
            marketings?.filter?.((item) => {
              if ([MarketingTypeEnum.PayMemberLevelPrice].includes(item?.marketingType) && !params?.isOpenPaymember) {
                return;
              }

              if ([MarketingTypeEnum.EnterprisePrice].includes(item?.marketingType) && !params?.isEnterpriseCustomer) {
                return;
              }

              return item;
            }) || [];
          const marketings_list = marketings_new?.filter?.((item) => MARKETINGTYPE_LIST.includes(item?.marketingType));
          const price_list = marketings_list.map((item) => item?.pluginPrice || 0);

          actualPurchasePrice = Math.min(...price_list, showPrice);
          const marketings_item = marketings_list.find((item) => item?.pluginPrice === actualPurchasePrice);
          Object.assign(marketingPluginLabelsItem, {
            ...marketings_item,
          });
        }
        if (params?.activityPrice) {
          return {
            actualPurchasePrice: params?.activityPrice,
            ...marketingPluginLabelsItem,
          } as IMarketings & {
            actualPurchasePrice: number;
          };
        }
        return {
          actualPurchasePrice,
          ...marketingPluginLabelsItem,
        } as IMarketings & {
          actualPurchasePrice: number;
        };
      };

interface IMarketings {
  /** 营销活动价格 */
  pluginPrice: number;
  /** 营销活动类型 */
  marketingType: number;
  /** 营销活动描述 */
  marketingDesc: string;

  [key: string]: any;
}