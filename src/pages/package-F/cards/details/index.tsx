import { View, ScrollView, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import actions from './actions';
import { store2Props } from './selectors';
import Header from './components/header'
import Spec from './components/spec'
import RichText from './components/richtext'
import Footer from './components/footer';
import { isEmpty } from 'lodash';
import Modal from './components/modal'
import WMLoading from '@/pages/common/loading';

@connect<Partial<any>, any>(store2Props, actions)
export default class Live extends Component<Partial<any>, any> {

  componentDidMount(): void {
    const params = Taro.Current.router.params
    this.props.actions.init()
    this.props.actions.action.init(params)
  }

  componentWillUnmount(): void {
    this.props.actions.clean()
  }

  render() {
    const { main } = this.props
    return (
      <View className="brandsDetails _page">
        {
          isEmpty(main) ? null : (
            <>
              <ScrollView scrollY className='scroll' scrollIntoView={main.scrollIntoView}>
                <Header />
                <Spec />
                <RichText />
              </ScrollView>
              <Footer />
              {main.showModal ? <Modal /> : null}
              {main.showLoading ? <WMLoading /> : null}
            </>
          )
        }
      </View>
    )
  }
}
