import { useEffect, useRef } from 'react';


export  function useStableRef<T>(value: T): React.RefObject<T> {
	const ref = useRef<T>(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref;
}
