from pathlib import Path

SLUGS = [
    "yarn-warehouse",
    "dyeing-lab",
    "knitting",
    "dyeing",
    "screen-printing",
    "embroidery",
    "cutting",
    "stitching",
    "garment-dyeing",
    "garment-washing",
    "finishing",
    "quality-control",
    "metal-detection",
    "audits",
    "packing",
]

for slug in SLUGS:
    directory = Path("public/images/facility/departments") / slug
    directory.mkdir(parents=True, exist_ok=True)
    label = slug.replace("-", " ").title()
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="{label}">
  <rect width="800" height="600" fill="#EEF5E4"/>
  <rect x="40" y="40" width="720" height="520" rx="16" fill="#7EBB42" fill-opacity="0.15" stroke="#3F7A1A" stroke-width="2"/>
  <text x="400" y="300" font-family="Inter, Arial, sans-serif" font-size="22" fill="#3A6E18" text-anchor="middle" dominant-baseline="middle">{label}</text>
</svg>"""
    (directory / "photo.svg").write_text(svg, encoding="utf-8")

print(f"Created {len(SLUGS)} department placeholders")
