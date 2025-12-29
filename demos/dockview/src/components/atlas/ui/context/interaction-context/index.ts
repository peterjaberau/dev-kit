import { type Context, createContext } from 'react';

export interface InteractionContextType {
	hold(name?: string): void | (() => void);
	tracePress(name: string | undefined, timestamp?: number): void;
}

const _default_1: Context<InteractionContextType | null> =
	createContext<InteractionContextType | null>(null);
export default _default_1;
