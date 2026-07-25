import base64
import re
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "public" / "jaguar logo.pdf"
LOGOS = ROOT / "public" / "logos"
PUBLIC = ROOT / "public"
APP = ROOT / "app"

BRAND_COLORS = ("#6cb435", "#6cb444", "#888888")
LIGHT_COLOR = "#FFFFFF"


def make_light_variant(svg: str) -> str:
    light = svg
    for color in BRAND_COLORS:
        light = light.replace(f'fill="{color}"', f'fill="{LIGHT_COLOR}"')
        light = light.replace(f'stroke="{color}"', f'stroke="{LIGHT_COLOR}"')
    return light


def extract_emblem_svg(full_svg: str) -> str:
    emblem_paths = []
    for line in full_svg.splitlines():
        if "<path transform=" in line and 'data-text=' not in line:
            emblem_paths.append(line)
        if line.strip().startswith("<use data-text="):
            break
    body = "\n".join(emblem_paths)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="60 110 190 230" role="img" aria-label="Jaguar mark">
{body}
</svg>'''


LOGO_VIEWBOX = 'width="890" height="500" viewBox="60 90 890 500"'


def write_logo(path: Path, content: str) -> None:
    content = content.replace(
        'width="1000" height="811.419" viewBox="0 0 1000 811.419"',
        LOGO_VIEWBOX,
    )
    path.write_text(content, encoding="utf-8")


doc = fitz.open(PDF)
page = doc[0]
svg = page.get_svg_image(matrix=fitz.Identity)

LOGOS.mkdir(parents=True, exist_ok=True)
(LOGOS / "logo-source.svg").write_text(svg, encoding="utf-8")
write_logo(LOGOS / "logo-dark.svg", svg)
write_logo(LOGOS / "logo-light.svg", make_light_variant(svg))

emblem_svg = extract_emblem_svg(svg)
(LOGOS / "logo-mark.svg").write_text(emblem_svg, encoding="utf-8")
(LOGOS / "logo-mark-light.svg").write_text(make_light_variant(emblem_svg), encoding="utf-8")

# Favicon from emblem only.
clip = fitz.Rect(60, 120, 280, 360)
matrix = fitz.Matrix(6, 6)
pix = page.get_pixmap(matrix=matrix, clip=clip, alpha=True)
icon_png_path = PUBLIC / "favicon.png"
pix.save(icon_png_path)

img = Image.open(icon_png_path).convert("RGBA")
width, height = img.size
size = min(width, height)
left = (width - size) // 2
top = (height - size) // 2
icon_square = img.crop((left, top, left + size, top + size)).resize((512, 512), Image.Resampling.LANCZOS)
icon_square.save(icon_png_path)
icon_square.save(APP / "icon.png")

(APP / "apple-icon.png").write_bytes(icon_png_path.read_bytes())

print("Generated logo-dark.svg, logo-light.svg, logo-mark.svg, favicon.png, app/icon.png")
