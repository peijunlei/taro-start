import React from 'react';
import { WebView } from "@tarojs/components";
import { useRouter } from '@tarojs/taro';




function CustomLink() {
  let url = useRouter().params.url;
  url = decodeURIComponent(url);
  console.log('CustomLinkUrl===>', url);
  return (
    <WebView id='CustomLinkWebView' src={url}></WebView>
  );
}

export default CustomLink;