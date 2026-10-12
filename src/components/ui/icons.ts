// Single source of truth for the interface icons.
//
// ADR-0010 decided internal inline SVG icons and forbade icon packages. Its
// literal form — one `Icon.astro` — cannot cover the Vue islands, because an
// Astro component cannot be rendered from inside a Vue component, so the
// vectors live here and two thin renderers consume them: `Icon.astro` for
// `.astro` files and `Icon.vue` for the islands.

export interface IconPath {
  tag: 'path';
  /** SVG path data, copied verbatim from Lucide. */
  d: string;
  /** GitHub's mark needs the even-odd rule to keep the holes of its silhouette. */
  evenodd?: boolean;
  /** Lucide draws its strokes with rounded caps and joins. */
  round?: boolean;
  /** Only when a shape must differ from the icon's own stroke width. */
  strokeWidth?: number;
}

export interface IconCircle {
  tag: 'circle';
  cx: number;
  cy: number;
  r: number;
  /** The 404 emblem relies on a dashed ring; kept for parity even if unused today. */
  dashed?: boolean;
  /** Painted dots, like the centre of the sun. */
  filled?: boolean;
  strokeWidth?: number;
}

export type IconShape = IconPath | IconCircle;

export interface IconDefinition {
  /** Defaults to the 24x24 grid every Lucide icon is drawn on. */
  viewBox?: string;
  /** Brand marks are painted rather than drawn: fill instead of stroke. */
  filled?: boolean;
  /** Defaults to Lucide's 2. */
  strokeWidth?: number;
  shapes: IconShape[];
}

const definitions = {
  sun: {
    shapes: [
      { tag: 'circle', cx: 12, cy: 12, r: 4 },
      {
        tag: 'path',
        round: true,
        d: 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41',
      },
    ],
  },
  moon: {
    shapes: [{ tag: 'path', round: true, d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' }],
  },
  menu: {
    shapes: [{ tag: 'path', round: true, d: 'M4 6h16M4 12h16M4 18h16' }],
  },
  close: {
    shapes: [{ tag: 'path', round: true, d: 'M6 18L18 6M6 6l12 12' }],
  },
  mail: {
    shapes: [
      {
        tag: 'path',
        round: true,
        d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      },
    ],
  },
  linkedin: {
    filled: true,
    shapes: [
      {
        tag: 'path',
        d: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z',
      },
    ],
  },
  github: {
    filled: true,
    shapes: [
      {
        tag: 'path',
        evenodd: true,
        d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
      },
    ],
  },
  'map-pin': {
    shapes: [
      {
        tag: 'path',
        round: true,
        d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      },
      { tag: 'path', round: true, d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    ],
  },
  download: {
    shapes: [
      {
        tag: 'path',
        round: true,
        d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
      },
    ],
  },
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof definitions;

export const icons: Record<IconName, IconDefinition> = definitions;

export type IconPathShape = Extract<IconShape, { tag: 'path' }>;
export type IconCircleShape = Extract<IconShape, { tag: 'circle' }>;

export function isPathShape(shape: IconShape): shape is IconPathShape {
  return shape.tag === 'path';
}

export function isCircleShape(shape: IconShape): shape is IconCircleShape {
  return shape.tag === 'circle';
}
