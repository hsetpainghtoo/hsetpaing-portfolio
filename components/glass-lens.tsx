"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Lensing for every `.glass-lens` surface: the rim bends what is behind it,
 * the way Liquid Glass concentrates light at its edge instead of only
 * blurring. Modelled on the refraction in liquid-glass-js's shader (a
 * sharp rim term plus a wide soft edge term along the shape's normal), but
 * done with an SVG displacement filter inside `backdrop-filter`, so it reads
 * the live page (video included) with no page snapshot and no WebGL.
 *
 * Only Chromium renders SVG filters in `backdrop-filter`, so this runs only
 * there, only with a mouse, and never with reduced transparency. Elsewhere
 * the CSS material (rim, tint, blur) stands on its own.
 *
 * Each surface gets its own filter, with a displacement map drawn for its
 * size and corner radius. Small controls also get a touch of chromatic
 * aberration: red, green and blue are bent by slightly different amounts.
 *
 * Used on the navbar, buttons and pills only. On the large cards it cost
 * dropped frames while scrolling, so they keep the CSS material alone.
 */

const NS = "http://www.w3.org/2000/svg";

/** Displacement map for a rounded rectangle, as a data URL. */
function drawMap(w: number, h: number, radius: number, res: number) {
  const cw = Math.max(1, Math.round(w * res));
  const ch = Math.max(1, Math.round(h * res));
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(cw, ch);

  const r = Math.min(radius, w / 2, h / 2);
  const hx = w / 2 - r;
  const hy = h / 2 - r;

  for (let j = 0; j < ch; j++) {
    for (let i = 0; i < cw; i++) {
      // Back to CSS pixels, measured from the centre.
      const px = (i + 0.5) / res - w / 2;
      const py = (j + 0.5) / res - h / 2;
      const qx = Math.abs(px) - hx;
      const qy = Math.abs(py) - hy;

      let dist: number, nx: number, ny: number;
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy) || 1;
        dist = r - len;
        nx = (qx / len) * Math.sign(px);
        ny = (qy / len) * Math.sign(py);
      } else if (qx > qy) {
        dist = r - qx;
        nx = Math.sign(px);
        ny = 0;
      } else {
        dist = r - qy;
        nx = 0;
        ny = Math.sign(py);
      }

      // Distance in from the edge: a sharp rim plus a softer, wider edge.
      const d = Math.max(0, dist);
      const m = dist < 0 ? 0 : Math.min(1, 0.75 * Math.exp(-d / 3) + 0.4 * Math.exp(-d / 14));

      const k = (j * cw + i) * 4;
      // Sample from just inside the rim: the interior seems to swell out to
      // the edge, as through the thick lip of a lens.
      img.data[k] = 128 - 127 * nx * m;
      img.data[k + 1] = 128 - 127 * ny * m;
      img.data[k + 2] = 128;
      img.data[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

function el<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>
) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

/** One filter: displace, and for small controls split the channels. */
function buildFilter(id: string, w: number, h: number, map: string, scale: number, split: boolean) {
  const f = el("filter", {
    id,
    x: 0,
    y: 0,
    width: "100%",
    height: "100%",
    "color-interpolation-filters": "sRGB",
  });
  f.append(el("feImage", { href: map, x: 0, y: 0, width: w, height: h, preserveAspectRatio: "none", result: "map" }));

  if (!split) {
    f.append(el("feDisplacementMap", { in: "SourceGraphic", in2: "map", scale, xChannelSelector: "R", yChannelSelector: "G" }));
    return f;
  }

  const channels = [
    ["r", 1.0, "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"],
    ["g", 0.9, "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"],
    ["b", 0.8, "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"],
  ] as const;
  for (const [c, k, matrix] of channels) {
    f.append(el("feDisplacementMap", { in: "SourceGraphic", in2: "map", scale: scale * k, xChannelSelector: "R", yChannelSelector: "G", result: `d${c}` }));
    f.append(el("feColorMatrix", { in: `d${c}`, type: "matrix", values: matrix, result: c }));
  }
  f.append(el("feBlend", { in: "r", in2: "g", mode: "screen", result: "rg" }));
  f.append(el("feBlend", { in: "rg", in2: "b", mode: "screen" }));
  return f;
}

export function GlassLens() {
  const pathname = usePathname();

  useEffect(() => {
    const brands = (
      navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }
    ).userAgentData?.brands;
    if (!brands?.some((b) => b.brand === "Chromium")) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    const svg = document.getElementById("glass-lens-defs");
    if (!svg) return;
    document.documentElement.dataset.lens = "";

    const surfaces = [...document.querySelectorAll<HTMLElement>(".glass-lens")];
    const made: { node: HTMLElement; filter: SVGFilterElement | null }[] = [];

    const fit = (node: HTMLElement, index: number) => {
      const w = node.offsetWidth;
      const h = node.offsetHeight;
      if (!w || !h) return;
      const entry = made[index];
      entry.filter?.remove();

      const radius = Number.parseFloat(getComputedStyle(node).borderTopLeftRadius) || 0;
      const small = h <= 80;
      // Big panels get a half-resolution map: it is smooth, so nothing is lost.
      const map = drawMap(w, h, radius, small ? 1 : 0.5);
      const id = `glass-lens-${index}`;
      const scale = small ? 26 : 40;
      const filter = buildFilter(id, w, h, map, scale, small);
      svg.append(filter);
      entry.filter = filter;
      node.style.setProperty("--lens", `url(#${id})`);
    };

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const i = surfaces.indexOf(e.target as HTMLElement);
        if (i >= 0) fit(surfaces[i], i);
      }
    });
    surfaces.forEach((node) => {
      made.push({ node, filter: null });
      ro.observe(node);
    });

    return () => {
      ro.disconnect();
      for (const { node, filter } of made) {
        filter?.remove();
        node.style.removeProperty("--lens");
      }
    };
  }, [pathname]);

  return <svg id="glass-lens-defs" aria-hidden="true" width="0" height="0" className="absolute" />;
}
