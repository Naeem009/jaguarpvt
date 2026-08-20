import { promises as fs } from "fs";
import path from "path";
import { jobOpeningSchema } from "./schema";
import type { JobOpening } from "./types";

export const JOB_OPENINGS_RELATIVE_PATH = "data/job-openings.json";
export const JOB_DEPARTMENTS_RELATIVE_PATH = "data/job-departments.json";
const localFilePath = path.join(process.cwd(), JOB_OPENINGS_RELATIVE_PATH);
const localDepartmentsPath = path.join(process.cwd(), JOB_DEPARTMENTS_RELATIVE_PATH);

const DEFAULT_DEPARTMENTS = [
  "Manufacturing Operations",
  "Quality & Compliance",
  "Product Development",
  "Sustainability",
  "Commercial & Corporate",
  "People & HR",
];

type SaveResult = {
  openings: JobOpening[];
  persistedVia: "filesystem" | "github";
};

type SaveDepartmentsResult = {
  departments: string[];
  persistedVia: "filesystem" | "github";
};

function parseOpenings(raw: string): JobOpening[] {
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("Job openings file is not a list.");
  }
  return parsed.map((item) => jobOpeningSchema.parse(item));
}

async function readFromFilesystem(): Promise<JobOpening[]> {
  const raw = await fs.readFile(localFilePath, "utf8");
  return parseOpenings(raw);
}

function githubConfig() {
  const token = process.env.HR_CMS_GITHUB_TOKEN;
  const repo = process.env.HR_CMS_GITHUB_REPO ?? "Naeem009/jaguarpvt";
  const branch = process.env.HR_CMS_GITHUB_BRANCH ?? "master";

  if (!token) {
    return null;
  }

  return { token, repo, branch };
}

async function githubRequest(url: string, token: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });

  return response;
}

async function readFromGithub(): Promise<{ openings: JobOpening[]; sha: string } | null> {
  const config = githubConfig();
  if (!config) {
    return null;
  }

  const url = `https://api.github.com/repos/${config.repo}/contents/${JOB_OPENINGS_RELATIVE_PATH}?ref=${config.branch}`;
  const response = await githubRequest(url, config.token, { cache: "no-store" });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to read job openings from GitHub.");
  }

  const body = (await response.json()) as { content?: string; encoding?: string; sha?: string };
  const encoded = body.content?.replace(/\n/g, "") ?? "";
  const raw = Buffer.from(encoded, "base64").toString("utf8");
  return { openings: parseOpenings(raw), sha: body.sha ?? "" };
}

async function writeToGithub(openings: JobOpening[], message: string) {
  const config = githubConfig();
  if (!config) {
    return false;
  }

  const current = await readFromGithub();
  const url = `https://api.github.com/repos/${config.repo}/contents/${JOB_OPENINGS_RELATIVE_PATH}`;
  const response = await githubRequest(url, config.token, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(`${JSON.stringify(openings, null, 2)}\n`).toString("base64"),
      branch: config.branch,
      sha: current?.sha || undefined,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Unable to save job openings to GitHub. ${detail.slice(0, 200)}`);
  }

  return true;
}

export async function loadJobOpenings(): Promise<JobOpening[]> {
  return readFromFilesystem();
}

export async function loadCmsJobOpenings(): Promise<JobOpening[]> {
  try {
    const fromGithub = await readFromGithub();
    if (fromGithub) {
      return fromGithub.openings;
    }
  } catch (error) {
    console.error("[careers-store] GitHub CMS read failed:", error);
  }
  return readFromFilesystem();
}

export async function saveJobOpenings(
  openings: JobOpening[],
  message = "Update career openings from HR CMS.",
): Promise<SaveResult> {
  const parsed = openings.map((item) => jobOpeningSchema.parse(item));
  const serialized = `${JSON.stringify(parsed, null, 2)}\n`;

  try {
    await fs.writeFile(localFilePath, serialized, "utf8");
    if (githubConfig()) {
      await writeToGithub(parsed, message);
      return { openings: parsed, persistedVia: "github" };
    }
    return { openings: parsed, persistedVia: "filesystem" };
  } catch (error) {
    if (githubConfig()) {
      await writeToGithub(parsed, message);
      return { openings: parsed, persistedVia: "github" };
    }
    throw error;
  }
}

function parseDepartments(raw: string): string[] {
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("Job departments file is not a list.");
  }

  return uniqueDepartmentNames(parsed.map((item) => String(item).trim()).filter(Boolean));
}

export function uniqueDepartmentNames(names: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const name of names) {
    const key = name.toLocaleLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(name);
  }
  return result.sort((a, b) => a.localeCompare(b));
}

async function readDepartmentsFromFilesystem(): Promise<string[]> {
  try {
    const raw = await fs.readFile(localDepartmentsPath, "utf8");
    return parseDepartments(raw);
  } catch {
    return DEFAULT_DEPARTMENTS;
  }
}

async function readDepartmentsFromGithub(): Promise<{ departments: string[]; sha: string } | null> {
  const config = githubConfig();
  if (!config) {
    return null;
  }

  const url = `https://api.github.com/repos/${config.repo}/contents/${JOB_DEPARTMENTS_RELATIVE_PATH}?ref=${config.branch}`;
  const response = await githubRequest(url, config.token, { cache: "no-store" });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to read departments from GitHub.");
  }

  const body = (await response.json()) as { content?: string; sha?: string };
  const encoded = body.content?.replace(/\n/g, "") ?? "";
  const raw = Buffer.from(encoded, "base64").toString("utf8");
  return { departments: parseDepartments(raw), sha: body.sha ?? "" };
}

async function writeDepartmentsToGithub(departments: string[], message: string) {
  const config = githubConfig();
  if (!config) {
    return false;
  }

  const current = await readDepartmentsFromGithub();
  const url = `https://api.github.com/repos/${config.repo}/contents/${JOB_DEPARTMENTS_RELATIVE_PATH}`;
  const response = await githubRequest(url, config.token, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(`${JSON.stringify(departments, null, 2)}\n`).toString("base64"),
      branch: config.branch,
      sha: current?.sha || undefined,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Unable to save departments to GitHub. ${detail.slice(0, 200)}`);
  }

  return true;
}

export async function loadJobDepartments(): Promise<string[]> {
  return readDepartmentsFromFilesystem();
}

export async function loadCmsJobDepartments(): Promise<string[]> {
  try {
    const fromGithub = await readDepartmentsFromGithub();
    if (fromGithub) {
      return fromGithub.departments;
    }
  } catch (error) {
    console.error("[careers-store] GitHub department read failed:", error);
  }
  return readDepartmentsFromFilesystem();
}

export async function saveJobDepartments(
  departments: string[],
  message = "Update career departments from HR CMS.",
): Promise<SaveDepartmentsResult> {
  const parsed = uniqueDepartmentNames(departments);
  const serialized = `${JSON.stringify(parsed, null, 2)}\n`;

  try {
    await fs.writeFile(localDepartmentsPath, serialized, "utf8");
    if (githubConfig()) {
      await writeDepartmentsToGithub(parsed, message);
      return { departments: parsed, persistedVia: "github" };
    }
    return { departments: parsed, persistedVia: "filesystem" };
  } catch (error) {
    if (githubConfig()) {
      await writeDepartmentsToGithub(parsed, message);
      return { departments: parsed, persistedVia: "github" };
    }
    throw error;
  }
}
