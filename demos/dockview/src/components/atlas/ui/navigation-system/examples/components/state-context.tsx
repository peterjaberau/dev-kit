import { createContext, useContext } from 'react';

import invariant from 'tiny-invariant';

export const DispatchContext = createContext<any | null>(null);

export function useDispatch(): any {
	const dispatch = useContext(DispatchContext);
	invariant(dispatch, 'Could not find dispatch');
	return dispatch;
}

export const GetDataContext = createContext<any | null>(null);

export function useGetData() {
	const getData = useContext(GetDataContext);
	invariant(getData, 'Could not find getData()');
	return getData;
}

export const LastActionContext = createContext<any | null>(null);
/**
 * Not ideal. Use sparingly
 */
export function useLastAction(): any | null {
	const action = useContext(LastActionContext);
	return action;
}
