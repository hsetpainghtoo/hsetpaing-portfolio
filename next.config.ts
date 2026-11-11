import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP as the fallback. The project screenshots are large
       PNG and JPEG sources, so the format choice is most of the page weight. */
    formats: ["image/avif", "image/webp"],
    /* Capped on purpose: nothing here is shown wider than ~1100 CSS px, and
       the ceiling keeps decoded bitmaps small on phones. Raise it to bring
       sharper images to high-density screens. */
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
    /* Next only serves the qualities listed here; anything else is snapped
       to the nearest one. 70 is the working value across the site. */
    qualities: [70, 75, 80],
  },
};

export default nextConfig;
