#!/usr/bin/env python3
"""Download free stock images/videos for Jaguar site placeholders."""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

IMAGE_HEADERS = {
    "User-Agent": "jaguarpvt-asset-script/1.0 (+https://jaguarpvt.com)",
    "Accept": "image/*,*/*",
}

VIDEO_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://www.pexels.com/",
    "Accept": "video/*,*/*",
}


def download(url: str, dest: Path, headers: dict[str, str], retries: int = 3) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=120) as response:
                data = response.read()
            if dest.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"} and len(data) < 5000:
                raise ValueError(f"Suspiciously small image ({len(data)} bytes)")
            if dest.suffix.lower() == ".mp4" and len(data) < 50_000:
                raise ValueError(f"Suspiciously small video ({len(data)} bytes)")
            dest.write_bytes(data)
            print(f"OK  {dest.relative_to(ROOT)} ({len(data) // 1024} KB)")
            return True
        except Exception as exc:  # noqa: BLE001
            print(f"FAIL attempt {attempt + 1} {dest.name}: {exc}")
            time.sleep(2 + attempt)
    return False


def openverse_first(query: str) -> str | None:
    params = urllib.parse.urlencode(
        {"q": query, "page_size": 8, "license": "cc0,by,by-sa"}
    )
    url = f"https://api.openverse.org/v1/images/?{params}"
    req = urllib.request.Request(url, headers=IMAGE_HEADERS)
    with urllib.request.urlopen(req, timeout=30) as response:
        payload = json.load(response)
    for item in payload.get("results", []):
        image_url = item.get("url")
        if image_url and not image_url.lower().endswith((".tiff", ".svg")):
            return image_url
    return None


ASSETS: dict[str, str] = {
    "images/home/hero.jpg": "sewing factory production line",
    "images/home/facility-teaser.jpg": "textile factory industrial building",
    "images/home/stat-bar-bg.jpg": "fabric rolls textile warehouse",
    "images/about/hero.jpg": "garment factory exterior building",
    "images/about/mission-block.jpg": "textile manufacturing quality control",
    "images/about/history-01.jpg": "historical textile factory workers",
    "images/about/history-02.jpg": "garment factory expansion industrial",
    "images/about/history-03.jpg": "modern textile manufacturing facility",
    # Leadership headshots are brand assets — not downloaded by this script.
    "images/careers/hero.jpg": "factory workers team manufacturing",
    "images/careers/culture-01.jpg": "workplace training factory workers",
    "images/careers/culture-02.jpg": "diverse team meeting workplace",
    "images/contact/hero.jpg": "business contact office professional",
    "images/facility/hero.jpg": "textile factory building exterior",
    "images/facility/facility-thumb-01.jpg": "garment sewing production line",
    "images/facility/facility-thumb-02.jpg": "textile dyeing factory industrial",
    "images/products/wovens/hero.jpg": "woven fabric shirting textile",
    "images/products/wovens/process-01.jpg": "fabric inspection quality textile",
    "images/products/wovens/process-02.jpg": "garment cutting sewing factory",
    "images/products/wovens/process-03.jpg": "apparel finishing packing factory",
    "images/products/knits/hero.jpg": "knitting machine jersey fabric",
    "images/products/knits/process-01.jpg": "yarn textile manufacturing",
    "images/products/knits/process-02.jpg": "knitwear production factory",
    "images/products/knits/process-03.jpg": "garment washing finishing textile",
    "images/products/baby-wear/hero.jpg": "baby clothes soft apparel",
    "images/products/baby-wear/process-01.jpg": "organic cotton textile fabric",
    "images/products/baby-wear/process-02.jpg": "baby garment sewing factory",
    "images/products/baby-wear/process-03.jpg": "quality testing apparel packaging",
    "images/our-impact/environment/hero.jpg": "sustainable textile factory",
    "images/our-impact/environment/water-treatment.jpg": "industrial water treatment plant",
    "images/our-impact/environment/solar.jpg": "solar panels factory roof",
    "images/our-impact/people/hero.jpg": "factory workers community",
    "images/our-impact/people/worker-program.jpg": "worker safety training factory",
    "images/our-impact/people/community.jpg": "community education program",
    "images/our-impact/governance/hero.jpg": "quality audit inspection manufacturing",
    "certifications/cert-01.jpg": "organic textile fabric natural",
    "certifications/cert-02.jpg": "laboratory product testing quality",
    "certifications/cert-03.jpg": "factory compliance audit workers",
    "certifications/cert-04.jpg": "environmental sustainability factory green",
}

FALLBACK_URLS: dict[str, str] = {
    "images/home/hero.jpg": "https://live.staticflickr.com/4032/4430418813_1f8c13f60b_b.jpg",
    "images/about/hero.jpg": "https://live.staticflickr.com/5043/5279325617_09c46cd325_b.jpg",
    "images/facility/hero.jpg": "https://live.staticflickr.com/2329/2290601813_eba6b4b502_b.jpg",
    "images/products/wovens/hero.jpg": "https://live.staticflickr.com/2161/2210667638_5e702c5c9e.jpg",
    "images/products/knits/hero.jpg": "https://collections.museumsvictoria.com.au/content/media/49/728449-large.jpg",
    "images/products/baby-wear/hero.jpg": "https://live.staticflickr.com/2817/9560424310_c9bd78dc12_b.jpg",
    "images/our-impact/environment/solar.jpg": "https://live.staticflickr.com/2771/4278495827_0b65f72132_b.jpg",
    "images/our-impact/environment/water-treatment.jpg": "https://live.staticflickr.com/228/503411286_b3dced3af8_b.jpg",
}

# Pexels free stock (replace with brand footage later)
VIDEO_ASSETS: dict[str, str] = {
    "videos/home/hero-stitching.mp4": "https://videos.pexels.com/video-files/18092534/18092534-hd_1920_1080_30fps.mp4",
    "videos/heroes/manufacturing.mp4": "https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_25fps.mp4",
    "videos/heroes/sustainability.mp4": "https://videos.pexels.com/video-files/856973/856973-sd_640_360_25fps.mp4",
    "videos/heroes/products.mp4": "https://videos.pexels.com/video-files/856973/856973-sd_640_360_25fps.mp4",
    "videos/heroes/contact.mp4": "https://videos.pexels.com/video-files/6774848/6774848-hd_1920_1080_30fps.mp4",
    "videos/heroes/careers.mp4": "https://videos.pexels.com/video-files/7507666/7507666-hd_1920_1080_25fps.mp4",
}


def resolve_url(relative_path: str, query: str) -> str:
    url = openverse_first(query)
    if url:
        return url
    return FALLBACK_URLS.get(
        relative_path,
        "https://burst.shopifycdn.com/photos/sewing-machine-in-textile-factory.jpg?width=1400",
    )


def main() -> None:
    print("Downloading stock images…")
    for rel, query in ASSETS.items():
        dest = PUBLIC / rel
        url = resolve_url(rel, query)
        print(f"GET {rel}")
        download(url, dest, IMAGE_HEADERS)
        time.sleep(1)

    print("\nDownloading hero videos…")
    for rel, url in VIDEO_ASSETS.items():
        dest = PUBLIC / rel
        print(f"GET {rel}")
        download(url, dest, VIDEO_HEADERS)
        time.sleep(0.5)

    print("\nDone.")


if __name__ == "__main__":
    main()
