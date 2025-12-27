import React from 'react';

import { Border as BaseBorder } from './internal/border';
import { BorderProps } from './types';

export function Border({
	status = 'default',
	indent,
}: BorderProps) {
	return <BaseBorder status={status} indent={indent} />;
}

