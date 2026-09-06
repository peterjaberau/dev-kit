import * as React from 'react';

export function useTick(ms: number): number {
    const [tick, setTick] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => setTick((value) => value + 1), ms);
        return () => clearInterval(interval);
    }, [ms]);

    return tick;
}

export function useFlash(value: number): 'up' | 'down' | null {
    const previousValue = React.useRef(value);
    const [direction, setDirection] = React.useState<'up' | 'down' | null>(null);

    React.useEffect(() => {
        const previous = previousValue.current;
        previousValue.current = value;

        if (value > previous) {
            setDirection('up');
        } else if (value < previous) {
            setDirection('down');
        } else {
            return;
        }

        const timeout = setTimeout(() => setDirection(null), 320);
        return () => clearTimeout(timeout);
    }, [value]);

    return direction;
}
