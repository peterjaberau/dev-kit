import { type RefObject, type Ref, type RefCallback } from 'react';

export function mergeRefs<T>(refs: (Ref<T> | null | undefined | false)[]): RefCallback<T> {
	return (value: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref !== null && typeof ref === 'object') {
				(ref as RefObject<T | null>).current = value;
			}
		});
	};
}
