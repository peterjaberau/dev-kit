export function useSafeDefaultWidth({
	defaultWidthProp,
	fallbackDefaultWidth,
	slotName,
}: {
	defaultWidthProp: number;
	fallbackDefaultWidth: number;
	slotName: string;
}): number {
	if (!Number.isInteger(defaultWidthProp)) {
		if (process.env.NODE_ENV !== 'production') {
			console.error(
				`The defaultWidth value must be an integer, but '${defaultWidthProp}' was provided to ${slotName}. Falling back to ${fallbackDefaultWidth}px instead.`,
			);
		}

		return fallbackDefaultWidth;
	}

	return defaultWidthProp;
}
