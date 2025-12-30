
function hasChildren(item: any): boolean {
	return item.children.length > 0;
}

function remove(data: any[], filterId: string): any[] {
	return data
		.filter((item) => item.id !== filterId)
		.map((item) => {
			if (hasChildren(item)) {
				return {
					...item,
					children: remove(item.children, filterId),
				};
			}
			return item;
		});
}

function insertBefore(data: any[], targetId: string, newItem: any): any[] {
	return data.flatMap((filter) => {
		if (filter.id === targetId) {
			return [newItem, filter];
		}
		if (hasChildren(filter)) {
			return {
				...filter,
				children: insertBefore(filter.children, targetId, newItem),
			};
		}
		return filter;
	});
}

function insertChild(data: any[], targetId: string, newItem: any): any[] {
	return data.flatMap((item) => {
		if (item.id === targetId) {
			// already a parent: add as first child
			return {
				...item,
				// opening item so you can see where item landed
				isOpen: true,
				children: [newItem, ...item.children],
			};
		}

		if (!hasChildren(item)) {
			return item;
		}

		return {
			...item,
			children: insertChild(item.children, targetId, newItem),
		};
	});
}

function insertAfter(data: any[], targetId: string, newItem: any): any[] {
	return data.flatMap((item) => {
		if (item.id === targetId) {
			return [item, newItem];
		}

		if (hasChildren(item)) {
			return {
				...item,
				children: insertAfter(item.children, targetId, newItem),
			};
		}

		return item;
	});
}

export function find(data: any[], filterId: string): any | undefined {
	for (const item of data) {
		if (item.id === filterId) {
			return item;
		}

		if (hasChildren(item)) {
			const result = find(item.children, filterId);
			if (result) {
				return result;
			}
		}
	}
}

export function getPathToFilter(
	data: any[],
	filterId: string,
	path: string[] = [],
): string[] | null {
	for (const item of data) {
		if (item.id === filterId) {
			return path;
		}
		const nested = getPathToFilter(item.children, filterId, [...path, item.id]);
		if (nested) {
			return nested;
		}
	}
	return null;
}

export function tree(filters: any[]) {
	let result = Array.from(filters);

	const api = {
		remove(filterId: string) {
			result = remove(result, filterId);
			return this;
		},
		insertBefore({ insert, targetId }: { insert: any; targetId: string }) {
			result = insertBefore(result, targetId, insert);
			return this;
		},
		insertAfter({ insert, targetId }: { insert: any; targetId: string }) {
			result = insertAfter(result, targetId, insert);
			return this;
		},
		insertChild({ insert, targetId }: { insert: any; targetId: string }) {
			result = insertChild(result, targetId, insert);
			return this;
		},
		build() {
			return result;
		},
	};

	return api;
}
