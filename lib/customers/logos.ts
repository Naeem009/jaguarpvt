import fs from "node:fs";
import path from "node:path";

const CUSTOMER_LOGOS_DIR = path.join(process.cwd(), "public/logos/customers");
const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

export type CustomerLogo = {
  src: string;
  alt: string;
};

/**
 * Register customer logo filenames here.
 * Place the matching files in `public/logos/customers/`.
 *
 * Example:
 *   { file: "acme-brand.svg", alt: "Acme Brand" }
 */
export const customerLogoEntries: Array<{ file: string; alt?: string }> = [
  // Add entries when you upload logos to public/logos/customers/
];

function humanizeFilename(filename: string): string {
  return path
    .parse(filename)
    .name.replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function discoverCustomerLogos(): CustomerLogo[] {
  if (!fs.existsSync(CUSTOMER_LOGOS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CUSTOMER_LOGOS_DIR)
    .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => ({
      src: `/logos/customers/${file}`,
      alt: `${humanizeFilename(file)} logo`,
    }));
}

export function getCustomerLogos(): CustomerLogo[] {
  if (customerLogoEntries.length > 0) {
    return customerLogoEntries
      .filter(({ file }) => fs.existsSync(path.join(CUSTOMER_LOGOS_DIR, file)))
      .map(({ file, alt }) => ({
        src: `/logos/customers/${file}`,
        alt: alt ?? `${humanizeFilename(file)} logo`,
      }));
  }

  return discoverCustomerLogos();
}
