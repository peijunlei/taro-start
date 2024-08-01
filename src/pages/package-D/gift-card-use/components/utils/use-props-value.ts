import { useRef, useCallback, useState } from 'react'
function useForceUpdate() {
  const [, updateState] = useState()
  return useCallback(() => updateState({} as any), [])
}
interface UsePropsValue<T> {
  value?: T
  defaultValue?: T
  finalValue?: T
  onChange?: (value: T) => void
}

export function usePropsValue<T>({
  value,
  defaultValue,
  finalValue,
  onChange = (value: T) => {},
}: UsePropsValue<T>) {
  const forceUpdate = useForceUpdate()
  const dfValue = (defaultValue !== undefined ? defaultValue : finalValue) as T
  const stateRef = useRef<T>(value !== undefined ? value : dfValue)
  if (value !== undefined) {
    stateRef.current = value
  }
  const setState = useCallback(
    (v: T, forceTrigger: boolean = false) => {
      const prevState = stateRef.current
      stateRef.current = v
      if (prevState !== stateRef.current || forceTrigger) {
        forceUpdate()
        onChange?.(v)
      }
    },
    [value, onChange]
  )
  return [stateRef.current, setState] as const
}
