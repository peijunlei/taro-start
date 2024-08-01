import WMButton from '@/pages/common/button';
import WMCheckbox from '@/pages/common/input-checkbox';
import {View} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import actions from '../actions/index';
import {store2Props} from '../selectors';
import * as T from '../types';
import './collection-bottom.less';

type ICollectionBottomProps = T.IProps & T.ICollectionBottomProps;

@connect<Partial<ICollectionBottomProps>, T.ICollectionBottomState>(store2Props, actions)
export default class CollectionBottom extends Component<Partial<ICollectionBottomProps>, T.ICollectionBottomState> {
  constructor(props: ICollectionBottomProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        deleteGoods,
        clearGoods,
        init,
        action: {commonChange},
      },
      main,
    } = this.props;
    if (!main) {
      return;
    }
    const {selectedList, ifSelectAll, list, ifModify, reload} = main;
    const invalidGoods = list.filter((item) => item.goodsStatus === 2);
    return (
      <View className="collectionBottom">
        <WMCheckbox
          label="全选"
          checked={ifSelectAll}
          onClick={() => {
            let bool = ifSelectAll;
            commonChange([
              {
                paths: 'main.selectedList',
                value: bool ? [] : list.map((goods) => goods.goodsInfoId),
              },
              {
                paths: 'main.ifSelectAll',
                value: !bool,
              },
            ]);
          }}
        />
        <View className="operation">
          <WMButton
            disabled={invalidGoods.length === 0}
            disableFull={false}
            style={{marginRight: '12px'}}
            onClick={async () => {
              await clearGoods()
                .then(() => {
                  Taro.showToast({
                    title: '清空成功',
                  });
                })
                .catch(() => {
                  Taro.showToast({
                    title: '清空失败，请重试',
                  });
                });
              this.afterDelete();
            }}
          >
            清空失效商品
          </WMButton>
          <WMButton
            disabled={selectedList.length === 0}
            disableFull={false}
            onClick={async () => {
              Taro.showModal({
                title: '删除商品',
                content: '您确认要删除所选商品？',
              }).then(async (res) => {
                if (res.confirm) {
                  await deleteGoods();
                  Taro.showToast({
                    title: '删除成功',
                  });
                  // .then(() => {
                  //   Taro.showToast({
                  //     title: '删除成功',
                  //   });
                  // })
                  // .catch(() => {
                  //   Taro.showToast({
                  //     title: '删除失败，请重试',
                  //   });
                  // });
                  this.afterDelete();
                }
              });
            }}
          >
            删除({selectedList.length})
          </WMButton>
        </View>
      </View>
    );
  }

  afterDelete = () => {
    let {
      actions: {
        action: {commonChange},
      },
      main: {reload},
    } = this.props;
    commonChange([
      {
        paths: 'main.reload',
        value: !reload,
      },
      {
        paths: 'main.ifModify',
        value: false,
      },
      {
        paths: 'main.selectedList',
        value: [],
      },
    ]);
  };
}

//create by moon https://github.com/creasy2010/moon
