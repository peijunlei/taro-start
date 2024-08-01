import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import CollectionBottom from './components/collection-bottom';
import CollectionList from './components/collection-list';
import SkeletonSmall from '@/pages/common/skeleton';
//分享赚弹窗
import GoodsShare from '@/pages/common/goods/goods-share';
import ShareModal from '@/pages/common/share-modal';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerUserCollection extends Component<Partial<T.IProps>, any> {
  static defaultProps = {
    main: {},
  };

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.props.actions.init();
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  componentWillUnmount() {
    // this.props.actions.clean();
  }

  componentDidShow() {
    const {
      main: {total},
    } = this.props;
    Taro.setNavigationBarTitle({title: `我的收藏(${total || 0})`});
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;
    console.log(12);
    return (
      main && (
        <View className="user-collection">
          <View
            className="modify"
            onClick={() => {
              commonChange('main.ifModify', !main.ifModify);
            }}
          >
            {main.total !== 0 ? (main.ifModify ? '完成' : '编辑') : null}
          </View>
          {main.loadSkeleton && <SkeletonSmall />}
          <CollectionList />
          {main.ifModify && <CollectionBottom />}
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
            />
          ) : null}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
