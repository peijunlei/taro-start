import React, {
  useEffect,
  useRef,
  FunctionComponent,
  useState,
  ChangeEvent,
} from 'react'
import classNames from 'classnames'
import { Input, View, Image, ITouchEvent, BaseEventOrigFunction, BaseEventOrig } from '@tarojs/components'
import { usePropsValue } from '../utils/use-props-value'
import { BasicComponent, ComponentDefaults } from '../utils/typings'
import disabledReduce from '@/assets/image/common/reduce.png';
import reduceg from '@/assets/image/common/reduceg.png';
import add from '@/assets/image/common/add.png';
import disabledAdd from '@/assets/image/common/addg.png';
import './inputnumber.scss'
import { InputProps } from '@tarojs/components/types/Input'
export interface InputNumberProps extends BasicComponent {
  value: number | string
  defaultValue: number | string
  allowEmpty: boolean
  min: number | string
  max: number | string
  type?: Extract<InputProps['type'], 'number' | 'digit'>
  disabled: boolean
  readOnly: boolean
  step: number
  digits: number
  async: boolean
  formatter?: (value?: string | number) => string
  onPlus: (e: ITouchEvent<any>) => void
  onMinus: (e: ITouchEvent<any>) => void
  onOverlimit: (e: ITouchEvent<any>) => void
  onBlur: (e: number | string) => void
  onFocus: (e: number | string) => void
  onChange: (
    param: string | number,
    e: BaseEventOrig<InputProps.inputValueEventDetail>
  ) => void
}

const defaultProps = {
  ...ComponentDefaults,
  disabled: false,
  readOnly: false,
  allowEmpty: false,
  min: 1,
  max: 9999,
  type: 'digit',
  step: 1,
  digits: 0,
  async: false,
} as InputNumberProps

const classPrefix = `nut-inputnumber`
export const InputNumber: FunctionComponent<
  Partial<InputNumberProps> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur'>
> = (props) => {
  const {
    children,
    disabled,
    min,
    max,
    type,
    readOnly,
    value,
    defaultValue,
    allowEmpty,
    digits,
    step,
    async,
    className,
    style,
    formatter,
    onPlus,
    onMinus,
    onOverlimit,
    onBlur,
    onFocus,
    onChange,
    ...restProps
  } = {
    ...defaultProps,
    ...props,
  }
  const classes = classNames(classPrefix, className, {
    [`${classPrefix}-disabled`]: disabled,
  })
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (focused) {
      inputRef.current?.select?.()
    }
  }, [focused])

  const [shadowValue, setShadowValue] = usePropsValue<number | null | string>({
    value: typeof value === 'string' ? parseFloat(value) : value,
    defaultValue:
      typeof defaultValue === 'string'
        ? parseFloat(defaultValue)
        : defaultValue,
    finalValue: 0,
    onChange: (value) => { },
  })
  const bound = (value: number, min: number, max: number) => {
    let res = value
    if (min !== undefined) {
      res = Math.max(Number(min), res)
    }
    if (max !== undefined) {
      res = Math.min(Number(max), res)
    }
    return res
  }
  const format = (value: number | null | string): string => {
    if (value === null) return ''
    // 如果超过 min 或 max, 需要纠正
    if (typeof value === 'string') value = parseFloat(value)
    const fixedValue = bound(value, Number(min), Number(max))
    if (formatter) {
      return formatter(fixedValue)
    }
    if (digits) {
      return fixedValue.toFixed(digits).toString()
    }
    return fixedValue.toString()
  }
  const [inputValue, setInputValue] = useState(format(shadowValue))

  useEffect(() => {
    if (!focused && !async) {
      setShadowValue(bound(Number(shadowValue), Number(min), Number(max)))
      setInputValue(format(shadowValue))
    }
  }, [focused, shadowValue])

  useEffect(() => {
    if (async) {
      setShadowValue(bound(Number(value), Number(min), Number(max)))
      setInputValue(format(value))
    }
  }, [value])

  const calcNextValue = (current: any, step: any, symbol: number) => {
    const dig = digits + 1
    return (
      (parseFloat(current || '0') * dig + parseFloat(step) * dig * symbol) / dig
    )
  }
  const update = (negative: boolean, e: ITouchEvent<any>) => {
    if (step !== undefined) {
      const shouldOverBoundary = calcNextValue(
        shadowValue,
        step,
        negative ? -1 : 1
      )
      const nextValue = bound(shouldOverBoundary, Number(min), Number(max))
      setShadowValue(nextValue)
      if (
        negative
          ? shouldOverBoundary < Number(min)
          : shouldOverBoundary > Number(max)
      ) {
        onOverlimit?.(e)
      } else {
        onChange?.(nextValue, e)
      }
    }
  }
  const handleReduce = (e: ITouchEvent<any>) => {
    e.stopPropagation()
    if (disabled) return
    onMinus?.(e)
    update(true, e)
  }
  const handlePlus = (e: ITouchEvent<any>) => {
    e.stopPropagation()
    if (disabled) return
    onPlus?.(e)
    update(false, e)
  }

  const parseValue = (text: string) => {
    if (text === '') return null
    if (text === '-') return null
    return text
  }
  const handleInputChange = (e) => {
    // 设置 input 值， 在 blur 时格式化
    setInputValue(e.detail.value)
    const valueStr = parseValue(e.detail.value)
    if (valueStr === null) {
      if (allowEmpty) {
        setShadowValue(null)
      } else {
        setShadowValue(defaultValue)
      }
    } else {
      setShadowValue(valueStr as any)
    }
    if (!async) {
      onChange?.(parseFloat(valueStr || '0').toFixed(digits) as any, e)
    }
  }
  const handleFocus = (e) => {
    setFocused(true)
    setInputValue(
      shadowValue !== undefined && shadowValue !== null
        ? bound(Number(shadowValue), Number(min), Number(max)).toString()
        : ''
    )
    onFocus && onFocus((Number(e.detail.value) ?? 0).toFixed(digits))
  }
  const handleBlur: BaseEventOrigFunction<InputProps.inputValueEventDetail> = (e) => {
    setFocused(false)
    onBlur && onBlur((Number(e.detail.value) ?? 0).toFixed(digits))
    if (async) {
      const valueStr = parseValue(e.detail.value)
      onChange?.(parseFloat(valueStr || '0').toFixed(digits) as any, e)
    }
  }

  return (
    <View className={classes} style={style} {...restProps}>
      <View
        className="nut-input-minus"
        onClick={handleReduce}
      >
        <Image src={
          (shadowValue === min || disabled) ? disabledReduce : reduceg
        } className='icon-minus'
        />
        {/* <Minus
          className={classNames('nut-inputnumber-icon icon-minus', {
            [`${classPrefix}-icon-disabled`]: shadowValue === min || disabled,
          })}
          onClick={handleReduce}
        /> */}
      </View>
      <>
        <Input
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="nut-number-input"
          type='number'
          ref={inputRef}
          disabled={disabled}
          value={inputValue}
          onInput={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </>
      <View
        className="nut-input-add"
        onClick={handlePlus}
      >
        <Image
          src={
            (shadowValue === max || disabled) ? disabledAdd : add
          }
          className='icon-plus'
        />
      </View>
    </View>
  )
}

