import fs from "node:fs";
import path from "node:path";

const CERTIFICATIONS_DIR = path.join(process.cwd(), "public/certifications");
const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

export type CertificationLogo = {
  src: string;
  alt: string;
};

export const certificationLogoEntries: Array<{ file: string; alt?: string }> = [
  { file: "1-01.png", alt: "Global Recycled Standard logo" },
  { file: "2-01.png", alt: "ISO 9001:2015 logo" },
  { file: "3-01.png", alt: "GOTS logo" },
  { file: "4-01.png", alt: "Organic Blended logo" },
  { file: "5-01.png", alt: "OEKO-TEX Standard logo" },
  { file: "6-01.png", alt: "OEKO-TEX Standard 100 logo" },
  { file: "7-01.png", alt: "Organic 100 logo" },
  { file: "8-01.png", alt: "Recycled Blended logo" },
  { file: "9-01.png", alt: "BSCI logo" },
  { file: "10-01.png", alt: "BCI logo" },
  { file: "11-01.png", alt: "Inditex logo" },
  { file: "12-01.png", alt: "HIGG Index logo" },
  { file: "13-01.png", alt: "Sedex logo" },
  { file: "14-01.png", alt: "Amfori logo" },
  { file: "15-01.png", alt: "Textile Exchange logo" },
  { file: "16-01.png", alt: "Better Cotton Initiative logo" },
];

function humanizeFilename(filename: string): string {
  return path
    .parse(filename)
    .name.replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function discoverCertificationLogos(): CertificationLogo[] {
  if (!fs.existsSync(CERTIFICATIONS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CERTIFICATIONS_DIR)
    .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => ({
      src: `/certifications/${file}`,
      alt: `${humanizeFilename(file)} certification logo`,
    }));
}

export function getCertificationLogos(): CertificationLogo[] {
  if (certificationLogoEntries.length > 0) {
    return certificationLogoEntries
      .filter(({ file }) => fs.existsSync(path.join(CERTIFICATIONS_DIR, file)))
      .map(({ file, alt }) => ({
        src: `/certifications/${file}`,
        alt: alt ?? `${humanizeFilename(file)} certification logo`,
      }));
  }

  return discoverCertificationLogos();
}
