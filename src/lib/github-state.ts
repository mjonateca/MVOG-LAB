import type { ControlRoomState } from "./types";

const DEFAULT_OWNER = "mjonateca";
const DEFAULT_REPO = "MVOG-LAB";
const DEFAULT_PATH = "data/state.json";
const DEFAULT_BRANCH = "main";

function envValue(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return "";
}

const OWNER = envValue("GITHUB_STATE_OWNER", "GITHUB_OWNER") || DEFAULT_OWNER;
const REPO = envValue("GITHUB_STATE_REPO", "GITHUB_REPO") || DEFAULT_REPO;
const PATH = envValue("GITHUB_STATE_PATH") || DEFAULT_PATH;
const BRANCH = envValue("GITHUB_STATE_BRANCH") || DEFAULT_BRANCH;
const ENCODED_PATH = PATH.split("/").map(encodeURIComponent).join("/");
const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${ENCODED_PATH}?ref=${encodeURIComponent(BRANCH)}`;

type GitHubFile = {
  content: string;
  sha: string;
};

function getGitHubToken() {
  const token = envValue(
    "GITHUB_STATE_TOKEN",
    "GITHUB_TOKEN",
    "GITHUB_ACCESS_TOKEN",
    "GH_TOKEN",
    "GH_PAT"
  );

  if (!token) {
    throw new Error(
      "Missing GitHub token. Set GITHUB_STATE_TOKEN, GITHUB_TOKEN or GITHUB_ACCESS_TOKEN in Vercel."
    );
  }

  return token;
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${getGitHubToken()}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

async function readStateFile(): Promise<GitHubFile> {
  const response = await fetch(API_URL, {
    headers: githubHeaders(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await githubError(response, `Cannot read ${PATH} from GitHub`));
  }

  return response.json() as Promise<GitHubFile>;
}

export async function loadStateFromGitHub(): Promise<ControlRoomState> {
  const file = await readStateFile();
  const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf-8");
  return JSON.parse(decoded) as ControlRoomState;
}

export async function saveStateToGitHub(state: ControlRoomState): Promise<void> {
  const content = Buffer.from(`${JSON.stringify(state, null, 2)}\n`).toString("base64");

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const currentFile = await readStateFile();
    const updateResponse = await fetch(API_URL, {
      method: "PUT",
      headers: githubHeaders(),
      body: JSON.stringify({
        message: "Update Lab state",
        content,
        sha: currentFile.sha,
        branch: BRANCH,
        committer: {
          name: "MVOG Lab",
          email: "mvogsrl@gmail.com"
        }
      })
    });

    if (updateResponse.ok) return;
    if (updateResponse.status === 409 && attempt === 0) continue;

    throw new Error(await githubError(updateResponse, `Cannot write ${PATH} to GitHub`));
  }
}

async function githubError(response: Response, prefix: string) {
  const detail = await response.json().catch(() => ({})) as { message?: string };
  return `${prefix}: ${response.status}${detail.message ? ` ${detail.message}` : ""}`;
}
