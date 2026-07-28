# Customer brand logos

Add customer logo files here for the homepage trust strip marquee.

## Supported formats

- `.svg` (recommended)
- `.png`
- `.webp`
- `.jpg` / `.jpeg`

## Option 1 — Drop files only

1. Add logo files to this folder.
2. Leave `customerLogoEntries` empty in `lib/customers/logos.ts`.
3. Logos are auto-discovered and alt text is generated from the filename.

Example: `north-face.svg` → alt text "North Face logo"

## Option 2 — Explicit list (recommended for production)

1. Add logo files to this folder.
2. Register each file in `lib/customers/logos.ts`:

```ts
export const customerLogoEntries = [
  { file: "north-face.svg", alt: "The North Face" },
  { file: "patagonia.png", alt: "Patagonia" },
];
```

Use this option to control order and accessible alt text.

## Tips

- Prefer horizontal logos on a transparent background.
- Keep files under ~200 KB when possible.
- Aim for a similar visual height (roughly 40–56 px tall in the strip).
