import { WebView } from "@tarojs/components";
import React from "react";
import config from "@/service/config";

function Index() {
  const url  = `${config.host.split('mbff')[0]}mobile/pages/package-A/customer/chose-service/index?v=${+ new Date()}`
  return ( 
    <WebView src={url} />
   ); 
}

export default Index;