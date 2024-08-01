import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import AdvModal from '@/pages/common/adv-modal/adv-modal';

import {fetchModal, handleUrl, setModalShow} from 'wmkit';

export default class PurchaseAdvModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isModalFlag: false,
    imgUrl: '',
    jumpPage: {},
    nextPopupId: '',
  };

  async componentDidShow() {
    if (this.state.isModalFlag) {
      this.updateModalStatus('');
    }
  }

  render() {
    return (
      <AdvModal
        imgUrl={this.state.imgUrl}
        handleUrl={() => handleUrl(this.state.jumpPage)}
        handleClose={() => this.handleClose()}
        isModalFlag={this.state.isModalFlag}
      />
    );
  }

  async updateModalStatus(id) {
    const res = await fetchModal('shoppingCart');
    let popupId = null;
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'shoppingCart', popupId);
    this.setState(
      {
        isModalFlag: flagParams.showFlag,
        imgUrl: flagParams.imgUrl,
        jumpPage: (flagParams.jumpPage && JSON.parse(flagParams.jumpPage)) || '',
        nextPopupId: flagParams.nextPopupId,
      },
      () => {
        if (this.state.nextPopupId && !this.state.isModalFlag) {
          this.isGo(this.state.nextPopupId);
        }
      },
    );
  }

  async isGo(id) {
    await this.updateModalStatus(id);
  }

  handleClose() {
    this.setState({isModalFlag: false}, async () => {
      if (this.state.nextPopupId) {
        await this.updateModalStatus(this.state.nextPopupId);
      }
    });
  }
}
