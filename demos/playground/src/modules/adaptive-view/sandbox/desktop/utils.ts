export function fmtPrice(price: number, decimals?: number): string {
    const digits = decimals ?? (price >= 1000 ? 1 : price >= 1 ? 2 : 4);
    return price.toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    });
}

export function fmtNum(value: number, digits = 2): string {
    return value.toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    });
}

export function fmtCompact(value: number): string {
    const absoluteValue = Math.abs(value);
    if (absoluteValue >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (absoluteValue >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (absoluteValue >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(2);
}

export function fmtSigned(value: number, digits = 2): string {
    return `${value >= 0 ? '+' : ''}${fmtNum(value, digits)}`;
}

export function heatColor(value: number): string {
    const normalizedValue = Math.max(0, Math.min(1, value));
    return `hsl(${(220 - normalizedValue * 220).toFixed(0)}, 72%, 48%)`;
}

export function tint(color: string, strength: number): string {
    const percentage = Math.round(
        Math.max(0, Math.min(1, strength)) * 100
    );
    return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
}

export function hashStr(value: string): number {
    let hash = 0;
    for (let index = 0; index < value.length; index++) {
        hash = (hash * 31 + value.charCodeAt(index)) | 0;
    }
    return hash;
}

export function pseudo(seed: number): number {
    const value = Math.sin(seed) * 10000;
    return value - Math.floor(value);
}
