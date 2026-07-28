import fs from "node:fs";
import path from "node:path";

const CERTIFICATIONS_DIR = path.join(process.cwd(), "public/certifications");
const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

export type CertificationLogo = {
  src: string;
  alt: string;
};

/**
 * Register certification logo filenames here.
 * Place the matching files in `public/certifications/`.
 *
 * Example:
 *   { file: "gots.svg", alt: "GOTS certification logo" }
 */
export const certificationLogoEntries: Array<{ file: string; alt?: string }> = [
  { file: "cert-01.svg", alt: "GOTS certification logo" },
  { file: "cert-02.svg", alt: "OEKO-TEX Standard 100 certification logo" },
  { file: "cert-03.svg", alt: "WRAP certification logo" },
  { file: "cert-04.svg", alt: "ISO 14001 certification logo" },
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
