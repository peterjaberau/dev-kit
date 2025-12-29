/* eslint-disable no-console */
interface PrintedMapping {
	[key: string]: boolean;
}
const printed: PrintedMapping = {};

export function warnOnce(message: string): void {
	if (printed[message]) {
		return;
	}

	printed[message] = true;

	if (typeof window !== 'undefined') {
		console.warn(message);
	}
}
