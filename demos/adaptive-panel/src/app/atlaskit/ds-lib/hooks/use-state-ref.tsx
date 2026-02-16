import { type Dispatch, type RefObject, type SetStateAction, useRef, useState } from "react"

/**
 * Functions similarly to `useState` however the return value is a ref.
 *
 * ```js
 * const [valueRef, setValue] = useStateRef(0);
 * ```
 *
 * @param initialState
 */
export  function useStateRef<TValue>(
  initialState: (() => TValue) | TValue,
): [RefObject<TValue>, Dispatch<SetStateAction<TValue>>] {
  const [value, setValue] = useState(initialState)
  const valueRef = useRef(value)
  valueRef.current = value
  return [valueRef, setValue]
}
