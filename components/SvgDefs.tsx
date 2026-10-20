"use client";

import { useEffect, useRef } from "react";

// Shared SVG pieces: the cursor's hatch fill, a static "rough" filter that bends
// straight CSS borders into gently wavy pen lines, and a "boil" filter whose noise
// changes a few times a second, like hand-drawn animation.
export default function SvgDefs() {
  const noise = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hand-drawn animation redraws a line a few times a second; swapping the
    // noise seed gives the same gentle jitter.
    let seed = 1;
    const id = window.setInterval(() => {
      seed = (seed % 4) + 1;
      noise.current?.setAttribute("seed", String(seed));
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="7" strokeWidth="3.4" style={{ stroke: "var(--cursor-fill)" }} />
        </pattern>
        <filter id="boil" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.03" numOctaves={1} seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
        <filter id="rough" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          {/* Low-frequency noise bends straight edges into long, gentle waves,
              like a steady hand drawing a line, without any jagged noise. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves={1} seed="3" stitchTiles="stitch" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </defs>
    </svg>
  );
}
