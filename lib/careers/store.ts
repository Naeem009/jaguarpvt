import { promises as fs } from "fs";
import path from "path";
import { jobOpeningSchema } from "./schema";
import type { JobOpening } from "./types";

export const JOB_OPENINGS_RELATIVE_PATH = "data/job-openings.json";
const localFilePath = path.join(process.cwd(), JOB_OPENINGS_RELATIVE_PATH);

type SaveResult = {
  openings: JobOpening[];
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

export function listStatus(opening: JobOpening, now = new Date()) {
  if (!opening.published) {
    return "draft" as const;
  }

  const deadline = new Date(`${opening.applicationDeadline}T23:59:59.999+05:00`);
  if (deadline.getTime() < now.getTime()) {
    return "expired" as const;
  }

  return "live" as const;
}
