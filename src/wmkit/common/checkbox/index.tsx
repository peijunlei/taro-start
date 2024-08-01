import React, {useEffect, useState} from 'react';
import {View, Image, Text} from '@tarojs/components';
import './index.less';
import IconFont from '../iconfont';
import classNames from 'classnames';
const disabledImg =
  'https://wanmi-b2b-x-site.oss-cn-shanghai.aliyuncs.com/pandora-ui/assets/components/images/checkbox/icon-disabled.png';

interface IWMCheckboxProps {
  /** 是否选中 */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 标签 */
  label?: string;
  isCheckbox?: boolean;
  /** 点击回调 */
  onClick: (checked: boolean) => void;
  /** 若当前处于选中状态，点击自身，是否可以取消选中状态 */
  isCancelSelfChecked?: boolean;
}

/**
 * 多选框组件
 */
const Checkbox: React.FC<IWMCheckboxProps> = ({
  checked = false,
  disabled = false,
  isCheckbox = false,
  label = '',
  onClick = (_checked: boolean) => {},
  isCancelSelfChecked = false,
}) => {
  const [currentChecked, setCurrentChecked] = useState(checked);

  /* eslint-disable */
  useEffect(() => {
    if (currentChecked !== checked) {
      setCurrentChecked(checked);
    }
  }, [checked]);
  /* eslint-enable */

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    if (disabled) {
      onClick(currentChecked);
      return;
    }
    const tmpChecked = !currentChecked;
    if(!isCancelSelfChecked) {
      setCurrentChecked(tmpChecked);
    }
    onClick(tmpChecked);
  };

  const imgStyle = classNames('img', disabled && (currentChecked ? 'disabled-img' : 'disabled-unchecked-img'));
  const labelStyle = classNames('label', disabled && 'disabled-label');
  return (
    <View
      className="wm-check"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <View className="img-box">
        {disabled ? (
          <Image className={imgStyle} src={disabledImg} />
        ) : (
          <IconFont
            value={
              currentChecked ? (!isCheckbox ? 'yixuanzhong' : 'yitongyi') : !isCheckbox ? 'weixuanze' : 'weitongyi'
            }
            size={16}
            color={currentChecked ? 'var(--themeColor)' : '#ccc'}
          />
        )}
      </View>
      {!!label && <Text className={labelStyle}>{label}</Text>}
    </View>
  );
};

export default Checkbox;
