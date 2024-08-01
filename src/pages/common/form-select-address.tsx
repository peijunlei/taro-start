import Taro, {Component} from '@tarojs/taro';
import {Image, Input, Text, View} from '@tarojs/components';
import './form-select.less';
import className from 'classnames';

import clearIcon from '@/assets/image/common/arrow.png';

const noop = () => {};

export interface IFormSelectProps {
  //项目名
  labelName?: string;
  onClick?: Function;
  // 选中后的值
  value?: any;
  placeholder?: any;
  textStyle?: Object;
  //icon 是否显示
  iconVisible?: boolean;
  leftStyle?: Object;
  selectRight?: Object;
  formStyle?: Object;
  inputStyle?: any;
  selected?: any;
  // 是否显示底边线
  underline?: boolean;
  disabled?: boolean;
}

//选终值
export interface ISelected {
  key: any;
  value: any;
}

/**
 * form中选中
 */
export default class FormSelectAddress extends Component<IFormSelectProps, any> {
  static defaultProps = {
    onClick: noop,
    iconVisible: true,
  };
  constructor(props: IFormSelectProps) {
    super(props);
  }

  render() {
    const {
      labelName,
      onClick,
      formStyle,
      value,
      placeholder,
      textStyle,
      iconVisible,
      leftStyle,
      selectRight,
      inputStyle,
      underline,
      disabled,
    } = this.props;
    return (
      <View
        className={className(`wm-form-item`, {form__underline: underline})}
        style={formStyle}
        onClick={() => onClick()}
      >
        <Text className="form-label" style={leftStyle}>
          {labelName}
        </Text>
        <View className="select-right" style={selectRight}>
          <Input type="text" value={value} placeholder={placeholder} className="form__input" style={inputStyle} />
          {iconVisible ? <Image src={clearIcon} className="jiantou" /> : <Text className="jiantou" />}
        </View>
      </View>
    );
  }
}
