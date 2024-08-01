import React from 'react';
import { AtModal } from "taro-ui";


interface IProps {
  maskInfo: any;
  onConfirm: () => void;
}

function ConfirmMask(props: IProps) {
  const { maskInfo, onConfirm } = props;
  if(!maskInfo) return null;
  return (
    <AtModal
      isOpened={maskInfo.isOpen}
      title={maskInfo.title}
      content={maskInfo.content}
      confirmText='确定'
      onConfirm={onConfirm}
    />
  );
}

export default ConfirmMask;