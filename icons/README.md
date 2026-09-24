# App Icons

PWA icons referenced by `manifest.json` (and `index.html` for the favicon / iOS home screen).

| File | Size |
|------|------|
| `icon-72x72.png` – `icon-512x512.png` | 72, 96, 128, 144, 152, 192, 384, 512 px |

## Design

- White leaf on the app's green (`#34C759`) gradient, matching the 🌿 branding
- Full-bleed background with the leaf inside the central 80% safe zone, so the
  icons work with `"purpose": "any maskable"` (Android circle/squircle masks)

## Regenerating

The icons are rendered from a single SVG. To change them, render your SVG at each
size above (e.g. with Inkscape, `rsvg-convert`, or a headless browser screenshot)
and replace the PNGs, keeping the file names unchanged.
