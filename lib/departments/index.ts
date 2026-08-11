import fs from "node:fs";
import path from "node:path";
import departmentsData from "@/data/departments.json";
import {
  DEPARTMENT_CATEGORY_ORDER,
  isPlaceholderCapacity,
  type Department,
} from "./types";

export type { Department } from "./types";
export { DEPARTMENT_CATEGORY_ORDER, isPlaceholderCapacity } from "./types";

function resolveDepartmentImage(slug: string): string {
  const baseDir = path.join(process.cwd(), "public", "images", "facility", "departments", slug);
  const jpgPath = path.join(baseDir, "photo.jpg");
  const webpPath = path.join(baseDir, "photo.webp");

  if (fs.existsSync(jpgPath)) {
    return `/images/facility/departments/${slug}/photo.jpg`;
  }
  if (fs.existsSync(webpPath)) {
    return `/images/facility/departments/${slug}/photo.webp`;
  }
  return `/images/facility/departments/${slug}/photo.svg`;
}

export function getDepartments(): Department[] {
  return (departmentsData as Omit<Department, "resolvedImage">[]).map((department) => ({
    ...department,
    resolvedImage: resolveDepartmentImage(department.slug),
  }));
}

export function getDepartmentCategories(): string[] {
  const present = new Set(getDepartments().map((department) => department.category));
  return DEPARTMENT_CATEGORY_ORDER.filter((category) => present.has(category));
}

export function getDepartmentsByCategory(category: string): Department[] {
  return getDepartments().filter((department) => department.category === category);
}
