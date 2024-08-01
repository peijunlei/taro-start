import 'taro-ui/dist/style/components/modal.scss';
import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './distribution.less';
import actions from '../actions';
import {store2Props} from '../selectors';

import DistributionTop from './components/distribution-top';

import InvitFriend from './components/invit-friend';

import MyCustomer from './components/my-customer';

import SalesFriend from './components/sales-friend';

import SellwellGoods from './components/sellwell-goods';
import ForbiddenModal from './components/forbidden-modal';
import WMRichModal from '@/pages/common/modal/rich-modal';
//分享赚弹窗
import GoodsShare from '@/pages/common/goods/goods-share';
import ShareModal from '@/pages/common/share-modal';

import ToolImg from './components/tool-img';
import {WMkit, msg} from 'wmkit';
import {Modal} from '@wanmi/ui-taro';

import { PrivacyModal } from '@/pages/common';

@connect<any, any>(store2Props, actions)
export default class DistributionCenter extends Component<any, any> {
  constructor(props) {
    super(props);
    msg.on({
      'refresh-reward': async () => {
        await props.actions.init();
      },
    });
  }

  static options = {
    addGlobalClass: true,
  };

  //使得从个人中心页退出再登录以后进入页面能刷新
  componentDidShow() {
    const {main} = this.props;
    if (WMkit.isLogin() && main?.isrefresh) {
      this.props.actions.initDistribute();
      Taro.setNavigationBarTitle({
        title: '分销中心',
      });
    }
  }

  //从load-page页面登录进来强制页面刷新
  componentDidMount() {
    const {main} = this.props;
    if (WMkit.isLogin() && main?.isrefresh) {
      this.props.actions.initDistribute();
      Taro.setNavigationBarTitle({
        title: '分销中心',
      });
    }
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;
    return (
      main && (
        <View className="distribution-center">
          <DistributionTop />
          <SalesFriend />
          <InvitFriend />
          <MyCustomer />
          <ToolImg />
          <SellwellGoods />
          {main.isRuleShow && (
            <WMRichModal
              visible={main.isRuleShow}
              richText={main.performanceDesc}
              onClose={() => {
                commonChange('main.isRuleShow', !main.isRuleShow);
              }}
            />
          )}
          <View className="index">
            <Modal
              type="warning"
              visible={main.forbiddenShow}
              errorText={main.distributor.forbiddenReason}
              onCancel={() => {
                commonChange('main.forbiddenShow', false);
              }}
              onOk={() => {
                commonChange('main.forbiddenShow', false);
              }}
              content="禁用状态无法享受分销权益，不可推广商品赚返利，且不可管理店铺"
              title="您的店铺已被禁用"
              showCancel={false}
            />
          </View>
          {/* 分销分享赚弹框 */}
          {main.goodsShareVisible && (
            <GoodsShare
              checkedSku={main.goodsInfo}
              onClose={() => commonChange('main.goodsShareVisible', false)}
              addSelfShop={(val) => commonChange('main.addSelfShop', val)}
              shareModalVisible={() => commonChange('main.shareModalVisible', true)}
              isOpenWechat={main.isOpenWechat}
            />
          )}

          {main.shareModalVisible && Object.keys(main.goodsInfo).length > 0 ? (
            <ShareModal
              closeVisible={() => {
                //显示tab
                Taro.showTabBar();
                //弹窗关闭
                commonChange('main.shareModalVisible', false);
              }}
              addSelfShop={main.addSelfShop}
              goodsInfo={main.goodsInfo}
              goods={{}}
              shareType={2}
              shareModalVisible={main.shareModalVisible}
              // 大图预览结束，不执行init
              setIsRefresh={() =>
                setTimeout(() => {
                  commonChange('main.isrefresh', false);
                }, 100)
              }
            />
          ) : null}
           <PrivacyModal />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
