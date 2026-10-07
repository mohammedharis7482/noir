export type Rgb = readonly [number, number, number];

/** Reads a computed colour such as "rgb(244, 242, 237)". */
export function parseRgb(value: string): Rgb | null {
  const [r, g, b] = value.match(/[\d.]+/g)?.map(Number) ?? [];
  return r === undefined || g === undefined || b === undefined ? null : [r, g, b];
}

export function toHex(rgb: Rgb): string {
  const digits = rgb.map((channel) => Math.round(channel).toString(16).padStart(2, "0"));
  return `#${digits.join("").toUpperCase()}`;
}

/** WCAG 2 relative luminance. */
function luminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2 contrast ratio, from 1 to 21. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}
