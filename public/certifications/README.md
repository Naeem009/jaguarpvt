# Certification logos

Add certification logo files here for the **Audit-ready credentials** marquee on the Governance page.

## Supported formats

- `.svg` (recommended)
- `.png`
- `.webp`
- `.jpg` / `.jpeg`

## Option 1 — Drop files only

1. Add logo files to this folder.
2. Clear `certificationLogoEntries` in `lib/certifications/logos.ts` to use auto-discovery.
3. Alt text is generated from the filename.

## Option 2 — Explicit list (recommended)

1. Add logo files to this folder.
2. Register each file in `lib/certifications/logos.ts`:

```ts
export const certificationLogoEntries = [
  { file: "gots.svg", alt: "GOTS certification logo" },
  { file: "oeko-tex.svg", alt: "OEKO-TEX Standard 100 certification logo" },
  { file: "wrap.svg", alt: "WRAP certification logo" },
  { file: "iso-14001.svg", alt: "ISO 14001 certification logo" },
];
```

List order controls marquee order.

## Display behavior

- Logos scroll slowly right to left
- Shown in greyscale by default
- Full color on hover over each logo

## Tips

- Use transparent backgrounds
- Prefer horizontal logo artwork
- Keep a consistent visual height (~56–64 px)
