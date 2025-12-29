import { useEffect, useRef } from 'react';

/**
 * Returns the previous value in a given render cycle.
 *
 * ```js
 * const [currentValue] = useState(1);
 * const previousValue = usePreviousValue(currentValue);
 *
 * previousValue; // undefined
 * currentValue; // 1
 * ```
 *
 * @param value
 */
export function usePreviousValue<TValue>(value: TValue): TValue | undefined {
	const ref: any = useRef<TValue>(null);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}
